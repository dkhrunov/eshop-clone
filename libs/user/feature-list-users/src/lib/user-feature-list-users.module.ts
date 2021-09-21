import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { ListUsersComponent } from './list-users.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule, ButtonBarModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    MainWrapperModule,
    ButtonBarModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzTagModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzSelectModule,
    RouterModule.forChild([{ path: '', component: ListUsersComponent }]),
  ],
  declarations: [ListUsersComponent],
  exports: [ListUsersComponent],
})
export class UserFeatureListUsersModule {}
