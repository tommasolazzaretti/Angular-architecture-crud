import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmModalComponent} from './confirm-modal.component';
import {ClrModalModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      imports: [
        ClrModalModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    component.title = 'Modal Title';
    component.bodyText = 'Modal BodyText';
    component.isOpen = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should has title 'Modal Title'`, () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-title').textContent).toContain('Modal Title');
  });

  it(`should has bodyText 'Modal BodyText'`, () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-body').textContent).toContain('Modal BodyText');
  });

});
