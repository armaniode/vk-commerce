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
    instanceName?: string;
    isRemote: boolean;
    properties: RegistryProperty[];
  };

  type ComponentRegistry = Record<string, RegistryEntry>;

  type ScreenChildSpec = {
    component: string;
    props: Record<string, unknown>;
  };

  type ScreenSpec = {
    name: string;
    width: number;
    children: ScreenChildSpec[];
  };

  type AppliedPropertyReport = {
    item: number;
    component: string;
    requestedProperty: string;
    figmaProperty: string;
    value: string | boolean;
    method: 'component-property' | 'text-override' | 'layout';
    nodePath?: string;
    fonts?: string[];
  };

  type SkippedPropertyReport = {
    item: number;
    component: string;
    requestedProperty: string;
    reason: string;
  };

  type ScreenGenerationReport = {
    screenName: string;
    width: number;
    childResults: Array<{
      item: number;
      component: string;
      status: 'created' | 'missing-registry-entry' | 'import-error';
      registryEntry?: string;
      reason?: string;
      requestedProperties: string[];
    }>;
    registryEntries: Array<{
      registryEntry: string;
      componentName: string;
      componentSetName?: string;
      instanceName?: string;
      aliases: string[];
    }>;
    createdInstances: Array<{
      item: number;
      component: string;
      registryEntry: string;
      figmaKey: string;
      stretchedToScreenWidth: boolean;
    }>;
    appliedProperties: AppliedPropertyReport[];
    skippedProperties: SkippedPropertyReport[];
    inspectedComponents: RegistryComponentInspection[];
    missingRegistryComponents: Array<{
      item: number;
      component: string;
      reason: string;
    }>;
    importErrors: Array<{
      item: number;
      component: string;
      message: string;
    }>;
  };

  type TextNodeInspection = {
    nodeName: string;
    nodePath: string;
    characters: string;
    hasMissingFont: boolean;
    fonts: string[];
  };

  type RegistryComponentInspection = {
    registryEntry: string;
    registryAliases: string[];
    figmaKey: string;
    componentName: string;
    properties: RegistryProperty[];
    textNodes: TextNodeInspection[];
  };

  type TextOverrideRule = {
    defaultCharacters: readonly string[];
    nodeNames?: readonly string[];
  };

  type SemanticPropertyRule = {
    propertyAliases?: readonly string[];
    textOverride?: TextOverrideRule;
    layout?: 'fill-horizontal';
    componentValueWhenTrue?: string;
  };

  type ComponentAdapter = {
    properties: Readonly<Record<string, SemanticPropertyRule>>;
  };

  type IncomingMessage =
    | { type: 'build-registry' }
    | { type: 'create-test-instances'; registryJson: string }
    | { type: 'inspect-registry-properties'; registryJson: string }
    | {
        type: 'create-screen-from-spec';
        registryJson: string;
        screenSpecJson: string;
      };

  const MAX_TEST_INSTANCES = 3;
  const DEFAULT_SCREEN_WIDTH = 393;
  const SCREEN_ITEM_SPACING = 16;

  const COMPONENT_ADAPTERS: Readonly<Record<string, ComponentAdapter>> = {
    topbar: {
      properties: {
        title: {
          propertyAliases: ['title'],
          textOverride: {
            defaultCharacters: ['Title'],
            nodeNames: ['Title'],
          },
        },
      },
    },
    formfields: {
      properties: {
        label: {
          propertyAliases: ['label'],
          textOverride: {
            defaultCharacters: ['Label'],
            nodeNames: ['Label'],
          },
        },
        value: {
          propertyAliases: ['value'],
          textOverride: {
            defaultCharacters: ['Action is eloquence'],
          },
        },
      },
    },
    button: {
      properties: {
        text: {
          propertyAliases: ['text'],
          textOverride: {
            defaultCharacters: ['Button'],
            nodeNames: ['Button'],
          },
        },
        stretched: {
          propertyAliases: ['width'],
          layout: 'fill-horizontal',
          componentValueWhenTrue: 'Filled',
        },
      },
    },
  };

  figma.showUI(__html__, {
    width: 520,
    height: 760,
    themeColors: true,
  });
  figma.skipInvisibleInstanceChildren = true;

  function isIncomingMessage(value: unknown): value is IncomingMessage {
    if (!value || typeof value !== 'object' || !('type' in value)) {
      return false;
    }

    const type = (value as { type?: unknown }).type;
    if (type === 'build-registry') {
      return true;
    }

    if (
      (type === 'create-test-instances' ||
        type === 'inspect-registry-properties') &&
      'registryJson' in value &&
      typeof (value as { registryJson?: unknown }).registryJson === 'string'
    ) {
      return true;
    }

    return (
      type === 'create-screen-from-spec' &&
      'registryJson' in value &&
      typeof (value as { registryJson?: unknown }).registryJson === 'string' &&
      'screenSpecJson' in value &&
      typeof (value as { screenSpecJson?: unknown }).screenSpecJson === 'string'
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
        componentSetName || instance.name || mainComponent.name,
        registry,
      );

      registry[registryName] = {
        figmaKey,
        componentName: mainComponent.name,
        ...(componentSetName ? { componentSetName } : {}),
        instanceName: instance.name,
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

  function parseRegistry(json: string): ComponentRegistry {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error('Registry JSON is not valid JSON.');
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Registry must be a JSON object keyed by component name.');
    }

    const validEntries: ComponentRegistry = {};
    for (const [name, rawEntry] of Object.entries(parsed)) {
      if (
        rawEntry &&
        typeof rawEntry === 'object' &&
        'figmaKey' in rawEntry &&
        typeof (rawEntry as { figmaKey?: unknown }).figmaKey === 'string' &&
        (rawEntry as { figmaKey: string }).figmaKey.trim()
      ) {
        const entry = rawEntry as Partial<RegistryEntry> & { figmaKey: string };
        validEntries[name] = {
          figmaKey: entry.figmaKey.trim(),
          componentName:
            typeof entry.componentName === 'string' ? entry.componentName : name,
          ...(typeof entry.componentSetName === 'string'
            ? { componentSetName: entry.componentSetName }
            : {}),
          ...(typeof entry.instanceName === 'string'
            ? { instanceName: entry.instanceName }
            : {}),
          isRemote: entry.isRemote === true,
          properties: Array.isArray(entry.properties) ? entry.properties : [],
        };
      }
    }

    if (!Object.keys(validEntries).length) {
      throw new Error('Registry does not contain any valid figmaKey entries.');
    }

    return validEntries;
  }

  async function createTestInstances(registryJson: string): Promise<void> {
    const entries = Object.entries(parseRegistry(registryJson)).slice(
      0,
      MAX_TEST_INSTANCES,
    );
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

  function getTextNodePath(
    node: FigmaTextNode,
    root: FigmaInstanceNode,
  ): string {
    const parts: string[] = [];
    let current: FigmaBaseNode | null = node;

    while (current) {
      parts.push(current.name || current.type);
      if (current.id === root.id) {
        break;
      }
      current = current.parent;
    }

    return parts.reverse().join(' / ');
  }

  function getTextNodeFonts(node: FigmaTextNode): string[] {
    if (node.hasMissingFont || !node.characters.length) {
      return [];
    }

    return [
      ...new Set(
        node
          .getStyledTextSegments(['fontName'])
          .map(({ fontName }) => `${fontName.family} · ${fontName.style}`),
      ),
    ];
  }

  function inspectTextNodes(instance: FigmaInstanceNode): TextNodeInspection[] {
    return instance.findAllWithCriteria({ types: ['TEXT'] }).map((node) => ({
      nodeName: node.name,
      nodePath: getTextNodePath(node, instance),
      characters: node.characters,
      hasMissingFont: node.hasMissingFont,
      fonts: getTextNodeFonts(node),
    }));
  }

  function inspectComponentInstance(
    registryEntry: string,
    registryAliases: string[],
    figmaKey: string,
    component: FigmaComponentNode,
    instance: FigmaInstanceNode,
  ): RegistryComponentInspection {
    return {
      registryEntry,
      registryAliases,
      figmaKey,
      componentName: component.name,
      properties: getProperties(instance, component),
      textNodes: inspectTextNodes(instance),
    };
  }

  async function inspectRegistryProperties(registryJson: string): Promise<void> {
    const registry = parseRegistry(registryJson);
    const components: RegistryComponentInspection[] = [];
    const errors: Array<{ registryEntry: string; message: string }> = [];

    for (const [registryEntry, entry] of Object.entries(registry)) {
      let instance: FigmaInstanceNode | undefined;
      try {
        const component = await figma.importComponentByKeyAsync(entry.figmaKey);
        instance = component.createInstance();
        components.push(
          inspectComponentInstance(
            registryEntry,
            getRegistryEntryAliases(registryEntry, entry),
            entry.figmaKey,
            component,
            instance,
          ),
        );
      } catch (error) {
        errors.push({
          registryEntry,
          message: getErrorMessage(error),
        });
      } finally {
        instance?.remove();
      }
    }

    figma.ui.postMessage({
      type: 'registry-inspected',
      components,
      errors,
    });
  }

  function parseScreenSpec(json: string): ScreenSpec {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error('Screen specification is not valid JSON.');
    }

    if (!parsed || typeof parsed !== 'object' || !('screen' in parsed)) {
      throw new Error('Screen specification must contain a screen object.');
    }

    const rawScreen = (parsed as { screen?: unknown }).screen;
    if (!rawScreen || typeof rawScreen !== 'object') {
      throw new Error('screen must be a JSON object.');
    }

    const screenRecord = rawScreen as Record<string, unknown>;
    const rawName = screenRecord.name;
    const rawWidth = screenRecord.width;
    const rawChildren = screenRecord.children;

    if (!Array.isArray(rawChildren)) {
      throw new Error('screen.children must be an array.');
    }

    const width =
      typeof rawWidth === 'number' &&
      Number.isFinite(rawWidth) &&
      rawWidth > 0
        ? rawWidth
        : DEFAULT_SCREEN_WIDTH;

    const children = rawChildren.map((rawChild): ScreenChildSpec => {
      if (!rawChild || typeof rawChild !== 'object') {
        return { component: '', props: {} };
      }

      const childRecord = rawChild as Record<string, unknown>;
      const rawProps = childRecord.props;
      return {
        component:
          typeof childRecord.component === 'string'
            ? childRecord.component.trim()
            : '',
        props:
          rawProps && typeof rawProps === 'object' && !Array.isArray(rawProps)
            ? (rawProps as Record<string, unknown>)
            : {},
      };
    });

    return {
      name:
        typeof rawName === 'string' && rawName.trim()
          ? rawName.trim()
          : 'Generated screen',
      width,
      children,
    };
  }

  function normalizeName(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace(/[^a-zа-яё0-9]+/gi, '');
  }

  function stripVariantAssignments(value: string): string {
    const withoutVersion = value.replace(
      /\s+(?:v(?:ersion)?\s*)?\d+(?:\.\d+)+\s*$/i,
      '',
    );
    const withoutParenthesizedVariant = withoutVersion.split(/[\[(]/)[0].trim();
    const commaParts = withoutParenthesizedVariant.split(',');
    const nonVariantParts: string[] = [];

    for (const part of commaParts) {
      if (part.includes('=')) {
        const prefix = part.slice(0, part.indexOf('=')).trim();
        const lastSpace = prefix.lastIndexOf(' ');
        const prefixWithoutProperty =
          lastSpace >= 0 ? prefix.slice(0, lastSpace).trim() : '';
        if (prefixWithoutProperty) {
          nonVariantParts.push(prefixWithoutProperty);
        }
        break;
      }
      nonVariantParts.push(part.trim());
    }

    return nonVariantParts.filter(Boolean).join(', ').trim();
  }

  function getSafeNameAliases(value: string): string[] {
    const aliases = new Set<string>();
    const add = (candidate: string) => {
      const normalized = normalizeName(candidate);
      if (normalized) {
        aliases.add(normalized);
      }
    };

    add(value.trim());
    for (const segment of value.split(/\s*(?:\/|\\|>|›|·|—|\|)+\s*/)) {
      const stripped = stripVariantAssignments(segment);
      if (stripped && !stripped.includes('=')) {
        add(stripped);
      }
    }

    const strippedFullName = stripVariantAssignments(value);
    if (strippedFullName && !strippedFullName.includes('=')) {
      add(strippedFullName);
    }

    return [...aliases];
  }

  function getEntryNames(
    registryName: string,
    entry: RegistryEntry,
  ): string[] {
    return [
      registryName,
      entry.instanceName,
      entry.componentSetName,
      entry.componentName,
    ].filter((name): name is string => Boolean(name?.trim()));
  }

  function getRegistryEntryAliases(
    registryName: string,
    entry: RegistryEntry,
  ): string[] {
    return [
      ...new Set(
        getEntryNames(registryName, entry).flatMap(getSafeNameAliases),
      ),
    ];
  }

  function findRegistryEntry(
    requestedName: string,
    registry: ComponentRegistry,
  ):
    | { matched: true; registryName: string; entry: RegistryEntry }
    | { matched: false; reason: string } {
    if (!requestedName) {
      return { matched: false, reason: 'Component name is missing in spec.' };
    }

    const entries = Object.entries(registry);
    const directRegistryMatch = entries.find(
      ([registryName]) =>
        registryName.trim().toLocaleLowerCase() ===
        requestedName.toLocaleLowerCase(),
    );
    if (directRegistryMatch) {
      const [registryName, entry] = directRegistryMatch;
      return { matched: true, registryName, entry };
    }

    const requestedAliases = new Set(getSafeNameAliases(requestedName));
    const normalizedMatches = entries.filter(([registryName, entry]) =>
      getRegistryEntryAliases(registryName, entry).some((alias) =>
        requestedAliases.has(alias),
      ),
    );

    if (normalizedMatches.length === 1) {
      const [registryName, entry] = normalizedMatches[0];
      return { matched: true, registryName, entry };
    }

    return {
      matched: false,
      reason:
        normalizedMatches.length > 1
          ? `Registry lookup is ambiguous (${normalizedMatches.length} safe-name matches).`
          : `No matching registry entry. Available entries: ${entries
              .map(([registryName]) => registryName)
              .join(', ')}.`,
    };
  }

  function getPropertyBaseName(name: string): string {
    return name.split('#')[0].trim();
  }

  function getComponentAdapter(
    child: ScreenChildSpec,
    registryName: string,
    entry: RegistryEntry,
  ): ComponentAdapter | undefined {
    const names = [child.component, ...getEntryNames(registryName, entry)].map(
      normalizeName,
    );

    for (const [adapterName, adapter] of Object.entries(COMPONENT_ADAPTERS)) {
      if (names.includes(adapterName)) {
        return adapter;
      }
    }

    return undefined;
  }

  const TEXT_PROPERTY_ALIASES: Readonly<Record<string, readonly string[]>> = {
    title: ['title', 'headline', 'header', 'name', 'text', 'label'],
    label: ['label', 'title', 'text', 'caption'],
    value: ['value', 'text', 'content'],
    text: ['text', 'label', 'content', 'title'],
  };

  function getPropertyMatchScore(
    requestedName: string,
    requestedValue: string | boolean,
    propertyName: string,
    property: FigmaComponentProperty,
    adapterAliases: readonly string[],
    strictAdapterMatch: boolean,
  ): number {
    const normalizedRequest = normalizeName(requestedName);
    const normalizedProperty = normalizeName(getPropertyBaseName(propertyName));

    if (typeof requestedValue === 'boolean') {
      return property.type === 'BOOLEAN' && normalizedProperty === normalizedRequest
        ? 100
        : -1;
    }

    if (property.type !== 'TEXT' && property.type !== 'VARIANT') {
      return -1;
    }

    if (normalizedProperty === normalizedRequest) {
      return 100;
    }

    if (property.type === 'VARIANT') {
      return -1;
    }

    const aliases = strictAdapterMatch
      ? adapterAliases.map(normalizeName)
      : [
          ...adapterAliases.map(normalizeName),
          ...(TEXT_PROPERTY_ALIASES[normalizedRequest] ?? []),
        ];
    const aliasIndex = aliases.indexOf(normalizedProperty);
    if (aliasIndex >= 0) {
      return 90 - aliasIndex;
    }

    if (strictAdapterMatch) {
      return -1;
    }

    if (
      normalizedRequest.length >= 4 &&
      (normalizedProperty.includes(normalizedRequest) ||
        normalizedRequest.includes(normalizedProperty))
    ) {
      return 75;
    }

    return -1;
  }

  function findPropertyMatch(
    instance: FigmaInstanceNode,
    requestedName: string,
    requestedValue: string | boolean,
    usedProperties: ReadonlySet<string>,
    adapterAliases: readonly string[] = [],
    strictAdapterMatch = false,
  ):
    | { matched: true; propertyName: string }
    | { matched: false; reason: string } {
    const properties = Object.entries(instance.componentProperties).filter(
      ([propertyName]) => !usedProperties.has(propertyName),
    );
    const scored = properties
      .map(([propertyName, property]) => ({
        propertyName,
        score: getPropertyMatchScore(
          requestedName,
          requestedValue,
          propertyName,
          property,
          adapterAliases,
          strictAdapterMatch,
        ),
      }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score);

    if (!scored.length) {
      return {
        matched: false,
        reason: 'No compatible TEXT, BOOLEAN or exact VARIANT property.',
      };
    }

    if (scored.length > 1 && scored[0].score === scored[1].score) {
      return {
        matched: false,
        reason: `Property match is ambiguous (${scored[0].score} score).`,
      };
    }

    return { matched: true, propertyName: scored[0].propertyName };
  }

  function findSemanticPropertyRule(
    adapter: ComponentAdapter | undefined,
    requestedProperty: string,
  ): SemanticPropertyRule | undefined {
    const normalizedRequest = normalizeName(requestedProperty);
    return Object.entries(adapter?.properties ?? {}).find(
      ([semanticName]) => normalizeName(semanticName) === normalizedRequest,
    )?.[1];
  }

  function findTextOverrideTarget(
    instance: FigmaInstanceNode,
    rule: TextOverrideRule,
    usedTextNodes: ReadonlySet<FigmaTextNode>,
  ):
    | { matched: true; node: FigmaTextNode }
    | { matched: false; reason: string } {
    const defaultCharacters = new Set(rule.defaultCharacters);
    const nodeNames = new Set((rule.nodeNames ?? []).map(normalizeName));
    const candidates = instance
      .findAllWithCriteria({ types: ['TEXT'] })
      .filter((node) => !usedTextNodes.has(node))
      .map((node) => ({
        node,
        score:
          (defaultCharacters.has(node.characters) ? 100 : 0) +
          (nodeNames.has(normalizeName(node.name)) ? 10 : 0),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    if (!candidates.length) {
      return {
        matched: false,
        reason: `No source text node matched defaults: ${[
          ...defaultCharacters,
        ].join(', ')}.`,
      };
    }

    if (
      candidates.length > 1 &&
      candidates[0].score === candidates[1].score
    ) {
      return {
        matched: false,
        reason: `Text override is ambiguous (${candidates.length} candidates).`,
      };
    }

    return { matched: true, node: candidates[0].node };
  }

  async function loadTextNodeFonts(node: FigmaTextNode): Promise<void> {
    if (node.hasMissingFont) {
      throw new Error(`Text node "${node.name}" has a missing font.`);
    }

    if (!node.characters.length) {
      return;
    }

    const uniqueFonts = new Map<string, FigmaFontName>();
    for (const { fontName } of node.getStyledTextSegments(['fontName'])) {
      uniqueFonts.set(`${fontName.family}\u0000${fontName.style}`, fontName);
    }

    await Promise.all(
      [...uniqueFonts.values()].map((fontName) =>
        figma.loadFontAsync(fontName),
      ),
    );
  }

  async function applyTextOverride(
    node: FigmaTextNode,
    value: string,
    root: FigmaInstanceNode,
  ): Promise<{ targetDescription: string; nodePath: string; fonts: string[] }> {
    const previousCharacters = node.characters;
    const nodePath = getTextNodePath(node, root);
    const fonts = getTextNodeFonts(node);
    await loadTextNodeFonts(node);
    node.characters = value;
    return {
      targetDescription: `Text node "${node.name}" (was "${previousCharacters}")`,
      nodePath,
      fonts,
    };
  }

  async function applyScreenProperties(
    instance: FigmaInstanceNode,
    child: ScreenChildSpec,
    registryName: string,
    entry: RegistryEntry,
    item: number,
    report: ScreenGenerationReport,
  ): Promise<{ stretchRequestedBy?: string }> {
    const usedProperties = new Set<string>();
    const usedTextNodes = new Set<FigmaTextNode>();
    const adapter = getComponentAdapter(child, registryName, entry);
    let stretchRequestedBy: string | undefined;
    const requestedProperties = Object.entries(child.props).sort(
      ([firstName], [secondName]) => {
        const firstIsLayout = Boolean(
          findSemanticPropertyRule(adapter, firstName)?.layout,
        );
        const secondIsLayout = Boolean(
          findSemanticPropertyRule(adapter, secondName)?.layout,
        );
        return Number(secondIsLayout) - Number(firstIsLayout);
      },
    );

    for (const [requestedProperty, rawValue] of requestedProperties) {
      if (typeof rawValue !== 'string' && typeof rawValue !== 'boolean') {
        report.skippedProperties.push({
          item,
          component: child.component,
          requestedProperty,
          reason: 'Only string and boolean property values are supported.',
        });
        continue;
      }

      const semanticRule = findSemanticPropertyRule(
        adapter,
        requestedProperty,
      );
      if (semanticRule?.layout === 'fill-horizontal') {
        if (rawValue === true) {
          stretchRequestedBy = requestedProperty;
          if (semanticRule.componentValueWhenTrue) {
            const variantMatch = findPropertyMatch(
              instance,
              semanticRule.propertyAliases?.[0] ?? requestedProperty,
              semanticRule.componentValueWhenTrue,
              usedProperties,
              semanticRule.propertyAliases,
              true,
            );
            if (variantMatch.matched) {
              try {
                instance.setProperties({
                  [variantMatch.propertyName]:
                    semanticRule.componentValueWhenTrue,
                });
                usedProperties.add(variantMatch.propertyName);
                report.appliedProperties.push({
                  item,
                  component: child.component,
                  requestedProperty,
                  figmaProperty: variantMatch.propertyName,
                  value: semanticRule.componentValueWhenTrue,
                  method: 'component-property',
                });
              } catch (error) {
                report.skippedProperties.push({
                  item,
                  component: child.component,
                  requestedProperty,
                  reason: `Figma rejected the Filled variant: ${getErrorMessage(
                    error,
                  )}`,
                });
              }
            }
          }
        } else if (rawValue !== false) {
          report.skippedProperties.push({
            item,
            component: child.component,
            requestedProperty,
            reason: 'The stretched layout alias expects a boolean.',
          });
        }
        continue;
      }

      const match = findPropertyMatch(
        instance,
        requestedProperty,
        rawValue,
        usedProperties,
        semanticRule?.propertyAliases,
        Boolean(semanticRule),
      );
      if (match.matched) {
        try {
          instance.setProperties({ [match.propertyName]: rawValue });
          usedProperties.add(match.propertyName);
          report.appliedProperties.push({
            item,
            component: child.component,
            requestedProperty,
            figmaProperty: match.propertyName,
            value: rawValue,
            method: 'component-property',
          });
        } catch (error) {
          report.skippedProperties.push({
            item,
            component: child.component,
            requestedProperty,
            reason: `Figma rejected the value: ${getErrorMessage(error)}`,
          });
        }
        continue;
      }

      if (typeof rawValue === 'string' && semanticRule?.textOverride) {
        const textTarget = findTextOverrideTarget(
          instance,
          semanticRule.textOverride,
          usedTextNodes,
        );
        if (textTarget.matched) {
          try {
            const textOverride = await applyTextOverride(
              textTarget.node,
              rawValue,
              instance,
            );
            usedTextNodes.add(textTarget.node);
            report.appliedProperties.push({
              item,
              component: child.component,
              requestedProperty,
              figmaProperty: textOverride.targetDescription,
              value: rawValue,
              method: 'text-override',
              nodePath: textOverride.nodePath,
              fonts: textOverride.fonts,
            });
          } catch (error) {
            report.skippedProperties.push({
              item,
              component: child.component,
              requestedProperty,
              reason: `Text override failed: ${getErrorMessage(error)}`,
            });
          }
          continue;
        }

        report.skippedProperties.push({
          item,
          component: child.component,
          requestedProperty,
          reason: `${match.reason} ${textTarget.reason}`,
        });
        continue;
      }

      report.skippedProperties.push({
        item,
        component: child.component,
        requestedProperty,
        reason: match.reason,
      });
    }

    return stretchRequestedBy ? { stretchRequestedBy } : {};
  }

  function shouldStretchInstance(
    instance: FigmaInstanceNode,
    screenWidth: number,
  ): boolean {
    if (instance.width <= 0 || instance.height <= 0) {
      return false;
    }

    const aspectRatio = instance.width / instance.height;
    const looksCompact =
      instance.width <= 128 && aspectRatio >= 0.5 && aspectRatio <= 2;
    return !looksCompact && instance.width >= screenWidth * 0.5;
  }

  function tryStretchInstance(
    instance: FigmaInstanceNode,
    screenWidth: number,
  ): boolean {
    if (!shouldStretchInstance(instance, screenWidth)) {
      return false;
    }

    try {
      instance.layoutSizingHorizontal = 'FILL';
      return true;
    } catch {
      return false;
    }
  }

  function createScreenFrame(screen: ScreenSpec): FigmaFrameNode {
    const frame = figma.createFrame();
    frame.name = screen.name;
    frame.resize(screen.width, 1);
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = SCREEN_ITEM_SPACING;
    frame.paddingTop = 0;
    frame.paddingRight = 0;
    frame.paddingBottom = 0;
    frame.paddingLeft = 0;
    frame.fills = [];
    frame.clipsContent = false;
    return frame;
  }

  async function createScreenFromSpec(
    registryJson: string,
    screenSpecJson: string,
  ): Promise<void> {
    const registry = parseRegistry(registryJson);
    const screen = parseScreenSpec(screenSpecJson);
    const report: ScreenGenerationReport = {
      screenName: screen.name,
      width: screen.width,
      childResults: [],
      registryEntries: Object.entries(registry).map(
        ([registryEntry, entry]) => ({
          registryEntry,
          componentName: entry.componentName,
          ...(entry.componentSetName
            ? { componentSetName: entry.componentSetName }
            : {}),
          ...(entry.instanceName ? { instanceName: entry.instanceName } : {}),
          aliases: getRegistryEntryAliases(registryEntry, entry),
        }),
      ),
      createdInstances: [],
      appliedProperties: [],
      skippedProperties: [],
      inspectedComponents: [],
      missingRegistryComponents: [],
      importErrors: [],
    };
    const frame = createScreenFrame(screen);
    const importCache = new Map<string, Promise<FigmaComponentNode>>();
    const inspectedKeys = new Set<string>();

    for (const [childIndex, child] of screen.children.entries()) {
      const item = childIndex + 1;
      const registryMatch = findRegistryEntry(child.component, registry);
      if (!registryMatch.matched) {
        report.childResults.push({
          item,
          component: child.component || '(missing component name)',
          status: 'missing-registry-entry',
          reason: registryMatch.reason,
          requestedProperties: Object.keys(child.props),
        });
        report.missingRegistryComponents.push({
          item,
          component: child.component || '(missing component name)',
          reason: registryMatch.reason,
        });
        continue;
      }

      const { registryName, entry } = registryMatch;
      try {
        let componentPromise = importCache.get(entry.figmaKey);
        if (!componentPromise) {
          componentPromise = figma.importComponentByKeyAsync(entry.figmaKey);
          importCache.set(entry.figmaKey, componentPromise);
        }

        const component = await componentPromise;
        const instance = component.createInstance();
        if (!inspectedKeys.has(entry.figmaKey)) {
          report.inspectedComponents.push(
            inspectComponentInstance(
              registryName,
              getRegistryEntryAliases(registryName, entry),
              entry.figmaKey,
              component,
              instance,
            ),
          );
          inspectedKeys.add(entry.figmaKey);
        }
        const propertyResult = await applyScreenProperties(
          instance,
          child,
          registryName,
          entry,
          item,
          report,
        );
        frame.appendChild(instance);
        let stretchedToScreenWidth = false;
        if (propertyResult.stretchRequestedBy) {
          try {
            instance.layoutSizingHorizontal = 'FILL';
            stretchedToScreenWidth = true;
            report.appliedProperties.push({
              item,
              component: child.component,
              requestedProperty: propertyResult.stretchRequestedBy,
              figmaProperty: 'layoutSizingHorizontal',
              value: 'FILL',
              method: 'layout',
            });
          } catch (error) {
            report.skippedProperties.push({
              item,
              component: child.component,
              requestedProperty: propertyResult.stretchRequestedBy,
              reason: `Horizontal fill is unsupported: ${getErrorMessage(error)}`,
            });
          }
        } else {
          stretchedToScreenWidth = tryStretchInstance(instance, screen.width);
        }

        report.createdInstances.push({
          item,
          component: child.component,
          registryEntry: registryName,
          figmaKey: entry.figmaKey,
          stretchedToScreenWidth,
        });
        report.childResults.push({
          item,
          component: child.component,
          status: 'created',
          registryEntry: registryName,
          requestedProperties: Object.keys(child.props),
        });
      } catch (error) {
        const message = getErrorMessage(error);
        report.childResults.push({
          item,
          component: child.component,
          status: 'import-error',
          registryEntry: registryName,
          reason: message,
          requestedProperties: Object.keys(child.props),
        });
        report.importErrors.push({
          item,
          component: child.component,
          message,
        });
      }
    }

    frame.x = Math.round(figma.viewport.center.x - frame.width / 2);
    frame.y = Math.round(figma.viewport.center.y);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);

    figma.ui.postMessage({ type: 'screen-generated', report });
    figma.notify(
      `Generated ${report.createdInstances.length}/${screen.children.length} real library instance(s).`,
    );
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
      } else if (message.type === 'create-test-instances') {
        await createTestInstances(message.registryJson);
      } else if (message.type === 'inspect-registry-properties') {
        await inspectRegistryProperties(message.registryJson);
      } else {
        await createScreenFromSpec(
          message.registryJson,
          message.screenSpecJson,
        );
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
