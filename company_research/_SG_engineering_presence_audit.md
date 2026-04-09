# Singapore Engineering Presence Audit

**Purpose:** Verify which target companies actually have real product software engineering teams in Singapore (building products, shipping code) vs. those that are primarily APAC sales / solutions / customer-facing hubs.

**Audit date:** 2026-04-02
**Benchmark:** Nvidia SG (almost entirely Solutions Architect / DevRel / Channel — NOT a product engineering office) was the false positive that triggered this audit.

**Criteria for "real product engineering":**
- Senior SWE / Staff SWE roles actively posted for Singapore
- Product teams based in SG (not just APAC support of products built elsewhere)
- Engineering blog posts / tech talks from SG-based engineers
- Job titles say "Software Engineer" building product features, not "Solutions Architect" / "Forward Deployed" / "Partner Engineer" / "Customer Engineer"

---

## Summary Table

| Company | SG has real SWE team? | What engineering happens there | Red flag | Notes |
|---|---|---|---|---|
| **Airwallex** | Yes | Payments backend, infra, platform | Green | Already verified. SG is a major engineering hub. |
| **OKX** | Yes | Exchange backend, trading infra | Green | Already verified. SG is HQ-level engineering. |
| **Grab** | Yes | Backend, mobile, ML, platform, fintech, maps | Green | SG is global HQ. 350+ open jobs, active engineering blog from SG engineers. Levels G3-G6 SWE ladder published. Safest bet on the list. |
| **Microsoft** | Partial | Cloud/Azure ops, some product, mostly APAC sales/consulting | Yellow | SG is APAC HQ but engineering is thin. ~30-37 open roles total and most are sales/consulting/data center ops. Some SWE roles exist but not a major product hub. Engineering builds happen mostly in Redmond/India. |
| **Databricks** | Yes (niche) | ML/AI OSS ecosystem, fullstack on AI platform | Green | Confirmed SWE-Fullstack and SWE-ML OSS roles explicitly "Singapore". Small team but real product work on MLflow/agent frameworks. |
| **Visa** | Yes | Java backend, GenAI innovation, AIOps, payment infra | Green | 216 SWE roles in SG per LinkedIn. Visa has a real engineering hub in SG including Staff SWE GenAI. Not just sales. |
| **Mastercard** | Yes | Payments infra, fraud detection, Foundry R&D | Green | Active Launch Graduate Program 2026 for SWE in SG, Senior SWE (Full Stack) postings. Real product engineering. |
| **ByteDance / TikTok** | Yes | Ads infra, AI platform, media platform, recommender | Green | SG is a flagship engineering hub. TikTok global HQ is effectively SG. Multiple SWE Graduate 2026 roles (Ads Infra, Media Platform, AI Platform). Massive SWE presence. |
| **Amazon / AWS** | Partial-Yes | Mix: some AWS SWE, lots of data center ops, DevRel, sales | Yellow | 56+ SWE roles on LinkedIn but many are infra/ops/DevRel-adjacent ("Head of Developer Relations APJ", "DC Engineering Ops", "Controls Engineer"). Real SWE exists but the SG office is not primarily a product build center — core product SWE is in Seattle/Dublin/Vancouver. Levels.fyi shows L4-L7 SG compensation, so some real SWEs do exist. |
| **Stripe** | Yes | Payments product, infra | Green | Confirmed SG hub with SWE L1-L3, New Grad program, intern program. Levels.fyi data exists. Real product engineering office. |
| **Uber** | **No** | Closed APAC HQ in SG (2020) | **Red** | **REMOVE.** Uber closed its Singapore office in May 2020 as part of COVID cost-cutting, moving APAC HQ elsewhere. LinkedIn shows ~35 SG jobs but they are ops/policy/operations roles, not engineering. No active SWE hiring in SG. |
| **Palantir** | Partial | Forward Deployed SWE (FDSE) only | Yellow | Palantir SG is primarily FDSE ("Deltas") — customer-embedded engineers configuring Foundry/Gotham for single clients. Platform/product SWE ("Devs") are in Palo Alto, NYC, London, DC. FDSE is technical (real coding) but is client-facing customization, not building the core product. OK if candidate accepts customer-embedded role; not OK if he wants to build product platforms. |
| **Google** | Yes | Google Pay (India consumer), YouTube Ads, Ads, platform infra | Green | Confirmed Senior SWE Google Pay in SG building India consumer app features. Also Ads, YouTube Ads ML, App Ads. SG is a real product engineering office, though heavily oriented toward India-market products. 164 SWE openings on LinkedIn. |
| **Meta** | Yes | Meta Store web (Quest / Portal), React infra, consumer product | Green | SG office built the Meta Store website for Quest/Portal. Confirmed "Software Engineer, Product" postings on metacareers. Web infra + React work. Real product engineering. |
| **Apple** | Yes | Camera firmware, video/image algorithms, IS&T backend, SRE, Edge Services, Neural Engine compiler | Green | 35+ Apple SWE jobs in SG. Includes Lead Compiler Engineer (Neural Engine), Camera Firmware, Video Engineering Camera Algorithms, Edge Services SWE, Data Solutions SWE, Online Store SWE. This is deep product engineering — closer to Apple Cupertino style than APAC sales. Very strong SG engineering presence. |
| **Netflix** | **No (for product SWE)** | Partner Engineering only | **Red** | SG role is "Senior Software Engineer, Partner Engineering - SPL APAC". Partner engineering = technical bridge to CE/operator device integrations. The role description explicitly says "not a traditional coding-heavy role". Core product engineering is Los Gatos. **This is the Nvidia-equivalent red flag.** SG Netflix is APAC partner/device integration, not product build. |
| **Coinbase** | Yes (remote-hybrid) | Trading (IntX), Consumer Foundations backend, Platform, Frontend | Green | Multiple Senior/Staff SWE roles confirmed "Remote - Singapore" or "Hybrid - Singapore": Staff SWE Trading (IntX product), Senior SWE Backend Consumer Foundations, Senior SWE Backend Platform, SWE Frontend. Real product engineering. Levels.fyi IC3-IC5 data in SG. |
| **OpenAI** | **Partial / No (for product SWE)** | Forward Deployed SWE, AI Deployment Engineering | **Red-Yellow** | OpenAI SG opened Oct 2024 as APAC hub. But the SG engineering roles posted are "Forward Deployed Software Engineer" and "Forward Deployed Engineer" + "Manager, AI Deployment Engineering Southeast Asia". These are customer-embedded roles building custom solutions on top of OpenAI APIs for enterprise clients — NOT core model/product engineering (which is SF). Similar to Palantir FDSE. Not a core product build office. |

