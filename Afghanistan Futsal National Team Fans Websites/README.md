# Afghanistan Futsal National Team Website

## Requirement Analysis

The brief asks for a complete modern website for the Afghanistan Futsal National Team, built with HTML, CSS, and JavaScript. The site should feel premium, responsive, easy to update, and structured like a professional sports website.

The implementation focuses on:

- A polished national-team brand presentation.
- Responsive page layouts for desktop, tablet, and mobile.
- Shared navigation, footer, cards, panels, and section styles.
- Dynamic content powered by JSON files for players, matches, and news.
- Placeholder visual assets that can be replaced with approved photography.

## Folder Structure

```text
Afghanistan Futsal National Team Fans Websites/
  index.html
  team.html
  fixtures.html
  gallery.html
  about.html
  contact.html
  players.json
  matches.json
  news.json
  project-brief.md
  requirements.md

  css/
    styles.css

  js/
    main.js

  images/
    hero-arena.png
    player-placeholder.svg
    court-placeholder.svg
    fans-placeholder.svg
    trophy-placeholder.svg
    training-placeholder.svg
    match-placeholder.svg
```

## Implementation Notes

- `css/styles.css` contains the shared visual system, responsive layout rules, glassmorphism effects, cards, forms, fixtures, gallery, and footer styling.
- `js/main.js` handles mobile navigation, active nav states, gallery filtering, contact form feedback, and dynamic rendering for players, matches, and news.
- `players.json`, `matches.json`, and `news.json` store editable site data.
- The website should be served through a local server for JSON fetching to work reliably in the browser.

## Design Reference Analysis

The redesign uses principles observed from premium sports and technology websites without copying their content:

- FIFA-style information architecture: prominent match center and news paths with short labels and fast access to core content.
- UEFA-style utility: fixtures, rankings-style information, and media updates presented in structured, scannable sections.
- Nike-style campaign energy: large hero messaging, confident CTAs, image-led storytelling, and minimal card copy.
- Apple-style restraint: calm navigation, strong whitespace, simple surfaces, and clear content hierarchy.

The final visual direction is dark navy with Afghanistan red and green accents, large Poppins headlines, Inter body copy, Space Grotesk UI details, mobile-first layout, clean cards, subtle hover interactions, and scroll reveal animations.
