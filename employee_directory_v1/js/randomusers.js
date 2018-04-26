$(document).ready(function () {



  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var employeeHTML = '<ul class="clearfix">';
      $.each(data.results, function(i, employee) {
        employeeHTML += '<li><a href="'+ employee.picture.large + '" ';
        employeeHTML += 'rel="lightbox"</a>';
        employeeHTML += '<img src="' + employee.picture.large + '" width="150" height="150"';

        employeeHTML += `<h4><p class="name">${employee.name.first} ${employee.name.last}</p>`;
        employeeHTML += `<p class="email">${employee.email}</p>`;
        employeeHTML += `<p class="city">${employee.location.city}, ${employee.location.state}</p></h4>`;
        employeeHTML += '</a></li>'
      }); //end each
      employeeHTML += '</ul>';
      $('.employees').html(employeeHTML);
    }
  }); //end ajax

}); //end ready
