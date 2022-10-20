import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpaseObject } from './SpaseObject';

@Injectable()
export class DataService {

  private url = "/api/SpaseObjects";

  constructor(private http: HttpClient) {
  }
  getSpaseObjects() {
    return this.http.get(this.url + '/Get');
  }
  getSpaseObjectsID(Id: number) {
    return this.http.get(this.url + '/GetId/' + Id);
  }
  getSpaseObject(Id: number) {
    return this.http.get(this.url + '/Get/' + Id);
  }
  createSpaseObject(spaseObject: SpaseObject) {
    return this.http.post(this.url + '/Post', spaseObject);
  }
  //костыль
  createSpaseObjectWithStarSystem(spaseObject: SpaseObject, Id: number) {
    return this.http.post(this.url + '/PostWithID/'+ Id, spaseObject);
  }
  updateSpaseObject(SpaseObject: SpaseObject) {
    return this.http.put(this.url + '/Put', SpaseObject);
  }
  deleteSpaseObject(Id: number) {
    return this.http.delete(this.url + '/Delete/' + Id);
  }
}
