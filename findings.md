# Findings

## Source
- Primary source: `/Users/chengde_lin/Downloads/Databricks_FDE_Hiring_Manager_Prep_v4_Bilingual.md`
- Existing app: `web/` (React + TypeScript + Vite)

## Product requirements inferred
- Fast question-to-question navigation during a live interview
- High scanability under time pressure
- Bilingual English/Traditional Chinese reference
- Search and category filtering
- Preserve source-derived content without inventing interview claims

## Source structure
- 1,372 lines, organized as 11 top-level areas and many drill-down sections.
- Two flagship narratives: xCraft/xDesign and Add-on Module Framework/xDS/xEmulator.
- Interview-ready English is consistently formatted as Markdown blockquotes.
- Chinese content is primarily coaching context, cautions, and architecture reminders.
- High-value quick references include About Me, Why Databricks/FDE, 90-second stories, failure stories, common follow-ups, and eight memorization lines.

## Interaction direction
- Parse the checked-in Markdown into navigable sections instead of duplicating answers in code.
- Provide three reading modes: bilingual, spoken English only, and Chinese notes only.
- Use URL hashes for deep-linkable sections, global search, focus filters, and J/K keyboard navigation.
- Add a purpose-built command-center overview for the highest-priority answers and story metrics.

## Validation
- Production build passes with Node 20.19.4.
- Local preview returned HTTP 200 at `/interview-prep-tutor/`.
- The machine's default Node 16 is too old for Vite 8, so `web/.nvmrc` pins the working version.

## Revision requested
- The first visual direction is too decorative for live interview use.
- The primary need is coverage tracking: visible keywords plus a clear indication of which talking points have already been delivered.
- New default should prioritize English spoken answers, larger type, plain contrast, and persistent per-section checkmarks.
- Screenshot confirmed substring matching incorrectly highlighted `led` inside `coupled`.
- Highlighting every matching word is visually tiring; two to three meaningful phrases per talking point is the desired density.
- Section 11 exposed a parser bug: non-quote blank lines were discarded, merging eight separate quote blocks into one talking point.

## Official interview hint supplied by user
- 60-minute online Hiring Manager interview with Ankur Khosla, Sr. Manager, FDE.
- Six evaluated areas: Builder Mindset; Data & AI Industry Expertise; Customer Advisor Skills; Execution & Driving Adoption/Consumption; Bias for Action; Team Fit.
- Explicit preparation asks: a 3-minute About Me, Why Databricks, a recent Impact Story, questions for the panel, and STAR framing.
- The final site should follow the likely conversation order rather than mirror the source-document chapter order.
- User wants fully hand-authored one-off pages. Reuse and abstraction are not goals.

## Proposed interview order
1. About Me
2. Why FDE
3. Why Databricks
4. Flagship story: xCraft → xDesign
5. Flagship story: Add-on Platform
6. Smaller backup stories
7. Six-focus-area coverage check
8. Questions for Ankur

## Revised experience
- Replaced the decorative dark dashboard with a plain white, high-contrast reading layout.
- English spoken mode is now the default whenever a section has a prepared script.
- Each spoken paragraph is a clickable talking point with per-question progress persisted in local storage.
- Semantic keyword colors: orange for personal actions, blue for architecture/concepts, green for outcomes, purple for metrics.

## Current review scope
- Simplify the final Why Databricks sentence.
- Review only the five backup stories: GenAI Seminars, GraphQL to xDS, Schema Automation, HAL to Add-on API, and Knowledge Assistant.
- Do not modify either three-minute major story while this review is in progress.
- Current backup cards are structurally complete but several lines sound written rather than spoken: `passing VP reviews`, `occasional breakthroughs`, `parsing and validation overhead`, `productionize it so the improvement compounds`, `runtime-loadable module`, `O(n) to O(1)`, and `challenged that success criterion` need simpler delivery or immediate explanation.
- The Knowledge Assistant source has a stronger missing action: the candidate aligned the PM lead, engineering lead, and leadership group around changing the workflow and thereby removed the false go-live blocker.
- GenAI Seminars needs a clearer cause-and-effect arc: people were reluctant to present; the candidate recruited and coached them, handled difficult VP rehearsals, defended the program's purpose, and produced both shipped ideas and a lasting AI habit.
- GraphQL to xDS should clearly admit the candidate did not challenge the initial choice, show the three attempted fixes, use bypassing validation as the turning point, then explain xDS in plain language.
- Schema Automation should say the work was self-initiated, explain the Python → JSON Schema → TypeScript path once, show the later handoff, and close on the 2–3 days to under 10 minutes result.
- HAL should avoid `O(n) to O(1)` as the main spoken result. The clearer result is one vendor-module update instead of patching a separate copy for every hospital; new hospitals can reuse existing integrations.
- Knowledge Assistant should focus on reframing a false go-live requirement into a better ticket-based knowledge workflow, then show stakeholder alignment and the visible feedback loop for PMs.
- Story order decision: keep xCraft / xDesign first because it is the most recent and direct proof of AI builder mindset. Its opening already establishes the add-on framework; one clearer sentence can make that dependency understandable without requiring the platform story first.
- Story 1 needs a stronger healthcare constraint: every required rule must be implemented, because missing one piece of logic can threaten patient safety. This directly motivates stability, completeness, and control over speed or creativity.

## Major-story Q&A request
- Add one page immediately after the two flagship stories and before all backup stories.
- Recover the difficult moments, trade-offs, failure cases, and likely follow-up answers that were intentionally left out of the three-minute narratives.
- Rewrite answers in clear spoken English rather than copying the source wording.
- xCraft / xDesign source preserves four strong difficulty answers: the wrong one-shot model for designers; UI/logic ownership boundaries added too late; agent-to-agent request volume being much larger than human requests; and visual-review cost still not fully solved.
- Add-on source preserves five direct follow-ups: why xDS had to come first; why Module Federation fit runtime composition; why not use iframes everywhere; what an Action contract means; and how pilots reduced risk before organization-wide migration.
- Organizational alignment is the main Add-on dilemma: leadership and PMs had to accept slower roadmap delivery in the short term. The candidate used working pilots so the decision became whether the migration was worth the cost, not whether the architecture could work.
- Requirement traceability catches silent omissions by mapping requirement tags into code and checking for missing tags; it proves coverage, not correctness, and the answer must say that boundary clearly.
- xDesign reliability also uses observable rendered output, explicit environment ownership between xDesign and xCraft, iteration limits, and human escalation when confidence is low or the agents do not converge.
- The new page can be inserted as a normal flagship GuidePage after Add-on Platform; existing navigation, progress tracking, search, and next/previous controls will include it automatically.

## Routing restoration
- The source files for other companies and stories were not deleted.
- Commit `540ceff` replaced the old root `App` and stylesheet with the Databricks-only guide, which hid the legacy navigation.
- Restore the original tutor at the root and keep the Databricks guide as an additional routed experience.
- Use hash routing for GitHub Pages compatibility: `#databricks` for the guide overview and `#databricks/<page-id>` for direct guide pages.

## Backup-story spoken openings
- All five backup stories currently begin with raw situation details before explaining why the story answers the question.
- Each needs a different one-sentence frame: influence without management authority; a failure that changed architecture judgment; a repeated problem that triggered initiative; an earlier design revisited after growth; and an adoption lesson from a promising tool that could not launch.
- Keep the existing facts, actions, results, and metrics; revise only the opening flow and immediate pronoun continuity.
