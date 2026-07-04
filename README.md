# Erni Tabash Landing

React/Vite version of `ernitabash.com`, migrated from the old static HTML landing page.

## Development

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

The production build outputs to `dist/`. Amplify uses `amplify.yml` and deploys the `dist` directory.

## AWS quick healthcheck

The repo includes a safe read-only AWS validation script. It clears only the known broken local proxy value (`http://127.0.0.1:9`) for the current PowerShell session, then checks identity and resource visibility without printing secrets.

```powershell
aws sso login --profile dev-erni
.\scripts\aws-healthcheck.ps1
```

Optional:

```powershell
.\scripts\aws-healthcheck.ps1 -Profile dev-erni -Region us-east-1
```
