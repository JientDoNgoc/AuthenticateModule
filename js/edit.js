function get_id(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
let users = JSON.parse(localStorage.getItem("users"));
let currentUser;
let imageconvert = '';


function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     imageconvert = reader.result;
     $('#preview').attr('src', reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
};

function getImage(){
  bannerImage = $('#avatar').get(0).files[0];
  image = getBase64(bannerImage);
};

$("#inputAvt").change(function() {
  getImage();
});


$(function(){
  $( "#edit-form" ).submit(function( event ) {
    event.preventDefault();
  })
  $(document).ready(function(){
    $("#datepicker").datepicker( {
          changeMonth: true,
          changeYear: true,
          showButtonPanel: true,
          maxDate: '0',
          dateFormat: 'dd MMM YYYY'
      }).on('change', function() {});
  });
  users.forEach(function(storedUser){
    if (getUrlParameter("email") === storedUser.email) {
      currentUser = storedUser;
      $("#inputUser").val(currentUser.user_name);
      $("#inputEmail").val(currentUser.email);
      $("#inputPassword").val(currentUser.password);
    }

  $("#edit-form").validate({
    rules: {
      username: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirmPassword: {
        equalTo: "#inputPassword",
        required: true,
        minlength: 6
      },
      birthday: {
        required: true,
        date: true
      },
      phone: {
        maxlength: 14
      },
    },
    submitHandler: function(form) {
      $.LoadingOverlay("show");
      let user = {
        id: get_id(),
        user_name: $("#inputUser").val(),
        first_name: $("#inputFirstName").val(),
        last_name: $("#inputLastName").val(),
        birthday: $("#datepicker").datepicker(),
        avatar: imageconvert,
        address: $("#inputAddress").val() ,
        phone: $("#inputPhone").val() ,
        gender: $("input[name='gender']:checked").val(),
        email: $("#inputEmail").val(),
        password: $("#inputPassword").val()
      }
      //users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      window.location.replace("index.html?email=" + user.email);
    }
  });
});





  // $("#edit-form").validate({
  //   rules: {
  //     password: {
  //       required: true,
  //       minlength: 6
  //     },
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
    // submitHandler: function(form) {
    //   let user = {
    //     email: $("#inputEmail").val(),
    //     password: $("#inputPassword").val()
    //   }
    //   data.forEach(function(storedUser){
    //     if (user.email === storedUser.email && user.password === storedUser.password) {
    //       window.location.replace("edit.html?" + email + "=" + storedUser.email);
    //     }
    //   });
    // }
  // });
});
