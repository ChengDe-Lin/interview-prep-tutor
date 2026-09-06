# Databricks FDE interview site plan

## Goal
Turn `Databricks_FDE_Hiring_Manager_Prep_v4_Bilingual.md` into a fast, readable interview companion inside the existing repo.

## Phases
- [complete] 1. Inspect the source document and current web app
- [complete] 2. Define the content model and interaction design
- [complete] 3. Implement the Databricks interview experience
- [complete] 4. Build and verify core navigation and responsive behavior
- [complete] 5. Prepare the final handoff
- [complete] 6. Simplify the live interview reading experience
- [complete] 7. Add keyword highlighting and spoken-point tracking
- [complete] 8. Rebuild and refresh the running local site
- [complete] 9. Replace single-word tagging with capped semantic phrase highlights
- [complete] 10. Hand-annotate spoken answers and repair quote-block segmentation
- [complete] 11. Rebuild information architecture around the official interview flow
- [complete] 12. Author each interview page with its own ordered talking points and manual highlights
- [complete] 13. Validate and refresh the running local site
- [complete] 14. Expand About Me into a complete three-minute opening
- [complete] 15. Review all five backup stories against the source for narrative flow and spoken-English simplicity
- [complete] 16. Rewrite awkward backup-story wording and simplify the Why Databricks closing
- [complete] 17. Strengthen the Story 1 healthcare-safety motivation while keeping it first
- [complete] 18. Verify all requested changes
- [complete] 19. Re-read the major-story failure and follow-up sections from the source
- [complete] 20. Add one Major Story Q&A page after the two flagship stories
- [complete] 21. Validate navigation, wording, and production build
- [complete] 22. Restore the legacy multi-company tutor as the root experience
- [complete] 23. Move the Databricks FDE guide behind a dedicated hash route
- [complete] 24. Build and browser-test legacy and Databricks navigation
- [complete] 25. Publish and verify the restored combined site
- [complete] 26. Re-read all five backup stories as spoken narratives
- [in_progress] 27. Rewrite each opening and any abrupt transition in simple English
- [pending] 28. Build, publish, and verify the backup-story revision

## Decisions
- Reuse the existing `web/` Vite app and its package manager.
- Optimize for live interview use: dense but calm, searchable, keyboard-friendly, bilingual.
- Keep extracted source material in the repo so it remains editable and auditable.
- Prefer a plain light reading surface over decorative branding.
- Treat each spoken-answer paragraph as a trackable talking point and persist progress locally.
- Cap highlights at three non-overlapping semantic phrases per talking point.
- Do not infer highlights at runtime; use only reviewed, exact phrases tied to a specific talking point.
- Use a custom one-time interview guide instead of rendering the source Markdown hierarchy.
- Keep xCraft / xDesign as Story 1 because it is the strongest recent AI story; make its add-on-platform context self-contained instead of changing the order.
- Change only the healthcare-safety motivation inside Story 1; leave the rest of both major stories unchanged.
- Prefer short, direct vocabulary that is comfortable for a non-native English speaker.
- Keep the three-minute stories focused; move detailed failures, dilemmas, and likely follow-ups to a separate Q&A page.
- Preserve the original multi-company tutor at the root route; expose the new guide at `#databricks` and its pages at `#databricks/<page-id>`.
- Give every backup story a tailored spoken opening that answers the likely interview question before entering background details.

## Errors Encountered
| Error | Attempt | Resolution |
|---|---:|---|
| `apply_patch` rejected delete+add of the same file in one patch | 1 | Split data creation and App replacement into separate patches. |
| Combined CSS/HTML patch missed an exact HTML font-link line | 1 | Applied the stylesheet and metadata edits separately. |
| Default Node 16 cannot run Vite 8 | 1 | Use the installed Node 20.19.4 toolchain for build and preview. |
| Validation command ran `npm` from the repo root, which has no package.json | 1 | Re-ran from `web/`; build and diff checks passed. |
| One patch attempted to delete and add `App.tsx` together | 1 | Split replacement into separate delete and add patches. |

## Latest verification
- The production build passes after the backup-story rewrite.
- Story 1 remains first; only its healthcare-safety motivation card changed in this review.
- Story 2 was not changed in this review.
- The new Major Story Q&A page appears after Story 2 and before the backup-story bank, and the production build passes.
- The public root once again shows the original Companies and Stories navigation.
- The public Databricks overview works at `#databricks`, and direct pages work at `#databricks/<page-id>`.
