;var SITE = ( function($, window, document, my) {
    "use strict";
    var $window = $(window);
    var backToTop = $('<a>', { 'id': 'back-to-top','href': '#top' });
    var icon = $('<i>', {'class': 'fa fa-chevron-circle-up fa-4x'});

    my.activateBack2Top = function() {
	backToTop.appendTo ('body');
	icon.appendTo (backToTop);
	backToTop.hide();
	$window.scroll(function () {
	    if ($window.scrollTop() > 150) {
		backToTop.fadeIn ();
	    } else {
		backToTop.fadeOut ();
	    }
	});
	backToTop.click (function (e) {
	// TODO if not desktop, don't animate
	    e.preventDefault ();
	    $('body, html').animate({
			scrollTop: 0
	    }, 600);
	});
    };

    my.deactivateBack2Top = function() {
	backToTop.remove();
    };

    return my;
}(jQuery, window, document, SITE || {}));


SITE.activateBack2Top();
