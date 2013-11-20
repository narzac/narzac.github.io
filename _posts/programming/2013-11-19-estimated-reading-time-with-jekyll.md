---
layout: post
language: en
categories: en blog programming
unique_id: 1_en
date: 2013-11-19 22:24
title:  "Estimated Reading Time with Jekyll &amp; Liquid"
tags: jekyll liquid
current: ps-nav-post
---

Long story short, I have decided to keep a blog and have wanted to inform the potential readers on how much time It will take to read a particular post.
 Since I use jekyll & github to manage my static web site, i've wanted to solve the problems i stumbled upon, with the tools jekyll provide as much as possible.
 After going through the [documentation](http://jekyllrb.com/docs/home/), I have seen that, liquid is a particularly powerful template engine and have googled it,
read through the Shopify's liquid [wiki](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and have come up with the following solution. Hope this can save you some time.

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

Here is the explanation part. First of all, I assume that a person can read  180 words per minute, 3 words per second.
You should not introduce new lines or add spaces to the {% raw %} {% capture ....  %}...{% endcapture %} {% endraw %}, otherwise '==' will not work since it will consist spaces and/or new lines. A simplified scenario of what i use in this website would be, let's say... you have a _includes/post-meta.html file to put the above code and some html markup with it. In addition, the post-meta.html file is included from _layouts/post.html like this.

{% highlight text %}
{% raw %}
{% include post-meta.html caller=page %}
{% endraw %}
{% endhighlight %}

Then you are good to go with the above code. Even simpler if you don't have this code in a separate include file, then replace "include.caller.content" with "page.content" and you are done. So you've guessed right,
'include.caller.content' is used to pass 'page.content' if 'caller = page', when there is a separate include file such as post-meta.html.
That is all about this post, feel free to ask further quesitons <span class="fontelico-emo-happy"></span>