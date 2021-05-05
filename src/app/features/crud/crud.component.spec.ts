import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CrudComponent} from './crud.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        AuthModule.forRoot({
          domain: environment.domain,
          clientId: environment.clientId,
          audience: environment.audience,
          httpInterceptor: {
            allowedList: [`${environment.urlService}/${environment.blocklistService}`],
          },
        }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Crud');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
