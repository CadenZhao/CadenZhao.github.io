---
layout: default
title: Selected Talks Archive
permalink: /talks/
description: Archived selected talks and presentations by Xiangjie Zhao.
---

{% include page-hero.html
   kicker="Archive"
   heading="Selected earlier presentations."
   lede="A limited archive of training-stage scientific presentations. Current invited talks and conference presentations are listed on the CV." %}

<section class="band">
  <div class="shell">
    <div class="timeline">
      {%- for talk in site.data.archive.talks %}
      <article class="timeline-item" data-reveal>
        <div class="timeline-when">
          <time datetime="{{ talk.label }}">{{ talk.label }}</time>
          <span class="chip">{{ talk.venue }}</span>
        </div>
        <div>
          <h2>{{ talk.title }}</h2>
          <div class="catalogue-links" style="margin-top:1rem">
            {%- for link in talk.links %}
            <a class="text-link" href="{{ link.url | relative_url }}">{{ link.label }} <span aria-hidden="true">↗</span></a>
            {%- endfor %}
          </div>
        </div>
      </article>
      {%- endfor %}
    </div>
  </div>
</section>
