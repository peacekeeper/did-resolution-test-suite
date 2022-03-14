---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

---
layout: default
title: Home
---

This is a [Report](https://danubetech.github.io/did-resolution-test-suite/reports/report.html) file.

{% capture x %}{% include report.json %}{% endcapture %}
{% jsonball foo from var x %}
