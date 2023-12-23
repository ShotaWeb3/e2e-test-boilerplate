import puppeteer, { Browser, Page } from "puppeteer";
import LocalLogger from "./LocalLogger";

export default class LocalTesting {
  private browser: Browser | null;
  private page: Page | null;
  private logger: LocalLogger;

  constructor() {
    this.browser = null;
    this.page = null;
    this.logger = new LocalLogger();
  }

  /**
   * ブラウザの初期化
   */
  private async initialize() {  
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
    this.page = await this.browser.newPage();
  }

  /**
   * ブラウザを取得
   * @returns Browser
   */
  public async getPage() {
    if (!this.page) {
      await this.initialize();
    }
    return this.page;
  }

  /**
   * ステップ実行
   * @param step string
   * @param callback Promise<void>
   */
  public async executeStep(step: string, callback: () => Promise<void>) {
    this.logger.info(`Executing step: ${step}`);
    try {
      await callback();
    } catch (e) {
      this.logger.error(`Error executing step: ${step}`, e);
    }
    await this.page?.screenshot({path: `./screenshots/${step}.png`})
    this.logger.info(`Finished step: ${step}`);
  }

  public async finish() {
    this.logger.info("Close local test");
    await this.browser?.close();
  }
}
