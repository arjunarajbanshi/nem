> # Node Package Manager(npm)

_Default package manager for nodejs. npm is the world's largest Software Registry. It is basically used for managing packages._

## Commonly Used Commands

- **npm init**: Creates a package.json file.

- **npm install <package_name>**: Installs a package locally.

- **npm install -g <package_name>:** Installs a package globally. This package will be available form anywhere in computer not just this current folder.

- **npm i <package_name> --save-dev** : To install development dependency.

- **npm uninstall <package_name>**: Removes a package

- **npm outdated** : List all outdated packages.

> **_Version_** `^1.3.4` : 1st is main version(huge new realease, might break the code), 2nd is minor version(introduces some new features but it not break code) and 3rd is patch updates(bugs fixes )

- **npm i <package_name@version>** : To install specific version package.

- `~` infront of version indicates that it will only accpets patch releases. We can change it manually in package.json file.

- `^` infront of version indicates that it will accpet minor and patches releases.

- `*` will accepts all version. Might break package.

- **npm update <package_name>** : To update certain package.
