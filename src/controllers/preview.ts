"use strict";
import { Context } from "koa";
import _ from "lodash";
const validateSettings = require("./validations/settings");

/**
 * preview.js controller
 *
 * @description: A set of functions called "actions" of the `preview` plugin.
 */
module.exports = {
  /**
   * Get if preview services is active
   *
   * @param ctx
   *
   * @return Returns true or false for preview
   */
  async isPreviewable(ctx: Context) {
    const service = global.strapi.plugins["preview-content"].services.preview;
    const isPreviewable = await service.isPreviewable(ctx.params.contentType);

    ctx.send({ isPreviewable });
  },
  /**
   * Find a content type by id
   *
   * @param ctx
   *
   * @returns Returns the content type by id, otherwise null.
   */
  async findOne(ctx: Context) {
    const service = global.strapi.plugins["preview-content"].services.preview;
    const contentPreview = await service.findOne(
      ctx.params.contentType,
      ctx.params.id,
      ctx.query
    );

    ctx.send(contentPreview);
  },
  /**
   * Get preview url of content type
   *
   * @param ctx
   *
   * @returns eturns the object containing the preview url, otherwise null.
   */
  async getPreviewUrl(ctx: Context) {
    const {
      params: { contentType, id },
      query,
    } = ctx;
    const service = global.strapi.plugins["preview-content"].services.preview;
    const url = await service.getPreviewUrl(contentType, id, query);

    ctx.send({ url: url || "" });
  },
  /**
   * Get settings of the plugin
   */
  async getSettings(ctx: Context) {
    // @ts-ignore
    const data = await strapi.plugins[
      "preview-content"
    ].services.preview.getSettings();

    ctx.body = { data };
  },
  /**
   * Update settings of the plugin
   */
  async updateSettings(ctx: Context) {
    const {
      // @ts-ignore
      request: { body },
    } = ctx;

    const data = await validateSettings(body);

    // @ts-ignore
    await strapi.plugins["preview-content"].services.preview.setSettings(data);

    ctx.body = { data };
  },
};
