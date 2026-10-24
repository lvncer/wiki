// public/generated/graph.json の型(生成側 lib/content/build.ts と GraphView.tsx で共有)。

export interface GraphNode {
  id: string; // slug
  title: string;
  category: string | null;
  color: string;
}

export interface GraphLink {
  source: string; // slug
  target: string; // slug
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
