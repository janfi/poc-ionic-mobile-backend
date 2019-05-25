import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { MBackend } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class MobileBackendService {

  constructor() {}

  echo(options: { value: string }): Promise<{value: string}> {

    return MBackend.echo(options);
  }

  downloadImage(options: { url: string }): Promise<{value: string}> {

    return MBackend.downloadImage(options);
  }


}
