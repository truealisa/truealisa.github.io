$( document ).ready(function() {

	/*--- live_typing text ---*/

	$(function(){
		var a = new String;
		a = $('.text_cont_inner').text();
		$('.text_cont_inner').text('');
		var c=a.length;
		j=0;
		setInterval(function(){
			if(j<c){
				$('.text_cont_inner').text($('.text_cont_inner').text()+a[j]);
				j=j+1; 
			} 
			else {$('.text_cont_inner').removeClass('after');
					$('.button').css('opacity', '1')} 
		},75);
	});

	/*--- scrolling ---*/

	$('a[href^="#"]').bind('click.smoothscroll',function (e) {
		e.preventDefault();

		var target = this.hash,
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function () {
			window.location.hash = target;
		});
	});

	$(".navbar-nav > li").click(function(){

		$(".active").removeClass("active");
		$(this).addClass("active");
	});

	// Cache selectors
	var lastId,
	topMenu = $(".navbar-nav"),
	topMenuHeight = topMenu.outerHeight() + 15,
 	// All list items
 	menuItems = topMenu.find("a"),
   // Anchors corresponding to menu items
   scrollItems = menuItems.map(function() {
   	var item = $($(this).attr("href"));
   	if (item.length) {
   		return item;
   	}
   });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
   // Get container scroll position
   var fromTop = $(this).scrollTop() + topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function() {
   	if ($(this).offset().top < fromTop)
   		return this;
   });
   // Get the id of the current element
   cur = cur[cur.length - 1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
   	lastId = id;
     // Set/remove active class
     menuItems
     .parent().removeClass("active")
     .end().filter("[href='#" + id + "']").parent().addClass("active");
 	  }
	});

	/*--- sending a message ---*/

	var $contactForm = $('#form');

	$contactForm.submit(function(e) {
		e.preventDefault();
		var $submit = $('button:submit', $contactForm);
		var defaultSubmitText = $submit.val();

		$.ajax({
			url: '//formspree.io/truealisa@gmail.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
			//$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
			$submit.attr('disabled', true).val('Sending message…');
		},
		success: function(data) {
			//$contactForm.append('<div class="alert alert--success">Message sent!</div>');
			$submit.val('Message sent!');
			setTimeout(function() {
				//$('.alert--success').remove();
				$submit.attr('disabled', false).val(defaultSubmitText);
			}, 5000);
		},
		error: function(err) {
			//$contactForm.find('.alert--loading').hide();
			//$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
			$submit.val('Ops, there was an error.');
			setTimeout(function() {
				//$('.alert--error').remove();
				$submit.attr('disabled', false).val(defaultSubmitText);
			}, 5000);
		}
		});
	});

});
