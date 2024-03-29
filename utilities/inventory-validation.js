const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRule = () => {
  return [
    // name is required and must be string
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .isAlpha()
      .withMessage("Provide a correct classification name."),
  ];
};

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/addClassification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

validate.inventoryRule = () => {
  return [
    body("classification_id")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Select a classification."),
    body('inv_make')
    .trim()
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage('Provide a correct make.'),
    body('inv_model')
    .trim()
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage('Provide a correct model.'),
    body("inv_year")
    .trim()
    .isLength({ min: 4, max: 4})
    .isNumeric()
    .withMessage("Provide a correct year."),
    body("inv_description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Provide a correct description."),
    body("inv_price")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Provide a correct price."),
    body("inv_miles")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Provide a correct miles."),
    body("inv_color")
    .trim()
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Provide a correct color."),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
  let classificationList = await utilities.buildClassificationList();
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/addInventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationList,
    });
    return;
  }
  next();
};

module.exports = validate;