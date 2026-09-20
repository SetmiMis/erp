├── .gitignore
├── README.md
├── components
    ├── AdvancedSearch.js
    └── EnhancedDataTable.js
├── erp-backend
    ├── .gitignore
    ├── .prettierrc
    ├── README.md
    ├── eslint.config.mjs
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.controller.spec.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   └── main.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    └── tsconfig.json
├── erp-frontend
    ├── .gitignore
    ├── README.md
    ├── components
    │   ├── AdvancedSearch.js
    │   └── EnhancedDataTable.js
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    └── src
    │   ├── app
    │       ├── api
    │       │   ├── bom
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── current-stock
    │       │   │   └── route.js
    │       │   ├── customers
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── grn
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── items
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── locations
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── material-requisition
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── production-completion
    │       │   │   └── route.js
    │       │   ├── production-orders
    │       │   │   ├── [id]
    │       │   │   │   ├── items
    │       │   │   │   │   └── route.js
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── purchase-orders
    │       │   │   ├── [id]
    │       │   │   │   ├── route.js
    │       │   │   │   └── status
    │       │   │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   ├── quality-checks
    │       │   │   └── route.js
    │       │   ├── stock-adjustments
    │       │   │   └── route.js
    │       │   ├── stock-ledger
    │       │   │   └── route.js
    │       │   ├── stock
    │       │   │   └── route.js
    │       │   ├── suppliers
    │       │   │   ├── [id]
    │       │   │   │   └── route.js
    │       │   │   └── route.js
    │       │   └── warehouses
    │       │   │   ├── [id]
    │       │   │       └── route.js
    │       │   │   └── route.js
    │       ├── bom
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── bulk-operations
    │       │   ├── import
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── current-stock
    │       │   └── page.js
    │       ├── customers
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── dashboard
    │       │   └── page.js
    │       ├── dispatch
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── favicon.ico
    │       ├── fg-receipt
    │       │   └── page.js
    │       ├── globals.css
    │       ├── grn
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── invoice
    │       │   └── page.js
    │       ├── items
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── layout.js
    │       ├── locations
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── login
    │       │   └── page.js
    │       ├── material-requisition
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── navbar.js
    │       ├── page.js
    │       ├── page.module.css
    │       ├── production-orders
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── profile
    │       │   └── page.js
    │       ├── purchase-orders
    │       │   ├── [id]
    │       │   │   ├── complete
    │       │   │   │   └── page.jsx
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── quality-check
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       ├── register
    │       │   └── page.js
    │       ├── reports
    │       │   └── page.js
    │       ├── stock-adjustment
    │       │   └── page.js
    │       ├── stock-ledger
    │       │   └── page.js
    │       ├── suppliers
    │       │   ├── [id]
    │       │   │   ├── edit
    │       │   │   │   └── page.js
    │       │   │   └── page.js
    │       │   ├── create
    │       │   │   └── page.js
    │       │   └── page.js
    │       └── warehouses
    │       │   ├── [id]
    │       │       ├── edit
    │       │       │   └── page.js
    │       │       └── page.js
    │       │   ├── create
    │       │       └── page.js
    │       │   └── page.js
    │   └── lib
    │       ├── db.js
    │       └── stock.js
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── public
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
└── src
    ├── app
        ├── api
        │   ├── bom
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── current-stock
        │   │   └── route.js
        │   ├── customers
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── grn
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── items
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── locations
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── material-requisition
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── production-completion
        │   │   └── route.js
        │   ├── production-orders
        │   │   ├── [id]
        │   │   │   ├── items
        │   │   │   │   └── route.js
        │   │   │   └── route.js
        │   │   └── route.js
        │   ├── purchase-orders
        │   │   ├── [id]
        │   │   │   ├── route.js
        │   │   │   └── status
        │   │   │   │   └── route.js
        │   │   └── route.js
        │   ├── quality-checks
        │   │   └── route.js
        │   ├── stock-adjustments
        │   │   └── route.js
        │   ├── stock-ledger
        │   │   └── route.js
        │   ├── stock
        │   │   └── route.js
        │   ├── suppliers
        │   │   ├── [id]
        │   │   │   └── route.js
        │   │   └── route.js
        │   └── warehouses
        │   │   ├── [id]
        │   │       └── route.js
        │   │   └── route.js
        ├── bom
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── bulk-operations
        │   ├── import
        │   │   └── page.js
        │   └── page.js
        ├── current-stock
        │   └── page.js
        ├── customers
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── dashboard
        │   └── page.js
        ├── dispatch
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── favicon.ico
        ├── fg-receipt
        │   └── page.js
        ├── globals.css
        ├── grn
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── invoice
        │   └── page.js
        ├── items
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── layout.js
        ├── locations
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── login
        │   └── page.js
        ├── material-requisition
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── navbar.js
        ├── page.js
        ├── page.module.css
        ├── production-orders
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── profile
        │   └── page.js
        ├── purchase-orders
        │   ├── [id]
        │   │   ├── complete
        │   │   │   └── page.jsx
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── quality-check
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        ├── register
        │   └── page.js
        ├── reports
        │   └── page.js
        ├── stock-adjustment
        │   └── page.js
        ├── stock-ledger
        │   └── page.js
        ├── suppliers
        │   ├── [id]
        │   │   ├── edit
        │   │   │   └── page.js
        │   │   └── page.js
        │   ├── create
        │   │   └── page.js
        │   └── page.js
        └── warehouses
        │   ├── [id]
        │       ├── edit
        │       │   └── page.js
        │       └── page.js
        │   ├── create
        │       └── page.js
        │   └── page.js
    └── lib
        ├── db.js
        └── stock.js


/.gitignore:
--------------------------------------------------------------------------------
 1 | # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2 | 
 3 | # dependencies
 4 | /node_modules
 5 | /.pnp
 6 | .pnp.*
 7 | .yarn/*
 8 | !.yarn/patches
 9 | !.yarn/plugins
10 | !.yarn/releases
11 | !.yarn/versions
12 | 
13 | # testing
14 | /coverage
15 | 
16 | # next.js
17 | /.next/
18 | /out/
19 | 
20 | # production
21 | /build
22 | 
23 | # misc
24 | .DS_Store
25 | *.pem
26 | 
27 | # debug
28 | npm-debug.log*
29 | yarn-debug.log*
30 | yarn-error.log*
31 | .pnpm-debug.log*
32 | 
33 | # env files (can opt-in for committing if needed)
34 | .env*
35 | 
36 | # vercel
37 | .vercel
38 | 
39 | # typescript
40 | *.tsbuildinfo
41 | next-env.d.ts
42 | 


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
 1 | This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
 2 | 
 3 | ## Getting Started
 4 | 
 5 | First, run the development server:
 6 | 
 7 | ```bash
 8 | npm run dev
 9 | # or
10 | yarn dev
11 | # or
12 | pnpm dev
13 | # or
14 | bun dev
15 | ```
16 | 
17 | Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
18 | 
19 | You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
20 | 
21 | This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
22 | 
23 | ## Learn More
24 | 
25 | To learn more about Next.js, take a look at the following resources:
26 | 
27 | - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
28 | - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
29 | 
30 | You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
31 | 
32 | ## Deploy on Vercel
33 | 
34 | The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
35 | 
36 | Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
37 | 


--------------------------------------------------------------------------------
/erp-backend/.gitignore:
--------------------------------------------------------------------------------
 1 | # compiled output
 2 | /dist
 3 | /node_modules
 4 | /build
 5 | 
 6 | # Logs
 7 | logs
 8 | *.log
 9 | npm-debug.log*
10 | pnpm-debug.log*
11 | yarn-debug.log*
12 | yarn-error.log*
13 | lerna-debug.log*
14 | 
15 | # OS
16 | .DS_Store
17 | 
18 | # Tests
19 | /coverage
20 | /.nyc_output
21 | 
22 | # IDEs and editors
23 | /.idea
24 | .project
25 | .classpath
26 | .c9/
27 | *.launch
28 | .settings/
29 | *.sublime-workspace
30 | 
31 | # IDE - VSCode
32 | .vscode/*
33 | !.vscode/settings.json
34 | !.vscode/tasks.json
35 | !.vscode/launch.json
36 | !.vscode/extensions.json
37 | 
38 | # dotenv environment variable files
39 | .env
40 | .env.development.local
41 | .env.test.local
42 | .env.production.local
43 | .env.local
44 | 
45 | # temp directory
46 | .temp
47 | .tmp
48 | 
49 | # Runtime data
50 | pids
51 | *.pid
52 | *.seed
53 | *.pid.lock
54 | 
55 | # Diagnostic reports (https://nodejs.org/api/report.html)
56 | report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
57 | 


--------------------------------------------------------------------------------
/erp-backend/.prettierrc:
--------------------------------------------------------------------------------
1 | {
2 |   "singleQuote": true,
3 |   "trailingComma": "all"
4 | }


--------------------------------------------------------------------------------
/erp-backend/eslint.config.mjs:
--------------------------------------------------------------------------------
 1 | // @ts-check
 2 | import eslint from '@eslint/js';
 3 | import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
 4 | import globals from 'globals';
 5 | import tseslint from 'typescript-eslint';
 6 | 
 7 | export default tseslint.config(
 8 |   {
 9 |     ignores: ['eslint.config.mjs'],
10 |   },
11 |   eslint.configs.recommended,
12 |   ...tseslint.configs.recommendedTypeChecked,
13 |   eslintPluginPrettierRecommended,
14 |   {
15 |     languageOptions: {
16 |       globals: {
17 |         ...globals.node,
18 |         ...globals.jest,
19 |       },
20 |       sourceType: 'commonjs',
21 |       parserOptions: {
22 |         projectService: true,
23 |         tsconfigRootDir: import.meta.dirname,
24 |       },
25 |     },
26 |   },
27 |   {
28 |     rules: {
29 |       '@typescript-eslint/no-explicit-any': 'off',
30 |       '@typescript-eslint/no-floating-promises': 'warn',
31 |       '@typescript-eslint/no-unsafe-argument': 'warn'
32 |     },
33 |   },
34 | );


--------------------------------------------------------------------------------
/erp-backend/nest-cli.json:
--------------------------------------------------------------------------------
1 | {
2 |   "$schema": "https://json.schemastore.org/nest-cli",
3 |   "collection": "@nestjs/schematics",
4 |   "sourceRoot": "src",
5 |   "compilerOptions": {
6 |     "deleteOutDir": true
7 |   }
8 | }
9 | 


--------------------------------------------------------------------------------
/erp-backend/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "erp-backend",
 3 |   "version": "0.0.1",
 4 |   "description": "",
 5 |   "author": "",
 6 |   "private": true,
 7 |   "license": "UNLICENSED",
 8 |   "scripts": {
 9 |     "build": "nest build",
10 |     "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
11 |     "start": "nest start",
12 |     "start:dev": "nest start --watch",
13 |     "start:debug": "nest start --debug --watch",
14 |     "start:prod": "node dist/main",
15 |     "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
16 |     "test": "jest",
17 |     "test:watch": "jest --watch",
18 |     "test:cov": "jest --coverage",
19 |     "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
20 |     "test:e2e": "jest --config ./test/jest-e2e.json"
21 |   },
22 |   "dependencies": {
23 |     "@nestjs/common": "^11.0.1",
24 |     "@nestjs/core": "^11.0.1",
25 |     "@nestjs/platform-express": "^11.0.1",
26 |     "reflect-metadata": "^0.2.2",
27 |     "rxjs": "^7.8.1"
28 |   },
29 |   "devDependencies": {
30 |     "@eslint/eslintrc": "^3.2.0",
31 |     "@eslint/js": "^9.18.0",
32 |     "@nestjs/cli": "^11.0.0",
33 |     "@nestjs/schematics": "^11.0.0",
34 |     "@nestjs/testing": "^11.0.1",
35 |     "@types/express": "^5.0.0",
36 |     "@types/jest": "^30.0.0",
37 |     "@types/node": "^22.10.7",
38 |     "@types/supertest": "^6.0.2",
39 |     "eslint": "^9.18.0",
40 |     "eslint-config-prettier": "^10.0.1",
41 |     "eslint-plugin-prettier": "^5.2.2",
42 |     "globals": "^16.0.0",
43 |     "jest": "^30.0.0",
44 |     "prettier": "^3.4.2",
45 |     "source-map-support": "^0.5.21",
46 |     "supertest": "^7.0.0",
47 |     "ts-jest": "^29.2.5",
48 |     "ts-loader": "^9.5.2",
49 |     "ts-node": "^10.9.2",
50 |     "tsconfig-paths": "^4.2.0",
51 |     "typescript": "^5.7.3",
52 |     "typescript-eslint": "^8.20.0"
53 |   },
54 |   "jest": {
55 |     "moduleFileExtensions": [
56 |       "js",
57 |       "json",
58 |       "ts"
59 |     ],
60 |     "rootDir": "src",
61 |     "testRegex": ".*\\.spec\\.ts
quot;,
62 |     "transform": {
63 |       "^.+\\.(t|j)s
quot;: "ts-jest"
64 |     },
65 |     "collectCoverageFrom": [
66 |       "**/*.(t|j)s"
67 |     ],
68 |     "coverageDirectory": "../coverage",
69 |     "testEnvironment": "node"
70 |   }
71 | }
72 | 


--------------------------------------------------------------------------------
/erp-backend/src/app.controller.spec.ts:
--------------------------------------------------------------------------------
 1 | import { Test, TestingModule } from '@nestjs/testing';
 2 | import { AppController } from './app.controller';
 3 | import { AppService } from './app.service';
 4 | 
 5 | describe('AppController', () => {
 6 |   let appController: AppController;
 7 | 
 8 |   beforeEach(async () => {
 9 |     const app: TestingModule = await Test.createTestingModule({
10 |       controllers: [AppController],
11 |       providers: [AppService],
12 |     }).compile();
13 | 
14 |     appController = app.get<AppController>(AppController);
15 |   });
16 | 
17 |   describe('root', () => {
18 |     it('should return "Hello World!"', () => {
19 |       expect(appController.getHello()).toBe('Hello World!');
20 |     });
21 |   });
22 | });
23 | 


--------------------------------------------------------------------------------
/erp-backend/src/app.controller.ts:
--------------------------------------------------------------------------------
 1 | import { Controller, Get } from '@nestjs/common';
 2 | import { AppService } from './app.service';
 3 | 
 4 | @Controller()
 5 | export class AppController {
 6 |   constructor(private readonly appService: AppService) {}
 7 | 
 8 |   @Get()
 9 |   getHello(): string {
10 |     return this.appService.getHello();
11 |   }
12 | }
13 | 


--------------------------------------------------------------------------------
/erp-backend/src/app.module.ts:
--------------------------------------------------------------------------------
 1 | import { Module } from '@nestjs/common';
 2 | import { AppController } from './app.controller';
 3 | import { AppService } from './app.service';
 4 | 
 5 | @Module({
 6 |   imports: [],
 7 |   controllers: [AppController],
 8 |   providers: [AppService],
 9 | })
10 | export class AppModule {}
11 | 


--------------------------------------------------------------------------------
/erp-backend/src/app.service.ts:
--------------------------------------------------------------------------------
1 | import { Injectable } from '@nestjs/common';
2 | 
3 | @Injectable()
4 | export class AppService {
5 |   getHello(): string {
6 |     return 'Hello World!';
7 |   }
8 | }
9 | 


--------------------------------------------------------------------------------
/erp-backend/src/main.ts:
--------------------------------------------------------------------------------
1 | import { NestFactory } from '@nestjs/core';
2 | import { AppModule } from './app.module';
3 | 
4 | async function bootstrap() {
5 |   const app = await NestFactory.create(AppModule);
6 |   await app.listen(process.env.PORT ?? 3000);
7 | }
8 | bootstrap();
9 | 


--------------------------------------------------------------------------------
/erp-backend/test/app.e2e-spec.ts:
--------------------------------------------------------------------------------
 1 | import { Test, TestingModule } from '@nestjs/testing';
 2 | import { INestApplication } from '@nestjs/common';
 3 | import * as request from 'supertest';
 4 | import { App } from 'supertest/types';
 5 | import { AppModule } from './../src/app.module';
 6 | 
 7 | describe('AppController (e2e)', () => {
 8 |   let app: INestApplication<App>;
 9 | 
10 |   beforeEach(async () => {
11 |     const moduleFixture: TestingModule = await Test.createTestingModule({
12 |       imports: [AppModule],
13 |     }).compile();
14 | 
15 |     app = moduleFixture.createNestApplication();
16 |     await app.init();
17 |   });
18 | 
19 |   it('/ (GET)', () => {
20 |     return request(app.getHttpServer())
21 |       .get('/')
22 |       .expect(200)
23 |       .expect('Hello World!');
24 |   });
25 | });
26 | 


--------------------------------------------------------------------------------
/erp-backend/test/jest-e2e.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "moduleFileExtensions": ["js", "json", "ts"],
 3 |   "rootDir": ".",
 4 |   "testEnvironment": "node",
 5 |   "testRegex": ".e2e-spec.ts
quot;,
 6 |   "transform": {
 7 |     "^.+\\.(t|j)s
quot;: "ts-jest"
 8 |   }
 9 | }
10 | 


--------------------------------------------------------------------------------
/erp-backend/tsconfig.build.json:
--------------------------------------------------------------------------------
1 | {
2 |   "extends": "./tsconfig.json",
3 |   "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
4 | }
5 | 


--------------------------------------------------------------------------------
/erp-backend/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "module": "nodenext",
 4 |     "moduleResolution": "nodenext",
 5 |     "resolvePackageJsonExports": true,
 6 |     "esModuleInterop": true,
 7 |     "isolatedModules": true,
 8 |     "declaration": true,
 9 |     "removeComments": true,
10 |     "emitDecoratorMetadata": true,
11 |     "experimentalDecorators": true,
12 |     "allowSyntheticDefaultImports": true,
13 |     "target": "ES2023",
14 |     "sourceMap": true,
15 |     "outDir": "./dist",
16 |     "baseUrl": "./",
17 |     "incremental": true,
18 |     "skipLibCheck": true,
19 |     "strictNullChecks": true,
20 |     "forceConsistentCasingInFileNames": true,
21 |     "noImplicitAny": false,
22 |     "strictBindCallApply": false,
23 |     "noFallthroughCasesInSwitch": false
24 |   }
25 | }
26 | 


--------------------------------------------------------------------------------
/erp-frontend/.gitignore:
--------------------------------------------------------------------------------
 1 | # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2 | 
 3 | # dependencies
 4 | /node_modules
 5 | /.pnp
 6 | .pnp.*
 7 | .yarn/*
 8 | !.yarn/patches
 9 | !.yarn/plugins
10 | !.yarn/releases
11 | !.yarn/versions
12 | 
13 | # testing
14 | /coverage
15 | 
16 | # next.js
17 | /.next/
18 | /out/
19 | 
20 | # production
21 | /build
22 | 
23 | # misc
24 | .DS_Store
25 | *.pem
26 | 
27 | # debug
28 | npm-debug.log*
29 | yarn-debug.log*
30 | yarn-error.log*
31 | .pnpm-debug.log*
32 | 
33 | # env files (can opt-in for committing if needed)
34 | .env*
35 | 
36 | # vercel
37 | .vercel
38 | 
39 | # typescript
40 | *.tsbuildinfo
41 | next-env.d.ts
42 | 


--------------------------------------------------------------------------------
/erp-frontend/README.md:
--------------------------------------------------------------------------------
 1 | This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
 2 | 
 3 | ## Getting Started
 4 | 
 5 | First, run the development server:
 6 | 
 7 | ```bash
 8 | npm run dev
 9 | # or
10 | yarn dev
11 | # or
12 | pnpm dev
13 | # or
14 | bun dev
15 | ```
16 | 
17 | Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
18 | 
19 | You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
20 | 
21 | This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
22 | 
23 | ## Learn More
24 | 
25 | To learn more about Next.js, take a look at the following resources:
26 | 
27 | - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
28 | - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
29 | 
30 | You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
31 | 
32 | ## Deploy on Vercel
33 | 
34 | The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
35 | 
36 | Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
37 | 


--------------------------------------------------------------------------------
/erp-frontend/jsconfig.json:
--------------------------------------------------------------------------------
1 | {
2 |   "compilerOptions": {
3 |     "paths": {
4 |       "@/*": ["./src/*"]
5 |     }
6 |   }
7 | }
8 | 


--------------------------------------------------------------------------------
/erp-frontend/next.config.mjs:
--------------------------------------------------------------------------------
1 | /** @type {import('next').NextConfig} */
2 | const nextConfig = {};
3 | 
4 | export default nextConfig;
5 | 


--------------------------------------------------------------------------------
/erp-frontend/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "erp-system",
 3 |   "version": "0.1.0",
 4 |   "private": true,
 5 |   "scripts": {
 6 |     "dev": "next dev --turbopack",
 7 |     "build": "next build --turbopack",
 8 |     "start": "next start"
 9 |   },
10 |   "dependencies": {
11 |     "@emotion/react": "^11.14.0",
12 |     "@emotion/styled": "^11.14.1",
13 |     "@mui/icons-material": "^7.3.2",
14 |     "@mui/material": "^7.3.2",
15 |     "@supabase/supabase-js": "^2.57.4",
16 |     "gsap": "^3.13.0",
17 |     "mysql2": "^3.15.0",
18 |     "next": "15.5.3",
19 |     "react": "19.1.0",
20 |     "react-dom": "19.1.0"
21 |   },
22 |   "devDependencies": {
23 |     "@next/swc-win32-x64-msvc": "^15.5.3"
24 |   }
25 | }
26 | 


--------------------------------------------------------------------------------
/erp-frontend/public/file.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>


--------------------------------------------------------------------------------
/erp-frontend/public/globe.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>


--------------------------------------------------------------------------------
/erp-frontend/public/next.svg:
--------------------------------------------------------------------------------
1 | <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>


--------------------------------------------------------------------------------
/erp-frontend/public/vercel.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>


