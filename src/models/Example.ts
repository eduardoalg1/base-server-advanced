import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import getters from 'mongoose-lean-getters';

import { schemaOptions, getModel, id } from '../utils';

@plugin(getters)
@modelOptions({
  options: { customName: 'example' },
  schemaOptions
})
export class IExample extends TimeStamps implements Base<string> {
  id: string;

  @prop(id)
  public _id: string;

  @prop({ required: true })
  public content: string;
}

export const Example = getModel(IExample);
