export const research = {
  title: "Multimodal assistance for social-innovation research",
  status: "Academic research prototype. Not verified as published or peer-reviewed.",
  supervisor: "Graduate research with Dr. Lihua Wang, San Francisco State University.",
  question:
    "Can a retrieval-first, multimodal assistant help researchers inspect social-innovation evidence—papers, project records, and public video—without collapsing the trail of sources into uncited prose?",
  approach: [
    "Treat documents, captions, and transcripts as first-class evidence objects that can be retrieved independently of generation.",
    "Use local generation and embedding models (Ollama) so a lab can run the stack without sending the corpus to a hosted API by default.",
    "Expand queries before retrieval (MultiQueryRetriever) because social-innovation vocabulary is inconsistent across papers and practice reports.",
    "Convert video to sampled-frame captions (BLIP) and audio to Whisper transcripts before indexing, rather than claiming end-to-end video understanding.",
  ],
  experiments: [
    "PDF ingestion, chunking, and Chroma retrieval over research papers.",
    "Optional YouTube / public-video paths for captioning and transcription.",
    "Streamlit as the researcher-facing interface.",
    "Iterative prototypes rather than a single frozen release (local SMLA and Social Innovation agent codebases).",
  ],
  evaluation: [
    "Intended measurements: retrieval relevance, whether answers remain tied to retrieved passages, and whether multimodal context changes the response.",
    "Résumé mentions RAGAS, LangSmith, ROUGE, and semantic similarity across multiple retrieval configurations. Those logs are not checked into this website, so no lift percentages are shown.",
    "A faculty recommendation describes independent development of a RAG framework for extracting information from academic papers. That is qualitative evidence of the work, not a benchmark.",
  ],
  observations: [
    "Query expansion is cheap relative to a learned reranker and was a reasonable first control for recall.",
    "Caption-then-index is an engineering compromise: it makes video searchable and discards temporal structure.",
    "Local models made iteration possible on academic hardware; they also made latency a first-class complaint.",
  ],
  limitations: [
    "No verified publication.",
    "No public frozen eval set comparable to the SLM CSV artifacts.",
    "RLHF appears on LinkedIn and is not evidenced in the inspected prototype—omitted here.",
    "LinkedIn GRA bullets cite 12,000+ projects across 153 countries as the research corpus context, not as a model score.",
  ],
  future: [
    "A frozen question set with expected passages and modality tags.",
    "Report recall@k and nDCG before adding an agent loop.",
    "Citation UI that always shows evidence IDs next to generated claims.",
    "If a paper is submitted or accepted, update this page with venue status instead of implying it.",
  ],
  interests: [
    "Computer vision and temporal events",
    "Open vision-language models",
    "Content-based recommendation and retrieval",
    "Evaluation methodology for retrieval and agents",
    "Deterministic evidence objects in front of language models",
    "Researcher-facing tooling: traces, comparisons, failure taxonomies",
    "Serving and routing for small adapted models",
    "Reliability of tool-using workflows",
    "Environmental constraints on AI compute (research direction; no findings yet)",
  ],
};

