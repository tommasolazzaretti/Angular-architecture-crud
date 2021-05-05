import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from './BaseService';

class Example {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends BaseService<Example> {

  constructor(http: HttpClient) {
    super(http, environment.exampleService);
  }

}

