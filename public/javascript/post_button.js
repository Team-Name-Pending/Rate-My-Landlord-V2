$("#log-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/getpost',
                dataType: 'json',
                data: {
                    'user_name': $('#inputUsername').val();,
                    'img': $('#inputFilename').val();
					'comment': $('#inputComment').val();
					'date_created': $('#inputDatecreated').val();
					'rating': $('inputRating').val();
					'address': $('inputAddress').val();
					'up_votes': $('inputUp').val();
					'down_votes': $('inputDown').val();
                },
                success: function(token){
                     $(location).attr('href', '/post' );
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
C:\Users\tadhg\AppData\Local\Temp\scp34857\students\danu7_ct\Rate-My-Landlord-V2\models\post_button.js