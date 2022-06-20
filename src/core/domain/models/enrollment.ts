export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export default interface Enrollment {
  schoolId: string;
  userId: string;
  level: number;
  status: EnrollmentStatus;
  userName: string;
  schoolName: string;
}
