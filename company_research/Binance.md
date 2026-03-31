# Binance — Singapore Deep Dive Research

> **Last updated:** 2026-03-27
> **Research focus:** Company reputation & salary (user priorities)

---

## 1. Company Reputation — The Full Picture

### Regulatory History (Critical Context)

- **Nov 2023**: Binance pleaded guilty to violating U.S. anti-money-laundering laws and sanctions. Agreed to pay **$4.3 billion** in fines (DOJ + CFTC combined). Founder Changpeng "CZ" Zhao resigned as CEO, pleaded guilty to a criminal charge, paid a $50M personal fine, and served 4 months in prison.
- **Oct 2025**: Trump **pardoned CZ**, sparking major controversy. The pardon drew accusations of corruption from lawmakers due to Binance's ties to World Liberty Financial (a crypto company founded by Trump's family) and a $2B investment from Abu Dhabi sovereign fund MGX into Binance.
- **May 2025**: SEC formally **dropped its civil lawsuit** against Binance with prejudice (cannot refile). This clears major U.S. legal overhang.
- **Nov 2025**: Families of Oct 7 Hamas attack victims **sued Binance**, alleging the platform knowingly helped transfer hundreds of millions to support terrorist activities.
- **Singapore MAS**: Binance is on MAS's **Investor Alert List** since 2021. It withdrew its retail licence application and currently only serves institutional/OTC clients in Singapore. It does **NOT** have an MPI licence (unlike Coinbase and OKX which both do). Binance's custodial arm Ceffu plans to apply for a custody licence when applications open.

### Resume Impact — Would "Binance" Help or Hurt?

**Positive factors:**
- Binance is the **world's largest crypto exchange by volume** — name recognition is universal in tech/fintech
- Blockchain/crypto experience is increasingly valued; LinkedIn listed blockchain as a top hard skill surpassing AI
- Traditional financial institutions (banks, payment networks) now actively seek candidates with crypto exchange experience
- Post-SEC-dismissal, the legal cloud has partially cleared
- If you're staying in crypto/Web3, Binance on your resume is top-tier

**Negative factors:**
- The $4.3B criminal settlement and CZ's guilty plea create a reputational stain that hasn't fully faded
- The CZ-Trump pardon controversy adds political baggage
- The Hamas terrorism financing lawsuit (ongoing) keeps Binance in negative headlines
- Conservative employers (banks, government, regulated fintech) may view Binance association with caution
- Some hiring managers in traditional tech may associate Binance with the "crypto casino" narrative

**Bottom line:** Within crypto/Web3, Binance is the most prestigious employer. Outside crypto, it's a mixed signal — the technical challenges are recognized, but the compliance/legal history creates a risk-premium on your personal brand. For Singapore specifically, Binance's lack of MAS licence (compared to Coinbase/OKX) is a notable gap.

### Glassdoor & Blind Employee Ratings

| Metric | Rating |
|--------|--------|
| Overall (1,186 reviews) | 4.0 / 5.0 |
| Software Engineer specific (62 reviews) | **3.5 / 5.0** |
| Work-Life Balance (engineers) | **3.2 / 5.0** |
| Compensation & Benefits | 4.1 / 5.0 |
| Culture & Values | 3.3-3.9 / 5.0 (varies) |
| Career Opportunities | 3.5 / 5.0 |
| Would recommend to a friend (engineers) | 68% |

---

## 2. Salary & Compensation (Singapore)

### Levels.fyi Data (Updated March 2026)

Binance uses a numeric leveling system:

| Level | Approx Equivalent | Monthly TC (SGD) | Annual TC (SGD) | Base (mo) | Stock (mo) | Bonus (mo) |
|-------|-------------------|------------------|-----------------|-----------|------------|------------|
| 1.1 | Entry Level / Junior | 7.5K | ~90K | 7.5K | 0 | 0 |
| 1.2 | Mid-Junior | 9K | ~108K | 8.3K | 0 | 1.2K |
| 2.1 | Mid-Level | 10K | ~120K | 9K | ~100 | ~988 |
| 2.2 | Senior-ish | 9K | ~108K | 7.7K | ~671 | ~620 |
| **3.1** | **Senior SWE** | **~15K** | **~180K** | **~10K** | **~773** | **~1K** |
| **3.3** | **Staff-ish / Lead** | **~25K** | **~306K** | **~16K** | **-** | **~3.4K** |