export const researchThreads = [
  {
    id: "vlm-fashion",
    theme: "rose" as const,
    kicker: "Vision-language models",
    title: "Open VLM fashion search",
    question:
      "Can explicit visual attribute constraints and a small fusion module improve FashionIQ composed retrieval while keeping explanations visually grounded?",
    method:
      "Phase 0 documentation packet: hardware, literature, hypotheses, FashionIQ audit, model selection, experiment plan. Frozen CLIP baseline is not evaluated.",
    status: "Phase 0 research complete. No training, metrics, or deployed interface.",
    evidence:
      "Public GitHub styleweave-vlm-lab. No Recall@K or nDCG. Fashion imagery on this site is original illustration, not FashionIQ samples.",
    links: [
      { href: "/work/styleweave-vlm-lab", label: "StyleWeave case study" },
      {
        href: "https://github.com/SumalyaPatnala/styleweave-vlm-lab",
        label: "StyleWeave repository",
        external: true,
      },
    ],
  },
  {
    id: "vision-events",
    theme: "teal" as const,
    kicker: "Computer vision",
    title: "Video perception as evidence",
    question:
      "Can detections, persistent track IDs, and ROI enter/exit events be replayed against the source video instead of disappearing into a demo GIF?",
    method:
      "WorldSense Phase 1 samples MP4 frames, runs TorchVision Faster R-CNN, associates BYTE-style IDs, and logs polygon occupancy with evidence JPEGs.",
    status: "Local prototype · Phase 1. Not hosted. SAM 2, VGGT, and VQA are not implemented.",
    evidence:
      "Local repository only. No public GitHub remote. No labeled MOT benchmark or mAP claim.",
    links: [{ href: "/work/worldsense-ai", label: "WorldSense case study" }],
  },
  {
    id: "recommendation",
    theme: "coral" as const,
    kicker: "Recommendation systems",
    title: "Content-based movie discovery",
    question:
      "If the only user action is picking a title, can bag-of-words cosine neighbors on cast, director, and genre produce a usable discovery list without a personalization graph?",
    method:
      "Flask app over a frozen CSV: CountVectorizer + cosine similarity, TMDB for display metadata, IMDb review scrape with a pickled polarity model.",
    status:
      "Public source. Content-based baseline only. No live production URL claimed. Collaborative filtering, embeddings, and ranking metrics are Planned.",
    evidence:
      "https://github.com/SumalyaPatnala/RecommendationSystem. No MAP/nDCG in the repo. Not Netflix viewing data.",
    links: [
      { href: "/work/movie-discovery-recommendation", label: "Movie discovery case study" },
      {
        href: "https://github.com/SumalyaPatnala/RecommendationSystem",
        label: "RecommendationSystem repository",
        external: true,
      },
    ],
  },
  {
    id: "model-eval",
    theme: "yellow" as const,
    kicker: "Model evaluation",
    title: "Score the contract, not the vibe",
    question:
      "If an adapter or a router is the product, can the evaluation freeze the dataset, name the predictor, and refuse to pool leaked and held-out runs?",
    method:
      "SLM: base vs LoRA on a five-section SDG contract (leaked N=4 CSV kept separate from held-out N=13). Routing: keyword baseline composed with router() on routing_eval_v1 (N=134), not Gemini.",
    status: "Measured artifacts exist. Live Gemini routing remains BLOCKED.",
    evidence:
      "Held-out SDG hit fell (0.7823 → 0.6031) while structure rose. Routing strict 90.3% is the keyword baseline, not a live classifier.",
    links: [
      { href: "/work/slm-finetuning-evaluation", label: "SLM evaluation" },
      { href: "/work/ai-infrastructure-network-intelligence", label: "Routing evaluation" },
      { href: "/lab?source=measured", label: "Measured workbench" },
    ],
  },
  {
    id: "reliable-reasoning",
    theme: "coral" as const,
    kicker: "Reliable AI reasoning",
    title: "Evidence before interpretation",
    question:
      "Can a later model be wrong about meaning without being wrong about the evidence object it inherited?",
    method:
      "Typed RoutingDecision with the original query intact; SOC EvidenceRecord provenance and correlation only on literal identifiers. LangGraph is not implemented on the SOC milestone.",
    status: "Routing graph is in public source with a hosted demo behind GitHub. SOC is in progress, no LLM layer.",
    evidence:
      "Public GitHub for both systems. SOC BOTS v3 validation has not been run. Cloud Run reports 1.4.0 demo mode, classifier off.",
    links: [
      { href: "/work/ai-infrastructure-network-intelligence", label: "Network intelligence" },
      { href: "/work/agentic-soc-platform", label: "SOC evidence layer" },
      {
        href: "https://github.com/SumalyaPatnala/agentic-soc-platform",
        label: "SOC repository",
        external: true,
      },
    ],
  },
  {
    id: "multimodal",
    theme: "lavender" as const,
    kicker: "Multimodal retrieval",
    title: "Social-innovation evidence across papers and video",
    question:
      "Can a retrieval-first assistant inspect papers, project records, and public video without collapsing sources into uncited prose?",
    method:
      "Unstructured PDFs, BLIP captions, Whisper transcripts, Ollama embeddings, Chroma, MultiQueryRetriever, local ChatOllama.",
    status: "Academic research prototype. Not verified as published or peer-reviewed.",
    evidence:
      "LinkedIn GRA tenure and a faculty recommendation. No public frozen nDCG/recall@k harness in this website.",
    links: [
      { href: "/work/multimodal-llm-assistant", label: "Multimodal case study" },
      {
        href: "https://github.com/SumalyaPatnala/Social_Innovation_Research_With_LLMS",
        label: "Related GitHub",
        external: true,
      },
    ],
  },
  {
    id: "limits",
    theme: "teal" as const,
    kicker: "Research direction",
    title: "Intelligence Within Limits",
    question:
      "How can AI compute be planned under energy, water, climate, and carbon constraints without hiding burden-shifting?",
    method:
      "Candidate framing only. No theorem, no kg CO₂ estimate, no scored experiment on public energy datasets.",
    status: "In development. Mathematical novelty and empirical findings have not yet been established.",
    evidence: "No carbon or kWh result is reported on this site.",
    links: [{ href: "/research/intelligence-within-limits", label: "Open the research brief" }],
  },
];
