$( document ).ready(function() {

	$('.nav-tabs a:first').tab('show');

	$('.nav-tabs a').click(function(){
		$(this).tab('show');
	})

});