- **Median annual TC in Singapore**: SGD 170,807 (~USD 128K)
- **Highest reported**: SGD 303,572 (~USD 228K)
- **Senior SWE (Level 3.1)**: ~SGD 180K/yr total (base ~117K + stock ~9.3K + bonus ~12K)

### Equity / Token Vesting

- **4-year vesting schedule**: 25% per year (Year 1 cliff, then monthly vesting Years 2-4 at 2.08%/month)
- Stock/equity component is relatively **small** compared to FAANG — the bulk of comp is base + bonus
- Unclear whether equity is in BNB tokens, traditional RSUs, or phantom equity — Binance is private and does not publicly disclose this

### Bonus Structure Concerns

- Bonus criteria reportedly **lack transparency**; not guaranteed even when targets are met
- Employees report promises of large bonuses "get strategically cut down every quarter even when the company does well"
- Binance historically issued a 30-month bonus at its peak, but recent reviews suggest this is no longer reliable
- "Bottoming out" process every ~6 months — a forced-ranking/PIP mechanism to cut underperformers (or so they claim)

### Comparison: Binance vs Coinbase vs OKX (Singapore, Senior SWE)

| Company | Senior SWE Annual TC (SGD) | MAS Licensed? | Stock Liquid? |
|---------|---------------------------|---------------|---------------|
| **Binance (3.1)** | ~180K | No (Alert List) | No (private) |
| **Coinbase (IC4)** | ~210K | Yes (MPI) | Yes (COIN, NASDAQ) |
| **OKX (P5)** | ~172K | Yes (MPI) | No (private) |

Coinbase leads on **total comp + liquidity** in Singapore. OKX is comparable to Binance on TC but has the regulatory advantage. Binance's higher-level 3.3 (~306K) competes with Coinbase IC5 (~353K), but Coinbase stock is publicly traded and liquid.

---

## 3. Engineering Roles & Tech Stack

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| Trading engine / Backend | C++, Java (primary backend language for most roles) |
| ML / Data Science | Python |
| Frontend | TypeScript, React (based on job listings and Wappalyzer) |
| Connectors / APIs | Java, Python (open-source binance-connector-java, binance-connector-python) |
| Infrastructure | Microservices, likely Kubernetes-based |
| AI/LLM tools | LangChain, LangGraph, RAG pipelines |

### Current Singapore Roles (March 2026)

- **Senior Java Software Engineer** — Singapore (confirmed active listing)
- **Senior AI Engineer — Engineering Productivity** — Singapore/Remote (confirmed active)
- Multiple **Accelerator Programme** positions (junior/intern-level) for AI/LLM roles

### Specific Role Types Available

Based on job listings reviewed:
- Backend engineering (Java-heavy)
- AI/ML engineering with LLM focus
- Data Science (LLM specialization)
- Compliance technology
- There **are** TypeScript/Python roles, but Java dominates the backend SWE postings

---

## 4. AI / Agentic Roles — Match with Your Profile

**This is a strong match.** Binance is actively building AI capabilities and hiring for roles that align directly with MCP/LangGraph/RAG experience:

### Senior AI Engineer — Engineering Productivity (Singapore/Remote)
- Requirements: 5+ years SWE + 2+ years AI/ML engineering
- Hands-on experience with LLMs: prompt engineering, RAG, fine-tuning (SFT/RLHF)
- **AI Agent frameworks: LangChain, LangGraph, CrewAI** (exact match)
- Designing and building AI-powered developer tools
- Developing LLM-based applications (RAG, AI Agents, code understanding)
- Building AI-assisted CI/CD pipelines

### Data Scientist (LLM) — Senior
- Design AI agent workflows using **LangChain or LangGraph** (exact match)
- Build benchmark datasets for AI evaluation
- 3-5 years developing ML models at scale
- Explore new downstream products with AI agent technologies

### Accelerator Programme — AI/LLM (Junior Level)
- LangChain, LangGraph, LlamaIndex orchestration frameworks
- RAG, vector databases, evaluation of agent systems
- These are more junior but indicate the team is growing

**Key insight**: Binance's AI team is still relatively new/growing, which means joining early could mean high impact and rapid career growth within the org. The AI Engineering Productivity team builds internal tools — this could be interesting but may be less externally visible than product-facing AI work.

---

## 5. Work Culture — What Engineers Actually Say

