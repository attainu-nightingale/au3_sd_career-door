$.ajax({
  url: "/company/all",
  type: 'GET',
  dataType: 'json',
  success: function (companies) {
      getCompanies(companies)
  }
});

function getCompanies(companies) {
  console.log(companies);
  let str = ""
  companies.forEach(company => {
    if(!company.rating){
      company.rating = "Not Rated Yet"
    }
    else{
        company.rating = `${company.rating}/5`
    }
      str += `
      <div class = "col-6">
      <a href="/company/${company._id}" target = "_blank" class ="companyCard">
          <div class="card" style="width: 18rem;">
<img class="card-img-top style="width: 5rem;"" src="${company.logo}" alt="${company.companyName}">
<div class="card-body">
  <h5 class="card-title">${company.companyName}</h5>
  <p class="card-text">${company.country}</p>
  <p class="card-text">${company.department}</p>
  <p class="card-text">${company.rating}</p>
    <button class="btn btn-primary">Read reviews</button>
</div>
</div>
</a>
</div>
` });
console.log(str)

  $('#company').html(str);
} 
