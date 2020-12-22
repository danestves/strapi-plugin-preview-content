"use strict";
import { Context } from "koa";
import _ from "lodash";

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
    console.log(global.strapi.plugins);
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
   * @returns Returns the object containing the preview url, otherwise null.
   */
  getPreviewUrl(ctx: Context) {
    const {
      params: { contentType, id },
      query,
    } = ctx;
    const service = global.strapi.plugins["preview-content"].services.preview;
    const url = service.getPreviewUrl(contentType, id, query);

    ctx.send({ url });
  },
  /**
   * Create or update the current settings configuration
   *
   * @param ctx
   */
  async createOrUpdate(ctx: Context): Promise<any> {
    const data = ctx.request.body;
    const results = await strapi
      .query("plugins::preview-content.settings")
      .find({ _limit: 1 });
    const entity = _.first(results) || null;

    let entry;
    if (!entity) {
      entry = await strapi
        .query("plugins::preview-content.settings")
        .create(data);
    } else {
      entry = await strapi
        .query("plugins::preview-content.settings")
        .update({ id: entity.id }, data);
    }

    return entry;
  },
  /**
   * Get settings of the plugin
   *
   * @param ctx
   */
  async getSettings(ctx: Context) {
    const results = await strapi
      .query("plugins::preview-content.settings")
      .find({ _limit: 1 });
    const entity = _.first(results) || null;

    ctx.send({ data: entity });
  },
};
