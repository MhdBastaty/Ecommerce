//I make this authintication file to make website more sequre 
//and add the register and login stuff insideit 
const router = require('express').Router();

const User = require('../models/User'); 
const CryptoJS = require("crypto-js"); // crypt the password
const jwt = require('jsonwebtoken');

//register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
});


// LOgin make
router.post("/login",async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong Credentials")
        const hashedPassword = CryptoJS.AES.decrypt (user.password,  process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Wrong Credentials");
        const {password, ...others} = user._doc;    // others means : bring all the stuff except password

        const accessToken = jwt.sign(
        {       // we're making jwt to verify the user 
            id: user._id,
            isAdmin:user.isAdmin                    // we have to keep this to check if user is admin only he can delete the product 
        },
         SECRET_KEY = process.env.jwt_SEC,
        {expiresIn:"3d"}
        )
        res.status(200).json({...others, accessToken});              //and for _doc cuz mongodb store the document inside doc folder 

    } catch (error) {
        res.status(500).json(error)
    }
});



module.exports = router
 