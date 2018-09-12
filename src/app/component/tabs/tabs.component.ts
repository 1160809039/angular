import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {StateService} from '../../service/state.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs;
  menuSelectId:number;
  @Input() pageComponent;

  @Output() onClosePage=new EventEmitter<number>();
  @Output() onInitPage=new EventEmitter<object>();
  constructor(public stateService:StateService) {

   }

  ngOnInit() {
  }

  switchTab(id){

    this.stateService.menuSelectId=id;
  }
  closeTab(id){
    let index=this.tabs.findIndex(item => item._id===id);
    this.tabs.splice(index, 1);
     this.onClosePage.emit(index);

        if(this.tabs.length>1){
          if(this.tabs.length==index){
             this.stateService.menuSelectId=this.tabs[index-1]._id;
          }else{
             this.stateService.menuSelectId=this.tabs[index]._id;
            }
        }else{
          this.stateService.menuSelectId='0';
        }
       this.onInitPage.emit({ title:"首页",link:"index",_id:'-1'})


  }

}
