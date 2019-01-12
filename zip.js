const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
// const debuggerID = process.argv.splice(2)[0].replace("@", "");
const modulesPath = path.resolve(__dirname, "downLoad");
const outputZipPath = path.resolve(__dirname, "zip", "debuggerModules.zip");

const output = fs.createWriteStream(outputZipPath);
const archive = archiver("zip", {
  zlib: { level: 9 }
});
archive.on("warning", function(err) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on("error", function(err) {
  throw err;
});
output.on("close", function() {
  console.log("压缩完成");
});
archive.pipe(output);
archive.directory(modulesPath, false);
archive.finalize();
