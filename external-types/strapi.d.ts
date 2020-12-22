export {};

declare global {
  module NodeJS {
    interface Global {
      strapi: any;
    }
  }
}
