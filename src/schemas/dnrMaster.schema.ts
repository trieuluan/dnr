import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { DnrBuyInart } from "./dnrBuyInart.schema";

export type DnrMasterDocument = DnrMaster & Document;

@Schema({
  collection: 'dnr_master',
  toJSON: {
    virtuals: true,
    getters: true
  }
})
export class DnrMaster {
  @Prop({ required: true, maxlength: 20 })
  event_id: string;

  @Prop({required: true, maxlength: 100})
  event_name: string;

  @Prop({maxlength: 2})
  discount_code: number;

  @Prop({maxlength: 2, enum: ['N', 'A', 'G']})
  discount_basis: string;

  @Prop({maxlength: 2, enum: ['S', 'M']})
  number_level: string;

  @Prop({maxlength: 2, enum: ['AS', 'BE', 'MU', 'AB', 'AR', 'OT']})
  discount_level_impact: string;

  @Prop()
  threshold_total: number;

  @Prop({maxlength: 1, enum: ['Y', 'N']})
  reward_status: string;

  @Prop({maxlength: 1, enum: ['Y', 'N']})
  user_mmprice_status: string;

  @Prop({maxlength: 1, enum: [0, 1, 2]})
  traget_level: string;

  @Prop({maxlength: 1, enum: [0, 1, 2]})
  order_type: string;

  @Prop({maxlength: 10})
  start_date: Date;

  @Prop({maxlength: 10})
  end_date: Date;

  @Prop({maxlength: 19})
  updated_date: string;

  @Prop({maxlength: 19})
  created_date: string;
}

const DnrMasterSchema = SchemaFactory.createForClass(DnrMaster);
DnrMasterSchema.virtual('dnr_buy_inart', {
  ref: DnrBuyInart.name,
  localField: 'event_id',
  foreignField: 'event_id'
});

export { DnrMasterSchema }
