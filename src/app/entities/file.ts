import { UtilsService } from "../services/utils.service";

export class file {
  constructor(file?: Partial<file>, private srv: UtilsService = new UtilsService()) {
    file && Object.assign(this, file);
  }

  id!: number;
  fileName!: string;
  fileType!: fileType;
  fileSize!: number;//holds size in bytes.
  author?: string;
  dateCreated?: Date;
  isEncoded?: boolean;
  packageNo!: number;

  get sizeFormatted() {
    return this.srv.formatBytes(this.fileSize)
  }

}


export enum fileType {
  PDF = "PDF", Docx = "Docx", xlsx = "xlsx", pptx = "pptx", jpg = "jpg"
};
