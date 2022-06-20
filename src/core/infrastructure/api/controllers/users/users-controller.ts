import UserMongo from 'core/infrastructure/database/mongo/user-mongo.datasource';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function usersController(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request;
  const userRepository = new UserMongo();

  if (method === 'GET') {
    const users = await userRepository.getAll();
    return response.status(200).json({
      users,
    });
  }

  if (method === 'POST') {
    const { body } = request;
    const newUser = await userRepository.create(body);
    return response.status(200).json({
      user: newUser,
    });
  }

  return response.status(404).json({
    message: 'Not found',
  });
}
