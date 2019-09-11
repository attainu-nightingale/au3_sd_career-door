$.ajax({
  url: "/company/all",
  type: 'GET',
  dataType: 'json',
  success: function (companies) {
      getCompanies(companies)
  }
});

function getCompanies(companies) {
    let str = ""
    companies.forEach(company => {
        str += `<div class = container>
        <a href="/company/${company._id}" target = "_blank" class ="companyCard">
            <div class="card" style="width: 18rem;">
  <img class="card-img-top style="width: 5rem;"" src="${company.logo}" alt="${company.companyName}">
  <div class="card-body">
    <h5 class="card-title">${company.companyName}</h5>
    <p class="card-text">${company.city}, ${company.country}</p>
    <p class="card-text">${company.department}</p>
      <button class="btn btn-primary">Read reviews</button>
  </div>
</div>
</a> </div>
 ` });
    
    $('#company').html(str);
}
