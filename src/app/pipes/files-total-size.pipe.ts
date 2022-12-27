import { Pipe, PipeTransform } from '@angular/core';
import { file } from '../entities/file';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'filesTotalSize'
})
export class FilesTotalSizePipe implements PipeTransform {

  constructor(private util: UtilsService) { }
  transform(fileList: Array<file>): string {
    const sizeBytes = fileList.reduce((a, b) => a + b.fileSize, 0);
    return this.util.formatBytes(sizeBytes);
  }

}
