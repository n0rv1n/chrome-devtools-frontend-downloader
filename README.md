# chrome-devtools-frontend-downloader
chrome inspect 调试工具下载器 用于针对不同手机下载对应调试包，以供不能翻墙机器调试。
打开chrome://inspect/#devices ，点击其中一台设备调试，从打开的空白页面标题url中提取packageId。如：/serve_rev/@169177/... 其中169177即packageId
## usage:
### Download debugger
```
node index.js [packageId]
```
### Pack all debugger
```
node zip.js
```
## notice:
默认使用本地1080端口的代理，如需变更端口或禁用代理，可编辑index.js实现
