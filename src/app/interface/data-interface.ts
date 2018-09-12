export interface DataInterface {
}


export interface MenuItem {
  title:string;
  link:string;
  _id:string;
}

export interface Article {
  articleId:number;
  articleTitle:string;
  articleContent:string;
  articleDesc:string;
  addDate:string;
  changeDate:string;
  categoryId:number;
  categoryName:string;
  isEnable:number;
  commentId:string;
  commentNum:number;
  readNum:number;
  isDelete:boolean;
}
