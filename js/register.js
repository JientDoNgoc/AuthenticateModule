function get_id(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
$(function() {
  // $( "#datepicker" ).datepicker();
  $("#register-form").validate({
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
      $.LoadingOverlay("show");
      let user = {
        id: get_id(),
        user_name: $("#inputUser").val(),
        first_name: '',
        last_name: '',
        birthday: null,
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
      window.location.replace("login.html");
    }
  });
});
