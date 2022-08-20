import mongoose from 'mongoose';

export const id = {
  type: mongoose.Schema.Types.ObjectId,
  auto: true,
  get: (v) => (v ? String(v) : v)
};

export const archivedProp = { default: false, select: false };
export const schemaOptions = {
  timestamps: true,
  minimize: false,
  versionKey: false
};
