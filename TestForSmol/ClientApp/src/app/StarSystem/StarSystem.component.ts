import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { StarSystem } from './StarSystem';

@Component({
  selector: 'StarSystem',
  templateUrl: './StarSystem.component.html',
  providers: [DataService]
})
export class StarSystemComponent implements OnInit {
  starSystem: StarSystem = new StarSystem();   // изменяемая система
  starSystems: StarSystem[]; // массив космических систем
  spaseObjects: string[];   // массив названий обьетов с типом завезда || черная дыра 
  tableMode: boolean = true;   // табличный режим

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadStarSystems();// загрузка данных при старте компонента
  }
  // получаем данные через сервис
  loadStarSystems() {
    this.dataService.getStarSystems()
      .subscribe((data: StarSystem[]) => this.starSystems = data);
  }
  // сохранение данных
  save() {
    if (this.starSystem.id == null) {
      this.dataService.createStarSystem(this.starSystem)
        .subscribe((data: StarSystem) => this.starSystems.push(data));
    } else {
      this.dataService.updateStarSystem(this.starSystem)
        .subscribe(data => this.loadStarSystems());
    }
    this.cancel();
  }
  editStarSystem(p: StarSystem) {
    this.starSystem = p;
  }
  cancel() {
    this.starSystem = new StarSystem();
    this.tableMode = true;
  }
  delete(p: StarSystem) {
    this.dataService.deleteStarSystem(p.id)
      .subscribe(data => this.loadStarSystems());
  }
  add() {
    this.cancel();
    this.tableMode = false;
  }
  loadSpaseObjectsById(p: StarSystem) {
    this.dataService.getSpaseObjectsById(p.id)
      .subscribe((data: string[]) => this.spaseObjects = data);
  }
}
