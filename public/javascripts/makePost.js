$(document).ready(
	function() {
		$("#log-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/posts/addPost',
                dataType: 'json',
                data: {
                    comment: $('#review').val(),
                    rating: $('#Rating').val(),
                    address: $('#address').val()
                },
                success: function(token){
                     $(location).attr('href', '/' );
          // Redirect to logged in page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        });
	}
);