--------------------------------------------------------------------------------
/erp-frontend/public/window.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/bom/[id]/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // GET - BOM Detail
  5 | // =========================
  6 | export async function GET(req, { params }) {
  7 |   try {
  8 |     const { id } = params;
  9 | 
 10 |     const [bomRows] = await db.query(
 11 |       `SELECT 
 12 |           b.id, 
 13 |           b.bom_number,
 14 |           b.version, 
 15 |           b.is_active, 
 16 |           b.remarks,
 17 |           b.created_at,
 18 |           i.item_name AS product_name,
 19 |           i.item_code AS product_code
 20 |        FROM bom b
 21 |        JOIN items i ON b.item_id = i.id
 22 |        WHERE b.id = ?`,
 23 |       [id]
 24 |     );
 25 | 
 26 |     if (bomRows.length === 0) {
 27 |       return Response.json({ error: "❌ BOM not found" }, { status: 404 });
 28 |     }
 29 | 
 30 |     const bom = bomRows[0];
 31 | 
 32 |     const [compRows] = await db.query(
 33 |       `SELECT 
 34 |           bc.id, 
 35 |           bc.item_id, 
 36 |           bc.qty,
 37 |           i.item_code, 
 38 |           i.item_name
 39 |        FROM bom_components bc
 40 |        JOIN items i ON bc.item_id = i.id
 41 |        WHERE bc.bom_id = ?`,
 42 |       [id]
 43 |     );
 44 | 
 45 |     bom.components = compRows;
 46 | 
 47 |     return Response.json(bom);
 48 |   } catch (error) {
 49 |     console.error("❌ BOM Detail Error:", error);
 50 |     return Response.json({ error: "Failed to fetch BOM details" }, { status: 500 });
 51 |   }
 52 | }
 53 | 
 54 | // =========================
 55 | // PUT - Update BOM
 56 | // =========================
 57 | export async function PUT(req, { params }) {
 58 |   try {
 59 |     const { id } = params;
 60 |     const body = await req.json();
 61 |     const { item_id, version, is_active, remarks, components } = body;
 62 | 
 63 |     if (!item_id || !version || !components || components.length === 0) {
 64 |       return Response.json({ error: "❌ Required fields missing" }, { status: 400 });
 65 |     }
 66 | 
 67 |     // Update BOM header
 68 |     await db.query(
 69 |       `UPDATE bom SET item_id=?, version=?, is_active=?, remarks=?, updated_at=NOW() WHERE id=?`,
 70 |       [item_id, version, is_active ? 1 : 0, remarks || null, id]
 71 |     );
 72 | 
 73 |     // Remove old components
 74 |     await db.query(`DELETE FROM bom_components WHERE bom_id=?`, [id]);
 75 | 
 76 |     // Insert updated components
 77 |     for (const comp of components) {
 78 |       if (!comp.item_id || !comp.qty) continue;
 79 |       await db.query(
 80 |         `INSERT INTO bom_components (bom_id, item_id, qty) VALUES (?, ?, ?)`,
 81 |         [id, comp.item_id, comp.qty]
 82 |       );
 83 |     }
 84 | 
 85 |     return Response.json({ message: "✅ BOM updated successfully" });
 86 |   } catch (error) {
 87 |     console.error("❌ BOM Update Error:", error);
 88 |     return Response.json({ error: "Failed to update BOM" }, { status: 500 });
 89 |   }
 90 | }
 91 | 
 92 | // =========================
 93 | // DELETE - Remove BOM
 94 | // =========================
 95 | export async function DELETE(req, { params }) {
 96 |   try {
 97 |     const { id } = params;
 98 | 
 99 |     await db.query(`DELETE FROM bom_components WHERE bom_id=?`, [id]);
100 |     await db.query(`DELETE FROM bom WHERE id=?`, [id]);
101 | 
102 |     return Response.json({ message: "🗑️ BOM deleted successfully" });
103 |   } catch (error) {
104 |     console.error("❌ BOM Delete Error:", error);
105 |     return Response.json({ error: "Failed to delete BOM" }, { status: 500 });
106 |   }
107 | }
108 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/bom/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // =========================
 4 | // GET - List all BOMs
 5 | // =========================
 6 | export async function GET() {
 7 |   try {
 8 |     const [rows] = await db.query(`
 9 |       SELECT 
10 |         b.id, 
11 |         b.bom_number,
12 |         b.item_id,         -- ✅ add this for linking to FG item later
13 |         b.version, 
14 |         b.is_active, 
15 |         b.remarks,
16 |         b.created_at,
17 |         i.item_name AS fg_name, 
18 |         i.item_code AS fg_code,
19 |         (
20 |           SELECT COUNT(*) 
21 |           FROM bom_components bc 
22 |           WHERE bc.bom_id = b.id
23 |         ) AS components_count
24 |       FROM bom b
25 |       JOIN items i ON b.item_id = i.id
26 |       ORDER BY b.id DESC
27 |     `);
28 | 
29 |     return Response.json(rows);
30 |   } catch (error) {
31 |     console.error("❌ BOM GET Error:", error);
32 |     return Response.json({ error: "Failed to fetch BOMs" }, { status: 500 });
33 |   }
34 | }
35 | 
36 | // =========================
37 | // POST - Create BOM
38 | // =========================
39 | export async function POST(request) {
40 |   try {
41 |     const body = await request.json();
42 |     const { item_id, version, is_active, remarks, components } = body;
43 | 
44 |     if (!item_id || !version || !components || components.length === 0) {
45 |       return Response.json(
46 |         { error: "❌ Finished product and components are required" },
47 |         { status: 400 }
48 |       );
49 |     }
50 | 
51 |     // 🔹 Generate BOM Number
52 |     const bom_number = `BOM${new Date()
53 |       .toISOString()
54 |       .slice(0, 10)
55 |       .replace(/-/g, "")}${Math.floor(Math.random() * 9000 + 1000)}`;
56 | 
57 |     // 🔹 Insert BOM Header
58 |     const [result] = await db.query(
59 |       `INSERT INTO bom (bom_number, item_id, version, is_active, remarks, created_at)
60 |        VALUES (?, ?, ?, ?, ?, NOW())`,
61 |       [bom_number, item_id, version, is_active ? 1 : 0, remarks || null]
62 |     );
63 | 
64 |     const bom_id = result.insertId;
65 | 
66 |     // 🔹 Insert BOM Components
67 |     for (const comp of components) {
68 |       if (!comp.item_id || !comp.qty) continue;
69 |       await db.query(
70 |         `INSERT INTO bom_components (bom_id, item_id, qty)
71 |          VALUES (?, ?, ?)`,
72 |         [bom_id, comp.item_id, comp.qty]
73 |       );
74 |     }
75 | 
76 |     return Response.json({
77 |       message: "✅ BOM created successfully",
78 |       bom_id,
79 |       bom_number,
80 |     });
81 |   } catch (error) {
82 |     console.error("❌ BOM POST Error:", error);
83 |     return Response.json({ error: "Failed to create BOM" }, { status: 500 });
84 |   }
85 | }
86 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/current-stock/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Current Stock (warehouse + search filter)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const search = searchParams.get("search") || "";
 8 |     const warehouseId = searchParams.get("warehouse_id") || "";
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         i.id,
13 |         i.item_code,
14 |         i.item_name,
15 |         i.uom AS unit,
16 |         i.reorder_level,
17 |         w.warehouse_name,
18 |         IFNULL(SUM(
19 |           CASE 
20 |             WHEN sl.transaction_type IN ('IN','purchase','production','adjustment') THEN sl.qty
21 |             WHEN sl.transaction_type IN ('OUT','sale') THEN -sl.qty
22 |             ELSE 0 
23 |           END
24 |         ), 0) AS current_stock
25 |       FROM items i
26 |       JOIN stock_ledger sl ON sl.item_id = i.id
27 |       JOIN warehouses w ON sl.warehouse_id = w.id
28 |       WHERE 1=1
29 |     `;
30 | 
31 |     const params = [];
32 | 
33 |     // 🔹 Search filter
34 |     if (search) {
35 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ?)`;
36 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`);
37 |     }
38 | 
39 |     // 🔹 Warehouse filter
40 |     if (warehouseId) {
41 |       query += ` AND w.id = ?`;
42 |       params.push(warehouseId);
43 |     }
44 | 
45 |     query += ` GROUP BY i.id, w.id ORDER BY i.item_name`;
46 | 
47 |     const [rows] = await db.query(query, params);
48 |     return Response.json(rows);
49 |   } catch (error) {
50 |     console.error("❌ GET Current Stock Error:", error);
51 |     return Response.json({ error: error.message }, { status: 500 });
52 |   }
53 | }
54 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/customers/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // 🔹 Get one customer
 4 | export async function GET(req, context) {
 5 |   try {
 6 |     const { id } = context.params;
 7 |     const [rows] = await db.query("SELECT * FROM customers WHERE id = ?", [id]);
 8 | 
 9 |     if (rows.length === 0) {
10 |       return Response.json({ error: "Customer not found" }, { status: 404 });
11 |     }
12 |     return Response.json(rows[0]);
13 |   } catch (error) {
14 |     return Response.json({ error: error.message }, { status: 500 });
15 |   }
16 | }
17 | 
18 | // 🔹 Update customer
19 | export async function PUT(req, context) {
20 |   try {
21 |     const { id } = context.params;
22 |     const body = await req.json();
23 | 
24 |     await db.query("UPDATE customers SET ? WHERE id = ?", [body, id]);
25 | 
26 |     return Response.json({ message: "Customer updated successfully" });
27 |   } catch (error) {
28 |     return Response.json({ error: error.message }, { status: 500 });
29 |   }
30 | }
31 | 
32 | // 🔹 Delete customer
33 | export async function DELETE(req, context) {
34 |   try {
35 |     const { id } = context.params;
36 |     await db.query("DELETE FROM customers WHERE id = ?", [id]);
37 | 
38 |     return Response.json({ message: "Customer deleted successfully" });
39 |   } catch (error) {
40 |     return Response.json({ error: error.message }, { status: 500 });
41 |   }
42 | }
43 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/customers/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // 🔹 Get all customers
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM customers ORDER BY created_at DESC");
 7 |     return Response.json(rows);
 8 |   } catch (error) {
 9 |     return Response.json({ error: error.message }, { status: 500 });
10 |   }
11 | }
12 | 
13 | // 🔹 Create new customer
14 | export async function POST(request) {
15 |   try {
16 |     const body = await request.json();
17 |     const {
18 |       customer_name,
19 |       customer_type,
20 |       contact_person,
21 |       email,
22 |       phone,
23 |       address,
24 |       city,
25 |       state,
26 |       pincode,
27 |       country = "India",
28 |       gst_number,
29 |       pan_number,
30 |       credit_limit = 0,
31 |       credit_days = 0,
32 |       payment_terms,
33 |       status = "active",
34 |     } = body;
35 | 
36 |     // Generate auto customer code
37 |     const [last] = await db.query("SELECT customer_code FROM customers ORDER BY id DESC LIMIT 1");
38 |     let newCode = "CUST001";
39 |     if (last.length > 0) {
40 |       const lastCode = last[0].customer_code;
41 |       const num = parseInt(lastCode.replace("CUST", "")) + 1;
42 |       newCode = "CUST" + num.toString().padStart(3, "0");
43 |     }
44 | 
45 |     const [result] = await db.query(
46 |       `INSERT INTO customers 
47 |       (customer_code, customer_name, customer_type, contact_person, email, phone, address, city, state, pincode, country, gst_number, pan_number, credit_limit, credit_days, payment_terms, status)
48 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
49 |       [
50 |         newCode,
51 |         customer_name,
52 |         customer_type,
53 |         contact_person,
54 |         email,
55 |         phone,
56 |         address,
57 |         city,
58 |         state,
59 |         pincode,
60 |         country,
61 |         gst_number,
62 |         pan_number,
63 |         credit_limit,
64 |         credit_days,
65 |         payment_terms,
66 |         status,
67 |       ]
68 |     );
69 | 
70 |     return Response.json({ id: result.insertId, customer_code: newCode, ...body });
71 |   } catch (error) {
72 |     return Response.json({ error: error.message }, { status: 500 });
73 |   }
74 | }
75 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/grn/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET single GRN (with items)
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       `SELECT grn.*, po.po_number, s.supplier_name
 8 |        FROM purchase_receipts grn
 9 |        LEFT JOIN purchase_orders po ON grn.po_id = po.id
10 |        LEFT JOIN suppliers s ON po.supplier_id = s.id
11 |        WHERE grn.id = ?`,
12 |       [params.id]
13 |     );
14 | 
15 |     if (rows.length === 0) {
16 |       return Response.json({ error: "GRN not found" }, { status: 404 });
17 |     }
18 | 
19 |     const grn = rows[0];
20 | 
21 |     // ✅ fetch GRN items
22 |     const [items] = await db.query(
23 |       `SELECT gri.id, gri.item_id, gri.received_qty, gri.remarks,
24 |               i.item_name, i.item_code, i.uom
25 |        FROM purchase_receipt_items gri
26 |        JOIN items i ON gri.item_id = i.id
27 |        WHERE gri.receipt_id = ?`,
28 |       [params.id]
29 |     );
30 | 
31 |     grn.items = items;
32 | 
33 |     return Response.json(grn);
34 |   } catch (error) {
35 |     console.error("❌ GET GRN Error:", error);
36 |     return Response.json({ error: error.message }, { status: 500 });
37 |   }
38 | }
39 | 
40 | // ✅ UPDATE GRN (header + items)
41 | export async function PUT(request, { params }) {
42 |   try {
43 |     const body = await request.json();
44 |     const { receipt_date, remarks, status, items } = body;
45 | 
46 |     // ✅ update header
47 |     await db.query(
48 |       `UPDATE purchase_receipts 
49 |        SET receipt_date=?, remarks=?, status=?, updated_at=NOW()
50 |        WHERE id=?`,
51 |       [receipt_date, remarks, status, params.id]
52 |     );
53 | 
54 |     // ✅ update items (if provided)
55 |     if (items && items.length > 0) {
56 |       for (const item of items) {
57 |         await db.query(
58 |           `UPDATE purchase_receipt_items
59 |            SET received_qty=?, remarks=?
60 |            WHERE id=? AND receipt_id=?`,
61 |           [item.received_qty, item.remarks || "", item.id, params.id]
62 |         );
63 |       }
64 |     }
65 | 
66 |     return Response.json({ message: "GRN updated successfully" });
67 |   } catch (error) {
68 |     console.error("❌ PUT GRN Error:", error);
69 |     return Response.json({ error: error.message }, { status: 500 });
70 |   }
71 | }
72 | 
73 | // ✅ DELETE GRN
74 | export async function DELETE(request, { params }) {
75 |   try {
76 |     // ✅ delete items first
77 |     await db.query(`DELETE FROM purchase_receipt_items WHERE receipt_id=?`, [params.id]);
78 | 
79 |     // ✅ delete GRN header
80 |     await db.query("DELETE FROM purchase_receipts WHERE id=?", [params.id]);
81 | 
82 |     return Response.json({ message: "GRN deleted successfully" });
83 |   } catch (error) {
84 |     console.error("❌ DELETE GRN Error:", error);
85 |     return Response.json({ error: error.message }, { status: 500 });
86 |   }
87 | }
88 |   


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/items/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Single item
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [params.id]);
 7 |     if (rows.length === 0) {
 8 |       return Response.json({ error: "Item not found" }, { status: 404 });
 9 |     }
