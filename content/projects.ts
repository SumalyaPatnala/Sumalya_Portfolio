export const projectAreas = [
  "research-ml",
  "ai-infrastructure",
  "agents-tools",
  "full-stack",
  "evaluation",
] as const;

export type ProjectArea = (typeof projectAreas)[number];

export const areaLabels: Record<ProjectArea, string> = {
  "research-ml": "Research & ML",
  "ai-infrastructure": "AI Infrastructure",
  "agents-tools": "Agents & Tools",
  "full-stack": "Full-Stack",
  evaluation: "Evaluation",
};

export type ProjectStatus =
  | "personal-complete-artifacts"
  | "personal-in-progress"
  | "academic-research"
  | "professional-generalized";

export type EvidenceKind = "repository" | "eval-artifact" | "resume" | "linkedin" | "none";

export type ProjectTheme = "rose" | "coral" | "lavender" | "teal" | "yellow";
export type ProjectArt = "weave" | "frames" | "none";
export type ProjectAspect = "4:5" | "3:4" | "16:9";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  lede: string;
  summary: string;
  problem: string;
  contribution: string;
  architectureSummary: string;
  tech: string[];
  areas: ProjectArea[];
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  vision?: boolean;
  spotlight?: boolean;
  theme: ProjectTheme;
  art: ProjectArt;
  cover: string;
  coverAlt: string;
  aspect: ProjectAspect;
  inProgress?: string[];
  github?: string;
  demo?: { href: string; label: string; note: string };
  evidence: {
    kind: EvidenceKind;
    statement: string;
  }[];
  diagram: "router" | "slm" | "soc" | "multimodal" | "retrieval" | "llmops" | "weave" | "worldsense" | "movies";
  caseStudy: {
    whyItMatters: string;
    question: string;
    constraints: string[];
    architecture: string[];
    decisions: { title: string; body: string }[];
    implementation: string[];
    evaluation: string;
    results: string[];
    limitations: string[];
    next: string[];
    reproduce: string[];
    plannedRoadmap?: { title: string; items: string[] };
    responsibility?: {
      utility: string;
      reliability: string;
      efficiency: string;
      environment?: string;
      unresolved: string;
    };
  };
};

