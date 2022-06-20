import BaseMongo from './base-mongo.datasource';
import School from 'core/domain/models/school';
import TRepository from 'core/domain/repositories/school.repository';
import { Schema } from 'mongoose';

export default class SchoolMongo
  extends BaseMongo<School>
  implements TRepository
{
  constructor() {
    const schoolSchema: Schema<School> = new Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: false,
        },
        logo: {
          type: String,
          required: false,
        },
      },
      { timestamps: true },
    );
    super(schoolSchema, 'schools');
  }
}
