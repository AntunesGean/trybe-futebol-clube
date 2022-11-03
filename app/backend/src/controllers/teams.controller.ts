import { Request, Response } from 'express';
import Service from '../services/teams.service';

class Controller {
  constructor(private service: Service) {
    this.findAllTeams = this.findAllTeams.bind(this);
    this.findById = this.findById.bind(this);
  }

  async findAllTeams(req: Request, res: Response) {
    try {
      const teams = await this.service.findAllTeams();
      return res.status(200).json(teams);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await this.service.findById(id);
      return res.status(200).json(team);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default Controller;
