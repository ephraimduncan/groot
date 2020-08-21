<div align="center">
<img src="http://www.pngall.com/wp-content/uploads/4/Baby-Groot-Transparent.png" width="250"></img>
</div>

# Groot

This Github Action translates your readme into Groot's language. `I am Groot`

## Setup

1. **Add a workflow file** to your project (e.g. `.github/workflows/groot.yml`):

   ```yml
   name: I am Groot!

   on:
     push:
       branches:
         - main
         - master

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v1
           with:
             node-version: 12.x
         - name: Groot Action
           uses: dephraiim/groot@main
   ```

## Configuration

### Options

- I am Groot.

### Development

Suggestions and contributions are always welcome!

### LICENSE

[MIT](./LICENSE)
