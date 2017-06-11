import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
  content: string;

  @Output()
  changeContent: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  emitChange(component: String){
    console.log("emitiendo "+component);
    this.changeContent.emit(component);
  }

  ngOnInit() {
  }

}
