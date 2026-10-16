export type ExperienceKind = "consulting-client" | "employer" | "academic";

export type Role = {
  id: string;
  org: string;
  orgNote?: string;
  title: string;
  dates: string;
  location: string;
  kind: ExperienceKind;
  summary: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    id: "cisco",
    org: "Cisco",
    orgNote: "via Tata Consultancy Services",
    title: "AI Engineer, AI Incubation",
    dates: "Dec 2025 – present",
    location: "San Francisco Bay Area",
    kind: "consulting-client",
    summary:
      "Early-stage AI work in supply-chain intelligence: whether a problem is even model-shaped, whether the data can support it, and whether a prototype is good enough to keep.",
    bullets: [
      "Problem discovery and feasibility for LLM- and data-driven operational questions.",
      "Prototype evaluation across accuracy, latency, safety, and reliability—not demo-only checks.",
      "Model selection and data-readiness discussions with engineering partners.",
      "Full-stack prototype paths (Python services and web UIs) described only at a non-confidential level.",
    ],
  },
  {
    id: "bofa",
    org: "Bank of America",
    orgNote: "via Infosys",
    title: "AI/ML Engineer",
    dates: "Mar 2025 – Nov 2025",
    location: "United States",
    kind: "consulting-client",
    summary:
      "Document question-answering and summarization in a production-style serving path: retrieval, API, model server, CI/CD, and evaluation.",
    bullets: [
      "Retrieval-augmented generation for vendor document Q&A and summarization.",
      "FastAPI backend deployed on OpenShift with Jenkins CI/CD and Triton inference serving.",
      "Evaluation agents using overlap and semantic similarity metrics (ROUGE, BERTScore) plus latency.",
      "Guardrails discussed at résumé level: PII handling, access control, and source grounding. Internal accuracy lifts are not quoted here; see the content audit.",
    ],
  },
  {
    id: "sfsu-applied",
    org: "San Francisco State University",
    title: "Applied Researcher, GenAI",
    dates: "Jun 2024 – Feb 2025",
    location: "San Francisco, CA",
    kind: "academic",
    summary:
      "Built a multimodal research assistant for social-innovation material: papers, retrieval, and public video/audio context.",
    bullets: [
      "RAG stack with local models (Ollama), vector retrieval, and query expansion.",
      "Multimodal ingestion via image captioning and speech transcription before indexing.",
      "Streamlit interface for researchers. Not a verified publication.",
    ],
  },
  {
    id: "cgi",
    org: "CGI",
    title: "Data Scientist",
    dates: "Jan 2024 – May 2024",
    location: "San Francisco, CA",
    kind: "employer",
    summary:
      "Engineering-analytics and text classification for delivery operations. Dates follow the requested range; LinkedIn lists an end date of Jun 2024.",
    bullets: [
      "Worked from Jira-style delivery data to surface rework and spillover patterns.",
      "PyTorch text model for semantic pattern recognition on issue descriptions and acceptance criteria.",
      "Dashboards and a client-facing analytics view for team competency and sprint spillover.",
    ],
  },
  {
    id: "sfsu-gra",
    org: "San Francisco State University",
    title: "Graduate Research Assistant",
    dates: "Aug 2023 – Jun 2024",
    location: "San Francisco, CA",
    kind: "academic",
    summary:
      "Research assistance with Dr. Lihua Wang on social-innovation project data and literature, which became the substrate for the LLM assistant.",
    bullets: [
      "Analyzed a large public-style corpus of social-innovation projects (LinkedIn: 12,000+ projects, 153 countries).",
      "Literature review using contemporary NLP / LLM tooling.",
      "Independent RAG prototype work later described in a faculty recommendation.",
    ],
  },
  {
    id: "accenture",
    org: "Accenture",
    title: "Data Engineer",
    dates: "Nov 2021 – Dec 2022",
    location: "Bengaluru, India",
    kind: "employer",
    summary:
      "Cloud data engineering: migrate a retail CRM workload to Azure and keep the pipelines trustworthy.",
    bullets: [
      "Re-platformed ETL with PySpark on Azure Databricks for a large retail CRM dataset (résumé/LinkedIn: 8.3M records).",
      "Monitored pipeline quality and reliability for batch ingestion.",
      "CI/CD and warehouse patterns in support of later ML use. Client product names omitted.",
    ],
  },
  {
    id: "infosys-ta",
    org: "Infosys",
    title: "Technology Analyst, Machine Learning",
    dates: "Oct 2018 – Oct 2021",
    location: "Hyderabad, India",
    kind: "employer",
    summary:
      "NLP and marketing-analytics systems for digital publishing and real-estate listing products.",
    bullets: [
      "NLP / Word2Vec pipelines on AWS SageMaker for listing text and query relevance.",
      "Realtor.com listing personalization; résumé and LinkedIn report an 8% traffic lift.",
      "PySpark feature pipelines reported at 1M+ records/day for marketing-mix modeling.",
    ],
  },
  {
    id: "infosys-sse",
    org: "Infosys",
    title: "Senior System Engineer, Data Science",
    dates: "Jan 2016 – Sep 2018",
    location: "Hyderabad, India",
    kind: "employer",
    summary:
      "Analytics engineering for a wealth-and-publishing workflow, plus ETL cost reduction.",
    bullets: [
      "Statistical / ML support for a Barron’s-related wealth analytics tool.",
      "Migrated paid Redshift ETL jobs toward Apache Airflow; résumé/LinkedIn report ~$30K annual licensing savings.",
    ],
  },
  {
    id: "infosys-se",
    org: "Infosys",
    title: "System Engineer, Software Development",
    dates: "Jan 2015 – Dec 2015",
    location: "Hyderabad, India",
    kind: "employer",
    summary:
      "Enterprise software and incident remediation in a telecom order-management environment.",
    bullets: [
      "Order progression and incident work across consumer, wholesale, and business lines.",
      "Automated remediation scripts (SQL, Java, Unix) to cut repetitive operational effort.",
    ],
  },
  {
    id: "infosys-trainee",
    org: "Infosys",
    title: "System Engineer Trainee",
    dates: "Sep 2014 – Jan 2015",
    location: "Mysuru, India",
    kind: "employer",
    summary:
      "Foundational software engineering: Java, SQL, and web technologies, including a training project that joined backend and relational data.",
    bullets: [
      "Java, data structures, RDBMS, HTML/CSS/JavaScript.",
    ],
  },
];
