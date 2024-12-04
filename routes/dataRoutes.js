const express = require("express");
const { loadData } = require("../utils/dataLoader");

const router = express.Router();

router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category || "";
  const keyword = req.query.keyword || "";
  const sort = req.query.sort || "";

  const data = loadData();
  let filteredData = data;

  if (category) {
    filteredData = filteredData.filter(
      (item) =>
        item.Category && item.Category.toLowerCase() === category.toLowerCase()
    );
  }

  if (keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        (item.Place_Name &&
          item.Place_Name.toLowerCase().includes(lowerCaseKeyword)) ||
        (item.City && item.City.toLowerCase().includes(lowerCaseKeyword))
    );
  }

  if (sort === "rating") {
    filteredData.sort((a, b) => b.Rating - a.Rating);
  }

  const totalItems = filteredData.length;
  const start = (page - 1) * size;
  const end = start + size;

  const paginatedData = filteredData.slice(start, end);

  res.json({
    status: "success",
    page,
    size,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / size),
    data: paginatedData,
  });
});

module.exports = router;
