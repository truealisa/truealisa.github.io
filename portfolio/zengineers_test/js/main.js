$( document ).ready(function() {

	/* --- CAROUSEL --- */

	$(function(){
		var carSlide = $('.jquery-carousel ul');
		var carSlideChild = carSlide.find('li');
		var NumberOfClick = 0;
		var isClick = true;
		itemLength = carSlide.find('li:first').width() + 1;

		carSlide.width(itemLength*carSlideChild.length);
		refreshPosition();

		$('.btnForward').click(function(){
			if(isClick){
				isClick = false;
				NumberOfClick++;

				carSlide.stop(false, true).animate({
					left : '-='+itemLength
				},300, function(){
					lastItem = carSlide.find('li:first');
					lastItem.remove().appendTo(carSlide);
					lastItem.css('left', ((carSlideChild.length-1)*(itemLength))+(NumberOfClick*itemLength));
					isClick = true;
				});
			}
		});

		$('.btnBackward').click(function(){
			if(isClick){
				isClick = false;
				NumberOfClick--;
				lastItem = carSlide.find('li:last');
				lastItem.remove().prependTo(carSlide);

				lastItem.css('left', itemLength*NumberOfClick);
				carSlide.finish(true).animate({
					left: '+='+itemLength
				},300, function(){
					isClick = true;
				});
			}
		});

		function refreshPosition(){
			carSlideChild.each(function(){
				$(this).css('left', itemLength*carSlideChild.index($(this)));
			});
		}
	});

	/*--- MODAL BOX ---*/

	$('a#modal-box-call').click( function(event){
		event.preventDefault(); 
		$('#modal-box-overlay').fadeIn(400, 
		 	function(){
				$('#modal-box') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '45%'}, 200);
		});
	});

	$('#modal-box-close, #modal-box-overlay').click( function(){ 
		$('#modal-box')
			.animate({opacity: 0, top: '40%'}, 200, 
				function(){ 
					$(this).css('display', 'none'); 
					$('#modal-box-overlay').fadeOut(400);
				}
			);
	});

	/*--- ACCORDION SIDEBAR MENU ---*/

	$(".sidebar-menu > li > a").click(function(event){
		event.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().children('.sidebar-submenu').slideUp();
			$(this).parent().removeClass('active');
			$(".sidebar-menu > li.active").removeClass('active');
			$(".sidebar-submenu > li.active").removeClass('active');
		} else {
			$('.sidebar-submenu').slideUp();
			$(this).parent().children('.sidebar-submenu').slideDown();
			$(".sidebar-menu > li.active").removeClass('active');
			$(this).parent().addClass('active');
			$(".sidebar-submenu > li.active").removeClass('active');
		}
	});

	$(".sidebar-submenu > li > a").click(function(event){
		event.preventDefault();
		$(".sidebar-submenu > li.active").removeClass('active');
		$(this).parent().addClass('active');
	});

	/*--- RESPONCIVE MAIN MENU ---*/

    $(".header-menu-trigger").click(function(){
        if ($(".header-menu-collapsed").hasClass("expanded")) {
            $(".header-menu-collapsed.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
        } else {
            $(".header-menu-collapsed").addClass("expanded").slideDown(250);
            $(this).addClass("open");
        }
    });

});