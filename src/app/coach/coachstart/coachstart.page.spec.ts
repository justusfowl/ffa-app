import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachstartPage } from './coachstart.page';

describe('CoachstartPage', () => {
  let component: CoachstartPage;
  let fixture: ComponentFixture<CoachstartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachstartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachstartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
