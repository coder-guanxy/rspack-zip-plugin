# rspack-zip
it is a simple webpcak plugin for zip bundle folder to designation path


(用于将rspack输出文件夹打包为zip压缩包,并输送到指定目录下的插件)

#### Instructions


`npm i rspack-zip -D`


```javascript
var zip = require('rspack-zip');
...
plugins: [
  new zip()
]
```

###### Options

- `destPath` the designation path .default:Root directory  
- `onError`the function deal error
- `onFinish`the function deal finish


 ```javascript
  new zip(
    {
        destPath:'//path/dist.zip',
        onError: (e)=>{}
    }
  )
```
 

 