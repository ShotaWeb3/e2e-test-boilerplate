#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HatenaTestStack } from '../lib/scenario/HatenaTestStack';

const app = new cdk.App();
new HatenaTestStack(app, 'CdkE2EStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
});
