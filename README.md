# e2e-test-boilerplate

## preparation
- Please install Docker Desktop

## Environment setup
```
## Creation of an env file
$ cd docker
$ touch .env.local
$ echo APP_ENV=local >> .env.local
$ echo APP_NAME={YOUR_PROJECT_NAME} >> .env.local
$ echo LOG_LEVEL=info >> .env.local
$ echo CDK_DEFAULT_ACCOUNT={YOUR_AWS_ACCOUNT} >> .env.local
$ echo CDK_DEFAULT_REGION={YOUR_AWS_REGION} >> .env.local

## Installation of node_modules 
$ docker compose up -d
$ docker-compose exec e2e-test-boilerplate /bin/bash -c 'cd scripts && yarn install'
$ docker-compose exec e2e-test-boilerplate /bin/bash -c 'cd cdk && yarn install'
```

## How to Create Tests and Run Locally
- Add a test file to the 'scripts/scenario' directory
```
ex) hatena/hatena.spec.ts
$ docker-compose exec e2e-test-boilerplate /bin/bash
$ cd scripts/
$ yarn test scenario/hatena/hatena.spec.ts 
```
- Screenshots are saved in scripts/screenshots

## Deploy to CloudWatch Synthetics
- Add index.ts for the handler.
- Load handler in script/index.ts
- Run aws configure inside the container to set up AWS CLI for use.
- Add a Synthetics Stack file under 'cdk/lib/scenario
- Run the command below
```
### build source
$ docker-compose exec e2e-test-boilerplate /bin/bash
$ cd /app/scripts/
$ yarn build

### Change environment variable to develop
$ export APP_ENV=develop

### deploy cdk
$ cd /app/cdk
$ cdk bootstrap
$ cdk diff
$ cdk deploy
```

### Future renovations
- Automate deployments with GithubActions
- Extending scripts/lib/LocalTesting.ts
