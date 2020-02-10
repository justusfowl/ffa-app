import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimesPage } from './times.page';

describe('TimesPage', () => {
  let component: TimesPage;
  let fixture: ComponentFixture<TimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
