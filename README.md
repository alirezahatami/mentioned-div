mentioned-div
=============

A jquery plugin + php for mention something in an editable div

This version of plugin only works by GOOGLE CHROME

a very simple script for add mention in html tag into editable div (contenteditable=true).

use:
  ```html
	$('#your_editable_div').mention()
  ```
  
options:
  ```html
	$('#input').mention({
		placeholder: 'Type the name of someone or something...', //display when @ press
		callback_file: 'search.php' //Php file for search, plugin send json format
	});
  ```
