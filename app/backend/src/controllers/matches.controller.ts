import { Request, Response } from 'express';
import Service from '../services/matches.service';

class Controller {
  constructor(private service: Service) {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
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
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  }

  async createMatch(req: Request, res: Response) {
    try {
      const { body } = req;
      const match = await this.service.createMatch({ ...body, inProgress: true });
      return res.status(201).json(match);
    } catch (error) {
      const err = error as Error;
      return res.status(422).json({ message: err.message });
    }
  }

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      const err = error as Error;
      return res.status(422).json({ message: err.message });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const match = await this.service.updateMatch(id, body);
      return res.status(200).json(match);
    } catch (error) {
      const err = error as Error;
      return res.status(422).json({ message: err.message });
    }
  }
}

export default Controller;
