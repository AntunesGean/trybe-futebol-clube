import { Request, Response } from 'express';
import Service from '../services/matches.service';

class Controller {
  constructor(private service: Service) {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
  }

  async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const matches = await this.service.getAllMatchesInProgress(inProgress as string);
        return res.status(200).json(matches);
      }
      const matches = await this.service.getAllMatches();
      return res.status(200).json(matches);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async createMatch(req: Request, res: Response) {
    try {
      const { body } = req;
      const match = await this.service.createMatch({ ...body, inProgress: true });
      return res.status(201).json(match);
    } catch (error: any) {
      return res.status(422).json({ message: error.message });
    }
  }
}

export default Controller;
