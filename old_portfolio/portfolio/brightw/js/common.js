$(document).ready(function() {


	$('.menu-trigger').click(function(e){
    	e.preventDefault();
    	$('.nav-menu').stop().slideToggle();
	});

	$(window).resize(function() {		
		if (  $(window).width() > 500 ) {			
			$('nav ul').removeAttr('style');
		 }
	});

	$(".galery-img a").click(function() {
		$('#my-modal').modal();
		return false;
	});

	$('#my-modal').on('shown', function () {
		$('body').on('wheel.modal mousewheel.modal', function () {return false;});
	}).on('hidden', function () {
		$('body').off('wheel.modal mousewheel.modal');
	});
});