10 |     return Response.json(rows[0]);
11 |   } catch (error) {
12 |     return Response.json({ error: error.message }, { status: 500 });
13 |   }
14 | }
15 | 
16 | // ✅ PUT - Update item
17 | export async function PUT(request, { params }) {
18 |   try {
19 |     const body = await request.json();
20 |     const {
21 |       item_name,
22 |       item_type = "raw_material",
23 |       item_category,
24 |       uom,
25 |       hsn_code,
26 |       gst_rate = 0,
27 |       purchase_rate = 0,
28 |       sale_rate = 0,
29 |       minimum_stock = 0,
30 |       maximum_stock = 0,
31 |       reorder_level = 0,
32 |       status = "active",
33 |     } = body;
34 | 
35 |     await db.query(
36 |       `UPDATE items SET 
37 |         item_name=?, item_type=?, item_category=?, uom=?, hsn_code=?, gst_rate=?, 
38 |         purchase_rate=?, sale_rate=?, minimum_stock=?, maximum_stock=?, reorder_level=?, status=? 
39 |       WHERE id=?`,
40 |       [
41 |         item_name,
42 |         item_type,
43 |         item_category,
44 |         uom,
45 |         hsn_code,
46 |         gst_rate,
47 |         purchase_rate,
48 |         sale_rate,
49 |         minimum_stock,
50 |         maximum_stock,
51 |         reorder_level,
52 |         status,
53 |         params.id,
54 |       ]
55 |     );
56 | 
57 |     return Response.json({ message: "Item updated successfully" });
58 |   } catch (error) {
59 |     return Response.json({ error: error.message }, { status: 500 });
60 |   }
61 | }
62 | 
63 | // ✅ DELETE - Remove item
64 | export async function DELETE(request, { params }) {
65 |   try {
66 |     await db.query("DELETE FROM items WHERE id = ?", [params.id]);
67 |     return Response.json({ message: "Item deleted successfully" });
68 |   } catch (error) {
69 |     return Response.json({ error: error.message }, { status: 500 });
70 |   }
71 | }
72 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/items/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET all items
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM items ORDER BY created_at DESC");
 7 |     return Response.json(rows);
 8 |   } catch (error) {
 9 |     return Response.json({ error: error.message }, { status: 500 });
10 |   }
11 | }
12 | 
13 | // ✅ POST - create new item
14 | export async function POST(request) {
15 |   try {
16 |     const body = await request.json();
17 |     const {
18 |       item_code,
19 |       item_name,
20 |       item_type = "raw_material", // default
21 |       item_category = "",
22 |       uom = "pcs",                // ✅ default value added
23 |       hsn_code = "",
24 |       gst_rate = 0,
25 |       purchase_rate = 0,
26 |       sale_rate = 0,
27 |       minimum_stock = 0,
28 |       maximum_stock = 0,
29 |       reorder_level = 0,
30 |       status = "active",
31 |     } = body;
32 | 
33 |     if (!item_name || !item_code) {
34 |       return Response.json(
35 |         { error: "Item Code and Item Name are required" },
36 |         { status: 400 }
37 |       );
38 |     }
39 | 
40 |     const [result] = await db.query(
41 |       `INSERT INTO items 
42 |       (item_code, item_name, item_type, item_category, uom, hsn_code, gst_rate, purchase_rate, sale_rate, minimum_stock, maximum_stock, reorder_level, status)
43 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
44 |       [
45 |         item_code,
46 |         item_name,
47 |         item_type,
48 |         item_category,
49 |         uom,
50 |         hsn_code,
51 |         gst_rate,
52 |         purchase_rate,
53 |         sale_rate,
54 |         minimum_stock,
55 |         maximum_stock,
56 |         reorder_level,
57 |         status,
58 |       ]
59 |     );
60 | 
61 |     return Response.json({ id: result.insertId, ...body });
62 |   } catch (error) {
63 |     return Response.json({ error: error.message }, { status: 500 });
64 |   }
65 | }
66 |     


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/locations/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Single Location
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       `SELECT l.*, w.warehouse_name 
 8 |        FROM locations l 
 9 |        JOIN warehouses w ON l.warehouse_id = w.id
10 |        WHERE l.id = ?`,
11 |       [params.id]
12 |     );
13 | 
14 |     if (rows.length === 0) {
15 |       return Response.json({ message: "Location not found" }, { status: 404 });
16 |     }
17 | 
18 |     return Response.json(rows[0]);
19 |   } catch (error) {
20 |     console.error("❌ GET Location Error:", error);
21 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
22 |   }
23 | }
24 | 
25 | // ✅ PUT - Update Location
26 | export async function PUT(request, { params }) {
27 |   try {
28 |     const body = await request.json();
29 |     const {
30 |       location_name,
31 |       location_code,
32 |       warehouse_id,
33 |       location_type,
34 |       parent_location_id,
35 |       capacity,
36 |       is_default,
37 |       status,
38 |     } = body;
39 | 
40 |     await db.query(
41 |       `UPDATE locations 
42 |        SET location_name=?, location_code=?, warehouse_id=?, location_type=?, parent_location_id=?, capacity=?, is_default=?, status=?, updated_at=NOW() 
43 |        WHERE id=?`,
44 |       [
45 |         location_name,
46 |         location_code,
47 |         warehouse_id,
48 |         location_type || "rack",
49 |         parent_location_id || null,
50 |         capacity || 0,
51 |         is_default || 0,
52 |         status || "active",
53 |         params.id,
54 |       ]
55 |     );
56 | 
57 |     return Response.json({ message: "✅ Location updated successfully" });
58 |   } catch (error) {
59 |     console.error("❌ PUT Location Error:", error);
60 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
61 |   }
62 | }
63 | 
64 | // ✅ DELETE - Remove Location
65 | export async function DELETE(request, { params }) {
66 |   try {
67 |     await db.query(`DELETE FROM locations WHERE id=?`, [params.id]);
68 |     return Response.json({ message: "🗑️ Location deleted successfully" });
69 |   } catch (error) {
70 |     console.error("❌ DELETE Location Error:", error);
71 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
72 |   }
73 | }
74 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/locations/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - All Locations
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query(`
 7 |       SELECT l.id, l.location_code, l.location_name, l.location_type,
 8 |              l.capacity, l.current_stock, l.is_default, l.status,
 9 |              l.created_at, l.updated_at,
10 |              w.warehouse_name
11 |       FROM locations l
12 |       JOIN warehouses w ON l.warehouse_id = w.id
13 |       ORDER BY l.location_name
14 |     `);
15 |     return Response.json(rows);
16 |   } catch (error) {
17 |     console.error("❌ GET Locations Error:", error);
18 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
19 |   }
20 | }
21 | 
22 | // ✅ POST - Create Location
23 | export async function POST(request) {
24 |   try {
25 |     const body = await request.json();
26 |     const {
27 |       location_name,
28 |       location_code,
29 |       warehouse_id,
30 |       location_type,
31 |       parent_location_id,
32 |       capacity,
33 |       is_default,
34 |       status,
35 |     } = body;
36 | 
37 |     if (!location_name || !location_code || !warehouse_id) {
38 |       return Response.json({ message: "Missing required fields" }, { status: 400 });
39 |     }
40 | 
41 |     const [result] = await db.query(
42 |       `INSERT INTO locations 
43 |        (location_name, location_code, warehouse_id, location_type, parent_location_id, capacity, current_stock, is_default, status, created_at, updated_at) 
44 |        VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, NOW(), NOW())`,
45 |       [
46 |         location_name,
47 |         location_code,
48 |         warehouse_id,
49 |         location_type || "rack",
50 |         parent_location_id || null,
51 |         capacity || 0,
52 |         is_default || 0,
53 |         status || "active",
54 |       ]
55 |     );
56 | 
57 |     return Response.json({
58 |       message: "✅ Location created successfully",
59 |       id: result.insertId,
60 |     });
61 |   } catch (error) {
62 |     console.error("❌ POST Location Error:", error);
63 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
64 |   }
65 | }
66 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/production-completion/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | function sanitizeString(s) {
 4 |   return typeof s === "string" ? s.trim() : s;
 5 | }
 6 | 
 7 | export async function POST(req) {
 8 |   let conn;
 9 |   try {
10 |     const body = await req.json();
11 |     const production_order_id = body.production_order_id;
12 |     const produced_qty = Number(body.produced_qty);
13 |     const warehouse_id = body.warehouse_id;
14 |     const location_id = body.location_id || null;
15 |     const remarks = sanitizeString(body.remarks || "");
16 | 
17 |     // ✅ Validation
18 |     if (!production_order_id) {
19 |       return Response.json({ error: "production_order_id is required" }, { status: 400 });
20 |     }
21 |     if (isNaN(produced_qty) || produced_qty <= 0) {
22 |       return Response.json({ error: "produced_qty must be > 0" }, { status: 400 });
23 |     }
24 |     if (!warehouse_id) {
25 |       return Response.json({ error: "warehouse_id is required" }, { status: 400 });
26 |     }
27 | 
28 |     // ✅ Get production order
29 |     const [[order]] = await db.query(
30 |       `SELECT * FROM production_orders WHERE id = ?`,
31 |       [production_order_id]
32 |     );
33 |     if (!order) {
34 |       return Response.json({ error: "Production order not found" }, { status: 404 });
35 |     }
36 | 
37 |     // ✅ Begin Transaction
38 |     conn = await db.getConnection();
39 |     await conn.beginTransaction();
40 | 
41 |     // Update production_orders
42 |     await conn.query(
43 |       `UPDATE production_orders 
44 |        SET produced_qty = produced_qty + ?, status = 'completed', updated_at = NOW()
45 |        WHERE id = ?`,
46 |       [produced_qty, production_order_id]
47 |     );
48 | 
49 |     // Insert Stock Ledger (FG IN)
50 |     await conn.query(
51 |       `INSERT INTO stock_ledger 
52 |        (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, transaction_date, remarks, created_at)
53 |        VALUES (?, ?, ?, 'IN', 'Production Order', ?, ?, ?, ?, ?, NOW(), ?, NOW())`,
54 |       [
55 |         order.fg_item_id,
56 |         warehouse_id,
57 |         location_id,
58 |         production_order_id,
59 |         order.order_number,
60 |         production_order_id,
61 |         produced_qty,
62 |         produced_qty, // balance update karna hoga agar running balance logic chahiye
63 |         remarks,
64 |       ]
65 |     );
66 | 
67 |     await conn.commit();
68 |     conn.release();
69 | 
70 |     return Response.json({
71 |       message: "Production completed successfully",
72 |       production_order_id,
73 |       produced_qty,
74 |     });
75 |   } catch (err) {
76 |     console.error("❌ Production Completion API error:", err);
77 |     if (conn) {
78 |       await conn.rollback();
79 |       conn.release();
80 |     }
81 |     return Response.json({ error: err.message || "Server error" }, { status: 500 });
82 |   }
83 | }
84 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/production-orders/[id]/items/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | export async function GET(req, { params }) {
 4 |   try {
 5 |     const { id } = params;
 6 |     if (!id) {
 7 |       return Response.json({ error: "Missing production order id" }, { status: 400 });
 8 |     }
 9 | 
10 |     const [rows] = await db.query(
11 |       `SELECT 
12 |          poi.item_id, 
13 |          i.item_code, 
14 |          i.item_name, 
15 |          poi.planned_qty, 
16 |          poi.issued_qty, 
17 |          (poi.planned_qty - IFNULL(poi.issued_qty,0)) AS pending_qty,
18 |          COALESCE(poi.uom, i.uom, '') AS uom
19 |        FROM production_order_items poi
20 |        LEFT JOIN items i ON poi.item_id = i.id
21 |        WHERE poi.production_order_id = ?
22 |        ORDER BY poi.id ASC`,
23 |       [id]
24 |     );
25 | 
26 |     return Response.json(rows);
27 |   } catch (err) {
28 |     console.error("❌ Fetch PO items error:", err);
29 |     return Response.json({ error: "Failed to fetch production order items" }, { status: 500 });
30 |   }
31 | }
32 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/production-orders/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // GET - List all Production Orders
  5 | // =========================
  6 | export async function GET(req) {
  7 |   try {
  8 |     const { searchParams } = new URL(req.url);
  9 |     const status = searchParams.get("status");
 10 |     const search = searchParams.get("search");
 11 | 
 12 |     let query = `
 13 |       SELECT 
 14 |         po.id,
 15 |         po.order_number,
 16 |         po.order_qty,
 17 |         po.status,
 18 |         po.created_at,
 19 |         po.planned_start_date,
 20 |         po.planned_end_date,
 21 |         b.version AS bom_version,
 22 |         i.item_name AS fg_name,
 23 |         i.item_code AS fg_code,
 24 |         w.warehouse_name
 25 |       FROM production_orders po
 26 |       JOIN bom b ON po.bom_id = b.id
 27 |       JOIN items i ON po.fg_item_id = i.id
 28 |       JOIN warehouses w ON po.warehouse_id = w.id
 29 |       WHERE 1=1
 30 |     `;
 31 | 
 32 |     const params = [];
 33 |     if (status) {
 34 |       query += ` AND po.status = ?`;
 35 |       params.push(status);
 36 |     }
 37 |     if (search) {
 38 |       query += ` AND (po.order_number LIKE ? OR i.item_name LIKE ? OR i.item_code LIKE ?)`;
 39 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`);
 40 |     }
 41 | 
 42 |     query += " ORDER BY po.id DESC";
 43 | 
 44 |     const [rows] = await db.query(query, params);
 45 |     return Response.json(rows);
 46 |   } catch (error) {
 47 |     console.error("❌ Production Orders GET Error:", error);
 48 |     return Response.json({ error: error.message }, { status: 500 });
 49 |   }
 50 | }
 51 | 
 52 | // =========================
 53 | // POST - Create Production Order
 54 | // =========================
 55 | export async function POST(request) {
 56 |   try {
 57 |     const body = await request.json();
 58 |     const {
 59 |       bom_id,
 60 |       fg_item_id,
 61 |       warehouse_id,
 62 |       order_qty,
 63 |       planned_start_date,
 64 |       planned_end_date,
 65 |       remarks,
 66 |     } = body;
 67 | 
 68 |     // ✅ Validation
 69 |     if (!bom_id || !fg_item_id || !warehouse_id || !order_qty || !planned_start_date) {
 70 |       return Response.json({ error: "❌ All required fields must be filled" }, { status: 400 });
 71 |     }
 72 | 
 73 |     if (isNaN(order_qty) || Number(order_qty) <= 0) {
 74 |       return Response.json({ error: "❌ Order quantity must be greater than 0" }, { status: 400 });
 75 |     }
 76 | 
 77 |     // ✅ Check BOM exists
 78 |     const [bomCheck] = await db.query(`SELECT id FROM bom WHERE id = ?`, [bom_id]);
 79 |     if (bomCheck.length === 0) {
 80 |       return Response.json({ error: "❌ Invalid BOM selected" }, { status: 400 });
 81 |     }
 82 | 
 83 |     // ✅ Check warehouse exists
 84 |     const [whCheck] = await db.query(`SELECT id FROM warehouses WHERE id = ?`, [warehouse_id]);
 85 |     if (whCheck.length === 0) {
 86 |       return Response.json({ error: "❌ Invalid warehouse selected" }, { status: 400 });
 87 |     }
 88 | 
 89 |     // ✅ Generate Order Number
 90 |     const order_number = `PO${new Date()
 91 |       .toISOString()
 92 |       .slice(0, 10)
 93 |       .replace(/-/g, "")}${Math.floor(Math.random() * 9000 + 1000)}`;
 94 | 
 95 |     // ✅ Insert Order
 96 |     const [result] = await db.query(
 97 |       `INSERT INTO production_orders 
 98 |        (order_number, bom_id, fg_item_id, warehouse_id, order_qty, status, planned_start_date, planned_end_date, remarks, created_at)
 99 |        VALUES (?, ?, ?, ?, ?, 'draft', ?, ?, ?, NOW())`,
100 |       [order_number, bom_id, fg_item_id, warehouse_id, order_qty, planned_start_date, planned_end_date || null, remarks || null]
101 |     );
102 | 
103 |     const production_order_id = result.insertId;
104 | 
105 |     // ✅ Auto add components from BOM
106 |     const [components] = await db.query(
107 |       `SELECT item_id, qty FROM bom_components WHERE bom_id = ?`,
108 |       [bom_id]
109 |     );
110 | 
111 |     for (const comp of components) {
112 |       const planned_qty = comp.qty * order_qty;
113 |       await db.query(
114 |         `INSERT INTO production_order_items 
115 |          (production_order_id, item_id, planned_qty, issued_qty) 
116 |          VALUES (?, ?, ?, 0)`,
117 |         [production_order_id, comp.item_id, planned_qty]
118 |       );
119 |     }
120 | 
121 |     return Response.json({
122 |       message: "✅ Production Order created successfully",
123 |       order_number,
124 |       production_order_id,
125 |     });
126 |   } catch (error) {
127 |     console.error("❌ Production Orders POST Error:", error);
128 |     return Response.json({ error: error.message }, { status: 500 });
129 |   }
130 | }
131 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/purchase-orders/[id]/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // ✅ GET - Single Purchase Order (with items)
  4 | export async function GET(request, { params }) {
  5 |   try {
  6 |     // Header
  7 |     const [orders] = await db.query(
  8 |       `SELECT po.*, s.supplier_name, w.warehouse_name
  9 |        FROM purchase_orders po
 10 |        JOIN suppliers s ON po.supplier_id = s.id
 11 |        JOIN warehouses w ON po.warehouse_id = w.id
 12 |        WHERE po.id = ?`,
 13 |       [params.id]
 14 |     );
 15 | 
 16 |     if (orders.length === 0) {
 17 |       return Response.json({ error: "Purchase Order not found" }, { status: 404 });
 18 |     }
 19 | 
 20 |     const purchaseOrder = orders[0];
 21 | 
 22 |     // Cast numbers
 23 |     purchaseOrder.subtotal = parseFloat(purchaseOrder.subtotal) || 0;
 24 |     purchaseOrder.discount_amount = parseFloat(purchaseOrder.discount_amount) || 0;
 25 |     purchaseOrder.tax_amount = parseFloat(purchaseOrder.tax_amount) || 0;
 26 |     purchaseOrder.total_amount = parseFloat(purchaseOrder.total_amount) || 0;
 27 | 
 28 |     // Items
 29 |     const [items] = await db.query(
 30 |       `SELECT poi.*, i.item_name, i.item_code, i.uom
 31 |        FROM purchase_order_items poi
 32 |        JOIN items i ON poi.item_id = i.id
 33 |        WHERE poi.po_id = ?`,
 34 |       [params.id]
 35 |     );
 36 | 
 37 |     purchaseOrder.items = items.map((it) => ({
 38 |       ...it,
 39 |       ordered_qty: parseFloat(it.ordered_qty) || 0,
 40 |       unit_price: parseFloat(it.unit_price) || 0,
 41 |       discount_percent: parseFloat(it.discount_percent) || 0,
 42 |       tax_percent: parseFloat(it.tax_percent) || 0,
 43 |     }));
 44 | 
 45 |     return Response.json(purchaseOrder);
 46 |   } catch (error) {
 47 |     console.error("❌ GET Single PO Error:", error);
 48 |     return Response.json({ error: error.message }, { status: 500 });
 49 |   }
 50 | }
 51 | 
 52 | // ✅ PUT - Update Purchase Order
 53 | export async function PUT(request, { params }) {
 54 |   try {
 55 |     const body = await request.json();
 56 |     const {
 57 |       supplier_id,
 58 |       warehouse_id,
 59 |       po_date,
 60 |       expected_delivery_date,
 61 |       terms_and_conditions,
 62 |       remarks,
 63 |       status,
 64 |       subtotal,
 65 |       discount_amount,
 66 |       tax_amount,
 67 |       total_amount,
 68 |     } = body;
 69 | 
 70 |     await db.query(
 71 |       `UPDATE purchase_orders 
 72 |        SET supplier_id=?, warehouse_id=?, po_date=?, expected_delivery_date=?, terms_and_conditions=?, remarks=?, status=?, subtotal=?, discount_amount=?, tax_amount=?, total_amount=?, updated_at=NOW()
 73 |        WHERE id=?`,
 74 |       [
 75 |         supplier_id,
 76 |         warehouse_id,
 77 |         po_date,
 78 |         expected_delivery_date,
 79 |         terms_and_conditions,
 80 |         remarks,
 81 |         status,
 82 |         subtotal,
 83 |         discount_amount,
 84 |         tax_amount,
 85 |         total_amount,
 86 |         params.id,
 87 |       ]
 88 |     );
 89 | 
 90 |     return Response.json({ message: "Purchase Order updated successfully" });
 91 |   } catch (error) {
 92 |     console.error("❌ PUT PO Error:", error);
 93 |     return Response.json({ error: error.message }, { status: 500 });
 94 |   }
 95 | }
 96 | 
 97 | // ✅ DELETE - Remove PO (with items)
 98 | export async function DELETE(request, { params }) {
 99 |   try {
100 |     await db.query("DELETE FROM purchase_order_items WHERE po_id = ?", [params.id]);
101 |     await db.query("DELETE FROM purchase_orders WHERE id = ?", [params.id]);
102 | 
103 |     return Response.json({ message: "Purchase Order deleted successfully" });
104 |   } catch (error) {
105 |     console.error("❌ DELETE PO Error:", error);
106 |     return Response.json({ error: error.message }, { status: 500 });
107 |   }
108 | }
109 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/purchase-orders/[id]/status/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ PUT - Update PO Status
 4 | export async function PUT(request, { params }) {
 5 |   try {
 6 |     const body = await request.json();
 7 |     const { status } = body;
 8 | 
 9 |     await db.query(
10 |       "UPDATE purchase_orders SET status = ?, updated_at = NOW() WHERE id = ?",
11 |       [status, params.id]
12 |     );
13 | 
14 |     return Response.json({ message: "Status updated successfully" });
15 |   } catch (error) {
16 |     console.error("❌ Update Status Error:", error);
17 |     return Response.json({ error: error.message }, { status: 500 });
18 |   }
19 | }
20 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/purchase-orders/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // ✅ GET - All Purchase Orders
  4 | export async function GET() {
  5 |   try {
  6 |     const [rows] = await db.query(
  7 |       `SELECT po.*, s.supplier_name, w.warehouse_name
  8 |        FROM purchase_orders po
  9 |        JOIN suppliers s ON po.supplier_id = s.id
 10 |        JOIN warehouses w ON po.warehouse_id = w.id
 11 |        ORDER BY po.created_at DESC`
 12 |     );
 13 | 
 14 |     // Cast numeric fields to numbers
 15 |     const orders = rows.map((po) => ({
 16 |       ...po,
 17 |       subtotal: parseFloat(po.subtotal) || 0,
 18 |       discount_amount: parseFloat(po.discount_amount) || 0,
 19 |       tax_amount: parseFloat(po.tax_amount) || 0,
 20 |       total_amount: parseFloat(po.total_amount) || 0,
 21 |     }));
 22 | 
 23 |     return Response.json(orders);
 24 |   } catch (error) {
 25 |     console.error("❌ GET Orders Error:", error);
 26 |     return Response.json({ error: error.message }, { status: 500 });
 27 |   }
 28 | }
 29 | 
 30 | // ✅ POST - Create Purchase Order
 31 | export async function POST(request) {
 32 |   try {
 33 |     const body = await request.json();
 34 |     const {
 35 |       supplier_id,
 36 |       warehouse_id,
 37 |       po_date,
 38 |       expected_delivery_date,
 39 |       terms_and_conditions,
 40 |       remarks,
 41 |       status,
 42 |       subtotal,
 43 |       discount_amount,
 44 |       tax_amount,
 45 |       total_amount,
 46 |       items = [],
 47 |     } = body;
 48 | 
 49 |     // 🔹 Generate PO Number
 50 |     const [last] = await db.query(
 51 |       "SELECT po_number FROM purchase_orders ORDER BY id DESC LIMIT 1"
 52 |     );
 53 | 
 54 |     let newNumber = "PO001";
 55 |     if (last.length > 0 && last[0].po_number) {
 56 |       const num = parseInt(last[0].po_number.replace("PO", "")) + 1;
 57 |       newNumber = "PO" + num.toString().padStart(3, "0");
 58 |     }
 59 | 
 60 |     // 🔹 Insert Purchase Order
 61 |     const [result] = await db.query(
 62 |       `INSERT INTO purchase_orders 
 63 |        (po_number, supplier_id, warehouse_id, po_date, expected_delivery_date, terms_and_conditions, remarks, status, subtotal, discount_amount, tax_amount, total_amount, created_at, updated_at) 
 64 |        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
 65 |       [
 66 |         newNumber,
 67 |         supplier_id,
 68 |         warehouse_id,
 69 |         po_date,
 70 |         expected_delivery_date,
 71 |         terms_and_conditions,
 72 |         remarks,
 73 |         status,
 74 |         subtotal,
 75 |         discount_amount,
 76 |         tax_amount,
 77 |         total_amount,
 78 |       ]
 79 |     );
 80 | 
 81 |     const poId = result.insertId;
 82 | 
 83 |     // 🔹 Insert Items
 84 |     for (const item of items) {
 85 |       await db.query(
 86 |         `INSERT INTO purchase_order_items 
 87 |          (po_id, item_id, ordered_qty, unit_price, discount_percent, tax_percent, remarks, created_at) 
 88 |          VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
 89 |         [
 90 |           poId,
 91 |           item.item_id,
 92 |           item.ordered_qty,
 93 |           item.unit_price,
 94 |           item.discount_percent,
 95 |           item.tax_percent,
 96 |           item.remarks,
 97 |         ]
 98 |       );
 99 |     }
100 | 
101 |     return Response.json({
102 |       message: "Purchase Order created successfully",
103 |       id: poId,
104 |       po_number: newNumber,
105 |     });
106 |   } catch (error) {
107 |     console.error("❌ POST PO Error:", error);
108 |     return Response.json({ error: error.message }, { status: 500 });
109 |   }
110 | }
111 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/quality-checks/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // =========================
 4 | // ✅ GET - QC List with items_count
 5 | // =========================
 6 | export async function GET() {
 7 |   try {
 8 |     const [rows] = await db.query(`
 9 |       SELECT 
10 |         qc.id, qc.qc_number, qc.qc_date, qc.inspector, qc.status, qc.remarks,
11 |         COUNT(qci.id) AS items_count
12 |       FROM quality_checks qc
13 |       LEFT JOIN quality_check_items qci ON qc.id = qci.qc_id
14 |       GROUP BY qc.id
15 |       ORDER BY qc.id DESC
16 |     `);
17 | 
18 |     return Response.json(rows);
19 |   } catch (error) {
20 |     console.error("❌ QC GET Error:", error);
21 |     return Response.json({ error: error.message }, { status: 500 });
22 |   }
23 | }
24 | 
25 | // =========================
26 | // ✅ POST - Create QC (header + items)
27 | // =========================
28 | export async function POST(request) {
29 |   try {
30 |     const body = await request.json();
31 |     const { qc_number, qc_date, reference_type, inspector, remarks, status, items } = body;
32 | 
33 |     // 1️⃣ Validation
34 |     if (
35 |       !qc_number ||
36 |       !qc_date ||
37 |       !reference_type ||
38 |       !inspector ||
39 |       !status ||
40 |       !Array.isArray(items) ||
41 |       items.length === 0
42 |     ) {
43 |       return Response.json({ error: "❌ All fields are required" }, { status: 400 });
44 |     }
45 | 
46 |     // 2️⃣ Insert QC Header (quality_checks table)
47 |     const [result] = await db.query(
48 |       `INSERT INTO quality_checks (qc_number, qc_date, receipt_id, item_id, checked_qty, status, remarks, created_at, inspector)
49 |        VALUES (?, ?, NULL, NULL, 0, ?, ?, NOW(), ?)`,
50 |       [qc_number, qc_date, status, remarks || null, inspector]
51 |     );
52 | 
53 |     const qc_id = result.insertId;
54 | 
55 |     // 3️⃣ Insert QC Items (quality_check_items table)
56 |     for (const item of items) {
57 |       if (!item.item_id || !item.qty) continue;
58 | 
59 |       await db.query(
60 |         `INSERT INTO quality_check_items (qc_id, item_id, qty, result, remarks)
61 |          VALUES (?, ?, ?, ?, ?)`,
62 |         [qc_id, item.item_id, item.qty, item.result || "pending", item.remarks || null]
63 |       );
64 |     }
65 | 
66 |     return Response.json({
67 |       message: "✅ QC created successfully",
68 |       qc_id,
69 |       qc_number,
70 |     });
71 |   } catch (error) {
72 |     console.error("❌ QC POST Error:", error);
73 |     return Response.json({ error: error.message }, { status: 500 });
74 |   }
75 | }
76 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/stock-adjustments/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // ✅ GET - List Stock Adjustments
  5 | // =========================
  6 | export async function GET() {
  7 |   try {
  8 |     const [rows] = await db.query(`
  9 |       SELECT sa.*, i.item_name, i.item_code, w.warehouse_name
 10 |       FROM stock_adjustments sa
 11 |       JOIN items i ON sa.item_id = i.id
 12 |       JOIN warehouses w ON sa.warehouse_id = w.id
 13 |       ORDER BY sa.id DESC
 14 |     `);
 15 | 
 16 |     return Response.json(rows);
 17 |   } catch (error) {
 18 |     console.error("❌ Stock Adjustment GET Error:", error);
 19 |     return Response.json({ error: error.message }, { status: 500 });
 20 |   }
 21 | }
 22 | 
 23 | // =========================
 24 | // ✅ POST - Create Stock Adjustment
 25 | // =========================
 26 | export async function POST(request) {
 27 |   try {
 28 |     const body = await request.json();
 29 |     const { warehouse_id, item_id, adjustment_type, qty, reason } = body;
 30 | 
 31 |     if (!warehouse_id || !item_id || !adjustment_type || !qty) {
 32 |       return Response.json({ error: "❌ All fields are required." }, { status: 400 });
 33 |     }
 34 | 
 35 |     // 🔹 Auto Number Generate
 36 |     const [last] = await db.query(
 37 |       `SELECT adjustment_number FROM stock_adjustments ORDER BY id DESC LIMIT 1`
 38 |     );
 39 |     let nextNumber = "ADJ-0001";
 40 |     if (last.length > 0 && last[0].adjustment_number) {
 41 |       const lastNum = parseInt(last[0].adjustment_number.replace("ADJ-", "")) || 0;
 42 |       nextNumber = "ADJ-" + String(lastNum + 1).padStart(4, "0");
 43 |     }
 44 | 
 45 |     // 🔹 Insert Adjustment
 46 |     const [result] = await db.query(
 47 |       `INSERT INTO stock_adjustments 
 48 |        (adjustment_number, warehouse_id, item_id, adjustment_type, qty, reason) 
 49 |        VALUES (?, ?, ?, ?, ?, ?)`,
 50 | 
 51 |       [nextNumber, warehouse_id, item_id, adjustment_type, qty, reason || null]
 52 |     );
 53 | 
 54 |     const adjustment_id = result.insertId;
 55 | 
 56 |     // 🔹 Last Balance निकालो
 57 |     const [lastBalance] = await db.query(
 58 |       `SELECT balance_qty FROM stock_ledger 
 59 |        WHERE item_id=? AND warehouse_id=? 
 60 |        ORDER BY id DESC LIMIT 1`,
 61 |       [item_id, warehouse_id]
 62 |     );
 63 |     const prevBalance = lastBalance.length ? Number(lastBalance[0].balance_qty) : 0;
 64 | 
 65 |     // 🔹 New Balance
 66 |     const newBalance =
 67 |       adjustment_type === "IN"
 68 |         ? prevBalance + Number(qty)
 69 |         : prevBalance - Number(qty);
 70 | 
 71 |     // 🔹 Insert Stock Ledger
 72 |     await db.query(
 73 |       `INSERT INTO stock_ledger 
 74 |        (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, remarks, created_at) 
 75 |        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
 76 |       [
 77 |         item_id,
 78 |         warehouse_id,
 79 |         null, // location_id
 80 |         adjustment_type,
 81 |         "Adjustment",
 82 |         adjustment_id,
 83 |         nextNumber,
 84 |         Date.now(),
 85 |         qty,
 86 |         newBalance,
 87 |         reason || "Stock Adjustment",
 88 |       ]
 89 |     );
 90 | 
 91 |     return Response.json({
 92 |       message: "✅ Stock Adjustment created successfully",
 93 |       adjustment_id,
 94 |       adjustment_number: nextNumber,
 95 |     });
 96 |   } catch (error) {
 97 |     console.error("❌ Stock Adjustment POST Error:", error);
 98 |     return Response.json({ error: error.message }, { status: 500 });
 99 |   }
100 | }
101 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/stock-ledger/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Stock Ledger (with filters)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const transaction_type = searchParams.get("transaction_type");
 8 |     const search = searchParams.get("search");
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         sl.id,
13 |         sl.created_at AS transaction_date,   -- तुमने transaction_date column नहीं रखा, इसलिए created_at इस्तेमाल किया
14 |         sl.transaction_type,
15 |         sl.reference_type,
16 |         sl.reference_id,
17 |         sl.transaction_ref,
18 |         sl.transaction_id,
19 |         sl.qty,
20 |         sl.balance_qty,
21 |         sl.remarks,
22 |         i.item_code,
23 |         i.item_name,
24 |         w.warehouse_name,
25 |         l.location_name,
26 |         CASE WHEN sl.transaction_type = 'IN' THEN sl.qty ELSE 0 END AS in_qty,
27 |         CASE WHEN sl.transaction_type = 'OUT' THEN sl.qty ELSE 0 END AS out_qty
28 |       FROM stock_ledger sl
29 |       JOIN items i ON sl.item_id = i.id
30 |       JOIN warehouses w ON sl.warehouse_id = w.id
31 |       LEFT JOIN locations l ON sl.location_id = l.id
32 |       WHERE 1=1
33 |     `;
34 |     const params = [];
35 | 
36 |     // Filter by transaction_type
37 |     if (transaction_type) {
38 |       query += ` AND sl.transaction_type = ?`;
39 |       params.push(transaction_type);
40 |     }
41 | 
42 |     // Search filter
43 |     if (search) {
44 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ? OR l.location_name LIKE ?)`;
45 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
46 |     }
47 | 
48 |     query += ` ORDER BY sl.created_at DESC, sl.id DESC`;
49 | 
50 |     const [rows] = await db.query(query, params);
51 |     return Response.json(rows);
52 |   } catch (error) {
53 |     console.error("❌ GET Stock Ledger Error:", error);
54 |     return Response.json({ error: error.message }, { status: 500 });
55 |   }
56 | }
57 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/stock/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Stock Ledger (with filters)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const transaction_type = searchParams.get("transaction_type");
 8 |     const search = searchParams.get("search");
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         sl.id,
13 |         sl.transaction_date,
14 |         sl.transaction_type,
15 |         sl.reference_type,
16 |         sl.reference_id,
17 |         sl.remarks,
18 |         i.item_code,
19 |         i.item_name,
20 |         l.location_name,
21 |         w.warehouse_name,
22 |         CASE WHEN sl.transaction_type IN ('purchase','adjustment','production') THEN sl.qty ELSE 0 END AS in_qty,
23 |         CASE WHEN sl.transaction_type = 'sale' THEN sl.qty ELSE 0 END AS out_qty
24 |       FROM stock_ledger sl
25 |       JOIN items i ON sl.item_id = i.id
26 |       JOIN warehouses w ON sl.warehouse_id = w.id
27 |       LEFT JOIN locations l ON sl.location_id = l.id
28 |       WHERE 1=1
29 |     `;
30 |     const params = [];
31 | 
32 |     // 🔹 Filter by transaction_type
33 |     if (transaction_type) {
34 |       query += ` AND sl.transaction_type = ?`;
35 |       params.push(transaction_type);
36 |     }
37 | 
38 |     // 🔹 Search filter
39 |     if (search) {
40 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ? OR l.location_name LIKE ?)`;
41 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
42 |     }
43 | 
44 |     query += ` ORDER BY sl.transaction_date DESC, sl.id DESC`;
45 | 
46 |     const [rows] = await db.query(query, params);
47 |     return Response.json(rows);
48 |   } catch (error) {
49 |     console.error("❌ GET Stock Ledger Error:", error);
50 |     return Response.json({ error: error.message }, { status: 500 });
51 |   }
52 | }
53 |     


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/suppliers/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET one supplier
 4 | export async function GET(req, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM suppliers WHERE id = ?", [
 7 |       params.id,
 8 |     ]);
 9 | 
10 |     if (rows.length === 0) {
11 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
12 |     }
13 | 
14 |     return Response.json(rows[0]);
15 |   } catch (error) {
16 |     return Response.json({ error: error.message }, { status: 500 });
17 |   }
18 | }
19 | 
20 | // ✅ UPDATE supplier
21 | export async function PUT(req, { params }) {
22 |   try {
23 |     const body = await req.json();
24 | 
25 |     const [result] = await db.query(
26 |       `UPDATE suppliers SET 
27 |         supplier_name=?, contact_person=?, email=?, phone=?, address=?, 
28 |         city=?, state=?, pincode=?, country=?, gst_number=?, pan_number=?, 
29 |         payment_terms=?, credit_limit=?, status=? 
30 |       WHERE id=?`,
31 |       [
32 |         body.supplier_name,
33 |         body.contact_person,
34 |         body.email,
35 |         body.phone,
36 |         body.address,
37 |         body.city,
38 |         body.state,
39 |         body.pincode,
40 |         body.country,
41 |         body.gst_number,
42 |         body.pan_number,
43 |         body.payment_terms,
44 |         body.credit_limit,
45 |         body.status,
46 |         params.id,
47 |       ]
48 |     );
49 | 
50 |     if (result.affectedRows === 0) {
51 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
52 |     }
53 | 
54 |     return Response.json({ message: "Supplier updated successfully" });
55 |   } catch (error) {
56 |     return Response.json({ error: error.message }, { status: 500 });
57 |   }
58 | }
59 | 
60 | // ✅ DELETE supplier
61 | export async function DELETE(req, { params }) {
62 |   try {
63 |     const [result] = await db.query("DELETE FROM suppliers WHERE id = ?", [
64 |       params.id,
65 |     ]);
66 | 
67 |     if (result.affectedRows === 0) {
68 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
69 |     }
70 | 
71 |     return Response.json({ message: "Supplier deleted successfully" });
72 |   } catch (error) {
73 |     return Response.json({ error: error.message }, { status: 500 });
74 |   }
75 | }
76 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/suppliers/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET all suppliers
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       "SELECT * FROM suppliers ORDER BY created_at DESC"
 8 |     );
 9 |     return Response.json(rows);
10 |   } catch (error) {
11 |     return Response.json({ error: error.message }, { status: 500 });
12 |   }
13 | }
14 | 
15 | // ✅ POST - create new supplier
16 | export async function POST(request) {
17 |   try {
18 |     const body = await request.json();
19 |     const {
20 |       supplier_name,
21 |       contact_person,
22 |       email,
23 |       phone,
24 |       address,
25 |       city,
26 |       state,
27 |       pincode,
28 |       country = "India",
29 |       gst_number,
30 |       pan_number,
31 |       payment_terms,
32 |       credit_limit = 0,
33 |       status = "active",
34 |     } = body;
35 | 
36 |     // 🔹 Auto-generate supplier_code
37 |     const [last] = await db.query(
38 |       "SELECT supplier_code FROM suppliers ORDER BY id DESC LIMIT 1"
39 |     );
40 | 
41 |     let newCode = "SUP001";
42 |     if (last.length > 0) {
43 |       const lastCode = last[0].supplier_code; // e.g. "SUP005"
44 |       const num = parseInt(lastCode.replace("SUP", "")) + 1;
45 |       newCode = "SUP" + num.toString().padStart(3, "0");
46 |     }
47 | 
48 |     // 🔹 Insert into DB
49 |     const [result] = await db.query(
50 |       `INSERT INTO suppliers 
51 |       (supplier_code, supplier_name, contact_person, email, phone, address, city, state, pincode, country, gst_number, pan_number, payment_terms, credit_limit, status)
52 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
53 |       [
54 |         newCode,
55 |         supplier_name,
56 |         contact_person,
57 |         email,
58 |         phone,
59 |         address,
60 |         city,
61 |         state,
62 |         pincode,
63 |         country,
64 |         gst_number,
65 |         pan_number,
66 |         payment_terms,
67 |         credit_limit,
68 |         status,
69 |       ]
70 |     );
71 | 
72 |     return Response.json({
73 |       id: result.insertId,
74 |       supplier_code: newCode,
75 |       ...body,
76 |     });
77 |   } catch (error) {
78 |     return Response.json({ error: error.message }, { status: 500 });
79 |   }
80 | }
81 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/warehouses/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET one warehouse
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM warehouses WHERE id = ?", [params.id]);
 7 |     if (rows.length === 0) {
 8 |       return Response.json({ error: "Warehouse not found" }, { status: 404 });
 9 |     }
