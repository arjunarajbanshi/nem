> # Debuging in Nodejs

## Install node debugger package
```bash
npm i ndb --save-dev # debugger for nodejs
```

## Add below in Package.jso file
```json
{
    "scripts": {
        "debug": "ndb index.js"
    }
}
```

## Run as
```bash
npm run debug # New debugger window will open, making any changes in this window will change in original window
```

- To execute code in debugger &rarr; Right click + run this script

- To set breakpoint &rarr; Click on line number

    - Set breakpoint, send response using postman and analyze the errors in debugger. Click on step to check for errors step by step in source code.

