import { Router } from 'express';
import Model from '../database/models/Matches';
import Controller from '../controllers/matches.controller';
import Service from '../services/matches.service';
import Middleware from '../middlewares/login.middleware';
import MatchesMiddle from '../middlewares/matches.middleware';

const matches = Router();
const controller = new Controller(new Service(Model));

matches.get('/', controller.getAllMatches);
matches.post(
  '/',
  Middleware.validateToken,
  MatchesMiddle,
  controller.createMatch,
);
matches.patch(
  '/:id/finish',
  controller.finishMatch,
);
matches.patch(
  '/:id',
  controller.updateMatch,
);

export default matches;
