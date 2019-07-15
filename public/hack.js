//Captures a keypress in the browser to display information.
//Kept around for future development.

import $ from 'jquery';

$(document.body).on('keypress', function (event) {
  if (event.which === 58) {
    alert('Event keypress caught.');
  }
});


