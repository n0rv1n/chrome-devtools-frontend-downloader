const enableProxy = true; //是否使用代理
const proxy = "http://127.0.0.1:1080"; //代理地址
const path = require("path");
const fs = require("fs");
const debuggerID = process.argv.splice(2)[0].replace("@", "");
const downLoadPath = path.resolve(__dirname, "downLoad", debuggerID);
const Fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const remoteURL = `https://chrome-devtools-frontend.appspot.com/serve_file/@${debuggerID}`;
const fileListURL = `${remoteURL}/${debuggerID}.manifest`;
function fetch(url, opt = {}) {
  opt = Object.assign({}, opt, {
    agent: enableProxy ? new HttpsProxyAgent(proxy) : null
  });
  return Fetch(url, opt);
}
/**
 * 获取文件列表
 * @returns
 */
async function getFileList() {
  console.log("正在获取文件列表...");
  return await fetch(fileListURL).then(res => {
    console.log("文件列表获取完成");
    return res.text();
  });
}
/**
 * 从数组查找对应内容
 * @param {*} array
 * @param {*} itemName
 * @returns
 */
function find(array, itemName) {
  return array.find(a => a[0] === itemName)[1];
}
/**
 * 下载文件到指定目录
 * @param {*} file
 * @returns
 */
function downLoadFile(file) {
  let outputFile = path.resolve(downLoadPath, file),
    dirName = path.dirname(outputFile);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, {
      recursive: true
    });
  }
  return fetch(`${remoteURL}/${file}`)
    .then(res => {
      res.body.pipe(fs.createWriteStream(outputFile));
    })
    .catch(e => {
      console.log(`retry:${file}`);
      return downLoadFile(file);
    });
}

getFileList()
  .then(list => {
    list = (list.replace(/\s*#.*/, "") + "\nend:").match(
      /\S+?:[\s\S]*?(?=\s*\S+?:)/g
    );
    list = list.map(item => item.split(":"));
    return find(list, "CACHE")
      .trim()
      .split("\n");
  })
  .then(fileList => {
    console.log("正在下载文件...");
    let tasks = [];
    fileList.forEach(file => {
      tasks.push(downLoadFile(file));
    });
    Promise.all(tasks).then(() => {
      console.log("文件下载完成");
    });
  });
