const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

mongoose.connect("process.env.MONGO_URI")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

const userS = new mongoose.Schema(
    {
        name : String,
        number : Number
    });
const User = mongoose.model("User", userS);

app.post("/save", async(req, res)=> {
    try{
        const user = new User({
            name : req.body.name,
            number : req.body.number
        });
    
        await user.save();

        res.json({ message: "Saved" });

    }catch(err){
        res.json({ message: "Error" });
    }

});




app.post("/search", async (req, res) => {
    try {
        const number = req.body.number;

        const user = await User.findOne({ number: number });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        res.json({ name: user.name });

    } catch (err) {
        res.json({ message: "Error searching" });
    }
});



app.listen(3001,"0.0.0.0", () => {
    console.log("Server running on port 3001");
});