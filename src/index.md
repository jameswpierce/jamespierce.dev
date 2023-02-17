---
layout: layout.njk
---

{% image "./src/images/decline1.jpg", "black and white art" %}

# James Willard Pierce

I am a full-stack web developer and product consultant at [Super Basic](https://superbasic.xyz), where my primary focus is on the development of web-based applications.

I've also worked at [Real Geeks](https://realgeeks.com) and [Click Here Labs](https://clickherelabs.com).

If you check out the blog section, you will see some of the technologies I am interested in, which include JavaScript, CSS, HTML, TypeScript, React, Ruby, and Rails.

I take a consultative approach to the projects that I am involved with. Usually this means working across disciplines to help each understand the needs of the other, identifying and addressing pain points in the product development process, and implementing best practices along the way.

The end goal is to produce meaningful software that empowers people to achieve their personal and professional goals – and to have a good time doing it.

## open source
<ul>
    <li><a href="https://github.com/superbasicxyz/airtabler">Airtabler</a> | an ORM-like interface for connecting to your Airtable data written in Typescript</li>
    <li><a href="https://github.com/superbasicxyz/tenkit">Tenkit</a> | a wrapper for the Apple WeatherKit API written in Ruby</li>
</ul>

## web development

<ol>
{%- for post in collections.post reversed -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ol>

## generative art

1. [euphoria.institute](https://euphoria.institute)


## open source hardware

1. [lotus_0](/electronics/lotus_0)

