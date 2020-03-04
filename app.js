const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', 'ejs'); // taken from the EJS express documentation, set view engine to ejs. For this, views folder should exist with filename.ejs file

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    var today = new Date();
    var currDay = today.getDay();
    var day="";

    var options = { weekday: 'long', day: 'numeric', month: 'long'};
    var day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {kindOfDay: day, newList: items});

});

app.post("/", function(req,res)
{
    var temp = req.body.item;
    items.push(temp);
    res.redirect("/");
});


app.listen(3000);  

