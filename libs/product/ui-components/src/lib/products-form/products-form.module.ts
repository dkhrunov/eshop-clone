import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form.component';
import { MainWrapperModule, ButtonBarModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { QuillModule } from 'ngx-quill';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductFormComponent,
      },
      {
        path: ':id',
        component: ProductFormComponent,
      },
    ]),
    MainWrapperModule,
    ButtonBarModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputNumberModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputModule,
    NzUploadModule,
    NzResultModule,
    QuillModule.forRoot({}),
  ],
  exports: [ProductFormComponent],
})
export class ProductsFormModule {}
