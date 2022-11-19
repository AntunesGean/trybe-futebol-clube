import { Request, Response } from 'express';
import Service from '../services/leaderboard.service';

class Controller {
  constructor(private service: Service) {
    this.getLeaderboardAll = this.getLeaderboardAll.bind(this);
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
  }

  async getLeaderboardAll(_req: Request, res: Response) {
    try {
      const leaderboard = await this.service.getLeaderboardAll();
      res.status(200).json(leaderboard);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err);
    }
  }

  async getLeaderboardHome(_req: Request, res: Response) {
    try {
      const leaderboardHomeTime = await this.service.getLeaderboard('home_team', 'away_Team');
      return res.status(200).json(leaderboardHomeTime);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    try {
      const leaderboardHomeTime = await this.service.getLeaderboard('away_Team', 'home_team');
      return res.status(200).json(leaderboardHomeTime);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  }
}

export default Controller;
