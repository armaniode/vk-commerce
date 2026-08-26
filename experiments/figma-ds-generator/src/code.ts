(() => {
  type RegistryProperty = {
    name: string;
    type: FigmaComponentPropertyType;
    defaultValue?: string | boolean;
    currentValue?: string | boolean;
    variantOptions?: string[];
    preferredValues?: FigmaPreferredValue[];
  };

  type RegistryEntry = {
    figmaKey: string;
    componentName: string;
    componentSetName?: string;
    isRemote: boolean;
    properties: RegistryProperty[];
  };

  type ComponentRegistry = Record<string, RegistryEntry>;

  type IncomingMessage =
    | { type: 'build-registry' }
    | { type: 'create-test-instances'; registryJson: string };

  const MAX_TEST_INSTANCES = 3;

  figma.showUI(__html__, {
    width: 520,
    height: 680,
    themeColors: true,
  });

  function isIncomingMessage(value: unknown): value is IncomingMessage {
    if (!value || typeof value !== 'object' || !('type' in value)) {
      return false;
    }

    const type = (value as { type?: unknown }).type;
    if (type === 'build-registry') {
      return true;
    }

    return (
      type === 'create-test-instances' &&
      'registryJson' in value &&
      typeof (value as { registryJson?: unknown }).registryJson === 'string'
    );
  }

  function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  function copyPreferredValues(
    values: readonly FigmaPreferredValue[] | undefined,
  ): FigmaPreferredValue[] | undefined {
    return values?.map(({ type, key }) => ({ type, key }));
  }

  function isComponentSetNode(
    node: FigmaBaseNode | FigmaComponentSetNode | null,
  ): node is FigmaComponentSetNode {
    return (
      node?.type === 'COMPONENT_SET' &&
      'componentPropertyDefinitions' in node
    );
  }

  function getProperties(
    instance: FigmaInstanceNode,
    mainComponent: FigmaComponentNode,
  ): RegistryProperty[] {
    const parent = mainComponent.parent;
    const definitionOwner = isComponentSetNode(parent)
      ? parent
      : mainComponent;
    const definitions = definitionOwner.componentPropertyDefinitions;
    const currentProperties = instance.componentProperties;
    const names = new Set([
      ...Object.keys(definitions),
      ...Object.keys(currentProperties),
    ]);

    return [...names]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => {
        const definition = definitions[name];
        const current = currentProperties[name];
        const property: RegistryProperty = {
          name,
          type: definition?.type ?? current.type,
        };

        if (definition) {
          property.defaultValue = definition.defaultValue;
          if (definition.variantOptions) {
            property.variantOptions = [...definition.variantOptions];
          }
          property.preferredValues = copyPreferredValues(
            definition.preferredValues,
          );
        }

        if (current) {
          property.currentValue = current.value;
          property.preferredValues ??= copyPreferredValues(
            current.preferredValues,
          );
        }

        if (!property.preferredValues?.length) {
          delete property.preferredValues;
        }

        return property;
      });
  }

  function getRegistryName(
    preferredName: string,
    registry: ComponentRegistry,
  ): string {
    const baseName = preferredName.trim() || 'Unnamed component';
    if (!registry[baseName]) {
      return baseName;
    }

    let suffix = 2;
    while (registry[`${baseName} · ${suffix}`]) {
      suffix += 1;
    }
    return `${baseName} · ${suffix}`;
  }

  async function buildRegistryFromSelection(): Promise<void> {
    const selection = figma.currentPage.selection;
    const instances = selection.filter(
      (node): node is FigmaInstanceNode => node.type === 'INSTANCE',
    );

    if (!instances.length) {
      throw new Error('Select at least one component instance in Figma.');
    }

    const registry: ComponentRegistry = {};
    const warnings: string[] = [];
    const seenKeys = new Set<string>();

    for (const instance of instances) {
      const mainComponent = await instance.getMainComponentAsync();
      if (!mainComponent) {
        warnings.push(`${instance.name}: main component is unavailable.`);
        continue;
      }

      const figmaKey = mainComponent.key.trim();
      if (!figmaKey) {
        warnings.push(`${instance.name}: published component key is empty.`);
        continue;
      }

      if (seenKeys.has(figmaKey)) {
        warnings.push(`${instance.name}: duplicate component key skipped.`);
        continue;
      }
      seenKeys.add(figmaKey);

      const parent = mainComponent.parent;
      const componentSetName =
        isComponentSetNode(parent) ? parent.name : undefined;
      const registryName = getRegistryName(
        componentSetName ?? mainComponent.name,
        registry,
      );

      registry[registryName] = {
        figmaKey,
        componentName: mainComponent.name,
        ...(componentSetName ? { componentSetName } : {}),
        isRemote: mainComponent.remote,
        properties: getProperties(instance, mainComponent),
      };
    }

    const skippedNonInstances = selection.length - instances.length;
    if (skippedNonInstances > 0) {
      warnings.push(`${skippedNonInstances} non-instance selection(s) skipped.`);
    }

    if (!Object.keys(registry).length) {
      throw new Error(
        'No importable published component keys were found in the selection.',
      );
    }

    figma.ui.postMessage({
      type: 'registry-built',
      registryJson: JSON.stringify(registry, null, 2),
      count: Object.keys(registry).length,
      warnings,
    });
  }

  function parseRegistry(json: string): Array<[string, RegistryEntry]> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error('Registry JSON is not valid JSON.');
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Registry must be a JSON object keyed by component name.');
    }

    const validEntries: Array<[string, RegistryEntry]> = [];
    for (const [name, rawEntry] of Object.entries(parsed)) {
      if (
        rawEntry &&
        typeof rawEntry === 'object' &&
        'figmaKey' in rawEntry &&
        typeof (rawEntry as { figmaKey?: unknown }).figmaKey === 'string' &&
        (rawEntry as { figmaKey: string }).figmaKey.trim()
      ) {
        validEntries.push([name, rawEntry as RegistryEntry]);
      }
    }

    if (!validEntries.length) {
      throw new Error('Registry does not contain any valid figmaKey entries.');
    }

    return validEntries.slice(0, MAX_TEST_INSTANCES);
  }

  async function createTestInstances(registryJson: string): Promise<void> {
    const entries = parseRegistry(registryJson);
    const imported = await Promise.all(
      entries.map(async ([registryName, entry]) => {
        try {
          const component = await figma.importComponentByKeyAsync(
            entry.figmaKey.trim(),
          );
          return { registryName, component };
        } catch (error) {
          throw new Error(
            `${registryName}: ${getErrorMessage(error)}`,
          );
        }
      }),
    );

    const frame = figma.createFrame();
    frame.name = 'VK DS registry test instances';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = 16;
    frame.paddingTop = 24;
    frame.paddingRight = 24;
    frame.paddingBottom = 24;
    frame.paddingLeft = 24;
    frame.fills = [];

    const createdNames: string[] = [];
    for (const { registryName, component } of imported) {
      const instance = component.createInstance();
      frame.appendChild(instance);
      createdNames.push(registryName);
    }

    frame.x = Math.round(figma.viewport.center.x - frame.width / 2);
    frame.y = Math.round(figma.viewport.center.y);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);

    figma.ui.postMessage({
      type: 'instances-created',
      count: createdNames.length,
      names: createdNames,
    });
    figma.notify(`Created ${createdNames.length} real library instance(s).`);
  }

  figma.ui.onmessage = async (message: unknown) => {
    if (!isIncomingMessage(message)) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Unsupported plugin message.',
      });
      return;
    }

    figma.ui.postMessage({ type: 'busy', busy: true });
    try {
      if (message.type === 'build-registry') {
        await buildRegistryFromSelection();
      } else {
        await createTestInstances(message.registryJson);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      figma.ui.postMessage({ type: 'error', message: errorMessage });
      figma.notify(errorMessage, { error: true });
    } finally {
      figma.ui.postMessage({ type: 'busy', busy: false });
    }
  };
})();
