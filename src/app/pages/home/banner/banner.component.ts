import { AfterViewChecked, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BannerDirective } from 'src/app/resources/directive/banner.directive';
import { AdBannerComponent } from 'src/app/resources/interfaces/banner.interface';
import { BannerItemModel } from 'src/app/resources/models/banner-item.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() banners: BannerItemModel[] = [];

  currentBannerIndex = -1;
  interval!: number;

  @ViewChild(BannerDirective, { static: true }) bannerHost!: BannerDirective;

  ngOnInit(): void {
    this.getAds();
    this.loadComponent();
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }

  loadComponent() {
    if (!!this.banners && this.banners.length > 0)
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    const bannerItem = this.banners[this.currentBannerIndex];

    const viewContainerRef = this.bannerHost.viewContainerRef;
    viewContainerRef.clear();

    if (!!bannerItem) {
      const componentRef = viewContainerRef
        .createComponent<AdBannerComponent>(
          bannerItem.component
        );
      componentRef.instance.data = bannerItem.data;
    }
  }

  getAds() {
    this.interval = window.setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
