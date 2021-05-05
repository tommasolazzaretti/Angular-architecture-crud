import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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
  constructor(protected http: HttpClient, protected serviceUrl: string) {
  }

  loadItemList(): Observable<T[]> {
    return this.http.get<T[]>(`http://localhost:3000/${(this.serviceUrl)}`);
  }

  getSingleItem(id: string): Observable<T> {
    return this.http.get<T>(`http://localhost:3000/${this.serviceUrl}/${id}`);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/${this.serviceUrl}/${id}`);
  }

  addItem(item: any): Observable<T> {
    console.log(' item save or update ', item);
    if (item?.id) {
      return this.http.patch<T>(`http://localhost:3000/${this.serviceUrl}/${item?.id}`, item, httpOptions);
    } else {
      return this.http.post<T>(`http://localhost:3000/${this.serviceUrl}`, item, httpOptions);
    }
  }

}
