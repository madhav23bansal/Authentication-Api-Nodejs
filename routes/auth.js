const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');

//Validations
const { validationResult, check } = require("express-validator");

//Register New User
router.post("/register",
    [
        check("email").isEmail().withMessage("Invalid email"),
        check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 char long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        //Checking if the user is already in database
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists');

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            const savedUser = await user.save();
            res.send({user: savedUser._id});
        } catch (err) {
            res.status(400).send(err);
        }
    }
);

//Login User
router.post('/login',
    [
        check("email").isEmail().withMessage("Invalid email"),
        check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 char long"),
    ],
    (req,res)=>{
        
    }
);


module.exports = router;
