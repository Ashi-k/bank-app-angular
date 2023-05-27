import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any
  acno:any

  accountnumber:any

  datedetails:any

constructor(private ds:DataService,private fb:FormBuilder,private router:Router){
  if(localStorage.getItem('currentUser')){
    this.user=JSON.parse(localStorage.getItem("currentUser") || "")
  }

  this.datedetails=new Date
}

depositeForm=this.fb.group({acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
amnt:['',[Validators.required,Validators.pattern('[0-9]+')]]
})

withdrowForm=this.fb.group(
{acno1  :['',[Validators.required,Validators.pattern('[0-9]+')]],
psw1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
amnt1:['',[Validators.required,Validators.pattern('[0-9]+')]]
})

 

 ngOnInit(): void {
  if(!localStorage.getItem("currentAcno")){
    alert('please login')
    this.router.navigateByUrl("")
  }
 }

deposit(){
  var acno=this.depositeForm.value.acno
  var psw=this.depositeForm.value.psw
  var amnt=this.depositeForm.value.amnt

  

  if (this.depositeForm.valid){
    this.ds.deposit(acno,psw,amnt).subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.messaage)
    })
  }


    else{
    alert('invalid form')
   }

  }


withdraw(){
  var acno1=this.withdrowForm.value.acno1
  var psw1=this.withdrowForm.value.psw1
  var amnt1=this.withdrowForm.value.amnt1

  if(this.withdrowForm.valid){

  this.ds.withdraw(acno1,psw1,amnt1).subscribe((result:any)=>{
    alert(result.message)
  },
  resullt=>{
    alert(resullt.error.message)
  }
  )
}
else{
  alert('invalid form')
}

  }

logout(){
  localStorage.removeItem("currentUser")
  localStorage.removeItem("currentAcno")
  this.router.navigateByUrl("")
}

deleteParent(){
 this.accountnumber=JSON.parse(localStorage.getItem("currentAcno") || "")
}

cancel(){
  this.acno=''
}

Delete(event:any){
 this.ds.deleteAcc(event).subscribe((result:any)=>{
    alert(result.message)
    this.logout()
 })
}

}