10 |     return Response.json(rows[0]);
11 |   } catch (error) {
12 |     return Response.json({ error: error.message }, { status: 500 });
13 |   }
14 | }
15 | 
16 | // ✅ PUT - Update warehouse
17 | export async function PUT(request, { params }) {
18 |   try {
19 |     const body = await request.json();
20 |     const {
21 |       warehouse_name,
22 |       warehouse_code,
23 |       description,
24 |       address,
25 |       city,
26 |       state,
27 |       country = "India",
28 |       pincode,
29 |       contact_person,
30 |       phone,
31 |       email,
32 |       status = "active",
33 |     } = body;
34 | 
35 |     await db.query(
36 |       `UPDATE warehouses SET 
37 |       warehouse_name=?, warehouse_code=?, description=?, address=?, city=?, state=?, country=?, pincode=?, contact_person=?, phone=?, email=?, status=? 
38 |       WHERE id=?`,
39 |       [
40 |         warehouse_name,
41 |         warehouse_code,
42 |         description,
43 |         address,
44 |         city,
45 |         state,
46 |         country,
47 |         pincode,
48 |         contact_person,
49 |         phone,
50 |         email,
51 |         status,
52 |         params.id,
53 |       ]
54 |     );
55 | 
56 |     return Response.json({ message: "Warehouse updated successfully" });
57 |   } catch (error) {
58 |     return Response.json({ error: error.message }, { status: 500 });
59 |   }
60 | }
61 | 
62 | // ✅ DELETE - Remove warehouse
63 | export async function DELETE(request, { params }) {
64 |   try {
65 |     await db.query("DELETE FROM warehouses WHERE id = ?", [params.id]);
66 |     return Response.json({ message: "Warehouse deleted successfully" });
67 |   } catch (error) {
68 |     return Response.json({ error: error.message }, { status: 500 });
69 |   }
70 | }
71 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/api/warehouses/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | export async function GET() {
 4 |   try {
 5 |     const [rows] = await db.query("SELECT * FROM warehouses ORDER BY created_at DESC");
 6 |     return Response.json(rows);
 7 |   } catch (error) {
 8 |     console.error("GET Warehouses Error:", error); // debugging
 9 |     return Response.json(
10 |       { error: error?.message || "Internal Server Error" },
11 |       { status: 500 }
12 |     );
13 |   }
14 | }
15 | 
16 | export async function POST(request) {
17 |   try {
18 |     const body = await request.json();
19 |     const {
20 |       warehouse_name,
21 |       warehouse_code,
22 |       description,
23 |       address,
24 |       city,
25 |       state,
26 |       country = "India",
27 |       pincode,
28 |       contact_person,
29 |       phone,
30 |       email,
31 |       status = "active",
32 |     } = body;
33 | 
34 |     if (!warehouse_name || !warehouse_code) {
35 |       return Response.json({ error: "Warehouse Name & Code are required" }, { status: 400 });
36 |     }
37 | 
38 |     const [result] = await db.query(
39 |       `INSERT INTO warehouses 
40 |       (warehouse_name, warehouse_code, description, address, city, state, country, pincode, contact_person, phone, email, status)
41 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
42 |       [
43 |         warehouse_name,
44 |         warehouse_code,
45 |         description || "",
46 |         address || "",
47 |         city || "",
48 |         state || "",
49 |         country,
50 |         pincode || "",
51 |         contact_person || "",
52 |         phone || "",
53 |         email || "",
54 |         status,
55 |       ]
56 |     );
57 | 
58 |     return Response.json({ id: result.insertId, ...body });
59 |   } catch (error) {
60 |     console.error("POST Warehouse Error:", error); // debugging
61 |     return Response.json(
62 |       { error: error?.message || "Internal Server Error" },
63 |       { status: 500 }
64 |     );
65 |   }
66 | }
67 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/bom/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useEffect, useState } from "react";
  3 | import { useParams } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | export default function BOMDetailPage() {
  7 |   const { id } = useParams();
  8 |   const [bom, setBom] = useState(null);
  9 |   const [loading, setLoading] = useState(true);
 10 | 
 11 |   // Load BOM detail
 12 |   useEffect(() => {
 13 |     const fetchBom = async () => {
 14 |       try {
 15 |         const res = await fetch(`/api/bom/${id}`);
 16 |         if (res.ok) {
 17 |           setBom(await res.json());
 18 |         }
 19 |       } catch (err) {
 20 |         console.error("Error loading BOM:", err);
 21 |       } finally {
 22 |         setLoading(false);
 23 |       }
 24 |     };
 25 |     if (id) fetchBom();
 26 |   }, [id]);
 27 | 
 28 |   if (loading) return <div className="container py-5">Loading...</div>;
 29 |   if (!bom) return <div className="container py-5">❌ BOM not found</div>;
 30 | 
 31 |   return (
 32 |     <div className="container-fluid">
 33 |       {/* Header */}
 34 |       <div className="row mb-4">
 35 |         <div className="col-12 d-flex justify-content-between align-items-center">
 36 |           <h1 className="h3 mb-0">
 37 |             <i className="bi bi-diagram-3 text-primary"></i> BOM Detail
 38 |           </h1>
 39 |           <Link href="/bom" className="btn btn-outline-secondary">
 40 |             <i className="bi bi-arrow-left me-2"></i> Back to BOMs
 41 |           </Link>
 42 |         </div>
 43 |       </div>
 44 | 
 45 |       {/* BOM Info */}
 46 |       <div className="card border-0 shadow-sm mb-4">
 47 |         <div className="card-header">
 48 |           <h5 className="mb-0">BOM Information</h5>
 49 |         </div>
 50 |         <div className="card-body">
 51 |           <div className="row">
 52 |             <div className="col-md-4 mb-3">
 53 |               <strong>Finished Product:</strong>
 54 |               <p>{bom.product_name} ({bom.product_code})</p>
 55 |             </div>
 56 |             <div className="col-md-2 mb-3">
 57 |               <strong>Version:</strong>
 58 |               <p>{bom.version}</p>
 59 |             </div>
 60 |             <div className="col-md-2 mb-3">
 61 |               <strong>Status:</strong>
 62 |               <p>
 63 |                 <span className={`badge bg-${bom.status === "active" ? "success" : "secondary"}`}>
 64 |                   {bom.status}
 65 |                 </span>
 66 |               </p>
 67 |             </div>
 68 |             <div className="col-md-4 mb-3">
 69 |               <strong>Created At:</strong>
 70 |               <p>{new Date(bom.created_at).toLocaleDateString()}</p>
 71 |             </div>
 72 |           </div>
 73 |         </div>
 74 |       </div>
 75 | 
 76 |       {/* Components Table */}
 77 |       <div className="card border-0 shadow-sm">
 78 |         <div className="card-header">
 79 |           <h5 className="mb-0">Components</h5>
 80 |         </div>
 81 |         <div className="card-body">
 82 |           {bom.components && bom.components.length > 0 ? (
 83 |             <div className="table-responsive">
 84 |               <table className="table table-hover align-middle">
 85 |                 <thead className="table-light">
 86 |                   <tr>
 87 |                     <th>Item Code</th>
 88 |                     <th>Item Name</th>
 89 |                     <th>Quantity</th>
 90 |                   </tr>
 91 |                 </thead>
 92 |                 <tbody>
 93 |                   {bom.components.map((comp) => (
 94 |                     <tr key={comp.id}>
 95 |                       <td>{comp.item_code}</td>
 96 |                       <td>{comp.item_name}</td>
 97 |                       <td>{comp.qty}</td>
 98 |                     </tr>
 99 |                   ))}
100 |                 </tbody>
101 |               </table>
102 |             </div>
103 |           ) : (
104 |             <p className="text-muted">No components found for this BOM</p>
105 |           )}
106 |         </div>
107 |       </div>
108 |     </div>
109 |   );
110 | }
111 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/favicon.ico:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/nitin04032/erp-manufacuring-v1/9e0c462184cf5a8a5f2502b55c588933769b1662/erp-frontend/src/app/favicon.ico


--------------------------------------------------------------------------------
/erp-frontend/src/app/fg-receipt/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | 
  3 | import { useState, useEffect } from "react";
  4 | import Link from "next/link";
  5 | 
  6 | export default function FinishedGoodsReceipt() {
  7 |   const [fgrList, setFgrList] = useState([]);
  8 | 
  9 |   useEffect(() => {
 10 |     fetchFGR();
 11 |   }, []);
 12 | 
 13 |   const fetchFGR = async () => {
 14 |     try {
 15 |       const res = await fetch("/api/fgr");
 16 |       if (!res.ok) throw new Error("Failed to fetch FGR list");
 17 |       const data = await res.json();
 18 |       setFgrList(data);
 19 |     } catch (err) {
 20 |       console.error("Error fetching FGR list:", err);
 21 |     }
 22 |   };
 23 | 
 24 |   return (
 25 |     <div className="container-fluid">
 26 |       {/* Header */}
 27 |       <div className="row mb-4">
 28 |         <div className="col-12 d-flex justify-content-between align-items-center">
 29 |           <h1 className="h3 mb-0">
 30 |             <i className="bi bi-box-arrow-in-down text-primary"></i> Finished
 31 |             Goods Receipt
 32 |           </h1>
 33 |           <Link href="/fg-receipt/create" className="btn btn-primary">
 34 |             <i className="bi bi-plus-circle me-2"></i>Record Receipt
 35 |           </Link>
 36 |         </div>
 37 |       </div>
 38 | 
 39 |       {/* List */}
 40 |       <div className="card border-0 shadow-sm">
 41 |         <div className="card-body">
 42 |           {fgrList.length === 0 ? (
 43 |             <div className="text-center py-5">
 44 |               <i className="bi bi-box-arrow-in-down fs-1 text-muted"></i>
 45 |               <h4 className="mt-3 text-muted">
 46 |                 No Finished Goods Receipts Found
 47 |               </h4>
 48 |               <p className="text-muted">
 49 |                 Record your first finished goods receipt after production
 50 |               </p>
 51 |               <Link href="/fg-receipt/create" className="btn btn-primary">
 52 |                 <i className="bi bi-plus-circle me-2"></i>Record Receipt
 53 |               </Link>
 54 |             </div>
 55 |           ) : (
 56 |             <div className="table-responsive">
 57 |               <table className="table table-hover align-middle">
 58 |                 <thead className="table-light">
 59 |                   <tr>
 60 |                     <th>Receipt No</th>
 61 |                     <th>Production Order</th>
 62 |                     <th>Product</th>
 63 |                     <th>Quantity</th>
 64 |                     <th>Warehouse</th>
 65 |                     <th>Date</th>
 66 |                     <th>Status</th>
 67 |                     <th>Actions</th>
 68 |                   </tr>
 69 |                 </thead>
 70 |                 <tbody>
 71 |                   {fgrList.map((fgr) => (
 72 |                     <tr key={fgr.id}>
 73 |                       <td>
 74 |                         <strong>{fgr.receipt_number}</strong>
 75 |                       </td>
 76 |                       <td>{fgr.production_order_no}</td>
 77 |                       <td>{fgr.item_name}</td>
 78 |                       <td>
 79 |                         {Number(fgr.quantity).toFixed(2)} {fgr.uom}
 80 |                       </td>
 81 |                       <td>{fgr.warehouse_name}</td>
 82 |                       <td>
 83 |                         {new Date(fgr.receipt_date).toLocaleDateString("en-GB", {
 84 |                           day: "2-digit",
 85 |                           month: "short",
 86 |                           year: "numeric",
 87 |                         })}
 88 |                       </td>
 89 |                       <td>
 90 |                         <span
 91 |                           className={`badge bg-${
 92 |                             fgr.status === "confirmed" ? "success" : "secondary"
 93 |                           }`}
 94 |                         >
 95 |                           {fgr.status.charAt(0).toUpperCase() +
 96 |                             fgr.status.slice(1)}
 97 |                         </span>
 98 |                       </td>
 99 |                       <td>
100 |                         <div className="btn-group btn-group-sm">
101 |                           <Link
102 |                             href={`/fg-receipt/${fgr.id}`}
103 |                             className="btn btn-outline-primary"
104 |                             title="View"
105 |                           >
106 |                             <i className="bi bi-eye"></i>
107 |                           </Link>
108 |                           <Link
109 |                             href={`/fg-receipt/${fgr.id}/edit`}
110 |                             className="btn btn-outline-secondary"
111 |                             title="Edit"
112 |                           >
113 |                             <i className="bi bi-pencil"></i>
114 |                           </Link>
115 |                         </div>
116 |                       </td>
117 |                     </tr>
118 |                   ))}
119 |                 </tbody>
120 |               </table>
121 |             </div>
122 |           )}
123 |         </div>
124 |       </div>
125 |     </div>
126 |   );
127 | }
128 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/layout.js:
--------------------------------------------------------------------------------
 1 | import "./globals.css";
 2 | import Script from "next/script";
 3 | import Navbar from "./navbar"; // client navbar component
 4 | 
 5 | export const metadata = {
 6 |   title: "My ERP System",
 7 |   description: "Manufacturing ERP built with Next.js",
 8 | };
 9 | 
10 | export default function RootLayout({ children }) {
11 |   return (
12 |     <html lang="en">
13 |       <head>
14 |         {/* Bootstrap 5 CSS */}
15 |         <link
16 |           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
17 |           rel="stylesheet"
18 |         />
19 | 
20 |         {/* Bootstrap Icons */}
21 |         <link
22 |           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
23 |           rel="stylesheet"
24 |         />
25 | 
26 |         {/* Google Fonts */}
27 |         <link
28 |           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
29 |           rel="stylesheet"
30 |         />
31 | 
32 |         {/* Custom CSS */}
33 |         <link href="/assets/css/app.css" rel="stylesheet" />
34 |       </head>
35 |       <body>
36 |         {/* Navbar */}
37 |         <Navbar />
38 | 
39 |         {/* Main Content */}
40 |         <main className="container-fluid mt-4">{children}</main>
41 | 
42 |         {/* Footer */}
43 |         <footer className="bg-light mt-5 py-3 border-top">
44 |           <div className="container text-center small text-muted">
45 |             &copy; {new Date().getFullYear()} My ERP System — Version 1.0.0
46 |           </div>
47 |         </footer>
48 | 
49 |         {/* ✅ Bootstrap JS Bundle (with Popper) */}
50 |         <Script
51 |           src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
52 |           strategy="afterInteractive"
53 |         />
54 | 
55 |         {/* GSAP */}
56 |         <Script
57 |           src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
58 |           strategy="afterInteractive"
59 |         />
60 | 
61 |         {/* Custom JS */}
62 |         <Script src="/assets/js/app.js" strategy="afterInteractive" />
63 |       </body>
64 |     </html>
65 |   );
66 | }
67 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/material-requisition/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useEffect, useState } from "react";
  3 | import { useParams } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | function formatDate(d) {
  7 |   return new Date(d).toLocaleDateString("en-GB");
  8 | }
  9 | 
 10 | export default function RequisitionDetail() {
 11 |   const { id } = useParams();
 12 |   const [requisition, setRequisition] = useState(null);
 13 |   const [loading, setLoading] = useState(true);
 14 | 
 15 |   useEffect(() => {
 16 |     setLoading(true);
 17 |     fetch(`/api/material-requisition/${id}`)
 18 |       .then(async (r) => {
 19 |         if (r.ok) setRequisition(await r.json());
 20 |       })
 21 |       .catch(console.error)
 22 |       .finally(() => setLoading(false));
 23 |   }, [id]);
 24 | 
 25 |   if (loading) return <div className="container py-5">Loading...</div>;
 26 |   if (!requisition) return <div className="container py-5">Not found</div>;
 27 | 
 28 |   return (
 29 |     <div className="container-fluid">
 30 |       <div className="d-flex justify-content-between align-items-center mb-4">
 31 |         <h1 className="h3">
 32 |           <i className="bi bi-clipboard-data text-primary"></i> Requisition{" "}
 33 |           {requisition.requisition_no}
 34 |         </h1>
 35 |         <div>
 36 |           <Link
 37 |             href="/material-requisition"
 38 |             className="btn btn-outline-secondary me-2"
 39 |           >
 40 |             Back
 41 |           </Link>
 42 |           {requisition.status === "draft" && (
 43 |             <Link
 44 |               href={`/material-requisition/${id}/edit`}
 45 |               className="btn btn-primary"
 46 |             >
 47 |               Edit
 48 |             </Link>
 49 |           )}
 50 |         </div>
 51 |       </div>
 52 | 
 53 |       <div className="card mb-3">
 54 |         <div className="card-body">
 55 |           <p>
 56 |             <strong>Requested By:</strong>{" "}
 57 |             {requisition.requested_by_name || requisition.requested_by}
 58 |           </p>
 59 |           <p>
 60 |             <strong>Production Order:</strong>{" "}
 61 |             {requisition.production_order_no || "-"}
 62 |           </p>
 63 |           <p>
 64 |             <strong>Date:</strong> {formatDate(requisition.requisition_date)}
 65 |           </p>
 66 |           <p>
 67 |             <strong>Status:</strong>{" "}
 68 |             <span
 69 |               className={`badge bg-${
 70 |                 requisition.status === "draft"
 71 |                   ? "secondary"
 72 |                   : requisition.status === "submitted"
 73 |                   ? "info"
 74 |                   : requisition.status === "approved"
 75 |                   ? "success"
 76 |                   : "danger"
 77 |               }`}
 78 |             >
 79 |               {requisition.status}
 80 |             </span>
 81 |           </p>
 82 |           <p>
 83 |             <strong>Remarks:</strong> {requisition.remarks || "-"}
 84 |           </p>
 85 |         </div>
 86 |       </div>
 87 | 
 88 |       <div className="card">
 89 |         <div className="card-header">Items</div>
 90 |         <div className="card-body">
 91 |           {requisition.items?.length > 0 ? (
 92 |             <table className="table">
 93 |               <thead>
 94 |                 <tr>
 95 |                   <th>Code</th>
 96 |                   <th>Name</th>
 97 |                   <th>Required Qty</th>
 98 |                   <th>Issued Qty</th>
 99 |                   <th>UOM</th>
100 |                 </tr>
101 |               </thead>
102 |               <tbody>
103 |                 {requisition.items.map((it, i) => (
104 |                   <tr key={it.id || i}>
105 |                     <td>{it.item_code}</td>
106 |                     <td>{it.item_name}</td>
107 |                     <td>{Number(it.qty).toFixed(3)}</td>
108 |                     <td>{Number(it.issued_qty || 0).toFixed(3)}</td>
109 |                     <td>{it.uom || "-"}</td>
110 |                   </tr>
111 |                 ))}
112 |               </tbody>
113 |             </table>
114 |           ) : (
115 |             <p>No items</p>
116 |           )}
117 |         </div>
118 |       </div>
119 |     </div>
120 |   );
121 | }
122 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/page.module.css:
--------------------------------------------------------------------------------
  1 | .page {
  2 |   --gray-rgb: 0, 0, 0;
  3 |   --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  4 |   --gray-alpha-100: rgba(var(--gray-rgb), 0.05);
  5 | 
  6 |   --button-primary-hover: #383838;
  7 |   --button-secondary-hover: #f2f2f2;
  8 | 
  9 |   display: grid;
 10 |   grid-template-rows: 20px 1fr 20px;
 11 |   align-items: center;
 12 |   justify-items: center;
 13 |   min-height: 100svh;
 14 |   padding: 80px;
 15 |   gap: 64px;
 16 |   font-family: var(--font-geist-sans);
 17 | }
 18 | 
 19 | @media (prefers-color-scheme: dark) {
 20 |   .page {
 21 |     --gray-rgb: 255, 255, 255;
 22 |     --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
 23 |     --gray-alpha-100: rgba(var(--gray-rgb), 0.06);
 24 | 
 25 |     --button-primary-hover: #ccc;
 26 |     --button-secondary-hover: #1a1a1a;
 27 |   }
 28 | }
 29 | 
 30 | .main {
 31 |   display: flex;
 32 |   flex-direction: column;
 33 |   gap: 32px;
 34 |   grid-row-start: 2;
 35 | }
 36 | 
 37 | .main ol {
 38 |   font-family: var(--font-geist-mono);
 39 |   padding-left: 0;
 40 |   margin: 0;
 41 |   font-size: 14px;
 42 |   line-height: 24px;
 43 |   letter-spacing: -0.01em;
 44 |   list-style-position: inside;
 45 | }
 46 | 
 47 | .main li:not(:last-of-type) {
 48 |   margin-bottom: 8px;
 49 | }
 50 | 
 51 | .main code {
 52 |   font-family: inherit;
 53 |   background: var(--gray-alpha-100);
 54 |   padding: 2px 4px;
 55 |   border-radius: 4px;
 56 |   font-weight: 600;
 57 | }
 58 | 
 59 | .ctas {
 60 |   display: flex;
 61 |   gap: 16px;
 62 | }
 63 | 
 64 | .ctas a {
 65 |   appearance: none;
 66 |   border-radius: 128px;
 67 |   height: 48px;
 68 |   padding: 0 20px;
 69 |   border: 1px solid transparent;
 70 |   transition:
 71 |     background 0.2s,
 72 |     color 0.2s,
 73 |     border-color 0.2s;
 74 |   cursor: pointer;
 75 |   display: flex;
 76 |   align-items: center;
 77 |   justify-content: center;
 78 |   font-size: 16px;
 79 |   line-height: 20px;
 80 |   font-weight: 500;
 81 | }
 82 | 
 83 | a.primary {
 84 |   background: var(--foreground);
 85 |   color: var(--background);
 86 |   gap: 8px;
 87 | }
 88 | 
 89 | a.secondary {
 90 |   border-color: var(--gray-alpha-200);
 91 |   min-width: 158px;
 92 | }
 93 | 
 94 | .footer {
 95 |   grid-row-start: 3;
 96 |   display: flex;
 97 |   gap: 24px;
 98 | }
 99 | 
100 | .footer a {
101 |   display: flex;
102 |   align-items: center;
103 |   gap: 8px;
104 | }
105 | 
106 | .footer img {
107 |   flex-shrink: 0;
108 | }
109 | 
110 | /* Enable hover only on non-touch devices */
111 | @media (hover: hover) and (pointer: fine) {
112 |   a.primary:hover {
113 |     background: var(--button-primary-hover);
114 |     border-color: transparent;
115 |   }
116 | 
117 |   a.secondary:hover {
118 |     background: var(--button-secondary-hover);
119 |     border-color: transparent;
120 |   }
121 | 
122 |   .footer a:hover {
123 |     text-decoration: underline;
124 |     text-underline-offset: 4px;
125 |   }
126 | }
127 | 
128 | @media (max-width: 600px) {
129 |   .page {
130 |     padding: 32px;
131 |     padding-bottom: 80px;
132 |   }
133 | 
134 |   .main {
135 |     align-items: center;
136 |   }
137 | 
138 |   .main ol {
139 |     text-align: center;
140 |   }
141 | 
142 |   .ctas {
143 |     flex-direction: column;
144 |   }
145 | 
146 |   .ctas a {
147 |     font-size: 14px;
148 |     height: 40px;
149 |     padding: 0 16px;
150 |   }
151 | 
152 |   a.secondary {
153 |     min-width: auto;
154 |   }
155 | 
156 |   .footer {
157 |     flex-wrap: wrap;
158 |     align-items: center;
159 |     justify-content: center;
160 |   }
161 | }
162 | 
163 | @media (prefers-color-scheme: dark) {
164 |   .logo {
165 |     filter: invert();
166 |   }
167 | }
168 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/production-orders/[id]/page.js:
--------------------------------------------------------------------------------
 1 | "use client";
 2 | import { useEffect, useState } from "react";
 3 | import { useParams } from "next/navigation";
 4 | import Link from "next/link";
 5 | 
 6 | export default function ProductionOrderDetail() {
 7 |   const { id } = useParams();
 8 |   const [order, setOrder] = useState(null);
 9 |   const [loading, setLoading] = useState(true);
10 | 
11 |   useEffect(() => {
12 |     if (id) {
13 |       fetch(`/api/production-orders/${id}`)
14 |         .then((res) => res.json())
15 |         .then((data) => {
16 |           setOrder(data);
17 |           setLoading(false);
18 |         })
19 |         .catch(() => setLoading(false));
20 |     }
21 |   }, [id]);
22 | 
23 |   if (loading) return <div className="container py-5">Loading...</div>;
24 |   if (!order) return <div className="container py-5">❌ Order not found</div>;
25 | 
26 |   return (
27 |     <div className="container-fluid">
28 |       <div className="d-flex justify-content-between align-items-center mb-4">
29 |         <h1 className="h3">
30 |           <i className="bi bi-gear text-primary"></i> Production Order Detail
31 |         </h1>
32 |         <Link href="/production-orders" className="btn btn-outline-secondary">
33 |           <i className="bi bi-arrow-left me-2"></i>Back
34 |         </Link>
35 |       </div>
36 | 
37 |       {/* Order Info */}
38 |       <div className="card border-0 shadow-sm mb-4">
39 |         <div className="card-body">
40 |           <p><strong>Order No:</strong> {order.order_number}</p>
41 |           <p><strong>Product:</strong> {order.fg_name} ({order.fg_code})</p>
42 |           <p><strong>BOM Version:</strong> {order.bom_version}</p>
43 |           <p><strong>Quantity:</strong> {order.order_qty}</p>
44 |           <p><strong>Status:</strong> {order.status}</p>
45 |           <p><strong>Remarks:</strong> {order.remarks || "-"}</p>
46 |         </div>
47 |       </div>
48 | 
49 |       {/* Components */}
50 |       <div className="card border-0 shadow-sm">
51 |         <div className="card-header">Components</div>
52 |         <div className="card-body">
53 |           {order.components?.length > 0 ? (
54 |             <table className="table table-hover">
55 |               <thead>
56 |                 <tr>
57 |                   <th>Item Code</th>
58 |                   <th>Item Name</th>
59 |                   <th>Planned Qty</th>
60 |                   <th>Issued Qty</th>
61 |                 </tr>
62 |               </thead>
63 |               <tbody>
64 |                 {order.components.map((c, i) => (
65 |                   <tr key={c.id || i}>
66 |                     <td>{c.item_code}</td>
67 |                     <td>{c.item_name}</td>
68 |                     <td>{c.planned_qty}</td>
69 |                     <td>{c.issued_qty}</td>
70 |                   </tr>
71 |                 ))}
72 |               </tbody>
73 |             </table>
74 |           ) : (
75 |             <p>No components</p>
76 |           )}
77 |         </div>
78 |       </div>
79 |     </div>
80 |   );
81 | }
82 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/purchase-orders/[id]/complete/page.jsx:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useState, useEffect } from "react";
  3 | import { useParams, useRouter } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | export default function CompleteProductionOrder() {
  7 |   const { id } = useParams();
  8 |   const router = useRouter();
  9 | 
 10 |   const [order, setOrder] = useState(null);
 11 |   const [producedQty, setProducedQty] = useState("");
 12 |   const [flash, setFlash] = useState(null);
 13 |   const [saving, setSaving] = useState(false);
 14 | 
 15 |   // 🔹 Fetch Order
 16 |   useEffect(() => {
 17 |     fetch(`/api/production-orders/${id}`)
 18 |       .then((res) => res.json())
 19 |       .then((data) => setOrder(data))
 20 |       .catch(() => setFlash({ type: "danger", msg: "Failed to load order" }));
 21 |   }, [id]);
 22 | 
 23 |   // 🔹 Submit Completion
 24 |   async function handleComplete(e) {
 25 |     e.preventDefault();
 26 |     setFlash(null);
 27 | 
 28 |     if (!producedQty || isNaN(producedQty) || Number(producedQty) <= 0) {
 29 |       setFlash({ type: "danger", msg: "Please enter valid Produced Quantity" });
 30 |       return;
 31 |     }
 32 | 
 33 |     setSaving(true);
 34 |     try {
 35 |       const res = await fetch(`/api/production-completion`, {
 36 |         method: "POST",
 37 |         headers: { "Content-Type": "application/json" },
 38 |         body: JSON.stringify({
 39 |           production_order_id: id,
 40 |           produced_qty: Number(producedQty),
 41 |           warehouse_id: order.warehouse_id,
 42 |           remarks: "Completed via UI",
 43 |         }),
 44 |       });
 45 | 
 46 |       const data = await res.json();
 47 |       if (res.ok) {
 48 |         setFlash({ type: "success", msg: data.message });
 49 |         setTimeout(() => router.push(`/production-orders/${id}`), 1500);
 50 |       } else {
 51 |         setFlash({ type: "danger", msg: data.error || "Failed to complete order" });
 52 |       }
 53 |     } catch (err) {
 54 |       setFlash({ type: "danger", msg: "Server error" });
 55 |     } finally {
 56 |       setSaving(false);
 57 |     }
 58 |   }
 59 | 
 60 |   if (!order) return <div className="container py-5">Loading...</div>;
 61 | 
 62 |   return (
 63 |     <div className="container-fluid">
 64 |       {/* Header */}
 65 |       <div className="d-flex justify-content-between align-items-center mb-4">
 66 |         <h1 className="h3">
 67 |           <i className="bi bi-check-circle text-success"></i> Complete Production Order
 68 |         </h1>
 69 |         <Link href={`/production-orders/${id}`} className="btn btn-outline-secondary">
 70 |           Back
 71 |         </Link>
 72 |       </div>
 73 | 
 74 |       {flash && <div className={`alert alert-${flash.type}`}>{flash.msg}</div>}
 75 | 
 76 |       {/* Order Info */}
 77 |       <div className="card mb-3">
 78 |         <div className="card-body">
 79 |           <p><strong>Order No:</strong> {order.order_number}</p>
 80 |           <p><strong>Product:</strong> {order.fg_name} ({order.fg_code})</p>
 81 |           <p><strong>Status:</strong> {order.status}</p>
 82 |         </div>
 83 |       </div>
 84 | 
 85 |       {/* Complete Form */}
 86 |       <form onSubmit={handleComplete} className="card p-3">
 87 |         <div className="mb-3">
 88 |           <label className="form-label">Produced Quantity *</label>
 89 |           <input
 90 |             type="number"
 91 |             className="form-control"
 92 |             value={producedQty}
 93 |             onChange={(e) => setProducedQty(e.target.value)}
 94 |             step="0.001"
 95 |             min="0.001"
 96 |             required
 97 |           />
 98 |         </div>
 99 |         <button type="submit" className="btn btn-success" disabled={saving}>
100 |           {saving ? (
101 |             <>
102 |               <span className="spinner-border spinner-border-sm me-2"></span>
103 |               Completing...
104 |             </>
105 |           ) : (
106 |             <><i className="bi bi-check-circle me-2"></i> Complete Production</>
107 |           )}
108 |         </button>
109 |       </form>
110 |     </div>
111 |   );
112 | }
113 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/quality-check/page.js:
--------------------------------------------------------------------------------
 1 | "use client";
 2 | import { useEffect, useState } from "react";
 3 | import Link from "next/link";
 4 | 
 5 | export default function QualityCheckList() {
 6 |   const [qcs, setQcs] = useState([]);
 7 |   const [loading, setLoading] = useState(true);
 8 | 
 9 |   // Fetch QC List
10 |   useEffect(() => {
11 |     const fetchQcs = async () => {
12 |       try {
13 |         const res = await fetch("/api/quality-checks");
14 |         if (res.ok) {
15 |           setQcs(await res.json());
16 |         }
17 |       } catch (err) {
18 |         console.error("Error loading QC list", err);
19 |       } finally {
20 |         setLoading(false);
21 |       }
22 |     };
23 |     fetchQcs();
24 |   }, []);
25 | 
26 |   return (
27 |     <div className="container-fluid">
28 |       {/* Header */}
29 |       <div className="d-flex justify-content-between align-items-center mb-4">
30 |         <h1 className="h3 mb-0">
31 |           <i className="bi bi-clipboard-check text-primary"></i> Quality Checks
32 |         </h1>
33 |         <Link href="/quality-check/create" className="btn btn-primary">
34 |           <i className="bi bi-plus-circle me-2"></i> New Quality Check
35 |         </Link>
36 |       </div>
37 | 
38 |       {/* Table */}
39 |       <div className="card border-0 shadow-sm">
40 |         <div className="card-body">
41 |           {loading ? (
42 |             <p>Loading...</p>
43 |           ) : qcs.length === 0 ? (
44 |             <div className="text-center py-5">
45 |               <i className="bi bi-clipboard-check fs-1 text-muted"></i>
46 |               <h5 className="mt-3 text-muted">No Quality Checks Yet</h5>
47 |               <p className="text-muted">Create your first QC to ensure standards</p>
48 |               <Link href="/quality-check/create" className="btn btn-primary">
49 |                 <i className="bi bi-plus-circle me-2"></i>Create First QC
50 |               </Link>
51 |             </div>
52 |           ) : (
53 |             <div className="table-responsive">
54 |               <table className="table table-hover align-middle">
55 |                 <thead className="table-light">
56 |                   <tr>
57 |                     <th>QC No</th>
58 |                     <th>Date</th>
59 |                     <th>Inspector</th>
60 |                     <th>Status</th>
61 |                     <th>Items</th>
62 |                   </tr>
63 |                 </thead>
64 |                 <tbody>
65 |                   {qcs.map((qc) => (
66 |                     <tr key={qc.id}>
67 |                       <td><strong>{qc.qc_number}</strong></td>
68 |                       <td>{new Date(qc.qc_date).toLocaleDateString()}</td>
69 |                       <td>{qc.inspector}</td>
70 |                       <td>
71 |                         <span
72 |                           className={`badge bg-${
73 |                             qc.status === "approved"
74 |                               ? "success"
75 |                               : qc.status === "rejected"
76 |                               ? "danger"
77 |                               : "warning"
78 |                           }`}
79 |                         >
80 |                           {qc.status.charAt(0).toUpperCase() + qc.status.slice(1)}
81 |                         </span>
82 |                       </td>
83 |                       <td>{qc.items_count || 0}</td>
84 |                     </tr>
85 |                   ))}
86 |                 </tbody>
87 |               </table>
88 |             </div>
89 |           )}
90 |         </div>
91 |       </div>
92 |     </div>
93 |   );
94 | }
95 | 


--------------------------------------------------------------------------------
/erp-frontend/src/app/warehouses/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useState, useEffect } from "react";
  3 | import Link from "next/link";
  4 | import { useParams } from "next/navigation";
  5 | 
  6 | export default function WarehouseDetailsPage() {
  7 |   const { id } = useParams();
  8 | 
  9 |   const [warehouse, setWarehouse] = useState(null);
 10 |   const [loading, setLoading] = useState(true);
 11 |   const [flash, setFlash] = useState({ type: "", message: "" });
 12 | 
 13 |   // Fetch warehouse details
 14 |   useEffect(() => {
 15 |     const fetchWarehouse = async () => {
 16 |       try {
 17 |         const res = await fetch(`/api/warehouses/${id}`);
 18 |         if (res.ok) {
 19 |           const data = await res.json();
 20 |           setWarehouse(data);
 21 |         } else {
 22 |           setFlash({ type: "danger", message: "Warehouse not found." });
 23 |         }
 24 |       } catch (error) {
 25 |         setFlash({ type: "danger", message: "Failed to load warehouse details." });
 26 |       } finally {
 27 |         setLoading(false);
 28 |       }
 29 |     };
 30 |     if (id) fetchWarehouse();
 31 |   }, [id]);
 32 | 
 33 |   if (loading) return <p className="text-center mt-5">Loading...</p>;
 34 | 
 35 |   if (!warehouse)
 36 |     return (
 37 |       <div className="container-fluid">
 38 |         {flash.message && (
 39 |           <div className={`alert alert-${flash.type}`}>{flash.message}</div>
 40 |         )}
 41 |       </div>
 42 |     );
 43 | 
 44 |   return (
 45 |     <div className="container-fluid">
 46 |       {/* Header */}
 47 |       <div className="row">
 48 |         <div className="col-12 d-flex justify-content-between align-items-center mb-4">
 49 |           <h1 className="h3 mb-0">
 50 |             <i className="bi bi-building text-primary"></i>{" "}
 51 |             Warehouse Details: {warehouse.warehouse_name}
 52 |           </h1>
 53 |           <div>
 54 |             <Link href="/warehouses" className="btn btn-outline-secondary me-2">
 55 |               <i className="bi bi-arrow-left me-2"></i>Back to List
 56 |             </Link>
 57 |             <Link
 58 |               href={`/warehouses/${id}/edit`}
 59 |               className="btn btn-primary"
 60 |             >
 61 |               <i className="bi bi-pencil me-2"></i>Edit
 62 |             </Link>
 63 |           </div>
 64 |         </div>
 65 |       </div>
 66 | 
 67 |       <div className="row">
 68 |         {/* Left Section */}
 69 |         <div className="col-md-8">
 70 |           <div className="card">
 71 |             <div className="card-header">
 72 |               <h5 className="mb-0">Warehouse Information</h5>
 73 |             </div>
 74 |             <div className="card-body">
 75 |               <div className="row">
 76 |                 {[
 77 |                   { label: "Warehouse Code", value: warehouse.warehouse_code },
 78 |                   { label: "Warehouse Name", value: warehouse.warehouse_name },
 79 |                   {
 80 |                     label: "Description",
 81 |                     value: warehouse.description || "No description provided",
 82 |                     full: true,
 83 |                   },
 84 |                   {
 85 |                     label: "Address",
 86 |                     value: warehouse.address || "Not provided",
 87 |                     full: true,
 88 |                   },
 89 |                   { label: "City", value: warehouse.city || "Not provided" },
 90 |                   { label: "State", value: warehouse.state || "Not provided" },
 91 |                   {
 92 |                     label: "Contact Person",
 93 |                     value: warehouse.contact_person || "Not provided",
 94 |                   },
 95 |                   { label: "Phone", value: warehouse.phone || "Not provided" },
 96 |                 ].map((field, i) => (
 97 |                   <div
 98 |                     className={`${field.full ? "col-12" : "col-md-6"} mb-3`}
 99 |                     key={i}
100 |                   >
101 |                     <label className="form-label fw-bold">{field.label}</label>
102 |                     <p className="form-control-plaintext">{field.value}</p>
103 |                   </div>
104 |                 ))}
105 |               </div>
106 |             </div>
107 |           </div>
108 |         </div>
109 | 
110 |         {/* Right Section */}
111 |         <div className="col-md-4">
112 |           <div className="card">
113 |             <div className="card-header">
114 |               <h5 className="mb-0">Status & Info</h5>
115 |             </div>
116 |             <div className="card-body">
117 |               <div className="mb-3">
118 |                 <label className="form-label fw-bold">Status</label>
119 |                 <p className="form-control-plaintext">
120 |                   <span
121 |                     className={`badge bg-${
122 |                       warehouse.status === "active" ? "success" : "secondary"
123 |                     }`}
124 |                   >
125 |                     {warehouse.status.charAt(0).toUpperCase() +
126 |                       warehouse.status.slice(1)}
127 |                   </span>
128 |                 </p>
129 |               </div>
130 |             </div>
131 |           </div>
132 |         </div>
133 |       </div>
134 |     </div>
135 |   );
136 | }
137 | 


--------------------------------------------------------------------------------
/erp-frontend/src/lib/db.js:
--------------------------------------------------------------------------------
1 | import mysql from "mysql2/promise";
2 | 
3 | export const db = mysql.createPool({
4 |   host: "localhost",
5 |   user: "root",
6 |   password: "",
7 |   database: "manufacturing_erp",
8 | });
9 | 


--------------------------------------------------------------------------------
/erp-frontend/src/lib/stock.js:
--------------------------------------------------------------------------------
 1 | // lib/stock.js
 2 | import { db } from "@/lib/db";
 3 | 
 4 | // ✅ get latest balance of an item
 5 | export async function getCurrentBalance(item_id, warehouse_id, location_id=null) {
 6 |   const [rows] = await db.query(
 7 |     `SELECT balance_qty 
 8 |      FROM stock_ledger 
 9 |      WHERE item_id=? AND warehouse_id=? ${location_id ? "AND location_id=?" : ""} 
10 |      ORDER BY id DESC LIMIT 1`,
11 |     location_id ? [item_id, warehouse_id, location_id] : [item_id, warehouse_id]
12 |   );
13 |   return rows.length ? Number(rows[0].balance_qty) : 0;
14 | }
15 | 
16 | // ✅ add stock transaction
17 | export async function addStockTransaction({
18 |   item_id,
19 |   warehouse_id,
20 |   location_id=null,
21 |   qty,
22 |   transaction_type, // 'IN' or 'OUT'
23 |   reference_type,
24 |   reference_id,
25 |   transaction_ref,
26 |   remarks
27 | }) {
28 |   const balance = await getCurrentBalance(item_id, warehouse_id, location_id);
29 |   const newBalance = transaction_type === "IN"
30 |     ? balance + Number(qty)
31 |     : balance - Number(qty);
32 | 
33 |   await db.query(
34 |     `INSERT INTO stock_ledger 
35 |       (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, remarks, transaction_date, created_at)
36 |      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
37 |     [
38 |       item_id,
39 |       warehouse_id,
40 |       location_id,
41 |       transaction_type,
42 |       reference_type,
43 |       reference_id,
44 |       transaction_ref,
45 |       reference_id, // for now use reference_id as transaction_id
46 |       qty,
47 |       newBalance,
48 |       remarks || null
49 |     ]
50 |   );
51 | 
52 |   return newBalance;
53 | }
54 | 


--------------------------------------------------------------------------------
/jsconfig.json:
--------------------------------------------------------------------------------
1 | {
2 |   "compilerOptions": {
3 |     "paths": {
4 |       "@/*": ["./src/*"]
5 |     }
6 |   }
7 | }
8 | 


--------------------------------------------------------------------------------
/next.config.mjs:
--------------------------------------------------------------------------------
1 | /** @type {import('next').NextConfig} */
2 | const nextConfig = {};
3 | 
4 | export default nextConfig;
5 | 


--------------------------------------------------------------------------------
/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "erp-system",
 3 |   "version": "0.1.0",
 4 |   "private": true,
 5 |   "scripts": {
 6 |     "dev": "next dev --turbopack",
 7 |     "build": "next build --turbopack",
 8 |     "start": "next start"
 9 |   },
10 |   "dependencies": {
11 |     "@emotion/react": "^11.14.0",
12 |     "@emotion/styled": "^11.14.1",
13 |     "@mui/icons-material": "^7.3.2",
14 |     "@mui/material": "^7.3.2",
15 |     "@supabase/supabase-js": "^2.57.4",
16 |     "gsap": "^3.13.0",
17 |     "mysql2": "^3.15.0",
18 |     "next": "15.5.3",
19 |     "react": "19.1.0",
20 |     "react-dom": "19.1.0"
21 |   },
22 |   "devDependencies": {
23 |     "@next/swc-win32-x64-msvc": "^15.5.3"
24 |   }
25 | }
26 | 


