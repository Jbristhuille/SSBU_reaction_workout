import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayZoneComponent } from './play-zone.component';

describe('PlayZoneComponent', () => {
  let component: PlayZoneComponent;
  let fixture: ComponentFixture<PlayZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
