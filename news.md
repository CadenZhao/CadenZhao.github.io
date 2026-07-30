---
layout: default
title: News
permalink: /news/
description: Research and professional updates from Xiangjie Zhao.
---

{% include page-hero.html
   kicker="News"
   heading="Research and professional updates."
   lede="Selected milestones, publications, and resource releases." %}

<section class="band">
  <div class="shell">
    <div class="timeline">
      {%- for item in site.data.news %}
      <article class="timeline-item" data-reveal>
        <div class="timeline-when">
          <time datetime="{{ item.date }}">{{ item.label }}</time>
          {%- if item.tag %}<span class="chip">{{ item.tag }}</span>{% endif %}
        </div>
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
          {%- if item.link_url %}
          <a class="text-link" href="{{ item.link_url }}" rel="noopener" target="_blank">{{ item.link_label }} <span aria-hidden="true">↗</span></a>
          {%- endif %}
        </div>
      </article>
      {%- endfor %}
    </div>
  </div>
</section>
