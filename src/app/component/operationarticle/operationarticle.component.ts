import { Component, OnInit ,Input,EventEmitter,ElementRef,ViewChild} from '@angular/core';
import {HttpServiceService} from '../../service/http-service.service';
import {UtilsService} from '../../service/utils.service';
import {Article} from '../../interface/data-interface';
import { FileUploader,ParsedResponseHeaders,FileItem } from 'ng2-file-upload';
import {NzMessageService,NzModalSubject } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-operationarticle',
  templateUrl: './operationarticle.component.html',
  styleUrls: ['./operationarticle.component.css']
})
export class OperationarticleComponent implements OnInit {

  _id: number;
  public articleTitle:string;
  public articleDesc:string;
  public category;
  public isEnable:boolean;
  public articleContent:string;

  options;


  editor;  //富文本编辑器对象

//富文本编辑器的配置选项
  quillconfig={
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};

//获取文件选择标签对象
@ViewChild('quillfile')
quillfile:ElementRef;


//初始化文件上传插件对象
uploader:FileUploader = new FileUploader({
    url:"http://localhost:4200/admin/uploadFile",
    method: "POST",
    itemAlias: "quillfile",
    autoUpload: false
});
isShow=false

//编辑不同的文章会传入不同的id
 @Input()
 set id(value: number) {
   let id=value;
   if(value){
     this.isShow=true;
   }

   this.httpService.get('http://localhost:4200/admin/article/id?id='+id).subscribe(data => {
       if(data[0]){
        let article=<Article>(data[0]);
        this.articleTitle=article.articleTitle;
        this.articleDesc=article.articleDesc;
        this.category.id=article.categoryId;
        this.category.category_name=article.categoryName;
        this.isEnable=article.isEnable==0?true:false;
        this.articleContent=article.articleContent;
       }
       this._id=value;
       this.isShow=false
     });
 }

//查询文章列表
  constructor(private  utilsService:UtilsService ,private httpService:HttpServiceService,private _message: NzMessageService,private subject: NzModalSubject) {
    httpService.get('http://localhost:4200/admin/category/list').subscribe(data => {
         this.options = data;
         this.category = this.options[0];
      });
      this.subject.on('onOk', () => {
       this.emitDataOutside();
     });

   }


//监听富文本编辑器初始化事件
onEditorCreated(event){
  this.editor=event;
  let toolbar=event.getModule('toolbar');

  toolbar.addHandler('image',()=>{
   this.quillfile.nativeElement.click();

  })

  // this.quillfile.nativeElement.onchange=()=>{
  //   console.log(this.quillfile.nativeElement)
  // }

}

//文件上传值改变的事件
selectedFileOnChanged(event){
  this.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status == 200) {
          // 上传文件后获取服务器返回的数据


          let tempRes = JSON.parse(response);
            this.editor.insertEmbed(this.editor.getSelection().index+1,'image',tempRes.domain+"/"+tempRes.key)

          this.uploader.queue=[];
          this.createMessage('success','图片插入成功');
      }else {
          // 上传文件后获取服务器返回的数据错误

          this.uploader.queue=[];
            this.createMessage('error','图片插入失败');
      }
  };
  this.uploader.queue[0].upload(); // 开始上传


}

//向父组件发送数据
emitDataOutside() {


// let data=new FormData();
// data.append("articleId",this._id);
// data.append("articleTitle",this.articleTitle);
// data.append("articleDesc",this.articleDesc);
// data.append("articleContent",this.articleContent);
// data.append("isEnable",this.isEnable?0:1);
// data.append("categoryId",this.category.id);
// data.append("categoryName",this.category_name);
   let data={
     articleId:this._id,
     articleTitle:this.articleTitle,
     articleDesc:this.articleDesc,
     articleContent:this.articleContent,
     isEnable:this.isEnable?0:1,
     categoryId:this.category.id,
     addDate:this.utilsService.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
     categoryName:this.category.category_name
   };

   this.subject.next(data);
 }

  addBindingCreated(event){

  }


  //提示消息
  createMessage = (type, text) => {
      this._message.create(type, text);
    };
  ngOnInit() {

  }

}
