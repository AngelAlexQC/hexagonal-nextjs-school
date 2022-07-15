import SchoolMongo from 'core/infrastructure/database/mongo/school-mongo.datasource';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function schoolController(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method, query } = request;
  const id = query.id as string;
  const schoolRepository = new SchoolMongo();

  const school = await schoolRepository.getById(id);

  if (!school) {
    return response.status(404).json({
      message: 'Not found',
    });
  }

  if (method === 'GET') {
    return response.status(200).json({
      school,
    });
  }

  if (method === 'PUT') {
    const { body } = request;
    const updatedSchool = await schoolRepository.update(id, body);

    return response.status(200).json({
      school: updatedSchool,
    });
  }

  if (method === 'DELETE') {
    // Get schools
    const schools = await schoolRepository.getAll();
    // Remove first school
    const removedSchool = schools.shift();
    // Delete first school
    await schoolRepository.delete(removedSchool?.id as string);
    return response.status(200).send(true);
  }
}
