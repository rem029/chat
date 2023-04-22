# Welcome to chat 👋

> Typescript React + Node With Automated Deployment to Linux Server

## Install

Apps required (skip if already installed in your workstation)

1. [NodeJS](https://nodejs.org/en/)
2. [Git Bash](https://git-scm.com/downloads)
3. Python from Microsoft Store (for yarn)
4. [Visual Studio Build Tools](https://github.com/nodejs/node-gyp#on-windows)
5. Lerna package
6. Postgres. References below:
    - https://www.postgresql.org/download/linux/ubuntu/
    - https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql-linux/

7. Create postgres user with default password 123

(Optional install lerna)
```sh
yarn add global lerna
```

7. on root folder run to install packages:

```sh
yarn bootstrap
```

8. on root folder run to install packages:

```sh
yarn start
```

9. (Optional) On VSCode. install the following extensions:

   - Prettier
   - ESLint

## Usage

```sh
yarn start
```
## Publish new version

```sh
yarn publish:version [major | minor | patch | prerelease]
```
## App theme config

Font family and color palette to be configure here.
### [MUI theme file](/packages/frontend/src/theme/index.ts)


## Note
### .env file location
```
chat/
```
### .env format
```
GITHUB_AUTH=<github auth api key for lerna version> Generated from Github settings
```

### .env sample usage
```
GITHUB_AUTH=123456
```
### .env format each package
#### [Frontend package](packages/frontend/README.md#env-format)
#### [Backend package](packages/backend/README.md#env-format)

# Branch naming and commit message (MUST FOLLOW)

Types

- feat - new/additional features.
- fix - improvement/bug fix on existing features.
- tech - refactor code, etc.

## Branch naming

```sh
<type>/<title>
```

Ex.

```
feat/dashboard
feat/login
fix/dashboard
fix/login
fix/login-performance
tech/user-input
```

## Commit messages

To easily generate changelog we must follow branch naming as per below:

```sh
<type>(<title>): <Description>
```

Ex.

```
// new features
feat(dashboard): improved UI.
feat(login): added login UI.

// bug fixing
fix(dashboard): Bug fix.
fix(login): improve performance login.

// refactor or etc.
tech(user-input): refactor debounce.
```

## Packages

Path

```
chat/packages/
```

### [backend](packages/backend/)
  - Backend server for chat
### [frontend](packages/frontend/)
  - Frontend UI for chat
### [common](packages/common/)
  - Shared types between backend and frontend. Mostly used to API response data types.

# GitHub Secret Keys

```
API_MAIL_DOMAIN=<string>
API_MAIL_KEY=<string>
API_MAIL_SENDER=<string>
API_TOKEN_REFRESH=<generate random string>
API_TOKEN_SECRET=<generate random string>
DB_DB
DB_HOST
DB_PORT
DB_PW
DB_USER
HOST_PATH=</var/www/{name}/>
SSH_HOST=<ip>
SSH_KEY=<cat ~/.ssh/id_rsa>
SSH_PORT=22
SSH_USER=<username>
```

# Author

- Website: https://github.com/rem029
- Github: [@rem029](https://github.com/rem029)
