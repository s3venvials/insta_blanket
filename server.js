const express = require("express"),
    app = express(),
    dotenv = require("dotenv").config(),
    passport = require("passport");
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    keys = require("./config/keys"),
    port = process.env.PORT || 9000,
    host = process.env.HOST || 'localhost';

let StartApp = async () => {
    try {

        require('./models/User');
        require('./services/insta.passport');

        await mongoose.connect(keys.mongoURI,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });

        app.use(cors(keys.corsOptions));
        app.use(cookieParser());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        require("./routes/user.routes")(app, passport);

        app.get("/test", (req, res) => {
            res.send({ "test": "Connected successfully!" });
        });

        app.listen(port, host, (error) => {
            if (error) {
                throw error;
            } else {
                console.log(`App server started on: ${host}:${port}`);
            }
        });

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

StartApp();