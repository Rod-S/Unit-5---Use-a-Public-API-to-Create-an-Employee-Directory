$(document).ready(function ($) {

var JSONItems = [];
var image_href;
var name;
var email;
var username;
var phone;
var address;
var birthday;
var birthdayYear;
var birthdayMonth;
var birthday;

$.ajax({

    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var employeeHTML = '<ul class="clearfix">';
      $.each(data.results, function(i, employee) {
        employeeHTML += '<li class="employee"><a href="'+ employee.picture.large + '" class="lightbox_trigger"';
        employeeHTML += '</a>';
        employeeHTML += '<img src="' + employee.picture.large + '" width="150" height="150"';
        employeeHTML += `<h4><p class="name">${employee.name.first} ${employee.name.last}</p>`;
        employeeHTML += `<p class="email">${employee.email}</p>`;
        employeeHTML += `<p class="city">${employee.location.city}, ${employee.location.state}</p></h4>`;
        employeeHTML += `<p class="phone">${employee.cell}</p>`;
        employeeHTML += `<p class="address">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>`;
        employeeHTML += `<p class="birthday">${employee.dob}</p>`;
        employeeHTML += `<p class="username">${employee.login.username}</p>`;
        employeeHTML += '</li>'
      }); //end each
      employeeHTML += '</ul>';
      $('.employees').html(employeeHTML);

      $('.phone').hide();
      $('.address').hide();
      $('.birthday').hide();
      $('.username').hide();


      //window.JSONItems = data.results;
      window.empArray = $.makeArray($('.clearfix li:visible'));
    }
  }); //end ajax




  $('body').on('click', 'li', function(event) {
    event.preventDefault();

    window.currentIndex = empArray.indexOf(this);

    image_href = $(this).children().get(0);
    name = $(this).find('p.name').text();
    email = $(this).find('p.email').text();
    username = $(this).find('p.username').text();
    phone = $(this).find('p.phone').text();
    address = $(this).find('p.address').text();
    birthday = $(this).find('p.birthday').text().slice(0,10);
    birthdayYear = $(this).find('p.birthday').text().slice(0,4);
    birthdayMonth = $(this).find('p.birthday').text().slice(5,7);
    birthdayDay = $(this).find('p.birthday').text().slice(8,10);

    // Code that makes the lightbox appear
    if ($('#lightbox').length > 0) { // #lightbox exists
    	//insert img tag with clicked link's href as src value
    	$('#content').html('<img src="' + image_href + '" />');
    	//show lightbox window - you can use a transition here if you want, i.e. .show('fast')
    	$('#lightbox').show();
    } else { //#lightbox does not exist
    	//create HTML markup for lightbox window
    	var lightbox =
          `
           <div id="lightbox">
            <div id="lightbox-container-image-box">
              <div id="closeBtn">
                <a href="#" id="lightbox-secNav-btnClose"> </a>
                <img src="../employee_directory_v1/images/lightbox-btn-close.gif">
              </div>
              <div id ="prevBtn">
                <a href="#" id="lightbox-secNav-btnPrev"> </a>
                <img src="../employee_directory_v1/images/lightbox-btn-prev.gif">
              </div>
              <div id ="nextBtn">
                <a href="#" id="lightbox-secNav-btnNext"> </a>
                <img src="../employee_directory_v1/images/lightbox-btn-next.gif">
              </div>
              <div id="lightbox-container-image">
                <img src="${image_href}" id="lightbox-image">
              </div>
              <div id="employee-data">
                <p class="modalName">${name}</p>
                <p class="email">${email}</p>
                <p class="username">${username}</p>
                <p class="underline">_________________________________</p>
                <p class="phone">${phone}</p>
                <p class="address">${address}</p>
                <p class="birthday">Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}</p>
              </div>
            </div>
          </div>`;

    	//insert lightbox HTML into page
    	$('body').append(lightbox);


    }
  });

  $('body').on('click', '#closeBtn', function() {
  	$('#lightbox').remove();
  });

  $('body').on('click', '#prevBtn', function () {

    if (currentIndex == 0) {return}
    window.currentIndex = currentIndex - 1;
    image_href = $(empArray[currentIndex]).children().get(0);
    name = $(empArray[currentIndex]).find('p.name').text();
    email = $(empArray[currentIndex]).find('p.email').text();
    username = $(empArray[currentIndex]).find('p.username').text();
    phone = $(empArray[currentIndex]).find('p.phone').text();
    address = $(empArray[currentIndex]).find('p.address').text();
    birthday = $(empArray[currentIndex]).find('p.birthday').text().slice(0,10);
    birthdayYear = $(empArray[currentIndex]).find('p.birthday').text().slice(0,4);
    birthdayMonth = $(empArray[currentIndex]).find('p.birthday').text().slice(5,7);
    birthdayDay = $(empArray[currentIndex]).find('p.birthday').text().slice(8,10);
    var lightbox =
        `
         <div id="lightbox">
          <div id="lightbox-container-image-box">
            <div id="closeBtn">
              <a href="#" id="lightbox-secNav-btnClose"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-close.gif">
            </div>
            <div id ="prevBtn">
              <a href="#" id="lightbox-secNav-btnPrev"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-prev.gif">
            </div>
            <div id ="nextBtn">
              <a href="#" id="lightbox-secNav-btnNext"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-next.gif">
            </div>
            <div id="lightbox-container-image">
              <img src="${image_href}" id="lightbox-image">
            </div>
            <div id="employee-data">
              <p class="modalName">${name}</p>
              <p class="email">${email}</p>
              <p class="username">${username}</p>
              <p class="underline">_________________________________</p>
              <p class="phone">${phone}</p>
              <p class="address">${address}</p>
              <p class="birthday">Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}</p>
            </div>
          </div>
        </div>`;
    $('body').append(lightbox);

    $('#lightbox').remove();
  });

//next user button results functionality
  $('body').on('click', '#nextBtn', function () {
    if (currentIndex == empArray.length-1) {return}
    window.currentIndex = currentIndex+1;
    image_href = $(empArray[currentIndex]).children().get(0);
    name = $(empArray[currentIndex]).find('p.name').text();
    email = $(empArray[currentIndex]).find('p.email').text();
    username = $(empArray[currentIndex]).find('p.username').text();
    phone = $(empArray[currentIndex]).find('p.phone').text();
    address = $(empArray[currentIndex]).find('p.address').text();
    birthday = $(empArray[currentIndex]).find('p.birthday').text().slice(0,10);
    birthdayYear = $(empArray[currentIndex]).find('p.birthday').text().slice(0,4);
    birthdayMonth = $(empArray[currentIndex]).find('p.birthday').text().slice(5,7);
    birthdayDay = $(empArray[currentIndex]).find('p.birthday').text().slice(8,10);

    var lightbox =
        `
         <div id="lightbox">
          <div id="lightbox-container-image-box">
            <div id="closeBtn">
              <a href="#" id="lightbox-secNav-btnClose"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-close.gif">
            </div>
            <div id ="prevBtn">
              <a href="#" id="lightbox-secNav-btnPrev"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-prev.gif">
            </div>
            <div id ="nextBtn">
              <a href="#" id="lightbox-secNav-btnNext"> </a>
              <img src="../employee_directory_v1/images/lightbox-btn-next.gif">
            </div>
            <div id="lightbox-container-image">
              <img src="${image_href}" id="lightbox-image">
            </div>
            <div id="employee-data">
              <p class="modalName">${name}</p>
              <p class="email">${email}</p>
              <p class="username">${username}</p>
              <p class="underline">_________________________________</p>
              <p class="phone">${phone}</p>
              <p class="address">${address}</p>
              <p class="birthday">Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}</p>
            </div>
          </div>
        </div>`;
    $('body').append(lightbox);
    $('#lightbox').remove();
  });


  //creation of employee search textbox
  function searchList(employeeList) {
    $('.header h3').append('<div class="employee-search"><input id=search placeholder="Search for employees...">');

  };
  searchList();

//name and username filter functionality
  $('#search').keyup(function(){
   var valThis = $(this).val().toLowerCase();
   $('.clearfix li').each(function(){
      $(this).removeClass('nameMatch');
      $(this).removeClass('userMatch');
      $(this).removeClass('noNameMatch');
      $(this).removeClass('noUserMatch');
      var name = $(this).find('p.name').text().toLowerCase();
      var user = $(this).find('p.username').text().toLowerCase();

      window.empArray = $.makeArray($('.clearfix li:visible'))
      if (name.indexOf(valThis) > -1) {
        $(this).addClass('nameMatch').show();
      } else if (name.indexOf(valThis) == -1) {
        $(this).addClass('noNameMatch');
      }
      if (user.indexOf(valThis) > -1) {
        $(this).addClass('userMatch').show();
      } else if (user.indexOf(valThis) == -1) {
        $(this).addClass('noUserMatch');
      }
      if ($(this).hasClass('noNameMatch')) {
        if ($(this).hasClass('noUserMatch')) {
          $(this).hide();
        }
      }
      if ($(this).hasClass('noUserMatch')) {
        if ($(this).hasClass('noNameMatch')) {
          $(this).hide();
        }
      }
    });
  });

}); //end ready
