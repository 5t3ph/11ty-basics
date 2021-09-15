---
title: Chandler Family
layout: default.liquid
pagination:
    data: notion.posts
    size: 100
    alias: posts
---

<header class="lg:text-center px-2">
    <h1 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Posts</h1>
</header>

<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
{% for post in notion.posts %}
<a href="/posts/{{ post.slug }}/" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 ring-1 overflow-hidden">
    <div class="ml-4 flex">
        <div class="rounded-lg -ml-7 -mt-3 -mb-3 mr-2 p-1">
            <img width=100 height=125 class="max-h-32 rounded-l-lg" src="{{ post.Image | fallbackImageSrc }}" alt="relevant image for blog visual only" />
        </div>
        <div>
            <p class="text-base font-medium text-gray-900 flex items-center">
                <span class="mr-2">{{ post.Title }}</span>
                <span class="bg-{{ post.Status | statusBadgeColor }}-600 text-white p-1 text-xs rounded leading-none flex items-center">
                    {{ post.Status }}
                </span>
            </p>
            <p class="mt-1 text-sm text-gray-500">{{ post.Author }}</p>
        </div>
    </div>
</a>
{% endfor %}
</div>
