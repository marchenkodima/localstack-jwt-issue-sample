const { cognito } =  require('../../lib/cognito');
const { getEnvVar } = require('../../lib/getEnvVar');

const handler = async (event) => {
  console.log('event:', JSON.stringify(event, null, 2));

  const payload = JSON.parse(event.body);

  const auth = await cognito
    .initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: getEnvVar('END_USER_COGNITO_USER_POOL_CLIENT'),
      AuthParameters: {
        USERNAME: payload.email,
        PASSWORD: payload.password,
      },
    }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(auth),
  };
};

module.exports = {
  main: handler,
}
