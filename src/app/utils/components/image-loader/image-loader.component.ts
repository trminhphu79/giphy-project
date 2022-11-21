import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {

  @Input('imageSource') imageSource: any;
  @ViewChild('divIntersectContainer') divIntersectContainer!: ElementRef;
  @ViewChild('imageEl') imageEl!: ElementRef;
  loading: boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  observerCallback(entries: any, observer: any) {
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      this.loading = true;
      if (entry.isIntersecting) {
        let imgSrc = this.imageEl.nativeElement.getAttribute('data-imagesrc');

        this.http.get(imgSrc,
          {
            responseType: 'blob',
            reportProgress: true,
            observe: "events",
            headers: new HttpHeaders(
              { 'Content-Type': 'application/json' })
          })
          .subscribe((event: any) => {
            if (event.type === HttpEventType.Response) {
              this.loading = false;
              this.imageEl.nativeElement.src = window.URL.createObjectURL(event.body);
              this.imageEl.nativeElement.className = '';
            }
          });

        observer.unobserve(entry.target);
      }
    }
  }

  ngAfterViewInit() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    let observer = new IntersectionObserver(this.observerCallback.bind(this), options);
    observer.observe(this.divIntersectContainer.nativeElement);
  }

}