--------------------------------------------------------------------------------
/public/file.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>


--------------------------------------------------------------------------------
/public/globe.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>


--------------------------------------------------------------------------------
/public/next.svg:
--------------------------------------------------------------------------------
1 | <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>


--------------------------------------------------------------------------------
/public/vercel.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>


--------------------------------------------------------------------------------
/public/window.svg:
--------------------------------------------------------------------------------
1 | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>


--------------------------------------------------------------------------------
/src/app/api/bom/[id]/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // GET - BOM Detail
  5 | // =========================
  6 | export async function GET(req, { params }) {
  7 |   try {
  8 |     const { id } = params;
  9 | 
 10 |     const [bomRows] = await db.query(
 11 |       `SELECT 
 12 |           b.id, 
 13 |           b.bom_number,
 14 |           b.version, 
 15 |           b.is_active, 
 16 |           b.remarks,
 17 |           b.created_at,
 18 |           i.item_name AS product_name,
 19 |           i.item_code AS product_code
 20 |        FROM bom b
 21 |        JOIN items i ON b.item_id = i.id
 22 |        WHERE b.id = ?`,
 23 |       [id]
 24 |     );
 25 | 
 26 |     if (bomRows.length === 0) {
 27 |       return Response.json({ error: "❌ BOM not found" }, { status: 404 });
 28 |     }
 29 | 
 30 |     const bom = bomRows[0];
 31 | 
 32 |     const [compRows] = await db.query(
 33 |       `SELECT 
 34 |           bc.id, 
 35 |           bc.item_id, 
 36 |           bc.qty,
 37 |           i.item_code, 
 38 |           i.item_name
 39 |        FROM bom_components bc
 40 |        JOIN items i ON bc.item_id = i.id
 41 |        WHERE bc.bom_id = ?`,
 42 |       [id]
 43 |     );
 44 | 
 45 |     bom.components = compRows;
 46 | 
 47 |     return Response.json(bom);
 48 |   } catch (error) {
 49 |     console.error("❌ BOM Detail Error:", error);
 50 |     return Response.json({ error: "Failed to fetch BOM details" }, { status: 500 });
 51 |   }
 52 | }
 53 | 
 54 | // =========================
 55 | // PUT - Update BOM
 56 | // =========================
 57 | export async function PUT(req, { params }) {
 58 |   try {
 59 |     const { id } = params;
 60 |     const body = await req.json();
 61 |     const { item_id, version, is_active, remarks, components } = body;
 62 | 
 63 |     if (!item_id || !version || !components || components.length === 0) {
 64 |       return Response.json({ error: "❌ Required fields missing" }, { status: 400 });
 65 |     }
 66 | 
 67 |     // Update BOM header
 68 |     await db.query(
 69 |       `UPDATE bom SET item_id=?, version=?, is_active=?, remarks=?, updated_at=NOW() WHERE id=?`,
 70 |       [item_id, version, is_active ? 1 : 0, remarks || null, id]
 71 |     );
 72 | 
 73 |     // Remove old components
 74 |     await db.query(`DELETE FROM bom_components WHERE bom_id=?`, [id]);
 75 | 
 76 |     // Insert updated components
 77 |     for (const comp of components) {
 78 |       if (!comp.item_id || !comp.qty) continue;
 79 |       await db.query(
 80 |         `INSERT INTO bom_components (bom_id, item_id, qty) VALUES (?, ?, ?)`,
 81 |         [id, comp.item_id, comp.qty]
 82 |       );
 83 |     }
 84 | 
 85 |     return Response.json({ message: "✅ BOM updated successfully" });
 86 |   } catch (error) {
 87 |     console.error("❌ BOM Update Error:", error);
 88 |     return Response.json({ error: "Failed to update BOM" }, { status: 500 });
 89 |   }
 90 | }
 91 | 
 92 | // =========================
 93 | // DELETE - Remove BOM
 94 | // =========================
 95 | export async function DELETE(req, { params }) {
 96 |   try {
 97 |     const { id } = params;
 98 | 
 99 |     await db.query(`DELETE FROM bom_components WHERE bom_id=?`, [id]);
100 |     await db.query(`DELETE FROM bom WHERE id=?`, [id]);
101 | 
102 |     return Response.json({ message: "🗑️ BOM deleted successfully" });
103 |   } catch (error) {
104 |     console.error("❌ BOM Delete Error:", error);
105 |     return Response.json({ error: "Failed to delete BOM" }, { status: 500 });
106 |   }
107 | }
108 | 


--------------------------------------------------------------------------------
/src/app/api/bom/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // =========================
 4 | // GET - List all BOMs
 5 | // =========================
 6 | export async function GET() {
 7 |   try {
 8 |     const [rows] = await db.query(`
 9 |       SELECT 
10 |         b.id, 
11 |         b.bom_number,
12 |         b.item_id,         -- ✅ add this for linking to FG item later
13 |         b.version, 
14 |         b.is_active, 
15 |         b.remarks,
16 |         b.created_at,
17 |         i.item_name AS fg_name, 
18 |         i.item_code AS fg_code,
19 |         (
20 |           SELECT COUNT(*) 
21 |           FROM bom_components bc 
22 |           WHERE bc.bom_id = b.id
23 |         ) AS components_count
24 |       FROM bom b
25 |       JOIN items i ON b.item_id = i.id
26 |       ORDER BY b.id DESC
27 |     `);
28 | 
29 |     return Response.json(rows);
30 |   } catch (error) {
31 |     console.error("❌ BOM GET Error:", error);
32 |     return Response.json({ error: "Failed to fetch BOMs" }, { status: 500 });
33 |   }
34 | }
35 | 
36 | // =========================
37 | // POST - Create BOM
38 | // =========================
39 | export async function POST(request) {
40 |   try {
41 |     const body = await request.json();
42 |     const { item_id, version, is_active, remarks, components } = body;
43 | 
44 |     if (!item_id || !version || !components || components.length === 0) {
45 |       return Response.json(
46 |         { error: "❌ Finished product and components are required" },
47 |         { status: 400 }
48 |       );
49 |     }
50 | 
51 |     // 🔹 Generate BOM Number
52 |     const bom_number = `BOM${new Date()
53 |       .toISOString()
54 |       .slice(0, 10)
55 |       .replace(/-/g, "")}${Math.floor(Math.random() * 9000 + 1000)}`;
56 | 
57 |     // 🔹 Insert BOM Header
58 |     const [result] = await db.query(
59 |       `INSERT INTO bom (bom_number, item_id, version, is_active, remarks, created_at)
60 |        VALUES (?, ?, ?, ?, ?, NOW())`,
61 |       [bom_number, item_id, version, is_active ? 1 : 0, remarks || null]
62 |     );
63 | 
64 |     const bom_id = result.insertId;
65 | 
66 |     // 🔹 Insert BOM Components
67 |     for (const comp of components) {
68 |       if (!comp.item_id || !comp.qty) continue;
69 |       await db.query(
70 |         `INSERT INTO bom_components (bom_id, item_id, qty)
71 |          VALUES (?, ?, ?)`,
72 |         [bom_id, comp.item_id, comp.qty]
73 |       );
74 |     }
75 | 
76 |     return Response.json({
77 |       message: "✅ BOM created successfully",
78 |       bom_id,
79 |       bom_number,
80 |     });
81 |   } catch (error) {
82 |     console.error("❌ BOM POST Error:", error);
83 |     return Response.json({ error: "Failed to create BOM" }, { status: 500 });
84 |   }
85 | }
86 | 


--------------------------------------------------------------------------------
/src/app/api/current-stock/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Current Stock (warehouse + search filter)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const search = searchParams.get("search") || "";
 8 |     const warehouseId = searchParams.get("warehouse_id") || "";
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         i.id,
13 |         i.item_code,
14 |         i.item_name,
15 |         i.uom AS unit,
16 |         i.reorder_level,
17 |         w.warehouse_name,
18 |         IFNULL(SUM(
19 |           CASE 
20 |             WHEN sl.transaction_type IN ('IN','purchase','production','adjustment') THEN sl.qty
21 |             WHEN sl.transaction_type IN ('OUT','sale') THEN -sl.qty
22 |             ELSE 0 
23 |           END
24 |         ), 0) AS current_stock
25 |       FROM items i
26 |       JOIN stock_ledger sl ON sl.item_id = i.id
27 |       JOIN warehouses w ON sl.warehouse_id = w.id
28 |       WHERE 1=1
29 |     `;
30 | 
31 |     const params = [];
32 | 
33 |     // 🔹 Search filter
34 |     if (search) {
35 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ?)`;
36 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`);
37 |     }
38 | 
39 |     // 🔹 Warehouse filter
40 |     if (warehouseId) {
41 |       query += ` AND w.id = ?`;
42 |       params.push(warehouseId);
43 |     }
44 | 
45 |     query += ` GROUP BY i.id, w.id ORDER BY i.item_name`;
46 | 
47 |     const [rows] = await db.query(query, params);
48 |     return Response.json(rows);
49 |   } catch (error) {
50 |     console.error("❌ GET Current Stock Error:", error);
51 |     return Response.json({ error: error.message }, { status: 500 });
52 |   }
53 | }
54 | 


--------------------------------------------------------------------------------
/src/app/api/customers/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // 🔹 Get one customer
 4 | export async function GET(req, context) {
 5 |   try {
 6 |     const { id } = context.params;
 7 |     const [rows] = await db.query("SELECT * FROM customers WHERE id = ?", [id]);
 8 | 
 9 |     if (rows.length === 0) {
10 |       return Response.json({ error: "Customer not found" }, { status: 404 });
11 |     }
12 |     return Response.json(rows[0]);
13 |   } catch (error) {
14 |     return Response.json({ error: error.message }, { status: 500 });
15 |   }
16 | }
17 | 
18 | // 🔹 Update customer
19 | export async function PUT(req, context) {
20 |   try {
21 |     const { id } = context.params;
22 |     const body = await req.json();
23 | 
24 |     await db.query("UPDATE customers SET ? WHERE id = ?", [body, id]);
25 | 
26 |     return Response.json({ message: "Customer updated successfully" });
27 |   } catch (error) {
28 |     return Response.json({ error: error.message }, { status: 500 });
29 |   }
30 | }
31 | 
32 | // 🔹 Delete customer
33 | export async function DELETE(req, context) {
34 |   try {
35 |     const { id } = context.params;
36 |     await db.query("DELETE FROM customers WHERE id = ?", [id]);
37 | 
38 |     return Response.json({ message: "Customer deleted successfully" });
39 |   } catch (error) {
40 |     return Response.json({ error: error.message }, { status: 500 });
41 |   }
42 | }
43 | 


--------------------------------------------------------------------------------
/src/app/api/customers/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // 🔹 Get all customers
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM customers ORDER BY created_at DESC");
 7 |     return Response.json(rows);
 8 |   } catch (error) {
 9 |     return Response.json({ error: error.message }, { status: 500 });
10 |   }
11 | }
12 | 
13 | // 🔹 Create new customer
14 | export async function POST(request) {
15 |   try {
16 |     const body = await request.json();
17 |     const {
18 |       customer_name,
19 |       customer_type,
20 |       contact_person,
21 |       email,
22 |       phone,
23 |       address,
24 |       city,
25 |       state,
26 |       pincode,
27 |       country = "India",
28 |       gst_number,
29 |       pan_number,
30 |       credit_limit = 0,
31 |       credit_days = 0,
32 |       payment_terms,
33 |       status = "active",
34 |     } = body;
35 | 
36 |     // Generate auto customer code
37 |     const [last] = await db.query("SELECT customer_code FROM customers ORDER BY id DESC LIMIT 1");
38 |     let newCode = "CUST001";
39 |     if (last.length > 0) {
40 |       const lastCode = last[0].customer_code;
41 |       const num = parseInt(lastCode.replace("CUST", "")) + 1;
42 |       newCode = "CUST" + num.toString().padStart(3, "0");
43 |     }
44 | 
45 |     const [result] = await db.query(
46 |       `INSERT INTO customers 
47 |       (customer_code, customer_name, customer_type, contact_person, email, phone, address, city, state, pincode, country, gst_number, pan_number, credit_limit, credit_days, payment_terms, status)
48 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
49 |       [
50 |         newCode,
51 |         customer_name,
52 |         customer_type,
53 |         contact_person,
54 |         email,
55 |         phone,
56 |         address,
57 |         city,
58 |         state,
59 |         pincode,
60 |         country,
61 |         gst_number,
62 |         pan_number,
63 |         credit_limit,
64 |         credit_days,
65 |         payment_terms,
66 |         status,
67 |       ]
68 |     );
69 | 
70 |     return Response.json({ id: result.insertId, customer_code: newCode, ...body });
71 |   } catch (error) {
72 |     return Response.json({ error: error.message }, { status: 500 });
73 |   }
74 | }
75 | 


--------------------------------------------------------------------------------
/src/app/api/grn/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET single GRN (with items)
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       `SELECT grn.*, po.po_number, s.supplier_name
 8 |        FROM purchase_receipts grn
 9 |        LEFT JOIN purchase_orders po ON grn.po_id = po.id
10 |        LEFT JOIN suppliers s ON po.supplier_id = s.id
11 |        WHERE grn.id = ?`,
12 |       [params.id]
13 |     );
14 | 
15 |     if (rows.length === 0) {
16 |       return Response.json({ error: "GRN not found" }, { status: 404 });
17 |     }
18 | 
19 |     const grn = rows[0];
20 | 
21 |     // ✅ fetch GRN items
22 |     const [items] = await db.query(
23 |       `SELECT gri.id, gri.item_id, gri.received_qty, gri.remarks,
24 |               i.item_name, i.item_code, i.uom
25 |        FROM purchase_receipt_items gri
26 |        JOIN items i ON gri.item_id = i.id
27 |        WHERE gri.receipt_id = ?`,
28 |       [params.id]
29 |     );
30 | 
31 |     grn.items = items;
32 | 
33 |     return Response.json(grn);
34 |   } catch (error) {
35 |     console.error("❌ GET GRN Error:", error);
36 |     return Response.json({ error: error.message }, { status: 500 });
37 |   }
38 | }
39 | 
40 | // ✅ UPDATE GRN (header + items)
41 | export async function PUT(request, { params }) {
42 |   try {
43 |     const body = await request.json();
44 |     const { receipt_date, remarks, status, items } = body;
45 | 
46 |     // ✅ update header
47 |     await db.query(
48 |       `UPDATE purchase_receipts 
49 |        SET receipt_date=?, remarks=?, status=?, updated_at=NOW()
50 |        WHERE id=?`,
51 |       [receipt_date, remarks, status, params.id]
52 |     );
53 | 
54 |     // ✅ update items (if provided)
55 |     if (items && items.length > 0) {
56 |       for (const item of items) {
57 |         await db.query(
58 |           `UPDATE purchase_receipt_items
59 |            SET received_qty=?, remarks=?
60 |            WHERE id=? AND receipt_id=?`,
61 |           [item.received_qty, item.remarks || "", item.id, params.id]
62 |         );
63 |       }
64 |     }
65 | 
66 |     return Response.json({ message: "GRN updated successfully" });
67 |   } catch (error) {
68 |     console.error("❌ PUT GRN Error:", error);
69 |     return Response.json({ error: error.message }, { status: 500 });
70 |   }
71 | }
72 | 
73 | // ✅ DELETE GRN
74 | export async function DELETE(request, { params }) {
75 |   try {
76 |     // ✅ delete items first
77 |     await db.query(`DELETE FROM purchase_receipt_items WHERE receipt_id=?`, [params.id]);
78 | 
79 |     // ✅ delete GRN header
80 |     await db.query("DELETE FROM purchase_receipts WHERE id=?", [params.id]);
81 | 
82 |     return Response.json({ message: "GRN deleted successfully" });
83 |   } catch (error) {
84 |     console.error("❌ DELETE GRN Error:", error);
85 |     return Response.json({ error: error.message }, { status: 500 });
86 |   }
87 | }
88 |   


--------------------------------------------------------------------------------
/src/app/api/items/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Single item
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [params.id]);
 7 |     if (rows.length === 0) {
 8 |       return Response.json({ error: "Item not found" }, { status: 404 });
 9 |     }
10 |     return Response.json(rows[0]);
11 |   } catch (error) {
12 |     return Response.json({ error: error.message }, { status: 500 });
13 |   }
14 | }
15 | 
16 | // ✅ PUT - Update item
17 | export async function PUT(request, { params }) {
18 |   try {
19 |     const body = await request.json();
20 |     const {
21 |       item_name,
22 |       item_type = "raw_material",
23 |       item_category,
24 |       uom,
25 |       hsn_code,
26 |       gst_rate = 0,
27 |       purchase_rate = 0,
28 |       sale_rate = 0,
29 |       minimum_stock = 0,
30 |       maximum_stock = 0,
31 |       reorder_level = 0,
32 |       status = "active",
33 |     } = body;
34 | 
35 |     await db.query(
36 |       `UPDATE items SET 
37 |         item_name=?, item_type=?, item_category=?, uom=?, hsn_code=?, gst_rate=?, 
38 |         purchase_rate=?, sale_rate=?, minimum_stock=?, maximum_stock=?, reorder_level=?, status=? 
39 |       WHERE id=?`,
40 |       [
41 |         item_name,
42 |         item_type,
43 |         item_category,
44 |         uom,
45 |         hsn_code,
46 |         gst_rate,
47 |         purchase_rate,
48 |         sale_rate,
49 |         minimum_stock,
50 |         maximum_stock,
51 |         reorder_level,
52 |         status,
53 |         params.id,
54 |       ]
55 |     );
56 | 
57 |     return Response.json({ message: "Item updated successfully" });
58 |   } catch (error) {
59 |     return Response.json({ error: error.message }, { status: 500 });
60 |   }
61 | }
62 | 
63 | // ✅ DELETE - Remove item
64 | export async function DELETE(request, { params }) {
65 |   try {
66 |     await db.query("DELETE FROM items WHERE id = ?", [params.id]);
67 |     return Response.json({ message: "Item deleted successfully" });
68 |   } catch (error) {
69 |     return Response.json({ error: error.message }, { status: 500 });
70 |   }
71 | }
72 | 


