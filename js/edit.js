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
let data = JSON.parse(localStorage.getItem("users"))
let currentUser

$(function(){
  if(data && data.length === 0) {
    window.location.replace("register.html");
  }
  $( "#datepicker" ).datepicker();
  data.forEach(function(storedUser){
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
    },
    submitHandler: function(form) {
      let user = {
        id: get_id(),
        user_name: $("#inputUser").val(),
        first_name: $("#inputFirstName").val(),
        last_name: $("#inputLastName").val(),
        birthday: $( "#datepicker" ).datepicker(),
        avatar: null,
        address: '',
        phone: null,
        gender: null,
        email: $("#inputEmail").val(),
        password: $("#inputPassword").val()
      }
      let users = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      window.location.replace("index.html");
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
