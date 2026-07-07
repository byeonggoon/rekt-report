"use client";

import { useState } from "react";

/* A trace node — origin / intermediate / mixer / open. */
function Node({
  x,
  y,
  label,
  taint,
  kind,
  r = 6.5,
}: {
  x: number;
  y: number;
  label: string;
  taint: string;
  kind: "origin" | "hop" | "mixer" | "open";
  r?: number;
}) {
  const color =
    kind === "origin" || kind === "mixer"
      ? "var(--blaze)"
      : kind === "open"
        ? "var(--cyan)"
        : "var(--amber)";
  return (
    <g>
      {(kind === "origin" || kind === "mixer") && (
        <circle cx={x} cy={y} r={r + 7} fill="none" stroke={color} strokeOpacity={0.25} />
      )}
      <circle cx={x} cy={y} r={r} fill={color}>
        {kind === "origin" && (
          <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
        )}
      </circle>
      <text className="node-lbl" x={x} y={y - 15} textAnchor="middle" fill="var(--dim)">
        {label}
      </text>
      <text className="node-taint" x={x} y={y + 26} textAnchor="middle" fill={color}>
        {taint}
      </text>
    </g>
  );
}

function Flow({ d, wide = false }: { d: string; wide?: boolean }) {
  return <path className="flow" d={d} stroke="var(--amber)" strokeWidth={wide ? 2.6 : 1.6} />;
}

/**
 * Hero trace diagram for the Ronin example.
 * Collapsed by default to the one-line summary (source → final destination);
 * clicking the flow expands to the full multi-hop graph.
 */
export default function TraceDiagram() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="trace-panel" id="trace">
      <div className="trace-head">
        <span>
          Live trace — <span className="tag">Ronin exploit</span> (replay)
        </span>
        <button className="trace-toggle" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "collapse ▴" : "expand full trace ▾"}
        </button>
      </div>

      {expanded ? (
        <svg
          className="trace-svg"
          viewBox="0 0 1100 300"
          role="img"
          aria-label="Tainted funds flowing from the Ronin exploiter through intermediary wallets to Tornado Cash and an open wallet"
        >
          <Flow d="M 92 150 C 200 150, 230 92, 322 92" />
          <Flow d="M 92 150 C 200 150, 230 210, 322 210" />
          <Flow d="M 352 92 C 460 92, 500 92, 592 92" />
          <Flow d="M 352 210 C 460 210, 500 210, 592 210" />
          <Flow d="M 622 92 C 740 92, 780 92, 872 92" />
          <Flow d="M 622 210 C 740 210, 780 210, 872 210" />
          <Node x={80} y={150} label="RONIN EXPLOITER · 0x098B…2f96" taint="100%" kind="origin" r={9} />
          <Node x={340} y={92} label="0x3a1c…b7" taint="62%" kind="hop" />
          <Node x={340} y={210} label="0x9f2e…4d" taint="38%" kind="hop" />
          <Node x={610} y={92} label="0x71d0…e3" taint="41%" kind="hop" />
          <Node x={610} y={210} label="0xc44a…08" taint="27%" kind="hop" />
          <Node x={900} y={92} label="TORNADO CASH · [MIXER]" taint="10.5%" kind="mixer" />
          <Node x={900} y={210} label="0x5be1…a9 · OPEN" taint="27%" kind="open" />
        </svg>
      ) : (
        <button
          type="button"
          className="trace-collapsed"
          onClick={() => setExpanded(true)}
          aria-label="Expand the full Ronin trace"
        >
          <svg className="trace-svg" viewBox="0 0 1100 200" role="img" aria-hidden="true">
            <Flow d="M 210 100 L 890 100" wide />
            <text className="trace-flow-hint" x={550} y={82} textAnchor="middle" fill="var(--dim)">
              click to expand · 3 hops
            </text>
            <Node x={170} y={100} label="RONIN EXPLOITER · 0x098B…2f96" taint="stolen $625M" kind="origin" r={10} />
            <Node x={930} y={100} label="TORNADO CASH · [MIXER]" taint="final destination" kind="mixer" r={10} />
          </svg>
        </button>
      )}

      <div className="trace-summary">
        <span className="ts-label">Where the funds ended up</span>
        <span className="ts-dest">
          <span className="ts-dot mixer" /> Tornado Cash <span className="ts-tag">mixer</span>
        </span>
        <span className="ts-note">laundered on-chain · no CEX off-ramp reached</span>
      </div>
    </div>
  );
}
