import { Component, OnInit} from '@angular/core';
import { ListOrdersFacade } from '@esc/order/domain';

@Component({
  selector: 'order-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
    


    constructor(private listOrdersFacade: ListOrdersFacade) {
    }


    ngOnInit() {
    }

}

