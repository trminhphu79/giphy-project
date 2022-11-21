import { Component, OnInit } from '@angular/core';
import { UploadFacade } from './facade/upload-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { BaseComponent } from './../../utils/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends BaseComponent implements OnInit {

  public form!: FormGroup;
  public arrayFilesLink: string[] = []
  constructor(
    public __uploadFacade: UploadFacade,
    private __fb: FormBuilder,
    private __matSnackbar: MatSnackBar

  ) {
    super()
  }

  ngOnInit(): void {
    this.#initForm();
    this.registerCoreLayer();
  }


  override registerCoreLayer(): void {
  }


  #initForm() {
    this.form = this.__fb.group({
      title: [null, Validators.required],
      tags: [null, Validators.required],
      username: [null, Validators.required],
    })
  };

  async uploadFile(event: any) {

    let { files } = event.target
    if (files && files.length > 1) {
      this.uploadMultiple(files)
    } else {
      this.uploadSingle(files[0])
    }
  }

  uploadSingle(file: File) {
    let random = Math.floor(Math.random() * 10000);
    this.__uploadFacade.uploadFile(file, `file-${random}`).subscribe({
      next: (res) => {
        this.arrayFilesLink.push(res)
      },
      error: (err) => {
        throw err
      }
    })
  }

  uploadMultiple(files: FileList) {

    let request$: Array<Observable<any>> = [];
    let random = null;

    Object.keys(files).forEach((key) => {
      random = Math.floor(Math.random() * 10000);
      request$.push(this.__uploadFacade.uploadFile(files[+key], `file-${random}`))
    });

    forkJoin(request$).subscribe({
      next: (res) => {
        this.arrayFilesLink.push(...res)
      },
      error: (err) => {
        throw err
      }
    });
  }

  submit() {
    if (this.arrayFilesLink && this.arrayFilesLink.length && this.form.valid) {
      this.__uploadFacade.createGif$({ ...this.form.value, files: this.arrayFilesLink }).subscribe({
        next: (value) => {
          this.__matSnackbar.open(`Upload thành công!`, 'CREATE', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.form.reset();
          this.arrayFilesLink = [];
        },
        error: (err) => {
          throw err
        }
      })
    }else{
      this.__matSnackbar.open(`Vui lòng kiểm tra lại thông tin`, 'CREATE', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    }
  }
}