--------------------------------------------------------------------------------
/src/app/api/items/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET all items
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM items ORDER BY created_at DESC");
 7 |     return Response.json(rows);
 8 |   } catch (error) {
 9 |     return Response.json({ error: error.message }, { status: 500 });
10 |   }
11 | }
12 | 
13 | // ✅ POST - create new item
14 | export async function POST(request) {
15 |   try {
16 |     const body = await request.json();
17 |     const {
18 |       item_code,
19 |       item_name,
20 |       item_type = "raw_material", // default
21 |       item_category = "",
22 |       uom = "pcs",                // ✅ default value added
23 |       hsn_code = "",
24 |       gst_rate = 0,
25 |       purchase_rate = 0,
26 |       sale_rate = 0,
27 |       minimum_stock = 0,
28 |       maximum_stock = 0,
29 |       reorder_level = 0,
30 |       status = "active",
31 |     } = body;
32 | 
33 |     if (!item_name || !item_code) {
34 |       return Response.json(
35 |         { error: "Item Code and Item Name are required" },
36 |         { status: 400 }
37 |       );
38 |     }
39 | 
40 |     const [result] = await db.query(
41 |       `INSERT INTO items 
42 |       (item_code, item_name, item_type, item_category, uom, hsn_code, gst_rate, purchase_rate, sale_rate, minimum_stock, maximum_stock, reorder_level, status)
43 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
44 |       [
45 |         item_code,
46 |         item_name,
47 |         item_type,
48 |         item_category,
49 |         uom,
50 |         hsn_code,
51 |         gst_rate,
52 |         purchase_rate,
53 |         sale_rate,
54 |         minimum_stock,
55 |         maximum_stock,
56 |         reorder_level,
57 |         status,
58 |       ]
59 |     );
60 | 
61 |     return Response.json({ id: result.insertId, ...body });
62 |   } catch (error) {
63 |     return Response.json({ error: error.message }, { status: 500 });
64 |   }
65 | }
66 |     


--------------------------------------------------------------------------------
/src/app/api/locations/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Single Location
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       `SELECT l.*, w.warehouse_name 
 8 |        FROM locations l 
 9 |        JOIN warehouses w ON l.warehouse_id = w.id
10 |        WHERE l.id = ?`,
11 |       [params.id]
12 |     );
13 | 
14 |     if (rows.length === 0) {
15 |       return Response.json({ message: "Location not found" }, { status: 404 });
16 |     }
17 | 
18 |     return Response.json(rows[0]);
19 |   } catch (error) {
20 |     console.error("❌ GET Location Error:", error);
21 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
22 |   }
23 | }
24 | 
25 | // ✅ PUT - Update Location
26 | export async function PUT(request, { params }) {
27 |   try {
28 |     const body = await request.json();
29 |     const {
30 |       location_name,
31 |       location_code,
32 |       warehouse_id,
33 |       location_type,
34 |       parent_location_id,
35 |       capacity,
36 |       is_default,
37 |       status,
38 |     } = body;
39 | 
40 |     await db.query(
41 |       `UPDATE locations 
42 |        SET location_name=?, location_code=?, warehouse_id=?, location_type=?, parent_location_id=?, capacity=?, is_default=?, status=?, updated_at=NOW() 
43 |        WHERE id=?`,
44 |       [
45 |         location_name,
46 |         location_code,
47 |         warehouse_id,
48 |         location_type || "rack",
49 |         parent_location_id || null,
50 |         capacity || 0,
51 |         is_default || 0,
52 |         status || "active",
53 |         params.id,
54 |       ]
55 |     );
56 | 
57 |     return Response.json({ message: "✅ Location updated successfully" });
58 |   } catch (error) {
59 |     console.error("❌ PUT Location Error:", error);
60 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
61 |   }
62 | }
63 | 
64 | // ✅ DELETE - Remove Location
65 | export async function DELETE(request, { params }) {
66 |   try {
67 |     await db.query(`DELETE FROM locations WHERE id=?`, [params.id]);
68 |     return Response.json({ message: "🗑️ Location deleted successfully" });
69 |   } catch (error) {
70 |     console.error("❌ DELETE Location Error:", error);
71 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
72 |   }
73 | }
74 | 


--------------------------------------------------------------------------------
/src/app/api/locations/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - All Locations
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query(`
 7 |       SELECT l.id, l.location_code, l.location_name, l.location_type,
 8 |              l.capacity, l.current_stock, l.is_default, l.status,
 9 |              l.created_at, l.updated_at,
10 |              w.warehouse_name
11 |       FROM locations l
12 |       JOIN warehouses w ON l.warehouse_id = w.id
13 |       ORDER BY l.location_name
14 |     `);
15 |     return Response.json(rows);
16 |   } catch (error) {
17 |     console.error("❌ GET Locations Error:", error);
18 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
19 |   }
20 | }
21 | 
22 | // ✅ POST - Create Location
23 | export async function POST(request) {
24 |   try {
25 |     const body = await request.json();
26 |     const {
27 |       location_name,
28 |       location_code,
29 |       warehouse_id,
30 |       location_type,
31 |       parent_location_id,
32 |       capacity,
33 |       is_default,
34 |       status,
35 |     } = body;
36 | 
37 |     if (!location_name || !location_code || !warehouse_id) {
38 |       return Response.json({ message: "Missing required fields" }, { status: 400 });
39 |     }
40 | 
41 |     const [result] = await db.query(
42 |       `INSERT INTO locations 
43 |        (location_name, location_code, warehouse_id, location_type, parent_location_id, capacity, current_stock, is_default, status, created_at, updated_at) 
44 |        VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, NOW(), NOW())`,
45 |       [
46 |         location_name,
47 |         location_code,
48 |         warehouse_id,
49 |         location_type || "rack",
50 |         parent_location_id || null,
51 |         capacity || 0,
52 |         is_default || 0,
53 |         status || "active",
54 |       ]
55 |     );
56 | 
57 |     return Response.json({
58 |       message: "✅ Location created successfully",
59 |       id: result.insertId,
60 |     });
61 |   } catch (error) {
62 |     console.error("❌ POST Location Error:", error);
63 |     return Response.json({ error: error.message || "Server error" }, { status: 500 });
64 |   }
65 | }
66 | 


--------------------------------------------------------------------------------
/src/app/api/production-completion/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | function sanitizeString(s) {
 4 |   return typeof s === "string" ? s.trim() : s;
 5 | }
 6 | 
 7 | export async function POST(req) {
 8 |   let conn;
 9 |   try {
10 |     const body = await req.json();
11 |     const production_order_id = body.production_order_id;
12 |     const produced_qty = Number(body.produced_qty);
13 |     const warehouse_id = body.warehouse_id;
14 |     const location_id = body.location_id || null;
15 |     const remarks = sanitizeString(body.remarks || "");
16 | 
17 |     // ✅ Validation
18 |     if (!production_order_id) {
19 |       return Response.json({ error: "production_order_id is required" }, { status: 400 });
20 |     }
21 |     if (isNaN(produced_qty) || produced_qty <= 0) {
22 |       return Response.json({ error: "produced_qty must be > 0" }, { status: 400 });
23 |     }
24 |     if (!warehouse_id) {
25 |       return Response.json({ error: "warehouse_id is required" }, { status: 400 });
26 |     }
27 | 
28 |     // ✅ Get production order
29 |     const [[order]] = await db.query(
30 |       `SELECT * FROM production_orders WHERE id = ?`,
31 |       [production_order_id]
32 |     );
33 |     if (!order) {
34 |       return Response.json({ error: "Production order not found" }, { status: 404 });
35 |     }
36 | 
37 |     // ✅ Begin Transaction
38 |     conn = await db.getConnection();
39 |     await conn.beginTransaction();
40 | 
41 |     // Update production_orders
42 |     await conn.query(
43 |       `UPDATE production_orders 
44 |        SET produced_qty = produced_qty + ?, status = 'completed', updated_at = NOW()
45 |        WHERE id = ?`,
46 |       [produced_qty, production_order_id]
47 |     );
48 | 
49 |     // Insert Stock Ledger (FG IN)
50 |     await conn.query(
51 |       `INSERT INTO stock_ledger 
52 |        (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, transaction_date, remarks, created_at)
53 |        VALUES (?, ?, ?, 'IN', 'Production Order', ?, ?, ?, ?, ?, NOW(), ?, NOW())`,
54 |       [
55 |         order.fg_item_id,
56 |         warehouse_id,
57 |         location_id,
58 |         production_order_id,
59 |         order.order_number,
60 |         production_order_id,
61 |         produced_qty,
62 |         produced_qty, // balance update karna hoga agar running balance logic chahiye
63 |         remarks,
64 |       ]
65 |     );
66 | 
67 |     await conn.commit();
68 |     conn.release();
69 | 
70 |     return Response.json({
71 |       message: "Production completed successfully",
72 |       production_order_id,
73 |       produced_qty,
74 |     });
75 |   } catch (err) {
76 |     console.error("❌ Production Completion API error:", err);
77 |     if (conn) {
78 |       await conn.rollback();
79 |       conn.release();
80 |     }
81 |     return Response.json({ error: err.message || "Server error" }, { status: 500 });
82 |   }
83 | }
84 | 


--------------------------------------------------------------------------------
/src/app/api/production-orders/[id]/items/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | export async function GET(req, { params }) {
 4 |   try {
 5 |     const { id } = params;
 6 |     if (!id) {
 7 |       return Response.json({ error: "Missing production order id" }, { status: 400 });
 8 |     }
 9 | 
10 |     const [rows] = await db.query(
11 |       `SELECT 
12 |          poi.item_id, 
13 |          i.item_code, 
14 |          i.item_name, 
15 |          poi.planned_qty, 
16 |          poi.issued_qty, 
17 |          (poi.planned_qty - IFNULL(poi.issued_qty,0)) AS pending_qty,
18 |          COALESCE(poi.uom, i.uom, '') AS uom
19 |        FROM production_order_items poi
20 |        LEFT JOIN items i ON poi.item_id = i.id
21 |        WHERE poi.production_order_id = ?
22 |        ORDER BY poi.id ASC`,
23 |       [id]
24 |     );
25 | 
26 |     return Response.json(rows);
27 |   } catch (err) {
28 |     console.error("❌ Fetch PO items error:", err);
29 |     return Response.json({ error: "Failed to fetch production order items" }, { status: 500 });
30 |   }
31 | }
32 | 


--------------------------------------------------------------------------------
/src/app/api/production-orders/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // GET - List all Production Orders
  5 | // =========================
  6 | export async function GET(req) {
  7 |   try {
  8 |     const { searchParams } = new URL(req.url);
  9 |     const status = searchParams.get("status");
 10 |     const search = searchParams.get("search");
 11 | 
 12 |     let query = `
 13 |       SELECT 
 14 |         po.id,
 15 |         po.order_number,
 16 |         po.order_qty,
 17 |         po.status,
 18 |         po.created_at,
 19 |         po.planned_start_date,
 20 |         po.planned_end_date,
 21 |         b.version AS bom_version,
 22 |         i.item_name AS fg_name,
 23 |         i.item_code AS fg_code,
 24 |         w.warehouse_name
 25 |       FROM production_orders po
 26 |       JOIN bom b ON po.bom_id = b.id
 27 |       JOIN items i ON po.fg_item_id = i.id
 28 |       JOIN warehouses w ON po.warehouse_id = w.id
 29 |       WHERE 1=1
 30 |     `;
 31 | 
 32 |     const params = [];
 33 |     if (status) {
 34 |       query += ` AND po.status = ?`;
 35 |       params.push(status);
 36 |     }
 37 |     if (search) {
 38 |       query += ` AND (po.order_number LIKE ? OR i.item_name LIKE ? OR i.item_code LIKE ?)`;
 39 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`);
 40 |     }
 41 | 
 42 |     query += " ORDER BY po.id DESC";
 43 | 
 44 |     const [rows] = await db.query(query, params);
 45 |     return Response.json(rows);
 46 |   } catch (error) {
 47 |     console.error("❌ Production Orders GET Error:", error);
 48 |     return Response.json({ error: error.message }, { status: 500 });
 49 |   }
 50 | }
 51 | 
 52 | // =========================
 53 | // POST - Create Production Order
 54 | // =========================
 55 | export async function POST(request) {
 56 |   try {
 57 |     const body = await request.json();
 58 |     const {
 59 |       bom_id,
 60 |       fg_item_id,
 61 |       warehouse_id,
 62 |       order_qty,
 63 |       planned_start_date,
 64 |       planned_end_date,
 65 |       remarks,
 66 |     } = body;
 67 | 
 68 |     // ✅ Validation
 69 |     if (!bom_id || !fg_item_id || !warehouse_id || !order_qty || !planned_start_date) {
 70 |       return Response.json({ error: "❌ All required fields must be filled" }, { status: 400 });
 71 |     }
 72 | 
 73 |     if (isNaN(order_qty) || Number(order_qty) <= 0) {
 74 |       return Response.json({ error: "❌ Order quantity must be greater than 0" }, { status: 400 });
 75 |     }
 76 | 
 77 |     // ✅ Check BOM exists
 78 |     const [bomCheck] = await db.query(`SELECT id FROM bom WHERE id = ?`, [bom_id]);
 79 |     if (bomCheck.length === 0) {
 80 |       return Response.json({ error: "❌ Invalid BOM selected" }, { status: 400 });
 81 |     }
 82 | 
 83 |     // ✅ Check warehouse exists
 84 |     const [whCheck] = await db.query(`SELECT id FROM warehouses WHERE id = ?`, [warehouse_id]);
 85 |     if (whCheck.length === 0) {
 86 |       return Response.json({ error: "❌ Invalid warehouse selected" }, { status: 400 });
 87 |     }
 88 | 
 89 |     // ✅ Generate Order Number
 90 |     const order_number = `PO${new Date()
 91 |       .toISOString()
 92 |       .slice(0, 10)
 93 |       .replace(/-/g, "")}${Math.floor(Math.random() * 9000 + 1000)}`;
 94 | 
 95 |     // ✅ Insert Order
 96 |     const [result] = await db.query(
 97 |       `INSERT INTO production_orders 
 98 |        (order_number, bom_id, fg_item_id, warehouse_id, order_qty, status, planned_start_date, planned_end_date, remarks, created_at)
 99 |        VALUES (?, ?, ?, ?, ?, 'draft', ?, ?, ?, NOW())`,
100 |       [order_number, bom_id, fg_item_id, warehouse_id, order_qty, planned_start_date, planned_end_date || null, remarks || null]
101 |     );
102 | 
103 |     const production_order_id = result.insertId;
104 | 
105 |     // ✅ Auto add components from BOM
106 |     const [components] = await db.query(
107 |       `SELECT item_id, qty FROM bom_components WHERE bom_id = ?`,
108 |       [bom_id]
109 |     );
110 | 
111 |     for (const comp of components) {
112 |       const planned_qty = comp.qty * order_qty;
113 |       await db.query(
114 |         `INSERT INTO production_order_items 
115 |          (production_order_id, item_id, planned_qty, issued_qty) 
116 |          VALUES (?, ?, ?, 0)`,
117 |         [production_order_id, comp.item_id, planned_qty]
118 |       );
119 |     }
120 | 
121 |     return Response.json({
122 |       message: "✅ Production Order created successfully",
123 |       order_number,
124 |       production_order_id,
125 |     });
126 |   } catch (error) {
127 |     console.error("❌ Production Orders POST Error:", error);
128 |     return Response.json({ error: error.message }, { status: 500 });
129 |   }
130 | }
131 | 


--------------------------------------------------------------------------------
/src/app/api/purchase-orders/[id]/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // ✅ GET - Single Purchase Order (with items)
  4 | export async function GET(request, { params }) {
  5 |   try {
  6 |     // Header
  7 |     const [orders] = await db.query(
  8 |       `SELECT po.*, s.supplier_name, w.warehouse_name
  9 |        FROM purchase_orders po
 10 |        JOIN suppliers s ON po.supplier_id = s.id
 11 |        JOIN warehouses w ON po.warehouse_id = w.id
 12 |        WHERE po.id = ?`,
 13 |       [params.id]
 14 |     );
 15 | 
 16 |     if (orders.length === 0) {
 17 |       return Response.json({ error: "Purchase Order not found" }, { status: 404 });
 18 |     }
 19 | 
 20 |     const purchaseOrder = orders[0];
 21 | 
 22 |     // Cast numbers
 23 |     purchaseOrder.subtotal = parseFloat(purchaseOrder.subtotal) || 0;
 24 |     purchaseOrder.discount_amount = parseFloat(purchaseOrder.discount_amount) || 0;
 25 |     purchaseOrder.tax_amount = parseFloat(purchaseOrder.tax_amount) || 0;
 26 |     purchaseOrder.total_amount = parseFloat(purchaseOrder.total_amount) || 0;
 27 | 
 28 |     // Items
 29 |     const [items] = await db.query(
 30 |       `SELECT poi.*, i.item_name, i.item_code, i.uom
 31 |        FROM purchase_order_items poi
 32 |        JOIN items i ON poi.item_id = i.id
 33 |        WHERE poi.po_id = ?`,
 34 |       [params.id]
 35 |     );
 36 | 
 37 |     purchaseOrder.items = items.map((it) => ({
 38 |       ...it,
 39 |       ordered_qty: parseFloat(it.ordered_qty) || 0,
 40 |       unit_price: parseFloat(it.unit_price) || 0,
 41 |       discount_percent: parseFloat(it.discount_percent) || 0,
 42 |       tax_percent: parseFloat(it.tax_percent) || 0,
 43 |     }));
 44 | 
 45 |     return Response.json(purchaseOrder);
 46 |   } catch (error) {
 47 |     console.error("❌ GET Single PO Error:", error);
 48 |     return Response.json({ error: error.message }, { status: 500 });
 49 |   }
 50 | }
 51 | 
 52 | // ✅ PUT - Update Purchase Order
 53 | export async function PUT(request, { params }) {
 54 |   try {
 55 |     const body = await request.json();
 56 |     const {
 57 |       supplier_id,
 58 |       warehouse_id,
 59 |       po_date,
 60 |       expected_delivery_date,
 61 |       terms_and_conditions,
 62 |       remarks,
 63 |       status,
 64 |       subtotal,
 65 |       discount_amount,
 66 |       tax_amount,
 67 |       total_amount,
 68 |     } = body;
 69 | 
 70 |     await db.query(
 71 |       `UPDATE purchase_orders 
 72 |        SET supplier_id=?, warehouse_id=?, po_date=?, expected_delivery_date=?, terms_and_conditions=?, remarks=?, status=?, subtotal=?, discount_amount=?, tax_amount=?, total_amount=?, updated_at=NOW()
 73 |        WHERE id=?`,
 74 |       [
 75 |         supplier_id,
 76 |         warehouse_id,
 77 |         po_date,
 78 |         expected_delivery_date,
 79 |         terms_and_conditions,
 80 |         remarks,
 81 |         status,
 82 |         subtotal,
 83 |         discount_amount,
 84 |         tax_amount,
 85 |         total_amount,
 86 |         params.id,
 87 |       ]
 88 |     );
 89 | 
 90 |     return Response.json({ message: "Purchase Order updated successfully" });
 91 |   } catch (error) {
 92 |     console.error("❌ PUT PO Error:", error);
 93 |     return Response.json({ error: error.message }, { status: 500 });
 94 |   }
 95 | }
 96 | 
 97 | // ✅ DELETE - Remove PO (with items)
 98 | export async function DELETE(request, { params }) {
 99 |   try {
100 |     await db.query("DELETE FROM purchase_order_items WHERE po_id = ?", [params.id]);
101 |     await db.query("DELETE FROM purchase_orders WHERE id = ?", [params.id]);
102 | 
103 |     return Response.json({ message: "Purchase Order deleted successfully" });
104 |   } catch (error) {
105 |     console.error("❌ DELETE PO Error:", error);
106 |     return Response.json({ error: error.message }, { status: 500 });
107 |   }
108 | }
109 | 


--------------------------------------------------------------------------------
/src/app/api/purchase-orders/[id]/status/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ PUT - Update PO Status
 4 | export async function PUT(request, { params }) {
 5 |   try {
 6 |     const body = await request.json();
 7 |     const { status } = body;
 8 | 
 9 |     await db.query(
10 |       "UPDATE purchase_orders SET status = ?, updated_at = NOW() WHERE id = ?",
11 |       [status, params.id]
12 |     );
13 | 
14 |     return Response.json({ message: "Status updated successfully" });
15 |   } catch (error) {
16 |     console.error("❌ Update Status Error:", error);
17 |     return Response.json({ error: error.message }, { status: 500 });
18 |   }
19 | }
20 | 


--------------------------------------------------------------------------------
/src/app/api/purchase-orders/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // ✅ GET - All Purchase Orders
  4 | export async function GET() {
  5 |   try {
  6 |     const [rows] = await db.query(
  7 |       `SELECT po.*, s.supplier_name, w.warehouse_name
  8 |        FROM purchase_orders po
  9 |        JOIN suppliers s ON po.supplier_id = s.id
 10 |        JOIN warehouses w ON po.warehouse_id = w.id
 11 |        ORDER BY po.created_at DESC`
 12 |     );
 13 | 
 14 |     // Cast numeric fields to numbers
 15 |     const orders = rows.map((po) => ({
 16 |       ...po,
 17 |       subtotal: parseFloat(po.subtotal) || 0,
 18 |       discount_amount: parseFloat(po.discount_amount) || 0,
 19 |       tax_amount: parseFloat(po.tax_amount) || 0,
 20 |       total_amount: parseFloat(po.total_amount) || 0,
 21 |     }));
 22 | 
 23 |     return Response.json(orders);
 24 |   } catch (error) {
 25 |     console.error("❌ GET Orders Error:", error);
 26 |     return Response.json({ error: error.message }, { status: 500 });
 27 |   }
 28 | }
 29 | 
 30 | // ✅ POST - Create Purchase Order
 31 | export async function POST(request) {
 32 |   try {
 33 |     const body = await request.json();
 34 |     const {
 35 |       supplier_id,
 36 |       warehouse_id,
 37 |       po_date,
 38 |       expected_delivery_date,
 39 |       terms_and_conditions,
 40 |       remarks,
 41 |       status,
 42 |       subtotal,
 43 |       discount_amount,
 44 |       tax_amount,
 45 |       total_amount,
 46 |       items = [],
 47 |     } = body;
 48 | 
 49 |     // 🔹 Generate PO Number
 50 |     const [last] = await db.query(
 51 |       "SELECT po_number FROM purchase_orders ORDER BY id DESC LIMIT 1"
 52 |     );
 53 | 
 54 |     let newNumber = "PO001";
 55 |     if (last.length > 0 && last[0].po_number) {
 56 |       const num = parseInt(last[0].po_number.replace("PO", "")) + 1;
 57 |       newNumber = "PO" + num.toString().padStart(3, "0");
 58 |     }
 59 | 
 60 |     // 🔹 Insert Purchase Order
 61 |     const [result] = await db.query(
 62 |       `INSERT INTO purchase_orders 
 63 |        (po_number, supplier_id, warehouse_id, po_date, expected_delivery_date, terms_and_conditions, remarks, status, subtotal, discount_amount, tax_amount, total_amount, created_at, updated_at) 
 64 |        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
 65 |       [
 66 |         newNumber,
 67 |         supplier_id,
 68 |         warehouse_id,
 69 |         po_date,
 70 |         expected_delivery_date,
 71 |         terms_and_conditions,
 72 |         remarks,
 73 |         status,
 74 |         subtotal,
 75 |         discount_amount,
 76 |         tax_amount,
 77 |         total_amount,
 78 |       ]
 79 |     );
 80 | 
 81 |     const poId = result.insertId;
 82 | 
 83 |     // 🔹 Insert Items
 84 |     for (const item of items) {
 85 |       await db.query(
 86 |         `INSERT INTO purchase_order_items 
 87 |          (po_id, item_id, ordered_qty, unit_price, discount_percent, tax_percent, remarks, created_at) 
 88 |          VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
 89 |         [
 90 |           poId,
 91 |           item.item_id,
 92 |           item.ordered_qty,
 93 |           item.unit_price,
 94 |           item.discount_percent,
 95 |           item.tax_percent,
 96 |           item.remarks,
 97 |         ]
 98 |       );
 99 |     }
100 | 
101 |     return Response.json({
102 |       message: "Purchase Order created successfully",
103 |       id: poId,
104 |       po_number: newNumber,
105 |     });
106 |   } catch (error) {
107 |     console.error("❌ POST PO Error:", error);
108 |     return Response.json({ error: error.message }, { status: 500 });
109 |   }
110 | }
111 | 


--------------------------------------------------------------------------------
/src/app/api/quality-checks/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // =========================
 4 | // ✅ GET - QC List with items_count
 5 | // =========================
 6 | export async function GET() {
 7 |   try {
 8 |     const [rows] = await db.query(`
 9 |       SELECT 
10 |         qc.id, qc.qc_number, qc.qc_date, qc.inspector, qc.status, qc.remarks,
11 |         COUNT(qci.id) AS items_count
12 |       FROM quality_checks qc
13 |       LEFT JOIN quality_check_items qci ON qc.id = qci.qc_id
14 |       GROUP BY qc.id
15 |       ORDER BY qc.id DESC
16 |     `);
17 | 
18 |     return Response.json(rows);
19 |   } catch (error) {
20 |     console.error("❌ QC GET Error:", error);
21 |     return Response.json({ error: error.message }, { status: 500 });
22 |   }
23 | }
24 | 
25 | // =========================
26 | // ✅ POST - Create QC (header + items)
27 | // =========================
28 | export async function POST(request) {
29 |   try {
30 |     const body = await request.json();
31 |     const { qc_number, qc_date, reference_type, inspector, remarks, status, items } = body;
32 | 
33 |     // 1️⃣ Validation
34 |     if (
35 |       !qc_number ||
36 |       !qc_date ||
37 |       !reference_type ||
38 |       !inspector ||
39 |       !status ||
40 |       !Array.isArray(items) ||
41 |       items.length === 0
42 |     ) {
43 |       return Response.json({ error: "❌ All fields are required" }, { status: 400 });
44 |     }
45 | 
46 |     // 2️⃣ Insert QC Header (quality_checks table)
47 |     const [result] = await db.query(
48 |       `INSERT INTO quality_checks (qc_number, qc_date, receipt_id, item_id, checked_qty, status, remarks, created_at, inspector)
49 |        VALUES (?, ?, NULL, NULL, 0, ?, ?, NOW(), ?)`,
50 |       [qc_number, qc_date, status, remarks || null, inspector]
51 |     );
52 | 
53 |     const qc_id = result.insertId;
54 | 
55 |     // 3️⃣ Insert QC Items (quality_check_items table)
56 |     for (const item of items) {
57 |       if (!item.item_id || !item.qty) continue;
58 | 
59 |       await db.query(
60 |         `INSERT INTO quality_check_items (qc_id, item_id, qty, result, remarks)
61 |          VALUES (?, ?, ?, ?, ?)`,
62 |         [qc_id, item.item_id, item.qty, item.result || "pending", item.remarks || null]
63 |       );
64 |     }
65 | 
66 |     return Response.json({
67 |       message: "✅ QC created successfully",
68 |       qc_id,
69 |       qc_number,
70 |     });
71 |   } catch (error) {
72 |     console.error("❌ QC POST Error:", error);
73 |     return Response.json({ error: error.message }, { status: 500 });
74 |   }
75 | }
76 | 


