import { ITeam } from '../interfaces';
import Teams from '../database/models/Teams';

class TeamsServices {
  constructor(private model: typeof Teams) {}

  async findAllTeams(): Promise<ITeam[]> {
    const teams = this.model.findAll();
    return teams;
  }

  async findById(id: string): Promise<ITeam | null> {
    const teamId = this.model.findByPk(id);
    if (!teamId) {
      throw new Error('Team not found');
    }
    return teamId;
  }
}

export default TeamsServices;
