import { Component, OnInit} from '@angular/core';
import { ShellFacade } from '@esc/order/domain';

@Component({
  selector: 'order-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    


    constructor(private shellFacade: ShellFacade) {
    }


    ngOnInit() {
    }

}

