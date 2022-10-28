import { STRING, INTEGER, Model } from 'sequelize';
import DB from '.';

class Teams extends Model {
  public id?: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: DB,
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
