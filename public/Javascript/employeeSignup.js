$('#employeeSignup').submit(function (e) {
    
    $('.errorMessage').text('');
    let signupEmployee = $('#employeeSignup');
    let endpoint = signupEmployee.attr('action');
    let employeeData= signupEmployee.serialize();
    e.preventDefault();
    $.ajax({
        url: endpoint,
        type: 'POST',
        data: employeeData ,
        success: function (locationToRedirect) {
            console.log(locationToRedirect)
            window.location = locationToRedirect
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $('.errorMessage').append(xhr.responseText);
        }

    });
});