import { Router } from 'express';
import Service from '../services/leaderboard.service';
import Controller from '../controllers/leaderboard.controller';

const leaderboard = Router();
const controller = new Controller(new Service());

leaderboard.get('/home', controller.getLeaderboardHome);
leaderboard.get('/away', controller.getLeaderboardAway);

export default leaderboard;
