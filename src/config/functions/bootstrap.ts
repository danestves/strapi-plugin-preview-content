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

  const { actionProvider } = global.strapi.admin.services.permission;
  actionProvider.register(actions);
};
