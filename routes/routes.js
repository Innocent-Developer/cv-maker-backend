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

// post requests
router.post("/signup", signup);  // Ensure signup is a function
router.post("/login", login);    // Ensure login is a function
router.post("/addEducation", educationadd); 
router.post("/addworkinfexpression",addworkingexpression); 
router.post("/updatePlan", updatePlan); // Ensure updatePlan is a function
router.post("/submitPlanRequest", submitPlanRequest); // Ensure this is the correct path
router.post("/approvePlan",updatePlan); // Ensure this is the correct path
router.post("/buyplan",paymentHistory); // Ensure this is the correct path
router.post("/addSkills", addSkills); // Ensure this is the correct path

// get requests
router.get("/user-buy-plan",getpayementHistory); // Ensure this is the correct path
router.get("/getworkingexpression", require("../WorkingExpres/getworkingexpression")); // Ensure this is the correct path
router.get("/getSkills", require("../Skills/getskills")); // Ensure this is the correct path
router.get("/geteducations", require("../Eduaction/geteducations")); // Ensure this is the correct path
router.get("/userinformation", require("../account/userinformations")); // Ensure this is the correct path


module.exports = router; // Export the router
