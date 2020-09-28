var express        = require("express"),
	  app            = express(),
    bodyParser     = require("body-parser"),
    bodyParser 		 = require('body-parser'),
    Booking		     = require('./models/booking'),
    mongoose       = require("mongoose");
    
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DATABASEURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(() => {
	console.log("Connected to db!")
}).catch(err => {
	console.log('ERROR:', err.message)
})

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  res.render("home");
})

app.get("/portfolio", function(req, res) {
  res.render("portfolio");
})

app.get("/process", function(req, res) {
  res.render("process");
})

app.get("/book", function(req, res) {
  res.render("book");
})

app.post("/book", (req, res) => {
	Booking.create(req.body.booking, (err, booking) => {
		if(err) {
			console.log("Couldn't make reservation, sorry!")
		}else {
			booking.save();
      res.redirect("/book")
		}
	})
})




app.listen(3000, function() {
	console.log("Umagine Design listening on 3000");
})