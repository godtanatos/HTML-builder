const fs = require("fs/promises");
const path = require("path");
async function copyDir(directory, copyDrectory) {
  let direct = directory;
  let copyDirect = copyDrectory;
  await dellDir(copyDirect);
  await fs.mkdir(copyDirect, { recursive: true });
  let items = await fs.readdir(direct, { withFileTypes: true });
  for (var i = 0; i < items.length; i++) {
    if (items[i].isDirectory()) {
      copyDir(
        path.normalize(`${directory}/${items[i].name}`),
        path.normalize(`${copyDirect}/${items[i].name}`)
      );
    } else {
      await fs.copyFile(
        path.normalize(direct + "/" + items[i].name),
        path.normalize(copyDirect + "/" + items[i].name)
      );
    }
  }
}
async function dellDir(directory) {
  let delDirectory = directory;
  await fs.rm(delDirectory, { force: true, recursive: true });
}
copyDir(
  path.normalize(`${__dirname}/files`),
  path.normalize(`${__dirname}/files-copy`)
);
