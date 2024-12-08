const express = require("express");
const { loadData } = require("../utils/dataLoader");
const {
  filterAndPaginateData,
  findDataByPlaceName,
} = require("../model/dataModel");

const router = express.Router();

router.get("/:placeName", (req, res) => {
  try {
    const placeName = req.params.placeName;
    const data = loadData();
    const result = findDataByPlaceName(data, placeName);

    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const category = req.query.category || "";
    const keyword = req.query.keyword || "";
    const sort = req.query.sort || "";

    const allData = loadData();
    const { totalItems, paginatedData } = filterAndPaginateData(allData, {
      page,
      size,
      category,
      keyword,
      sort,
    });

    res.json({
      success: true,
      page,
      size,
      total_items: totalItems,
      total_pages: Math.ceil(totalItems / size),
      data: paginatedData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
