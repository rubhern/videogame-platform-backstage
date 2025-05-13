import {
  createTemplateAction,
  executeShellCommand,
} from '@backstage/plugin-scaffolder-node';
import { z } from 'zod';

export const mavenGenerateAction = createTemplateAction({
  id: 'mycompany:maven:generate',
  description: 'Generate microservice REST + PostgreSQL with a maven archetype',
  schema: {
    input: z.object({
      artifactId: z.string(),
      groupId: z.string(),
      servicePackage: z.string(),
      entity: z.string(),
      serverPort: z.string(),
      dbName: z.string(),
      dbUser: z.string(),
      dbPassword: z.string(),
      uncapitalizedEntity: z.string()
    }),
  },
  async handler(ctx) {
    const { groupId, artifactId, servicePackage, entity, serverPort, dbName, dbUser, dbPassword, uncapitalizedEntity} = ctx.input;

  /*  await executeShellCommand({
      command: 'mvn',
      args: ['-B', '-f', 'archetype/pom.xml', 'clean', 'install'],
      logStream: ctx.logStream,
      options: { cwd: ctx.workspacePath, shell: true }
    });
  */
 
    await executeShellCommand({
      command: 'mvn',
      args: ['-B', 'archetype:generate',
          '-DarchetypeGroupId=com.videogame.platform',
          '-DarchetypeArtifactId=rest-postgre-archetype',
          '-DarchetypeCatalog=remote',
          '-DarchetypeRepository=http://localhost:8081/repository/archetypes-releases',
          '-DarchetypeVersion=1.0.0',
          `-DgroupId=${groupId}`,
          `-DartifactId=${artifactId}`,
          `-Dversion=0.0.1-SNAPSHOT`,
          `-Dpackage=${servicePackage}`,
          `-Dentity=${entity}`,
          `-DserverPort=${serverPort}`,
          `-DdbName=${dbName}`,
          `-DdbUser=${dbUser}`,
          `-DdbPassword=${dbPassword}`,
          `-DuncapitalizedEntity=${uncapitalizedEntity}`
      ],
      logStream: ctx.logStream,
      options: {
        cwd: ctx.workspacePath,
        shell: true,
      },
    });
  },
});
