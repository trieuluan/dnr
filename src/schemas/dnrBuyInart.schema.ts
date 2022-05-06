import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DnrBuyInartDocument = DnrBuyInart & Document;

@Schema({
  collection: 'dnr_buy_inart'
})
export class DnrBuyInart {
  @Prop({required: true, maxlength: 20})
  event_id: string;

  @Prop({maxlength: 20})
  multilink_id: string;

  @Prop({maxlength: 14})
  barcode: string;

  @Prop({maxlength: 14})
  article_code: string;

  @Prop({maxlength: 19})
  updated_date: string;

  @Prop({maxlength: 19})
  created_date: string;
}

export const DnrBuyInartSchema = SchemaFactory.createForClass(DnrBuyInart);
