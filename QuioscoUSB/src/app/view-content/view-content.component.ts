import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {

  @Input()
  content: string;

  constructor() { }

  ngOnInit() {
  }

}
