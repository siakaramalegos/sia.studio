---
layout: layouts/base.njk
title: Frequently asked questions
tags:
  - nav
navtitle: FAQ
templateClass: tmpl-post
---

{{ prices | log }}

{% set introHeading = title %} {% set introSummary %}{{ content | safe }}{%
  endset %}

<main id="main-content" tabindex="-1">
  {% include "intro.njk" %}

  <section class="[ pad-top-700 gap-bottom-900 ]">
  <div class="[ inner-wrapper ] [ sf-flow ]">
    <h2 class="md:text-600">How will I receive my digital download after purchase?</h2>
    <p>You will receive 2 separate emails:</p>
    <ol>
      <li>The receipt for your purchase</li>
      <li>The download link(s) for your files</li>
    </ol>
    <h2 class="md:text-600">Help! I don't see my email with the download link(s)!</h2>
    <p>If you do not see the second email with your downloads within a few minutes of completing payment, please <strong>check your junk folder</strong>. If you continue to have any issues, please contact me at <a href="mailto:sia@sia.studio">sia@sia.studio</a>.</p>
    <h2 class="md:text-600">What is your return policy for digital downloads?</h2>
    <p>Due to the nature of digital files, they cannot be returned. Thus, digital download purchases cannot be refunded.</p>
    <h2 class="md:text-600">What is your return policy for physical products?</h2>
    <p>I gladly accept returns and exchanges of physical items. Contact me at <a href="mailto:sia@sia.studio">sia@sia.studio</a> within 14 days of delivery to initial a return, and ship items back within 30 days of delivery.</p>
    <p>Buyers are responsible for return shipping costs. If the item is not returned in its original condition, the buyer is responsible for any loss in value.</p>
  </div>
</main>