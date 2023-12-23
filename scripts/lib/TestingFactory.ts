import LocalTesting from "./LocalTesting";
import LocalLogger from "./LocalLogger";

export const TestingFactory = {
  createTesting: (): any => {
    try {
      return require('Synthetics');
    } catch (e) {
      return new LocalTesting();
    }
  },
  finishTest:async (testing:any) => {
    if (testing instanceof LocalTesting) {
      await testing.finish();
    }
  },
  executeTestIfLocal:async (scenario: () => Promise<void>) => {
    if (process.env.APP_ENV === 'local') {
      await scenario();
    }
  },
  createLogger: (): any => {
    try {
      return require('SyntheticsLogger');
    } catch (e) {
      return new LocalLogger();
    } 
  }
}
