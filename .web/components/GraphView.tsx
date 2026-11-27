"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GraphData } from "@/lib/content/graph";

// Canvas / window に依存するため SSR 禁止。型は react-force-graph-2d のジェネリクスが
// 動的 import + ref forwarding と噛み合いにくいので、このコンポーネント内だけ any を許容する。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
}) as any;

function hrefFor(slug: string): string {
  return slug === ""
    ? "/"
    : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export default function GraphView() {
  const [data, setData] = useState<GraphData | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const neighborsRef = useRef<Map<string, Set<string>>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

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

  // コンテナの実サイズを明示的に ForceGraph2D へ渡す。
  // 渡さないと canvas が内部デフォルト値で描画され、親の範囲を無視して右側に広がり続けるバグになる。
  // container 要素はデータ読み込み完了後にしか DOM に存在しないため、data を依存配列に含める。
  // biome-ignore lint/correctness/useExhaustiveDependencies: data 自体は使わないが、マウント後に再実行するためのトリガーとして必要
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (!data || !fgRef.current) return;
    // .obsidian/graph.json の linkDistance:250 / repelStrength:10 に近づけた物理パラメータ
    fgRef.current.d3Force("link")?.distance(90);
    fgRef.current.d3Force("charge")?.strength(-50);
    // ルート(トップページ, id === "")をグラフの中心に固定する。
    const root = data.nodes.find((n) => n.id === "");
    if (root) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = root as any;
      r.fx = 0;
      r.fy = 0;
    }
  }, [data]);

  const isDimmed = useCallback(
    (id: string) => {
      if (!hoverId) return false;
      if (id === hoverId) return false;
      return !neighborsRef.current.get(hoverId)?.has(id);
    },
    [hoverId],
  );

  if (!data) {
    return (
      <div className="p-8 text-sm text-ink-500 dark:text-ink-400">
        グラフを読み込み中…
      </div>
    );
  }

  const dimmedNodeColor = dark ? "#4a4a4a" : "#e2e2e2";
  const linkColor = dark ? "#4a4a4a" : "#c7c7c7";

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-10rem)] w-full overflow-hidden border border-ink-200 dark:border-ink-700"
    >
      <ForceGraph2D
        ref={fgRef}
        width={size.width || undefined}
        height={size.height || undefined}
        graphData={data}
        backgroundColor={dark ? "#161616" : "#ffffff"}
        nodeId="id"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeLabel={(n: any) =>
          `${n.title}${n.category ? ` (${n.category})` : ""}`
        }
        nodeRelSize={4}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeColor={(n: any) => (isDimmed(n.id) ? dimmedNodeColor : n.color)}
        linkColor={() => linkColor}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        linkWidth={(l: any) => {
          const s = typeof l.source === "string" ? l.source : l.source.id;
          const t = typeof l.target === "string" ? l.target : l.target.id;
          return isDimmed(s) || isDimmed(t) ? 0.3 : 1;
        }}
        linkDirectionalArrowLength={0}
        d3VelocityDecay={0.35}
        cooldownTime={6000}
        onEngineStop={() => {
          const fg = fgRef.current;
          if (!fg) return;
          fg.zoomToFit(400, 40);
          // zoomToFit は全ノードの重心に合わせるため、ルートが中心からずれることがある。
          // ズーム倍率はそのままに、ルート (0, 0) へ中心を合わせ直す。
          setTimeout(() => fg.centerAt(0, 0, 200), 420);
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onNodeHover={(n: any) => setHoverId(n ? n.id : null)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onNodeClick={(n: any) => router.push(hrefFor(n.id))}
      />
    </div>
  );
}
