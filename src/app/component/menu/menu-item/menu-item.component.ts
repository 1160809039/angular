import { Component, OnInit,DoCheck,Input } from '@angular/core';
import {HttpServiceService} from '../../../service/http-service.service';
import {PageconfigService} from '../../../config/pageconfig.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input()
  menuList;
 isVisible = false;
  pagemanage=['选择页面'];
  moduleId=0;
  menuId=0;
  _menuTitle='';
  _menuLink='选择页面';
  searchOptions=[];
  selectedMultipleOption=[];

  moduleTitle;
  moduleIcon;

  constructor(public httpService: HttpServiceService,private pageconfigService:PageconfigService,private _message: NzMessageService) {


    for(let pageName in pageconfigService.pagemanage){
      this.pagemanage.push(pageName);
    }
   }
showAdd=(id)=>{

  this.moduleId=id;
  this._menuTitle='';
  this.menuId=0;
  this._menuLink='选择页面';
}

midifiedMenu=(id)=>{
  this.menuId=0;
  console.log(this._menuLink)
  let  menuModel={
    _id:id,
    title:this._menuTitle,
    link:this._menuLink
  };
  this.httpService.post("http://localhost:4200/admin/menu/update",menuModel).subscribe(data=>{
      if(data["_id"]){
        this._message.create('success', '修改目录成功');
          this.httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
           this.menuList = data;

        });
        this.moduleId=0;
      }else{
        this._message.create('error', '修改目录失败');
      }

  })

}
// ngDoCheck() {
//
//        console.log('ngDoCheck');
//
//    }

addMenu=()=>{

console.log(this._menuLink)
  if('选择页面'==this._menuLink){
    return;
  }
 let  menuModel={
   title:this._menuTitle,
   link:this._menuLink,
   parentid:this.moduleId,
 };
  this.httpService.post("http://localhost:4200/admin/menu/add",menuModel).subscribe(data=>{
      if(data["_id"]){
        this._message.create('success', '添加目录成功');
          this.httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
           this.menuList = data;

        });
        this.moduleId=0;
      }else{
        this._message.create('error', '添加目录失败');
      }
  })

}
cancel = function () {

  }


deleteMenu=(id)=>{
  this.httpService.get('http://localhost:4200/admin/menu/delete?_id='+id).subscribe(data => {
     if(data['ok']&&data['ok']==1){
        this._message.create('success', '删除目录成功');
        this.httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
           this.menuList = data;

        });
     }else{
       this._message.create('error', '删除目录失败');
     }
  });

}

showEdit=(id,title,link)=>{
  this.menuId=id;
  this.moduleId=0;
  this._menuTitle=title;
  this._menuLink=link;
}


tempId;
 showModal = (id) => {
   this.tempId=id;
   this.selectedMultipleOption=[];
   this.searchOptions=[];
     this.httpService.get('http://localhost:4200/admin/menu/selectById?_id='+id).subscribe(data => {
        if(data["_id"]){
          this.moduleTitle=data['title'];
          this.moduleIcon=data['icon'];
        }
        console.log(data)

   });
   this.isVisible = true;
 }

 handleOk = (e) => {
   this.isVisible = false;

   let  moduleModel={
     _id:this.tempId,
     title:this.moduleTitle,
     icon:this.moduleIcon,
   };
   this.httpService.post("http://localhost:4200/admin/menu/update",moduleModel).subscribe(data=>{
       if(data["_id"]){
         this._message.create('success', '修改成功');
           this.httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
            this.menuList = data;

         });
         this.moduleId=0;
       }else{
         this._message.create('error', '修改失败');
       }
       console.log(data)
   })
 }

 handleCancel = (e) => {
   this.isVisible = false;
 }

  ngOnInit() {
  }

}
