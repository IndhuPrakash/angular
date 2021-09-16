import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { FormService } from 'src/app/login/form.service';
import { Observable } from 'rxjs';
import { userdetails } from 'src/app/login/user';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  userdata:Observable<userdetails>[]=[];
  id:number;
  constructor(private route: ActivatedRoute,private formService:FormService,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = Number(params['id']);
      this.formService.getDetailsWithParams(this.id,'user').subscribe(data=>{this.userdata=data[0]});
    });
  }
  deluser(userid:number){
    this.formService.delDetails(userid).subscribe(
      data=>{delete this.userdata},
      error=>{console.log(error)},
      ()=>{window.location.reload()});
  }
  back(){
    this.router.navigate(['/admin',Number(this.router.url.split('/')[2])]).then(()=>{window.location.reload()});
  }
}
