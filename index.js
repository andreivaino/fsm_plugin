import exampleRoute from './server/routes/example';
import pfSenseBlockedRoute from './server/routes/pfsenseblocked';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'fsm_plugin',
    uiExports: {
      app: {
        title: 'Fsm Plugin',
        description: 'Federated Security Module Plugin',
        main: 'plugins/fsm_plugin/app',
      },
      hacks: [
        'plugins/fsm_plugin/hack',
	'plugins/fsm_plugin/hack2'
      ],
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      	exampleRoute(server);
	pfSenseBlockedRoute(server);
    }
  });
}