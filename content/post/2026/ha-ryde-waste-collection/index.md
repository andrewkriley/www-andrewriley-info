---
title: Building a Home Assistant Integration for Ryde Council Waste Collection
description: How I built a custom HACS-compatible Home Assistant integration that tracks bin collection schedules using Ryde Council's public API.
slug: ha-ryde-waste-collection
date: 2026-03-02T08:35:54+11:00
tags:
    - home-assistant
    - hacs
    - python
    - homelab
categories:
    - technology
---

I live in the City of Ryde LGA and like many people I've missed bin night more times than I'd like to admit. Ryde Council has a website where you can look up your collection schedule, but I wanted it surfaced automatically in Home Assistant so I'd actually see it.

This post covers how I built a custom integration from scratch — including wiring up the council's public API, creating HACS-compatible packaging, designing dynamic dashboard cards, and submitting brand icons to the Home Assistant Brands repository.

## How Ryde Council's API Works

The integration relies on two public endpoints on the Ryde Council website (no API key required):

1. **Address search** — takes a free-text address string and returns a list of matching properties, each with a `geolocationid`.
2. **Waste schedule** — takes a `geolocationid` and returns an HTML snippet with the next collection dates for each waste type.

```python
API_SEARCH_URL = "https://www.ryde.nsw.gov.au/api/v1/myarea/search"
API_WASTE_URL  = "https://www.ryde.nsw.gov.au/ocapi/Public/myarea/wasteservices"
```

The response from the waste schedule endpoint isn't JSON — it's an HTML fragment embedded in a JSON envelope. I used a regex to pull the dates out:

```python
pattern = rf'<h3>{waste_type}</h3>.*?<div class="next-service">\s*(.+?)\s*</div>'
match = re.search(pattern, html_content, re.DOTALL)
```

Not the most elegant approach, but it works reliably and means there's no dependency on a third-party scraping library.

## Integration Structure

The integration follows standard Home Assistant patterns:

- **`coordinator.py`** — a `DataUpdateCoordinator` subclass that resolves the address to a `geolocationid` on first run, then polls the waste schedule at a configurable interval (default 12 hours).
- **`config_flow.py`** — a UI-based config flow that validates the address against the council API before saving, so you get an error during setup rather than at runtime.
- **`sensor.py`** — three sensor entities (General Waste, Recycling, Garden Organics), each reporting the next collection date as its state and `days_until` as an attribute.

Address format matters — the council search expects something like `129 Blaxland Road Ryde 2112` without the state abbreviation. I added that note to the config flow description to save people from frustration.

## Making it HACS Compatible

HACS (Home Assistant Community Store) requires a specific repository structure and a `hacs.json` manifest. The integration code lives under `custom_components/ryde_waste_collection/` and `hacs.json` at the repo root declares it as an integration:

```json
{
  "name": "Ryde Waste Collection",
  "render_readme": true
}
```

Installation via HACS is then straightforward:

1. Open HACS → three-dot menu → **Custom repositories**
2. Add `https://github.com/andrewkriley/ryde-waste-collection`, category: **Integration**
3. Click Download and restart Home Assistant

## Dashboard Cards with Dynamic Icon Colors

The three sensors give you `days_until` as an attribute, which makes it easy to build visual alerts. The trick is to use `mushroom-template-card` rather than `mushroom-entity-card` — the entity card only supports static `icon_color` values, while the template card supports full Jinja2 templates.

```yaml
- type: custom:mushroom-template-card
  primary: General Waste
  secondary: >-
    {% if states('sensor.ryde_waste_collection_general_waste') != 'unknown' %}
      {{ states('sensor.ryde_waste_collection_general_waste') }}
      ({{ state_attr('sensor.ryde_waste_collection_general_waste', 'days_until') }} days)
    {% else %}
      No data available
    {% endif %}
  icon: mdi:trash-can
  icon_color: >-
    {% if state_attr('sensor.ryde_waste_collection_general_waste', 'days_until') is not none
       and state_attr('sensor.ryde_waste_collection_general_waste', 'days_until') <= 7 %}
      red
    {% else %}
      grey
    {% endif %}
  badge_icon: >-
    {% if state_attr('sensor.ryde_waste_collection_general_waste', 'days_until') is not none
       and state_attr('sensor.ryde_waste_collection_general_waste', 'days_until') <= 1 %}
      mdi:bell-ring
    {% endif %}
  badge_color: red
  entity: sensor.ryde_waste_collection_general_waste
  tap_action:
    action: more-info
```

The colours match the actual bin lids: red for General Waste, yellow for Recycling, green for Garden Organics. Icons go grey when collection is more than 7 days away and switch to bin colour within the 7-day window. A bell badge appears the day before and on collection day.

## Submitting Brand Icons

Home Assistant has a [Brands repository](https://github.com/home-assistant/brands) that stores the logos shown in the UI for integrations. To get the integration icon showing properly, I created `icon.png` and `icon@2x.png` (1x and 2x resolution versions) along with dark-mode variants, and prepared a pull request to the Brands repo.

The submission guide requires specific image dimensions and a directory named after the integration domain (`ryde_waste_collection`). The icons are included in the repo under `brands_submission/` so anyone picking this up later has them ready to go.

## Resources

- [GitHub repository](https://github.com/andrewkriley/ryde-waste-collection)
- [HACS documentation](https://hacs.xyz/docs/publish/start)
- [Home Assistant Brands repository](https://github.com/home-assistant/brands)
- [hacs_waste_collection_schedule](https://github.com/mampfes/hacs_waste_collection_schedule) — inspiration for this project
- [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) — the frontend cards used in the dashboard
