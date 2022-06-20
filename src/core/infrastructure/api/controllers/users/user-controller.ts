import UserMongo from 'core/infrastructure/database/mongo/user-mongo.datasource';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function userController(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method, query } = request;
  const id = query.id as string;
  const userRepository = new UserMongo();

  const user = await userRepository.getById(id);

  if (!user) {
    return response.status(404).json({
      message: 'Not found',
    });
  }

  if (method === 'GET') {
    return response.status(200).json({
      user,
    });
  }

  if (method === 'PUT') {
    const { body } = request;
    const updatedUser = await userRepository.update(id, body);

    return response.status(200).json({
      user: updatedUser,
    });
  }

  if (method === 'DELETE') {
    // Get users
    const users = await userRepository.getAll();
    // Remove first user
    const removedUser = users.shift();
    // Delete first user
    await userRepository.delete(removedUser?.id as string);
    return response.status(204).send(true);
  }
}
