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
- 默认不使用代理，如需使用，可修改index.js实现
- 调试工具包仅适用于**Chrome Inspect 离线调试工具** [https://pan.baidu.com/s/1YRUlR1qUFvh-TkvJCvRNFw](https://pan.baidu.com/s/1YRUlR1qUFvh-TkvJCvRNFw) 