### The Good
- Fully remote or hybrid flexibility (many SG roles listed as remote)
- Decent compensation (rated 4.1/5)
- Fast-paced environment with lots of exposure to different tech stacks
- "Excellent place for rapid growth" if you want breadth
- Interesting technical challenges at massive scale (Binance handles more crypto volume than any other exchange)

### The Bad
- **"Hardcore" culture is official DNA** — not just a buzzword. Extended hours, nights, weekends, and holidays are not unusual
- **Chinese language advantage**: Main internal documentation is in Chinese. "Super Chinese speaker privilege" with few non-Chinese-speaking leaders. This is a major concern for non-Mandarin speakers
- **"Bottoming out" every ~6 months**: Forced ranking/culling process. Employees report people selected for termination with unclear criteria, even performers
- **Toxic dynamics reported**: "Tremendously rude" people, "leaders constantly lying," peer pressure from Chinese colleagues, backstabbing
- **Siloed work**: Engineers report working in isolation with minimal career growth trajectory
- **Unpredictable job security**: Layoffs, bonus cuts, and the bottoming-out process create constant uncertainty

### Work Hours Reality
- "If you value work-life balance or boundaries between work and personal time, you'll be unhappy at Binance"
- "Being in the Global team means being on call almost any time"
- "Work hours can vary from day to day — some days I end at 6PM, other days I end as late as 1AM"
- Work-life balance rated **3.2/5** by engineers — significantly below average

---

## 6. Current Company Status & Trajectory

### Headcount & Hiring
- **~5,300 employees** as of early 2025
- Post-settlement, Binance shifted hiring focus heavily toward **compliance** (+34% compliance headcount, 20% of new hires in compliance)
- Engineering hiring is **selective, not frozen** — active postings exist but at reduced volume compared to 2021-2022 peak
- The AI/LLM team is actively growing (multiple open positions)

### Layoff History
- 2023: 1,000-3,000 layoffs during DOJ settlement period
- Regular "bottoming out" culls every ~6 months (ongoing)
- Late 2025: reports of colleagues being laid off with no clear explanation

### Leadership
- **CEO**: Richard Teng (replaced CZ after Nov 2023 settlement)
- CZ is pardoned but "forbidden to have any involvement in the company" (per DOJ settlement terms, though the pardon may alter this)
- CZ remains influential in crypto circles and publicly active on social media

### Strategic Direction
- Pursuing licence expansion across APAC (Thailand MOU signed, Singapore custody licence planned)
- Building out AI/ML capabilities internally
- Compliance-first era under Richard Teng
- Post-SEC-dismissal, the legal landscape is significantly improved

---

## 7. Binance vs Coinbase vs OKX — Summary Comparison for SG Engineers

| Factor | Binance | Coinbase | OKX |
|--------|---------|----------|-----|
| **Senior SWE TC (SGD/yr)** | ~180K | ~210K | ~172K |
| **MAS Licensed** | No (Alert List) | Yes (MPI) | Yes (MPI) |
| **Stock Liquidity** | Private/illiquid | Public (COIN) | Private/illiquid |
| **Resume Brand** | Strongest in crypto; controversial outside | Strong everywhere; SEC-clean | Growing; Asia-focused |
| **Work-Life Balance** | Poor (3.2/5) | Better (~3.8/5) | Mixed (Chinese tech DNA) |
| **Language Barrier** | Chinese documentation, Mandarin advantage | English-first | Chinese tech culture, but more international in SG |
| **AI/LLM Roles** | Active hiring (LangGraph, RAG) | Some positions | Limited visibility |
| **Job Security** | Low (bottoming out every 6mo) | Moderate (layoffs happened but more stable) | Moderate |
| **SG Office Maturity** | Institutional/OTC only, no retail licence | Full engineering hub with EDB partnership | Full MPI licence, integrated with local payments |

---

## Risk Assessment Summary

### HIGH RISK factors:
1. **Job security** — "bottoming out" process creates perpetual uncertainty
2. **Chinese language barrier** — documented advantage for Mandarin speakers
3. **Work-life balance** — rated 3.2/5, "hardcore" culture is the official stance
4. **Regulatory limbo in SG** — still on MAS Alert List, no retail licence
5. **Bonus unpredictability** — promises not always honored

### MODERATE RISK factors:
1. **Resume perception** — mixed outside of crypto, though improving post-SEC-dismissal
2. **Ongoing litigation** — Hamas victims lawsuit, potential future regulatory actions
3. **Private equity** — illiquid, unclear token/equity compensation mechanism

