/*
 * Mentioned Div
 * Written by: Alireza Hatami
 *
 * Using jquery.js
 *
 * License: MIT License - http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
	$.fn.mention = function(options) {

		var defaults = {
			placeholder: 'Type the name of someone or something...',
		    callback_file: 'a_php_file.php'
		};
		options = $.extend({}, defaults, options);

		//Helper Functions
		function placeCaretAtEnd(el) {
		    el.focus();
		    if (typeof window.getSelection != "undefined"
		            && typeof document.createRange != "undefined") {
		        var range = document.createRange();
		        range.selectNodeContents(el);
		        range.collapse(false);
		        var sel = window.getSelection();
		        sel.removeAllRanges();
		        sel.addRange(range);
		    } else if (typeof document.body.createTextRange != "undefined") {
		        var textRange = document.body.createTextRange();
		        textRange.moveToElementText(el);
		        textRange.collapse(false);
		        textRange.select();
		    }
		}

		function loadphp(filename, data) {
		    return $.ajax({
		        type: "POST",
		        url: filename,
		        data: {data: JSON.stringify(data)}
		    });
		}

		//Main Functions
		var start = /@/ig; // @ Match
		var word = /@(\w.+)/ig; //@abc Match
		var display_id = 'display';
		var display = '';
		var msgbox_id = 'msg';
		var msg = '';
		var editable = '';
		var htmlcaret_class = 'mentioned';
		var htmladded_class = 'add_mention';
		var placeholder = options.placeholder;
		var mentioned = '';
		var is_like = false;
		var before_data = '';

		$(this).on("keyup",function(e) {
			editable = $(this);
			display = $(this).parent().children("#"+display_id);
			msg = $(this).parent().children("#"+msgbox_id);
			if(!display.length) $('<div id="'+display_id+'"></div>').insertAfter($(this)).hide();
			if(!msg.length) $('<div id="'+msgbox_id+'"></div>').insertAfter($(this)).hide();
			if($(this).html().length == 0) {
				display.hide().remove();
				msg.hide().remove();
			}
			var editable_content = editable.text(); //Content Data
			var go = editable_content.match(start); //Content Matching @
			var name = editable_content.match(word); //Content Matching @abc
			
			display.children('.'+htmladded_class).each(function() {
				var node_value = $(this).html();
				if(name == '@'+node_value.slice('0', mentioned.length).toLowerCase()) is_like = true;
				else is_like = false;
			})

			if(go.length > 0) { //Length of matched before trigger @
				msg.html(options.placeholder).show();
				mentioned = new Text(name);
				if(name.length > 0 && !is_like) {
					var data = [
						{do:'search'},
						{term:name}
					];
					//Start Loader (optional)
					$.when(loadphp(options.callback_file, data)).done(function(data) {
						//Wait for load php
						//EOF Loader (optional)
						show_suggest(data);
					});
				}
			}
			return false;
		});

		function show_suggest(data) {
			display.html(data).show();
			msg.hide().remove();
		}

		$(document).on("click", "."+htmladded_class, function() {
			var title = $(this).attr('title');
			var uid = $(this).attr('uid');
			var old = editable.html();
			var content = old.replace(word," "); //replacing @abc to (" ") space
			editable.html(content);
			var E = "<a class='"+htmlcaret_class+"' contenteditable='false' href='#'>"+title+"</a>&nbsp;";
			editable.append(E);
			display.hide().remove();
			msg.hide().remove();
			is_like = false;
			before_data = '';
			var idname = editable.attr('id');
			placeCaretAtEnd(document.getElementById(idname));
		});
	};
}(jQuery));