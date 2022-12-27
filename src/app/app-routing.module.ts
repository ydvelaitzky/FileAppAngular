import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListComponent } from './components/file-list/file-list.component';
import { NewFileComponent } from './components/new-file/new-file.component';

const routes: Routes = [
  /* {
  path: '',
  redirectTo: 'fileList',
  pathMatch: 'full'
}, */
  /* {
    path: 'newFile',
    component: NewFileComponent
  },
  {
    path: 'fileList',
    component: FileListComponent
  } */

  {
    path: '',
    children: [
      { path: '', component: FileListComponent },
      { path: 'newFile', component: NewFileComponent },
      { path: 'fileList', component: FileListComponent },
    ]
  }
  ,];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