export const projects: Project[] = [
  {
    slug: "styleweave-vlm-lab",
    title: "StyleWeave VLM Lab",
    eyebrow: "Fashion discovery · composed image retrieval · VLM research",
    lede: "Phase 0 research documentation for fashion discovery and composed image retrieval. No training, metrics, or interface yet.",
    summary:
      "A public research lab on composed fashion retrieval: can explicit visual attribute constraints and a small fusion module improve FashionIQ while keeping explanations visually grounded? Phase 0 documentation is complete. The frozen CLIP baseline has not been evaluated.",
    problem:
      "Fashion search is usually a closed catalog model or a generic captioner. Neither is easy to inspect, adapt, or score on outfit compatibility, attribute grounding, and retrieval quality.",
    contribution:
      "Authored a Phase 0 research packet in a public repository: hardware feasibility, literature review, pre-registered hypotheses, dataset audit, model selection, experiment plan, and resource budget. This is documentation and protocol design, not a trained VLM.",
    architectureSummary:
      "Documented loop only until Phase 1 runs: image/text query with preserve/change/avoid attributes → frozen CLIP baseline (planned) → optional Combiner fusion → explanations. No metrics.json exists yet.",
    tech: ["CLIP (planned)", "FashionIQ (planned)", "PyTorch (planned)", "Phase 0 docs"],
    areas: ["research-ml", "evaluation"],
    status: "personal-in-progress",
    statusLabel: "Phase 0 research · no metrics",
    featured: false,
    vision: true,
    spotlight: true,
    theme: "rose",
    art: "weave",
    cover: "/work/styleweave-cover.jpg",
    coverAlt:
      "Original editorial illustration of a fashion mood board with woven fabrics, color chips, and empty frames. Not a product screenshot or retrieval result.",
    aspect: "4:5",
    inProgress: [
      "Frozen CLIP baseline on FashionIQ — not evaluated",
      "Trainable fusion + contrastive training — not started",
      "Qwen3-VL-2B generative / tool-use — deferred",
      "Counterfactual + ablation evaluation — not started",
      "Next.js research interface — blocked until Phase 1 artifacts",
    ],
    github: "https://github.com/SumalyaPatnala/styleweave-vlm-lab",
    evidence: [
      {
        kind: "repository",
        statement:
          "Public repository styleweave-vlm-lab on GitHub. README states Phase 0 documentation is complete and that no model training has been run. Phase 1 frozen CLIP baseline evaluation has not produced metrics.",
      },
      {
        kind: "none",
        statement:
          "No nDCG, Recall@K, training curves, or deployed research UI. Fashion imagery on this site is an original illustration, not FashionIQ evidence.",
      },
    ],
    diagram: "weave",
    caseStudy: {
      whyItMatters:
        "Closed fashion models are hard to audit. An open protocol would make retrieval, attributes, and explanations measurable before anyone treats the system as a product.",
      question:
        "Can explicit visual attribute constraints and a small learned fusion module improve FashionIQ composed retrieval while keeping explanations visually grounded?",
      constraints: [
        "No fabricated retrieval or VLM scores.",
        "FashionIQ official test labels are unpublished — report on the official val split if Phase 1 runs.",
        "Do not claim visual-encoder fine-tuning if only language-side modules are trained.",
        "No licensed catalog is attached to this portfolio site.",
      ],
      architecture: [
        "Phase 0 packet: hardware_feasibility, literature_review, research_hypothesis, dataset_audit, model_selection, experiment_plan, resource_budget.",
        "Intended Phase 1: frozen CLIP sum baseline (B0) before Combiner (M0) or attribute slots (M1).",
        "Qwen3-VL-2B is deferred unless re-approved against the local memory cap.",
        "A Next.js research UI is blocked until real Phase 1 artifacts exist.",
      ],
      decisions: [
        {
          title: "Write the protocol before claiming a model",
          body: "The public repo leads with pre-registered hypotheses and a dataset audit. That is the contribution of Phase 0.",
        },
        {
          title: "FashionIQ val, not unpublished test",
          body: "The dataset audit forbids reporting on the official test split because labels are unpublished.",
        },
        {
          title: "B0 before H1",
          body: "The hypothesis document states that a frozen-sum CLIP baseline must exist before Combiner gains can be claimed. That baseline has not been evaluated here.",
        },
      ],
      implementation: [
        "Public docs and supporting notes under docs/ and docs/phase0/.",
        "Research hypothesis H1–H4 are pre-registered and untested.",
        "No trained weights, no metrics.json, and no hosted interface in this portfolio.",
      ],
      evaluation:
        "No evaluation methodology has been run to completion. There is no Recall@K, nDCG, attribute accuracy, or human rater study to report from this lab yet.",
      results: [
        "Phase 0 documentation is complete and public.",
        "No benchmark results. Do not read the planned methodology as a completed VLM implementation.",
      ],
      limitations: [
        "Frozen CLIP baseline evaluation has not been run.",
        "No demo URL.",
        "Portfolio fashion imagery is original illustration, not catalog photography or FashionIQ samples.",
      ],
      next: [
        "Run the frozen CLIP baseline on FashionIQ val and write metrics.json from evaluation code.",
        "Only then compare Combiner and attribute-conditioned variants under the same protocol.",
        "Keep the research interface behind real artifacts.",
      ],
      reproduce: [
        "Clone https://github.com/SumalyaPatnala/styleweave-vlm-lab.",
        "Read README.md and the Phase 0 packet under docs/ before assuming any model exists.",
        "This website does not download FashionIQ or CLIP weights.",
      ],
    },
  },
  {
    slug: "worldsense-ai",
    title: "WorldSense AI",
    eyebrow: "Computer vision lab · Phase 1 local",
    lede: "Local video perception: real detections, persistent IDs, and ROI events you can replay.",
    summary:
      "A local video-perception lab: upload an MP4, run real TorchVision detection, keep persistent track IDs, and emit polygonal ROI enter/exit events with evidence frames. Not hosted. Not a cloud product.",
    problem:
      "Most perception demos either fake boxes or hide the timestamp. Operators cannot replay why an object entered a region, which model ran, or whether IDs survived a brief occlusion.",
    contribution:
      "Implemented a Phase 1 vertical slice locally: MP4 ingest, pretrained Faster R-CNN (MobileNetV3-Large FPN, COCO weights), an in-repo BYTE-style tracker, polygon ROI with hysteresis, FastAPI + Next.js overlays, SQLite provenance, and tests. SAM 2, VGGT, VQA, Kafka, LangGraph, ONNX, and cloud deploy are not implemented.",
    architectureSummary:
      "MP4 → sampled frames → TorchVision Faster R-CNN → BYTE-style IDs → polygon ROI monitor → SQLite + evidence JPEGs → Next.js playback.",
    tech: [
      "Python 3.12",
      "PyTorch / TorchVision",
      "Faster R-CNN MobileNetV3 FPN",
      "OpenCV",
      "FastAPI",
      "Next.js",
      "SQLite",
      "pytest",
    ],
    areas: ["research-ml", "ai-infrastructure", "evaluation"],
    status: "personal-in-progress",
    statusLabel: "In progress · local Phase 1, no public GitHub",
    featured: false,
    vision: true,
    spotlight: true,
    theme: "teal",
    art: "frames",
    cover: "/work/worldsense-cover.jpg",
    coverAlt:
      "Original illustration of a dusk city street with abstract detection boxes and tracking paths. Not a detector screenshot or labeled benchmark.",
    aspect: "16:9",
    inProgress: [
      "SAM 2 segmentation — not in Phase 1",
      "VGGT / 3D reconstruction — not in Phase 1",
      "VQA over events — not in Phase 1",
      "Kafka, LangGraph, ONNX, cloud deploy — not in Phase 1",
    ],
    evidence: [
      {
        kind: "none",
        statement:
          "Local repository at WorldSense-AI. No public GitHub remote. Detector weights are TorchVision COCO checkpoints downloaded to the machine cache, not stored in git.",
      },
    ],
    diagram: "worldsense",
    caseStudy: {
      whyItMatters:
        "Video events are only useful if a later viewer can seek to the evidence frame and see the same boxes, IDs, and ROI the system logged.",
      question:
        "Can detections, persistent track IDs, and ROI enter/exit events be replayed against the source video instead of disappearing into a demo GIF?",
      constraints: [
        "Local inference only. No paid cloud APIs.",
        "Real pretrained detections — no synthetic boxes in the product path.",
        "Apache-2.0 application code; do not pull AGPL YOLO.",
        "Do not commit uploads, weights, or .venv.",
      ],
      architecture: [
        "FastAPI upload checks MP4 ftyp magic and an 80 MB cap.",
        "Frames are sampled with timestamps; JPEGs are stored as evidence.",
        "Detector: torchvision.models.detection.fasterrcnn_mobilenet_v3_large_fpn, COCO_V1 weights.",
        "Tracker: in-repo BYTE-style two-stage association with stable IDs — not the official ByteTrack package.",
        "ROI: ray-casting polygon test on the track centroid, with hysteresis so enter/exit fire once per occupancy change.",
      ],
      decisions: [
        {
          title: "CPU default even though MPS is available",
          body: "On Apple M3 Pro, warm Faster R-CNN inference measured about 50 s/frame on MPS versus about 200 ms/frame on CPU for the same boxes. MPS is available and not compatible for this detector. WORLD_SENSE_DEVICE=mps remains an experiment override.",
        },
        {
          title: "BSD TorchVision instead of AGPL YOLO",
          body: "Phase 1 prefers a weight set the lab can document. Ultralytics YOLO is out of scope for licensing, not for accuracy theater.",
        },
        {
          title: "Geometry tests are not inference proof",
          body: "Tracker and ROI unit tests use synthetic boxes. The only test allowed to speak about detector output is the optional real-MP4 job.",
        },
      ],
      implementation: [
        "Backend: detector, tracker, ROI monitor, SQLite store, FastAPI /v1/health /videos /analyze /jobs /overlays /events.",
        "Frontend: Next.js playback, detection overlay, ROI polygon clicks, event timeline seek.",
        "Logs are structured JSON. Jobs store wall_ms, mean_infer_ms, device, and hardware metadata.",
      ],
      evaluation:
        "Contract tests cover tracker ID persistence, polygon occupancy, MP4 magic bytes, and API 400/404 paths without downloading weights. Optional WORLD_SENSE_RUN_INFERENCE=1 runs a real MP4 through analyze. Empty detections on a clip with no COCO objects are treated as valid, not as a failed demo.",
      results: [
        "Phase 1 source exists locally with unit tests for tracker, ROI, media, and API contract.",
        "Device policy is measured, not hoped: MPS available, CPU selected for this detector.",
        "No public hosted demo. No claimed mAP on a labeled benchmark.",
      ],
      limitations: [
        "No public GitHub URL at the time this card was written.",
        "Faster R-CNN COCO is a starting detector, not a custom trained model.",
        "The tracker is a BYTE-style equivalent, not a paper reproduction with MOT metrics.",
        "SAM 2, VGGT, VQA, Kafka, LangGraph, ONNX export, and deploy are explicitly out of Phase 1.",
      ],
      next: [
        "Publish the repository when the local slice is frozen.",
        "Add a labeled clip protocol before claiming tracking accuracy.",
        "Keep later modules behind interfaces until Phase 1 provenance is stable.",
      ],
      reproduce: [
        "Requires the local WorldSense-AI checkout, Homebrew Python 3.12, and a project-local .venv.",
        "pip install -r requirements.txt, then PYTHONPATH=. uvicorn backend.app.main:app --host 127.0.0.1 --port 8000.",
        "cd web && npm install && npm run dev.",
        "Optional inference: WORLD_SENSE_RUN_INFERENCE=1 WORLD_SENSE_SAMPLE_MP4=/path/to/clip.mp4 pytest backend/tests/test_api_inference.py.",
        "This website does not run the detector.",
      ],
    },
  },
  {
    slug: "movie-discovery-recommendation",
    title: "Movie Discovery & Recommendation System",
    eyebrow: "Content-based recommendation · Flask",
    lede: "A cinematic movie-discovery UI over CountVectorizer cosine similarity. Not Netflix. Not collaborative filtering.",
    summary:
      "A Flask app that recommends similar titles from a frozen movie CSV using bag-of-words CountVectorizer and cosine similarity, then enriches the page with TMDB metadata and IMDb reviews. Public source exists. No live production deployment is claimed here.",
    problem:
      "Choosing a next film from a large catalog is slow if the only interface is keyword search. A content-based neighbor list can surface titles that share cast, director, and genre without needing a user-history graph.",
    contribution:
      "Implemented a content-based recommender in RecommendationSystem: load main_data2021.csv, vectorize the combined metadata field `comb`, rank cosine neighbors, and render a detail page. Display metadata and posters are fetched from TMDB in the browser; review text is scraped from IMDb and labeled by a pickled classifier.",
    architectureSummary:
      "Browser autocomplete → Flask /similarity (CountVectorizer + cosine similarity on a frozen CSV) → TMDB REST for posters and details → Flask /recommend page with IMDb review scrape and a pickled sentiment model.",
    tech: ["Flask", "scikit-learn", "CountVectorizer", "cosine similarity", "pandas", "TMDB API", "BeautifulSoup"],
    areas: ["research-ml", "full-stack"],
    status: "personal-complete-artifacts",
    statusLabel: "Public source · content-based baseline, no live deploy claimed",
    featured: false,
    spotlight: true,
    theme: "coral",
    art: "none",
    cover: "/work/movies-cover.jpg",
    coverAlt:
      "Original illustration of a cinema interior with a projector beam and abstract film frames. Not a Netflix interface and not a real movie poster.",
    aspect: "16:9",
    github: "https://github.com/SumalyaPatnala/RecommendationSystem",
    evidence: [
      {
        kind: "repository",
        statement:
          "Public GitHub RecommendationSystem: Flask routes in main.py, CountVectorizer cosine similarity over main_data2021.csv, templates/home.html and recommend.html, TMDB client calls in static/recommend.js, pickled nlp_model.pkl / tranform.pkl for review polarity.",
      },
      {
        kind: "none",
        statement:
          "No offline ranking metrics (MAP, nDCG, Recall@K) are checked into the repository. This site does not claim a current hosted URL, collaborative filtering, embeddings, or Netflix viewing data.",
      },
    ],
    diagram: "movies",
    caseStudy: {
      whyItMatters:
        "Most “recommendation” demos hide whether neighbors come from content, collaboration, or a hosted ranking API. A CSV plus cosine similarity is inspectable: you can see the features.",
      question:
        "If the only user action is picking a title, can bag-of-words cosine neighbors on cast, director, and genre produce a usable discovery list without a personalization graph?",
      constraints: [
        "The catalog is a frozen CSV, not a live licensed feed.",
        "Do not claim Netflix proprietary ranking or viewing history.",
        "Do not invent recommendation benchmarks.",
        "TMDB metadata is display enrichment, not the similarity engine.",
      ],
      architecture: [
        "main_data2021.csv columns include director_name, three actor fields, genres, movie_title, and comb (a concatenated bag-of-words string).",
        "create_similarity() fits sklearn CountVectorizer on comb and computes cosine_similarity.",
        "rcmd() returns the next ten neighbors, excluding the query title.",
        "static/recommend.js looks up the query on TMDB for posters, overview, rating, runtime, and cast, then POSTs /recommend.",
        "/recommend scrapes IMDb review text and classifies each with a pickled model (nlp_model.pkl + tranform.pkl).",
      ],
      decisions: [
        {
          title: "Content features instead of user-user collaboration",
          body: "Similarity is computed from metadata strings. There is no user-item matrix in this repository.",
        },
        {
          title: "Separate display metadata from the ranking features",
          body: "Posters and synopses come from TMDB at request time. Neighbors come from the local CSV. Those two sources can disagree.",
        },
        {
          title: "Keep the baseline small enough to inspect",
          body: "CountVectorizer plus cosine similarity is the entire ranker. That is a limitation and a virtue.",
        },
      ],
      implementation: [
        "Flask 1.x app with /home, POST /similarity, POST /recommend.",
        "Autocomplete suggestions are the capitalized titles from the CSV.",
        "requirements.txt also lists tmdbv3api, gunicorn, and BeautifulSoup. A Procfile exists for a process host; this portfolio does not treat that as a verified live deployment.",
        "The HTML footer in the inspected templates credits a third-party UI author. The GitHub repository under SumalyaPatnala is the evidence source for this write-up.",
      ],
      evaluation:
        "No recommendation-ranking evaluation is in the repository: no held-out users, no MAP/nDCG, no A/B. Review polarity is a pickled classifier run on scraped IMDb text at request time, not a published sentiment benchmark.",
      results: [
        "A working content-based neighbor function exists in source and can return ten titles or a not-in-database message.",
        "The UI can show TMDB posters and scraped reviews when those remote calls succeed.",
        "No production SLA, no live catalog refresh, and no claimed ranking metric.",
      ],
      limitations: [
        "Catalog staleness: main_data2021.csv is a snapshot, not a licensed daily feed.",
        "CountVectorizer neighbors ignore plot embeddings, watch history, and popularity.",
        "TMDB lookups and IMDb scraping depend on third-party HTML/API stability and terms.",
        "A TMDB API key is embedded in public frontend JavaScript — a credential-hygiene issue, not a product feature. The key is not copied here.",
        "Synchronous AJAX fan-out for posters and cast is fragile.",
        "No authenticated users, favorites, or feedback loop.",
      ],
      next: [
        "Do not start the full-stack rebuild until StyleWeave Phase 1 artifacts exist, per the lab sequence on this site.",
        "When that gate opens, replace the Flask UI with the planned Next.js + FastAPI path documented below — still as Planned work, not as current source.",
      ],
      reproduce: [
        "Clone https://github.com/SumalyaPatnala/RecommendationSystem.",
        "Create a virtualenv and pip install -r requirements.txt (legacy Flask 1.1 pins may need a dedicated environment).",
        "Run python main.py and open the local Flask URL.",
        "TMDB calls require a key the operator owns; do not reuse secrets from the public JavaScript file.",
        "This website does not run the recommender.",
      ],
      plannedRoadmap: {
        title: "Planned full-stack extension (after StyleWeave)",
        items: [
          "Planned: Next.js + React frontend for search, filters, lists, favorites, and explanations.",
          "Planned: FastAPI backend with PostgreSQL for users, movies, feedback, and interactions.",
          "Planned: licensed metadata sync (for example TMDB) on a schedule, with caching and required attribution — public metadata, not Netflix viewing data.",
          "Planned: keep the CountVectorizer cosine baseline as a documented control.",
          "Planned: embedding-powered semantic similarity once a frozen text/poster pipeline exists.",
          "Planned: collaborative filtering only after enough suitable interaction data exists; do not fake a user graph.",
          "Planned: hybrid retrieval and ranking with explainable neighbor reasons.",
          "Planned: offline evaluation with reproducible splits and baselines before claiming quality.",
          "Planned: deployment and observability after the system is implemented — not claimed now.",
        ],
      },
    },
  },
  {
    slug: "ai-infrastructure-network-intelligence",
    title: "AI Infrastructure & Network Intelligence",
    lede: "Typed routing, public telemetry tools, and a hosted demo that is not production.",
    eyebrow: "Personal systems project",
    summary:
      "A routed diagnostics lab: classify the request, keep the original query intact, and hand it to a specialist with real probes. A Cloud Run workbench is live in demo mode; public GitHub main is still the earlier graph.",
    problem:
      "Infrastructure questions mix network reachability, inference performance, incidents, and capacity. A single generalist prompt hides routing mistakes and makes tool use hard to inspect.",
    contribution:
      "Implemented a Google ADK workflow that classifies a request into one of four routes, preserves the original query through the graph, and dispatches specialist agents. Network tools actually wired: DNS, HTTP, RIPEstat BGP helpers. RIPE Atlas exists as a module but is not on network_agent.tools. Authored routing_eval_v1 and scored a keyword baseline through router() — separately from tool execution and from live Gemini. A personal Cloud Run revision serving API 1.4.0 (demo mode, live classifier off) was verified live; that revision is not yet on public GitHub main.",
    architectureSummary:
      "Classifier → structured RoutingDecision → router → branch adapters → specialist agents (network, inference, incident, capacity) → tools.",
    tech: [
      "Python",
      "Google ADK",
      "FastAPI",
      "Pydantic",
      "DNS / HTTP probes",
      "RIPEstat",
      "Cloud Run",
      "pytest",
    ],
    areas: ["ai-infrastructure", "agents-tools"],
    status: "personal-complete-artifacts",
    statusLabel: "Personal project · hosted demo; GitHub main behind the live revision",
    featured: true,
    theme: "teal",
    art: "none",
    cover: "/work/network-cover.jpg",
    coverAlt:
      "Original illustration of a cream field with teal and coral network nodes. Not a production topology diagram or live traffic map.",
    aspect: "16:9",
    github:
      "https://github.com/SumalyaPatnala/agentic-ai-infrastructure-network-intelligence",
    demo: {
      href: "https://network-diagnostics-workbench-251835511112.us-central1.run.app",
      label: "Live workbench",
      note: "GET /v1/health returned version 1.4.0, mode demo, live_classifier_enabled false (checked 16 Oct 2026). Public GitHub main last pushed 17 Aug 2026 and does not contain this revision.",
    },
    evidence: [
      {
        kind: "repository",
        statement:
          "Public GitHub main contains the ADK workflow, four specialist agents, network tools, and tool tests. Last pushed 17 Aug 2026. The hosted 1.4.0 workbench source lives on a local feature branch that has not been pushed.",
      },
      {
        kind: "eval-artifact",
        statement:
          "evals/routing/outputs/metrics.json and measured_eval_v1.json: router contract 16/16; keyword-baseline strict 90.3%, lenient 93.3%, macro-F1 90.6% on N=134. Not Gemini. Not production traffic. Not end-to-end task success.",
      },
      {
        kind: "none",
        statement:
          "MCP, A2A, and Vertex AI appear on a résumé version. They were not present in the inspected source and are not claimed here. Cloud Run is claimed only as this personal demo workbench, not as Vertex, MCP, or A2A.",
      },
    ],
    diagram: "router",
    caseStudy: {
      whyItMatters:
        "Operators do not ask one kind of question. DNS failures, model-serving latency, outages, and replica planning need different tools and different failure modes. Routing is the first reliability feature, not a flourish.",
      question:
        "Can a typed route plus the original query keep specialist tools inspectable when operators mix network, inference, incident, and capacity questions?",
      constraints: [
        "Keep the user’s original query intact across graph hops—do not let the classifier rewrite the problem.",
        "Choose exactly one route; invalid routes fall back to incident investigation rather than guessing.",
        "Prefer public internet telemetry and local probes over proprietary network data.",
        "No employer production traffic or credentials.",
      ],
      architecture: [
        "A classifier agent emits a Pydantic RoutingDecision with query and route.",
        "A router function validates NETWORK / INFERENCE / INCIDENT / CAPACITY and wraps both fields in an Event payload.",
        "Branch adapters extract the original query before the specialist agent runs.",
        "Network specialist tools in source: resolve_dns, check_endpoint, get_routing_status, get_bgp_state, get_recent_bgp_updates. Atlas helpers are not attached to network_agent.tools.",
      ],
      decisions: [
        {
          title: "Structured routing instead of free-text handoff",
          body: "The classifier is forbidden from answering. It only returns a route plus the original query. That makes misroutes inspectable and keeps tool arguments grounded in what the user actually asked.",
        },
        {
          title: "Public telemetry before private collectors",
          body: "DNS, HTTP, RIPEstat, and RIPE Atlas can be exercised without access to an internal backbone. The system is useful as a diagnostic lab even when corporate telemetry is unavailable.",
        },
        {
          title: "Incident as the safe default",
          body: "Unknown routes go to incident investigation. Silently answering as a network check would be the more dangerous failure.",
        },
        {
          title: "Typed routing versus generative flexibility",
          body: "The classifier is not allowed to answer the user. That wastes tokens on easy questions and prevents a fluent but unrouted response. The gain is a RoutingDecision object tests can assert on, and a graph that degrades to INCIDENT instead of improvising a specialist.",
        },
        {
          title: "Serial tools versus lower latency",
          body: "DNS, HTTP, RIPEstat, and Atlas probes stay serial in the specialist path so a failed probe is a first-class trace step. Fan-out would hide which call timed out. Latency is worse; attribution is better. There is no serving SLA claimed for this lab graph.",
        },
        {
          title: "Public telemetry versus recall of private collectors",
          body: "RIPEstat and RIPE Atlas cannot see an internal Cisco or bank backbone. Precision of the public answer is high for internet-facing questions and recall of private faults is zero. That is an intentional boundary, not a missing enterprise connector.",
        },
      ],
      implementation: [
        "Google ADK Workflow edges wire START → classifier → router → four prepare_* adapters → specialist agents.",
        "router() uppercases the route, checks {NETWORK, INFERENCE, INCIDENT, CAPACITY}, rewrites invalid values to INCIDENT, and copies the original query into the Event payload.",
        "Tool functions return structured dicts (resolved IPs, latency_ms, error flags) rather than prose blobs.",
        "pytest coverage for network tools plus an offline routing eval (`evals/routing`): router() contract probes and an instruction-keyword baseline.",
        "Live Gemini scorer (`python -m evals.routing.live`) defaults to dry-run. `--mode full` requires `--authorize-live` and operator credentials; secrets are never printed.",
      ],
      evaluation:
        "Four measures are kept separate. (1) Router correctness: deterministic probes on router() — invalid tokens → INCIDENT, query preserved. (2) Query-route correctness: instruction-keyword baseline composed with that router on routing_eval_v1 (N=134 authored items). (3) Tool-selection Jaccard on 30 NETWORK cases whose expected tools are in source. (4) Tool execution and end-to-end specialist success are not scored in the default run. Gemini-2.5-flash live scoring is implemented and BLOCKED (no credential, no --authorize-live). Macro-F1 is the unweighted mean of per-class F1 so INCIDENT support (48/134) cannot hide CAPACITY/INFERENCE misses.",
      results: [
        "The ADK graph with four specialist branches is implemented in the public GitHub source.",
        "router() contract: 16/16 probes × 3 repeats, determinism 100%, query preservation 100%.",
        "Keyword baseline → router on routing_eval_v1: strict 90.3%, lenient 93.3%, macro-F1 90.6%, 13 strict misses, tool-policy Jaccard 96.1% on 30 scorable NETWORK items.",
        "Strict misses cluster on missing-info, multi-intent, and tool_unavailable slices — the graph has no abstain token and inference has no live GPU tools.",
        "Live Gemini routing: BLOCKED. Dry-run validates the frozen dataset against RoutingDecision; no quota was spent.",
        "Hosted workbench: GET /v1/health on the Cloud Run URL returned 1.4.0 / demo / classifier off (16 Oct 2026).",
      ],
      limitations: [
        "Gemini classifier accuracy is BLOCKED (no Google credential; dry-run of the prompt/schema exists). Do not read 90.3% as Gemini quality.",
        "Public GitHub main does not yet contain the hosted 1.4.0 workbench. Visitors who clone the repo will see the earlier ADK graph, not the tracing observatory.",
        "MCP, A2A, and Vertex AI are not in source.",
        "Labels and the keyword baseline share an author.",
        "No abstain token; OOD gold is INCIDENT because that is the graph fallback.",
        "Live RIPEstat routing-status pytest timed out in the last executed run (3 other tool tests passed).",
      ],
      next: [
        "Push `feature/observability-tracing` (or merge to main) so GitHub matches the hosted revision.",
        "With owned credentials: `python -m evals.routing.live --authorize-live --mode bounded --limit 8` then `--mode full` on the frozen N=134 set. Do not tune prompts on that set.",
        "Record tool traces in a stable JSON schema so the Evaluation Workbench can import real runs later.",
        "Document MCP/A2A only if those interfaces land in the repository.",
      ],
      reproduce: [
        "Clone the public repository.",
        "Create a virtualenv and install requirements.txt.",
        "Copy .env.example and add only the keys you own.",
        "Run pytest tests/test_router.py tests/test_routing_eval.py (offline).",
        "python -m evals.routing to regenerate metrics.json and measured_eval_v1.json (no API key).",
        "python -m evals.routing.live --mode dry-run (no API key). Live Gemini remains unauthorized until --authorize-live.",
        "Optional: pytest tests/test_network_tools.py needs internet; RIPEstat can time out.",
        "Optional: open the Cloud Run URL and GET /v1/health. Expect version 1.4.0, mode demo. Do not treat that host as matching public GitHub main until the feature branch is pushed.",
        "Run the ADK agent entrypoint locally from the public clone; that clone is the August 2026 graph, not the hosted 1.4.0 workbench.",
      ],
      responsibility: {
        utility:
          "A typed route plus the original query is the product. Classification accuracy is not end-to-end specialist success.",
        reliability:
          "Invalid routes fall back to INCIDENT. The scored predictor is a keyword baseline (N=134). Live Gemini remains BLOCKED; no quota was spent.",
        efficiency:
          "Offline eval does not call a hosted model. Serial public probes trade latency for attribution. Token usage for Gemini is unmeasured because inference did not run.",
        unresolved:
          "Whether a live classifier beats the keyword baseline on the frozen set is unknown. Do not treat skipped Gemini calls as environmental savings.",
      },
    },
  },
  {
    slug: "slm-finetuning-evaluation",
    title: "SLM Fine-Tuning & Evaluation",
    eyebrow: "Personal ML project · reported eval artifacts",
    lede: "LoRA vs base on a structured SDG contract. Held-out N=13 is the honest number.",
    summary:
      "LoRA adaptation of Phi-3 Mini for structured SDG reasoning, scored against a five-section contract. Held-out N=13 is the honest result; the published N=4 CSV overlaps train.",
    problem:
      "A base instruction model can talk about development goals and still miss required SDGs, skip safety notes, or ignore the output contract. Adaptation without evaluation is just a slower prompt.",
    contribution:
      "Fine-tuned Phi-3 Mini with LoRA (MLX, rank 8, 100 iterations) and scored base vs adapter on SDG hit rate, structure, safety, actionability, and latency.",
    architectureSummary:
      "Instruction data → LoRA adapter on Phi-3 Mini → evaluation harness → CSV summaries comparing base and adapter.",
    tech: ["Python", "Phi-3 Mini", "LoRA / MLX", "Hugging Face", "pytest-adjacent eval scripts"],
    areas: ["research-ml", "evaluation"],
    status: "personal-complete-artifacts",
    statusLabel: "Personal project · leaked N=4 CSV + held-out N=13",
    featured: true,
    theme: "yellow",
    art: "none",
    cover: "/work/slm-cover.jpg",
    coverAlt:
      "Original illustration of comparison columns on cream paper. Decorative, not a plot of the held-out CSV.",
    aspect: "3:4",
    github:
      "https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/03_slm_finetuning_evaluation",
    evidence: [
      {
        kind: "eval-artifact",
        statement:
          "outputs/strong_eval_summary.csv reports Base Phi-3 vs Fine-tuned Phi-3 LoRA on 4 prompts. MEASURED generations, but those prompts paraphrase data/train.jsonl. Not held-out. Not a public leaderboard.",
      },
      {
        kind: "eval-artifact",
        statement:
          "eval/heldout_v1.jsonl (N=13, overlap_n=0). MEASURED run slm-heldout-20261008T215806Z-67db7889: LoRA SDG hit 0.6031 vs base 0.7823; structure 0.9846 vs 0.5692. Not pooled with the leaked N=4 CSV. This held-out run is local; it is not yet on public GitHub main.",
      },
      {
        kind: "none",
        statement:
          "The Hugging Face Space linked on some résumé versions (huggingface.co/spaces/Sumalya/sdg-community-assistant) is the sibling SDG case assistant, not this LoRA eval. It is a Streamlit retrieval demo over a trusted-case library and may sleep when idle.",
      },
    ],
    diagram: "slm",
    caseStudy: {
      whyItMatters:
        "Small models are the ones you can actually iterate on. If structured community-advice outputs are the product, the evaluation has to score structure and safety, not just fluency.",
      question:
        "If structured community-advice outputs are the product, can evaluation score the contract — structure, SDG hit, safety — rather than fluency?",
      constraints: [
        "Consumer hardware: MLX LoRA on Phi-3 Mini, batch size 1, 100 iterations.",
        "Outputs must follow a category / SDG / actions contract.",
        "Do not over-claim: leaked CSV is four scenarios; held-out is thirteen probe items, not a leaderboard.",
      ],
      architecture: [
        "Base model: microsoft/Phi-3-mini-4k-instruct.",
        "Adapter: LoRA rank 8, learning rate 1e-5, 100 iters, max sequence 2048 (adapter_config.json).",
        "Evaluation compares the same prompts on base vs adapter and writes CSV.",
        "Sibling projects in the parent repo serve the adapter through a FastAPI router and a Streamlit assistant.",
      ],
      decisions: [
        {
          title: "Score the contract, not the vibe",
          body: "Custom metrics for SDG identification, required sections, safety notes, and actionability. A fluent paragraph that misses SDG 6 is a miss.",
        },
        {
          title: "Keep N honest",
          body: "Four leaked scenarios showed in-distribution format recall. Thirteen held-out items are still a probe set. The case study keeps N in the sentence with the numbers and does not pool the two experiments.",
        },
        {
          title: "Template fit versus gold SDG recall",
          body: "On heldout_v1 the adapter almost always emitted the five-section contract (structure 0.98 vs 0.57) and still missed more gold SDG strings than base (0.60 vs 0.78). Compactness under max_tokens=100 is a confounder: base answers truncate. That is a real tradeoff, not a win to hide.",
        },
        {
          title: "Adapter over full fine-tune",
          body: "LoRA on a compact model matches the hardware budget and keeps a reversible artifact (adapter_config + weights path).",
        },
        {
          title: "Quality versus latency on consumer hardware",
          body: "Mean latency stays ~15s on the logged machine for both base and adapter. The adapter did not buy a serving win. Structure and actionability moved; latency did not. Treating this CSV as a production SLA would be a category error — there is no verified production deployment of the adapter.",
        },
      ],
      implementation: [
        "MLX LoRA training command is documented in the project README.",
        "Held-out runner: `eval/run_eval.py` calls `mlx_lm generate` per case for base and adapter, scores with `eval/metrics.py`, and freezes an immutable run directory.",
        "Peak memory on the logged held-out generations is about 7.8–8.0 GB.",
      ],
      evaluation:
        "Two separate experiments. (1) Leaked N=4 CSV: prompts paraphrase train.jsonl; metrics recomputed with bootstrap CIs (`python -m eval.run_eval --from-csv`). (2) Frozen heldout_v1 N=13, overlap_n=0, dataset SHA-256 24d257d9…. Base and LoRA were generated with mlx_lm 0.32.0, Phi-3 Mini, max_tokens=100, temp=0.0, Apple M3 Pro 18 GiB, run slm-heldout-20261008T215806Z-67db7889. Safety and actionability are keyword lexicons, not rater scores. Bootstrap intervals resample the 13 rows; they are not significance tests.",
      results: [
        "Leaked N=4 CSV (in-distribution): SDG hit 0.75 → 0.92; structure 0.60 → 1.00; safety 0.00 → 0.50; actionability 0.50 → 0.84; mean latency 15.02s → 14.58s.",
        "Held-out N=13 MEASURED: SDG hit base 0.7823 vs LoRA 0.6031 (adapter worse); structure 0.5692 vs 0.9846 (adapter better); safety 0.1538 vs 0.3846; actionability 0.2562 vs 0.6154; latency 13.69s vs 13.71s.",
        "LoRA complete SDG misses: ho-009 (lighting/theft; predicted 3/8/10 vs gold 11/16) and ho-010 (forest/charcoal; predicted “SDG 1.5”, 11, 12 vs gold 13/15).",
        "LoRA worse than base on 6/13 SDG hits; better on 2/13. Generation errors: 0.",
      ],
      limitations: [
        "Train/test leakage on the published CSV. Do not read 0.92 as held-out quality.",
        "N=4 and N=13 are both small. No statistical significance claim. Do not pool them.",
        "max_tokens=100 truncates verbose base answers; structure gains partly measure compactness.",
        "Safety lexicon can score 0 on a refusal that does not use medical keywords (ho-013).",
        "Latency ~14s per example on the logged machine — not a serving SLA. No production deployment.",
        "No human rater study. Greedy decoding (temp=0.0) on one machine; not bitwise portable.",
      ],
      next: [
        "Re-run heldout_v1 with a higher max_tokens to separate truncation from adapter quality.",
        "Keep train.jsonl out of any future test file; fail CI on overlap (eval.check_leakage).",
        "Replace the safety lexicon with a small rater rubric or constrained decoding.",
      ],
      reproduce: [
        "Clone sdg-community-assistant and open 03_slm_finetuning_evaluation.",
        "Read eval/LEAKAGE.md and data/train.jsonl before trusting the CSV.",
        "python -m eval.check_leakage && python -m eval.run_eval --from-csv (no GPU).",
        "Create a venv, pip install mlx mlx_lm, confirm python -m eval.run_eval --heldout preflight READY.",
        ".venv/bin/python -m eval.run_eval --heldout --execute-generate writes an immutable eval/outputs/runs/<runId>/ directory and refuses to overwrite MEASURED artifacts.",
        "Inspect eval/outputs/runs/slm-heldout-20261008T215806Z-67db7889/ for this site's numbers.",
        "This website does not call the model.",
      ],
      responsibility: {
        utility:
          "The task is SDG identification plus a five-section contract. Structure rose (56.9% → 98.5%) while SDG hit fell (78.2% → 60.3%) on frozen N=13. Format is not the task.",
        reliability:
          "heldout_v1 is frozen (overlap_n=0). N=4 leaked CSV stays separate. Safety/actionability are lexicons. LoRA complete misses: ho-009, ho-010.",
        efficiency:
          "Local Phi-3 Mini on MLX, ~13.7 s/example, peak memory ~7.8–8.0 GB. Base hit max_tokens=100 on 13/13 parsed logs; LoRA finished early on at least two. 256/512 budgets are NOT RUN. Exploratory reuse of the 13 cases would not be a new validation.",
        environment:
          "No joule or carbon figure is reported. Latency and token-cap hits are not environmental savings. The footprint question is the next research direction, not a backfilled number.",
        unresolved:
          "Whether a higher token budget recovers base structure without changing the SDG ranking is unknown. Do not generalize this adapter’s result.",
      },
    },
  },
  {
    slug: "agentic-soc-platform",
    title: "Agentic SOC Investigation Platform",
    eyebrow: "Personal project · in progress",
    lede: "Evidence objects before narration. BOTS validation has not been run.",
    summary:
      "The last beat of the story: normalize SIEM exports, preserve provenance, and correlate only literal identifiers—before any model is allowed to narrate.",
    problem:
      "Security investigation fails when a model is asked to remember what the evidence was. If normalization invents timestamps or correlation buckets empty fields together, later agents cannot be evaluated.",
    contribution:
      "Built the deterministic layer: Splunk export normalization, EvidenceRecord provenance, correlation by literal identifiers, timezone-honest timelines, FastAPI normalize/health endpoints, local Kafka, and pytest coverage. Orchestration and LLM playbooks are explicitly not implemented yet.",
    architectureSummary:
      "Splunk JSON export → normalizer → EvidenceRecord → correlation / timeline → optional Kafka. Agents and graphs are reserved packages only.",
    tech: [
      "Python",
      "FastAPI",
      "Pydantic",
      "pytest",
      "Apache Kafka (local KRaft)",
      "Docker Compose",
    ],
    areas: ["agents-tools", "ai-infrastructure", "evaluation"],
    status: "personal-in-progress",
    statusLabel: "In progress · Milestone 5 (local Kafka); no LLM layer yet",
    featured: true,
    theme: "coral",
    art: "none",
    cover: "/work/soc-cover.jpg",
    coverAlt:
      "Original illustration of stacked evidence cards and a coral timeline. Not SIEM telemetry or a BOTS screenshot.",
    aspect: "4:5",
    github: "https://github.com/SumalyaPatnala/agentic-soc-platform",
    evidence: [
      {
        kind: "repository",
        statement:
          "README states current milestone, what is implemented, and what is deliberately absent. Test suite covers normalization, correlation, timeline, validation, and Kafka adapters. Fixture events are labelled fixtures, not BOTS evidence.",
      },
      {
        kind: "none",
        statement:
          "docs/VALIDATION_STATUS.md: BOTS v3 validation has not been run. data/botsv3/raw contains only .gitkeep. No real export, no claimed detection metrics.",
      },
    ],
    diagram: "soc",
    caseStudy: {
      whyItMatters:
        "An investigation agent is only as honest as the evidence object it receives. Deterministic preprocessing is the evaluation prerequisite, not an afterthought.",
      question:
        "Can a later model be wrong about meaning without being wrong about the evidence object it inherited?",
      constraints: [
        "Real public telemetry only (Splunk BOTS v3). No fabricated incidents in the product path.",
        "Never invent a timestamp or timezone.",
        "Do not persist events to a datastore in the current milestone.",
        "Keep AI reasoning out until the evidence layer is stable.",
      ],
      architecture: [
        "SecurityEvent is vendor-neutral; SplunkBOTSEventNormalizer maps exports via field aliases.",
        "EvidenceRecord adds evidence_id and source order; raw_event is retained untouched.",
        "Correlation groups by user, host, src_ip, dest_ip only when values are present.",
        "Timeline ordering fails loudly on mixed naive/aware timestamps unless the caller states a zone.",
        "Local Kafka (KRaft, Docker Compose, $0 cloud) for streaming normalized events.",
      ],
      decisions: [
        {
          title: "Facts before interpretation",
          body: "Sharing a source IP is a fact. Calling it suspicious is an interpretation. Computing the fact in code means a later model can be wrong about meaning without being wrong about evidence.",
        },
        {
          title: "Empty is not a join key",
          body: "Records missing a username are omitted from user correlation. Bucketing nulls would manufacture a relationship the telemetry does not support.",
        },
        {
          title: "Fail on timezone mix",
          body: "Quietly stamping UTC on naive Windows events could reorder an investigation by hours. The CLI requires --assume-timezone so the assumption is explicit.",
        },
      ],
      implementation: [
        "FastAPI: GET /health, GET /health/kafka, POST /events/normalize.",
        "CLIs for file normalization, timeline, validation, Kafka produce/consume.",
        "Validation report hashes the raw export before and after so 'untouched' is measured.",
        "Fixture events in tests are labeled as schema-shape fixtures, not BOTS evidence.",
      ],
      evaluation:
        "Current verification is software verification: pytest on schema, normalizer, correlation, timeline, and Kafka adapters, plus a documented BOTS v3 procedure (docs/botsv3-validation.md). docs/VALIDATION_STATUS.md records that the procedure has not been executed: no real_export_*.json, splunk CLI not on PATH. Fixture tests are not BOTS validation. No detection-quality metrics are claimed.",
      results: [
        "A typed, tested evidence core exists and is the product of this milestone.",
        "The repository refuses to call fixture tests 'validated on BOTS'. Phase 4 did not fabricate an export to close that gap.",
      ],
      limitations: [
        "LangGraph, playbooks, vector search, LLM calls, Kubernetes, auth, and durable storage are not implemented.",
        "Real BOTS exports are gitignored and were not redistributed here.",
        "Kafka delivery is at-least-once; downstream stages must tolerate duplicates.",
      ],
      next: [
        "Run the documented validation script against a real BOTS export.",
        "Only then attach an investigation agent, with traces that cite evidence_id values.",
        "Score the agent on groundedness against those IDs—not on prose quality.",
      ],
      reproduce: [
        "Clone agentic-soc-platform, Python 3.11+, pip install -r requirements.txt.",
        "uvicorn app.main:app --reload and curl /health.",
        "pytest.",
        "Optional: docker compose for local Kafka.",
        "BOTS v3 data must be obtained from Splunk; it is not in the repo.",
      ],
    },
  },
  {
    slug: "multimodal-llm-assistant",
    title: "Smart Multimodal LLM Assistant",
    eyebrow: "Academic research · unpublished",
    lede: "Papers, captions, and transcripts as evidence. Unpublished research prototype.",
    summary:
      "SFSU research prototype: retrieve from papers and multimodal public content, then answer research questions with a RAG stack rather than a single chat window.",
    problem:
      "Social-innovation research is scattered across papers, project records, and public video. Keyword search does not join those modalities, and a generic LLM does not show its sources.",
    contribution:
      "Designed and prototyped a Streamlit research assistant that loads PDFs, embeds with a local Ollama model, retrieves via Chroma and MultiQueryRetriever, and optionally captions video frames (BLIP) and transcribes audio (Whisper).",
    architectureSummary:
      "PDF / video / audio inputs → captioning & transcription → chunking → Ollama embeddings → Chroma → MultiQueryRetriever → local chat model.",
    tech: [
      "Python",
      "LangChain",
      "Ollama",
      "Chroma",
      "BLIP",
      "Whisper",
      "Streamlit",
    ],
    areas: ["research-ml", "evaluation", "full-stack"],
    status: "academic-research",
    statusLabel: "Academic research prototype · not a verified publication",
    featured: false,
    theme: "lavender",
    art: "none",
    cover: "/work/multimodal-cover.jpg",
    coverAlt:
      "Original illustration of papers, a film strip, and a waveform on cream paper. Not a RAG screenshot or retrieval score.",
    aspect: "3:4",
    github: "https://github.com/SumalyaPatnala/Social_Innovation_Research_With_LLMS",
    evidence: [
      {
        kind: "linkedin",
        statement:
          "LinkedIn lists Graduate Research Assistant (Aug 2023–Jun 2024) with Dr. Lihua Wang and Applied Researcher, GenAI (Jun 2024–Feb 2025).",
      },
      {
        kind: "none",
        statement:
          "No peer-reviewed publication was verified. RLHF is listed on LinkedIn but was not found in the inspected prototype.",
      },
    ],
    diagram: "multimodal",
    caseStudy: {
      whyItMatters:
        "The research question is whether a multimodal retrieval assistant can help analysts inspect social-innovation material without flattening it into uncited chat.",
      question:
        "Can a retrieval-first, multimodal assistant help researchers inspect social-innovation evidence without collapsing the trail of sources into uncited prose?",
      constraints: [
        "Academic compute: local Ollama models, consumer GPUs/CPUs, Streamlit as the interface.",
        "Sources include PDFs and public video—not licensed enterprise corpora.",
        "Must remain distinguishable from production RAG at an employer.",
      ],
      architecture: [
        "Unstructured PDF loading, recursive chunking, Ollama embeddings, Chroma vector store.",
        "MultiQueryRetriever to expand the user question before similarity search.",
        "BLIP captions for sampled video frames; Whisper for audio.",
        "Local ChatOllama generation over retrieved context.",
      ],
      decisions: [
        {
          title: "Local models over hosted APIs as the default path",
          body: "Ollama keeps the prototype reproducible in a lab without sending research PDFs to a third-party endpoint by default.",
        },
        {
          title: "Query expansion before retrieval",
          body: "Social-innovation language is inconsistent across papers. MultiQueryRetriever is a cheap way to raise recall before investing in a learned reranker.",
        },
        {
          title: "Separate modalities, then retrieve",
          body: "Video becomes captions and transcripts before indexing. That is lossy, and the research page treats it as a limitation rather than a solved fusion model.",
        },
      ],
      implementation: [
        "Multiple Streamlit iterations exist locally (SMLA, Social_Inno_LLM_Agent).",
        "Public GitHub has related research repositories; they should be treated as research code, not product packaging.",
      ],
      evaluation:
        "Résumé mentions RAGAS, LangSmith, ROUGE, and semantic similarity across several retrieval configurations. Those run logs are not in this website repository, so no numeric lift is shown. Evaluation intent: retrieval relevance, citation usefulness, and whether multimodal context changes the answer.",
      results: [
        "A working multimodal ingestion and retrieval prototype was built and used in an academic research setting.",
        "LinkedIn recommendation from Dr. Lihua Wang describes independent development of a RAG framework for extracting information from academic papers.",
      ],
      limitations: [
        "Not verified as published or peer-reviewed.",
        "Frame captioning is not video understanding; temporal structure is mostly discarded.",
        "No public, frozen eval harness comparable to the SLM CSV artifacts.",
        "RLHF is not evidenced in the inspected code and is not claimed.",
      ],
      next: [
        "Freeze a retrieval eval set (questions, expected passages, modality tags).",
        "Report nDCG / recall@k before adding agents on top.",
        "If submitting a paper, keep the public site aligned with actual venue status.",
      ],
      reproduce: [
        "This website does not ship the Streamlit app or model weights.",
        "See related GitHub repositories under SumalyaPatnala for research code.",
        "Expect to provide your own Ollama models and source PDFs.",
      ],
    },
  },
  {
    slug: "document-retrieval-engineering",
    title: "Document Retrieval Engineering",
    eyebrow: "Professional work · generalized",
    lede: "Production-style document Q&A architecture, generalized. No client corpus.",
    summary:
      "Production retrieval for document Q&A: chunking, hybrid search, serving, evaluation, and guardrails—described as architecture, not as an employer case file.",
    problem:
      "Enterprise answers fail in boring ways: the wrong passage, an uncited sentence, a timeout, a policy miss. Orchestration without evaluation makes those failures look like model quality.",
    contribution:
      "At Bank of America (via Infosys), built RAG pipelines for vendor document Q&A and summarization, with a FastAPI service path, containerized deployment on OpenShift, Triton serving, and evaluation using lexical/semantic overlap metrics. Current Cisco (via TCS) incubation work applies the same evaluation habit to early supply-chain prototypes, without disclosing client internals.",
    architectureSummary:
      "Documents → parse/chunk → index (keyword and/or vector) → retrieve → generate with citations → evaluate groundedness, latency, and safety. Serving via API + model server.",
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "OpenShift",
      "Jenkins",
      "NVIDIA Triton",
      "Redis",
      "ROUGE / BERTScore (as used in evaluation agents)",
    ],
    areas: ["evaluation", "full-stack", "ai-infrastructure"],
    status: "professional-generalized",
    statusLabel: "Professional experience · non-confidential architecture only",
    featured: false,
    theme: "lavender",
    art: "none",
    cover: "/work/retrieval-cover.jpg",
    coverAlt:
      "Original illustration of stacked documents and coral search beams. Architecture mood, not an employer console.",
    aspect: "4:5",
    evidence: [
      {
        kind: "resume",
        statement:
          "Résumé and LinkedIn describe document RAG, OpenShift, Jenkins, FastAPI, Triton, and evaluation agents. Employer-internal metrics and screenshots are not used.",
      },
    ],
    diagram: "retrieval",
    caseStudy: {
      whyItMatters:
        "Retrieval is where most 'LLM products' actually live. If the evidence set is wrong, generation cannot be rescued by a better prompt.",
      question:
        "If the retrieved evidence set is wrong, can generation be rescued by a better prompt — or does evaluation have to sit beside serving?",
      constraints: [
        "Regulated document handling: PII, access control, and source grounding matter more than novelty.",
        "Serving path had to fit existing container and CI/CD practice (OpenShift, Jenkins).",
        "This write-up cannot include corpus details, prompts, or proprietary diagrams.",
      ],
      architecture: [
        "Ingestion and chunking of vendor documents into a retrievable index.",
        "Generation through an API backend, with a model-serving layer (Triton) rather than ad-hoc notebook calls.",
        "Evaluation agents scoring overlap and semantic similarity (ROUGE, BERTScore) plus operational metrics (latency).",
        "Guardrails described at résumé level: PII, access control, safety checks.",
      ],
      decisions: [
        {
          title: "Evaluation beside serving, not after launch",
          body: "If the only test is a demo question, regressions hide in the long tail. Overlap and latency scores are blunt, but they are automatable.",
        },
        {
          title: "Same API boundary for retrieval and generation",
          body: "FastAPI as the contract keeps the UI, the model server, and the eval jobs on one interface.",
        },
        {
          title: "Generalize the public diagram",
          body: "A truthful architecture sketch beats a fake screenshot of an internal console.",
        },
      ],
      implementation: [
        "Containerized backend on OpenShift with CI/CD.",
        "Redis used in the serving path (résumé); treated here as a caching/session component, not as a vector-DB claim unless independently verified.",
        "Cisco incubation work stays at problem-discovery, feasibility, prototype evaluation, and data readiness.",
      ],
      evaluation:
        "Professional evaluation used similarity/overlap metrics and operational measurements. A résumé figure of +12% source-grounded accuracy is not shown pending independent confirmation (see docs/content-audit.md).",
      results: [
        "Shipped a production-style retrieval service path in a bank environment (consulting engagement).",
        "Brought the same evaluation-first habit into later incubation prototypes.",
      ],
      limitations: [
        "Public evidence is résumé/LinkedIn-level, not a reproducible repo.",
        "Hybrid vs pure-vector details vary across résumé versions; the site does not pick a stack that cannot be shown.",
        "No customer-identifying examples.",
      ],
      next: [
        "If a public, synthetic retrieval eval is approved, import it into the Evaluation Workbench.",
        "Keep professional write-ups architecture-only unless a client allows more.",
      ],
      reproduce: [
        "Not reproducible from public code. This is professional experience, generalized.",
        "The Evaluation Workbench on this site uses synthetic document-Q&A traces to show the measurement shape without employer data.",
      ],
    },
  },
  {
    slug: "llmops-hybrid-inference",
    title: "LLMOps for Local and Hybrid Inference",
    eyebrow: "Personal platform project",
    lede: "Pin the runtime that actually ran. Local first, remote fallback, JSONL logs.",
    summary:
      "The serving beat: a FastAPI router that pins summarization, extraction, and classification to an adapter, local Ollama, or a remote Hugging Face fallback, and logs which runtime actually ran.",
    problem:
      "A fine-tuned adapter is unused if it cannot be served. A remote API is unused if it cannot fail over. Most demo apps hard-code one path.",
    contribution:
      "Implemented a ModelRouter with explicit preferences (finetuned / local / remote / auto), health checks, JSONL event logging, and in-memory metrics.",
    architectureSummary:
      "Client → FastAPI /infer → router (adapter → Ollama → Hugging Face) → metrics/logger.",
    tech: ["Python", "FastAPI", "Ollama", "Hugging Face Inference", "Docker", "JSONL logs"],
    areas: ["ai-infrastructure", "full-stack"],
    status: "personal-complete-artifacts",
    statusLabel: "Personal project · serving code in the SDG repo",
    featured: true,
    theme: "yellow",
    art: "none",
    cover: "/work/llmops-cover.jpg",
    coverAlt:
      "Original illustration of a branching serving path across three stations. Not a live metrics dashboard.",
    aspect: "16:9",
    github:
      "https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/02_llmops_local_hybrid_inference",
    evidence: [
      {
        kind: "repository",
        statement:
          "api/main.py and serving/model_router.py implement routing, health, and in-memory latency logging in the public repository.",
      },
      {
        kind: "none",
        statement:
          "mlflow is listed in requirements.txt and is not imported in the serving path. Docker is present. There is no verified hosted deployment of this API.",
      },
    ],
    diagram: "llmops",
    caseStudy: {
      whyItMatters:
        "Inference routing is where evaluation meets operations: which model ran, how long it took, and what you fall back to when the preferred runtime is down.",
      question:
        "Can a serving router log which runtime actually ran so evaluation jobs can pin a path instead of averaging auto-fallback?",
      constraints: [
        "Local-first: Ollama on localhost, optional remote Hugging Face endpoint.",
        "No paid service required for the default path.",
        "Must expose enough telemetry to compare routes.",
      ],
      architecture: [
        "POST /infer with task, text, model_preference, max_tokens.",
        "Auto policy: fine-tuned adapter if present, else local, else remote.",
        "Health endpoint reports local and remote availability.",
        "Each success writes request_id, model_used, latency_ms, input size.",
      ],
      decisions: [
        {
          title: "Preference is a first-class argument",
          body: "Eval jobs need to pin a route. Auto mode is for demos; pinned mode is for measurement.",
        },
        {
          title: "Log the model that actually ran",
          body: "Fallbacks that are invisible in logs make A/B results meaningless.",
        },
      ],
      implementation: [
        "Dockerfile for containerized serving.",
        "Prompt builder per task type.",
        "Fine-tuned adapter loader with an availability check.",
      ],
      evaluation:
        "The platform records latency per request. It is not itself a quality benchmark. Pair it with the SLM evaluation project for quality numbers.",
      results: [
        "A working local/hybrid router exists in source, including fallback order.",
      ],
      limitations: [
        "Remote availability is currently 'URL configured', not a true live probe.",
        "In-memory metrics do not survive process restart.",
        "mlflow is a requirements.txt line, not a wired experiment tracker.",
        "No auth, quota, or batch API.",
      ],
      next: [
        "Export metrics in the Evaluation Workbench schema.",
        "Add a real dependency probe for the remote route.",
      ],
      reproduce: [
        "From sdg-community-assistant/02_llmops_local_hybrid_inference, install requirements and run the FastAPI app.",
        "Optional: ollama run phi3 for the local path.",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function caseStudyOrder() {
  const spotlight = spotlightProjects();
  const featured = featuredProjects();
  const used = new Set([...spotlight, ...featured].map((project) => project.slug));
  const rest = projects.filter((project) => !used.has(project.slug));
  return [...spotlight, ...featured, ...rest];
}

export function neighboringProjects(slug: string) {
  const ordered = caseStudyOrder();
  const index = ordered.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export const featuredOrder = [
  "ai-infrastructure-network-intelligence",
  "slm-finetuning-evaluation",
  "llmops-hybrid-inference",
  "agentic-soc-platform",
] as const;

export function featuredProjects() {
  return featuredOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project?.featured));
}

export const visionOrder = ["styleweave-vlm-lab", "worldsense-ai"] as const;

export function visionProjects() {
  return visionOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project?.vision));
}

