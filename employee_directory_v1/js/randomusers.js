$(document).ready(function ($) {



  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var employeeHTML = '<ul class="clearfix">';
      $.each(data.results, function(i, employee) {
        employeeHTML += '<li><a href="'+ employee.picture.large + '" class="lightbox_trigger"';
        employeeHTML += '</a>';
        employeeHTML += '<img src="' + employee.picture.large + '" width="150" height="150"';
        employeeHTML += `<h4><p class="name">${employee.name.first} ${employee.name.last}</p>`;
        employeeHTML += `<p class="email">${employee.email}</p>`;
        employeeHTML += `<p class="city">${employee.location.city}, ${employee.location.state}</p></h4>`;
        employeeHTML += '</li>'
      }); //end each
      employeeHTML += '</ul>';
      $('.employees').html(employeeHTML);
    }
  }); //end ajax

  $('body').on('click', 'li', function(event) {

    event.preventDefault();
    var image_href = $(this).children().get(0);
    console.log($(this).get(0));
    console.log($(this).children().get(0));

    // Code that makes the lightbox appear
    if ($('#lightbox').length > 0) { // #lightbox exists
    	//insert img tag with clicked link's href as src value
    	$('#content').html('<img src="' + image_href + '" />');
    	//show lightbox window - you can use a transition here if you want, i.e. .show('fast')
    	$('#lightbox').show();
    } else { //#lightbox does not exist
    	//create HTML markup for lightbox window
    	var lightbox =
      /*	'<div id="lightbox">' +
      		'<p>Click to close</p>' +
      		'<div id="content">' + //insert clicked link's href into img src
      			'<img src="' + image_href +'">' +
      		'</div>' +
      	'</div>';
        */
        `<div id="jquery-overlay"></div>
          <div id="lightbox">
            <div id="lightbox-container-image-box">
            <div id="closeBtn">
              <a href="#" id="lightbox-secNav-btnClose"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-close.gif">
            </div>
              <div id="lightbox-container-image">

              <img src="${image_href}" id="lightbox-image">
              <div id="lightbox-nav">
                <a href="#" id="lightbox-nav-btnPrev"></a>
                <a href="#" id="lightbox-nav-btnNext"></a>
              </div>
              </div>
            </div>
          </div>
          `;

    	//insert lightbox HTML into page
    	$('body').append(lightbox);


    }
  });

  $('#closeBtn').on('click', 'a', function() {
  	$('#lightbox').remove();
  });

}); //end ready
