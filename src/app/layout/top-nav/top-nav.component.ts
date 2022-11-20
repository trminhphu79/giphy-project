import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@utils/base';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent extends BaseComponent implements OnInit {

  public form!: FormGroup;
  public menu: Array<{ name: string, path: string }> = [{
    name: "Home",
    path: ""
  }, {
    name: "Gif",
    path: "gif"
  },
  {
    name: "Sticker",
    path: "sticker"
  },
  {
    name: "My Gifs",
    path: ""
  },]
  constructor(private _fb: FormBuilder, private router: Router) {
    super();
    this.#initForm();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.form.get('searchControl')?.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged(),
      debounceTime(300)).subscribe((value) => {
        console.log(value)
      })
  }

  #initForm() {
    this.form = this._fb.group({
      searchControl: [null]
    })
  }

  goToPage(page: { name: string, path: string }) {
    this.router.navigate([`${page.path}`]);
  }

  viewUpload(){
    this.router.navigate(['/upload'])
  }
}
