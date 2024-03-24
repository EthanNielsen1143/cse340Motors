const pool = require("../database/")

async function addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
) {
    console.log("classification_id: ", classification_id);
    console.log("inv_make: ", inv_make);
    console.log("inv_model: ", inv_model);
    console.log("inv_year: ", inv_year);
    console.log("inv_description: ", inv_description);
    console.log("inv_image: ", inv_image);
    console.log("inv_thumbnail: ", inv_thumbnail);
    console.log("inv_price: ", inv_price);
    console.log("inv_miles: ", inv_miles);
    console.log("inv_color: ", inv_color);
    try {
        const sql = 
        "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await pool.query(sql, [
            classification_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color
        ]);
    } catch (error) {
        return error.message;
    }
}

module.exports = { addInventory }