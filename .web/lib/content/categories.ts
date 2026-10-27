// .obsidian/graph.json の colorGroups をそのまま移植(整数 RGB → "#rrggbb")。
// 対象はグラフページのみで使用し、サイト全体のモノクロ方針には混ぜない。

function rgbIntToHex(n: number): string {
  return "#" + (n & 0xffffff).toString(16).padStart(6, "0");
}

const RAW_COLOR_GROUPS: Record<string, number> = {
  "software-engineering": 5016565,
  "computer-science": 8086015,
  "business-administration": 16098851,
  information: 1752220,
  "liberal-arts": 15290234,
  humanities: 10181046,
  tools: 8359053,
  science: 3066993,
  design: 15105570,
};

export const CATEGORY_COLORS: Record<string, string> = Object.fromEntries(
  Object.entries(RAW_COLOR_GROUPS).map(([k, v]) => [k, rgbIntToHex(v)]),
);

// .obsidian/graph.json の colorGroups に定義が無いトップレベルフォルダ(development-principles 等)
// や、分類不能なノード向けの既定色(Obsidian の無配色ノードに近いニュートラルグレー)。
export const DEFAULT_NODE_COLOR = "#8a8a8a";

export function colorForCategory(category: string | undefined): string {
  if (!category) return DEFAULT_NODE_COLOR;
  return CATEGORY_COLORS[category] ?? DEFAULT_NODE_COLOR;
}
