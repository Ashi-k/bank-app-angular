import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  data="Your perfect banking partner"
  inputplaceholder="Account Number"

  loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],

  password:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
})
  
  // //password:any



constructor(private router:Router,private ds:DataService,private fb:FormBuilder) {}

ngOnInit(): void{

}

login(){
  var acno=this.loginForm.value.acno
  var password=this.loginForm.value.password
 
  
  if (this.loginForm.valid){
    this.ds.login(acno,password).subscribe((result:any)=>{
      localStorage.setItem("currentUser",JSON.stringify(result.currentUser))
      localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
      localStorage.setItem("token",JSON.stringify(result.token))
      alert(result.message)
      this.router.navigateByUrl('dashboard')
    },
    result=>{
      alert(result.error.message)
    }
    )


  }
  else{
    alert('invalid form')
  }

  
}
}