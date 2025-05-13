import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  scaffolderActionsExtensionPoint,
} from '@backstage/plugin-scaffolder-node/alpha';
import { archiveZipAction } from './actions/archiveZip';

export const scaffolderModuleArchive = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'archive-zip',
  register(env) {
    env.registerInit({
      // EXTENSION-POINT se declara aquí
      deps: { scaffolder: scaffolderActionsExtensionPoint },
      async init({ scaffolder }) {
        scaffolder.addActions(archiveZipAction);
      },
    });
  },
});
