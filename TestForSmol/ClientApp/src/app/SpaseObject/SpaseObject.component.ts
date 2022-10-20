import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { SpaseObject } from './SpaseObject';

@Component({
  selector: 'SpaseObject',
  templateUrl: './SpaseObject.component.html',
  providers: [DataService]
})
export class SpaseObjectComponent implements OnInit {
  spaseObject: SpaseObject = new SpaseObject();   // изменяемый товар
  spaseObjects: SpaseObject[];                // массив товаров
  tableMode: boolean = true;          // табличный режим
  
  constructor(private dataService: DataService, private route: ActivatedRoute) { }
  starSystemId: number = this.route.snapshot.params['id'];
  spaseObjectsTypes: string[] = ['Звезда','Черная дыра','Планета','Астероид', 'Другое']
  ngOnInit() {
    this.loadSpaseObjects(this.starSystemId);    // загрузка данных при старте компонента  
  }
  // получаем данные через сервис
  loadSpaseObjects(starSystemId: number) {
    if (starSystemId == 0 || starSystemId == null || starSystemId == undefined){
      this.dataService.getSpaseObjects()
        .subscribe((data: SpaseObject[]) => this.spaseObjects = data);
    }
    else{
      this.dataService.getSpaseObjectsID(starSystemId)
        .subscribe((data: SpaseObject[]) => this.spaseObjects = data);
    }
  }
  // сохранение данных
  save() {
    // TODO: надо выучить связные таблицы Angular
    if (this.starSystemId != undefined){
      if (this.spaseObject.id == null){
        this.dataService.createSpaseObjectWithStarSystem(this.spaseObject, this.starSystemId)
          .subscribe((data: SpaseObject) => this.spaseObjects.push(data));
      } else{
        this.dataService.updateSpaseObject(this.spaseObject)
          .subscribe(data => this.loadSpaseObjects(this.starSystemId));
      }
    }
    else{
      if (this.spaseObject.id == null){
        this.dataService.createSpaseObject(this.spaseObject)
          .subscribe((data: SpaseObject) => this.spaseObjects.push(data));
      } else{
        this.dataService.updateSpaseObject(this.spaseObject)
          .subscribe(data => this.loadSpaseObjects(this.starSystemId));
      }
    }   
    this.cancel();
  }
  editSpaseObject(p: SpaseObject){
    this.spaseObject = p;
  }
  cancel(){
    this.spaseObject = new SpaseObject();
    this.tableMode = true;
  }
  delete(p: SpaseObject){
    this.dataService.deleteSpaseObject(p.id)
      .subscribe(data => this.loadSpaseObjects(this.starSystemId));
  }
  add(){
    this.cancel();
    this.tableMode = false;
  }
}
