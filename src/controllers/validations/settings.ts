"use strict";

const { yup, formatYupErrors } = require("strapi-utils");

const settingsSchema = yup.object({
  previewUrl: yup.string().required(),
});

const validateSettings = (data: any) => {
  return settingsSchema
    .validate(data, {
      abortEarly: false,
    })
    .catch((error: any) => {
      // @ts-ignore
      throw strapi.errors.badRequest("ValidationError", {
        errors: formatYupErrors(error),
      });
    });
};

module.exports = validateSettings;
