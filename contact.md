---
layout: default
title: Contact
permalink: /contact/
description: Contact Xiangjie Zhao for research collaborations and professional inquiries.
---

{% include page-hero.html
   kicker="Contact"
   heading="Let’s start a scientific conversation."
   lede="I welcome inquiries about research collaborations, perturbation and multi-omic methods, shared resources, and seminar opportunities." %}

<section class="band">
  <div class="shell contact-grid">
    <div class="contact-panel" data-reveal data-stagger="off">
      <p class="kicker"><i></i>Direct</p>
      <h2 style="margin-top:1.1rem;font-size:var(--step-2)">Email is the fastest route.</h2>
      <p style="margin-top:1rem;color:var(--ink-2);max-width:44ch">
        Include a short description of the question, project, or opportunity —
        it helps me reply with something useful rather than a scheduling loop.
      </p>
      <a class="pill pill-solid" style="margin-top:1.8rem" href="mailto:{{ site.email }}">{{ site.email }} <span aria-hidden="true">→</span></a>
    </div>

    <ul class="contact-list" data-reveal data-stagger="off">
      <li><span class="label">Email</span><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
      <li><span class="label">Institution</span><strong>{{ site.person.institution_short }}</strong></li>
      <li><span class="label">Department</span><strong>{{ site.person.department }}</strong></li>
      <li><span class="label">Location</span><strong>{{ site.person.location }}</strong></li>
      <li><span class="label">Google Scholar</span><a href="{{ site.profiles.scholar }}" rel="me noopener" target="_blank">View profile ↗</a></li>
      <li><span class="label">ORCID</span><a href="{{ site.profiles.orcid }}" rel="me noopener" target="_blank">0009-0001-3552-2293 ↗</a></li>
      <li><span class="label">GitHub</span><a href="{{ site.profiles.github }}" rel="me noopener" target="_blank">@CadenZhao ↗</a></li>
      <li><span class="label">X</span><a href="{{ site.profiles.x }}" rel="me noopener" target="_blank">@xiangjie_zhao ↗</a></li>
    </ul>
  </div>
</section>
