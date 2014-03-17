mentioned-div
=============

A jquery plugin + php for mention something in an editable div

a very simple script for add mention in html tag into editable div (contenteditable=true).

use:
  $('#your_editable_div').mention()
  
options:
  $('#input').mention({
    placeholder: 'Type the name of someone or something...', //display when @ press
	  callback_file: 'search.php' //Php file for search, plugin send json format
	});
