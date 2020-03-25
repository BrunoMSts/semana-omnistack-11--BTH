const connection = require("../database/connection");

const index = async (req, res) => {
    const ong_id = req.headers.authorization;

    const incidents = await connection("incidents")
        .where("ong_id", ong_id)
        .select("*");
    
    return res.json(incidents);
}

module.exports = { index };