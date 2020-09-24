import { cleanEnv, str, port } from 'envalid';

export default cleanEnv(
  process.env,
  {
    PGUSER: str({ default: 'postgres' }),
    PGHOST: str({ default: 'localhost' }),
    PGPASSWORD: str({ default: 'password' }),
    PGDATABASE: str({ default: 'mutation_example' }),
    SCHEMA: str({ default: 'app_public' }),
    PGPORT: port({ default: 5432 })
  },
  { dotEnvPath: null }
);
