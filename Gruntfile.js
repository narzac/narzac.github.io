module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	copy: {
	    font_awesome: {
		files: [
		    { src: ['./bower_modules/Font-Awesome/fonts/FontAwesome.otf'],
		      dest: './assets/fonts/FontAwesome.otf', filter: 'isFile'},
		    { src: ['./bower_modules/Font-Awesome/fonts/fontawesome-webfont.eot'],
		      dest: './assets/fonts/fontawesome-webfont.eot', filter: 'isFile'},
		    { src: ['./bower_modules/Font-Awesome/fonts/fontawesome-webfont.svg'],
		      dest: './assets/fonts/fontawesome-webfont.svg', filter: 'isFile'},
		    { src: ['./bower_modules/Font-Awesome/fonts/fontawesome-webfont.ttf'],
		      dest: './assets/fonts/fontawesome-webfont.ttf', filter: 'isFile'},
		    { src: ['./bower_modules/Font-Awesome/fonts/fontawesome-webfont.woff'],
		      dest: './assets/fonts/fontawesome-webfont.woff', filter: 'isFile'}
		]
	    },
	    js: {
		files: [
		    {src: ['./bower_modules/angular/angular.js'],
		     dest: './scripts/angular.js', filter: 'isFile'},
		    {src: ['./bower_modules/angular/angular.min.js'],
		     dest: './static/angular.min.js', filter: 'isFile'},
		    {src: ['./bower_modules/jquery/jquery.js'],
		     dest: './scripts/jquery.js', filter: 'isFile'},
		    {src: ['./bower_modules/jquery/jquery.min.js'],
		     dest: './static/jquery.min.js', filter: 'isFile'},
		    {src: ['./bower_modules/angular-bootstrap/ui-bootstrap-tpls.js'],
		     dest: './scripts/ui-bootstrap-tpls.js', filter: 'isFile'}
		]
	    }
	},
	jshint: {
	    options: {
		jshintrc: '.jshintrc'
	    },
	    all: [
		'Gruntfile.js',
		'scripts/*.js'
	    ]
	},
	less: {
	    bootstrap: {
		files: {
		    'tmp/bootstrap.css': ['styles/bootstrap-custom.less']
		}
	    },
	    font_awesome: {
		files: {
		    'tmp/font-awesome.css': ['styles/font-awesome-custom.less']
		}
	    },
	    app: {
		files: {
		    'tmp/main.css': ['styles/main.less']
		}
	    }
	},
	clean: {
	    stable: {
		src: ['static/site.min.css', 'static/site.min.js']
	    },
	    tmp: {
		src: ['tmp']
	    }
	},
	watch: {
	    bootstrap:{
		files: ['bower_modules/bootstrap/less/*.less', 'styles/bootstrap-custom*.less'],
		tasks: ['recess:bootstrap']
	    },
	    font_awesome:{
		files: ['bower_modules/Font-Awesomr/less/*.less', 'styles/font-awesome*.less'],
		tasks: ['recess:font_awesome']
	    },
	    app: {
		files: ['styles/main.less', 'styles/variables.less', 'styles/social-network.less'],
		tasks: ['recess:app']
	    }
	},
	concat: {
	    css: {
		options: {
		    separator: ''
		},
		src: ['tmp/bootstrap.css',
		      'tmp/font-awesome.css',
		      'styles/vendor/syntax.css',
		      'tmp/main.css'
		     ],
		dest: 'tmp/site.css'
	    },
	    js: {
		options: {
		    separator: ';',
		    stripBanners: true,
		    block: true,
		    line:true
		},
		src: [
		    'scripts/cross_browser_fixes.js',
		    'scripts/back2top.js',
		    'tmp/ui-bootstrap-tpls.ngmin.js',
		    'tmp/main.ngmin.js'
		],
		dest: 'tmp/site.js'
	    }
	},
	cssmin: {
	    options: {
		banner:
			'/*!\n' +
			' * <%= pkg.name %>, website site.min.css <%= pkg.version %>'+
			' */'
	    },
	    minify: {
		expand: true,
		files: {
		    'static/site.min.css': ['tmp/site.css']
		}
	    }
	},
	ngmin: {
	    ui_bootstrap: {
		src:  'scripts/ui-bootstrap-tpls.js',
		dest: 'tmp/ui-bootstrap-tpls.ngmin.js'
	    },
	    app: {
		src: 'scripts/main.js',
		dest: 'tmp/main.ngmin.js'
	    }

	},
	uglify: {
	    options: {
		banner:
			'/*!\n' +
			' * <%= pkg.name %>, website site.min.js <%= pkg.version %>'+
			' */'
	    },
	    stable: {
		files: {
		    'static/site.min.js': ['tmp/site.js']
		}
	    }
	}
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('mktmpdir', function() {  grunt.file.mkdir('tmp');});

    grunt.registerTask('init', ['copy:font_awesome', 'copy:js']);
    grunt.registerTask('stable', ['clean', 'mktmpdir', 'less', 'concat:css',
				  'cssmin', 'ngmin', 'concat:js', 'uglify', 'clean:tmp' ]);
    grunt.registerTask('devel', ['clean:tmp', 'mktmpdir', 'less']);
    grunt.registerTask('default', ['stable']);

};
