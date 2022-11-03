import { Router } from 'express';
import Model from '../database/models/Matches';
import Controller from '../controllers/matches.controller';
import Service from '../services/matches.service';
import Middleware from '../middlewares/login.middleware';

const matches = Router();
const controller = new Controller(new Service(Model));

matches.get('/', controller.getAllMatches);
matches.post(
  '/',
  Middleware.validateToken,
  controller.createMatch,
);

export default matches;
