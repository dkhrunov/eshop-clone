import { Component, OnInit} from '@angular/core';
import { DashboardFacade } from '@esc/order/domain';

@Component({
  selector: 'order-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    


    constructor(private dashboardFacade: DashboardFacade) {
    }


    ngOnInit() {
    }

}

