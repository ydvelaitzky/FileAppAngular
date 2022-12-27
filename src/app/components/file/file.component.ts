import { Component, EventEmitter, Input, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { file, fileType } from 'src/app/entities/file';
import { FileService } from 'src/app/services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  grp!: FormGroup;
  panelOpenState = false;
  _readonly = false;
  @Input() inFile: file | null = null;
  @Output() updatedOccured = new EventEmitter();
  listTypes = Object.values(fileType);//.filter((x: any) => isNaN(x));
  get readonly() {
    return this._readonly;
  }
  set readonly(val: boolean) {
    this._readonly = val;
    val ? this.grp.disable() : this.grp.enable();
  }

  constructor(private srv: FileService, private _snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<FileComponent>) {
    this.grp = new FormGroup({
      id: new FormControl(null, this.inFile ? [Validators.required] : []),
      fileName: new FormControl(null, [Validators.required, this.validText]),
      fileType: new FormControl(null, [Validators.required]),
      fileSize: new FormControl(null, [Validators.required]),
      author: new FormControl(),
      dateCreated: new FormControl(),
      isEncoded: new FormControl(),
    });
    this.grp.get('id')?.disable();
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;

  }

  grpAsFile(): file {
    return Object.assign(new file(), this.grp.getRawValue());
  }
  objToGrp(val: file) {
    this.grp.patchValue(val);
  }
  ngOnInit(): void {
    this.bindObjToGrp();
    if (!this.inFile) {//means- new
      this.panelOpenState = true;
      this.readonly = false;
    };
  }
  bindObjToGrp() {
    this.inFile && this.objToGrp(this.inFile);
  }
  edit() {
    this.readonly = false;
    this.panelOpenState = true;
  }
  delete() {
    this.srv.remove(this.grpAsFile().id).subscribe(x => this.updatedOccured.emit());
  }
  expand(open: boolean) {
    this.panelOpenState = open;
    this.readonly = true;
  }

  get fileSummery() {
    if (!this.inFile)
      return '';
    return `${this.inFile.fileName}. גודל: ${this.inFile.sizeFormatted} `

  }


  save() {
    debugger;
    if (!this.grp.valid) return;
    if (this.inFile)
      this.srv.update(this.grpAsFile()).subscribe(x => this.updatedOccured.emit());
    else
      this.srv.insert(this.grpAsFile()).subscribe(x => this.updatedOccured.emit());

    this.dialogRef?.close();

  }
  clear() {
    this.grp.reset();
    this.bindObjToGrp();
  }


  validText(control: AbstractControl): ValidationErrors | null {
    const text = control.value;
    //
    debugger;
    ///^[a-z\u0590-\u05fe]+$/i
    let regexp = new RegExp(/^[a-z\u0590-\u05fe]+$/i);
    const valid = regexp.test(text);
    if (!valid)
      return { 'validText': false }
    return null;

  }

}
