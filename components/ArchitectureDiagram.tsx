import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

type Variant = Project["diagram"];

const captions: Record<Variant, string> = {
  router:
    "ADK graph: classifier emits RoutingDecision, router validates four routes, specialists call public telemetry tools.",
  slm:
    "Phi-3 Mini LoRA vs base: leaked N=4 CSV (train overlap) and frozen heldout_v1 N=13 (MEASURED, adapter lost SDG hit rate).",
  soc:
    "Splunk export → typed SecurityEvent → EvidenceRecord (id only) → correlation, timeline, optional local Kafka.",
  multimodal:
    "PDF, BLIP captions, and Whisper transcripts chunked into Chroma; MultiQueryRetriever then a local chat model.",
  retrieval:
    "Parse and chunk, lexical and/or vector retrieve, generate with citations, score overlap and latency — architecture only.",
  llmops:
    "POST /infer → ModelRouter (adapter, Ollama, remote) with the model that actually ran written to JSONL.",
  weave:
    "Intended StyleWeave loop only: image/text query → open VLM adapter → retrieval → tools → eval. Not implemented.",
  worldsense:
    "MP4 → sampled frames → Faster R-CNN → BYTE-style IDs → polygon ROI events → SQLite evidence. Local Phase 1.",
};

function Box({
  x,
  y,
  w,
  h,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="7"
        fill={accent ? "var(--diagram-fill-accent)" : "var(--diagram-fill)"}
        stroke={accent ? "var(--diagram-arrow)" : "var(--diagram-stroke)"}
        strokeWidth="1.2"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fill="var(--diagram-text)"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--diagram-arrow)"
      strokeOpacity="0.55"
      strokeWidth="1.4"
      markerEnd="url(#arrowhead)"
    />
  );
}

