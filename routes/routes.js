const express = require("express");
const router = express.Router();

const signup = require("../account/Signup");
const login = require("../account/Login");
const educationadd = require("../Eduaction/addEducation");
const addworkingexpression = require("../WorkingExpres/workingexpression");
const updatePlan = require("../proactive/pro-active"); // Ensure this is the correct path
const submitPlanRequest = require("../proactive/buyplan"); // Ensure this is the correct path
const paymentHistory = require("../payements/payement"); // Ensure this is the correct path
const addSkills = require("../Skills/skilladd"); // Ensure this is the correct path
const getpayementHistory = require("../payements/getpayementHistroy");
const userinformation = require("../account/userinformations");

// post requests
router.post("/signup", signup);  //  signup is a function
router.post("/login", login);    //  login is a function
router.post("/addEducation", educationadd); 
router.post("/addworkinfexpression",addworkingexpression); 
router.post("/updatePlan", updatePlan); 
router.post("/submitPlanRequest", submitPlanRequest); 
router.post("/approvePlan",updatePlan); 
router.post("/buyplan",paymentHistory); 
router.post("/addSkills", addSkills); 
router.post("/userinformation", userinformation); 
router.post("/getworkingexpression", require("../WorkingExpres/getworkingexpression")); // Ensure this is the correct path
router.post("/getSkills", require("../Skills/getskills")); // Ensure this is the correct path

// get requests
router.get("/user-buy-plan",getpayementHistory); // Ensure this is the correct path
router.get("/geteducations", require("../Eduaction/geteducations")); // Ensure this is the correct path



module.exports = router; // Export the router
