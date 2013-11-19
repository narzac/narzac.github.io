# narzac.me #

Personal website of Ahmet Yeşil

* To learn howto develop & publish, please see USAGE.md

## Prerequisites ##

1. NodeJS & npm
2. Ruby & gem
3. Python & pip

### Development Dependencies ###

1. [npm](https://npmjs.org/)
2. [grunt-cli](http://gruntjs.com/getting-started) `sudo npm install -g grunt-cli`
3. [bower](http://bower.io) `sudo npm install -g bower`
4. [jekyll](http://jekyllrb.com/) `sudo gem install jekyll`
5. Jekyll Extras
* `sudo gem install kramdown` for Latex to PNG support & more
* `sudo pip install pygments` for syntax highlighting support


## Init ##

1. `npm install`
2. `bower install`
3. `grunt init`

## Development ##

1. In a terminal, run `grunt devel && grunt watch`
2. In another terminal, run `jekyll serve  build --config _config.yml,_config-devel.yml --draft --watch -t`


## Production ##

1. In a terminal, run `grunt init && grunt && jekyll build`
2. To preview production site `jekyll serve`
3. Note that, font-aweome-custom.less(cdn or local) and default.html(jquery and angular version) need to be set manually, after version updates.

## Built with ##

* [Jekyll](http://jekyllrb.com/)
* [Grunt](http://gruntjs.com/)
* [HTML5 BoilerPlate](http://html5boilerplate.com/)
* [Twitter Bootstrap 3](http://twitter.github.com/bootstrap/)
* [Less](http://lesscss.org/)
* [Jquery](http://jquery.com/)
* [AngularJS](http://angularjs.org/)

## License

[Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/)
(c) [Ahmet Yeşil](http://narzac.me)

## Future Plans ##

* Use [mathjax](http://www.mathjax.org/) (there is also a jekyll plugin) instead of [rdiscount](https://github.com/davidfstr/rdiscount).
* Use travis ci for automated tests
* Add karma & jasmine with angularjs
* Apply  deployment steps, site optimization, semantic HEAD (dns-prefetch etc.)
