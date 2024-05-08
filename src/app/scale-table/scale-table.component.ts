import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Service/Register.service';
import { DatePipe } from '@angular/common';


interface ScaleView
{
  foods:string,
    dateTime:string | null,
    totalCarbGrams:number,
    sugarLevelBeforeMeal:number,
    insulin:number,
    sugarLevelAfterTwoHours:number,
    userId:{value:string},
    id:{value:string}
}

@Component({
  selector: 'app-scale-table',
  templateUrl: './scale-table.component.html',
  styleUrls: ['./scale-table.component.css']
})
export class ScaleTableComponent implements OnInit{

  scales:ScaleView[] = [];
  dateTime!:Date;

  constructor(private authServ:RegisterService,private datePipe:DatePipe){}

  ngOnInit(): void {
    this.authServ.AllowAccess().subscribe(data=>{
      
      this.authServ.GetAllScalesForUser().subscribe(data=>{
        console.log(data);
        if(data.value)
        data.value.forEach(e => {
          console.log(e.dateTime);
          this.dateTime = new Date(e.dateTime)

          if(this.dateTime)
          this.scales.push({foods:e.foods,
                            dateTime:this.datePipe.transform(this.dateTime,"EEEE, dd MMMM, h:mm a"),
                            totalCarbGrams:e.totalCarbGrams,
                            sugarLevelBeforeMeal:e.sugarLevelBeforeMeal,
                            insulin:e.insulin,
                            sugarLevelAfterTwoHours:e.sugarLevelAfterTwoHours,
                            userId:e.userId,
                            id:e.id})
        });
        console.log(this.scales);
        
      })

    })

  }



}
