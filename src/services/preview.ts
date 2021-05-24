"use strict";

import _ from "lodash";

const { sanitizeEntity } = require("strapi-utils");

const PreviewError = require("./preview-error");

/**
 * Get components from a givne template
 *
 * @param {{ __component: string }[]} template
 *
 * @returns Returns the component, otherwise a error 400.
 */
// const getTemplateComponentFromTemplate = (template) => {
//   if (template && template[0] && template[0].__component) {
//     const componentName = template[0].__component;
//     return global.strapi.components[componentName];
//   }

//   throw new PreviewError(400, "Template field is incompatible");
// };

/**
 * preview.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
module.exports = {
  /**
   * Get if content type is previewable
   *
   * @param contentType - The content type to check
   *
   * @returns - Returns inf content type is previewable
   */
  async isPreviewable(contentType: string) {
    const model = await global.strapi.query(contentType)?.model;

    if (model) {
      return model.pluginOptions?.['preview-content']?.previewable || model.options?.previewable;
    }
    throw new PreviewError(400, "Wrong contentType");
  },
  /**
   * Find a content type by id previewable
   *
   * @param - The content type to query
   * @param - The ID of the content to query
   * @param - The query string params from URL
   *
   * @returns Returns an object with the template name, content type and data; otherwise error 400.
   */
  async findOne(
    contentType: string,
    id: string,
    query: Record<string, string>
  ) {
    const service = global.strapi.services[contentType];
    const model = global.strapi.models[contentType];

    if (!service) {
      throw new PreviewError(400, "Wrong contentType");
    }

    if (!model.options.previewable) {
      throw new PreviewError(400, "This content type is not previewable");
    }

    let contentPreview: any;

    const contentPreviewPublished = await service.findOne({
      ...query,
      id,
    });

    if (contentPreviewPublished) {
      contentPreview = contentPreviewPublished;
    }

    const contentPreviewDraft = await service.findOne({
      ...query,
      id,
    });

    if (contentPreviewDraft) {
      contentPreview = contentPreviewDraft;
    }

    if (!contentPreview) {
      throw new PreviewError(
        404,
        "Preview not found for given content type and Id"
      );
    }

    const data = sanitizeEntity(contentPreview, { model });
    // const templateComponent = getTemplateComponentFromTemplate(data.template);

    return {
      // templateName: templateComponent.options.templateName,
      contentType,
      data,
    };
  },
  /**
   * Get the preview url from a content type by id
   *
   * @param - The content type to query
   * @param - The content type id to query
   * @param - The query strings from URL
   *
   * @returns The preview URL parsed with `replacePreviewParams()`
   */
  async getPreviewUrl(
    contentType: string,
    contentId: string,
    _query: Record<string, string | number>
  ) {
    //@ts-ignore
    const contentTypeModel = strapi.models[contentType]
    const contentTypeConfig = contentTypeModel?.pluginOptions?.['preview-content'];

    const entity = await this.getSettings();

    const previewUrl = contentTypeConfig?.url || entity.previewUrl || "";
    const baseUrl = entity.baseUrl || "";

    // Fetch data that needs to be put into the url (if enabled)
    let additionalValues = {}
    if (contentTypeConfig?.usesValuesInUrl) {
      // Fetch the data
      //@ts-ignore
      additionalValues = await strapi.query(contentType).findOne({ id: contentId })
    }

    return this.replacePreviewParams(baseUrl, contentType, contentId, previewUrl, additionalValues);
  },
  /**
   * Replace URL from string params
   *
   * @param - The root url of the project's frontend
   * @param - The content type to query
   * @param - The content type id to query
   * @param - The url string to replace
   * @param - Additional data of the specific content type that needs to be injected into the url
   *
   * @returns The replaced URL
   */
  replacePreviewParams(baseUrl: string, contentType: string, contentId: string, url: string, additionalValues: object) {
    return _.template(
      url
        .replace(":baseUrl", baseUrl)
        .replace(":contentType", contentType)
        .replace(":id", contentId)
    )(additionalValues);
  },
  /**
   * Get settings of the plugin
   */
  async getSettings() {
    // @ts-ignore
    return strapi
      .store({
        type: "plugin",
        name: "preview-content",
        key: "settings",
      })
      .get();
  },
  /**
   * Update settings of the plugin
   */
  async setSettings(value: any) {
    // @ts-ignore
    return strapi
      .store({
        type: "plugin",
        name: "preview-content",
        key: "settings",
      })
      .set({ value });
  },
};
