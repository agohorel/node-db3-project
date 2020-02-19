const db = require("./scheme-model.js");

async function schemeID(req, res, next) {
  try {
    const scheme = await db.findById(req.params.id);
    if (!scheme) {
      res.status(400).json({ msg: "invalid scheme id" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
}

module.exports = { schemeID };
