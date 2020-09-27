import { NextApiRequest, NextApiResponse } from "next";
import { Robot } from "./_lib/Robot";

const isDev = !process.env.AWS_REGION || false;

class Main {
  constructor() {
  }
  async index(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    try {
      const games = await new Robot(isDev).findGames();

      res.send(games);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
      console.error(e);
    }
  }
}

export default new Main().index;
