import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData:any;

  constructor(private route:ActivatedRoute) 
  {
    this.userData=this.route.snapshot.data['userData'];
   }

  ngOnInit(): void {
    console.log(this.userData);
  }

}
