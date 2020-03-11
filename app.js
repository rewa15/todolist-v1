const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

// const date=require(__dirname+"/date.js");  // to create your own node package

const app = express();

app.use(express.static("public"));
// var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', 'ejs'); // taken from the EJS express documentation, set view engine to ejs. For this, views folder should exist with filename.ejs file

app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = {   // create a new schema called itemsSchema
	name: String
};

const Item = mongoose.model("Item", itemsSchema); // create a mongoose model

const item1 = new Item({
    name: "Welcome to the to-do list"
});

const item2 = new Item({
    name: "Press the + button to add items"
});

const item3 = new Item({
    name: "Add your daily tasks and delete as you complete them!"
});

const defaultItems=[item1,item2,item3];

app.get("/", function(req,res)
{

Item.find(function(err, foundItems)
{
   if(foundItems.length==0)
   {
   	 Item.insertMany(defaultItems, function(error) {

   });
   	 res.redirect("/");
   }
   else
     res.render("list", {kindOfDay: "Today", newList: foundItems});
});
 
});

app.post("/", function(req,res)
{
    const temp = req.body.item;

    const item = new Item({
    	name: temp
    })

    item.save();
    res.redirect("/");
});

app.post("/delete", function(req,res)
{
   const checkedItemId = req.body.checkbox;
   Item.findByIdAndRemove(checkedItemId, function(err) {
   	
   	if(!err)
   	{
   		res.redirect("/");
   	}

   });
});


app.listen(3000);  

