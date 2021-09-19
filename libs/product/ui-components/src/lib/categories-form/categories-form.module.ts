import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesFormComponent } from './categories-form.component';
import { MainWrapperModule, ButtonBarModule } from '@esc/shared/ui-components';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [CategoriesFormComponent],
  imports: [
    CommonModule,
    ButtonBarModule,
    MainWrapperModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzResultModule,
    NzSkeletonModule,
    NzSwitchModule,
    RouterModule.forChild([
      { path: '', component: CategoriesFormComponent },
      { path: ':id', component: CategoriesFormComponent },
    ]),
  ],
  exports: [CategoriesFormComponent],
})
export class CategoriesFormModule {}
