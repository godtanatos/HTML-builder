const fs = require("fs/promises");
const path = require("path");
async function bandleCssFiles(folder) {
  let currentFolder = folder;
  let items = await fs.readdir(currentFolder, { withFileTypes: true });
  try {
    await fs.unlink(__dirname + "/project-dist/bundle.css");
  } catch {}
  for (const element of items) {
    if (element.isDirectory()) {
      await bandleCssFiles(currentFolder + "/" + element);
    } else {
      let obj = path.parse(currentFolder + "/" + element["name"]);
      if (obj.ext == ".css") {
        let currentFile = await fs.readFile(
          path.normalize(currentFolder + "/" + element.name),
          "utf8"
        );
        await fs.appendFile(
          __dirname + "/project-dist/bundle.css",
          currentFile
        );
      }
    }
  }
}
bandleCssFiles(path.normalize(__dirname + "/styles"));
