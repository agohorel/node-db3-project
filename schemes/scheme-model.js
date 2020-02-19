const db = require("../data/db-config.js");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes as sc")
    .join("steps as st", { "sc.id": "st.scheme_id" })
    .where({ id });
}

function add(scheme) {
  return db("schemes").insert(scheme);
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .delete();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
