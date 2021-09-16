import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import { Observable, of } from "rxjs";
import { LoginService } from './login/login.service';

@Injectable({
    providedIn:'root'
})
export class TestCanActivate implements CanActivate{
    constructor(public loginservice:LoginService,public router:Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|Promise<any>{
        let loguser=JSON.parse(localStorage.getItem("currentuser"));
        let id=Number(route.paramMap.get('id'));
        if(loguser&&loguser.log&&loguser.data==id&&loguser.current==route.url[0].path){
            return true;
        }
        else{
            this.router.navigate(['login']);
            return false;
        }
    }
}