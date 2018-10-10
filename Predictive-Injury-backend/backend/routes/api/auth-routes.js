// routes/auth-routes.js

const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// require the user model !!!!
const User = require("../../models/User");

// authRoutes.post("/signup", (req, res, next) => {
//   if (!req.body.username || !req.body.password) {
//     res
//       .status(400)
//       .json({ message: "Identify yourself, with a Username and Password" });
//     return;
//   }

//   if (req.body.password.length < 8) {
//     res.status(400).json({ message: "Please enter an 8 digit password" });
//   }

//   User.findOne({
//     // email: req.body.email,
//     username: req.body.username
//   })
//     .then(userFromDb => {
//       if (userFromDb !== null) {
//         res.status(400).json({
//           message: "Username/Email is taken. Please enter valid Email/Username."
//         });
//         return;
//       }

//       const salt = bcrypt.genSaltSync(10);
//       const hashPass = bcrypt.hashSync(req.body.password, salt);

//       const aNewUser = new User({
//         username: req.body.username,
//         password: hashPass
//         // firstName: req.body.firstName,
//         // lastName: req.body.lastName,
//         // email: req.body.email
//       });
//       console.log("-------Creating User-------", aNewUser);
//       User.create(aNewUser);
//       return;
//     })
//     .then(userResponseFromDb => {
//       console.log("==========Response=======", userResponseFromDb);
//       res.json(userResponseFromDb);
//     })
//     .catch(err => {
//       next(err);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

//-------OG Signup route-------------
authRoutes.post("/signup", (req, res, next) => {
  // console.log(req.body);

  // const img = req.body.img;
  const sport = req.body.sport;
  const league = req.body.league;
  const team = req.body.team;
  const staffingDivision = req.body.staffingDivision;
  const role = req.body.role;
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 7 characters long for security purposes."
    });
  }
  User.findOne(
    {
      username: req.body.username
    },
    (err, foundUser) => {
      if (foundUser) {
        res.status(400).json({
          message: "Username taken. Choose another one."
        });
        return;
      }

      if (err) {
        res.status(500).json({
          message: "Username check went bad."
        });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        // img: img,
        sport: sport,
        league: league,
        team: team,
        staffingDivision: staffingDivision,
        role: role,
        name: name,
        username: username,
        password: hashPass
      });

      aNewUser.save(err => {
        if (err) {
          res.status(400).json({
            message: "Saving user to database went wrong."
          });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(aNewUser, err => {
          //   // Send the user's information to the frontend
          //   // We can use also: res.status(200).json(req.user);
          res.status(200).json(aNewUser);
        });
      });
    }
  );
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong authenticating user"
      });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({
          message: "Session save went bad."
        });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({
    message: "Log out success!"
  });
});

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({
    message: "Unauthorized"
  });
});

module.exports = authRoutes;