--------------------------------------------------------------------------------
/src/app/api/stock-adjustments/route.js:
--------------------------------------------------------------------------------
  1 | import { db } from "@/lib/db";
  2 | 
  3 | // =========================
  4 | // ✅ GET - List Stock Adjustments
  5 | // =========================
  6 | export async function GET() {
  7 |   try {
  8 |     const [rows] = await db.query(`
  9 |       SELECT sa.*, i.item_name, i.item_code, w.warehouse_name
 10 |       FROM stock_adjustments sa
 11 |       JOIN items i ON sa.item_id = i.id
 12 |       JOIN warehouses w ON sa.warehouse_id = w.id
 13 |       ORDER BY sa.id DESC
 14 |     `);
 15 | 
 16 |     return Response.json(rows);
 17 |   } catch (error) {
 18 |     console.error("❌ Stock Adjustment GET Error:", error);
 19 |     return Response.json({ error: error.message }, { status: 500 });
 20 |   }
 21 | }
 22 | 
 23 | // =========================
 24 | // ✅ POST - Create Stock Adjustment
 25 | // =========================
 26 | export async function POST(request) {
 27 |   try {
 28 |     const body = await request.json();
 29 |     const { warehouse_id, item_id, adjustment_type, qty, reason } = body;
 30 | 
 31 |     if (!warehouse_id || !item_id || !adjustment_type || !qty) {
 32 |       return Response.json({ error: "❌ All fields are required." }, { status: 400 });
 33 |     }
 34 | 
 35 |     // 🔹 Auto Number Generate
 36 |     const [last] = await db.query(
 37 |       `SELECT adjustment_number FROM stock_adjustments ORDER BY id DESC LIMIT 1`
 38 |     );
 39 |     let nextNumber = "ADJ-0001";
 40 |     if (last.length > 0 && last[0].adjustment_number) {
 41 |       const lastNum = parseInt(last[0].adjustment_number.replace("ADJ-", "")) || 0;
 42 |       nextNumber = "ADJ-" + String(lastNum + 1).padStart(4, "0");
 43 |     }
 44 | 
 45 |     // 🔹 Insert Adjustment
 46 |     const [result] = await db.query(
 47 |       `INSERT INTO stock_adjustments 
 48 |        (adjustment_number, warehouse_id, item_id, adjustment_type, qty, reason) 
 49 |        VALUES (?, ?, ?, ?, ?, ?)`,
 50 | 
 51 |       [nextNumber, warehouse_id, item_id, adjustment_type, qty, reason || null]
 52 |     );
 53 | 
 54 |     const adjustment_id = result.insertId;
 55 | 
 56 |     // 🔹 Last Balance निकालो
 57 |     const [lastBalance] = await db.query(
 58 |       `SELECT balance_qty FROM stock_ledger 
 59 |        WHERE item_id=? AND warehouse_id=? 
 60 |        ORDER BY id DESC LIMIT 1`,
 61 |       [item_id, warehouse_id]
 62 |     );
 63 |     const prevBalance = lastBalance.length ? Number(lastBalance[0].balance_qty) : 0;
 64 | 
 65 |     // 🔹 New Balance
 66 |     const newBalance =
 67 |       adjustment_type === "IN"
 68 |         ? prevBalance + Number(qty)
 69 |         : prevBalance - Number(qty);
 70 | 
 71 |     // 🔹 Insert Stock Ledger
 72 |     await db.query(
 73 |       `INSERT INTO stock_ledger 
 74 |        (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, remarks, created_at) 
 75 |        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
 76 |       [
 77 |         item_id,
 78 |         warehouse_id,
 79 |         null, // location_id
 80 |         adjustment_type,
 81 |         "Adjustment",
 82 |         adjustment_id,
 83 |         nextNumber,
 84 |         Date.now(),
 85 |         qty,
 86 |         newBalance,
 87 |         reason || "Stock Adjustment",
 88 |       ]
 89 |     );
 90 | 
 91 |     return Response.json({
 92 |       message: "✅ Stock Adjustment created successfully",
 93 |       adjustment_id,
 94 |       adjustment_number: nextNumber,
 95 |     });
 96 |   } catch (error) {
 97 |     console.error("❌ Stock Adjustment POST Error:", error);
 98 |     return Response.json({ error: error.message }, { status: 500 });
 99 |   }
100 | }
101 | 


--------------------------------------------------------------------------------
/src/app/api/stock-ledger/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Stock Ledger (with filters)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const transaction_type = searchParams.get("transaction_type");
 8 |     const search = searchParams.get("search");
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         sl.id,
13 |         sl.created_at AS transaction_date,   -- तुमने transaction_date column नहीं रखा, इसलिए created_at इस्तेमाल किया
14 |         sl.transaction_type,
15 |         sl.reference_type,
16 |         sl.reference_id,
17 |         sl.transaction_ref,
18 |         sl.transaction_id,
19 |         sl.qty,
20 |         sl.balance_qty,
21 |         sl.remarks,
22 |         i.item_code,
23 |         i.item_name,
24 |         w.warehouse_name,
25 |         l.location_name,
26 |         CASE WHEN sl.transaction_type = 'IN' THEN sl.qty ELSE 0 END AS in_qty,
27 |         CASE WHEN sl.transaction_type = 'OUT' THEN sl.qty ELSE 0 END AS out_qty
28 |       FROM stock_ledger sl
29 |       JOIN items i ON sl.item_id = i.id
30 |       JOIN warehouses w ON sl.warehouse_id = w.id
31 |       LEFT JOIN locations l ON sl.location_id = l.id
32 |       WHERE 1=1
33 |     `;
34 |     const params = [];
35 | 
36 |     // Filter by transaction_type
37 |     if (transaction_type) {
38 |       query += ` AND sl.transaction_type = ?`;
39 |       params.push(transaction_type);
40 |     }
41 | 
42 |     // Search filter
43 |     if (search) {
44 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ? OR l.location_name LIKE ?)`;
45 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
46 |     }
47 | 
48 |     query += ` ORDER BY sl.created_at DESC, sl.id DESC`;
49 | 
50 |     const [rows] = await db.query(query, params);
51 |     return Response.json(rows);
52 |   } catch (error) {
53 |     console.error("❌ GET Stock Ledger Error:", error);
54 |     return Response.json({ error: error.message }, { status: 500 });
55 |   }
56 | }
57 | 


--------------------------------------------------------------------------------
/src/app/api/stock/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET - Stock Ledger (with filters)
 4 | export async function GET(request) {
 5 |   try {
 6 |     const { searchParams } = new URL(request.url);
 7 |     const transaction_type = searchParams.get("transaction_type");
 8 |     const search = searchParams.get("search");
 9 | 
10 |     let query = `
11 |       SELECT 
12 |         sl.id,
13 |         sl.transaction_date,
14 |         sl.transaction_type,
15 |         sl.reference_type,
16 |         sl.reference_id,
17 |         sl.remarks,
18 |         i.item_code,
19 |         i.item_name,
20 |         l.location_name,
21 |         w.warehouse_name,
22 |         CASE WHEN sl.transaction_type IN ('purchase','adjustment','production') THEN sl.qty ELSE 0 END AS in_qty,
23 |         CASE WHEN sl.transaction_type = 'sale' THEN sl.qty ELSE 0 END AS out_qty
24 |       FROM stock_ledger sl
25 |       JOIN items i ON sl.item_id = i.id
26 |       JOIN warehouses w ON sl.warehouse_id = w.id
27 |       LEFT JOIN locations l ON sl.location_id = l.id
28 |       WHERE 1=1
29 |     `;
30 |     const params = [];
31 | 
32 |     // 🔹 Filter by transaction_type
33 |     if (transaction_type) {
34 |       query += ` AND sl.transaction_type = ?`;
35 |       params.push(transaction_type);
36 |     }
37 | 
38 |     // 🔹 Search filter
39 |     if (search) {
40 |       query += ` AND (i.item_code LIKE ? OR i.item_name LIKE ? OR w.warehouse_name LIKE ? OR l.location_name LIKE ?)`;
41 |       params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
42 |     }
43 | 
44 |     query += ` ORDER BY sl.transaction_date DESC, sl.id DESC`;
45 | 
46 |     const [rows] = await db.query(query, params);
47 |     return Response.json(rows);
48 |   } catch (error) {
49 |     console.error("❌ GET Stock Ledger Error:", error);
50 |     return Response.json({ error: error.message }, { status: 500 });
51 |   }
52 | }
53 |     


--------------------------------------------------------------------------------
/src/app/api/suppliers/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET one supplier
 4 | export async function GET(req, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM suppliers WHERE id = ?", [
 7 |       params.id,
 8 |     ]);
 9 | 
10 |     if (rows.length === 0) {
11 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
12 |     }
13 | 
14 |     return Response.json(rows[0]);
15 |   } catch (error) {
16 |     return Response.json({ error: error.message }, { status: 500 });
17 |   }
18 | }
19 | 
20 | // ✅ UPDATE supplier
21 | export async function PUT(req, { params }) {
22 |   try {
23 |     const body = await req.json();
24 | 
25 |     const [result] = await db.query(
26 |       `UPDATE suppliers SET 
27 |         supplier_name=?, contact_person=?, email=?, phone=?, address=?, 
28 |         city=?, state=?, pincode=?, country=?, gst_number=?, pan_number=?, 
29 |         payment_terms=?, credit_limit=?, status=? 
30 |       WHERE id=?`,
31 |       [
32 |         body.supplier_name,
33 |         body.contact_person,
34 |         body.email,
35 |         body.phone,
36 |         body.address,
37 |         body.city,
38 |         body.state,
39 |         body.pincode,
40 |         body.country,
41 |         body.gst_number,
42 |         body.pan_number,
43 |         body.payment_terms,
44 |         body.credit_limit,
45 |         body.status,
46 |         params.id,
47 |       ]
48 |     );
49 | 
50 |     if (result.affectedRows === 0) {
51 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
52 |     }
53 | 
54 |     return Response.json({ message: "Supplier updated successfully" });
55 |   } catch (error) {
56 |     return Response.json({ error: error.message }, { status: 500 });
57 |   }
58 | }
59 | 
60 | // ✅ DELETE supplier
61 | export async function DELETE(req, { params }) {
62 |   try {
63 |     const [result] = await db.query("DELETE FROM suppliers WHERE id = ?", [
64 |       params.id,
65 |     ]);
66 | 
67 |     if (result.affectedRows === 0) {
68 |       return Response.json({ error: "Supplier not found" }, { status: 404 });
69 |     }
70 | 
71 |     return Response.json({ message: "Supplier deleted successfully" });
72 |   } catch (error) {
73 |     return Response.json({ error: error.message }, { status: 500 });
74 |   }
75 | }
76 | 


--------------------------------------------------------------------------------
/src/app/api/suppliers/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET all suppliers
 4 | export async function GET() {
 5 |   try {
 6 |     const [rows] = await db.query(
 7 |       "SELECT * FROM suppliers ORDER BY created_at DESC"
 8 |     );
 9 |     return Response.json(rows);
10 |   } catch (error) {
11 |     return Response.json({ error: error.message }, { status: 500 });
12 |   }
13 | }
14 | 
15 | // ✅ POST - create new supplier
16 | export async function POST(request) {
17 |   try {
18 |     const body = await request.json();
19 |     const {
20 |       supplier_name,
21 |       contact_person,
22 |       email,
23 |       phone,
24 |       address,
25 |       city,
26 |       state,
27 |       pincode,
28 |       country = "India",
29 |       gst_number,
30 |       pan_number,
31 |       payment_terms,
32 |       credit_limit = 0,
33 |       status = "active",
34 |     } = body;
35 | 
36 |     // 🔹 Auto-generate supplier_code
37 |     const [last] = await db.query(
38 |       "SELECT supplier_code FROM suppliers ORDER BY id DESC LIMIT 1"
39 |     );
40 | 
41 |     let newCode = "SUP001";
42 |     if (last.length > 0) {
43 |       const lastCode = last[0].supplier_code; // e.g. "SUP005"
44 |       const num = parseInt(lastCode.replace("SUP", "")) + 1;
45 |       newCode = "SUP" + num.toString().padStart(3, "0");
46 |     }
47 | 
48 |     // 🔹 Insert into DB
49 |     const [result] = await db.query(
50 |       `INSERT INTO suppliers 
51 |       (supplier_code, supplier_name, contact_person, email, phone, address, city, state, pincode, country, gst_number, pan_number, payment_terms, credit_limit, status)
52 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
53 |       [
54 |         newCode,
55 |         supplier_name,
56 |         contact_person,
57 |         email,
58 |         phone,
59 |         address,
60 |         city,
61 |         state,
62 |         pincode,
63 |         country,
64 |         gst_number,
65 |         pan_number,
66 |         payment_terms,
67 |         credit_limit,
68 |         status,
69 |       ]
70 |     );
71 | 
72 |     return Response.json({
73 |       id: result.insertId,
74 |       supplier_code: newCode,
75 |       ...body,
76 |     });
77 |   } catch (error) {
78 |     return Response.json({ error: error.message }, { status: 500 });
79 |   }
80 | }
81 | 


--------------------------------------------------------------------------------
/src/app/api/warehouses/[id]/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | // ✅ GET one warehouse
 4 | export async function GET(request, { params }) {
 5 |   try {
 6 |     const [rows] = await db.query("SELECT * FROM warehouses WHERE id = ?", [params.id]);
 7 |     if (rows.length === 0) {
 8 |       return Response.json({ error: "Warehouse not found" }, { status: 404 });
 9 |     }
10 |     return Response.json(rows[0]);
11 |   } catch (error) {
12 |     return Response.json({ error: error.message }, { status: 500 });
13 |   }
14 | }
15 | 
16 | // ✅ PUT - Update warehouse
17 | export async function PUT(request, { params }) {
18 |   try {
19 |     const body = await request.json();
20 |     const {
21 |       warehouse_name,
22 |       warehouse_code,
23 |       description,
24 |       address,
25 |       city,
26 |       state,
27 |       country = "India",
28 |       pincode,
29 |       contact_person,
30 |       phone,
31 |       email,
32 |       status = "active",
33 |     } = body;
34 | 
35 |     await db.query(
36 |       `UPDATE warehouses SET 
37 |       warehouse_name=?, warehouse_code=?, description=?, address=?, city=?, state=?, country=?, pincode=?, contact_person=?, phone=?, email=?, status=? 
38 |       WHERE id=?`,
39 |       [
40 |         warehouse_name,
41 |         warehouse_code,
42 |         description,
43 |         address,
44 |         city,
45 |         state,
46 |         country,
47 |         pincode,
48 |         contact_person,
49 |         phone,
50 |         email,
51 |         status,
52 |         params.id,
53 |       ]
54 |     );
55 | 
56 |     return Response.json({ message: "Warehouse updated successfully" });
57 |   } catch (error) {
58 |     return Response.json({ error: error.message }, { status: 500 });
59 |   }
60 | }
61 | 
62 | // ✅ DELETE - Remove warehouse
63 | export async function DELETE(request, { params }) {
64 |   try {
65 |     await db.query("DELETE FROM warehouses WHERE id = ?", [params.id]);
66 |     return Response.json({ message: "Warehouse deleted successfully" });
67 |   } catch (error) {
68 |     return Response.json({ error: error.message }, { status: 500 });
69 |   }
70 | }
71 | 


