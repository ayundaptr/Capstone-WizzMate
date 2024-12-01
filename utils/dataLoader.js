const fs = require("fs");
const path = require("path");

const loadData = () => {
  const rawData = fs.readFileSync(path.join(__dirname, "../data.json"));
  return JSON.parse(rawData);
};

const loadFlights = () => {
  const rawData = fs.readFileSync(path.join(__dirname, "../penerbangan.json"));
  return JSON.parse(rawData);
};

module.exports = { loadData, loadFlights };
