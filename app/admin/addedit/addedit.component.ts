import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/login/form.service';
import { userdetails } from 'src/app/login/user';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddeditComponent implements OnInit {
  user= new userdetails(1,"abc","abc18","abc123");
  userdata:Observable<userdetails>[]=[];
  //edituserdata:Observable<userdetails>[]=[];
  data:any;
  lastdata:any;
  same:boolean=false;
  id:number;
  action:string;
  errormessage:string;
  constructor(public formService:FormService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.action =params['action']
    });
    if(this.action=='edit'){
      this.route.queryParams.subscribe(params => {
        this.id = Number(params['id']);
        this.formService.getDetailsWithParams(this.id,'user').subscribe(data=>{this.user=data[0]});
      });  
    }
    this.formService.getDetails().subscribe(data=>{this.userdata=data;});
  }
  onSubmit(user:NgForm){
    if(this.action!='edit'){
      for(this.data of this.userdata){
        if(this.data.username==user.value.username && this.data.password==user.value.password){
          this.same=true;
        }
        else if(this.data.username!=user.value.username && this.data.password==user.value.password){
          this.same=true;
        }
        else if(this.data.username==user.value.username && this.data.password!=user.value.password){
          this.same=true;
        }
      }
      if(!this.same){
        this.lastdata=this.userdata[this.userdata.length-1];
        user.value.id=this.lastdata.id+1;
        this.formService.postDetails(user.value).subscribe(
          data=>{this.userdata.push(user.value);console.log(this.userdata)},
          error=>console.log(error),
          ()=>{window.location.reload()}
        );
        window.history.back();
      }      
    }
    else{
      user.value.id=this.user.id;
      for(this.data of this.userdata){
        if(this.data.id!=user.value.id){
          if(this.data.username==user.value.username && this.data.password==user.value.password){
            this.same=true;
            this.errormessage='userpass';
            break;
          }
          else if(this.data.username!=user.value.username && this.data.password==user.value.password){
            this.same=true;
            this.errormessage='pass';
            break;
          }
          else if(this.data.username==user.value.username && this.data.password!=user.value.password){
            this.same=true;
            this.errormessage='user';
            break;
          }
        }
        console.log(this.same)
      }
      if(!this.same){
        this.formService.editDetails(user.value).subscribe(
          data=>{this.userdata=data;},
          error=>{console.log(error);},
          ()=>{window.location.reload();}
        );
        window.history.back();
      }
      }
  }
  back(){
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
}
