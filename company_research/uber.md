# Uber — Singapore Research

## Company Overview

- **Singapore office**: Asia Pacific Regional Hub at 182 Cecil Street, #34-01 Frasers Tower, Singapore 069547. Previously occupied 55,000 sq ft (Level 35 & 36) at Guoco Tower (tallest building in Singapore); current registered address is Frasers Tower. The APAC hub houses ~170-200 employees across corporate, operations, and engineering functions.
- **APAC scope**: Singapore office supports operations across 10 languages and 102+ cities in 9 APAC countries — Australia, New Zealand, India, Bangladesh, Sri Lanka, Japan, South Korea, Taiwan, and Hong Kong.
- **Note on SEA rides**: Uber sold its Southeast Asia ride-hailing and Uber Eats SEA operations to Grab in 2018. Singapore is no longer a rides market for Uber — it is purely a regional HQ and engineering/operations hub.
- **Core products/services relevant to Singapore office**:
  - APAC Regional Product & Strategy Operations (Uber Eats, Rides growth across APAC)
  - Data Science & Analytics for APAC pricing, surge, and platform integrity
  - Engineering teams supporting global platform (payments, maps, marketplace, ML infrastructure)
  - Uber AI Solutions — data labeling and AI data platform as a B2B business
  - Uber Freight and emerging Autonomous Solutions (global platform, engineering distributed)

## Engineering Culture

- **Primary tech stack**: Go (primary for microservices — ~50M lines of code, ~2,100 Go services), Python, Java, Node.js. Data/ML uses Spark, Ray on Kubernetes. Frontend: React. Infrastructure: Kubernetes (completed full migration from Apache Mesos in 2024), gRPC, Apache Thrift, NGINX-based gateway.
- **Scale**: 450 trips per second across 70 countries and 15,000+ cities. Kubernetes cluster runs at 3 million cores with 1.5 million pod launches daily.
- **Known engineering values**:
  - **Ownership**: Engineers own features end-to-end — from design through deployment and monitoring. "Did you just fix a bug, or did you drive a project from conception to launch?"
  - **Go Get It (bias for action)**: Flat hierarchy; even junior engineers can propose and lead significant initiatives with strong judgment.
  - **Trip Obsession / Customer Obsession**: Every decision traced back to rider/driver/eater experience.
  - **Stand for Safety, Do the Right Thing**: Safety and ethical engineering are first-class concerns.
  - **Data-driven**: Teams use data ownership — team leads accountable for quality of data they produce and consume.
- **AI-first engineering (2025-2026)**:
  - 84% of Uber developers are agentic coding users (as of early 2026); 65-72% of code is AI-generated.
  - 90%+ of engineers use advanced coding tools including Cursor and Claude Code.
  - Internal GenAI systems: **uReview** (AI code review — analyzes 90% of ~65,000 weekly diffs; 75% comments rated useful), **Genie** (Gen AI on-call copilot), **GenAI Gateway** (unified LLM access layer across OpenAI, Vertex AI, and internal models), **Michelangelo** (ML platform extended for generative AI).
- **Work style**: Hybrid — office on Tuesdays and Fridays (per employee reviews). Relatively flat hierarchy; teams have autonomy on execution methodology and oncall structure in exchange for owning results.
- **Engineering blog**: eng.uber.com — consistently publishes deep technical posts on distributed systems, ML, data infrastructure, and platform engineering.

## Recent News (2025-2026)

- **Kubernetes migration complete (2024-2025)**: Uber completed full migration of its entire compute platform from Apache Mesos to Kubernetes — covering microservices, ML workloads (Ray on Kubernetes), and large-scale interactive compute. This is a major infrastructure milestone affecting all engineering teams.
- **Uber Autonomous Solutions launched (Feb 2026)**: New division to help AV partners build and commercialize autonomous vehicles. Partnered with NVIDIA to deploy one of the world's largest robotaxi networks (100,000 vehicles target by 2027). Partnership with Waabi ($250M milestone-based investment for 25,000+ robotaxis on Uber platform). Rivian and Momenta also announced as AV partners.
- **Uber AI Solutions expansion (2025)**: Expanded B2B AI data platform — customized data solutions for training AI models and agents, global digital task networks, tools for model testing. Positions Uber as a data infrastructure provider to enterprise AI labs.
- **Uber Eats grocery growth**: Grocery and retail delivery segment targeting $12.5B gross bookings by end of 2025; 1,000 new retailers added since early 2025. Autonomous sidewalk delivery partnership with Starship Technologies (UK launch Dec 2025, Europe 2026, US 2027).
- **Developer AI adoption**: CTO noted 90%+ of engineers use AI coding tools; internal uReview system reviews 65,000 diffs/week with high approval rate.
- **Uber Eats Singapore**: Uber Eats continues to operate in Singapore alongside Foodpanda and Deliveroo in the restaurant delivery market.


## Interview Style

