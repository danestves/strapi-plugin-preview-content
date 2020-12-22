export {};

declare global {
  module NodeJS {
    interface Global {
      strapi: any;
    }
  }
}

declare module "strapi-utils";
