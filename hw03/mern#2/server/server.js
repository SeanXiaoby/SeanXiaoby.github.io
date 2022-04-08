// To connect with your mongoDB database
const mongoose = require('mongoose');

// CHANGE the username,password,link to be yours!
mongoose.connect('mongodb+srv://csci571db:1998629h98@cluster0.h09hy.mongodb.net/',{
    dbName: 'myBands',
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// schema for our table called 'users'
const BandsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    formyear: {
        type: String,
        required: true,
    },
});
const User = mongoose.model('bands', BandsSchema); // creates a 'users' table
//\\User.createIndexes();

// express middleware
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
  // go to http://localhost:5000 to see this
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        // .save() sends data to our cloud DB, more here: https://masteringjs.io/tutorials/mongoose/save
        let result = await user.save(); 
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);  
            console.log(result);
        } else {
            console.log("User already registered");
        }

    } catch (e) {
        resp.send("Something went wrong");
    }
});
app.listen(5000);