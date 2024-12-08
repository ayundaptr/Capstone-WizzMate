const fs = require("fs");
const path = require("path");

const loadData = () => {
  try {
    const filePath = path.join(__dirname, "../data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    throw new Error("Error loading data: " + err.message);
  }
};

const findDataByPlaceName = (data, placeName) => {
  return data.find(
    (item) =>
      item.Place_Name &&
      item.Place_Name.toLowerCase() === placeName.toLowerCase()
  );
};

const filterAndPaginateData = (
  data,
  { page = 1, size = 10, category, keyword, sort }
) => {
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

  return { totalItems, paginatedData };
};

module.exports = {
  loadData,
  filterAndPaginateData,
  findDataByPlaceName,
};
