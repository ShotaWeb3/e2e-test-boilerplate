import { TestingFactory } from "../../lib/TestingFactory";

const synthetics = TestingFactory.createTesting();
const logger = TestingFactory.createLogger();

const url = 'https://b.hatena.ne.jp/';

const testName = 'hatenaTechBlog';

const testScript = async function () {
  logger.info(`Start script: ${testName}`);

  const page = await synthetics.getPage();
  const navigationPromise = page.waitForNavigation()
  
  await synthetics.executeStep(`${testName} step1`, async function() {
    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000})
  })
  
  await synthetics.executeStep(`${testName} step2`, async function() {
    await page.waitForSelector('.navi-body > .cat-it > .navi-link > .navi-link-text > span')
    await page.click('.navi-body > .cat-it > .navi-link > .navi-link-text > span')
  })
  
  await navigationPromise
  
  await synthetics.executeStep(`${testName} step3`, async function() {
    await page.waitForSelector('#container > .navi-page > .navi-page-mode > li:nth-child(2) > a')
    await page.click('#container > .navi-page > .navi-page-mode > li:nth-child(2) > a')
  })
  
  await navigationPromise

  await synthetics.executeStep(`${testName} step4`, async function() {
    await page.waitForSelector('.entrylist-header-main > .cat-it > .entrylist-contents > .entrylist-contents-main > .entrylist-contents-users > .js-keyboard-entry-page-openable')
    await page.click('.entrylist-header-main > .cat-it > .entrylist-contents > .entrylist-contents-main > .entrylist-contents-users > .js-keyboard-entry-page-openable')
  })
  
  await navigationPromise

  logger.info(`End script: ${testName}`);
  await TestingFactory.finishTest(synthetics);
}

TestingFactory.executeTestIfLocal(testScript);

export default testScript;
