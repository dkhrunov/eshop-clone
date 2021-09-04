import { Component, OnInit} from '@angular/core';
import { ShellFacade } from '@esc/product/domain';

@Component({
  selector: 'product-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    


    constructor(private shellFacade: ShellFacade) {
    }


    ngOnInit() {
    }

}

