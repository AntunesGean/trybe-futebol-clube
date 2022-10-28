import { STRING, INTEGER, Model } from 'sequelize';
import DB from '.';

class Users extends Model {
  public id?: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

Users.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: DB,
  tableName: 'users',
  underscored: true,
  timestamps: false,
});

export default Users;
