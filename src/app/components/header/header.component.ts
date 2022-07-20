import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {  AgentModel } from 'src/app/models/data-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  agents: AgentModel[] = [];
  jh?: object;
  month?: any;
  response?: any;

  constructor(private dataService: DataService, public datePipe: DatePipe ) { }

  ngOnInit(): void {
    //this.getAllAgents(); 
    this.getCurrentMonth();
    this.getAllAgents2();
  }

  getCurrentMonth(){
  let date = new Date();
  this.month = this.datePipe.transform(date, 'MMMM');
  return this.month;
  }


  // get all the agents method 1
  getAllAgents() {
      this.dataService.getAllAgents2().pipe().subscribe((result: AgentModel[]) => {   
      let response = result.filter((item: AgentModel) => item.month === this.getCurrentMonth());
      this.agents = response;
    })
  }

  // get all the agents method 2. Here we had to map and filter the response first before subscription. 
  getAllAgents2() {
    this.dataService.getAllAgents2().pipe(
      map((res: AgentModel[]) => res.filter((x: AgentModel) => x.month === this.getCurrentMonth()))
    )
    .subscribe(
      (data: AgentModel[]) => { 
        // console.log(data); 
        this.agents = data;
      }
    );
  }
    

}
