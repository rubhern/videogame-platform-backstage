import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint }
  from '@backstage/plugin-scaffolder-node/alpha';
import { mavenGenerateAction } from './actions/mavenGenerate';

export const scaffolderModuleMaven = createBackendModule({
  pluginId: 'scaffolder',      // SIEMPRE "scaffolder"
  moduleId: 'maven-generate',  // nombre único
  register(env) {
    env.registerInit({
      deps: { scaffolder: scaffolderActionsExtensionPoint },
      async init({ scaffolder }) {
        scaffolder.addActions(mavenGenerateAction);
      },
    });
  },
});
