# Content audit

This file separates **verified** public material from **resume- or LinkedIn-reported** claims, **unpublished research**, **incomplete work**, and items that **need approval** before they are treated as facts on the site.

The website copy follows the stricter column. Claims that could not be independently confirmed are either omitted from the public UI, labeled by source, or listed here.

## Sources reviewed

| Source | Status |
| --- | --- |
| Latest résumé PDF (`Desktop/Resume/Sumalya_Patnala_Resume.pdf`, dated around 2 Oct 2026) | Reviewed. Contains a phone number; the public site does **not** reproduce it. |
| Older résumé on Desktop (Jun 2026) | Reviewed for deltas. |
| Public LinkedIn profile | Reviewed. The “About” section still describes Bank of America as current; the Experience section lists Cisco as current. |
| GitHub [`SumalyaPatnala`](https://github.com/SumalyaPatnala) | Public repositories listed. |
| Local clone of `agentic-ai-infrastructure-network-intelligence` | Inspected (Python package, agents, tools, tests). No README in the clone. |
| Local clone of `sdg-community-assistant` | Inspected, including `03_slm_finetuning_evaluation/outputs`. |
| Local clone of `agentic-soc-platform` | Inspected README, app layout, tests. |
| Local SFSU prototypes (`SMLA`, `Social_Inno_LLM_Agent`, related folders) | Inspected at a high level for methods. **A hardcoded third-party API key exists in a local Streamlit prototype; it was not copied into this repository and should be rotated.** |

## Verified facts used on the site

- Name: Sumalya Patnala.
- Location presented as: San Francisco Bay Area (requested). LinkedIn lists Milpitas, California.
- Headline: AI/ML Engineer · Research Engineering · AI Systems (requested).
- Education: M.S. in Business Analytics, San Francisco State University, May 2024.
- Undergraduate: B.Tech. in Electronics and Communications Engineering, Lendi Institute of Engineering & Technology / JNTU Kakinada, 2010–2014 (LinkedIn).
- Professional email on résumé: `sumalyapatnala.28@gmail.com`.
- LinkedIn: [linkedin.com/in/sumalya-patnala](https://www.linkedin.com/in/sumalya-patnala).
- GitHub: [github.com/SumalyaPatnala](https://github.com/SumalyaPatnala).
- Employment framing: Cisco **via Tata Consultancy Services**; Bank of America **via Infosys** (résumé + requested).
- Cisco, AI Engineer, AI Incubation: Dec 2025–present.
- Bank of America, AI/ML Engineer: Mar 2025–Nov 2025.
- Accenture, Data Engineer: Nov 2021–Dec 2022.
- Infosys: Sep 2014–Oct 2021, with a public LinkedIn progression from trainee through Technology Analyst.
- SFSU research on a multimodal LLM assistant for social innovation work (local prototypes + LinkedIn Applied Researcher / GRA roles).
- Public project repositories listed in the projects table below.

## Employment date and title discrepancies

| Topic | Latest résumé | LinkedIn | Site decision |
| --- | --- | --- | --- |
| CGI | Omitted | Data Scientist, Jan–Jun 2024 | Included as **Jan–May 2024** per request. LinkedIn end date differs by one month. |
| Infosys titles | Collapsed as “Technology Analyst, Infosys Ltd, Sep 2014–Oct 2021” | Trainee → System Engineer → Senior System Engineer → Technology Analyst | Site uses the LinkedIn progression; it is more specific and public. |
| SFSU research titles | One block: Applied GenAI Researcher, Aug 2023–Feb 2025 | GRA Aug 2023–Jun 2024; Applied Researcher, GenAI Jun 2024–Feb 2025 | Site uses the two LinkedIn roles. |
| LinkedIn About | — | Still written as if Bank of America is current | Not used as current-role copy. |

## Consulting vs client

Public copy always names the consulting employer when the client is a placement:

- Cisco (via Tata Consultancy Services)
- Bank of America (via Infosys)

Client product names, internal platforms, credentials, proprietary screenshots, and restricted code are **not** used.

## Metrics

| Claim | Where it appears | Independent artifact? | Site treatment |
| --- | --- | --- | --- |
| SLM eval: Base Phi-3 vs LoRA adapter on SDG hit / structure / safety / actionability / latency | Public project README **and** `outputs/strong_eval_summary.csv` | Yes, local CSV. **N = 4** prompt scenarios in `strong_eval_results.csv`. | Shown as **repository-reported evaluation on 4 scenarios**, not as a published benchmark. |
| Peak memory ~7.8 GB during those runs | Eval CSV preview text | Yes, in the same CSV | Mentioned only in the case study, with N=4. |
| Training: Phi-3 Mini, LoRA rank 8, 100 iters, MLX | `adapter_config.json` | Yes | Used. |
| Source-grounded accuracy +12% (Bank of America) | Latest résumé only | No | **Omitted** from the site. Needs approval. |
| Retrieval relevance +18% (SFSU) | Latest résumé only | No | **Omitted**. Needs approval. |
| RAG over 90+ documents | Latest résumé | No | Described qualitatively (“vendor document Q&A”); exact count flagged. |
| 8.3M retail CRM records (Accenture) | Résumé + LinkedIn | No independent dump | Included as résumé/LinkedIn-reported scale, without naming the retail client. |
| Throughput +24%, release cycle −20% (Accenture) | Latest résumé | No | **Omitted** pending approval. |
| Realtor.com listings, +8% website traffic | Résumé + LinkedIn | No | Included as historically consistent public résumé/LinkedIn language; not independently audited. |
| $30K licensing / ETL savings | Résumé + LinkedIn | No | Included with “as documented on my résumé and LinkedIn” discipline in the audit; site wording stays conservative (“reported”). |
| 1M+ records daily PySpark | Résumé + LinkedIn | No | Included as reported production scale. |
| 8% advisor-error / forecasting reduction | Mixed résumé versions | No | **Omitted**; wording is inconsistent across résumé versions. |
| 13K JIRA points, CGI deep-learning rework model | LinkedIn only (CGI omitted from latest résumé) | Local `CGI_ML_Prediction_App` exists | CGI work described at a high level; numeric claims flagged. |
| Comment toxicity “95% accuracy”, drowsiness “0.6 ms” | LinkedIn project blurbs | Not re-verified | **Not featured.** Old personal projects; metrics untreated as evidence. |

## Project status

### AI Infrastructure & Network Intelligence

- Public repo: https://github.com/SumalyaPatnala/agentic-ai-infrastructure-network-intelligence
- Public GitHub `main` last pushed **17 Aug 2026**: Google ADK `Workflow` routing across network / inference / incident / capacity agents, plus DNS, HTTP probe, RIPEstat, and RIPE Atlas tools, with pytest coverage for tools.
- Personal Cloud Run workbench **verified live** 16 Oct 2026: `GET /v1/health` → version 1.4.0, mode demo, `live_classifier_enabled` false. URL: `https://network-diagnostics-workbench-251835511112.us-central1.run.app`.
- Local feature branch `feature/observability-tracing` contains the 1.4.0 source and **has not been pushed**. Site discloses that GitHub lag.
- **Still not found in source:** MCP, A2A, Vertex AI. Resume lists those. They stay unclaimed.

### Production SLM Fine-Tuning & Evaluation Framework

- Public path: https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/03_slm_finetuning_evaluation
- Status: personal / production-style project with real eval artifacts. Not a production deployment at an employer. Site title does **not** use “Production”.
- Held-out N=13 run exists locally under `eval/` and is **not** on public GitHub `main` (HEAD 6df0cd39, last pushed 29 Apr 2026).
- Hugging Face Space `Sumalya/sdg-community-assistant` is the **sibling** SDG case assistant (Streamlit + FAISS + trusted-case library), not this LoRA eval. Space sleeps when idle. Site does not attach it as the SLM demo.
- Related sibling: `02_llmops_local_hybrid_inference` (FastAPI router, Ollama + Hugging Face fallback). `mlflow` is in requirements.txt only.

### LLMOps Platform for Local & Hybrid Inference

- Public path: https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/02_llmops_local_hybrid_inference
- FastAPI `/infer` + `ModelRouter` (finetuned / local / remote / auto), JSONL logs, in-memory metrics. Docker present.
- Not claimed: wired MLflow tracking, hosted API, auth.

### Agentic SOC Investigation Platform

- Public repo: https://github.com/SumalyaPatnala/agentic-soc-platform
- README is explicit: **work in progress**, Milestone 5 (local Kafka). LangGraph, XSOAR playbooks, vector DBs, LLM calls, Kubernetes, and auth are **not implemented**.
- Site labels it **in progress** and does not imply a live SOC product.

### Smart Multimodal LLM Assistant (SFSU)

- Academic research / prototype. Streamlit apps and related folders exist locally.
- Observed methods in local code: PDF loading, Ollama embeddings, Chroma, MultiQueryRetriever, BLIP image captioning, Whisper transcription, optional YouTube search.
- **Do not call this published or peer-reviewed.** A folder named `SMLA_IJDSA` suggests possible submission intent; no publication record was verified.
- LinkedIn claims RLHF fine-tuning. **Not evidenced** in the inspected prototype. Omitted.
- Dataset claim of 12,000+ social-innovation projects across 153 countries comes from the GRA LinkedIn bullets (collaboration with Dr. Lihua Wang). Used as research-context, not as a model-accuracy result.

### Document discovery / retrieval engineering

- Professional work at Bank of America (via Infosys) and current Cisco incubation work.
- Site describes **general retrieval/evaluation architecture** only. No employer internals, no Helix, no proprietary screenshots, no restricted code.

## Do not imply

- Employment at Anthropic, OpenAI, or Google DeepMind.
- Design of production RL infrastructure, Claude training, or frontier-lab-scale serving.
- Peer-reviewed publication of the SFSU multimodal assistant.
- Live public demos unless a real URL is confirmed. The network workbench Cloud Run URL is confirmed (`GET /v1/health` 1.4.0 demo). The Hugging Face Space `Sumalya/sdg-community-assistant` exists but is the sibling SDG case assistant, not the LoRA eval, and sleeps when idle.
- Years-of-experience slogans. Dates are used instead. GitHub bio says “8 years”; LinkedIn about says “8 years”; LinkedIn also surfaces “10 years 11 months”; latest résumé says “5+ years” for AI/ML. **All three are inconsistent. Site uses date ranges.**

## Personal information policy

- Phone number: present on résumé PDFs; **not** on the website or in the public résumé page.
- No home address, immigration documents, or I-9 / I-20 / EAD material.
- Email included because it is on the public-facing résumé.

## Items needing approval before adding to the site

1. Bank of America +12% source-grounded accuracy.
2. SFSU +18% retrieval relevance.
3. Accenture +24% throughput and −20% release-cycle claims.
4. Exact “90+ documents” count.
5. MCP, A2A, and Vertex AI as implemented in the network-intelligence repo. Cloud Run is now claimed only as the personal demo workbench, with GitHub lag disclosed.
6. RLHF as part of the SFSU assistant.
7. CGI numeric claims and whether CGI should remain on the public timeline (it is absent from the latest résumé).
8. Undergraduate IOSR 2014 lung-image paper (older résumé only; citation not re-verified).
9. Any customer, product, or platform names beyond what is already on the public LinkedIn/résumé in non-confidential form.

## Simulations

The Evaluation Workbench on `/lab` uses **synthetic fixtures only**. The UI banner states this. Its metrics are **not** Sumalya’s professional results.
