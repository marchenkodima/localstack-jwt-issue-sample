# Steps to reproduce:
1. Run `LOCALSTACK_API_KEY={your_api_key} npm run localstack`
2. Run `npm run deploy` to run deployment against localstack
3. Create a user by sending a POST request to `{api_url}/sign-up` with the following payload (Body):
```
{
  "email": "test2@email.com",
  "password": "password1!"
}
```

4. Sign in by sending a POST request to `{api_url}/sign-in` with the following payload (Body):
```
{
  "email": "test2@email.com",
  "password": "password1!"
}
```

As a result auth tokens are returned

5. Decode the access token, e.g. by using jwt.io. The token has the following payload
```
{
  "exp": 1722968698,
  "iss": "http://localhost.localstack.cloud:4566/us-west-2_dce037f0eb1a41c499cb55ba3a4ed6eb",
  "sub": "e59fe241-05ae-4f7e-a09d-22a608406f01",
  "auth_time": 1722965098,
  "iat": 1722965098,
  "event_id": "2b8a9428-cf78-46cf-8d01-6f65c20f06dd",
  "token_use": "access",
  "username": "test1@email.com",
  "jti": "22fc467c-7b3c-4766-be32-dd88f1fbcabc",
  "client_id": "b5j4pi8p7v73bb1kdi6ei3irye",
  "scope": "aws.cognito.signin.user.admin"
}
```
Take a look at `username` which is user's email address, but an id was specified while registration

6. Run deployment against a live environment. E.g. `AWS_PROFILE=your_profile STAGE=dev npm run deploy`
7. Repeat steps 3, 4, 5. Payload after decoding:
```
{
  "sub": "486143e0-3081-7074-7563-0280662a2ebd",
  "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_MEKXpqb2n",
  "client_id": "7fhm7bl42h6hn77q5g0ipis2cg",
  "origin_jti": "1d1c51e9-cf68-4072-a9e1-c2b6edebcece",
  "event_id": "9727d06e-f037-41d2-a229-e8fa8f04b714",
  "token_use": "access",
  "scope": "aws.cognito.signin.user.admin",
  "auth_time": 1722968994,
  "exp": 1722972594,
  "iat": 1722968994,
  "jti": "2c0e0862-6943-468f-a82c-b75e01abbbbd",
  "username": "custom431x3qj3aoy"
}
```
`username` field is set to our id generated during registration