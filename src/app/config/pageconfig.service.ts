import { Injectable } from '@angular/core';
import {ArticlemanageComponent} from '../component/articlemanage/articlemanage.component';
import {IndexComponent} from '../component/index/index.component';
import {StatisticsComponent} from '../component/statistics/statistics.component';
import {MenuComponent} from '../component/menu/menu.component';
@Injectable()
export class PageconfigService {

  public articlemanage =  ArticlemanageComponent;
  public index=IndexComponent;
  public pagemanage={
    "index":IndexComponent,
    "articlemanage":ArticlemanageComponent,
    "statistics":StatisticsComponent,
    "menu":MenuComponent
  }
  constructor() { }

}
