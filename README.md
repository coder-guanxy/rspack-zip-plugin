# rspack-zip
it is a simple webpcak plugin for zip bundle folder to designation path

(用于将rspack输出文件夹打包为zip压缩包,并输送到指定目录下的插件)

NONTE: it is a direct port from the [webpack-zip](https://github.com/ou-jin/webpack-zip)

#### Instructions


`npm i rspack-zip-plugin -D`


```javascript
var RspackZipPlugin = require('rspack-zip-plugin');
...
plugins: [
  new RspackZipPlugin({
    destPath:'/dist.zip' // Compress the packaging results
  })
]
```

###### Options

- `destPath` the designation path .default:Root directory  
- `onError`the function deal error
- `onFinish`the function deal finish
- `noZip` just copy

| name | type | default | description |
| --- | --- | --- | --- |
| destPath | string | `/dist.zip` | Compress the packaging results |
| onError |  function | noop | Executed when the packaging error is performed |
| onFinish |  function | noop | The package is executed |
| noZip |  boolean | false | true: just copy with destPath option |
