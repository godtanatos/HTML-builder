const fs = require("fs");
const path = require("path");
let directory = "secret-folder";
function findOutFiles(directory) {
  let direct = directory;
  fs.readdir(direct, { withFileTypes: true }, function (err, items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].isFile()) {
        let obj = path.parse(direct + "/" + items[i]["name"]);
        fs.stat(
          path.normalize(direct + "/" + items[i]["name"]),
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
      } /* if (items[i].isDirectory()) {
        findOutFiles(path.normalize(direct + '/' + items[i]['name']));
      }*/
    }
  });
}
findOutFiles(path.normalize(`${__dirname}/` + directory));
