---
layout: default
title: CV
permalink: /cv/
description: Academic curriculum vitae for Xiangjie Zhao.
---

{% include page-hero.html
   kicker="Curriculum vitae"
   heading="Xiangjie Zhao, PhD"
   lede="Postdoctoral Research Associate in the Department of Pathology and Laboratory Medicine at the University of North Carolina at Chapel Hill." %}

<section class="band">
  <div class="shell">
    {%- for block in site.data.cv %}
    <div class="cv-row" data-reveal>
      <h2>{{ block.section }}</h2>
      <div>
        {%- if block.chips %}
        <div class="tag-row" style="margin-top:0">
          {%- for chip in block.chips %}<span class="chip">{{ chip }}</span>{% endfor %}
        </div>
        {%- endif %}
        {%- for entry in block.entries %}
        <div class="cv-entry">
          <strong>{{ entry.title }}</strong>
          {%- if entry.period %}<span class="cv-period">{{ entry.period }}</span>{% endif %}
          {%- if entry.meta %}<p class="cv-meta">{{ entry.meta }}</p>{% endif %}
          {%- if entry.url %}
          <a class="text-link" href="{{ entry.url }}" rel="noopener" target="_blank">{{ entry.url_label }} <span aria-hidden="true">↗</span></a>
          {%- endif %}
        </div>
        {%- endfor %}
      </div>
    </div>
    {%- endfor %}
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="cta" data-reveal data-stagger="off">
      <div>
        <p class="kicker"><i></i>Archive</p>
        <h2 style="margin-top:1.1rem">Earlier training-stage work and presentations.</h2>
      </div>
      <div class="cta-actions">
        <a class="pill" href="{{ '/projects/' | relative_url }}">Earlier work <span aria-hidden="true">↗</span></a>
        <a class="pill" href="{{ '/talks/' | relative_url }}">Talks <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>
