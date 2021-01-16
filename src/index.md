---
title: Chandler Family
layout: default.liquid
pagination:
    data: posts
    size: 100
    alias: posts
---

<header class="lg:text-center">
    <h1 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Posts</h1>
</header>

<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
{% for post in posts %}
<a href="/posts/{{ post.id }}/" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 ring-1">
<div class="ml-4">
    <p class="text-base font-medium text-gray-900">{{ post.Title }}</p>
    <p class="mt-1 text-sm text-gray-500">{{ post.Summary }}</p>
    <p class="mt-1 text-sm text-gray-500">{{ post.author.name }}</p>
</div>
</a>
{% endfor %}
</div>
