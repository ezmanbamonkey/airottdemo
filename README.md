# Web Platform Workspace

This folder contains the simplest working setup for the Godot-integrated project.

## Main entry

- Website: `http://localhost:3000/`
- CMS admin: `http://localhost:3000/admin`
- Project database port: `5434`

## Structure

- `cms/`: main website + Payload CMS
- `docker-compose.yml`: PostgreSQL database for local development
- `frontend/`: old standalone frontend scaffold, not required
- `api/`: old standalone API scaffold, not required

## Quick start

1. Start PostgreSQL:

   ```bash
   docker-compose up -d
   ```

2. Start the website and CMS:

   ```bash
   npm run dev
   ```

3. Open the app:

   - Website: `http://localhost:3000/`
   - CMS: `http://localhost:3000/admin`

## Run from root

Use these commands directly inside `web-platform/`:

```bash
docker-compose up -d
npm run dev
```

Other useful commands:

```bash
npm run build
npm run lint
npm run db:down
```

## Godot embed

Export the Godot project for the web and copy the generated files into:

`cms/public/godot/`

The website root page is already configured to load `/godot/index.html` in an iframe.
