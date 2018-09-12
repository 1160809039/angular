import { Component, OnInit,ViewChild } from '@angular/core';
import {PageInterface} from '../../interface/page-interface';
import {MenuItem} from '../../interface/data-interface';
import {StateService} from '../../service/state.service';
import { NzModalService,NzNotificationService } from 'ng-zorro-antd';
import {OperationarticleComponent} from '../operationarticle/operationarticle.component';
import {HttpServiceService} from '../../service/http-service.service';

//这个页面数据不是从父组件注入的，而是在子组件查，返回给父组件，这是个测试


@Component({
  selector: 'app-articlemanage',
  templateUrl: './articlemanage.component.html',
  styleUrls: ['./articlemanage.component.css']
})
export class ArticlemanageComponent implements OnInit,PageInterface {
    @ViewChild(OperationarticleComponent)
     private operationarticle: OperationarticleComponent;


 data:any[];
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  nzPageIndex=1;//当前页码
   datas:any=[];  //表格数据
   _total:number=0; //数据总数
   dataloading=false;  //表格加载图
    _displayDataChange(datas) {
      this._displayData = datas;
      this._refreshStatus();
    };

    _refreshStatus() {
      const allChecked = this._displayData.every(value => value.checked === true);
      const allUnChecked = this._displayData.every(value => !value.checked);
      this._allChecked = allChecked;
      this._indeterminate = (!allChecked) && (!allUnChecked);
    };

    _checkAll(value) {

      if (value) {
        this._displayData.forEach(data => {
          data.checked = true;
        });
      } else {
        this._displayData.forEach(data => {
          data.checked = false;
        });
      }
      this._refreshStatus();
    };

    constructor(private _notification: NzNotificationService,public stateService:StateService,public httpService:HttpServiceService,public modalService: NzModalService) {
       this.dataloading=true;
        httpService.get('http://localhost:4200/admin/article/count').subscribe(data => {
             this._total = <number>data[0]["count(*)"];
             console.log( this._total);

          });
          httpService.get('http://localhost:4200/admin/article/list?page=1&size=5').subscribe(data => {
              this.datas = data;
              this.dataloading=false;
              this._displayDataChange(this.datas)
           });
    }

    ngOnInit() {


    }

  pageChange(event){
    this.dataloading=true;
    this.nzPageIndex=event;
    this.httpService.get('http://localhost:4200/admin/article/list?page='+event+'&size=5').subscribe(data => {
        this.datas = data;
        this.dataloading=false;
        this._displayDataChange(this.datas)
     });
  }
  cancel(){}
  showModalForComponent(flag,articleId) {
    let that=this;
    let title="添加博客";
    let id=0;
    if(flag=='edit'){
       title="修改博客";
       id=articleId;
     }

    const  subscription = this.modalService.open({
       title          : title,
       content        : OperationarticleComponent,
       width:800,
       onOk() {

       },
       onCancel() {

       },
       componentParams: {
         id: id
       }
     });
     subscription.subscribe(result => {

       if(result.articleId){
         this.httpService.post('http://localhost:4200/admin/article/update',result).subscribe(data => {
           if(data["articleId"]){
              this._notification.create('success', '成功', '成功修改一篇博客');
              this.pageChange(this.nzPageIndex)
           }else{
              this._notification.create('error', '失败', '修改博客失败');
           }
          });
       }else if(result.articleId==0){

         this.httpService.post('http://localhost:4200/admin/article/insert',result).subscribe(data => {
           if(data["insertId"]){
              this._notification.create('success', '成功', '成功添加一篇博客');
              
              this._total=(<number>this._total)-1+2;

              this.pageChange(this.nzPageIndex)
           }else{
               this._notification.create('error', '失败', '添加博客失败');
           }

          });
       }
     })

 }
deleteAll(){
    if(!this.datas){
      return;
    }
    let datafilter=[];
    let deleteData="(";
    datafilter=this.datas.filter(item=>item.checked);
    datafilter.forEach((item,index)=>{
      if(index==datafilter.length-1){
        deleteData+=item.articleId
      }else{
        deleteData+=item.articleId+","
      }

    })
    deleteData+=")";
  this.deletArticle({Ids:deleteData});



}

 deletArticle(ids){
   this.httpService.post('http://localhost:4200/admin/article/delete',ids).subscribe(data => {
     console.log(data)
     if(data["affectedRows"]){
        this._notification.create('success', '成功', '成功删除一篇博客');
        this._total=(<number>this._total)-(<number>data["affectedRows"]);
        if((<number>this.nzPageIndex)*5+1==(<number>this._total)){
          this.pageChange((<number>this.nzPageIndex)-1)
          return;
        }
        this.pageChange(this.nzPageIndex)
     }else{
         this._notification.create('error', '失败', '删除博客失败');
     }

    });
 }

 confirm(Id){
    this.deletArticle({Ids:"("+Id+")"})
 }


}
