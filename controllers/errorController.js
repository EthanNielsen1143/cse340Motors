exports.renderErrorPage = (req, res) => {
    const errorTitle = "Error";
    res.render('error', { title: errorTitle, message: "Sorry, something went wrong. Please try again later." });
  };