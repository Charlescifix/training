# Railway Deployment Guide

## Quick Deploy to Railway

### Method 1: One-Click Deploy (Recommended)

1. Visit [Railway](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose the repository: `Charlescifix/training`
5. Select the `gen3block-app` directory as the root
6. Railway will automatically detect the configuration and deploy!

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd gen3block-app
railway init

# Deploy
railway up
```

## Configuration Files

This project includes the following Railway configuration files:

### `nixpacks.toml`
Configures the build process:
- Uses Node.js 20
- Runs `npm ci` for clean install
- Builds with `npm run build`
- Starts with Vite preview server

### `railway.json`
Deployment settings:
- Build command: `npm run build`
- Start command: `npm run start`
- Auto-restart on failure

### `package.json`
Updated with production start script:
- `npm run start` - Serves built files on Railway's PORT

## Environment Variables

No additional environment variables are required for this static site deployment.

## Post-Deployment

After deployment, Railway will provide you with a URL like:
`https://your-app.railway.app`

The site will be live at this URL with all the enhanced gradient styling, animations, and responsive design!

## Troubleshooting

**Build Fails:**
- Check Railway build logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**App Not Starting:**
- Check that PORT environment variable is being used
- Verify the start command in railway.json
- Review Railway deployment logs

**Images Not Loading:**
- Check browser console for CORS errors
- Verify Unsplash image URLs are accessible
- Check network tab for failed requests

## Local Testing of Production Build

```bash
# Build the production version
npm run build

# Preview production build locally
npm run preview
```

## Repository

GitHub: https://github.com/Charlescifix/training.git

---

Built with Vite + React + Tailwind CSS
Deployed on Railway