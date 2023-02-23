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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'information', component: InformationComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/details/:id', component: BlogDetailsComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},

  //{path: 'customer/trainings/:id', component: CustomerTrainingsComponent},
  {path: 'customer/trainings', component: CustomerTrainingsComponent},
  {path: 'customer/trainer', component: CustomerTrainerComponent},
  {path: 'customer/account', component: CustomerAccountComponent},

  //Admin
  {path: 'admin/account', component: AdminAccountComponent},
  {path: 'admin/users', component: AdminUsersComponent},
  {path: 'admin/editBlog', component: AdminBlogComponent},
  {path: 'admin/aboutSettings', component: AdminAboutComponent},
  {path: 'admin/editCustomer/:id', component: AdminEditCustomersComponent},
  {path: 'admin/editTraining/:id', component: AdminEditTrainingsComponent},
  {path: 'admin/editPost/:id', component: AdminEditPostComponent},
  {path: 'admin/login', component: LoginTrainerComponent},
  {path: 'admin/register', component: RegisterComponent},
  {path: 'admin/registerTrainer', component: RegisterTrainerComponent},

  //Products
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/products', component: AdminEditProductComponent},
  {path: 'store', component: StoreComponent},

  {path: '**', redirectTo: 'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
