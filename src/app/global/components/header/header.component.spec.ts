import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../../../../environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientModule,
        AuthModule.forRoot({
          domain: environment.domain,
          clientId: environment.clientId,
          audience: environment.audience,
          httpInterceptor: {
            allowedList: [`${environment.urlService}/${environment.blocklistService}`],
          },
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should has title 'Amazing Web Filter'`, () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Amazing Web Filter');
  });

});
