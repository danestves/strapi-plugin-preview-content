module.exports = async () => {
  // Add permissions
  const actions = [
    {
      section: "plugins",
      displayName: "Access the Preview",
      uid: "read",
      pluginName: "preview-content",
    },
  ];

  // set plugin store
  const configurator = strapi.store({
    type: "plugin",
    name: "preview-content",
    key: "settings",
  });

  // if provider config does not exist set one by default
  const config = await configurator.get();

  if (!config) {
    await configurator.set({
      value: {
        baseUrl: "https://<YOUR_URL>.com",
        previewUrl: ":baseUrl/api/preview?contentType=:contentType&id=:id",
      },
    });
  }

  const { actionProvider } = global.strapi.admin.services.permission;

  await actionProvider.registerMany(actions);
};
