import { Request, Response, NextFunction } from 'express';

function userMiddle(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam > 16 || awayTeam > 16) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}

export default userMiddle;
