# Irvin Thevaranjan — Portfolio V7.3 launch candidate

## Scope

Static HTML/CSS/JS site, interactive journey, decision simulator, GRC philosophy, original art gallery, résumé PDF. Runs on GitHub Pages or any static host; no build step, API, analytics, tracking or Vercel dependency.

## Preview

Serve the folder using `python3 -m http.server 8000`, then open `http://localhost:8000/`. Do **not** open a detached `index.html` without its `assets` folder. The previous V6.1 issue resulted from missing companion assets.

## GitHub Pages deployment (not yet performed)

1. Create a dedicated public GitHub repository for the professional portfolio, after reviewing all copy and assets.
2. Upload these files at the repository root, including `assets/`, `.nojekyll`, `index.html`, `journey.html`, `robots.txt`, and the PDF.
3. Enable Pages for the repository's chosen branch and root path.
4. Confirm published links, social previews, navigation, mobile interaction, and performance at the final URL.
5. Configure any custom domain **after** deciding which domain fits your professional identity. Add a final absolute canonical URL, sitemap, and `og:image` then.

## Public-content boundaries

- All illustrations used in personal milestones are artwork, not photographs of the events.
- Decision Engine and AI-SDLC examples are illustrative, not employer production systems.
- Financial outcomes are not presented as verified savings.
- Source evidence highlights unresolved Capital One chronology and KPMG title timing; detailed dates remain absent.
- This site intentionally excludes email and phone number. PDF has LinkedIn and public-project references.

## QA

See `LAUNCH_REVIEW.md` for current tested results and remaining launch blockers. All changes are local only; no publication or repository mutation.