const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //"notice" is a class name for the css to use
  req.flash("notice", "This a flash message.")
  res.render("index", {title: "Home", nav})
}

module.exports = baseController