---
layout: post
language: en
categories: en blog programming
unique_id: 3_en
date: 2014-08-09 21:42
title:  "Colored log in a makefile"
tags: makefile make log colored
---

A few days ago I have needed colored log support in console messages, this is easy to do with bash scripts. However I needed this for a Make target, and I have wanted to
implement this within Make. A few years back, I read the book "Managing Projects with GNU Make, Third Edition" By Robert Mecklenburg, so I know it is possible to do within Make.
There is one more limitation, this should work in both Linux and MacOSX. Note that I have tested this only with GNU Make. You are more than welcome for improvements, suggestions, compatibility results for other Makes out there. Here what I come up with, hope this helps.

{% highlight make %}

# COLORS
RED     := 1
GREEN   := 2
YELLOW  := 3
BLUE    := 4
MAGENTA := 5
CYAN    := 6
WHITE   := 7

define log-colored
    tput bold && tput setaf $1 && echo -en $2 && tput sgr0
endef

define log-warning
    $(call log-colored,$(YELLOW),$1)
endef

define log-error
    $(call log-colored,$(RED),$1)
endef

define log-success
    $(call log-colored,$(GREEN),$1)
endef

define log-info
    $(call log-colored,$(BLUE),$1)
endef

usage:
    $(call log-target, 'To see available targets:\n')
    $(call log-info, '    $$ make<space><tab><tab>\n')
    exit 0

{% endhighlight %}