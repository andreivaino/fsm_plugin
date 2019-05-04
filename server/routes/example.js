export default function (server) {

  server.route({
    path: '/api/fsm_plugin/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
