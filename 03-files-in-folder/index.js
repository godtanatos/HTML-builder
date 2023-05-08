const fs = require("fs");
const path = require("path");
let directory = "secret-folder";
function findOutFiles(directory) {
  let direct = directory;
  fs.readdir(direct, { withFileTypes: true }, function (err, items) {
    for (const element of items) {
      if (element.isFile()) {
        let obj = path.parse(direct + "/" + element["name"]);
        fs.stat(
          path.normalize(direct + "/" + element["name"]),
          (err, stats) => {
            console.log(
              obj.name +
                "-" +
                obj.ext.substring(1) +
                "-" +
                stats.size / 1000 +
                "kb"
            );
          }
        );
      }
    }
  });
}
findOutFiles(path.normalize(`${__dirname}/` + directory));
