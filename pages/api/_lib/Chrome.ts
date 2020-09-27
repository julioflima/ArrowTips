import chrome from "chrome-aws-lambda";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export class Chrome {
  private chromeExecPaths: { win32: string; linux: string; darwin: string };
  exePath: string;

  constructor() {
    this.chromeExecPaths = {
      win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      linux: "/usr/bin/google-chrome-stable",
      darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    };

    this.exePath = this.chromeExecPaths[process.platform];
  }

  public async getOptions(isDev: boolean): Promise<Options> {
    let options: Options;

    if (isDev) {
      options = {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-infobars",
          "--window-position=0,0",
          "--ignore-certifcate-errors",
          "--ignore-certifcate-errors-spki-list",
          '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
        ],
        executablePath: this.exePath,
        headless: false,
      };
    } else {
      options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      };
    }

    return options;
  }
}
