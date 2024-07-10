import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterTodosComponent } from './counter-todos.component';

describe('CounterTodosComponent', () => {
  let component: CounterTodosComponent;
  let fixture: ComponentFixture<CounterTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
