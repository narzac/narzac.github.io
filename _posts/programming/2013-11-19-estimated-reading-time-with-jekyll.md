---
layout: post
language: en
categories: en blog programming
unique_id: 1_en
date: 2013-11-19 22:24
title:  "Estimated Reading Time with Jekyll &amp; Liquid"
tags: jekyll liquid
---

Long story short, I have decided to keep a blog and have wanted to inform the potential readers on how much time It is going to take to read the post.
 Since I use jekyll & github to manage my static web site, i wanted to solve the problems i stumbled upon, with the tools jekyll provide as much as possible.
 After going through the [documentation](http://jekyllrb.com/docs/home/), I have seen that, liquid is particularly powerful and googled it,
read the Shopify's liquid [wiki](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and come up with the following solution. Hope this can save you some time.

{% highlight text %}

{% raw %}

{% capture minute_part %}{{ include.caller.content | strip_html | number_of_words | divided_by:180 }}{% endcapture %}

{% capture second_part %}{{ include.caller.content | strip_html | number_of_words| modulo: 180 | divided_by: 3}}{% endcapture %}

{% unless minute_part == '0'  %}
   {% if minute_part == '1'  %}
      {{ minute_part }} minute
   {% else %}
      {{ minute_part }} minutes
   {% endif %}
{% endunless %}

{% unless second_part == '0' or second_part == '1' %}
   {{ second_part }} seconds
{% endunless %}

{% endraw %}

{% endhighlight %}

Here is the explanation part. First of all, I have assumed that a person can read  180 words per minute, 3 words per second.
Do not break or add spaces to the {% raw %} {% capture ....  %}...{% endcapture %} {% endraw %}, otherwise '==' will not work since it will consist spaces and/or new lines. A simplified scenario of what i use in this website, let's say, you have a _includes/post_meta.html file
to calculate time, print tags and some html markup. This file is included from _layouts/post.html like this.

{% highlight text %}
{% raw %}
{% include post-meta.html caller=page %}
{% endraw %}
{% endhighlight %}

Then you are good to go with the above code. Even better if you don't have this code in a separate include file, then replace "include.caller.content" with "page.content" and you are done.
That is all about this post, feel free to ask further quesitons.