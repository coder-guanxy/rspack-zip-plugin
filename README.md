# webpack-zip
it is a simple webpcak plugin for zip bundle folder to designation path


(用于将webpack输出文件夹打包为zip压缩包,并输送到指定目录下的插件)

#### Instructions


`npm i webpack-zip`


```javascript
var zip = require('webpack-zip');
...
plugins: [
  new zip()
]
```

###### Options

- `destPath` the designation path .default:Root directory  
- `onError`the function deal error
- `onSuccess`the function deal success


 ```javascript
  new zip(
    {
        destPath:'//path/dist.zip',
        handleError:(e)=>{}
    }
  )
```
 

 