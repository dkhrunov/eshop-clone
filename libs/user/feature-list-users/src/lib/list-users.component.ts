import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListUsersFacade } from '@esc/user/domain';
import { UserEntity } from '@esc/user/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'user-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent {
  constructor(
    private listUsersFacade: ListUsersFacade,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private notificationService: NzNotificationService
  ) {}

  form = this.fb.group({
    name: ['Name', Validators.required],
    email: ['email@email.com', Validators.required],
    password: ['password', Validators.required],
    phone: ['42342342342', Validators.required],
    isAdmin: [true, Validators.required],
    street: ['Street', Validators.required],
    apartment: [345, Validators.required],
    zip: ['32424', Validators.required],
    city: ['City', Validators.required],
    country: ['Russia', Validators.required],
  });

  editUserMode = false;
  updateUserMode = false;
  updateUserId: string | undefined = undefined;
  countries$ = this.listUsersFacade.countries$;

  users$ = this.listUsersFacade.users$;

  showDeleteConfirm(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteUser(id: string): void {
    this.listUsersFacade.deleteUser(id);
  }

  saveUser(): void {
    if (this.form.valid && this.updateUserId) {
      this.listUsersFacade.updateUser(
        this.updateUserId,
        this.form.getRawValue()
      );
    } else if (this.form.valid) {
      this.listUsersFacade.registerUser(this.form.getRawValue());
    }

    this.editUserMode = false;
    this.updateUserMode = false;
  }

  showNotification(message: string): void {
    this.notificationService.create('success', message, '');
  }

  editUser(user: UserEntity): void {
    this.form.patchValue(user);
    this.form.patchValue({ password: '' });
    this.form.controls.password.disable();
    this.updateUserId = user.id;
    this.editUserMode = true;
    this.updateUserMode = true;
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls.password.enable();
    this.editUserMode = false;
    this.updateUserMode = false;
  }
}
