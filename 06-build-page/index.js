const fs = require("fs/promises");
const path = require("path");
const baseFolder = path.normalize(__dirname + "/" + "project-dist/");
async function createPage() {
  await fs.mkdir(baseFolder, { recursive: true });
  let objPartMain = await createObj(
    path.normalize(__dirname + "/" + "components")
  );
  let currentFile = await fs.readFile(
    path.normalize(__dirname + "/" + "template.html"),
    "utf8"
  );
  for (let key in objPartMain) {
    let re = new RegExp("{{" + key + "}}", "gi");
    currentFile = currentFile.replace(re, objPartMain[key]);
  }
  await fs.writeFile(path.normalize(baseFolder + "index.html"), currentFile);
  await bandleCssFiles(path.normalize(__dirname + "/styles"));
  await copyDir(
    path.normalize(`${__dirname}/assets`),
    path.normalize(`${baseFolder}/assets`)
  );
}

async function createObj(direct) {
  let objBuilder = {};
  let currentFolder = direct;
  let items = await fs.readdir(currentFolder, { withFileTypes: true });
  for (let i = 0; i < items.length; i++) {
    let obj = path.parse(currentFolder + "/" + items[i]["name"]);
    if (obj.ext == ".html") {
      objBuilder[obj.name] = await fs.readFile(
        path.normalize(currentFolder + "/" + items[i]["name"]),
        "utf8"
      );
      objBuilder.length = i + 1;
    }
  }
  return objBuilder;
}
async function bandleCssFiles(folder) {
  let currentFolder = folder;
  let items = await fs.readdir(currentFolder, { withFileTypes: true });
  try {
    await fs.unlink(__dirname + "/project-dist/style.css");
  } catch {}
  for (const element of items) {
    if (element.isDirectory()) {
      await bandleCssFiles(currentFolder + "/" + element);
    } else {
      let obj = path.parse(currentFolder + "/" + element["name"]);
      if (obj.ext == ".css") {
        let currentFile = await fs.readFile(
          path.normalize(currentFolder + "/" + elementname),
          "utf8"
        );
        await fs.appendFile(__dirname + "/project-dist/style.css", currentFile);
      }
    }
  }
}
async function copyDir(directory, copyDrectory) {
  let direct = directory;
  let copyDirect = copyDrectory;
  await dellDir(copyDirect);
  await fs.mkdir(copyDirect, { recursive: true });
  let items = await fs.readdir(direct, { withFileTypes: true });
  for (const element of items) {
    if (element.isDirectory()) {
      copyDir(
        path.normalize(`${directory}/${element.name}`),
        path.normalize(`${copyDirect}/${element.name}`)
      );
    } else {
      await fs.copyFile(
        path.normalize(direct + "/" + element.name),
        path.normalize(copyDirect + "/" + element.name)
      );
    }
  }
}
async function dellDir(directory) {
  let delDirectory = directory;
  await fs.rm(delDirectory, { force: true, recursive: true });
}
createPage();
