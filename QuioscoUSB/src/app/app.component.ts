import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content: string = "news";

  getContent(content){
    console.log("getting "+content);
    this.content = content;
  }

}
