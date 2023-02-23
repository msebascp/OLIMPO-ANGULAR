import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InformationComponent } from './information/information.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {AdminEditCustomersComponent} from "./admin/admin-edit-customers/admin-edit-customers.component";
import { CustomerAccountComponent } from './customer/customer-account/customer-account.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginTrainerComponent } from './login-trainer/login-trainer.component';
import { CustomerTrainingsComponent } from './customer/customer-trainings/customer-trainings.component';
import { AdminEditPostComponent } from './admin/admin-edit-post/admin-edit-post.component';
import { NavbarCustomerComponent } from './navbar-customer/navbar-customer.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AdminEditTrainingsComponent } from './admin/admin-edit-trainings/admin-edit-trainings.component';
import { CustomerTrainerComponent } from './customer/customer-trainer/customer-trainer.component';
import { RegisterTrainerComponent } from './register-trainer/register-trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    HomeComponent,
    AboutUsComponent,
    InformationComponent,
    BlogComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    AdminUsersComponent,
    NavbarAdminComponent,
    AdminAccountComponent,
    AdminBlogComponent,
    AdminAboutComponent,
    AdminEditCustomersComponent,
    CustomerAccountComponent,
    LoadingComponent,
    LoginTrainerComponent,
    CustomerTrainingsComponent,
    AdminEditPostComponent,
    NavbarCustomerComponent,
    BlogDetailsComponent,
    AdminEditTrainingsComponent,
    CustomerTrainerComponent,
    RegisterTrainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
