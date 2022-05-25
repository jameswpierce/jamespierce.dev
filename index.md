---
layout: layout.njk
---

# James Willard Pierce

I am a full-stack web developer and product consultant at [Super Basic](https://superbasic.xyz), where my primary focus is on the development of web-based applications.

I've also worked at [Real Geeks](https://realgeeks.com) and [Click Here Labs](https://clickherelabs.com).

If you check out the blog section, you will see some of the technologies I am interested in, which include (but are not limited to!) JavaScript, React, Vue, Next.js, Vercel, FaunaDB, GraphQL, Ruby, and Rails. I'm currently dipping my toes into TypeScript, and liking what I'm seeing/hearing.

I take a consultative approach to the projects that I am involved with. Usually this means working across disciplines to help each understand the needs of the other, identifying and addressing pain points in the product development process, and implementing best practices along the way.

The end goal is to produce meaningful software that empowers people to achieve their personal and professional goals – and to have a good time doing it.

## web development

<ol>
{%- for post in collections.post reversed -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ol>

## open source electronics

1. [PCB-1](/electronics/pcb-1)

