let data = JSON.parse(localStorage.getItem("users"))

$(function(){
  if(data && data.length === 0) {
    window.location.replace("register.html");
  }

  $("#login-form").validate({
    rules: {
      password: {
        required: true,
        minlength: 6
      },
      email: {
        required: true,
        email: true
      }
    },
    submitHandler: function(form) {
      $.LoadingOverlay("show");
      let user = {
        email: $("#inputEmail").val(),
        password: $("#inputPassword").val()
      }
      data.forEach(function(storedUser){
        if (user.email === storedUser.email && user.password === storedUser.password) {
          window.location.replace("edit.html?email=" + storedUser.email)
        }
      });
    }
  });
});
