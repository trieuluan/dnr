import { Module } from '@nestjs/common';
import { SftpController } from './sftp.controller';
import { SharesModule } from "../shares/shares.module";

@Module({
  controllers: [SftpController],
  imports: [SharesModule]
})
export class SftpModule {}
