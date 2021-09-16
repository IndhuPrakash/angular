import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
  import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { FormService } from './login/form.service';
import { AdminComponent } from './admin/admin.component';
import { AddeditComponent } from './admin/addedit/addedit.component';
import { ShowComponent } from './admin/show/show.component';
import { StudentComponent } from './student/student.component';
import { KendoComponent } from './kendo/kendo.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntlModule } from "@progress/kendo-angular-intl";
import { LabelModule } from "@progress/kendo-angular-label";
//import { SortableModule } from "@progress/kendo-angular-sortable";
import { MenusModule, MenuModule } from "@progress/kendo-angular-menu";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { GridModule } from "@progress/kendo-angular-grid";
import { HtmlComponent } from './html/html.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    AddeditComponent,
    ShowComponent,
    StudentComponent,
    KendoComponent,
    HtmlComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,FormsModule,CommonModule,AppRoutingModule, DateInputsModule, BrowserAnimationsModule,IntlModule,
    LabelModule,MenusModule,DropDownsModule,GridModule, MenuModule//,SortableModule
  ],
  providers: [AppService,FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
