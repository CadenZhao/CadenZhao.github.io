---
layout: default
title: Past Work
permalink: /projects/
description: Selected earlier research projects by Xiangjie Zhao.
---

{% include page-hero.html
   kicker="Archive"
   heading="Selected earlier work."
   lede="Projects that shaped my training in clinical data analysis, single-cell genomics, and systems biology." %}

<section class="band">
  <div class="shell grid-cards">
    {%- for project in site.data.archive.projects %}
    <article class="mini-card" data-reveal>
      <span class="chip">{{ project.index }}</span>
      <h3>{{ project.title }}</h3>
      <p>{{ project.body }}</p>
      {%- if project.link_url %}
      <a class="text-link" href="{{ project.link_url | relative_url }}">{{ project.link_label }} <span aria-hidden="true">→</span></a>
      {%- endif %}
    </article>
    {%- endfor %}
  </div>
</section>
