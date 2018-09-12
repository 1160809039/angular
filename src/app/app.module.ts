import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {HttpServiceService} from './service/http-service.service';
import {HttpClientModule} from '@angular/common/http';
import { PagecontainerComponent } from './component/pagecontainer/pagecontainer.component';
import { PageDirectiveDirective } from './directive/page-directive.directive';
import { ArticlemanageComponent } from './component/articlemanage/articlemanage.component';
import {PageconfigService} from './config/pageconfig.service';
import { IndexComponent } from './component/index/index.component';
import { TabsComponent } from './component/tabs/tabs.component';
import {StateService} from './service/state.service';
import {UtilsService} from './service/utils.service';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { OperationarticleComponent } from './component/operationarticle/operationarticle.component';
import { QuillModule } from 'ngx-quill';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ViserModule } from 'viser-ng';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginComponent } from './component/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './component/frame/frame.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuItemComponent } from './component/menu/menu-item/menu-item.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: FrameComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PagecontainerComponent,
    PageDirectiveDirective,
    ArticlemanageComponent,
    IndexComponent,
    TabsComponent,
    OperationarticleComponent,
    StatisticsComponent,
    LoginComponent,
    FrameComponent,
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    RouterModule.forRoot(
    appRoutes,
    // { enableTracing: true } // <-- debugging purposes only
   ),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QuillModule ,
    ReactiveFormsModule,
    CommonModule,
    NgxEchartsModule,
    FileUploadModule,
    NgZorroAntdModule.forRoot(),

  ],
  providers: [HttpServiceService, PageconfigService,StateService,UtilsService ],
  entryComponents: [ ArticlemanageComponent,IndexComponent,OperationarticleComponent,StatisticsComponent,MenuComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