--------------------------------------------------------------------------------
/src/app/api/warehouses/route.js:
--------------------------------------------------------------------------------
 1 | import { db } from "@/lib/db";
 2 | 
 3 | export async function GET() {
 4 |   try {
 5 |     const [rows] = await db.query("SELECT * FROM warehouses ORDER BY created_at DESC");
 6 |     return Response.json(rows);
 7 |   } catch (error) {
 8 |     console.error("GET Warehouses Error:", error); // debugging
 9 |     return Response.json(
10 |       { error: error?.message || "Internal Server Error" },
11 |       { status: 500 }
12 |     );
13 |   }
14 | }
15 | 
16 | export async function POST(request) {
17 |   try {
18 |     const body = await request.json();
19 |     const {
20 |       warehouse_name,
21 |       warehouse_code,
22 |       description,
23 |       address,
24 |       city,
25 |       state,
26 |       country = "India",
27 |       pincode,
28 |       contact_person,
29 |       phone,
30 |       email,
31 |       status = "active",
32 |     } = body;
33 | 
34 |     if (!warehouse_name || !warehouse_code) {
35 |       return Response.json({ error: "Warehouse Name & Code are required" }, { status: 400 });
36 |     }
37 | 
38 |     const [result] = await db.query(
39 |       `INSERT INTO warehouses 
40 |       (warehouse_name, warehouse_code, description, address, city, state, country, pincode, contact_person, phone, email, status)
41 |       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
42 |       [
43 |         warehouse_name,
44 |         warehouse_code,
45 |         description || "",
46 |         address || "",
47 |         city || "",
48 |         state || "",
49 |         country,
50 |         pincode || "",
51 |         contact_person || "",
52 |         phone || "",
53 |         email || "",
54 |         status,
55 |       ]
56 |     );
57 | 
58 |     return Response.json({ id: result.insertId, ...body });
59 |   } catch (error) {
60 |     console.error("POST Warehouse Error:", error); // debugging
61 |     return Response.json(
62 |       { error: error?.message || "Internal Server Error" },
63 |       { status: 500 }
64 |     );
65 |   }
66 | }
67 | 


--------------------------------------------------------------------------------
/src/app/bom/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useEffect, useState } from "react";
  3 | import { useParams } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | export default function BOMDetailPage() {
  7 |   const { id } = useParams();
  8 |   const [bom, setBom] = useState(null);
  9 |   const [loading, setLoading] = useState(true);
 10 | 
 11 |   // Load BOM detail
 12 |   useEffect(() => {
 13 |     const fetchBom = async () => {
 14 |       try {
 15 |         const res = await fetch(`/api/bom/${id}`);
 16 |         if (res.ok) {
 17 |           setBom(await res.json());
 18 |         }
 19 |       } catch (err) {
 20 |         console.error("Error loading BOM:", err);
 21 |       } finally {
 22 |         setLoading(false);
 23 |       }
 24 |     };
 25 |     if (id) fetchBom();
 26 |   }, [id]);
 27 | 
 28 |   if (loading) return <div className="container py-5">Loading...</div>;
 29 |   if (!bom) return <div className="container py-5">❌ BOM not found</div>;
 30 | 
 31 |   return (
 32 |     <div className="container-fluid">
 33 |       {/* Header */}
 34 |       <div className="row mb-4">
 35 |         <div className="col-12 d-flex justify-content-between align-items-center">
 36 |           <h1 className="h3 mb-0">
 37 |             <i className="bi bi-diagram-3 text-primary"></i> BOM Detail
 38 |           </h1>
 39 |           <Link href="/bom" className="btn btn-outline-secondary">
 40 |             <i className="bi bi-arrow-left me-2"></i> Back to BOMs
 41 |           </Link>
 42 |         </div>
 43 |       </div>
 44 | 
 45 |       {/* BOM Info */}
 46 |       <div className="card border-0 shadow-sm mb-4">
 47 |         <div className="card-header">
 48 |           <h5 className="mb-0">BOM Information</h5>
 49 |         </div>
 50 |         <div className="card-body">
 51 |           <div className="row">
 52 |             <div className="col-md-4 mb-3">
 53 |               <strong>Finished Product:</strong>
 54 |               <p>{bom.product_name} ({bom.product_code})</p>
 55 |             </div>
 56 |             <div className="col-md-2 mb-3">
 57 |               <strong>Version:</strong>
 58 |               <p>{bom.version}</p>
 59 |             </div>
 60 |             <div className="col-md-2 mb-3">
 61 |               <strong>Status:</strong>
 62 |               <p>
 63 |                 <span className={`badge bg-${bom.status === "active" ? "success" : "secondary"}`}>
 64 |                   {bom.status}
 65 |                 </span>
 66 |               </p>
 67 |             </div>
 68 |             <div className="col-md-4 mb-3">
 69 |               <strong>Created At:</strong>
 70 |               <p>{new Date(bom.created_at).toLocaleDateString()}</p>
 71 |             </div>
 72 |           </div>
 73 |         </div>
 74 |       </div>
 75 | 
 76 |       {/* Components Table */}
 77 |       <div className="card border-0 shadow-sm">
 78 |         <div className="card-header">
 79 |           <h5 className="mb-0">Components</h5>
 80 |         </div>
 81 |         <div className="card-body">
 82 |           {bom.components && bom.components.length > 0 ? (
 83 |             <div className="table-responsive">
 84 |               <table className="table table-hover align-middle">
 85 |                 <thead className="table-light">
 86 |                   <tr>
 87 |                     <th>Item Code</th>
 88 |                     <th>Item Name</th>
 89 |                     <th>Quantity</th>
 90 |                   </tr>
 91 |                 </thead>
 92 |                 <tbody>
 93 |                   {bom.components.map((comp) => (
 94 |                     <tr key={comp.id}>
 95 |                       <td>{comp.item_code}</td>
 96 |                       <td>{comp.item_name}</td>
 97 |                       <td>{comp.qty}</td>
 98 |                     </tr>
 99 |                   ))}
100 |                 </tbody>
101 |               </table>
102 |             </div>
103 |           ) : (
104 |             <p className="text-muted">No components found for this BOM</p>
105 |           )}
106 |         </div>
107 |       </div>
108 |     </div>
109 |   );
110 | }
111 | 


--------------------------------------------------------------------------------
/src/app/favicon.ico:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/nitin04032/erp-manufacuring-v1/9e0c462184cf5a8a5f2502b55c588933769b1662/src/app/favicon.ico


--------------------------------------------------------------------------------
/src/app/fg-receipt/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | 
  3 | import { useState, useEffect } from "react";
  4 | import Link from "next/link";
  5 | 
  6 | export default function FinishedGoodsReceipt() {
  7 |   const [fgrList, setFgrList] = useState([]);
  8 | 
  9 |   useEffect(() => {
 10 |     fetchFGR();
 11 |   }, []);
 12 | 
 13 |   const fetchFGR = async () => {
 14 |     try {
 15 |       const res = await fetch("/api/fgr");
 16 |       if (!res.ok) throw new Error("Failed to fetch FGR list");
 17 |       const data = await res.json();
 18 |       setFgrList(data);
 19 |     } catch (err) {
 20 |       console.error("Error fetching FGR list:", err);
 21 |     }
 22 |   };
 23 | 
 24 |   return (
 25 |     <div className="container-fluid">
 26 |       {/* Header */}
 27 |       <div className="row mb-4">
 28 |         <div className="col-12 d-flex justify-content-between align-items-center">
 29 |           <h1 className="h3 mb-0">
 30 |             <i className="bi bi-box-arrow-in-down text-primary"></i> Finished
 31 |             Goods Receipt
 32 |           </h1>
 33 |           <Link href="/fg-receipt/create" className="btn btn-primary">
 34 |             <i className="bi bi-plus-circle me-2"></i>Record Receipt
 35 |           </Link>
 36 |         </div>
 37 |       </div>
 38 | 
 39 |       {/* List */}
 40 |       <div className="card border-0 shadow-sm">
 41 |         <div className="card-body">
 42 |           {fgrList.length === 0 ? (
 43 |             <div className="text-center py-5">
 44 |               <i className="bi bi-box-arrow-in-down fs-1 text-muted"></i>
 45 |               <h4 className="mt-3 text-muted">
 46 |                 No Finished Goods Receipts Found
 47 |               </h4>
 48 |               <p className="text-muted">
 49 |                 Record your first finished goods receipt after production
 50 |               </p>
 51 |               <Link href="/fg-receipt/create" className="btn btn-primary">
 52 |                 <i className="bi bi-plus-circle me-2"></i>Record Receipt
 53 |               </Link>
 54 |             </div>
 55 |           ) : (
 56 |             <div className="table-responsive">
 57 |               <table className="table table-hover align-middle">
 58 |                 <thead className="table-light">
 59 |                   <tr>
 60 |                     <th>Receipt No</th>
 61 |                     <th>Production Order</th>
 62 |                     <th>Product</th>
 63 |                     <th>Quantity</th>
 64 |                     <th>Warehouse</th>
 65 |                     <th>Date</th>
 66 |                     <th>Status</th>
 67 |                     <th>Actions</th>
 68 |                   </tr>
 69 |                 </thead>
 70 |                 <tbody>
 71 |                   {fgrList.map((fgr) => (
 72 |                     <tr key={fgr.id}>
 73 |                       <td>
 74 |                         <strong>{fgr.receipt_number}</strong>
 75 |                       </td>
 76 |                       <td>{fgr.production_order_no}</td>
 77 |                       <td>{fgr.item_name}</td>
 78 |                       <td>
 79 |                         {Number(fgr.quantity).toFixed(2)} {fgr.uom}
 80 |                       </td>
 81 |                       <td>{fgr.warehouse_name}</td>
 82 |                       <td>
 83 |                         {new Date(fgr.receipt_date).toLocaleDateString("en-GB", {
 84 |                           day: "2-digit",
 85 |                           month: "short",
 86 |                           year: "numeric",
 87 |                         })}
 88 |                       </td>
 89 |                       <td>
 90 |                         <span
 91 |                           className={`badge bg-${
 92 |                             fgr.status === "confirmed" ? "success" : "secondary"
 93 |                           }`}
 94 |                         >
 95 |                           {fgr.status.charAt(0).toUpperCase() +
 96 |                             fgr.status.slice(1)}
 97 |                         </span>
 98 |                       </td>
 99 |                       <td>
100 |                         <div className="btn-group btn-group-sm">
101 |                           <Link
102 |                             href={`/fg-receipt/${fgr.id}`}
103 |                             className="btn btn-outline-primary"
104 |                             title="View"
105 |                           >
106 |                             <i className="bi bi-eye"></i>
107 |                           </Link>
108 |                           <Link
109 |                             href={`/fg-receipt/${fgr.id}/edit`}
110 |                             className="btn btn-outline-secondary"
111 |                             title="Edit"
112 |                           >
113 |                             <i className="bi bi-pencil"></i>
114 |                           </Link>
115 |                         </div>
116 |                       </td>
117 |                     </tr>
118 |                   ))}
119 |                 </tbody>
120 |               </table>
121 |             </div>
122 |           )}
123 |         </div>
124 |       </div>
125 |     </div>
126 |   );
127 | }
128 | 


--------------------------------------------------------------------------------
/src/app/grn/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useState, useEffect } from "react";
  3 | import Link from "next/link";
  4 | import { useParams } from "next/navigation";
  5 | 
  6 | export default function GRNDetailsPage() {
  7 |   const { id } = useParams();
  8 |   const [grn, setGrn] = useState(null);
  9 |   const [flash, setFlash] = useState({ type: "", message: "" });
 10 | 
 11 |   useEffect(() => {
 12 |     const fetchData = async () => {
 13 |       try {
 14 |         const res = await fetch(`/api/grn/${id}`);
 15 |         if (res.ok) {
 16 |           setGrn(await res.json());
 17 |         } else {
 18 |           setFlash({ type: "danger", message: "GRN not found." });
 19 |         }
 20 |       } catch (err) {
 21 |         setFlash({ type: "danger", message: "Error loading GRN." });
 22 |       }
 23 |     };
 24 |     fetchData();
 25 |   }, [id]);
 26 | 
 27 |   if (!grn) return <div className="p-4">Loading...</div>;
 28 | 
 29 |   return (
 30 |     <div className="container-fluid">
 31 |       {/* Header */}
 32 |       <div className="d-flex justify-content-between align-items-center mb-4">
 33 |         <h1 className="h3">
 34 |           <i className="bi bi-box-arrow-in-down text-primary"></i> GRN #
 35 |           {grn.id}
 36 |         </h1>
 37 |         <div>
 38 |           <Link href="/grn" className="btn btn-outline-secondary me-2">
 39 |             <i className="bi bi-arrow-left me-2"></i> Back to List
 40 |           </Link>
 41 |           <Link
 42 |             href={`/grn/${grn.id}/edit`}
 43 |             className="btn btn-outline-warning"
 44 |           >
 45 |             <i className="bi bi-pencil me-2"></i> Edit
 46 |           </Link>
 47 |         </div>
 48 |       </div>
 49 | 
 50 |       {/* Flash */}
 51 |       {flash.message && (
 52 |         <div
 53 |           className={`alert alert-${flash.type} alert-dismissible fade show`}
 54 |         >
 55 |           {flash.message}
 56 |           <button
 57 |             type="button"
 58 |             className="btn-close"
 59 |             onClick={() => setFlash({ type: "", message: "" })}
 60 |           ></button>
 61 |         </div>
 62 |       )}
 63 | 
 64 |       {/* GRN Header */}
 65 |       <div className="row">
 66 |         <div className="col-md-8">
 67 |           <div className="card shadow-sm mb-4">
 68 |             <div className="card-header fw-bold">GRN Details</div>
 69 |             <div className="card-body">
 70 |               <p>
 71 |                 <strong>Receipt Number:</strong> {grn.receipt_number}
 72 |               </p>
 73 |               <p>
 74 |                 <strong>Purchase Order:</strong> {grn.po_number}
 75 |               </p>
 76 |               <p>
 77 |                 <strong>Supplier:</strong> {grn.supplier_name}
 78 |               </p>
 79 |               <p>
 80 |                 <strong>Receipt Date:</strong> {grn.receipt_date}
 81 |               </p>
 82 |               {grn.remarks && (
 83 |                 <p>
 84 |                   <strong>Remarks:</strong> {grn.remarks}
 85 |                 </p>
 86 |               )}
 87 |             </div>
 88 |           </div>
 89 |         </div>
 90 | 
 91 |         {/* Summary */}
 92 |         <div className="col-md-4">
 93 |           <div className="card shadow-sm">
 94 |             <div className="card-header fw-bold">Summary</div>
 95 |             <div className="card-body">
 96 |               <p>
 97 |                 <strong>Status:</strong>{" "}
 98 |                 <span
 99 |                   className={`badge bg-${
100 |                     grn.status === "draft" ? "secondary" : "success"
101 |                   }`}
102 |                 >
103 |                   {grn.status}
104 |                 </span>
105 |               </p>
106 |               <p>
107 |                 <strong>Total Items:</strong> {grn.items?.length || 0}
108 |               </p>
109 |             </div>
110 |           </div>
111 |         </div>
112 |       </div>
113 | 
114 |       {/* Items */}
115 |       <div className="card shadow-sm mt-4">
116 |         <div className="card-header fw-bold">Received Items</div>
117 |         <div className="card-body table-responsive">
118 |           {(!grn.items || grn.items.length === 0) ? (
119 |             <p className="text-muted">No items found for this GRN.</p>
120 |           ) : (
121 |             <table className="table table-hover align-middle">
122 |               <thead>
123 |                 <tr>
124 |                   <th>Item</th>
125 |                   <th>Ordered Qty</th>
126 |                   <th>Received Qty</th>
127 |                   <th>UOM</th>
128 |                   <th>Remarks</th>
129 |                 </tr>
130 |               </thead>
131 |               <tbody>
132 |                 {grn.items.map((item, i) => (
133 |                   <tr key={i}>
134 |                     <td>
135 |                       {item.item_name} ({item.item_code})
136 |                     </td>
137 |                     <td>{item.ordered_qty}</td>
138 |                     <td>{item.received_qty}</td>
139 |                     <td>{item.uom}</td>
140 |                     <td>{item.remarks || "-"}</td>
141 |                   </tr>
142 |                 ))}
143 |               </tbody>
144 |             </table>
145 |           )}
146 |         </div>
147 |       </div>
148 |     </div>
149 |   );
150 | }
151 | 


--------------------------------------------------------------------------------
/src/app/layout.js:
--------------------------------------------------------------------------------
 1 | import "./globals.css";
 2 | import Script from "next/script";
 3 | import Navbar from "./navbar"; // client navbar component
 4 | 
 5 | export const metadata = {
 6 |   title: "My ERP System",
 7 |   description: "Manufacturing ERP built with Next.js",
 8 | };
 9 | 
10 | export default function RootLayout({ children }) {
11 |   return (
12 |     <html lang="en">
13 |       <head>
14 |         {/* Bootstrap 5 CSS */}
15 |         <link
16 |           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
17 |           rel="stylesheet"
18 |         />
19 | 
20 |         {/* Bootstrap Icons */}
21 |         <link
22 |           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
23 |           rel="stylesheet"
24 |         />
25 | 
26 |         {/* Google Fonts */}
27 |         <link
28 |           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
29 |           rel="stylesheet"
30 |         />
31 | 
32 |         {/* Custom CSS */}
33 |         <link href="/assets/css/app.css" rel="stylesheet" />
34 |       </head>
35 |       <body>
36 |         {/* Navbar */}
37 |         <Navbar />
38 | 
39 |         {/* Main Content */}
40 |         <main className="container-fluid mt-4">{children}</main>
41 | 
42 |         {/* Footer */}
43 |         <footer className="bg-light mt-5 py-3 border-top">
44 |           <div className="container text-center small text-muted">
45 |             &copy; {new Date().getFullYear()} My ERP System — Version 1.0.0
46 |           </div>
47 |         </footer>
48 | 
49 |         {/* ✅ Bootstrap JS Bundle (with Popper) */}
50 |         <Script
51 |           src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
52 |           strategy="afterInteractive"
53 |         />
54 | 
55 |         {/* GSAP */}
56 |         <Script
57 |           src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
58 |           strategy="afterInteractive"
59 |         />
60 | 
61 |         {/* Custom JS */}
62 |         <Script src="/assets/js/app.js" strategy="afterInteractive" />
63 |       </body>
64 |     </html>
65 |   );
66 | }
67 | 


--------------------------------------------------------------------------------
/src/app/material-requisition/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useEffect, useState } from "react";
  3 | import { useParams } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | function formatDate(d) {
  7 |   return new Date(d).toLocaleDateString("en-GB");
  8 | }
  9 | 
 10 | export default function RequisitionDetail() {
 11 |   const { id } = useParams();
 12 |   const [requisition, setRequisition] = useState(null);
 13 |   const [loading, setLoading] = useState(true);
 14 | 
 15 |   useEffect(() => {
 16 |     setLoading(true);
 17 |     fetch(`/api/material-requisition/${id}`)
 18 |       .then(async (r) => {
 19 |         if (r.ok) setRequisition(await r.json());
 20 |       })
 21 |       .catch(console.error)
 22 |       .finally(() => setLoading(false));
 23 |   }, [id]);
 24 | 
 25 |   if (loading) return <div className="container py-5">Loading...</div>;
 26 |   if (!requisition) return <div className="container py-5">Not found</div>;
 27 | 
 28 |   return (
 29 |     <div className="container-fluid">
 30 |       <div className="d-flex justify-content-between align-items-center mb-4">
 31 |         <h1 className="h3">
 32 |           <i className="bi bi-clipboard-data text-primary"></i> Requisition{" "}
 33 |           {requisition.requisition_no}
 34 |         </h1>
 35 |         <div>
 36 |           <Link
 37 |             href="/material-requisition"
 38 |             className="btn btn-outline-secondary me-2"
 39 |           >
 40 |             Back
 41 |           </Link>
 42 |           {requisition.status === "draft" && (
 43 |             <Link
 44 |               href={`/material-requisition/${id}/edit`}
 45 |               className="btn btn-primary"
 46 |             >
 47 |               Edit
 48 |             </Link>
 49 |           )}
 50 |         </div>
 51 |       </div>
 52 | 
 53 |       <div className="card mb-3">
 54 |         <div className="card-body">
 55 |           <p>
 56 |             <strong>Requested By:</strong>{" "}
 57 |             {requisition.requested_by_name || requisition.requested_by}
 58 |           </p>
 59 |           <p>
 60 |             <strong>Production Order:</strong>{" "}
 61 |             {requisition.production_order_no || "-"}
 62 |           </p>
 63 |           <p>
 64 |             <strong>Date:</strong> {formatDate(requisition.requisition_date)}
 65 |           </p>
 66 |           <p>
 67 |             <strong>Status:</strong>{" "}
 68 |             <span
 69 |               className={`badge bg-${
 70 |                 requisition.status === "draft"
 71 |                   ? "secondary"
 72 |                   : requisition.status === "submitted"
 73 |                   ? "info"
 74 |                   : requisition.status === "approved"
 75 |                   ? "success"
 76 |                   : "danger"
 77 |               }`}
 78 |             >
 79 |               {requisition.status}
 80 |             </span>
 81 |           </p>
 82 |           <p>
 83 |             <strong>Remarks:</strong> {requisition.remarks || "-"}
 84 |           </p>
 85 |         </div>
 86 |       </div>
 87 | 
 88 |       <div className="card">
 89 |         <div className="card-header">Items</div>
 90 |         <div className="card-body">
 91 |           {requisition.items?.length > 0 ? (
 92 |             <table className="table">
 93 |               <thead>
 94 |                 <tr>
 95 |                   <th>Code</th>
 96 |                   <th>Name</th>
 97 |                   <th>Required Qty</th>
 98 |                   <th>Issued Qty</th>
 99 |                   <th>UOM</th>
100 |                 </tr>
101 |               </thead>
102 |               <tbody>
103 |                 {requisition.items.map((it, i) => (
104 |                   <tr key={it.id || i}>
105 |                     <td>{it.item_code}</td>
106 |                     <td>{it.item_name}</td>
107 |                     <td>{Number(it.qty).toFixed(3)}</td>
108 |                     <td>{Number(it.issued_qty || 0).toFixed(3)}</td>
109 |                     <td>{it.uom || "-"}</td>
110 |                   </tr>
111 |                 ))}
112 |               </tbody>
113 |             </table>
114 |           ) : (
115 |             <p>No items</p>
116 |           )}
117 |         </div>
118 |       </div>
119 |     </div>
120 |   );
121 | }
122 | 


--------------------------------------------------------------------------------
/src/app/page.module.css:
--------------------------------------------------------------------------------
  1 | .page {
  2 |   --gray-rgb: 0, 0, 0;
  3 |   --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  4 |   --gray-alpha-100: rgba(var(--gray-rgb), 0.05);
  5 | 
  6 |   --button-primary-hover: #383838;
  7 |   --button-secondary-hover: #f2f2f2;
  8 | 
  9 |   display: grid;
 10 |   grid-template-rows: 20px 1fr 20px;
 11 |   align-items: center;
 12 |   justify-items: center;
 13 |   min-height: 100svh;
 14 |   padding: 80px;
 15 |   gap: 64px;
 16 |   font-family: var(--font-geist-sans);
 17 | }
 18 | 
 19 | @media (prefers-color-scheme: dark) {
 20 |   .page {
 21 |     --gray-rgb: 255, 255, 255;
 22 |     --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
 23 |     --gray-alpha-100: rgba(var(--gray-rgb), 0.06);
 24 | 
 25 |     --button-primary-hover: #ccc;
 26 |     --button-secondary-hover: #1a1a1a;
 27 |   }
 28 | }
 29 | 
 30 | .main {
 31 |   display: flex;
 32 |   flex-direction: column;
 33 |   gap: 32px;
 34 |   grid-row-start: 2;
 35 | }
 36 | 
 37 | .main ol {
 38 |   font-family: var(--font-geist-mono);
 39 |   padding-left: 0;
 40 |   margin: 0;
 41 |   font-size: 14px;
 42 |   line-height: 24px;
 43 |   letter-spacing: -0.01em;
 44 |   list-style-position: inside;
 45 | }
 46 | 
 47 | .main li:not(:last-of-type) {
 48 |   margin-bottom: 8px;
 49 | }
 50 | 
 51 | .main code {
 52 |   font-family: inherit;
 53 |   background: var(--gray-alpha-100);
 54 |   padding: 2px 4px;
 55 |   border-radius: 4px;
 56 |   font-weight: 600;
 57 | }
 58 | 
 59 | .ctas {
 60 |   display: flex;
 61 |   gap: 16px;
 62 | }
 63 | 
 64 | .ctas a {
 65 |   appearance: none;
 66 |   border-radius: 128px;
 67 |   height: 48px;
 68 |   padding: 0 20px;
 69 |   border: 1px solid transparent;
 70 |   transition:
 71 |     background 0.2s,
 72 |     color 0.2s,
 73 |     border-color 0.2s;
 74 |   cursor: pointer;
 75 |   display: flex;
 76 |   align-items: center;
 77 |   justify-content: center;
 78 |   font-size: 16px;
 79 |   line-height: 20px;
 80 |   font-weight: 500;
 81 | }
 82 | 
 83 | a.primary {
 84 |   background: var(--foreground);
 85 |   color: var(--background);
 86 |   gap: 8px;
 87 | }
 88 | 
 89 | a.secondary {
 90 |   border-color: var(--gray-alpha-200);
 91 |   min-width: 158px;
 92 | }
 93 | 
 94 | .footer {
 95 |   grid-row-start: 3;
 96 |   display: flex;
 97 |   gap: 24px;
 98 | }
 99 | 
100 | .footer a {
101 |   display: flex;
102 |   align-items: center;
103 |   gap: 8px;
104 | }
105 | 
106 | .footer img {
107 |   flex-shrink: 0;
108 | }
109 | 
110 | /* Enable hover only on non-touch devices */
111 | @media (hover: hover) and (pointer: fine) {
112 |   a.primary:hover {
113 |     background: var(--button-primary-hover);
114 |     border-color: transparent;
115 |   }
116 | 
117 |   a.secondary:hover {
118 |     background: var(--button-secondary-hover);
119 |     border-color: transparent;
120 |   }
121 | 
122 |   .footer a:hover {
123 |     text-decoration: underline;
124 |     text-underline-offset: 4px;
125 |   }
126 | }
127 | 
128 | @media (max-width: 600px) {
129 |   .page {
130 |     padding: 32px;
131 |     padding-bottom: 80px;
132 |   }
133 | 
134 |   .main {
135 |     align-items: center;
136 |   }
137 | 
138 |   .main ol {
139 |     text-align: center;
140 |   }
141 | 
142 |   .ctas {
143 |     flex-direction: column;
144 |   }
145 | 
146 |   .ctas a {
147 |     font-size: 14px;
148 |     height: 40px;
149 |     padding: 0 16px;
150 |   }
151 | 
152 |   a.secondary {
153 |     min-width: auto;
154 |   }
155 | 
156 |   .footer {
157 |     flex-wrap: wrap;
158 |     align-items: center;
159 |     justify-content: center;
160 |   }
161 | }
162 | 
163 | @media (prefers-color-scheme: dark) {
164 |   .logo {
165 |     filter: invert();
166 |   }
167 | }
168 | 


--------------------------------------------------------------------------------
/src/app/production-orders/[id]/page.js:
--------------------------------------------------------------------------------
 1 | "use client";
 2 | import { useEffect, useState } from "react";
 3 | import { useParams } from "next/navigation";
 4 | import Link from "next/link";
 5 | 
 6 | export default function ProductionOrderDetail() {
 7 |   const { id } = useParams();
 8 |   const [order, setOrder] = useState(null);
 9 |   const [loading, setLoading] = useState(true);
10 | 
11 |   useEffect(() => {
12 |     if (id) {
13 |       fetch(`/api/production-orders/${id}`)
14 |         .then((res) => res.json())
15 |         .then((data) => {
16 |           setOrder(data);
17 |           setLoading(false);
18 |         })
19 |         .catch(() => setLoading(false));
20 |     }
21 |   }, [id]);
22 | 
23 |   if (loading) return <div className="container py-5">Loading...</div>;
24 |   if (!order) return <div className="container py-5">❌ Order not found</div>;
25 | 
26 |   return (
27 |     <div className="container-fluid">
28 |       <div className="d-flex justify-content-between align-items-center mb-4">
29 |         <h1 className="h3">
30 |           <i className="bi bi-gear text-primary"></i> Production Order Detail
31 |         </h1>
32 |         <Link href="/production-orders" className="btn btn-outline-secondary">
33 |           <i className="bi bi-arrow-left me-2"></i>Back
34 |         </Link>
35 |       </div>
36 | 
37 |       {/* Order Info */}
38 |       <div className="card border-0 shadow-sm mb-4">
39 |         <div className="card-body">
40 |           <p><strong>Order No:</strong> {order.order_number}</p>
41 |           <p><strong>Product:</strong> {order.fg_name} ({order.fg_code})</p>
42 |           <p><strong>BOM Version:</strong> {order.bom_version}</p>
43 |           <p><strong>Quantity:</strong> {order.order_qty}</p>
44 |           <p><strong>Status:</strong> {order.status}</p>
45 |           <p><strong>Remarks:</strong> {order.remarks || "-"}</p>
46 |         </div>
47 |       </div>
48 | 
49 |       {/* Components */}
50 |       <div className="card border-0 shadow-sm">
51 |         <div className="card-header">Components</div>
52 |         <div className="card-body">
53 |           {order.components?.length > 0 ? (
54 |             <table className="table table-hover">
55 |               <thead>
56 |                 <tr>
57 |                   <th>Item Code</th>
58 |                   <th>Item Name</th>
59 |                   <th>Planned Qty</th>
60 |                   <th>Issued Qty</th>
61 |                 </tr>
62 |               </thead>
63 |               <tbody>
64 |                 {order.components.map((c, i) => (
65 |                   <tr key={c.id || i}>
66 |                     <td>{c.item_code}</td>
67 |                     <td>{c.item_name}</td>
68 |                     <td>{c.planned_qty}</td>
69 |                     <td>{c.issued_qty}</td>
70 |                   </tr>
71 |                 ))}
72 |               </tbody>
73 |             </table>
74 |           ) : (
75 |             <p>No components</p>
76 |           )}
77 |         </div>
78 |       </div>
79 |     </div>
80 |   );
81 | }
82 | 


--------------------------------------------------------------------------------
/src/app/purchase-orders/[id]/complete/page.jsx:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useState, useEffect } from "react";
  3 | import { useParams, useRouter } from "next/navigation";
  4 | import Link from "next/link";
  5 | 
  6 | export default function CompleteProductionOrder() {
  7 |   const { id } = useParams();
  8 |   const router = useRouter();
  9 | 
 10 |   const [order, setOrder] = useState(null);
 11 |   const [producedQty, setProducedQty] = useState("");
 12 |   const [flash, setFlash] = useState(null);
 13 |   const [saving, setSaving] = useState(false);
 14 | 
 15 |   // 🔹 Fetch Order
 16 |   useEffect(() => {
 17 |     fetch(`/api/production-orders/${id}`)
 18 |       .then((res) => res.json())
 19 |       .then((data) => setOrder(data))
 20 |       .catch(() => setFlash({ type: "danger", msg: "Failed to load order" }));
 21 |   }, [id]);
 22 | 
 23 |   // 🔹 Submit Completion
 24 |   async function handleComplete(e) {
 25 |     e.preventDefault();
 26 |     setFlash(null);
 27 | 
 28 |     if (!producedQty || isNaN(producedQty) || Number(producedQty) <= 0) {
 29 |       setFlash({ type: "danger", msg: "Please enter valid Produced Quantity" });
 30 |       return;
 31 |     }
 32 | 
 33 |     setSaving(true);
 34 |     try {
 35 |       const res = await fetch(`/api/production-completion`, {
 36 |         method: "POST",
 37 |         headers: { "Content-Type": "application/json" },
 38 |         body: JSON.stringify({
 39 |           production_order_id: id,
 40 |           produced_qty: Number(producedQty),
 41 |           warehouse_id: order.warehouse_id,
 42 |           remarks: "Completed via UI",
 43 |         }),
 44 |       });
 45 | 
 46 |       const data = await res.json();
 47 |       if (res.ok) {
 48 |         setFlash({ type: "success", msg: data.message });
 49 |         setTimeout(() => router.push(`/production-orders/${id}`), 1500);
 50 |       } else {
 51 |         setFlash({ type: "danger", msg: data.error || "Failed to complete order" });
 52 |       }
 53 |     } catch (err) {
 54 |       setFlash({ type: "danger", msg: "Server error" });
 55 |     } finally {
 56 |       setSaving(false);
 57 |     }
 58 |   }
 59 | 
 60 |   if (!order) return <div className="container py-5">Loading...</div>;
 61 | 
 62 |   return (
 63 |     <div className="container-fluid">
 64 |       {/* Header */}
 65 |       <div className="d-flex justify-content-between align-items-center mb-4">
 66 |         <h1 className="h3">
 67 |           <i className="bi bi-check-circle text-success"></i> Complete Production Order
 68 |         </h1>
 69 |         <Link href={`/production-orders/${id}`} className="btn btn-outline-secondary">
 70 |           Back
 71 |         </Link>
 72 |       </div>
 73 | 
 74 |       {flash && <div className={`alert alert-${flash.type}`}>{flash.msg}</div>}
 75 | 
 76 |       {/* Order Info */}
 77 |       <div className="card mb-3">
 78 |         <div className="card-body">
 79 |           <p><strong>Order No:</strong> {order.order_number}</p>
 80 |           <p><strong>Product:</strong> {order.fg_name} ({order.fg_code})</p>
 81 |           <p><strong>Status:</strong> {order.status}</p>
 82 |         </div>
 83 |       </div>
 84 | 
 85 |       {/* Complete Form */}
 86 |       <form onSubmit={handleComplete} className="card p-3">
 87 |         <div className="mb-3">
 88 |           <label className="form-label">Produced Quantity *</label>
 89 |           <input
 90 |             type="number"
 91 |             className="form-control"
 92 |             value={producedQty}
 93 |             onChange={(e) => setProducedQty(e.target.value)}
 94 |             step="0.001"
 95 |             min="0.001"
 96 |             required
 97 |           />
 98 |         </div>
 99 |         <button type="submit" className="btn btn-success" disabled={saving}>
100 |           {saving ? (
101 |             <>
102 |               <span className="spinner-border spinner-border-sm me-2"></span>
103 |               Completing...
104 |             </>
105 |           ) : (
106 |             <><i className="bi bi-check-circle me-2"></i> Complete Production</>
107 |           )}
108 |         </button>
109 |       </form>
110 |     </div>
111 |   );
112 | }
113 | 


--------------------------------------------------------------------------------
/src/app/quality-check/page.js:
--------------------------------------------------------------------------------
 1 | "use client";
 2 | import { useEffect, useState } from "react";
 3 | import Link from "next/link";
 4 | 
 5 | export default function QualityCheckList() {
 6 |   const [qcs, setQcs] = useState([]);
 7 |   const [loading, setLoading] = useState(true);
 8 | 
 9 |   // Fetch QC List
10 |   useEffect(() => {
11 |     const fetchQcs = async () => {
12 |       try {
13 |         const res = await fetch("/api/quality-checks");
14 |         if (res.ok) {
15 |           setQcs(await res.json());
16 |         }
17 |       } catch (err) {
18 |         console.error("Error loading QC list", err);
19 |       } finally {
20 |         setLoading(false);
21 |       }
22 |     };
23 |     fetchQcs();
24 |   }, []);
25 | 
26 |   return (
27 |     <div className="container-fluid">
28 |       {/* Header */}
29 |       <div className="d-flex justify-content-between align-items-center mb-4">
30 |         <h1 className="h3 mb-0">
31 |           <i className="bi bi-clipboard-check text-primary"></i> Quality Checks
32 |         </h1>
33 |         <Link href="/quality-check/create" className="btn btn-primary">
34 |           <i className="bi bi-plus-circle me-2"></i> New Quality Check
35 |         </Link>
36 |       </div>
37 | 
38 |       {/* Table */}
39 |       <div className="card border-0 shadow-sm">
40 |         <div className="card-body">
41 |           {loading ? (
42 |             <p>Loading...</p>
43 |           ) : qcs.length === 0 ? (
44 |             <div className="text-center py-5">
45 |               <i className="bi bi-clipboard-check fs-1 text-muted"></i>
46 |               <h5 className="mt-3 text-muted">No Quality Checks Yet</h5>
47 |               <p className="text-muted">Create your first QC to ensure standards</p>
48 |               <Link href="/quality-check/create" className="btn btn-primary">
49 |                 <i className="bi bi-plus-circle me-2"></i>Create First QC
50 |               </Link>
51 |             </div>
52 |           ) : (
53 |             <div className="table-responsive">
54 |               <table className="table table-hover align-middle">
55 |                 <thead className="table-light">
56 |                   <tr>
57 |                     <th>QC No</th>
58 |                     <th>Date</th>
59 |                     <th>Inspector</th>
60 |                     <th>Status</th>
61 |                     <th>Items</th>
62 |                   </tr>
63 |                 </thead>
64 |                 <tbody>
65 |                   {qcs.map((qc) => (
66 |                     <tr key={qc.id}>
67 |                       <td><strong>{qc.qc_number}</strong></td>
68 |                       <td>{new Date(qc.qc_date).toLocaleDateString()}</td>
69 |                       <td>{qc.inspector}</td>
70 |                       <td>
71 |                         <span
72 |                           className={`badge bg-${
73 |                             qc.status === "approved"
74 |                               ? "success"
75 |                               : qc.status === "rejected"
76 |                               ? "danger"
77 |                               : "warning"
78 |                           }`}
79 |                         >
80 |                           {qc.status.charAt(0).toUpperCase() + qc.status.slice(1)}
81 |                         </span>
82 |                       </td>
83 |                       <td>{qc.items_count || 0}</td>
84 |                     </tr>
85 |                   ))}
86 |                 </tbody>
87 |               </table>
88 |             </div>
89 |           )}
90 |         </div>
91 |       </div>
92 |     </div>
93 |   );
94 | }
95 | 


--------------------------------------------------------------------------------
/src/app/warehouses/[id]/page.js:
--------------------------------------------------------------------------------
  1 | "use client";
  2 | import { useState, useEffect } from "react";
  3 | import Link from "next/link";
  4 | import { useParams } from "next/navigation";
  5 | 
  6 | export default function WarehouseDetailsPage() {
  7 |   const { id } = useParams();
  8 | 
  9 |   const [warehouse, setWarehouse] = useState(null);
 10 |   const [loading, setLoading] = useState(true);
 11 |   const [flash, setFlash] = useState({ type: "", message: "" });
 12 | 
 13 |   // Fetch warehouse details
 14 |   useEffect(() => {
 15 |     const fetchWarehouse = async () => {
 16 |       try {
 17 |         const res = await fetch(`/api/warehouses/${id}`);
 18 |         if (res.ok) {
 19 |           const data = await res.json();
 20 |           setWarehouse(data);
 21 |         } else {
 22 |           setFlash({ type: "danger", message: "Warehouse not found." });
 23 |         }
 24 |       } catch (error) {
 25 |         setFlash({ type: "danger", message: "Failed to load warehouse details." });
 26 |       } finally {
 27 |         setLoading(false);
 28 |       }
 29 |     };
 30 |     if (id) fetchWarehouse();
 31 |   }, [id]);
 32 | 
 33 |   if (loading) return <p className="text-center mt-5">Loading...</p>;
 34 | 
 35 |   if (!warehouse)
 36 |     return (
 37 |       <div className="container-fluid">
 38 |         {flash.message && (
 39 |           <div className={`alert alert-${flash.type}`}>{flash.message}</div>
 40 |         )}
 41 |       </div>
 42 |     );
 43 | 
 44 |   return (
 45 |     <div className="container-fluid">
 46 |       {/* Header */}
 47 |       <div className="row">
 48 |         <div className="col-12 d-flex justify-content-between align-items-center mb-4">
 49 |           <h1 className="h3 mb-0">
 50 |             <i className="bi bi-building text-primary"></i>{" "}
 51 |             Warehouse Details: {warehouse.warehouse_name}
 52 |           </h1>
 53 |           <div>
 54 |             <Link href="/warehouses" className="btn btn-outline-secondary me-2">
 55 |               <i className="bi bi-arrow-left me-2"></i>Back to List
 56 |             </Link>
 57 |             <Link
 58 |               href={`/warehouses/${id}/edit`}
 59 |               className="btn btn-primary"
 60 |             >
 61 |               <i className="bi bi-pencil me-2"></i>Edit
 62 |             </Link>
 63 |           </div>
 64 |         </div>
 65 |       </div>
 66 | 
 67 |       <div className="row">
 68 |         {/* Left Section */}
 69 |         <div className="col-md-8">
 70 |           <div className="card">
 71 |             <div className="card-header">
 72 |               <h5 className="mb-0">Warehouse Information</h5>
 73 |             </div>
 74 |             <div className="card-body">
 75 |               <div className="row">
 76 |                 {[
 77 |                   { label: "Warehouse Code", value: warehouse.warehouse_code },
 78 |                   { label: "Warehouse Name", value: warehouse.warehouse_name },
 79 |                   {
 80 |                     label: "Description",
 81 |                     value: warehouse.description || "No description provided",
 82 |                     full: true,
 83 |                   },
 84 |                   {
 85 |                     label: "Address",
 86 |                     value: warehouse.address || "Not provided",
 87 |                     full: true,
 88 |                   },
 89 |                   { label: "City", value: warehouse.city || "Not provided" },
 90 |                   { label: "State", value: warehouse.state || "Not provided" },
 91 |                   {
 92 |                     label: "Contact Person",
 93 |                     value: warehouse.contact_person || "Not provided",
 94 |                   },
 95 |                   { label: "Phone", value: warehouse.phone || "Not provided" },
 96 |                 ].map((field, i) => (
 97 |                   <div
 98 |                     className={`${field.full ? "col-12" : "col-md-6"} mb-3`}
 99 |                     key={i}
100 |                   >
101 |                     <label className="form-label fw-bold">{field.label}</label>
102 |                     <p className="form-control-plaintext">{field.value}</p>
103 |                   </div>
104 |                 ))}
105 |               </div>
106 |             </div>
107 |           </div>
108 |         </div>
109 | 
110 |         {/* Right Section */}
111 |         <div className="col-md-4">
112 |           <div className="card">
113 |             <div className="card-header">
114 |               <h5 className="mb-0">Status & Info</h5>
115 |             </div>
116 |             <div className="card-body">
117 |               <div className="mb-3">
118 |                 <label className="form-label fw-bold">Status</label>
119 |                 <p className="form-control-plaintext">
120 |                   <span
121 |                     className={`badge bg-${
122 |                       warehouse.status === "active" ? "success" : "secondary"
123 |                     }`}
124 |                   >
125 |                     {warehouse.status.charAt(0).toUpperCase() +
126 |                       warehouse.status.slice(1)}
127 |                   </span>
128 |                 </p>
129 |               </div>
130 |             </div>
131 |           </div>
132 |         </div>
133 |       </div>
134 |     </div>
135 |   );
136 | }
137 | 


--------------------------------------------------------------------------------
/src/lib/db.js:
--------------------------------------------------------------------------------
1 | import mysql from "mysql2/promise";
2 | 
3 | export const db = mysql.createPool({
4 |   host: "localhost",
5 |   user: "root",
6 |   password: "",
7 |   database: "manufacturing_erp",
8 | });
9 | 


--------------------------------------------------------------------------------
/src/lib/stock.js:
--------------------------------------------------------------------------------
 1 | // lib/stock.js
 2 | import { db } from "@/lib/db";
 3 | 
 4 | // ✅ get latest balance of an item
 5 | export async function getCurrentBalance(item_id, warehouse_id, location_id=null) {
 6 |   const [rows] = await db.query(
 7 |     `SELECT balance_qty 
 8 |      FROM stock_ledger 
 9 |      WHERE item_id=? AND warehouse_id=? ${location_id ? "AND location_id=?" : ""} 
10 |      ORDER BY id DESC LIMIT 1`,
11 |     location_id ? [item_id, warehouse_id, location_id] : [item_id, warehouse_id]
12 |   );
13 |   return rows.length ? Number(rows[0].balance_qty) : 0;
14 | }
15 | 
16 | // ✅ add stock transaction
17 | export async function addStockTransaction({
18 |   item_id,
19 |   warehouse_id,
20 |   location_id=null,
21 |   qty,
22 |   transaction_type, // 'IN' or 'OUT'
23 |   reference_type,
24 |   reference_id,
25 |   transaction_ref,
26 |   remarks
27 | }) {
28 |   const balance = await getCurrentBalance(item_id, warehouse_id, location_id);
29 |   const newBalance = transaction_type === "IN"
30 |     ? balance + Number(qty)
31 |     : balance - Number(qty);
32 | 
33 |   await db.query(
34 |     `INSERT INTO stock_ledger 
35 |       (item_id, warehouse_id, location_id, transaction_type, reference_type, reference_id, transaction_ref, transaction_id, qty, balance_qty, remarks, transaction_date, created_at)
36 |      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
37 |     [
38 |       item_id,
39 |       warehouse_id,
40 |       location_id,
41 |       transaction_type,
42 |       reference_type,
43 |       reference_id,
44 |       transaction_ref,
45 |       reference_id, // for now use reference_id as transaction_id
46 |       qty,
47 |       newBalance,
48 |       remarks || null
49 |     ]
50 |   );
51 | 
52 |   return newBalance;
53 | }
54 | 


--------------------------------------------------------------------------------