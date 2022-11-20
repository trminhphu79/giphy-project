import { Component, OnInit } from '@angular/core';
import { UploadFacade } from './facade/upload-facade.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public file!: File;
  public binary: string = ''
  constructor(public __uploadFacade: UploadFacade) { }

  ngOnInit(): void {
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  upload() {
    if (this.file) {
      console.log(this.file)
      let r = new FileReader();

      r.onload = function () {

      }
      r.readAsBinaryString(this.file);
      setTimeout(() => {
        console.log(r.result)
        this.__uploadFacade.uploadFiles({
          username: "trminhphu79",
          file: r.result,
          tags: "anime,animevietnam"
        })
      }, 1000)
      console.log('end')

    } else {
      alert("Please select a file first")
    }
  }
}
