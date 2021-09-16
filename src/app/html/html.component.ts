import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {
  disdoc:boolean=true;
  disshare:boolean=true;
  disonedrive:boolean=true;
  h='10px';
  clickdoc;
  file=[{name:'Book3',date:'wed at 4.48 pm',sharing:'only you'},{name:'Book',date:'apr17',sharing:'only you'},{name:'Book2',date:'apr 12',sharing:'only you'},{name:'Note2',date:'apr 12',sharing:'only you'}]
  constructor() { }

  ngOnInit() {
  }
  recent(){
    this.disdoc=true;
  }
  pinned(){
    this.disdoc=false;
  }
  frequent(){
    this.disshare=true;
  }
  following(){
    this.disshare=false
  }
  zoom(){
    this.h='100px'
  }
  showicons(f){
    this.clickdoc=f.name;
  }
  firstletter(name){
    return name.charAt(0);
  }
}
