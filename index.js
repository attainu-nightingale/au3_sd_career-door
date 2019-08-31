const express = require('express');
const app = express();
const PORT =  process.env.PORT || 8080;
const hbs = require('hbs');

app.use(express.static('public'));
app.set('view engine', 'hbs');


app.get('/home', function(req, res){
    res.render('home.hbs',{
        title :"Home",
        styles:"css/home.css"
    });
});


app.listen(PORT, function(){
    console.log("listenning on PORT", PORT);
})