## Strapi - Preview Content Plugin

<p align="center">
  <a href="https://www.npmjs.org/package/strapi-plugin-preview-content">
    <img src="https://img.shields.io/npm/v/strapi-plugin-preview-content/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.org/package/strapi-plugin-preview-content">
    <img src="https://img.shields.io/npm/dm/strapi-plugin-preview-content.svg" alt="Monthly download on NPM" />
  </a>
</p>

> **This plugin has been inspired by [VirtusLab](https://github.com/VirtusLab/) - [strapi-molecules/strapi-plugin-preview](https://github.com/VirtusLab/strapi-molecules/tree/master/packages/strapi-plugin-preview)**

A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that provides content preview to integrate with any frontend:

This is what the plugin looks like when editing content:

<img src="https://github.com/danestves/strapi-plugin-preview-content/blob/main/public/assets/example1.png?raw=true" alt="Example of buttons in edit Content Type" />

This is what the plugin looks like when we are in list view:

<img src="https://github.com/danestves/strapi-plugin-preview-content/blob/main/public/assets/example2.png?raw=true" alt="Example of buttons in list view" />

### 🖐 Requirements

Complete installation requirements are exact same as for Strapi itself and can be found in the documentation under <a href="https://strapi.io/documentation/v3.x/installation/cli.html#step-1-make-sure-requirements-are-met">Installation Requirements</a>.

**Supported Strapi versions**:

- Strapi v3.6.x only version v1.0.0
- Strapi v3.4.x only version v0.2.76

**We recommend always using the latest version of Strapi to start your new projects**.

### ⏳ Installation

```bash
# npm
npm install strapi-plugin-preview-content

# yarn
yarn add strapi-plugin-preview-content
```

### 📁 Copy required files

Inside `strapi-files` we have a list of folders with the Strapi version, enter to the version that correspond with your installation, and you will see this files

<img src="https://github.com/danestves/strapi-plugin-preview-content/blob/main/public/assets/folder.png?raw=true" alt="Example of buttons in list view" />

Copy the folder named `content-manager` inside your `<project-root>/extensions` folder

### 👍 Active content type as previewable

To enable content type to be previewable and see preview, or clone entry, you've to add option previewable to true in a configuration json file (`*.settings.json`):

```diff
{
  "options": {
+    "previewable": true
  }
}
```

### 🚀 Run your project

After successful installation you've to build a fresh package that includes plugin UI. To archive that simply use:

```bash
# npm
npm run build && npm run develop

# yarn
yarn build && yarn develop
```

### ✏️ Usage

Go to Settings > Preview Content

<img src="https://github.com/danestves/strapi-plugin-preview-content/blob/main/public/assets/settings.png?raw=true" alt="Preview Content Settings" />

Here you can configure how your url for frontend preview, at the moment there are only two parameters

`:contentType` The content type to query
`:id` The id of content to query

For example in NextJS you can make use of [serverless functions](https://nextjs.org/docs/api-routes/introduction) to make an URL like this:

`http://localhost:3000/api/preview/:contentType/:id`

And put the logic there to render content

### ✨ Features

### 🛠 API

There are some functions that make all of this posible

| function        | route                           | method | description                                                   | notes                                                                          |
| --------------- | ------------------------------- | ------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `isPreviewable` | `/is-previewable/:contentType`  | `GET`  | Get if preview services is active in the current current type |                                                                                |
| `findOne`       | `/:contentType/:id`             | `GET`  | Find a content type by id                                     | You may want to active this route as public to make request from your frontend |
| `getPreviewUrl` | `/preview-url/:contentType/:id` | `GET`  | Get preview url of content type                               |                                                                                |

## Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## Community support

For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/). For additional help, you can use one of these channels to ask a question:

- [Slack](http://slack.strapi.io) We're present on official Strapi slack workspace. Look for @danestves and DM.
- [GitHub](https://github.com/danestves/strapi-plugin-preview-content/issues) (Bug reports, Contributions, Questions and Discussions)

## License

[MIT License](LICENSE.md) Copyright (c) 2020 [Daniel Esteves](https://danestves.com/) &amp; [Strapi Solutions](https://strapi.io/).
