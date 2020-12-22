"use strict";

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
      return model.options.previewable;
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

    let contentPreview;

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
  getPreviewUrl(
    contentType: string,
    contentId: string,
    _query: Record<string, string | number>
  ) {
    const previewUrl = global.strapi.config.get("custom.previewUrl") || "";

    return this.replacePreviewParams(contentType, contentId, previewUrl);
  },
  /**
   * Replace URL from string params
   *
   * @param - The content type to query
   * @param - The content type id to query
   * @param - The url string to replace
   *
   * @returns The replaced URL
   */
  replacePreviewParams(contentType: string, contentId: string, url: string) {
    return url.replace(":contentType", contentType).replace(":id", contentId);
  },
};
