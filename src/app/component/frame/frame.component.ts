import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../service/http-service.service';
import {MenuItem} from '../../interface/data-interface';
import {StateService} from '../../service/state.service';
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuList: object;
  menuFirst: string="首页";
  menuSecond: string;
  // pageComponent: string="index";
  pageComponent={ title:"首页",link:"index",_id:'0'};

  tabs:object[]=[{ title:"首页",link:"index",_id:'0'}];
constructor(public httpService: HttpServiceService,public stateService:StateService ) {
   httpService.get('http://localhost:4200/admin/menu/list').subscribe(data => {
      this.menuList = data;
   });

}
ngOnInit() {
}
  pageChange(menuTitle,menuItem){

    //面包屑第一项
    this.menuFirst= menuTitle;
    //面包屑第二项
    this.menuSecond= menuItem.title;
    if(menuItem.title){

    }

    if(menuItem.link){
       //点击目录相应的tab栏高亮
        this.stateService.menuSelectId=menuItem._id;
        //如果已经点击过的目录，就不再增加tab栏项目
      let isExist = this.tabs.filter(tab=> {
       return  (<MenuItem>tab)._id == menuItem._id;
       }).length;
      if(!isExist){
         //动态添加页面
        this.pageComponent=menuItem;
        this.tabs.push(menuItem)

      }


    }
  }

onInitPage(page){
this.pageComponent=page;
}

  // onClosePage(id){
  //   console.log(id);
  // }


}
