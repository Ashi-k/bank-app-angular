import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// overloading headers as global
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})



export class DataService {
  currentUser:any
  currentAcno: any;
  userDetails:any

  constructor(private http:HttpClient) {
    // this.getData()
   }

  // userDetails:any={
  //   1000: {acno:1000,username:"Ashik",password:"pathu",balance:0,transaction:[]},
  //   1001: {acno:1001,username:"Pathu",password:"Ashik",balance:0,transaction:[]},
  //   1002: {acno:1002,username:"Ummer",password:"1234",balance:0,transaction:[]},
  //   1003: {acno:1003,username:"Razak",password:"1234",balance:0,transaction:[]},
  //   1004: {acno:1004,username:"Mamooty",password:"1234",balance:0,transaction:[]},
   
  //  }

   saveData(){
    if(this.userDetails){
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",this.currentUser)
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
   }

  //  getData(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database') || "") 
  //   }
  //   if(localStorage .getItem('cuurentUser')){
  //     this.currentUser=localStorage.getItem('currentUser')
  //   }
  //   if(localStorage.getItem('cuurentAcno')){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || "")
  //   }
  //  }

  getToken(){
    // access token
    const token=JSON.parse(localStorage.getItem("token") || "")

    //generate header
    let Headers=new HttpHeaders()
    if(token){
      //append token in header
     option.headers=Headers.append("access_token",token)
    }
    return option

  }



   register(uname:any,acno:any,psw:any){
      
    //create body data
      const data={uname,acno,psw}
      return this.http.post('http://localhost:3000/register',data)

      //generate header

    
   }

   login(acnum:any,psw:any){
    const data={acnum,psw}
    return this.http.post("http://localhost:3000/login",data )

  }

  deposit(acnum:any,password:any,amount:any){
    const data={acnum,password,amount}
   return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }


  withdraw(acnum:any,password:any,amount:any){
    const data={acnum,password,amount}
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
    
  }

  getTransaction(acno:any){
    const data={acno}
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }

  deleteAcc(acno:any){
    return this.http.delete(`http://localhost:3000/delete/${acno}`,this.getToken())
  }

   }

   


  
