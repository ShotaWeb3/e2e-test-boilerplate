import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as synthetics from 'aws-cdk-lib/aws-synthetics';
import { Construct } from 'constructs';

const testName = 'hatena-tech';

export class HatenaTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new synthetics.Canary(this, `${process.env.APP_ENV}-${process.env.APP_NAME}-${testName}-canary`, {
      canaryName: `${process.env.APP_ENV}-${testName}`,
      schedule: synthetics.Schedule.once(),
      test: synthetics.Test.custom({
        code: synthetics.Code.fromAsset(path.join(__dirname, '../../../scripts/dist')),
        handler: 'bundle.hatenaHandler',
      }),
      runtime: synthetics.Runtime.SYNTHETICS_NODEJS_PUPPETEER_6_0,
      environmentVariables: {
        APP_ENV: process.env.APP_ENV || 'develop',
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      },
    });
  }
}
