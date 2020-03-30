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

function schemeBody(req, res, next) {
  const { scheme_name } = req.body;
  if (!scheme_name) {
    res.status(400).json({ msg: "please provide a name for your scheme" });
  } else {
    next();
  }
}

function stepBody(req, res, next) {
  const { body } = req;

  if (!body.scheme_id || !body.step_number || !body.instructions) {
    res.status(400).json({
      msg: "please provide a scheme_id, step_number, and instructions"
    });
  } else {
    next();
  }
}

module.exports = { schemeID, schemeBody, stepBody };
