import AbstractRepository from 'core/domain/repositories/abstract.repository';
import mongoose, { Model, Schema, model } from 'mongoose';

export default class BaseMongo<T> implements AbstractRepository<T> {
  private baseModel: Model<T>;
  private collectionName: string;
  constructor(schema: Schema, collectionName: string) {
    // Connect to MongoDB
    mongoose
      .connect(process.env.MONGO_URI as string, {
        dbName: process.env.MONGO_DB_NAME as string,
      })
      .then(() => {
        // Check environment variable for debug mode
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Connected to MongoDB, collection:', collectionName);
        }
      });
    // This is for not create duplicate instances of the same model
    this.baseModel =
      mongoose.models[collectionName] || model<T>(collectionName, schema);
    this.collectionName = collectionName;
  }

  async getAll(): Promise<T[]> {
    const users = await this.baseModel.find().exec();
    if (!users || users.length === 0) {
      return [];
    }
    return users.map((user) => user.toObject());
  }

  async getById(id: string): Promise<T> {
    const foundDocument = await this.baseModel.findById(id).exec();
    if (!foundDocument) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    return foundDocument.toObject();
  }

  async getFirst(): Promise<T> {
    const users = await this.baseModel.find().exec();
    if (!users || users.length === 0) {
      throw new Error(`No documents found in ${this.collectionName}`);
    }
    return users[0].toObject();
  }

  async create(object: T): Promise<T> {
    const newDocument = new this.baseModel(object);
    const savedDocument = await newDocument.save();
    return savedDocument.toObject();
  }
  async update(id: string, object: T): Promise<T> {
    const updatedDocument = await this.baseModel
      .findByIdAndUpdate(id, object)
      .exec();
    if (!updatedDocument) {
      throw new Error(
        `Document with id ${id} not found in ${this.collectionName}`,
      );
    }
    return updatedDocument.toObject();
  }
  async delete(id: string): Promise<void> {
    await this.baseModel.findByIdAndDelete(id).exec();
  }
}
