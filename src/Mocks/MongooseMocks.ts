import { clone } from 'lodash';

class properties {
  object;
  constructor(object) {
    this.object = object;
  }
  public exec() {
    return Promise.resolve(clone(this.object));
  }
  public lean() {
    return Promise.resolve(clone(this.object));
  }
  public select() {
    return this;
  }
  public sort() {
    return this;
  }
  public populate() {
    return this;
  }
  public skip() {
    return this;
  }
  public limit() {
    return this;
  }
}

class queries extends properties {
  object;
  constructor(object) {
    super(object);
    this.object = object;
  }
  public find() {
    return this;
  }
  public aggregate() {
    return Promise.resolve(clone(this.object));
  }
  public countDocuments() {
    return Promise.resolve(this.object);
  }
  public findOne() {
    return this;
  }
  public findById() {
    return this;
  }
  public create() {
    return Promise.resolve(clone(this.object));
  }

  public findOneAndUpdate() {
    return this;
  }

  public updateOne() {
    return this;
  }

  public findOneAndDelete() {
    return this;
  }
}

const updateMany = (): unknown => ({ rowsInserted: 1 });
const deleteMany = (): unknown => ({ deletedCount: 5 });

export default (data: unknown): unknown => ({
  find: () => new queries(data).find(),
  aggregate: () => new queries(data).aggregate(),
  findOne: () => new queries(data[0]).findOne(),
  findById: () => new queries(data[0]).findById(),
  countDocuments: () => new queries(10).countDocuments(),
  create: () => new queries(data[0]).create(),
  findOneAndUpdate: () => new queries(data[0]).findOneAndUpdate(),
  updateOne: () => new queries(data[0]).updateOne(),
  findOneAndDelete: () => new queries(data[0]).findOneAndDelete(),
  updateMany,
  deleteMany
});
