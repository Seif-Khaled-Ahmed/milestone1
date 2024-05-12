const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = (express)();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/softwareproj')

.then(() => {
    console.log('Connected to MongoDB');
    // Call your function to insert data here if you want to do it immediately upon connection
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const adminsc = new mongoose.Schema({
    name: String,
    password: String,

})
const admin = mongoose.model ("admins",adminsc)

const customersc = new mongoose.Schema({
    name: String,
    password: String,
    email:String,
    DOB:Date

})
const customer = mongoose.model ("Customers",customersc)

const productsc = new mongoose.Schema({
    name: String,
    price: String,
    description:String,
})
const product = mongoose.model ("products",productsc)


const ordersc = new mongoose.Schema({
    number:String,
    date:Date

})
const order = mongoose.model ("orders",ordersc)



app.get("/",function(req,res){
    res.send("express is working")
    res.sendFile(__dirname + "\register.html")
})

app.listen(3002,() =>{
    console.log ('server is running')
})
app.post("/register",async function(req,res){
    console.log("done here")
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new customer({
        name: req.body.name,
        email:req.body.email,
        password: hashedPassword,
        DOB:req.body.DOB

    })
    newUser.save()
})
app.get("/login", async (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;

        console.log("Username:", username);
        console.log("Password:", password);

        // Find the user by username
        const user = await customer.findOne({ name: username });

        console.log("User:", user);

        // If the user doesn't exist or if the password doesn't match, respond with an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid username or password");
        }

        // If the password matches, authentication successful
        // Here you can generate a JWT token and send it back to the client for further authentication
        res.send("Authentication successful");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////