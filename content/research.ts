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
    "Evaluation methodology for retrieval and agents",
    "Deterministic evidence objects in front of language models",
    "Researcher-facing tooling: traces, comparisons, failure taxonomies",
    "Serving and routing for small adapted models",
    "Reliability of tool-using workflows",
    "Environmental constraints on AI compute (research direction; no findings yet)",
  ],
};
