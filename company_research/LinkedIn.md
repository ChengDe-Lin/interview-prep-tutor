# LinkedIn — Singapore Research

## Company Overview

- **Singapore office**: APAC headquarters, located at Marina Bay Financial Centre Tower 2, 10 Marina Boulevard, Level 29/30/34, Singapore — 28,000 sq ft across 4 floors; expanded recently
- **Office role**: APAC HQ, serving as the regional operations, sales, marketing, and engineering hub for Asia-Pacific
- **Team types based here**: Engineering (full-stack, AI/ML, SRE, infrastructure), Product, Sales, Talent Solutions, Marketing; Singapore is one of LinkedIn's largest engineering hubs outside the US
- **Global scale**: 19,000+ employees across 5 continents; 1.3 billion members on the platform
- **Core products/services relevant to Singapore**:
  - LinkedIn Professional Network (feed, search, messaging)
  - LinkedIn Hiring Assistant — agentic AI for recruiters, currently in beta with Singapore clients (UOB, OKX)
  - LinkedIn Talent Solutions — APAC's largest hiring platform
  - LinkedIn Learning — professional upskilling platform
  - LinkedIn Premium with AI-powered search

## Engineering Culture

- **Tech stack**:
  - Backend: Java (primary production language), Python (GenAI/ML workloads), Scala
  - Messaging/streaming: Apache Kafka (invented at LinkedIn; 7 trillion messages/day across 100+ clusters); Northguard (LinkedIn's in-house Kafka replacement, introduced 2025)
  - Service discovery: Migrated from Zookeeper to Kafka + xDS (2026)
  - Frontend: React, JavaScript/TypeScript
  - Data: Hadoop, Spark, Pinot (real-time OLAP), Espresso (NoSQL)
  - AI/ML: PyTorch, LLMs for GenAI features, Retrieval-Augmented Generation (RAG) for search
  - Infrastructure: Azure (Microsoft-owned), internal PaaS
- **Known engineering values**:
  - Transformation, Integrity, Collaboration, Results (TICR) — core cultural values
  - "Members first" — all engineering decisions rooted in member value
  - High engineering bar: rigorous code reviews, strong mentorship culture
  - GenAI-forward: aggressive adoption of LLMs for product features (search, feed, hiring, content)
- **Work style**:
  - Collaborative and process-oriented; Glassdoor Singapore rating 3.9/5
  - 70% of Singapore employees would recommend LinkedIn to a friend (above global average of 61%)
  - Good work-life balance; hybrid work model
  - Large-company dynamics: some bureaucracy, promotions are process-heavy

## Recent News (2025-2026)

- **2025**: LinkedIn Hiring Assistant launched — first large-scale AI agent for recruiters; beta in Singapore with UOB and OKX; saves 6-8 hours of recruiter time per hire
- **2025**: Introduced Northguard, a next-generation log storage system replacing Kafka for LinkedIn's most demanding workloads — major internal infrastructure initiative
- **Feb 2026**: Re-architected service discovery, replacing Zookeeper with Kafka + xDS at scale — published as engineering blog post on InfoQ
- **2025**: Scaled GenAI stack from isolated experiments to production-grade agentic AI; GenAI tech stack matured to support AI agents beyond chatbots
- **2025**: AI-powered people search rolled out to Premium subscribers (semantic LLM-based search replacing keyword matching)
- **2025**: Video feed watch time up 36% YoY; upgraded AI-powered feed recommendations with real-time behavioral signals
- **Ongoing**: LinkedIn's Singapore office expanded to 4 floors (28,000 sq ft) — indicating continued APAC investment


## Interview Style

- **Process structure** (3-6 weeks):
  1. Recruiter phone screen (15-30 min, background + motivation)
  2. Technical phone screen (coding, 45-60 min)
  3. Virtual onsite (5 rounds):
     - Standard coding round (LeetCode medium, algorithms + data structures)
     - "Coding with AI" round — new addition; tests ability to use AI tools effectively in a coding task
     - Hiring manager round (behavioral + technical depth)
     - System design / High-Level Design (HLD) round
     - Project deep-dive (technical interview on your past work)
- **Known BQ themes** (aligned to TICR values):
  - **Transformation**: Tell me about a time you drove meaningful change in your team/org
  - **Integrity**: How do you handle ethical trade-offs or pressure to cut corners?
  - **Collaboration**: Describe navigating cross-team conflict or aligning stakeholders
  - **Results**: What's the most impactful project you've shipped? How did you measure success?
  - Leadership and ownership at scale
  - Managing ambiguity; making decisions without full information
- **Technical expectations**:
  - Algorithms: LeetCode medium-hard (graphs, dynamic programming, system design)
  - System design: distributed systems at LinkedIn scale (messaging, search, feed, notifications)
  - The "Coding with AI" round is unique — signals LinkedIn values AI-augmented engineering
  - Staff-level: expect deep design questions, leadership scenarios, and org influence discussions

## ChengDe Experience Mapping

| Company Values / Needs | ChengDe's Match |
|------------------------|-----------------|
| Transformation — driving meaningful change | Agentic AI harness (vibe-coding enablement) is a paradigm shift in how engineers write code; GenAI seminars drove org-wide transformation |
| Results — metric-driven impact | Fast promotion to Senior in 2 years; 2 patents demonstrate tangible, defensible output |
| Collaboration — cross-team influence | Cross-team collaboration award; GenAI seminars invited cross-functional participation |
| "Coding with AI" round — AI-augmented engineering | Directly building agentic AI harness; deep practitioner experience with LLMs in production |
| LinkedIn's GenAI push (Hiring Assistant, AI Search) | Agentic AI harness experience maps directly to LinkedIn's AI agent infrastructure work |
| Micro-frontend architecture | Aligns with LinkedIn's complex frontend architecture (React, modular UI at scale) |
| High engineering bar + NTU 1st in class | Academic excellence signals the caliber LinkedIn recruits for |

## Customized Pitch Notes

- **What to emphasize in Why Here**:
  - LinkedIn is one of the few companies where your agentic AI work is *directly applicable to the product*: LinkedIn's Hiring Assistant is an AI agent — your experience building an agentic AI harness for engineers is a near-perfect match
  - The "Coding with AI" interview round signals that LinkedIn is deliberately building a culture of AI-augmented engineering — you're not just learning this, you're building the infrastructure that enables it
  - Singapore as APAC HQ means engineering decisions here have regional leverage across a market of billions of professionals
  - Microsoft's resources + LinkedIn's product moat = stability with upside; frame this as wanting to build at scale with real infrastructure challenges (Northguard, xDS, 7T Kafka messages/day)
- **What to watch out for**:
  - TICR values will be explicitly assessed in behavioral rounds — map every story to one of the four values
  - LinkedIn can feel like a large-company machine; show that you thrive in structured, collaborative environments, not just scrappy startups
  - The "Coding with AI" round is unusual — practice pair-programming with Copilot/Claude under timed conditions; treat it as a pairing exercise, not just a speed test
  - Promotion process is noted as slow/process-heavy — your 2-year Senior promotion is a strong differentiator; lead with it
  - RSUs are MSFT stock — if asked about comp expectations, align to the total package not just cash
