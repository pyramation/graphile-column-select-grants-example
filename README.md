# graphile-mutation-example

example for 
https://github.com/pyramation/graphile-column-privileges-mutations

## seed db

```sh
createdb mutation_example
psql mutation_example < roles.sql
psql mutation_example < user.sql
psql mutation_example < schema.sql
```

## run server

```sh
yarn && yarn run app_user
```

## open exporer

open http://localhost:5678/graphiql

Example of creating a user

```gql
mutation CreateUserMutation {
  createUser(
    input: {
      user: {
        email: "pyramation@example.com"
        username: "pyramation"
        password:"password"
      }
    }
  ) {
    user {
      id
      username
      email 
    }
  }
}
```

which returns happily

```json
{
  "data": {
    "createUser": {
      "user": {
        "id": 5,
        "username": "pyramation",
        "email": "pyramation@example.com"
      }
    }
  }
}
```

Now querying a field that you are not able to

```gql
mutation CreateUserMutation {
  createUser(
    input: {
      user: {
        email: "pyramation@example.com"
        username: "pyramation"
        password:"password"
      }
    }
  ) {
    user {
      id
      username
      email 
      password
    }
  }
}
```

and you get a permission denied error

```json
{
  "errors": [
    {
      "message": "permission denied for table users",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createUser"
      ]
    }
  ],
  "data": {
    "createUser": null
  }
}
```

## notes

You must run as the `app_user` in order for the privileges to work, otherwise you ultimately end up running as the postgres user or the owner of the table who by default has privileges, and hence will bypass the column grants.

```sh
yarn run app_user
```

If you want, for some reason to use an admin user, we've included this for testing purposes:

```sh
yarn run admin_user
```
