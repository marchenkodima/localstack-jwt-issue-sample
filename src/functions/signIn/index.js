module.exports = {
  handler: `./src/functions/signIn/handler.main`,
  name: '${self:custom.stackName}--sign-in',
  events: [
    {
      http: {
        method: 'post',
        path: '/sign-in',
      },
    },
  ],
};
