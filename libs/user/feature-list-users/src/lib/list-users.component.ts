import { Component, OnInit} from '@angular/core';
import { ListUsersFacade } from '@esc/user/domain';

@Component({
  selector: 'user-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
    


    constructor(private listUsersFacade: ListUsersFacade) {
    }


    ngOnInit() {
    }

}

