declare const __html__: string;

type FigmaComponentPropertyType =
  | 'BOOLEAN'
  | 'INSTANCE_SWAP'
  | 'SLOT'
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
  readonly id: string;
  readonly type: string;
  readonly parent: FigmaBaseNode | null;
  name: string;
  remove(): void;
}

interface FigmaFontName {
  readonly family: string;
  readonly style: string;
}

interface FigmaTextNode extends FigmaBaseNode {
  readonly type: 'TEXT';
  characters: string;
  readonly hasMissingFont: boolean;
  getStyledTextSegments(
    fields: readonly ['fontName'],
  ): Array<{ readonly fontName: FigmaFontName }>;
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
  readonly width: number;
  readonly height: number;
  readonly componentProperties: Readonly<Record<string, FigmaComponentProperty>>;
  layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL';
  findAllWithCriteria(criteria: { types: readonly ['TEXT'] }): FigmaTextNode[];
  getMainComponentAsync(): Promise<FigmaComponentNode | null>;
  setProperties(properties: Record<string, string | boolean>): void;
}

type FigmaSceneNode =
  | FigmaInstanceNode
  | FigmaTextNode
  | (FigmaBaseNode & { readonly type: Exclude<string, 'INSTANCE' | 'TEXT'> });

interface FigmaFrameNode extends FigmaBaseNode {
  readonly type: 'FRAME';
  readonly width: number;
  readonly height: number;
  x: number;
  y: number;
  clipsContent: boolean;
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode: 'FIXED' | 'AUTO';
  counterAxisSizingMode: 'FIXED' | 'AUTO';
  counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE';
  itemSpacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  fills: readonly unknown[];
  appendChild(node: FigmaSceneNode): void;
  resize(width: number, height: number): void;
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
  skipInvisibleInstanceChildren: boolean;
  showUI(
    html: string,
    options: { width: number; height: number; themeColors?: boolean },
  ): void;
  createFrame(): FigmaFrameNode;
  importComponentByKeyAsync(key: string): Promise<FigmaComponentNode>;
  loadFontAsync(fontName: FigmaFontName): Promise<void>;
  notify(message: string, options?: { error?: boolean; timeout?: number }): void;
}

declare const figma: FigmaPluginApi;
