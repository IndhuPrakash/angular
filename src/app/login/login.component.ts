import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from './form.service';
import { userdetails } from './user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user= new userdetails(1,"abc","abc18","abc123");
  userdata:Observable<userdetails>[]=[];
  admindata:Observable<userdetails>[]=[];
  data:any;
  admin:any;
  invalid:string;
  loguser;
  constructor(public formService:FormService,public router:Router,public loginservice:LoginService) {
  }

  ngOnInit() {
    this.formService.getDetails().subscribe(data=>{this.userdata=data;});
    this.formService.getAdminDetails().subscribe(data=>{this.admindata=data;});
  }
  reset(){
    this.user= new userdetails(0,"","","");
  }
  usercount:number;
  admincount:number;
  onSubmit(user:NgForm){
    this.usercount=0;
    this.admincount=0;
    for(this.data of this.userdata){
      if(this.data.username==user.value.username && this.data.password==user.value.password){
        this.loginservice.login().subscribe(()=>{
          let cu={log:true,data:this.data.id,current:'user'};
          localStorage.setItem("currentuser",JSON.stringify(cu));
          this.router.navigate(['/user',this.data.id]);
        })
      }
      else if(this.data.username!=user.value.username && this.data.password==user.value.password){
        this.invalid="username";
        //continue;
      }
      else if(this.data.username==user.value.username && this.data.password!=user.value.password){
        this.invalid="password";
        break;
      }
      else{
        this.usercount++;
      }
    }
    for(this.admin of this.admindata){
      if(this.admin.username==user.value.username && this.admin.password==user.value.password){
        this.loginservice.login().subscribe(()=>{
          if(this.loginservice.isLoggedIn){
            let cu={log:true,data:this.admin.id,current:'admin'};
            localStorage.setItem("currentuser",JSON.stringify(cu));
            this.router.navigate(['/admin',this.admin.id]);
          }
        })
      }
      else if(this.admin.username!=user.value.username && this.admin.password==user.value.password){
        this.invalid="username";
        //continue;
      }
      else if(this.admin.username==user.value.username && this.admin.password!=user.value.password){
        this.invalid="password";
        break;
      }
      else{
        this.admincount++; 
      }
    }
    this.nouser();
  }
  nouser(){
    //console.log(this.admincount,this.admindata.length,this.usercount,this.userdata.length)
    if(this.admincount==this.admindata.length && this.usercount==this.userdata.length){
      if(window.confirm('Username And Password not exist please register')){
        this.router.navigate(['register']);
      }
    } 
  }
}
