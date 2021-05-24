# Setting up your dev environment

## Step 1: Make a clean strapi installation

More details on this can be found in [strapi's documentation](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html)

Add the overriding files to your `extensions` folder, as described in the README. Because the plugin will not be loaded as a package, you will have to replace the following imports:

| File                                        | Original line                                                      | New line                                                                                    |
|---------------------------------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| containers/EditView/Header/index.js         | `import { usePreview } from "strapi-plugin-preview-content";`      | `import { usePreview } from "/plugins/preview-content/admin/main/preview-context";`      |
| containers/EditView/Header/utils/connect.js | `import { PreviewProvider } from "strapi-plugin-preview-content";` | `import { PreviewProvider } from "/plugins/preview-content/admin/main/preview-context";` |

## Step 2: Fork this repo

Hit fork on GitHub so have your own copy of this repository.

## Step 3: Clone your fork of the repository into the project

Git clone your fork into `plugins/preview-content` of your development strapi project. By default, git names the folder `strapi-plugin-preview-content`, so rename it to `preview-content` (or specify the folder name while cloning).

## Step 4: Set up the plugin

To install its dependencies, head into the folder:

```
cd plugins/preview-content
```

and install:

```
yarn install
```

## Step 5: Run your project with hot reload

In the `plugins/preview-content` folder run:

```
yarn build -w
```

This will start the typescript compilation with automatic relaoding.

After the first successful compilation, run strapi in the root of your project:

```
yarn develop --watch-admin
```