### Process Structure (Senior SWE, L5)
1. **Recruiter Screen** (30-45 min): Background, motivation, expectations.
2. **Online Assessment / CodeSignal** (70-90 min): 2 coding problems, Leetcode Medium difficulty. First elimination gate.
3. **Technical Phone Screen** (45-60 min, optional): 1 coding question + back-end/system discussion.
4. **Virtual Onsite Loop** (4-5 rounds, back-to-back):
   - **Coding Round 1**: DSA + code quality (clean classes, modular structure, naming conventions). Leetcode Medium.
   - **Coding Round 2**: More complex DSA or applied problem (location tracking, routing, pricing-related).
   - **System Design**: Architect scalable, fault-tolerant services. For L5: multi-region availability, partitioning, backpressure, consistency trade-offs. Typical prompts: design a dispatch system, surge pricing component, or real-time tracking pipeline.
   - **Behavioral / Scope Interview** (75 min, hiring manager): Leadership experience, ownership of complex initiatives, handling ambiguity, stakeholder influence, learning from failure. STAR format expected.
   - **Additional round** possible: architecture or domain-specific deep-dive.

### Known Behavioral Themes
Uber assesses cultural fit as seriously as technical skill. Core BQ themes:
- **Ownership and end-to-end drive**: "Did you just fix a bug, or own the project conception-to-launch?"
- **Handling ambiguity**: "Describe a time you took ownership of an ambiguous problem and made defensible decisions."
- **Influence without authority**: "Tell me about a time you influenced a decision without direct authority."
- **Conflict and collaboration**: "Tell me about a time you resolved a technical disagreement with a team member."
- **Cross-functional coordination**: "Describe working with non-responsive stakeholders or conflicting priorities."
- **Self-awareness and growth**: "How would your current manager describe your strengths and growth areas?"
- **Data-driven decision making**: Expect to quantify outcomes — latency, cost, adoption, velocity.

### Technical Expectations
- Strong Go or Java preferred; Python acceptable.
- Distributed systems fundamentals: consistency models, partitioning, replication, backpressure.
- Real-time systems design (Uber's core domain).
- Kubernetes/container orchestration awareness a plus given recent infra migration.
- ML infrastructure awareness valued given Uber's AI-first direction.

## ChengDe Experience Mapping

| Uber Values / Needs | ChengDe's Match |
|---------------------|-----------------|
| **Ownership & end-to-end delivery** | 2-year fast-track promotion to Senior SWE demonstrates ownership recognized by management; led micro-frontend architecture initiative independently |
| **Go Get It (bias for action)** | Agentic AI harness enabling vibe-coding — proactively built internal tooling that changed how the team works, not assigned |
| **AI-first engineering culture (84% agentic coders)** | Directly aligned: built and shipped an agentic AI harness; conducted GenAI seminars to upskill team — demonstrates both technical depth and multiplier behavior |
| **Innovation with IP** | 2 patents — rare at IC level, signals inventive contribution beyond execution |
| **Cross-team collaboration** | Cross-team collaboration award — concrete evidence of working across org boundaries, aligns with Uber's cross-functional coordination emphasis |
| **Academic excellence → talent density** | NTU 1st in class — Uber Singapore actively recruits from SG talent pool; strong signal for a data-driven hiring culture |
| **Scalable systems and platform thinking** | Micro-frontend architecture work demonstrates platform-level thinking, not just feature delivery |
| **Data-driven culture** | Able to quantify impact; promotion and award are outcome-based evidence |

## Customized Pitch Notes

### What to Emphasize in "Why Uber / Why Here"
- Uber is at an inflection point: infrastructure modernized (Kubernetes), AI deeply embedded in engineering workflow (uReview, Genie, GenAI Gateway), and now expanding into autonomous solutions — it is a platform company at global scale with genuine unsolved engineering problems.
- The Singapore APAC hub is unique: engineering decisions here influence 9 countries and 100+ cities, so even mid-scope projects have outsized regional impact.
- ChengDe's agentic AI harness work directly mirrors Uber's internal AI tooling investments (uReview, Genie) — frame this as "I have already been building in the direction Uber is investing."
- Mention Uber's engineering blog specifically — citing a recent post (e.g., Kubernetes migration or GenAI Gateway) demonstrates genuine technical research, not generic enthusiasm.

### What to Watch Out For
- **Uber exited SEA ride-hailing**: Do not frame Singapore as a rides market. The Singapore office is a regional operations and engineering hub — understand this distinction before the interview.
- **Quantify everything**: Uber's behavioral interviews are explicitly looking for metric-backed results. Stories without numbers will land poorly. Every STAR answer needs a "Result" with numbers.
- **Ownership vs. "we"**: Uber interviewers specifically watch for "I" vs. "we" language. Make sure stories credit ChengDe's individual contribution clearly.
- **System design depth**: For L5, expect multi-region, consistency trade-off, and backpressure questions. Uber's domain (real-time marketplace, pricing, location) is distinct — practice designing dispatch systems or surge pricing components, not generic CRUD apps.
- **Culture shift awareness**: Uber went through a major culture reset after the Travis Kalanick era. The current values (Customer Obsession, Stand for Safety, Do the Right Thing) are a deliberate departure from the old "hustle at all costs" culture. Frame stories with ethical judgment and responsible impact, not just speed.
- **Leveling**: L5 = Senior Software Engineer at Uber. Confirm target level with recruiter before the loop — system design expectations differ significantly between L4 and L5.
