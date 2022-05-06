import { Module } from '@nestjs/common';
import { SftpModule as FtpModule } from './sftp/sftp.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/configuration';
import { SharesModule } from './shares/shares.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    FtpModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const mongo = configService.get('databases.mongodb');
        return {
          uri: 'mongodb://'+mongo.host+':'+mongo.port,
          connectionName: mongo.database,
          dbName: mongo.database,
        };
      },
      inject: [ConfigService]
    }),
    SharesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
