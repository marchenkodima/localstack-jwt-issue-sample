const { cognito } =  require('../../lib/cognito');
const { getEnvVar } = require('../../lib/getEnvVar');

const handler = async (event) => {
  console.log('event:', JSON.stringify(event, null, 2));

  const payload = JSON.parse(event.body);

  const userId = generateCustomId();
  const user = await cognito.adminCreateUser({
    UserPoolId: getEnvVar('END_USER_COGNITO_USER_POOL'),
    Username: userId,
    DesiredDeliveryMediums: ['EMAIL'],
    UserAttributes: [
      {
        Name: 'email',
        Value: payload.email,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
  }).promise();
  await cognito.adminSetUserPassword({
    UserPoolId: getEnvVar('END_USER_COGNITO_USER_POOL'),
    Username: userId,
    Password: payload.password,
    Permanent: true,
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};

const generateCustomId = () => {
  return 'custom' + Math.random().toString(36).substring(2);
};

module.exports = {
  main: handler,
}
