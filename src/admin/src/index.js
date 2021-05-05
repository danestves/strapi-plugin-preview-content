import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./containers/Initializer";
import lifecycles from "./lifecycles";
import trads from "./translations";
import SettingsPage from "./containers/SettingsPage";

import getTrad from "./utils/getTrad";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: null,
    name,
    preventComponentRendering: false,
    settings: {
      global: {
        links: [
          {
            title: {
              id: getTrad("plugin.name"),
              defaultMessage: "Preview Content",
            },
            name: "preview-content",
            to: `${strapi.settingsBaseURL}/preview-content`,
            Component: () => <SettingsPage />,
          },
        ],
      },
    },
    trads,
  };

  return strapi.registerPlugin(plugin);
};
