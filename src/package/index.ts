import makeInstaller from './make-installer';
import {mapElements} from './utils';
import * as components from '../components';
import * as layouts from '../layouts';

export const installer = makeInstaller([
  ...mapElements(components),
  ...mapElements(layouts)
]);

export {default as createApp} from './create-app';
