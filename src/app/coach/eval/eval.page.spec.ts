import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvalPage } from './eval.page';

describe('EvalPage', () => {
  let component: EvalPage;
  let fixture: ComponentFixture<EvalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
