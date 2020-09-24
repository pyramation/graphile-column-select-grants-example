import express from 'express';
import { postgraphile } from 'postgraphile';

import {
  PgMutationUpdateDeletePlugin,
  PgMutationCreatePlugin
} from 'graphile-column-privileges-mutations';

import PgSimplifyInflectorPlugin from './plugins/PgSimplifyInflectorPlugin';
import env from './env';

const app = express();

const getDbString = () =>
  `postgres://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`;

app.use(
  postgraphile(getDbString(), env.SCHEMA, {
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
    dynamicJson: true,
    appendPlugins: [
      PgSimplifyInflectorPlugin,
      PgMutationCreatePlugin,
      PgMutationUpdateDeletePlugin
    ],
    graphileBuildOptions: {
      // disable the default mutations
      pgDisableDefaultMutations: true
    }
  })
);

export default app;
