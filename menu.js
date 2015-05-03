(function ($) {

	// Draw tree
	$(function () {
		$.get('db.xml', function(d){
			$('body').append('<dl />');
		
			var	html =  '<ul class="easyui-tree">';
				html += '<span>' + $(d).attr("name") + '</span>';

				$(d).children().each(function(){ // Curriculum
					html += '<ul> <li data-options=\"state:\'closed\'\"> <span>' + $(this).attr("name") + '<span>';
					
					$(this).children().each(function(){ // lesson
						html += '<ul> <li data-options=\"state:\'closed\'\"> <span>' + $(this).attr("title") + '<span><ul>';
						
						$(this).children().each(function(){ // flashcard
							if ($(this).attr("previewdisplay")){ 
							
								html += '<li><span>' + $(this).attr("symbol") + " : " + $(this).text() + '</span></li>';
							}
						});
						html += '</ul></ul> </li> '; 
					});
					html += '</ul> </li>';	
				});
				html += '</ul><br></br>';
			$('dl').append($(html));
		});
	});
})(jQuery);