import { Controller, Get } from "@nestjs/common";
import { SharesService } from "../shares/shares.service";
import moment from "moment";
import path from "path";
import fs from 'fs';
import StreamZip from "node-stream-zip";

@Controller('sftp')
export class SftpController {
  constructor(private readonly shareService: SharesService) {}

  @Get('download-dnr')
  public async downloadFile() {
    const {gold_data, dnr_promotion} = SftpController.fileDrn();
    if (!fs.existsSync(gold_data.local)) {
      fs.mkdirSync(gold_data.local, {recursive: true});
    }
    if (!fs.existsSync(dnr_promotion.local)) {
      fs.mkdirSync(dnr_promotion.local, {recursive: true});
    }
    await this.shareService.download(gold_data.path+gold_data.file, gold_data.local+gold_data.file);
    await this.shareService.download(dnr_promotion.path+dnr_promotion.file, dnr_promotion.local+dnr_promotion.file);
    await SftpController.extractFile(gold_data.local + gold_data.file, gold_data.extraPath);
    await SftpController.extractFile(dnr_promotion.local + dnr_promotion.file, dnr_promotion.extraPath);
    return { success: true };
  }

  @Get('dnr-master')
  public async allDnrMaster() {
    return await this.shareService.findAll();
  }

  private static async extractFile(file, extra) {
    const zip = new StreamZip.async({file});
    const entries = await zip.entries();
    for (const entry of Object.values(entries)) {
      await zip.extract(entry, extra);
    }
    // await zip.close();
  }

  private static fileDrn() {
    const current = moment().format('DD-MM-yyyy');
    const date = moment().format('yyyyMMDD');
    const localPath = path.join(__dirname, '..', '/upload')+'/file/'+current+'/';
    const extraPath = path.join(__dirname, '..', '/upload')+'/extract/'+current+'/';
    return {
      gold_data: {
        path: '/ECOMMERCE/B2C/UAT/OUTBOUND/GOLD/UPLOAD/',
        md5: 'gold_data_'+date+'.md5',
        file: 'gold_data_'+date+'.zip',
        local: localPath,
        extraPath: extraPath
      },
      dnr_promotion: {
        path: '/ECOMMERCE/B2C/UAT/OUTBOUND/CRM/UPLOAD/',
        md5: 'dnr_promotion_'+date+'.md5',
        file: 'dnr_promotion_'+date+'.zip',
        local: localPath,
        extraPath: extraPath
      }
    };
  }
}
