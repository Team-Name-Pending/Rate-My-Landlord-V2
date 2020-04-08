$(document).ready(
    function() {  
			const mode = "most_recent";
            $.ajax({
                url: '/posts/getPosts/',
                type: 'GET',
                dataType: 'json',
				data: {'mode' : mode},
                success: function (data) {
                    console.log(data)
					var posts = "";
                    for (var i = 0; i < data.length; i++) 
					{
                        posts += "<div class='row justify-content-md-center pt-4'>" +
                            "<div class='card col-md-6'><div class='row'>"
                            + "<div class='col-md-9'>"+ data[i].user_name+ "<br>"+data[i].comment+"<br> "+data[i].rating+"</div>" + "<div class='col-md-3'>"+
                            "</div></div></div></div>";
                    }
                    $("#recentPosts").html(posts);
                }
            });     
        });
