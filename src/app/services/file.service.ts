import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable, of } from 'rxjs';
import { file, fileType } from '../entities/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly c_size = 1000000000;
  constructor() { }

  demoList = [
    new file({ id: 100, fileName: 'nameA', fileSize: 1000000010, fileType: fileType.Docx, author: 'ראובן כהן', dateCreated: new Date(1984, 3, 2), isEncoded: true }),
    new file({ id: 101, fileName: 'nameB', fileSize: 820000000, fileType: fileType.jpg, author: 'שמעון לוי', dateCreated: new Date(1980, 3, 12), }),
    new file({ id: 102, fileName: 'nameC', fileSize: 400000000, dateCreated: new Date(2000, 6, 1), }),
    new file({ id: 103, fileName: 'nameD', fileSize: 502000000, dateCreated: new Date(2012, 5, 1), isEncoded: false }),
    new file({ id: 104, fileName: 'nameE', fileSize: 50000000, dateCreated: new Date(2012, 5, 1), isEncoded: false }),
    new file({ id: 105, fileName: 'nameF', fileSize: 800000000, dateCreated: new Date(2012, 5, 1), isEncoded: true })
  ];
  getFileList(): Observable<Array<file>> {
    return of(this.demoList);
  }

  update(fileToSave: file) {
    //go to server to update data...

    const obs = new Observable(observer => {
      const item = this.demoList.find(x => x.id == fileToSave.id)!;
      Object.assign(item, fileToSave);
      observer.next(true)
      observer.complete()
    })
    return obs;
  }

  insert(file: file) {
    const obs = new Observable(observer => {
      //generate new Id:
      const maxId = Math.max(...this.demoList.map(x => x.id))
      file.id = maxId + 1;
      this.demoList.push(file);
      debugger;
      observer.next(true)
      observer.complete()
    })
    return obs;
  }

  remove(fileId: number) {
    const obs = new Observable(observer => {
      const ind = this.demoList.map(x => x.id).indexOf(fileId);
      ~ind && this.demoList.splice(ind, 1);
      observer.next(true)
      observer.complete()
    })
    return obs;
  }

  async prepareDistAlg() {
    const GB1 = this.c_size;//1,000,000,000 bytes
    const orderedList = await (await firstValueFrom(this.getFileList()))
      .sort((a, b) => a.fileSize < b.fileSize ? 1 : -1);

    while (orderedList.some(x => !x.packageNo)) {
      //get unused package number:
      const newPackageNo = ((orderedList.map(x => x.packageNo).sort((a, b) => a < b ? 1 : -1)[0]) ?? 0) + 1;
      //loop on list and collect items in the limit size:
      for (let i = 0; i < orderedList.length; i++) {
        if (orderedList[i].packageNo) continue;//already handled
        const totalTillHere = orderedList.filter(x => x.packageNo === newPackageNo)
          .reduce((a, b) => a + b.fileSize, 0);
        if (totalTillHere + orderedList[i].fileSize <= GB1)
          orderedList[i].packageNo = newPackageNo;

      }
    }

  }

}
