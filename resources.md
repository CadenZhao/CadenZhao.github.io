---
layout: default
title: Resources
permalink: /resources/
description: Atlases, databases, software, and reproducible frameworks developed by Xiangjie Zhao.
---

{% include page-hero.html
   kicker="Research infrastructure"
   heading="Data and tools for reuse."
   lede="Atlases, databases, and analytical frameworks built alongside the science — released so other labs can use them, not just read about them." %}

<section class="band">
  <div class="shell catalogue">
    {%- for item in site.data.resources %}
    <article class="catalogue-item{% if item.featured %} is-featured{% endif %}" id="{{ item.id }}" data-reveal>
      <div>
        <div class="catalogue-meta">
          <span class="chip">{{ item.index }} · {{ item.kind }}</span>
          <span class="chip chip-{{ item.state }}">{{ item.status }}</span>
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.summary }}</p>
        {%- if item.links %}
        <div class="catalogue-links">
          {%- for link in item.links %}
          <a class="text-link" href="{{ link.url }}" rel="noopener" target="_blank">{{ link.label }} <span aria-hidden="true">↗</span></a>
          {%- endfor %}
        </div>
        {%- endif %}
      </div>

      {%- if item.figure %}
      <figure class="catalogue-visual">
        <img src="{{ item.figure | relative_url }}" alt="{{ item.figure_alt }}" loading="lazy">
        <figcaption>{{ item.figure_caption }}</figcaption>
      </figure>
      {%- elsif item.monogram %}
      <div class="monogram" aria-hidden="true">{{ item.monogram }}</div>
      {%- endif %}
    </article>
    {%- endfor %}
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="grid-cards">
      <article class="mini-card" data-reveal>
        <h3>Built for reuse</h3>
        <p>Every resource ships with a browsable interface, not just a supplementary table.</p>
      </article>
      <article class="mini-card" data-reveal>
        <h3>Open science</h3>
        <p>Code and curated data are released publicly wherever licensing allows.</p>
      </article>
      <article class="mini-card" data-reveal>
        <h3>Long-term access</h3>
        <p>Hosting and links are maintained past publication so citations keep working.</p>
      </article>
    </div>
  </div>
</section>
