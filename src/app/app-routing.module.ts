import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { InformationComponent } from "./information/information.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AdminEditCustomersComponent } from './admin-edit-customers/admin-edit-customers.component';
import {CustomerAccountComponent} from "./customer-account/customer-account.component";
import {LoginTrainerComponent} from "./login-trainer/login-trainer.component";
import { CustomerTrainingsComponent } from './customer-trainings/customer-trainings.component';
import { AdminEditPostComponent } from './admin-edit-post/admin-edit-post.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'information', component: InformationComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/details/:id', component: BlogDetailsComponent},

  {path: 'contactUs', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'admin/login', component: LoginTrainerComponent},

  {path: 'customer/trainings/:id', component: CustomerTrainingsComponent},

  {path: 'admin/account', component: AdminAccountComponent},
  {path: 'admin/users', component: AdminUsersComponent},
  {path: 'admin/editBlog', component: AdminBlogComponent},
  {path: 'admin/aboutSettings', component: AdminAboutComponent},
  {path: 'admin/editCustomer/:id', component: AdminEditCustomersComponent},
  {path: 'admin/editPost/:id', component: AdminEditPostComponent},


  {path: 'customer/account', component: CustomerAccountComponent},
  {path: '**', redirectTo: 'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
