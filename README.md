# done

```
$ npm create cloudflare@latest done -- --type hello-world
$ npm install prisma --save-dev
$ npm install @prisma/client
$ npm install @prisma/adapter-d1
$ npx wrangler d1 create done
$ npx wrangler d1 migrations create done create_user_table
$ npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_user_table.sql
$ npx wrangler d1 migrations apply done --local
$ npx wrangler d1 migrations apply done --remote
$ npx wrangler d1 execute done --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Local)');" --local
$ npx wrangler d1 execute done --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Remote)');" --remote
$ npx prisma generate
$ npx wrangler d1 migrations create done create_task_table
$ npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0002_create_task_table.sql
$ npx wrangler d1 migrations apply done --local
$ npx wrangler d1 migrations apply done --remote
$ npx wrangler d1 execute done --command "INSERT INTO  \"Task\" (\"name\") VALUES ('Read books');" --local
$ npx wrangler d1 execute done --command "INSERT INTO  \"Task\" (\"name\") VALUES ('Read books');" --remote
$ npx prisma generate
```
