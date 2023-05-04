const { error } = require("console");
const fs = require("fs");
const path = require("path");
fs.readFile(`${__dirname}/text.txt`, "utf-8", (error, data) => {
  console.log(data.toString());
});
