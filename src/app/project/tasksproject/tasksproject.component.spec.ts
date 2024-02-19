import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksprojectComponent } from './tasksproject.component';

describe('TasksprojectComponent', () => {
  let component: TasksprojectComponent;
  let fixture: ComponentFixture<TasksprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
