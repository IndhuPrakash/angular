import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userdetails } from '../login/user';
import { FormService } from '../login/form.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  list:boolean=true;
  path;
  constructor(public formService:FormService,private route: ActivatedRoute,private loginservice:LoginService,private router:Router) { 

  }
  admindata:any=[];
  userdata:any=[];
  ngOnInit() {
    this.path=this.router.url.split('/');
    console.log(this.path.length,this.router.url);
    if(this.path.length==3&&this.path[1]=='admin'){
      this.list=true;
    }
    else{
      this.list=false;
    }
    this.route.paramMap.subscribe(params => {
      const id=Number(params.get("id"));
      this.formService.getDetailsWithParams(id,'admin').subscribe(data=>{this.admindata=data[0];});
    });
    this.formService.getDetails().subscribe(data=>{this.userdata=data;});
  }
  logout() {
    this.loginservice.logout();
    localStorage.removeItem("currentuser");
  }
  addUser(){
    this.router.navigate([this.router.url,'addedit']);
    this.list=false;
  }
  showDetails(userid:number){
    this.router.navigate([this.router.url,'userdetails'],{queryParams:{ id: userid}});
    this.list=false;
  }
}
