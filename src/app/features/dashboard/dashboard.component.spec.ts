import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Dashboard');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
