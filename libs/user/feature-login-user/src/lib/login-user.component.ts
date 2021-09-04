import { Component, OnInit} from '@angular/core';
import { LoginUserFacade } from '@esc/user/domain';

@Component({
  selector: 'user-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
    


    constructor(private loginUserFacade: LoginUserFacade) {
    }


    ngOnInit() {
    }

}

