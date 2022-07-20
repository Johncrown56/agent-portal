import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { BannerTopicsComponent } from './components/banner-topics/banner-topics.component';
import { BodyComponent } from './components/body/body.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { HomeTabComponent } from './components/home-tab/home-tab.component';
import { TrendingComponent } from './components/trending/trending.component';
import { TopicsComponent } from './pages/topics/topics.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "topic/:id", component: TopicsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    BannerComponent,
    MenuComponent,
    SearchComponentComponent,
    BannerTopicsComponent,
    BodyComponent,
    ToolboxComponent,
    HomeTabComponent,
    TrendingComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
