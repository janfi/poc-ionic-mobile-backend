import { WebPlugin } from '@capacitor/core';
import { MBackendPlugin } from './definitions';

export class MBackendWeb extends WebPlugin implements MBackendPlugin {
  constructor() {
    super({
      name: 'MBackend',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }
}

const MBackend = new MBackendWeb();

export { MBackend };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(MBackend);
