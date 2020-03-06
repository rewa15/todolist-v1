const express = require("express");
const bodyParser = require("body-parser");

const date=require(__dirname+"/date.js");  // to create your own node package

const app = express();

app.use(express.static("public"));
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', 'ejs'); // taken from the EJS express documentation, set view engine to ejs. For this, views folder should exist with filename.ejs file

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{

    let day= date.getDate();
    res.render("list", {kindOfDay: day, newList: items});

});

app.post("/", function(req,res)
{
    var temp = req.body.item;
    items.push(temp);
    res.redirect("/");
});


app.listen(3000);  

