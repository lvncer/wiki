"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { GraphData } from "@/lib/content/graph";

// Canvas / window に依存するため SSR 禁止。型は react-force-graph-2d のジェネリクスが
// 動的 import + ref forwarding と噛み合いにくいので、このコンポーネント内だけ any を許容する。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false }) as any;

function hrefFor(slug: string): string {
  return slug === "" ? "/" : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export default function GraphView() {
  const [data, setData] = useState<GraphData | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const neighborsRef = useRef<Map<string, Set<string>>>(new Map());

  useEffect(() => {
    fetch("/generated/graph.json")
      .then((r) => r.json())
      .then((d: GraphData) => {
        const map = new Map<string, Set<string>>();
        for (const l of d.links) {
          if (!map.has(l.source)) map.set(l.source, new Set());
          if (!map.has(l.target)) map.set(l.target, new Set());
          map.get(l.source)!.add(l.target);
          map.get(l.target)!.add(l.source);
        }
        neighborsRef.current = map;
        setData(d);
      });
  }, []);

  useEffect(() => {
    if (!data || !fgRef.current) return;
    // .obsidian/graph.json の linkDistance:250 / repelStrength:10 に近づけた物理パラメータ
    fgRef.current.d3Force("link")?.distance(90);
    fgRef.current.d3Force("charge")?.strength(-50);
  }, [data]);

  const isDimmed = useCallback(
    (id: string) => {
      if (!hoverId) return false;
      if (id === hoverId) return false;
      return !neighborsRef.current.get(hoverId)?.has(id);
    },
    [hoverId]
  );

  if (!data) {
    return <div className="p-8 text-sm text-ink-500">グラフを読み込み中…</div>;
  }

  return (
    <div className="h-[calc(100vh-10rem)] w-full border border-ink-200">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeId="id"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeLabel={(n: any) => `${n.title}${n.category ? ` (${n.category})` : ""}`}
        nodeRelSize={4}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeColor={(n: any) => (isDimmed(n.id) ? "#e2e2e2" : n.color)}
        linkColor={() => "#c7c7c7"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        linkWidth={(l: any) => {
          const s = typeof l.source === "string" ? l.source : l.source.id;
          const t = typeof l.target === "string" ? l.target : l.target.id;
          return isDimmed(s) || isDimmed(t) ? 0.3 : 1;
        }}
        linkDirectionalArrowLength={0}
        d3VelocityDecay={0.35}
        cooldownTime={6000}
        onEngineStop={() => fgRef.current?.zoomToFit(400, 40)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onNodeHover={(n: any) => setHoverId(n ? n.id : null)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onNodeClick={(n: any) => router.push(hrefFor(n.id))}
      />
    </div>
  );
}
