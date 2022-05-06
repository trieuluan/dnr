import { Injectable, Logger } from "@nestjs/common";
import { SftpClientService } from "nest-sftp";
import { ConnectConfig } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { DnrMaster, DnrMasterDocument } from "../schemas/dnrMaster.schema";
import { Model } from "mongoose";
import { DnrBuyInart, DnrBuyInartDocument } from "../schemas/dnrBuyInart.schema";

@Injectable()
export class SharesService {
  private readonly logger: Logger;
  constructor(
    private readonly sftpClient: SftpClientService,
    @InjectModel(DnrMaster.name) private dnrMasterModel: Model<DnrMasterDocument>,
    @InjectModel(DnrBuyInart.name) private dnrBuyInartModel: Model<DnrBuyInartDocument>
  ) {
    this.logger = new Logger();
  }

  async findAllB(): Promise<DnrBuyInart[]> {
    return this.dnrBuyInartModel.find().exec();
  }

  async findAll(): Promise<DnrMaster[]> {
    return this.dnrMasterModel.find().populate('dnr_buy_inart').exec();
  }

  async list(remotePath: string): Promise<any[]> {
    return await this.sftpClient.list(remotePath);
  }

  async download(remotePath: string, localPath: string): Promise<string | Buffer | NodeJS.WritableStream> {
    return await this.sftpClient.download(remotePath, localPath);
  }

  async submit(remotePath: string, localPath: string, submitConfig: ConnectConfig<any>): Promise<string | NodeJS.ReadableStream | Buffer> {
    await this.sftpClient.resetConnection(submitConfig);
    return await this.sftpClient.upload(remotePath, localPath);
  }
}
