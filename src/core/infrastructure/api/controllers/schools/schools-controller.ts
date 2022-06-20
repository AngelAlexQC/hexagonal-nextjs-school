import SchoolMongo from 'core/infrastructure/database/mongo/school-mongo.datasource';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function schoolsController(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request;
  const schoolRepository = new SchoolMongo();

  if (method === 'GET') {
    const schools = await schoolRepository.getAll();
    return response.status(200).json({
      schools,
    });
  }

  if (method === 'POST') {
    const { body } = request;
    const newSchool = await schoolRepository.create(body);
    return response.status(200).json({
      school: newSchool,
    });
  }

  return response.status(404).json({
    message: 'Not found',
  });
}
