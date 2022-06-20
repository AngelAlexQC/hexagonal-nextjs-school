import BaseMongo from './base-mongo.datasource';
import User from 'core/domain/models/user';
import TRepository from 'core/domain/repositories/user.repository';
import { Schema } from 'mongoose';

export default class UserMongo extends BaseMongo<User> implements TRepository {
  constructor() {
    const userSchema: Schema<User> = new Schema(
      {
        email: {
          required: true,
          type: String,
          unique: true,
        },
        firstName: {
          required: true,
          type: String,
        },
        lastName: {
          required: true,
          type: String,
        },
        password: {
          required: true,
          type: String,
        },
      },
      { timestamps: true },
    );
    super(userSchema, 'User');
  }
}