### POSITIVE factors:
1. **AI/LLM roles are a strong match** for your MCP/LangGraph/RAG experience
2. **Compensation is competitive** within crypto (though Coinbase pays more in SG)
3. **Technical challenges at scale** — unmatched volume in crypto
4. **Brand recognition** — universally known in tech
5. **Post-settlement clean slate** — SEC case dismissed, DOJ settlement complete

---

## Verdict

For someone who cares most about **salary** and **reputation**:

- **Salary**: Binance pays ~SGD 180K for Senior SWE — decent but not top-tier. Coinbase pays ~15% more with liquid stock. The real comp upside at Binance would come from Level 3.3+ (~SGD 306K) but getting there is uncertain given the "bottoming out" culture.

- **Reputation**: This is the complicated part. Within crypto/Web3, Binance is the #1 brand. But the $4.3B criminal settlement, CZ's conviction (even though pardoned), the Trump pardon controversy, and the Hamas lawsuit create a stigma that may follow you in traditional tech/fintech. If your next move after Binance is another crypto company, it's fine. If you might want to go to a bank, government, or FAANG, it could be a harder conversation.

**Recommendation**: If you're committed to the crypto/Web3 career path, Binance's AI team is an interesting opportunity. If you want optionality to move between crypto and traditional tech, **Coinbase offers better salary, better reputation, better regulatory standing in Singapore, and liquid stock** — making it the safer bet on both of your priority dimensions.

---

## Sources

- [Glassdoor — Binance Reviews (1,186)](https://www.glassdoor.com/Reviews/Binance-Reviews-E1816824.htm)
- [Glassdoor — Binance Software Engineer Reviews](https://www.glassdoor.com/Reviews/Binance-Software-Engineer-Reviews-EI_IE1816824.0,7_KO8,25.htm)
- [Levels.fyi — Binance SWE Salaries in Singapore](https://www.levels.fyi/companies/binance/salaries/software-engineer/locations/singapore)
- [Levels.fyi — Coinbase SWE Salaries in Singapore](https://www.levels.fyi/companies/coinbase/salaries/software-engineer/locations/singapore)
- [Levels.fyi — OKX SWE Salaries in Singapore](https://www.levels.fyi/companies/okx/salaries/software-engineer/locations/singapore)
- [Blind — Binance Reviews](https://www.teamblind.com/company/Binance/reviews)
- [Blind — OKX and Binance Singapore Pay/Culture Discussion](https://www.teamblind.com/post/How-is-the-pay-and-culture-in-okx-and-binance-Singapore-iEX8UGN8)
- [CNBC — Binance Has Matured Past Cultural Issues (CEO)](https://www.cnbc.com/2024/04/09/binance-has-matured-past-cultural-issues-ceo-says-after-4point3-billion-us-doj-settlement.html)
- [CNBC — SEC Drops Binance Lawsuit](https://www.cnbc.com/2025/05/29/sec-drops-binance-lawsuit-ending-one-of-last-remaining-crypto-actions.html)
- [CNBC — CZ Pardon and Trump Business Relationship](https://www.cnbc.com/2026/01/23/pardon-binance-founder-cz-trump.html)
- [CNBC — Binance Sued by Hamas Victims](https://www.cnbc.com/2025/11/25/binance-trump-crypto-lawsuit-pardon.html)
- [NPR — Trump Pardons Binance Founder](https://www.npr.org/2025/10/24/nx-s1-5583983/trump-pardons-jailed-binance-founder-who-supported-trump-family-crypto-business)
- [CoinLaw — How Many People Work at Binance 2025](https://coinlaw.io/how-many-people-work-at-binance/)
- [Binance Careers — Lever Job Board](https://jobs.lever.co/binance)
- [RemoteRocketship — Senior AI Engineer at Binance](https://www.remoterocketship.com/company/binance/jobs/senior-ai-engineer-engineering-productivity-singapore-remote/)
- [Binance Square — Layoffs and Bonus Discussion](https://www.binance.com/en/square/post/14718100450713)
- [Tron Weekly — Binance 2026 APAC Licence Expansion](https://www.tronweekly.com/binances-bold-2026-license-apac-expansion-plan/)
- [NodeFlair — Binance SWE Salaries Singapore](https://nodeflair.com/companies/binance/salaries/software_engineer/Singapore)
- [Stackshare — Binance Tech Stack](https://stackshare.io/companies/binance)
