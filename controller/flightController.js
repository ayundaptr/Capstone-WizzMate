const fs = require("fs");
const loadFlights = () => {
  const rawData = fs.readFileSync("penerbangan.json");
  return JSON.parse(rawData);
};

exports.getFlights = (req, res) => {
  const { travel_class, airline, sort_by } = req.query;

  let flights = loadFlights();

  if (travel_class) {
    flights = flights.filter(
      (flight) =>
        flight.travel_class.toLowerCase() === travel_class.toLowerCase()
    );
  }

  if (airline) {
    flights = flights.filter((flight) =>
      flight.airline.toLowerCase().includes(airline.toLowerCase())
    );
  }

  if (sort_by === "price") {
    flights.sort((a, b) => a.price - b.price);
  } else if (sort_by === "duration") {
    flights.sort((a, b) => a.duration - b.duration);
  }

  res.json({ status: "success", data: flights });
};
