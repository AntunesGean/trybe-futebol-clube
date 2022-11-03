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

  async getAllMatchesInProgress(inProgress: string) {
    const bool = inProgress === 'true';
    const matches = this.model.findAll({
      where: { inProgress: bool },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async createMatch(match: Matches) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const newMatch = this.model.create(match);
    return newMatch;
  }
}

export default MatchService;
