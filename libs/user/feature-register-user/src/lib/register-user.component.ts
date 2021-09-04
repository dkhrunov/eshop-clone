import { Component, OnInit} from '@angular/core';
import { RegisterUserFacade } from '@esc/user/domain';

@Component({
  selector: 'user-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
    


    constructor(private registerUserFacade: RegisterUserFacade) {
    }


    ngOnInit() {
    }

}

