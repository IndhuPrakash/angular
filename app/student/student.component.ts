import { Component, OnInit } from '@angular/core';
import { studentdetails } from './student';
import { NgForm } from '@angular/forms';
import { FormService } from '../login/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  student=new studentdetails(1,"abc","1999-10-06","male","cse",0,0,0,0,0,0,0);
  studentdata:Observable<studentdetails>[]=[];
  filterstudent:Observable<studentdetails>[]=[];
  resultdata:Observable<studentdetails>[]=[];
  grade={"sub1":"","sub2":"","sub3":"","sub4":"","sub5":""};
  disable=true;
  result=true;
  editstudentid:number;
  stu:any
  fail=0;
  pass=0;
  total=0;
  no=false;
  constructor(public formService:FormService) { }

  ngOnInit() {
    this.formService.getStudent().subscribe(data=>this.studentdata=data);
  }
  add(){
    this.student=new studentdetails(1,"aaa","1999-10-06","male","ddd",0,0,0,0,0,0,0);
    this.disable=false;
    this.result=true;
    this.editstudentid=undefined;
  }
  view(){
    this.disable=true;
  }
  onSubmit(studentform:NgForm){
    studentform.value.total=studentform.value.sub1+studentform.value.sub2+studentform.value.sub3+studentform.value.sub4+studentform.value.sub5
    studentform.value.avg=studentform.value.total/5;
    if(this.editstudentid){
      studentform.value.id=this.editstudentid;
      this.formService.editStudent(studentform.value).subscribe(
        data=>console.log(data),
        error=>console.log(error),
        ()=>window.location.reload()
      );
    }
    else{
      console.log(studentform.value);
      this.formService.postStudent(studentform.value).subscribe(data=>this.studentdata.push(data));
    }
    this.disable=true;
  }
  edit(studentvalue){
    this.student=studentvalue;
    this.disable=false;
    this.editstudentid=studentvalue.id;
    this.result=true;
  }
  delete(studentvalue){
    this.formService.delStudent(studentvalue.id)
    .subscribe(
      data=>this.studentdata.slice(this.studentdata.length-1, 1),
      error=>console.log(error),
      ()=>this.ngOnInit()
    )
  }
  i=0;
  viewResult(studentvalue){
    this.grade.sub1=convertGrade(studentvalue.sub1);
    this.grade.sub2=convertGrade(studentvalue.sub2);
    this.grade.sub3=convertGrade(studentvalue.sub3);
    this.grade.sub4=convertGrade(studentvalue.sub4);
    this.grade.sub5=convertGrade(studentvalue.sub5);
    this.resultdata=studentvalue;
    this.result=false;
  }
  sortByName(){
    this.no=false;
    this.formService.filterStudent('_sort=name').subscribe(data=>this.studentdata=data);
  }
  sortByTotal(){
    this.no=false;
    this.formService.filterStudent('_sort=total&_order=desc').subscribe(data=>this.studentdata=data);
  }
  sub1Topper(){
    this.no=false;
    this.formService.filterStudent('_sort=sub1&_order=desc&_limit=1').subscribe(data=>this.studentdata=data);
  }
  sub2Fail(){
    this.no=false;
    this.formService.filterStudent('sub2_lte=49').subscribe(data=>this.studentdata=data);
  }
  passStudents(){
    this.formService.filterStudent('sub1_gte=50&sub5_gte=50&sub4_gte=50&sub3_gte=50&sub2_gte=50').subscribe(data=>{this.filterstudent=data;console.log(data.length)});
  }
  failStudents(){
    this.formService.getStudent().subscribe(data=>{
      this.studentdata=data;this.ngOnInit();
      this.filterstudent=[];
      for(this.stu of this.studentdata){
        if(this.stu.sub1<50||this.stu.sub2<50||this.stu.sub3<50||this.stu.sub4<50||this.stu.sub5<50){
          this.filterstudent.push(this.stu);
        }
      }
    });

  }
  cse(){
    this.no=true;
    this.pass=0;this.fail=0;this.total=0;
    this.formService.filterStudent('dept=cse').subscribe(data=>{this.studentdata=data;this.total=data.length,this.fail=checkfail(this.studentdata,this.fail)});
    this.formService.filterStudent('dept=cse&sub1_gte=50&sub5_gte=50&sub4_gte=50&sub3_gte=50&sub2_gte=50').subscribe(data=>this.pass=data.length);
  }
  eee(){
    this.no=true;
    this.pass=0;this.fail=0;this.total=0;
    this.formService.filterStudent('dept=eee').subscribe(data=>{this.studentdata=data;this.total=data.length,this.fail=checkfail(this.studentdata,this.fail)});
    this.formService.filterStudent('dept=eee&sub1_gte=50&sub5_gte=50&sub4_gte=50&sub3_gte=50&sub2_gte=50').subscribe(data=>this.pass=data.length);
  }
  mech(){
    this.no=true;
    this.pass=0;this.fail=0;this.total=0;
    this.formService.filterStudent('dept=mech').subscribe(data=>{this.studentdata=data;this.total=data.length,this.fail=checkfail(this.studentdata,this.fail)});
    this.formService.filterStudent('dept=mech&sub1_gte=50&sub5_gte=50&sub4_gte=50&sub3_gte=50&sub2_gte=50').subscribe(data=>this.pass=data.length);
  }
  ece(){
    this.no=true;
    this.pass=0;this.fail=0;this.total=0;
    this.formService.filterStudent('dept=ece').subscribe(data=>{this.studentdata=data;this.total=data.length,this.fail=checkfail(this.studentdata,this.fail)});
    this.formService.filterStudent('dept=ece&sub1_gte=50&sub5_gte=50&sub4_gte=50&sub3_gte=50&sub2_gte=50').subscribe(data=>this.pass=data.length);
  }
  lessthan(value){
    if(value<50)
      return true;
    else
      return false;
  }
}
function convertGrade(mark){
    if(mark>=90){
      return "A";
    }
    else if(mark>=80 && mark<90){
      return "B";
    }
    else if(mark>=70 && mark<80){
      return "C";
    }
    else if(mark>=60 && mark<70){
      return "D";
    }
    else if(mark>=50 && mark<60){
      return "E";
    }
    else{
      return "RA"
    }  
}
function checkfail(studentdata,fail){
  for(let stu of studentdata){
    console.log(stu)
    console.log(stu.sub1<50||stu.sub2<50||stu.sub3<50||stu.sub4<50||stu.sub5<50)
    if(stu.sub1<50||stu.sub2<50||stu.sub3<50||stu.sub4<50||stu.sub5<50){
      fail=fail+1;
    }
  }
  console.log(fail)
  return fail;
}