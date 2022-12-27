import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { file } from 'src/app/entities/file';
import { FileService } from 'src/app/services/file.service';
import { FileComponent } from '../file/file.component';
import { NewFileComponent } from '../new-file/new-file.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  @ViewChildren(FileComponent) filesComp!: QueryList<FileComponent>;
  fileList: Array<file> = [];
  constructor(private srv: FileService, public cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.srv.getFileList().subscribe(x => {
      this.fileList = x;
    });
  }

  ngOnInit(): void {
  }

  reload() {
    this.cdr.detectChanges();
    this.filesComp.forEach(element => element.panelOpenState = false);
  }

  prepareDist() {
    const filesSeparatedToPackages = this.srv.prepareDistAlg()
  }
  newFile() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(NewFileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result: any) => {
        if (result) {
          this.reload();
        }
      },
    );
  }

  async split() {
    const array = await firstValueFrom(this.srv.getFileList());
    const huges = array.filter(x => x.fileSize > this.srv.c_size);
    debugger;
    huges.forEach(f => {
      const size = f.fileSize;
      let filesCount = Math.ceil(size / this.srv.c_size);
      //create files:
      for (let i = 0; i < filesCount; i++) {
        let partialFile = new file(f);
        partialFile.fileName = `${partialFile.fileName}_${i + 1} `
        partialFile.fileSize = i < filesCount -1  ? this.srv.c_size : size % this.srv.c_size;
        partialFile.dateCreated = new Date();
        //add to list
        this.srv.insert(partialFile).subscribe();
      }
      //delete source file from list:
      this.srv.remove(f.id).subscribe();

    })


  }
}
