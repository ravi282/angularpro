import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
export interface Transaction {
  id:number;
  name: string;
}

@Component({
  selector: 'app-landingscreen',
  templateUrl: './landingscreen.component.html',
  styleUrls: ['./landingscreen.component.css']
})
export class LandingscreenComponent implements OnInit {
  [x: string]: any;
  section1=[];
  section2=[];
  section3=[];
  section4=[];
  displayedColumns: string[] = ['id1','name1','id2','name2','id3','name3','id4','name4'];
  
  dataSource1;
  dataSource2;
  dataSource3;
  dataSource4;
 
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getinputs().subscribe(
      (response) =>
      {
        
        this.dataSource1=response['data']['section1'];
        this.dataSource2=response['data']['section2'];
        this.dataSource3=response['data']['section3'];
        this.dataSource4=response['data']['section4'];
        
        console.log(this.dataSource1);
        console.log(this.dataSource2);
        console.log(this.dataSource3);
        console.log(this.dataSource4);
       
       
      });

  }
  

}
