
$('.deleteButton').click(function(e){
    let reviewId = e.target.id;
    console.log(reviewId);
    $.ajax({
        url: '/review/delete/'+ reviewId,
        type: 'DELETE',
        success: function(locationToRedirect) {
            window.location = locationToRedirect;
        },
        error:function(err){
            console.log(err)
        }
    });
})