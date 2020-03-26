$(document).ready(
    function() {
        //Event handler when user attemps to register
        $("#registerbutton").click(function (event) {
            console.log("I've been called");
			if($('#Registerpassword').val() != $('#confirmRegPassword').val()){
				window.alert('Passwords in both text boxes are not the same!');
			}
			else{
            $.ajax({
                url: '/users/register/',
                type: 'POST',
                data: {user_name:$('#registerUsername').val(), email:$('#Registeremail').val(), password:$('#Registerpassword').val()},
                success: function (data) {
                    $(location).attr('href', '/login');
                }
            });
			}
        });
	}
);