---

## Recommendations

### REMOVE from target list (zero or near-zero product SWE)

1. **Uber** — Closed SG office in 2020. No active engineering hiring. Don't waste prep time.
2. **Netflix** — SG is Partner Engineering only (device integrations, not core product). The one confirmed Senior SWE role is explicitly "not a traditional coding-heavy role". Same category as Nvidia: looks good on paper, not a build hub.

### DOWNGRADE in priority (limited SWE or customer-facing SWE only)

3. **OpenAI** — SG office is Forward Deployed / AI Deployment Engineering only. Core model + product SWE stays in SF. If candidate wants to build AI products (not customize APIs for enterprise customers), deprioritize. Keep only if he's open to customer-embedded work.
4. **Palantir** — SG is FDSE-only ("Deltas"). FDSE is real technical work with heavy coding, BUT the output is customer-specific Foundry/Gotham configurations, not core platform. Core "Dev" SWE roles are in Palo Alto/NYC/London/DC. Downgrade unless candidate specifically wants FDSE.
5. **Microsoft** — SG office is APAC HQ but engineering is thin (~30 open roles, mostly sales/consulting/data center ops). Some SWE roles exist but SG is not a major product build hub. Core product engineering is Redmond / Hyderabad / Dublin. Downgrade to opportunistic.
6. **Amazon / AWS** — Mix. Real SWE roles exist in SG (Levels.fyi L4-L7 data confirms) but many postings are DevRel / DC ops / Controls / QA. Core AWS product SWE is Seattle / Dublin / Vancouver. Downgrade to "apply if specific team is SG-based, not generic SG applications."

### CONFIRMED SOLID SG engineering targets (keep or upgrade)

1. **Grab** (tier 1) — global HQ, deepest SG engineering, strongest fit
2. **ByteDance / TikTok** (tier 1) — SG is effectively global HQ, massive SWE hiring
3. **Stripe** (tier 1) — real product hub, SWE L1-L3 confirmed
4. **Apple** (tier 1) — surprisingly deep: Neural Engine compiler, camera firmware, video algos, IS&T. Real Cupertino-style product work.
5. **Google** (tier 1) — real product SWE (Google Pay India consumer, YouTube Ads, Ads, platform)
6. **Meta** (tier 1) — owns Meta Store web product end-to-end from SG
7. **Coinbase** (tier 2) — confirmed Senior/Staff SWE on IntX trading + Consumer Foundations
8. **Mastercard** (tier 2) — Launch Grad Program 2026 + Senior SWE Full Stack postings
9. **Visa** (tier 2) — Staff SWE GenAI, Java backend, real hub
10. **Databricks** (tier 2, niche) — small but real SWE team on ML OSS / agent frameworks
11. **Airwallex** (tier 1, already verified)
12. **OKX** (tier 1, already verified)

---

## Action for candidate (2-week prep window)

**Tier 1 — spend the most prep time here (10 companies):**
Grab, ByteDance/TikTok, Stripe, Apple, Google, Meta, Airwallex, OKX, Coinbase, Mastercard

**Tier 2 — opportunistic / lighter prep (3 companies):**
Visa, Databricks, Microsoft

**Remove from list:**
Uber, Netflix

**Reconsider before investing prep time:**
Palantir (FDSE-only), OpenAI (FDSE-only), Amazon (mixed signal)

---

## Caveats

- Job market snapshots drift week-to-week. Re-verify any company before applying by checking their careers page filtered to Singapore + "Software Engineer".
- "Partial" companies (Amazon, Microsoft) can still be fine IF a specific SG-based team is identified. Avoid generic "apply to Singapore" applications at these.
- OpenAI SG is new (opened Oct 2024). Presence may grow; re-verify in 6 months.
- Stripe requires 50%+ in-office per month — confirm candidate is OK with hybrid before committing prep.
- Google SG prioritizes candidates with existing SG right-to-work; sponsorship is harder. Verify candidate's visa status.
