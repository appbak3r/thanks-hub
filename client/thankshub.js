var eventBinded = false;
var thankshub =  { 
	init: function() {
	    var thanks_button = document.createElement('a');
	    $(thanks_button).attr('href', '#');
	    $(thanks_button).text('Thanks it!');
	    $(thanks_button).addClass('minibutton thankshub_btn');

	    var thankshub_btn_list = $(thanks_button).clone();
	    thankshub_btn_list.removeClass('minibutton').addClass('button-outline thankshub_btn');
	    var thankshub_btn_list_wrapper = document.createElement('div');
	    $(thankshub_btn_list_wrapper).addClass('thankshub_btn_list_wrapper table-list-cell');
	    $(thankshub_btn_list_wrapper).append(thankshub_btn_list);
	    $('li.commit.commits-list-item').append(thankshub_btn_list_wrapper);
	    $('.details-collapse .button-group').append(thanks_button);
	    thankshub.bindEvents();

	},
	auth: function(){

	    var iframe = document.createElement('iframe');
	    $(iframe).attr('src',"https://thanks-hub.herokuapp.com/form");
	    $(iframe).addClass('thankshub_iframe');
	    thankshub.createModal("Thanks!",iframe);
	   	iframe.src = iframe.src;

	},
	bindEvents: function(){
		if (eventBinded == true) return false;
		$(document).on('click', '.thankshub_btn', function (e) {
			$('.thankshub_modal_wrapper').remove();
		    e.preventDefault();
		    var _self = $(this);
		    var reciever = $(_self.parents('.commit').find('.commit-author')).text();
		   thankshub.auth();
		});

		$(document).on('click', ".thankshub_modal_wrapper", function(e){
			e.stopPropagation();
			$(this).remove();
		});

		$(document).on('click', ".thankshub_modal_wrapper *", function(e){
			e.stopPropagation();
		});

		$(document).on('click', ".thankshub_modal_close", function(e){
			e.stopPropagation();
			$(this).parents('.thankshub_modal_wrapper').remove();
		});
		eventBinded = true;
		
	},

	createModal:  function(heading,content){
		var modal = document.createElement('div');
		var modal_wrapper = document.createElement('div');
		var modal_header = document.createElement('div');
	    var modal_body = document.createElement('div');
	    var modal_heading = document.createElement('h1');
	    $(modal_heading).text(heading);
		$(modal).addClass('thankshub_modal');
		$(modal_wrapper).addClass('thankshub_modal_wrapper');
		$(modal_header).addClass('thankshub_modal_header');
	    $(modal_header).append('<a href="#" class="thankshub_modal_close thankshub_modal_close_times right">×</a>')
		$(modal_header).append(modal_heading);
		$(modal_body).addClass('thankshub_modal_body');
		$(modal).append(modal_header);
		$(modal).append(modal_body);
		$(modal_wrapper).append(modal);
		$(modal_body).append(content);
		$('body').append(modal_wrapper);
	}


	
}

$(document).on('pjax:complete', function(){
	thankshub.init();
})
