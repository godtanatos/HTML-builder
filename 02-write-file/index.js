const fs = require("fs");
const path = require("path");
const readline = require("readline");
const process = require("process");
const { error } = require("console");
const file = fs.createWriteStream(path.resolve(__dirname, `hello.txt`));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Привет, напиши что-нибудь");
let oldRline = rl.line;
process.stdin.on("keypress", (chunk, key) => {
  if ((key.name == "c" && key.ctrl) || rl.line.includes("exit")) {
    console.log("\r\n Пока");
    rl.close();
    return null;
  }

  fs.readFile(path.resolve(__dirname, `hello.txt`), "utf8", (error, data) => {
    if (key.sequence === "\r") {
      data += "\r\n";
      console.log(data);
    } else {
      let reg = new RegExp(`${oldRline}$`, "g");
      data = data.replace(reg, "");
    }

    fs.writeFile(
      path.resolve(__dirname, `hello.txt`),
      data + rl.line,
      { encoding: "utf8" },
      (err) => {
        oldRline = rl.line;
      }
    );
  });
});
