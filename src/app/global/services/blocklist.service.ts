import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Website} from '../model/website';
import {environment} from '../../../environments/environment';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class BlocklistService extends BaseService<Website> {

  constructor(http: HttpClient) {
    super(http, environment.blocklistService);
  }

}

