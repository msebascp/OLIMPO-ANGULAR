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
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {AdminEditCustomersComponent} from "./admin-edit-customers/admin-edit-customers.component";
<<<<<<< HEAD
import { CustomerAccountComponent } from './customer-account/customer-account.component';
=======
import { LoadingComponent } from './loading/loading.component';
>>>>>>> dfbdafcf538fccf81677757a685b222b3b3d6894

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
<<<<<<< HEAD
    CustomerAccountComponent
=======
    LoadingComponent
>>>>>>> dfbdafcf538fccf81677757a685b222b3b3d6894
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
