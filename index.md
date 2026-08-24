---
layout: default
title:
description: Xiangjie Zhao is a postdoctoral researcher at UNC Chapel Hill developing perturbation-enabled single-cell and spatial multi-omic technologies for cardiovascular biology.
---

<section class="hero">
  <canvas class="hero-canvas" data-field aria-hidden="true"></canvas>
  <div class="shell hero-grid">
    <div class="hero-copy">
      <p class="kicker" data-reveal data-stagger="off"><i></i>{{ site.person.name }}, {{ site.person.credential }} · {{ site.person.institution_short }}</p>
      <h1 data-reveal data-stagger="off">
        <span class="line">Perturbation genomics</span>
        <span class="line">for the developing</span>
        <span class="line">and <em>diseased heart.</em></span>
      </h1>
      <p class="hero-deck" data-reveal data-stagger="off">
        I build single-cell, multi-omic, and spatial technologies that measure what
        happens when you actually change a gene — and models that learn from the answer.
      </p>
      <div class="hero-actions" data-reveal data-stagger="off">
        <a class="pill pill-solid" href="{{ '/research/' | relative_url }}">Explore the research <span aria-hidden="true">↗</span></a>
        <a class="pill" href="{{ '/resources/' | relative_url }}">Open the atlas <span aria-hidden="true">↗</span></a>
      </div>
      <div class="hero-meta" data-reveal data-stagger="off">
        <span>{{ site.person.department }}</span>
        <span>{{ site.person.location }}</span>
        <a href="{{ site.profiles.scholar }}" rel="me noopener" target="_blank">Scholar ↗</a>
        <a href="{{ site.profiles.github }}" rel="me noopener" target="_blank">GitHub ↗</a>
      </div>
    </div>

    <figure class="hero-card" data-reveal data-stagger="off">
      <img src="{{ site.person.portrait | relative_url }}" alt="{{ site.person.name }}" width="1000" height="1000" fetchpriority="high">
      <span class="chip chip-live hero-status">{{ site.person.status }}</span>
      <figcaption>
        <span class="card-role">{{ site.person.role }}</span>
        <span class="card-org">{{ site.person.department }}</span>
      </figcaption>
    </figure>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    {%- for pass in (1..2) -%}
      {%- for method in site.data.methods -%}<span>{{ method }}</span>{%- endfor -%}
    {%- endfor -%}
  </div>
</div>

<section class="band">
  <div class="shell">
    <div class="band-head">
      <div>
        <p class="kicker" data-reveal data-stagger="off"><i></i>Research program</p>
        <h2 data-reveal data-stagger="off">Three directions,<br>one experimental cycle.</h2>
      </div>
      <a class="text-link" href="{{ '/research/' | relative_url }}" data-reveal data-stagger="off">Full program <span aria-hidden="true">↗</span></a>
    </div>

    <div class="directions">
      {%- for theme in site.data.research %}
      <a class="direction" href="{{ '/research/#' | append: theme.id | relative_url }}" data-spotlight data-reveal>
        <span class="direction-index">{{ theme.index }} /</span>
        <h3>{{ theme.title }}</h3>
        <p>{{ theme.summary }}</p>
        <span class="direction-foot">
          <span>{{ theme.keywords }}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </span>
      </a>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="band-head">
      <div>
        <p class="kicker" data-reveal data-stagger="off"><i></i>Research in view</p>
        <h2 data-reveal data-stagger="off">Cell states across<br>cardiac maturation.</h2>
      </div>
      <p data-reveal data-stagger="off">The chromatin landscape of postnatal cardiac maturation, from the public atlas. Figures from unpublished studies stay off the page until the work is out.</p>
    </div>

    <div class="plates plates-solo">
      <figure class="plate" data-reveal>
        <div class="plate-frame">
          <img src="{{ '/assets/images/cardiac-maturation-snatac-umap.png' | relative_url }}" alt="Single-nucleus ATAC-seq embedding of cardiac cell types and developmental time points" loading="lazy">
        </div>
        <figcaption><b>01</b>Cardiac maturation snATAC landscape</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="band-head">
      <div>
        <p class="kicker" data-reveal data-stagger="off"><i></i>Research infrastructure</p>
        <h2 data-reveal data-stagger="off">Resources for the field.</h2>
      </div>
      <a class="text-link" href="{{ '/resources/' | relative_url }}" data-reveal data-stagger="off">All resources <span aria-hidden="true">↗</span></a>
    </div>

    <div class="ledger ledger-resources">
      {%- for item in site.data.resources -%}
      {%- if item.featured -%}
      <a href="{{ item.primary_url }}" rel="noopener" target="_blank" data-reveal>
        <span class="chip chip-{{ item.state }}">{{ item.status }}</span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
        </div>
        <span class="ledger-meta">{{ item.primary_label }} ↗</span>
      </a>
      {%- endif -%}
      {%- endfor %}
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="band-head">
      <div>
        <p class="kicker" data-reveal data-stagger="off"><i></i>Selected publications</p>
        <h2 data-reveal data-stagger="off">Recent work.</h2>
      </div>
      <a class="text-link" href="{{ '/publications/' | relative_url }}" data-reveal data-stagger="off">All publications <span aria-hidden="true">↗</span></a>
    </div>

    <div class="ledger ledger-pubs">
      {%- for paper in site.data.publications -%}
      {%- if paper.selected -%}
      <a href="{{ paper.doi }}" rel="noopener" target="_blank" data-reveal>
        <span class="ledger-meta">{{ paper.year }}</span>
        <div>
          <h3>{{ paper.title }}</h3>
          <p>{{ paper.authors }} · <span class="venue">{{ paper.venue }}</span></p>
        </div>
        <span class="ledger-meta">DOI ↗</span>
      </a>
      {%- endif -%}
      {%- endfor %}
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="cta" data-reveal data-stagger="off">
      <div>
        <p class="kicker"><i></i>Collaboration</p>
        <h2 style="margin-top:1.1rem">Perturbation genomics, cardiac models, or predictive biology — <em>let’s talk.</em></h2>
      </div>
      <div class="cta-actions">
        <a class="pill pill-solid" href="mailto:{{ site.email }}">{{ site.email }} <span aria-hidden="true">→</span></a>
        <a class="pill" href="{{ '/cv/' | relative_url }}">Read the CV <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>
