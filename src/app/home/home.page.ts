import { MobileBackendService } from './../services/mobile.backend.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  echo: any;
  image: string;
  constructor(
    private sanitizer: DomSanitizer,
    private mobileBackendService: MobileBackendService
  ) {

  }

  ionViewDidEnter() {
    this.mobileBackendService.echo({value: 'back'}).then((result) => {
      this.echo = result.value;
    });

    // tslint:disable-next-line:max-line-length
    this.mobileBackendService.downloadImage({url: 'https://static.elysee.fr/images/default/0001/02/cea32b77cc47ad7a0d51c4eb3c8c52e5b87bf9fc.jpeg?w=1520&h=2290&s=fdff3706944b0bbfc43a0a2de165229e'}).then((res) => {
       this.image = res.value;
    });
  }

  sanitizer_url(uriString) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(uriString);
  }
}
