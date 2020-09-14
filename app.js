var express        = require("express"),
	  app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose");
    
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  res.render("home");
})




app.listen(3000, function() {
	console.log("Umagine Design listening on 3000");
})