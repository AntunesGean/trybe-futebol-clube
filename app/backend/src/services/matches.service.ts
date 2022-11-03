import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchService {
  constructor(private model: typeof Matches) {}

  async getAllMatches() {
    const matches = this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}

export default MatchService;
