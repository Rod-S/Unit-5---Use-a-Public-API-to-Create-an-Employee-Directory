$(document).ready(function ($) {

var JSONItems = [];

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

    console.log(empArray);
    console.log($(this));
    window.currentIndex = empArray.indexOf(this);
    console.log($(empArray[currentIndex]).find('p.name').text());


    var image_href = $(this).children().get(0);
    var name = $(this).find('p.name').text();
    var email = $(this).find('p.email').text();
    var username = $(this).find('p.username').text();
    var phone = $(this).find('p.phone').text();
    var address = $(this).find('p.address').text();
    var birthday = $(this).find('p.birthday').text().slice(0,10);
    var birthdayYear = $(this).find('p.birthday').text().slice(0,4);
    var birthdayMonth = $(this).find('p.birthday').text().slice(5,7);
    var birthdayDay = $(this).find('p.birthday').text().slice(8,10);

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
    var prevImage_href = $(empArray[currentIndex]).children().get(0);
    var prevName = $(empArray[currentIndex]).find('p.name').text();
    var prevEmail = $(empArray[currentIndex]).find('p.email').text();
    var prevUsername = $(empArray[currentIndex]).find('p.username').text();
    var prevPhone = $(empArray[currentIndex]).find('p.phone').text();
    var prevAddress = $(empArray[currentIndex]).find('p.address').text();
    var prevBirthday = $(empArray[currentIndex]).find('p.birthday').text().slice(0,10);
    var prevBirthdayYear = $(empArray[currentIndex]).find('p.birthday').text().slice(0,4);
    var prevBirthdayMonth = $(empArray[currentIndex]).find('p.birthday').text().slice(5,7);
    var prevBirthdayDay = $(empArray[currentIndex]).find('p.birthday').text().slice(8,10);
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
              <img src="${prevImage_href}" id="lightbox-image">
            </div>
            <div id="employee-data">
              <p class="modalName">${prevName}</p>
              <p class="email">${prevEmail}</p>
              <p class="username">${prevUsername}</p>
              <p class="underline">_________________________________</p>
              <p class="phone">${prevPhone}</p>
              <p class="address">${prevAddress}</p>
              <p class="birthday">Birthday: ${prevBirthdayMonth}/${prevBirthdayDay}/${prevBirthdayYear}</p>
            </div>
          </div>
        </div>`;
    $('body').append(lightbox);
    $('#lightbox').remove();
  });

  $('body').on('click', '#nextBtn', function () {
    if (currentIndex == empArray.length-1) {return}
    window.currentIndex = currentIndex+1;
    var nextImage_href = $(empArray[currentIndex]).children().get(0);
    var nextName = $(empArray[currentIndex]).find('p.name').text();
    var nextEmail = $(empArray[currentIndex]).find('p.email').text();
    var nextUsername = $(empArray[currentIndex]).find('p.username').text();
    var nextPhone = $(empArray[currentIndex]).find('p.phone').text();
    var nextAddress = $(empArray[currentIndex]).find('p.address').text();
    var nextBirthday = $(empArray[currentIndex]).find('p.birthday').text().slice(0,10);
    var nextBirthdayYear = $(empArray[currentIndex]).find('p.birthday').text().slice(0,4);
    var nextBirthdayMonth = $(empArray[currentIndex]).find('p.birthday').text().slice(5,7);
    var nextBirthdayDay = $(empArray[currentIndex]).find('p.birthday').text().slice(8,10);

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
              <img src="${nextImage_href}" id="lightbox-image">
            </div>
            <div id="employee-data">
              <p class="modalName">${nextName}</p>
              <p class="email">${nextEmail}</p>
              <p class="username">${nextUsername}</p>
              <p class="underline">_________________________________</p>
              <p class="phone">${nextPhone}</p>
              <p class="address">${nextAddress}</p>
              <p class="birthday">Birthday: ${nextBirthdayMonth}/${nextBirthdayDay}/${nextBirthdayYear}</p>
            </div>
          </div>
        </div>`;
    $('body').append(lightbox);
    $('#lightbox').remove();
  });

  //creation of input box, button and student search functionality
  function searchList(employeeList) {
    $('.header h3').append('<div class="employee-search"><input id=search placeholder="Search for employees..."><button id=searchButton>Search</button>');
    $('#searchButton').on("click", function() {
      //removal of DOM message to avoid duplication during multiple failed search attempts
      $('.notFound').remove();
      //remove class to avoid previously matched students from appearing
      $('.clearfix li').removeClass('match');
      let searchFilter = $(this).prev().val().toUpperCase();
      //conditional that takes input value and checks against h3(student name) or email class(student email)
      //then hides or shows names based on checks
      if (searchFilter != '') {
        //show or hide elements that are matched to searchFilter input
        $(studentList).find("h3:Contains(" + searchFilter + ")").parent().parent().show();
        $(studentList).find(".email:Contains(" + searchFilter + ")").parent().parent().show();
        $(studentList).find("h3:not(:Contains(" + searchFilter + "))").parent().parent().hide();
        $(studentList).find(".email:not(:Contains(" + searchFilter +"))").parent().parent().hide();
        //add class for matched students that are now visible
        $('.student-item:visible').addClass('match');
        //place matched students in variable
        $match = $('.match');
        //remove previous pagination div to avoid link duplication
        $('.pagination').remove();
        //call appendPageLinks on new student list: $match
        if ($match.length > 10){

        };
        //conditional for message to append to DOM if no students found
        if ($('.student-item').is(':visible') == false) {
          //remove class to avoid previously matched students from appearing
          $('li').removeClass('match');
          //conditional for alert to run if input box is blank
          $('.student-list').prepend('<div id=noStudent><h2>No Students Found with Name or Email:  ' + $(this).prev().val() + '  </h2></div>');
        }
      } else if (searchFilter == '') {
        //remove class to avoid previously matched students from appearing
        $('li').removeClass('match');
        //Remove pagination div to avoid pageLink duplication between $match and original studentList
        $('.pagination').remove();
        //Remove previous div containing input/button to avoid duplication
        $('.student-search').remove();
        $('.header').append(`<h3 class="notFound">No Employees Found.</h3>`);
        //call defaultLoad function
        defaultLoad();
      }
    });
  };
  searchList();

  const defaultLoad = () => {
    $('.clearfix li').hide();
    }


  $('#search').keyup(function(){
   var valThis = $(this).val().toLowerCase();
   $('.clearfix li').each(function(){
      $(this).removeClass('nameMatch');
      $(this).removeClass('userMatch');
      $(this).removeClass('noNameMatch');
      $(this).removeClass('noUserMatch');
      var name = $(this).find('p.name').text().toLowerCase();
      var user = $(this).find('p.username').text().toLowerCase();
      /* (name.indexOf(valThis) > -1) ? $(this).addClass('nameMatch') : $(this).addClass('noNameMatch');
      (user.indexOf(valThis) > -1) ? $(this).addClass('userMatch') : $(this).addClass('noUserMatch');
      */
      //window.empArray = $('li:visible');
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
