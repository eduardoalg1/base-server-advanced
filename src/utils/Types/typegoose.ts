/* eslint-disable @typescript-eslint/no-explicit-any */
import { getModelForClass } from '@typegoose/typegoose';
import { Model, Document, Query } from 'mongoose';

export class AnyArray {
  public somethings?: any[];
}
export type Doc<T> = Partial<T>;

export type DocumentType<T> = Doc<T> & Document;

(Query.prototype as any).populateTs = function populateTs(props) {
  return this.populate(props);
};

export type MyModel<T, K extends Document = DocumentType<T>> = Model<K, T>;

export function getModel<T>(model: new () => T): MyModel<T> {
  return getModelForClass(model as any) as MyModel<T>;
}
