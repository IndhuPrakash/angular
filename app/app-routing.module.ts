import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { TestCanActivate } from './guard';
import { AddeditComponent } from './admin/addedit/addedit.component';
import { ShowComponent } from './admin/show/show.component';
import { StudentComponent } from './student/student.component';
import { KendoComponent } from './kendo/kendo.component';
import { HtmlComponent } from './html/html.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'user/:id',component:UserComponent,canActivate:[TestCanActivate]},
    {path:'admin/:id',component:AdminComponent,
      children:[
        {path:'addedit',component:AddeditComponent},
        {path:'addedit/:id',component:AddeditComponent},
        {path:'userdetails',component:ShowComponent}
      ],
      canActivate:[TestCanActivate]
    },
    {path:'student',component:StudentComponent},
    {path:'kendo',component:KendoComponent},
    {path:'html',component:HtmlComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }