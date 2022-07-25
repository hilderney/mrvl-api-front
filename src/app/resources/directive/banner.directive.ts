import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[bannerHost]',
})
export class BannerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
