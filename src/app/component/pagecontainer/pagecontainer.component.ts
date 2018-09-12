import { Component, OnInit ,ComponentFactoryResolver,ViewChild,Input,ComponentRef,ViewContainerRef} from '@angular/core';
import {PageconfigService} from '../../config/pageconfig.service';
import {PageDirectiveDirective} from '../../directive/page-directive.directive';
import {MenuItem} from '../../interface/data-interface';
import {PageInterface} from '../../interface/page-interface';
import {StateService} from '../../service/state.service';
@Component({
  selector: 'app-pagecontainer',
  templateUrl: './pagecontainer.component.html',
  styleUrls: ['./pagecontainer.component.css']
})
export class PagecontainerComponent implements OnInit {

 @ViewChild(PageDirectiveDirective) pageHost: PageDirectiveDirective;

 @Input() pageComponent:MenuItem;

 viewContainerRef:ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,public pageconfigService:PageconfigService,public stateService:StateService) {

   }
   ngOnChanges(){

     if(this.pageComponent._id!='-1'){
        this.loadComponent();
     }

   }
   ngOnInit() {


   }
   //打开一个页面
   loadComponent() {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.pageconfigService.pagemanage[this.pageComponent.link]);

      this.viewContainerRef = this.pageHost.viewContainerRef;
      // console.log(viewContainerRef.get())
       let componentRef = this.viewContainerRef.createComponent(componentFactory);
       (<PageInterface>componentRef.instance).data = this.pageComponent;
       this.stateService.menuSelectId=this.pageComponent._id;
       console.log(this.pageComponent._id)
   }
   //关闭一个页面
   onClosePage($event){
     this.viewContainerRef.remove($event);
   }


}