function SvgFrame({
  variant,
  width,
  height,
  children,
}: {
  variant: Variant;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={captions[variant]}
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full text-fg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="var(--diagram-arrow)" fillOpacity="0.85" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function RouterDiagram() {
  return (
    <>
      <div className="md:hidden">
        <SvgFrame variant="router" width={320} height={430}>
          <Box x={100} y={12} w={120} h={36} label="Query" />
          <Arrow x1={160} y1={48} x2={160} y2={68} />
          <Box x={86} y={68} w={148} h={40} label="Classifier" accent />
          <Arrow x1={160} y1={108} x2={160} y2={128} />
          <Box x={86} y={128} w={148} h={44} label="Router" accent />
          <text
            x={160}
            y={188}
            textAnchor="middle"
            fill="var(--diagram-muted)"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
          >
            RoutingDecision
          </text>
          <Box x={16} y={208} w={136} h={40} label="Network" />
          <Box x={168} y={208} w={136} h={40} label="Inference" />
          <Box x={16} y={264} w={136} h={40} label="Incident" />
          <Box x={168} y={264} w={136} h={40} label="Capacity" />
          <Arrow x1={160} y1={304} x2={160} y2={340} />
          <Box x={100} y={340} w={120} h={40} label="Tools" />
        </SvgFrame>
      </div>
      <div className="hidden md:block">
        <SvgFrame variant="router" width={640} height={248}>
          <Box x={16} y={102} w={88} h={36} label="Query" />
          <Arrow x1={104} y1={120} x2={132} y2={120} />
          <Box x={132} y={102} w={100} h={36} label="Classifier" accent />
          <Arrow x1={232} y1={120} x2={260} y2={120} />
          <Box x={260} y={94} w={110} h={52} label="Router" accent />
          <text
            x={315}
            y={158}
            textAnchor="middle"
            fill="var(--diagram-muted)"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            RoutingDecision
          </text>
          <Arrow x1={370} y1={100} x2={410} y2={36} />
          <Arrow x1={370} y1={112} x2={410} y2={88} />
          <Arrow x1={370} y1={128} x2={410} y2={148} />
          <Arrow x1={370} y1={140} x2={410} y2={200} />
          <Box x={410} y={16} w={100} h={36} label="Network" />
          <Box x={410} y={72} w={100} h={36} label="Inference" />
          <Box x={410} y={128} w={100} h={36} label="Incident" />
          <Box x={410} y={184} w={100} h={36} label="Capacity" />
          <Arrow x1={510} y1={32} x2={548} y2={120} />
          <Arrow x1={510} y1={88} x2={548} y2={120} />
          <Arrow x1={510} y1={144} x2={548} y2={120} />
          <Arrow x1={510} y1={200} x2={548} y2={120} />
          <Box x={548} y={102} w={80} h={36} label="Tools" />
        </SvgFrame>
      </div>
    </>
  );
}

function SlmDiagram() {
  return (
    <SvgFrame variant="slm" width={640} height={232}>
      <Box x={12} y={96} w={100} h={40} label="Prompts" />
      <Arrow x1={112} y1={92} x2={152} y2={48} />
      <Arrow x1={112} y1={132} x2={152} y2={176} />
      <Box x={152} y={28} w={128} h={40} label="Base Phi-3" />
      <Box x={152} y={156} w={128} h={40} label="LoRA adapter" accent />
      <text
        x={216}
        y={216}
        textAnchor="middle"
        fill="var(--diagram-muted)"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
      >
        rank 8 · 100 iters
      </text>
      <Arrow x1={280} y1={48} x2={328} y2={112} />
      <Arrow x1={280} y1={176} x2={328} y2={112} />
      <Box x={328} y={90} w={112} h={44} label="Eval harness" accent />
      <Arrow x1={440} y1={100} x2={478} y2={48} />
      <Arrow x1={440} y1={124} x2={478} y2={176} />
      <Box x={478} y={28} w={150} h={44} label="N=4 leaked CSV" />
      <Box x={478} y={156} w={150} h={44} label="N=13 held-out" accent />
    </SvgFrame>
  );
}

function SocDiagram() {
  return (
    <SvgFrame variant="soc" width={640} height={168}>
      <Box x={12} y={64} w={108} h={40} label="SIEM export" />
      <Arrow x1={120} y1={84} x2={148} y2={84} />
      <Box x={148} y={64} w={100} h={40} label="Normalize" />
      <Arrow x1={248} y1={84} x2={276} y2={84} />
      <Box x={276} y={52} w={140} h={64} label="EvidenceRecord" accent />
      <text
        x={346}
        y={132}
        textAnchor="middle"
        fill="var(--diagram-muted)"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
      >
        evidence_id · no verdict
      </text>
      <Arrow x1={416} y1={64} x2={456} y2={28} />
      <Arrow x1={416} y1={84} x2={456} y2={84} />
      <Arrow x1={416} y1={104} x2={456} y2={140} />
      <Box x={456} y={8} w={168} h={36} label="Correlate" />
      <Box x={456} y={64} w={168} h={36} label="Timeline" />
      <Box x={456} y={120} w={168} h={36} label="Kafka" />
    </SvgFrame>
  );
}

function MultimodalDiagram() {
  return (
    <SvgFrame variant="multimodal" width={640} height={200}>
      <Box x={12} y={16} w={88} h={32} label="PDF" />
      <Box x={12} y={84} w={88} h={32} label="Video" />
      <Box x={12} y={152} w={88} h={32} label="Audio" />
      <Arrow x1={100} y1={100} x2={132} y2={100} />
      <text x={110} y={72} fill="var(--diagram-muted)" fontSize="12" fontFamily="ui-sans-serif">
        BLIP
      </text>
      <text x={104} y={148} fill="var(--diagram-muted)" fontSize="12" fontFamily="ui-sans-serif">
        Whisper
      </text>
      <Box x={132} y={80} w={88} h={40} label="Chunks" />
      <Arrow x1={220} y1={100} x2={252} y2={100} />
      <Box x={252} y={80} w={88} h={40} label="Chroma" accent />
      <Arrow x1={340} y1={100} x2={372} y2={100} />
      <Box x={372} y={72} w={120} h={56} label="MultiQuery" />
      <Arrow x1={492} y1={100} x2={524} y2={100} />
      <Box x={524} y={80} w={100} h={40} label="Local LLM" />
    </SvgFrame>
  );
}

function RetrievalDiagram() {
  return (
    <SvgFrame variant="retrieval" width={640} height={200}>
      <Box x={12} y={80} w={80} h={36} label="Docs" />
      <Arrow x1={92} y1={98} x2={120} y2={98} />
      <Box x={120} y={80} w={80} h={36} label="Chunk" />
      <Arrow x1={200} y1={80} x2={236} y2={40} />
      <Arrow x1={200} y1={116} x2={236} y2={156} />
      <Box x={236} y={20} w={100} h={36} label="Lexical" />
      <Box x={236} y={140} w={100} h={36} label="Vector" />
      <Arrow x1={336} y1={38} x2={380} y2={98} />
      <Arrow x1={336} y1={158} x2={380} y2={98} />
      <Box x={380} y={80} w={88} h={36} label="Retrieve" accent />
      <Arrow x1={468} y1={98} x2={500} y2={98} />
      <Box x={500} y={64} w={124} h={68} label="Generate + eval" />
    </SvgFrame>
  );
}

function WeaveDiagram() {
  return (
    <SvgFrame variant="weave" width={640} height={188}>
      <text
        x={320}
        y={22}
        textAnchor="middle"
        fill="var(--diagram-muted)"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
      >
        INTENDED · NOT IMPLEMENTED
      </text>
      <Box x={12} y={84} w={100} h={40} label="Query" />
      <Arrow x1={112} y1={104} x2={140} y2={104} />
      <Box x={140} y={84} w={110} h={40} label="Open VLM" />
      <Arrow x1={250} y1={104} x2={278} y2={104} />
      <Box x={278} y={76} w={120} h={56} label="Retrieval" accent />
      <Arrow x1={398} y1={104} x2={426} y2={104} />
      <Box x={426} y={84} w={80} h={40} label="Tools" />
      <Arrow x1={506} y1={104} x2={534} y2={104} />
      <Box x={534} y={84} w={94} h={40} label="Eval" />
    </SvgFrame>
  );
}

function WorldSenseDiagram() {
  return (
    <SvgFrame variant="worldsense" width={640} height={188}>
      <text
        x={320}
        y={22}
        textAnchor="middle"
        fill="var(--diagram-muted)"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
      >
        LOCAL PHASE 1 · NOT HOSTED
      </text>
      <Box x={12} y={84} w={72} h={40} label="MP4" />
      <Arrow x1={84} y1={104} x2={110} y2={104} />
      <Box x={110} y={84} w={88} h={40} label="Frames" />
      <Arrow x1={198} y1={104} x2={224} y2={104} />
      <Box x={224} y={76} w={120} h={56} label="Faster R-CNN" accent />
      <Arrow x1={344} y1={104} x2={370} y2={104} />
      <Box x={370} y={84} w={88} h={40} label="Track IDs" />
      <Arrow x1={458} y1={104} x2={484} y2={104} />
      <Box x={484} y={84} w={64} h={40} label="ROI" />
      <Arrow x1={548} y1={104} x2={568} y2={104} />
      <Box x={568} y={84} w={64} h={40} label="Store" />
    </SvgFrame>
  );
}

function LlmopsDiagram() {
  return (
    <SvgFrame variant="llmops" width={640} height={200}>
      <Box x={16} y={82} w={96} h={36} label="POST /infer" />
      <Arrow x1={112} y1={100} x2={148} y2={100} />
      <Box x={148} y={74} w={120} h={52} label="ModelRouter" accent />
      <Arrow x1={268} y1={84} x2={312} y2={28} />
      <Arrow x1={268} y1={100} x2={312} y2={100} />
      <Arrow x1={268} y1={116} x2={312} y2={172} />
      <Box x={312} y={8} w={140} h={36} label="1. LoRA adapter" />
      <Box x={312} y={82} w={140} h={36} label="2. Ollama local" />
      <Box x={312} y={156} w={140} h={36} label="3. Remote HF" />
      <Arrow x1={452} y1={26} x2={500} y2={100} />
      <Arrow x1={452} y1={100} x2={500} y2={100} />
      <Arrow x1={452} y1={174} x2={500} y2={100} />
      <Box x={500} y={74} w={124} h={52} label="JSONL + latency" />
    </SvgFrame>
  );
}

const diagrams: Record<Variant, () => ReactNode> = {
  router: RouterDiagram,
  slm: SlmDiagram,
  soc: SocDiagram,
  multimodal: MultimodalDiagram,
  retrieval: RetrievalDiagram,
  llmops: LlmopsDiagram,
  weave: WeaveDiagram,
  worldsense: WorldSenseDiagram,
};

export function ArchitectureDiagram({
  variant,
  compact = false,
}: {
  variant: Variant;
  compact?: boolean;
}) {
  const Diagram = diagrams[variant];
  return (
    <figure className={cn("w-full overflow-x-auto", compact && "opacity-95")}>
      <div className="min-w-0">
        <Diagram />
      </div>
      <figcaption className="mt-2 text-sm leading-relaxed text-fg-muted">
        {captions[variant]}
      </figcaption>
    </figure>
  );
}
