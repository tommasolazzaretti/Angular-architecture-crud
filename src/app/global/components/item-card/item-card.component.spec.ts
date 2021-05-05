import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ItemCardComponent} from './item-card.component';
import {Website} from '../../model/website';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  const webSite: Website = {
    id: 1,
    name: 'First entry',
    website: 'www.lastampa.it'
  };
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.website = webSite;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rendered input', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('First entry');
    expect(compiled.textContent).toContain('www.lastampa.it');
  });

});
