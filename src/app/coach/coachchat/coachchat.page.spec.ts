import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachchatPage } from './coachchat.page';

describe('CoachchatPage', () => {
  let component: CoachchatPage;
  let fixture: ComponentFixture<CoachchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
