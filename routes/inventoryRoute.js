const express = require("express")
const router = new express.Router() 
const utilities = require('../utilities/')
const invController = require("../controllers/invController")

// Route for /inv only
router.get("/", invController.buildManagement);

// Routes for /inv additions
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", utilities.handleErrors(invController.addClassification))

router.get("/add-inventory", invController.buildAddInventory)
router.post("/add-inventory", utilities.handleErrors(invController.addInventory))

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by item detail view 
router.get("/detail/:invId", invController.buildByInvId);

module.exports = router;