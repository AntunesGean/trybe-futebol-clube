import { Router } from 'express';
import Model from '../database/models/Matches';
import Controller from '../controllers/matches.controller';
import Service from '../services/matches.service';

const matches = Router();
const controller = new Controller(new Service(Model));

matches.get('/', controller.getAllMatches);

export default matches;
