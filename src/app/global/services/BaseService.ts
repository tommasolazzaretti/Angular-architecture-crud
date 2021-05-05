import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * base class service, contains all the basic operations of
 * crud so that the services created already have all the
 * default operations they need
 *
 * just need to manage the naming of the ID value so that it
 * is consistent with the whole structure, I recommend the
 * use of die mapper for greater scalability
 * https://www.npmjs.com/package/object-mapper
 */
export class BaseService<T> {
  /**
   * environment base url application
   * (es. : http://localhost:3000)
   * @protected
   */
  protected url = environment.urlService;
  /**
   * list like an observable return the complete list of elements
   * auto-update on save, update and delete
   * @protected
   */
  protected elementsList = new BehaviorSubject<T[]>([]);
  /**
   * store our data in memory
   * @protected
   */
  protected dataStore: { elementsList: T[] } = {elementsList: []};

  /**
   * http si an httpClient angular
   * serviceUrl is a parameter passed by the service that implements the basic service
   * @param http
   * @param serviceUrl
   */
  constructor(protected http: HttpClient, protected serviceUrl: string) {
  }

  /**
   * example : list$: Observable<T[]> = blockListService.allElements
   * return the all elements like Observable
   */
  get allElements(): Observable<T[]> {
    return this.elementsList.asObservable();
  }

  /**
   * simple http GET all elements
   */
  getListOfElements(): void {
    this.http.get<T[]>(`${(this.url)}/${(this.serviceUrl)}`).subscribe(
      data => {
        this.dataStore.elementsList = data;
        this.elementsList.next(Object.assign({}, this.dataStore).elementsList);
      },
      error => console.log(`Could not getAll element List of ${(this.serviceUrl)}.`)
    );
  }

  /**
   * simple http DELETE by ID
   */
  deleteElement(id: string): void {
    this.http.delete(`${(this.url)}/${(this.serviceUrl)}/${id}`).subscribe(
      response => {
        this.dataStore.elementsList.forEach((element: any, i) => {
          if (element?.id === id) {
            this.dataStore.elementsList.splice(i, 1);
          }
        });
        this.elementsList.next(Object.assign({}, this.dataStore).elementsList);
      },
      error => console.log(`Could not delete element with id: ${id} for ${(this.serviceUrl)}.`)
    );
  }

  /**
   * save or update the new element
   */
  saveOrUpdateElement(element: any): void {
    if (element.id) {
      this.http.patch<T>(`${(this.url)}/${(this.serviceUrl)}/${element.id}`, element).subscribe(
        (data: any) => {
          this.dataStore.elementsList.forEach((item: any, i) => {
            if (item.id === data.id) {
              this.dataStore.elementsList[i] = data;
            }
          });
          this.elementsList.next(Object.assign({}, this.dataStore).elementsList);
        },
        error => console.log(`Could not update ${(this.serviceUrl)}.`)
      );
    } else {
      this.http.post<T>(`${(this.url)}/${(this.serviceUrl)}`, element).subscribe(
        data => {
          this.dataStore.elementsList.push(data);
          this.elementsList.next(Object.assign({}, this.dataStore).elementsList);
        },
        error => console.log(`Could not save ${(this.serviceUrl)}.`)
      );
    }
  }

}
