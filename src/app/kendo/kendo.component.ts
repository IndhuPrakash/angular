import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormatSettings} from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./kendo.component.scss']
})
export class KendoComponent implements OnInit {

  value:Date=new Date(2017,8,8);
  min:Date=new Date(2017,7,22);
  max:Date=new Date(2018,8,22);
  value1:Date=new Date();
  items:string[]=["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10"];
  menu:any[]=[
    {
      text:"Item1",
      items:[{text:"Item1.1"},{text:"Item1.2"}]
    },
    {
      text:"Item2",
      items:[
        {
          text:"Item2.1"
        },
        {
          text:"Item2.2",
          items:[
            {
              text:"Item2.2.1",
              items:[
                {
                  text:"Item2.2.1.1"
                },
                {
                  text:"Item2.2.1.2"
                }
              ]
            },
            {
              text:"Item2.2.2"
            }
          ]
        }
      ]
    }
  ]
  listitems:any[]=[
    {
      text:"Item1",
      value:1,
      items:[{text:"Item1.1",value:2},{text:"Item1.2",value:3},{text:"Item1.3",value:4},]
    },
    {
      text:"Item2",
      value:5,
      items:[{text:"Item2.1",value:6},{text:"Item2.2",value:7},{text:"Item2.3",value:8},]
    },
    {
      text:"Item3",
      value:9,
      items:[{text:"Item3.1",value:10},{text:"Item3.2",value:11,items:[{text:"Item3.2.1",value:12},{text:"Item3.2.2",value:13}]}]
    },
    {
      text:"Item4",
      value:14
    }
  ]
  initial: any[] = [];
  public gridData: any[] = [
    {
      id:1,
      name:"indhu",
      gender:"male",
      email:"abc@123"     
    },
    {
      id:2,
      name:"indhu",
      gender:"male",
      email:"abc@123"     
    },
    {
      id:3,
      name:"indhu",
      gender:"male",
      email:"abc@123"     
    },
    {
      id:4,
      name:"indhu",
      gender:"male",
      email:"abc@123"     
    },
    {
      id:5,
      name:"indhu",
      gender:"male",
      email:"abc@123"     
    }
  ];
  //format:FormatSettings={displayFormat:"dd/MM/yyyy HH:mm",inputFormat:"dd/MM/yy"}
  constructor() { }

  ngOnInit() {
  }
  length(value:any[]){
    if(value.length>3){
      return true;
    }
  }
  add(){
    let id1=this.gridData.length+1;
    let gridData1: any ={id:id1,name:"indhu",gender:"male",email:"abc@123"}
    console.log(id1,gridData1)
    this.gridData.push(gridData1); 
  }

}
