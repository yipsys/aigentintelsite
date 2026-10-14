# AigentIntel — Open-source project website

The static, open-source website for **AigentIntel**, a local terminal dashboard for understanding AI coding-agent usage.

**Created by yipsys / sornin.** Find the creator on GitHub: [@yipsys](https://github.com/yipsys).

This repository contains the website for the tool. It is not the terminal application, a hosted usage dashboard, or a service that processes visitors' coding-agent logs. The tool is developed and shared on GitHub; its official repository and release links should be added to the website when supplied.

## Hosting and backend

**This is a static website. It has no application backend.**

- No custom production server, database, backend asset service, or storage bucket is used.
- GitHub Pages serves the HTML, CSS, JavaScript, and bundled images directly from this repository.
- The bundled dashboard screenshot is a static image in `assets/`.
- The creator's profile photo is loaded directly from GitHub over HTTPS.
- The terminal tool runs separately on the user's own computer. GitHub Pages does not run the tool or host its usage logs.

Website assets are still hosted as static files: "no backend" does not mean that the images or website files have no host. There is no separate backend storing or processing application data or assets.

## About the tool

AigentIntel helps developers understand how many tokens their AI coding tools use, which projects consume the most, and what that usage would cost at API rates. The local terminal application requires **Node.js 20 or newer**.

It reads existing Codex and Claude Code usage logs and supports generic JSONL imports. It extracts timestamps, model names, project paths, session identifiers, and token counts, then groups them into reports. The live dashboard rescans logs every five seconds by default; usage appears after the coding tool writes it to disk.

Tool features include:

- A colored terminal dashboard with gradient usage bars.
- Today, 7-day, 30-day, month-to-date, six-month, and all-time views.
- Breakdowns by day, project, model, source, and session.
- Estimated API-equivalent costs in USD and estimated cache-read savings.
- Recorded fast/priority pricing where supported.
- Comparisons with the preceding equal-length period and budget progress indicators.
- Locally saved preferences, JSON exports, and diagnostic reports.
- A Windows double-click launcher.

The tool has been tested on Windows. macOS and Linux have not been independently verified.

## Website features

- Dark terminal-inspired styling and monospace typography.
- Product features, installation instructions, privacy information, and pricing limitations.
- A connected diagram explaining how local logs become reports.
- An expandable dashboard screenshot and an illustrative terminal preview.
- A creator banner crediting yipsys / sornin through this README and linking to the yipsys GitHub profile.
- Green, red, and blue logo trails, depth layers, gentle pointer repulsion, temporary network connections, and traveling light pulses.
- Atmospheric background glow, faint scanlines, panel hover glows, and section reveals.
- A pause/resume control and support for reduced-motion preferences.
- A copy button for the terminal launch command.
- Browser-local click counters; GitHub clicks are tracked and downloads are currently disabled.

## Downloads and GitHub links

The **Download AigentIntel** buttons are disabled and have no destination. They do not open a page, start a download, or increment the download counter. The tool is not currently offered for public download through this website, and the site makes no promise of a free download.

The download buttons display **LIMITED · Returning soon**. This website package does not include the terminal tool's release ZIP.

**View on GitHub** opens the creator's profile at <https://github.com/yipsys>. The creator banner links to the same profile; neither link claims to be the tool's repository.

When a release is ready, add its official URL and enable the download buttons in `index.html`. Update `script.js` if download click tracking is needed.

## Click counters

The displayed counters count button clicks in the current browser only. They are stored in `localStorage`, alongside the visitor's animation preference.

They are **not** shared website-wide statistics, unique visitor counts, completed download counts, or verified GitHub visits. The download counter may retain historical clicks from earlier local previews, but disabled download buttons do not add new clicks. Clearing browser site data resets that browser's saved values.

There is no analytics backend or shared counter database in this repository.

## Privacy and safety

The website does not read visitors' local coding-agent logs, ask for API keys, or accept uploads of prompts, responses, or usage files. Its terminal preview uses illustrative data; its screenshot is a supplied example, not live visitor activity.

The local terminal tool works offline, makes no network requests, reads logs without modifying them, and saves preferences in a local settings file. It filters terminal control characters, validates metadata and numeric values, and applies resource limits. Reports are marked incomplete when limits exclude usage.

These offline statements describe the **terminal tool**, not the website. Visiting the website makes normal requests for its static files and the GitHub profile image. GitHub Pages also records visitor IP addresses for security purposes; see [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).

The screenshot and exported tool reports can contain project names, paths, and usage totals. Review them before sharing or publishing. This project does not claim guaranteed security or independent security certification.

## Pricing limitations

The tool's USD values are estimates based on bundled model rates, not subscription bills or provider invoices. The catalog described on the website covers 20 OpenAI and Claude models plus three dated aliases, with rates verified on October 11, 2026.

- `?` means some usage is unpriced.
- `$12.34 + ?` means a known subtotal plus additional unpriced usage.
- Taxes, tool fees, regional premiums, and unsupported pricing tiers are not included.

The website does not fetch live prices, charge visitors, or calculate actual invoices.

## Files

```text
index.html             Page content and static markup
style.css              Layout, colors, responsiveness, and CSS effects
script.js              Website interactions and background connections
assets/dashboard.png   Supplied terminal screenshot
assets/credits.png     README credits banner
assets/credits.svg     Editable vector version of the banner
.nojekyll              Disables Jekyll processing on GitHub Pages
README.md              Project documentation
LICENSE                MIT license
```

There is no build step or runtime dependency installation required to host this website. Node.js 20+ is a requirement of the separate terminal tool, not GitHub Pages hosting.

## Preview locally

Serve the repository folder with any static HTTP server. For example, if Python is installed, run this from the folder containing `index.html`:

yikesaiefxed
**Project creator: yipsys / sornin.**

- GitHub profile: [yipsys](https://github.com/yipsys).
- Copyright (c) 2026 yipsys.
- Released under the [MIT License](LICENSE).

Keep the copyright and license notice when distributing copies or substantial portions of the code.

