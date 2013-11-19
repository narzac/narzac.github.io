var SITE = ( function(window, document, my) {
    /* Avoid `console` errors in browsers that lack a console. */
    my.avoidConsoleErrors = function() {
	var method;
	var noop = function () {};
	var methods = [
	    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	    'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
	    method = methods[length];

	    // Only stub undefined methods.
	    if (!console[method]) {
		console[method] = noop;
	    }
	}
    };

	my.preventBrowserTooltip = function() {
	    //prevent browser to show default tooltip
	    $("[title]").mouseover(function () {
		$this = $(this);
		if($this.attr('title') !== '' &&  $this.attr('title') !== undefined && $this.attr('title') !== null) {
		    $this.data('title', $this.attr('title'));
		    // Using null here wouldn't work in IE, but empty string will work just fine.
		    $this.attr('title', '');
		}
	    }).mouseout(function () {
		$this = $(this);
		if($this.data('title') !== '' &&  $this.data('title') !== undefined && $this.data('title') !== null) {
		    $this.attr('title', $this.data('title'));
		}
	    });
	};

    return my;
}(window, document, SITE || {}));

SITE.avoidConsoleErrors();
SITE.preventBrowserTooltip();
