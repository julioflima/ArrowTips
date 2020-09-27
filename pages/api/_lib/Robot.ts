import puppeteer, { Page } from "puppeteer-core";
import { Chrome } from "./Chrome";

export class Robot {
  private page: Page | null;
  private chrome: Chrome;
  private puppeteer: typeof puppeteer;
  private baseUrl: string;
  private isDev: boolean;
  constructor(isDev: boolean) {
    this.isDev = isDev;
    this.chrome = new Chrome();
    this.puppeteer = puppeteer;
    this.baseUrl = "https://www.bet365.com/#/AS/B83/";
  }

  private async getPage(): Promise<Page> {
    if (this.page) {
      return this.page;
    }

    const options = await this.chrome.getOptions(this.isDev);
    const browser = await this.puppeteer.launch(options);

    this.page = await browser.newPage();

    return this.page;
  }

  public async findGames() {
    try {
      const page = await this.getPage();

      await page.goto(this.baseUrl, { waitUntil: "networkidle2" });


      const games = await page.evaluateHandle(() => {
        const element = document.querySelectorAll(
          ".gl-MarketGroupContainer div:last-child div.sm-SplashMarketContainer_Expanded"
        );
        const objects = [];
        const games = [];

        console.log(element);

        element.forEach((each) => objects.push(...each.childNodes));
        objects.forEach((each) => games.push(each.childNodes[0].innerText));

        console.log(games);
      });

      console.log(games);

      return games;
    } catch (error) {
      console.error(error);
    }
  }

  private async getScreenshot(): Promise<ArrayBuffer> {
    const page = await this.getPage();

    await page.setViewport({ width: 800, height: 600 });

    const file = await page.screenshot({ type: "png" });

    return file;
  }
}
