console.log("hi")
$('#employeeSignup').submit(function (e) {
    console.log('hi')
     $('.errorMessage').text('');
    let signupEmployee = $('#employeeSignup');
    let endpoint = signupEmployee.attr('action');
    let employeeData= signupEmployee.serialize();
    console.log(employeeData)
    e.preventDefault();
    $.ajax({
        url: endpoint,
        type: 'POST',
        data: employeeData ,
        success: function(locationToRedirect){
            window.location = locationToRedirect;
        },
        error: function (xhr) {
            $('.errorMessage').append(xhr.responseText);
        }

    });
});