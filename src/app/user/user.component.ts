import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userdetails } from '../login/user';
import { FormService } from '../login/form.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public formService:FormService,private route: ActivatedRoute,public loginservice:LoginService) { }
  userdata:userdetails={id:0,name:'',username:'',password:''};
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id=Number(params.get("id"));
      this.formService.getDetailsWithParams(id,'user').subscribe(data=>{this.userdata=data[0];});
    });
  }
  logout() {
    this.loginservice.logout();
    localStorage.removeItem("currentuser");
  }
}
