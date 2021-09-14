---
title: Post
layout: default.liquid
pagination:
  data: notion.posts
  size: 1
  alias: post
permalink: 'posts/{{ post.slug }}/'
---

<article class="lg:px-8 max-w-7xl mx-auto px-2 sm:px-6 py-4">
    <header class="lg:text-center">
      <picture style="{%if post.Image %}display: block;{% else %}display: none;{% endif %}">
        <img src="{{ post.Image }}" style="width: 200px;" alt="relevant image for blog visual only" />
      </picture>
        <h1 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ post.Title }}</h1>
        <h2 class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{{ post.SubTitle }}</h2>
    </header>
    
<div class="mt-2 text-base text-gray-500">{{ post.block | markIt }}</div>
<a href="/" class="mt-8 flex text-blue-500 underline">Return Home</a>
</article>
