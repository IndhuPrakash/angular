import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from '../login/form.service';
import { userdetails } from '../login/user';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user= new userdetails(1,"abc","abc18","abc123");
  userdata:Observable<userdetails>[]=[];
  admindata:Observable<userdetails>[]=[];
  data:any;
  lastdata:any;
  same:boolean=false;
  constructor(public formService:FormService,public router:Router,public loginservice:LoginService) {
  }

  ngOnInit() {
    this.formService.getDetails().subscribe(data=>{this.userdata=data;});
    this.formService.getAdminDetails().subscribe(data=>{this.admindata=data;});

  }
  reset(){
    this.user= new userdetails(0,"","","");
  }
  onSubmit(user:NgForm){
    for(this.data of this.userdata){
      if(this.data.username==user.value.username && this.data.password==user.value.password){
        console.log("Already Exist");
        //this.router.navigate(['login']);
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
      this.formService.postDetails(user.value)
      .subscribe(data=>{this.userdata.push(user.value)},error=>console.log(error),()=>{this.ngOnInit()});
      this.lastdata=this.userdata[this.userdata.length-1];
      user.value.id=this.lastdata.id+1;
      this.loginservice.login().subscribe(()=>{
        if(this.loginservice.isLoggedIn){
          let cu={log:true,data:user.value.id,current:'user'};
          localStorage.setItem("currentuser",JSON.stringify(cu));
          this.router.navigate(['/user',user.value.id]);
        }
      });
    }    
  }
}
