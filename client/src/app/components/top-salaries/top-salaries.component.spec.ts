import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSalariesComponent } from './top-salaries.component';

describe('TopSalariesComponent', () => {
  let component: TopSalariesComponent;
  let fixture: ComponentFixture<TopSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSalariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
