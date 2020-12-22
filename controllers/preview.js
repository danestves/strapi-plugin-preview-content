"use strict";
const { Context } = require("koa");
const _ = require("lodash");

/**
 * preview.js controller
 *
 * @description: A set of functions called "actions" of the `preview` plugin.
 */

module.exports = {
  /**
   * Get if preview services is active
   *
   * @param {Context} ctx
   *
   * @return {Boolean} Returns true or false for preview
   */
  async isPreviewable(ctx) {
    const service = global.strapi.plugins["preview-content"].services.preview;
    const isPreviewable = await service.isPreviewable(ctx.params.contentType);

    ctx.send({ isPreviewable });
  },
  /**
   * Find a content type by id
   *
   * @param {Context} ctx
   *
   * @returns {Object} Returns the content type by id, otherwise null.
   */
  async findOne(ctx) {
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
   * @param {Context} ctx
   *
   * @returns {Object} Returns the object containing the preview url, otherwise null.
   */
  getPreviewUrl(ctx) {
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
   * @param {Context} ctx
   *
   * @return {Promise}
   */
  async createOrUpdate(ctx) {
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
   * @param {Context} ctx
   */
  async getSettings(ctx) {
    const results = await strapi
      .query("plugins::preview-content.settings")
      .find({ _limit: 1 });
    const entity = _.first(results) || null;

    ctx.send({ data: entity });
  },
};
