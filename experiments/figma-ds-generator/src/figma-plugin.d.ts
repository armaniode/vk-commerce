declare const __html__: string;

type FigmaComponentPropertyType =
  | 'BOOLEAN'
  | 'INSTANCE_SWAP'
  | 'TEXT'
  | 'VARIANT';

interface FigmaPreferredValue {
  readonly type: 'COMPONENT' | 'COMPONENT_SET';
  readonly key: string;
}

interface FigmaComponentPropertyDefinition {
  readonly type: FigmaComponentPropertyType;
  readonly defaultValue: string | boolean;
  readonly variantOptions?: readonly string[];
  readonly preferredValues?: readonly FigmaPreferredValue[];
}

interface FigmaComponentProperty {
  readonly type: FigmaComponentPropertyType;
  readonly value: string | boolean;
  readonly preferredValues?: readonly FigmaPreferredValue[];
}

interface FigmaBaseNode {
  readonly type: string;
  name: string;
}

interface FigmaComponentSetNode extends FigmaBaseNode {
  readonly type: 'COMPONENT_SET';
  readonly key: string;
  readonly componentPropertyDefinitions: Readonly<
    Record<string, FigmaComponentPropertyDefinition>
  >;
}

interface FigmaComponentNode extends FigmaBaseNode {
  readonly type: 'COMPONENT';
  readonly key: string;
  readonly remote: boolean;
  readonly parent: FigmaBaseNode | FigmaComponentSetNode | null;
  readonly componentPropertyDefinitions: Readonly<
    Record<string, FigmaComponentPropertyDefinition>
  >;
  createInstance(): FigmaInstanceNode;
}

interface FigmaInstanceNode extends FigmaBaseNode {
  readonly type: 'INSTANCE';
  readonly componentProperties: Readonly<Record<string, FigmaComponentProperty>>;
  getMainComponentAsync(): Promise<FigmaComponentNode | null>;
}

type FigmaSceneNode =
  | FigmaInstanceNode
  | (FigmaBaseNode & { readonly type: Exclude<string, 'INSTANCE'> });

interface FigmaFrameNode extends FigmaBaseNode {
  readonly type: 'FRAME';
  readonly width: number;
  x: number;
  y: number;
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode: 'FIXED' | 'AUTO';
  counterAxisSizingMode: 'FIXED' | 'AUTO';
  itemSpacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  fills: readonly unknown[];
  appendChild(node: FigmaSceneNode): void;
}

interface FigmaPageNode {
  selection: FigmaSceneNode[];
}

interface FigmaPluginUi {
  onmessage: ((message: unknown) => void) | undefined;
  postMessage(message: unknown): void;
}

interface FigmaViewport {
  readonly center: { readonly x: number; readonly y: number };
  scrollAndZoomIntoView(nodes: readonly FigmaSceneNode[]): void;
}

interface FigmaPluginApi {
  readonly currentPage: FigmaPageNode;
  readonly ui: FigmaPluginUi;
  readonly viewport: FigmaViewport;
  showUI(
    html: string,
    options: { width: number; height: number; themeColors?: boolean },
  ): void;
  createFrame(): FigmaFrameNode;
  importComponentByKeyAsync(key: string): Promise<FigmaComponentNode>;
  notify(message: string, options?: { error?: boolean; timeout?: number }): void;
}

declare const figma: FigmaPluginApi;
