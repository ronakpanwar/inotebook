const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { query, validationResult } = require('express-validator');//code copy for "express - validator"
const bcrypt = require('bcryptjs');//to sequre the password
const jwt = require('jsonwebtoken'); // to create intermidate between use  and server 
const fetchuser = require('../midleware/fetchuser');
const JWT_SECRET = "ronakgoodboy$";

//ROUTE - 1: create a User using:POST  "/api/auth/createuser". no login required 
router.post('/createuser', [
   query('name', 'Enter the valid name').isLength({ min: 3 }),
   query('email', 'Enter valid email').isEmail(),
   query('password').isLength({ min: 5 }),
], async (req, res) => {
   let sucsess = false;
   // if the errors  comes return bad requests and errors
   const result = validationResult(req);
   if (!result.isEmpty()) {
      return res.status(400).json({ sucsess, errors: result.array() });
   }

   // cheak whether the user with this email  excists alredy
   try {


      let user = await User.findOne(req.query.email);
      if (user) {
         return res.status(400).json({sucsess, errors: "sorry this email user alredy excist" })
      }

      // bcrypt as packeg of this - salt & hash use to save the password and converd passworde as like -"abjhkj234412@"
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.query.password, salt);


      //give the data as a user
      user = await User.create({
         name: req.query.name,
         email: req.query.email,
         password: secPass

      });

      //to give the use token to identify the user 
      const data = {
         user: {
            id: user.id
         }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      sucsess = true; 
      res.json({sucsess, authToken })
      //res.json(user)
      //.catch(err=> console.log(err));
   } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
   }

})

//ROUTE -2:  Authanticate  a User using:POST  "/api/auth/login". no login required 
router.post('/login', [

   query('email', 'Enter valid email').isEmail(),
   query('password', 'password cannot be blank').exists(),
], async (req, res) => {
   let sucsess = false;
   const result = validationResult(req);
   if (!result.isEmpty()) {
      return res.status(400).json({sucsess, errors: result.array() });
   }

   const { email, password } = req.query;
   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({sucsess, errors: 'plese enter the correct information' });
      }

      const passwordcode = await bcrypt.compare(password, User.password);
      if (!passwordcode) {
         return res.status(400).json({sucsess, errors: 'plese enter the correct information' });
      }

      const data = {
         user: {
            id: user.id
         }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
       sucsess = true;
      res.json({sucsess, authToken })

   } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
   }

})

//ROUTE -3:  get user detail information using:POST  "/api/auth/createuser".  login required
router.post('/getuser', fetchuser, async (req, res) => {

   try {
      let userid = req.user.id;
      const user = await user.findById(userid).select("-password");
      res.send(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
   }
})

module.exports = router