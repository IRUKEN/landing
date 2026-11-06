# Erni Tabash site design reference

## Sources and capture context

- Homepage: https://www.ernitabash.com/ — captured at 1440 x 900 on 2026-11-06.
- Cronogramas: https://www.ernitabash.com/cronogramas/ — captured at 1440 x 900 on 2026-11-06.
- Target: `/games/`, delivered by the existing AWS Amplify application.

## Visual system

The main portfolio uses a dark, restrained engineering aesthetic. Its primary background is `#0F172A`, with deeper `#020617` surfaces, `#F8FAFC` primary text, and `#60A5FA` as the blue accent. Headings use Geist and body copy uses Inter. Layouts use a wide container (approximately 1400 px), thin rules, square controls, generous vertical spacing, monospace metadata, and blue focus or active states.

Cronogramas is intentionally lighter and more application-like: pale blue hero, white cards, dark navy evaluation section, compact blue controls, fine borders, and a structured dashboard grid. It retains the same blue/navy brand family and precise spacing.

## Integration guidance

- Keep `/`, `/blog`, `/legal`, and `/cronogramas` unchanged.
- Expose Games in the shared portfolio navigation using the existing text-link treatment.
- Serve TES Legends as its own full-screen application at `/games/`; do not wrap the game board in the portfolio navigation because that would reduce usable board space and mix two independent layout systems.
- Use the existing domain, TLS certificate, security headers, and Amplify CDN.
- Rewrite game asset references to `/games/assets/` so they cannot collide with portfolio assets.
- Preserve square controls, dark surfaces, and blue focus treatment where integration UI is added later.

## Observed limitations

The game provides its own visual system and was not redesigned. The integration matches the hosting, domain, navigation entry, and path conventions of the portfolio, while the gameplay surface remains faithful to the upstream project.
