import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import getters from 'mongoose-lean-getters';

import { schemaOptions, getModel, id } from '../utils';

@plugin(getters)
@modelOptions({
  options: { customName: 'acronym' },
  schemaOptions
})
export class IAcronym extends TimeStamps implements Base<string> {
  id: string;

  @prop(id)
  public _id: string;

  @prop({ required: true })
  public acronym: string;

  @prop({ required: true })
  public definition: string;
}

export const Acronym = getModel(IAcronym);
