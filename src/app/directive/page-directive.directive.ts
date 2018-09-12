
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPageDirective]'
})
export class PageDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
