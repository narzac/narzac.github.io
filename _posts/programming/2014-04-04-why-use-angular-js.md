---
layout: post
language: en
categories: en blog programming
unique_id: 2_en
date: 2014-04-04 12:24
title:  "Why use AngularJS?"
tags: AngularJS
current: ps-nav-post
---

AngularJS is a well thought framework and have unique design decisions in its very core. In this post I will point out some aspects I find  worth noting. I will not get into the discussion of choosing one client side MVC framework over another,  beware this is about AngularJS only.

1. AngularJS promotes Test Driven Development (TDD). It is best practice to write your tests first then progressively and iteratively implement the code. The team develops and support Karma for unit tests and Protactor for end-to-end tests.

2. AngularJS promotes Data Driven Development (DDD). The data drives the project. Data can be bound, two way binding(as in, if sth. changes in the ui, the corresponding variable in the javascript scope changes and vice versa), even three way binding(for example additional to two way binding, javascript code is bound to a remote database).

3. Being able to extend HTML with directives, so that we can have more readabe and semantic markup and reuse the components, most of the time this correspond to directives with isolated scope. Note that, directives with isolated(optional) scope can take its data from outside world, as if a function takes its parameters from the calling code.

4. AngularJS discourages the DOM manipulation, using a declarative syntax and bindings in appropriate places is the way to go.

5. The situation of separation of concerns and separation of technologies, this is a hot discussion. However the way i see it, AngularJS enables you to structure your code in a way it is easily unit testable.If best practices on architecture and coding  are followed, when you would like to change sth, in worst case scenario, 2 files in the same directory will change(i.e. app/scripts/fruit/apple_directive.js and app/scripts/fruit/apple_directive.tpl.html).

6. AngularJS is a MVW framework as the team call it. It does not try to be a MVC framework instead it tries to make HTML better and frontend web development easier.
 It comes with its own creatings which have special meaning in the AngularJS context. Such as Scope(which resembles the protypal inheritance of Javascript itself),
  Filters, Controllers, Directives, Services, Factories, Providers. So it is clear, which part does what. But yes there is a learning curve, especially with directives.

7. AngularJS comes with jQlite(a subset of jQuery) and can use jQuery(by bypassing jQlite) if it is present before AngularJS. It may be easier for jQuery developers to migrate to AngularJS.

8. It wraps a bunch of native browser APIs and includes modern libraries in its core such as Input, Form ,Templates, Promises, PubSub, XHR.

9. Localization, Caching, Security working with just a few lines of code.

10. Modules, Dependency Injection in its core encourages the structured code which is lacking in the JS itself.

11. Good documentation, growing community. Google support so it is guaranteed there will be no money issue :)

12. In addition to core, there are other optional additions if desired, such as animation, resource(for consuming RESTful APIs), sanitize,
     mock(for testing), route, touch( touch enabled devices), cookies.

13. Since almost all browsers support gzip, even IE 5.5+, it is unbelievable right :) Anyway, just to give you an idea the compressed with level 4, AngularJS is 40 KB, jQuery is 36 KB.

In future, I will update, and try to explain these for the newcomers. Please google the buzz words for the time being :)