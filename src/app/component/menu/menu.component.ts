import { Component, OnInit,ViewChild } from '@angular/core';
import {StateService} from '../../service/state.service';
import {HttpServiceService} from '../../service/http-service.service';
import {MenuItemComponent} from './menu-item/menu-item.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 menuList;

isVisible=false;
_icon;
_title;

  constructor(public httpService: HttpServiceService,public stateService:StateService) {
    httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
       this.menuList = data;
       console.log(this.menuList);
     });
    }


  ngOnInit() {

  }
  addModule(){
    this.isVisible = true;
  }
   handleOk = (e) => {
     this.isVisible = false;
     let  menuModel={
       title:this._title,
       icon:this._icon
     };
     this.httpService.post("http://localhost:4200/admin/menu/add",menuModel).subscribe(data=>{
         if(data["_id"]){

             this.httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
              this.menuList = data;

           });
           // this.moduleId=0;
         }else{

         }
     })

   }

   handleCancel = (e) => {
     this.isVisible = false;
   }

}
