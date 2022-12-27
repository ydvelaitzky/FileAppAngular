import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }


  colorByIndex(inde: number) {
    if (this._colorList.length <= inde) {
      const len = inde - this._colorList.length + 1;
      for (let y = 0; y < len; y++) {
        let rgb = [];
        for (var i = 0; i < 3; i++)
          //push another color if index not exist yet:
          rgb.push(Math.floor(Math.random() * 255));
        this._colorList.push(rgb);
      }

    }

    return this._colorList[inde];

  }
  _colorList: Array<Array<number>> = [];

}
