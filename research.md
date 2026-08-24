---
layout: default
title: Research
permalink: /research/
description: A research program integrating perturbation omics, cardiovascular functional genomics, and predictive biology.
---

{% include page-hero.html
   kicker="Research program"
   heading="From perturbation to mechanism."
   lede="Technology development, cardiovascular biology, and predictive computation as one loop: build causal measurements, discover regulatory mechanisms, then predict the next intervention worth running." %}

<section class="band">
  <div class="shell">
    <figure class="diagram-plate" data-reveal data-stagger="off">
      {% include visuals/research-loop.svg %}
      <figcaption><b>The loop</b>Build causal measurements, discover regulatory mechanisms, predict the next intervention — then test it.</figcaption>
    </figure>
  </div>
</section>

{%- for theme in site.data.research %}
<section class="theme band-line" id="{{ theme.id }}">
  <div class="shell theme-grid">
    <div class="theme-rail" data-reveal data-stagger="off">
      <span class="num">{{ theme.index }}</span>
      <p>{{ theme.title }}</p>
    </div>

    <div class="theme-body">
      <h2 data-reveal data-stagger="off">{{ theme.headline }}</h2>
      <p data-reveal data-stagger="off">{{ theme.summary }}</p>

      <div class="tag-row" data-reveal data-stagger="off">
        {%- for tag in theme.tags %}<span class="chip">{{ tag }}</span>{% endfor %}
      </div>

      <details class="disclosure" data-reveal data-stagger="off">
        <summary>Research rationale</summary>
        <div class="disclosure-body">
          {%- for para in theme.rationale %}<p>{{ para }}</p>{% endfor %}
        </div>
      </details>

      {%- if theme.diagram == 'ai-biology' %}
      <figure class="diagram-plate theme-figure" data-reveal data-stagger="off">
        {% include visuals/ai-biology.svg %}
        <figcaption><b>{{ theme.index }}</b>{{ theme.figure_caption }}</figcaption>
      </figure>
      {%- elsif theme.figure %}
      <figure class="plate theme-figure{% if theme.id == 'cardiovascular-genomics' %} plate-dark{% endif %}" data-reveal data-stagger="off">
        <div class="plate-frame">
          <img src="{{ theme.figure | relative_url }}" alt="{{ theme.figure_alt }}" loading="lazy">
        </div>
        <figcaption><b>{{ theme.index }}</b>{{ theme.figure_caption }}</figcaption>
      </figure>
      {%- endif %}
    </div>
  </div>
</section>
{%- endfor %}

<section class="band band-line" id="current-projects">
  <div class="shell">
    <div class="band-head">
      <div>
        <p class="kicker" data-reveal data-stagger="off"><i></i>Current projects</p>
        <h2 data-reveal data-stagger="off">Work in progress.</h2>
      </div>
      <p data-reveal data-stagger="off">Descriptions stay deliberately brief while studies are unpublished.</p>
    </div>

    <div class="grid-cards">
      <article class="mini-card" data-reveal>
        <span class="chip chip-building">Under wraps</span>
        <h3>Perturbation studies in progress</h3>
        <p>Several are running. Designs and results stay off this page until the corresponding papers are published.</p>
      </article>
      <article class="mini-card" data-reveal>
        <span class="chip chip-building">In preparation</span>
        <h3>Cardiac maturation snATAC atlas</h3>
        <p>Chromatin dynamics across postnatal cardiac maturation.</p>
      </article>
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="cta" data-reveal data-stagger="off">
      <div>
        <p class="kicker"><i></i>Collaboration</p>
        <h2 style="margin-top:1.1rem">Interested in perturbation genomics, cardiovascular models, or predictive biology?</h2>
      </div>
      <div class="cta-actions">
        <a class="pill pill-solid" href="{{ '/contact/' | relative_url }}">Start a conversation <span aria-hidden="true">→</span></a>
        <a class="pill" href="{{ '/resources/' | relative_url }}">See the resources <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>
