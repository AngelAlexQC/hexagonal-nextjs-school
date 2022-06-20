import AbstractRepository from './abstract.repository';
import Enrollment from 'core/domain/models/enrollment';

export default interface EnrollmentRepository
  extends AbstractRepository<Enrollment> {
  findByStudentId(studentId: string): Promise<Enrollment[]>;
}
