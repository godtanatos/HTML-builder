const fs = require("fs/promises");
const path = require("path");
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
copyDir(
  path.normalize(`${__dirname}/files`),
  path.normalize(`${__dirname}/files-copy`)
);
