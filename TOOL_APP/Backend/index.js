require("dotenv").config();
const User = require("./models/user.model");
const port = 8000;

const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");

const { authenticate } = require("./utilities");
const handleLog = require("./middleware/log");
const handleLogRequest = require("./controllers/logRequest");

app.use(express.json());

//using middleware cors that allow any domain to make requests. 
app.use(
    cors({
        origin: "*",
    })
)

app.use(handleLog);

app.get("/", (req, res) => {
    handleLogRequest(req, res);
    res.json({ data: "king" });
});

//signup
app.post("/signup", async (req, res) => {

    //taking input from the user
    const { fullName, email, password } = req.body;

    // checking if all the credinatls are present or not 
    if (!fullName) {
        return res.status(400).json({
            error: true, message: "name is required"
        })
    }

    if (!email) {
        return res.status(400).json({
            error: true,
            message: "Email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        })
    }


    //checking if user is present or not.
    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "user is already existed",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save() // saving the information of an user

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    })

});


//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            error: true,
            message: "Email is required",
        })
    }

    if (!password) {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        })
    }

    const userEmail = await User.findOne({ email: email })

    if (!userEmail) {
        return res.status(400).json({
            error: true,
            message: "user not found"
        });
    }

    if (userEmail.email == email && userEmail.password == password) {
        const user = { user: userEmail };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        
        return res.status(400).alert("Invalid Credentials").json({
            error: true,
            message: "Invalid credentials",
        });
    }

})

//getting-user
app.get("/get-user", authenticate, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({
        _id: user._id
    });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            Name: user.Name,
            email: isUser.email,
            _id: isUser._id,
        }
        , message: "User info"
    })
})


//app is listening on port 8000.
app.listen(port || process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
})


module.exports = app;