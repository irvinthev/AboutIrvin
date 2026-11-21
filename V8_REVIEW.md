# V8 Portfolio — Architecture and launch-candidate review

**Disposition: Ready with qualifications for owner review. Not deployed.** V7.3 remains published on GitHub Pages; no V8 changes have been pushed to the live repository.

## Design changes

- Reduced main navigation from eight internal destinations to five distinct pages: Home, Experience & Approach, Selected Work, My Journey, Writing & Beyond.
- Rebuilt Home as an executive introduction with a career snapshot, two featured projects, a single journey preview, and routes to professional philosophy and creative work.
- Moved the existing career timeline, leadership history, and interactive five-stage GRC model to Experience & Approach. Removed the separate generic “Curiosity with discipline” framework rather than reproducing it.
- Expanded Selected Work with two structured case studies: AI-enabled SDLC approval authority and Cost of Assurance. Each separates the problem, method, demonstrator, and limits on evidence. Preserved the Decision Engine and links to the live independent projects.
- Preserved the existing 19-milestone Journey explorer, filtering, and selected artwork, now with consistent five-page navigation.
- Grouped public writing, podcast appearances, and original art in Writing & Beyond, retaining the artwork lightbox.
- Centralized CSS and functionality in reusable local assets; kept all paths relative for project-level GitHub Pages deployment.

## Validation performed

- Inspected the existing V7.3 source and rebuilt from it; no replacement with unrelated templates.
- Parsed five new HTML files; validated local `href`/`src` file references and same-page anchors.
- Checked JavaScript syntax for each new script with Node.
- Rendered desktop (1440 px), tablet (768 px) and phone (390 px) DOM in Chromium using embedded local assets, and checked horizontal overflow and JavaScript exceptions.
- Exercised mobile menu, GRC step selection, Journey filtering and its 19 generated milestone nodes, Decision Engine automatic/conditional authority and outdated-revision failure, plus art lightbox open/close with Escape.
- Corrected an initial missing lightbox element; fixed reveal elements that appeared hidden during full-page capture; added a primary heading to the standalone journey page.
- Validated ZIP integrity.

## Remaining publication gates

1. **Owner review of factual and editorial content.** Reconfirm career chronology, professional claims and scope of actual leadership work; revise unresolved third-party Substack headlines. The Case Study descriptions are newly authored interpretations of existing public demos, not independently verified business results.
2. **External destinations.** Live check every third-party link and site cross-link after staging deployment. Relative paths have been checked locally, but GitHub Pages HTTP delivery has not.
3. **Accessibility and performance.** Automated checks here are a functional smoke test, not a WCAG audit or field-performance benchmark. Conduct keyboard/screen-reader review, target audits, and actual network-page load checks on a hosted staging version.
4. **Publication and canonical metadata.** The site has not been deployed. Configure canonical and social preview URLs after the final publication location is confirmed. Custom domain remains omitted.

## Rollback and release plan

Keep the existing `main` branch and GitHub Pages deployment untouched. Stage V8 on an isolated `v8-review` branch or a separate preview host; verify the hosted result and approve copy before promoting it to `main`.
