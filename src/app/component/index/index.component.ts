import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../interface/page-interface';
import {StateService} from '../../service/state.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit,PageInterface {

  data:any;
  constructor(public stateService:StateService) { }

  ngOnInit() {
  }

}
