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
        args: [],
        executablePath: this.exePath,
        headless: true,
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
