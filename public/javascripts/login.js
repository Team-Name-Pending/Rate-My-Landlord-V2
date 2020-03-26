$(document).ready(
    function() {
        //Event handler when user attemps to register
        $("#registerbutton").click(function (event) {
            console.log("I've been called");
            $.ajax({
                url: '/users/login/',
                type: 'POST',
                data: {user_name:$('#loginUsername').val(), password:$('#loginPassword').val()},
                success: function (token) {
                    $(location).attr('href', '/');
                }
            });
        });
	}
);