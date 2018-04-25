$(document).ready(function () {



  $.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var employeeHTML = '<ul class="clearfix">';
      $.each(data.results, function(i, employee) {
        employeeHTML += '<li><a href="'+ employee.picture.large + '" ';
        employeeHTML += 'rel="lightbox"</a>';
        employeeHTML += '<img src="' + employee.picture.large + '" width="150" height="150"';
        employeeHTML += '</a>'
        employeeHTML += `<h4>${employee.name.first} ${employee.name.last}</h4></li>`;
      }); //end each
      employeeHTML += '</ul>';
      $('.employees').html(employeeHTML);
    }
  }); //end ajax

}); //end ready
