import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGifComponent } from './my-gif.component';

describe('MyGifComponent', () => {
  let component: MyGifComponent;
  let fixture: ComponentFixture<MyGifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
