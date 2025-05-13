import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import {
  createTemplateAction
} from '@backstage/plugin-scaffolder-node';

export const archiveZipAction = createTemplateAction({
  id: 'mycompany:archive:zip',
  description: 'Empaqueta el workspace en un archivo .zip y expone un enlace',
  schema: {
    input: {
      required: ['outputName'],
      type: 'object',
      properties: {
        outputName: {
          type: 'string',
          description: 'Nombre del zip a generar',
        },
      },
    },
    output: {
      type: 'object',
      properties: {
        zipPath: {
          type: 'string',
          description: 'Ruta absoluta del archivo creado',
        },
      },
    },
  },

  async handler(ctx) {
    const { outputName } = ctx.input;
    const zipPath = path.join(ctx.workspacePath, '..', outputName);

    ctx.logger.info(`Generando ${zipPath}`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(ctx.workspacePath, false);
    await archive.finalize();

    ctx.output('zipPath', zipPath);
    ctx.logger.info(`ZIP creado: ${zipPath}`);
  },
});
