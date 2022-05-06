import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SftpModule } from "nest-sftp";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DnrMaster, DnrMasterSchema } from "../schemas/dnrMaster.schema";
import { DnrBuyInart, DnrBuyInartSchema } from "../schemas/dnrBuyInart.schema";

@Module({
  providers: [SharesService],
  imports: [
    SftpModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('sftp');
      },
      inject: [ConfigService],
      imports: [SharesModule],
    }, false),
    MongooseModule.forFeature([
      {name: DnrMaster.name, schema: DnrMasterSchema},
      {name: DnrBuyInart.name, schema: DnrBuyInartSchema}
    ])
  ],
  exports: [SharesService]
})
export class SharesModule {}