export const spotlightOrder = [
  "styleweave-vlm-lab",
  "worldsense-ai",
  "movie-discovery-recommendation",
] as const;

export function spotlightProjects() {
  return spotlightOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project?.spotlight));
}

export type ProjectReadiness =
  | "hosted-demo"
  | "local-prototype"
  | "research"
  | "planned"
  | "phase-0"
  | "public-artifacts"
  | "professional";

export const readinessLabels: Record<ProjectReadiness, string> = {
  "hosted-demo": "Hosted demo",
  "local-prototype": "Local prototype",
  "research": "Research prototype",
  "planned": "Planned",
  "phase-0": "Phase 0 research",
  "public-artifacts": "Public artifacts",
  "professional": "Professional · generalized",
};

export function projectReadiness(project: Project): ProjectReadiness {
  if (project.slug === "styleweave-vlm-lab") return "phase-0";
  if (project.slug === "worldsense-ai") return "local-prototype";
  if (project.slug === "agentic-soc-platform") return "local-prototype";
  if (project.status === "academic-research") return "research";
  if (project.status === "professional-generalized") return "professional";
  if (project.demo) return "hosted-demo";
  return "public-artifacts";
}

export function filterProjects(area?: string) {
  const filtered = !area
    ? projects
    : projects.filter((project) => project.areas.includes(area as ProjectArea));
  const featuredSlugs = new Set<string>(featuredOrder);
  const featured = featuredOrder
    .map((slug) => filtered.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const rest = filtered.filter((project) => !featuredSlugs.has(project.slug));
  return [...featured, ...rest];
}
