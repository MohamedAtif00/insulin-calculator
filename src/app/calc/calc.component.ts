import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../Service/Register.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddUserScaleRequest } from '../Model/add-userscale-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit{

  @ViewChild('ins') ins!:ElementRef;
  info:any;
  constructor(private registerServ:RegisterService,private fb:FormBuilder,private router:Router){}

  scaleForm!:FormGroup;
  request!:AddUserScaleRequest;
  ngOnInit(): void {
    this.registerServ.AllowAccess().subscribe(data=>{
      this.registerServ.GetSingleUser().subscribe(data=>{
        console.log('single user',data);
        this.info = data.value
      })

    })

    this.scaleForm = this.fb.group({
      foods:[''], 
      totalCarbGrams:[''],
      sugarLevelBeforeMeal:[''],
      insulin:[''],
      sugarLevelAfterTwoHours:['']
    })
  }

  onSubmit()
  {
    this.request= {
      userId:this.registerServ.user.id,
      foods:this.scaleForm.value.foods,
      totalCarbGrams:this.scaleForm.value.totalCarbGrams,
      sugarLevelBeforeMeal:this.scaleForm.value.sugarLevelBeforeMeal,
      insulin:this.ins.nativeElement.value ,
      sugarLevelAfterTwoHours:this.scaleForm.value.sugarLevelAfterTwoHours
    }
    console.log(this.request);
    

    this.registerServ.AddUserScale(this.request).subscribe(data=>{
      console.log(data);
      console.log(data.status);
      
      if(data.isSuccess)
      {
        alert("Scale Added Successfully");
        this.router.navigate(['']);
      }

    })

  }

  totalCarps(e:HTMLInputElement)
  {
    let total = (e.value as unknown) as number
    this.ins.nativeElement.value = total/this.info.icr
  }
}
