---
layout: default
title: Publications
permalink: /publications/
description: Peer-reviewed publications by Xiangjie Zhao.
---

{% include page-hero.html
   kicker="Publications"
   heading="Selected scholarly work."
   lede="Research spanning systems-level receptor biology, scientific resources, and technologies for cardiac tissue engineering." %}

<section class="band">
  <div class="shell">
    <div class="ledger ledger-pubs">
      {%- for paper in site.data.publications %}
      <a href="{{ paper.doi }}" rel="noopener" target="_blank" data-reveal>
        <span class="ledger-meta">{{ paper.year }}</span>
        <div>
          <h3>{{ paper.title }}</h3>
          <p>{{ paper.authors }}</p>
          <p class="venue"><em class="cite-venue">{{ paper.venue }}</em> · {{ paper.note }}</p>
        </div>
        <span class="ledger-meta">DOI ↗</span>
      </a>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="band band-line">
  <div class="shell">
    <div class="cta" data-reveal data-stagger="off">
      <div>
        <p class="kicker"><i></i>Elsewhere</p>
        <h2 style="margin-top:1.1rem">Full publication records and preprints.</h2>
      </div>
      <div class="cta-actions">
        <a class="pill" href="{{ site.profiles.scholar }}" rel="me noopener" target="_blank">Google Scholar <span aria-hidden="true">↗</span></a>
        <a class="pill" href="{{ site.profiles.orcid }}" rel="me noopener" target="_blank">ORCID <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>
