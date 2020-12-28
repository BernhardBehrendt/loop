import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLetsStartComponent } from './page-lets-start.component';

describe('PageLetsStartComponent', () => {
  let component: PageLetsStartComponent;
  let fixture: ComponentFixture<PageLetsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLetsStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLetsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
