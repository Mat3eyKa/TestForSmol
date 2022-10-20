import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarSystem } from './StarSystem';

@Injectable()
export class DataService {
  private url = "/api/StarSystems";

  constructor(private http: HttpClient) {
  }
  getStarSystems() {
    return this.http.get(this.url + '/Get');
  }
  getStarSystem(Id: number) {
    return this.http.get(this.url + '/Get/' + Id);
  }
  getSpaseObjectsById(Id: number) {
    return this.http.get(this.url + '/GetObjectsName/' + Id);
  }
  createStarSystem(starSystem: StarSystem) {
    return this.http.post(this.url + '/Post', starSystem);
  }
  updateStarSystem(starSystem: StarSystem) {
    return this.http.put(this.url + '/Put', starSystem);
  }
  deleteStarSystem(Id: number) {
    return this.http.delete(this.url + '/Delete/' + Id);
  }
}
