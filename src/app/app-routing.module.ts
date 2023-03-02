import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./general/home/home.component";
import { AboutUsComponent } from "./general/about-us/about-us.component";
import { InformationComponent } from "./general/information/information.component";
import { BlogComponent } from "./general/blog/blog.component";
import { ContactUsComponent } from "./general/contact-us/contact-us.component";
import { LoginComponent } from "./login-register/login/login.component";
import { RegisterComponent } from "./login-register/register/register.component";
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminEditCustomersComponent } from './admin/admin-edit-customers/admin-edit-customers.component';
import {CustomerAccountComponent} from "./customer/customer-account/customer-account.component";
import {LoginTrainerComponent} from "./login-register/login-trainer/login-trainer.component";
import { CustomerTrainingsComponent } from './customer/customer-trainings/customer-trainings.component';
import { AdminEditPostComponent } from './admin/admin-edit-post/admin-edit-post.component';
import { BlogDetailsComponent } from './general/blog-details/blog-details.component';
import { AdminEditTrainingsComponent } from './admin/admin-edit-trainings/admin-edit-trainings.component';
import { CustomerTrainerComponent } from './customer/customer-trainer/customer-trainer.component';
import {RegisterTrainerComponent} from "./login-register/register-trainer/register-trainer.component";
import {AdminProductsComponent} from "./admin/admin-products/admin-products.component";
import {AdminEditProductComponent} from "./admin/admin-edit-product/admin-edit-product.component";
import {StoreComponent} from "./general/store/store.component";
import {ProductDetailComponent} from "./general/product-detail/product-detail.component";
import { AdminEditAccountComponent } from './admin/admin-edit-account/admin-edit-account.component';
import { CustomerEditAccountComponent } from './customer/customer-edit-account/customer-edit-account.component';
import { AdminEditImcComponent } from './admin/admin-edit-imc/admin-edit-imc.component';
import { AdminAllPaymentsComponent } from './admin/admin-all-payments/admin-all-payments.component';
import {CheckCustomerGuard} from "./guards/check-customer.guard";
import {CheckTrainerGuard} from "./guards/check-trainer.guard";
import {CheckLoginGuard} from "./guards/check-login.guard";
import {ForgotPasswordComponent} from "./login-register/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./login-register/reset-password/reset-password.component";
import {RegisterGeneralComponent} from "./general/register-general/register-general.component";
import {
  ForgotPasswordTrainerComponent
} from "./login-register/forgot-password-trainer/forgot-password-trainer.component";
import {ResetPasswordTrainerComponent} from "./login-register/reset-password-trainer/reset-password-trainer.component";
import {ChangePasswordComponent} from "./login-register/change-password/change-password.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'information', component: InformationComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/details/:id', component: BlogDetailsComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'register', component: RegisterGeneralComponent},
  {path: 'login', component: LoginComponent, canActivate:[CheckLoginGuard]},

  //{path: 'customer/trainings/:id', component: CustomerTrainingsComponent},
  {path: 'customer/trainings', component: CustomerTrainingsComponent, canActivate:[CheckCustomerGuard]},
  {path: 'customer/trainer', component: CustomerTrainerComponent, canActivate:[CheckCustomerGuard]},
  {path: 'customer/account', component: CustomerAccountComponent, canActivate:[CheckCustomerGuard]},
  {path: 'customer/editAccount', component: CustomerEditAccountComponent, canActivate:[CheckCustomerGuard]},


  //Admin
  {path: 'admin/account', component: AdminAccountComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editAccount', component: AdminEditAccountComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/users', component: AdminUsersComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editBlog', component: AdminBlogComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/aboutSettings', component: AdminAboutComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editCustomer/:id', component: AdminEditCustomersComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editTraining/:id', component: AdminEditTrainingsComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editPost/:id', component: AdminEditPostComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/login', component: LoginTrainerComponent, canActivate:[CheckLoginGuard]},
  {path: 'admin/register', component: RegisterComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/registerTrainer', component: RegisterTrainerComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editImc/:id', component: AdminEditImcComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/allPayments/:id', component: AdminAllPaymentsComponent, canActivate:[CheckTrainerGuard]},

  //Productos
  {path: 'admin/products', component: AdminProductsComponent, canActivate:[CheckTrainerGuard]},
  {path: 'admin/editProduct/:id', component: AdminEditProductComponent, canActivate:[CheckTrainerGuard]},
  {path: 'store/product/:id', component: ProductDetailComponent},
  {path: 'store', component: StoreComponent},

  //Recuperar contraseña
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'admin/forgotPassword', component: ForgotPasswordTrainerComponent},
  {path: 'admin/resetPassword', component: ResetPasswordTrainerComponent},
  {path: 'changePassword', component: ChangePasswordComponent},

  {path: '**', redirectTo: 'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
