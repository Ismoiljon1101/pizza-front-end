# Automated Deployment Documentation

## Overview

This document explains how continuous deployment works in general and how it's configured for this Pizza Front-End React application.

---

## How Continuous Deployment Usually Works

### Traditional Approaches

1. **CI/CD Platforms (GitHub Actions, GitLab CI, Jenkins)**
   - Most common modern approach
   - Platform runs workflows on their infrastructure
   - Can deploy to any server via SSH, APIs, or cloud services
   - **Pros**: Robust, scalable, audit trails, parallel jobs
   - **Cons**: Can be complex, potential costs, requires learning platform-specific syntax

2. **Webhook-Based Deployment (Our Approach)**
   - Lightweight webhook server runs on deployment server
   - GitHub sends HTTP POST request on push events
   - Server validates request and triggers deployment script
   - **Pros**: Simple, self-hosted, full control, no external dependencies
   - **Cons**: Server must be publicly accessible, limited to push-based triggers

3. **Pull-Based Deployment (Polling)**
   - Cron job periodically checks for new commits
   - Pulls and deploys if changes detected
   - **Pros**: Works behind firewalls, no webhook setup needed
   - **Cons**: Delay between push and deployment, unnecessary checks

4. **Container Orchestration (Kubernetes, Docker Swarm)**
   - Application packaged as container image
   - CI builds and pushes image to registry
   - Orchestrator automatically pulls and deploys new versions
   - **Pros**: Scalable, reproducible, rollback capabilities
   - **Cons**: Complex infrastructure, overkill for simple apps

---

## How Deployment Works for This Project

### Architecture

```
GitHub Repository (master branch)
    ↓ (push event)
GitHub Webhook
    ↓ (HTTP POST)
Webhook Server (port 9000)
    ↓ (triggers)
Deployment Script (deploy.sh)
    ↓ (executes)
1. Pull latest code from master
2. Install dependencies (yarn install)
3. Build application (yarn build)
4. Restart application server
```

### Components

#### 1. **Webhook Server** (`webhook-server.js`)
   - Lightweight Node.js HTTP server
   - Listens on port 9000 (configurable)
   - Verifies GitHub webhook signature for security
   - Filters events: only responds to pushes to master branch
   - Triggers deployment script asynchronously

#### 2. **Deployment Script** (`deploy.sh`)
   - Bash script that performs deployment steps
   - Pulls latest code from GitHub
   - Installs dependencies with frozen lockfile
   - Builds production-ready React application
   - Restarts application (PM2 or custom solution)
   - Logs all actions to deploy.log

#### 3. **Systemd Service** (`webhook-server.service`)
   - Ensures webhook server runs continuously
   - Auto-restarts on failure
   - Manages environment variables (port, secret)
   - Logs output for debugging

---

## Setup Instructions

### Prerequisites

- Node.js installed on server
- Git configured with SSH access to GitHub
- Server has public IP or domain name
- Port 9000 accessible (or configure reverse proxy)

### Step 1: Configure the Deployment Script

1. Review `deploy.sh` and customize the restart mechanism:
   ```bash
   # Option A: Using PM2 (recommended for Node.js apps)
   pm2 restart pizza-front-end || pm2 start yarn --name pizza-front-end -- start
   
   # Option B: Using systemd service
   sudo systemctl restart pizza-front-end
   
   # Option C: Using nginx (if serving static build)
   # Just building is enough, nginx serves from build/ directory
   ```

2. Test the script manually:
   ```bash
   ./deploy.sh
   ```

### Step 2: Set Up Webhook Server

1. **Generate a webhook secret** (for security):
   ```bash
   openssl rand -hex 32
   ```
   Save this secret - you'll need it for GitHub and the service.

2. **Edit the systemd service file** `webhook-server.service`:
   ```ini
   Environment="WEBHOOK_SECRET=your_generated_secret_here"
   Environment="WEBHOOK_PORT=9000"  # Change if needed
   ```

3. **Install and start the systemd service**:
   ```bash
   sudo cp webhook-server.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable webhook-server
   sudo systemctl start webhook-server
   ```

4. **Verify the service is running**:
   ```bash
   sudo systemctl status webhook-server
   curl http://localhost:9000/health
   ```

### Step 3: Configure GitHub Webhook

1. **Go to your GitHub repository**: https://github.com/Ismoiljon1101/pizza-front-end

2. **Navigate to Settings → Webhooks → Add webhook**

3. **Configure the webhook**:
   - **Payload URL**: `http://your-server-ip:9000/webhook`
     - If using a domain: `http://yourdomain.com:9000/webhook`
     - If behind reverse proxy: `https://yourdomain.com/webhook`
   
   - **Content type**: `application/json`
   
   - **Secret**: Paste the secret you generated in Step 2
   
   - **Which events would you like to trigger this webhook?**
     - Select "Just the push event"
   
   - **Active**: ✓ Check this box

4. **Save the webhook**

5. **Test the webhook**:
   - Make a small commit to master branch
   - Check "Recent Deliveries" in webhook settings
   - Should see 200 response
   - Check server logs: `tail -f webhook.log deploy.log`

### Step 4: Configure Firewall (if applicable)

If using UFW (Uncomplicated Firewall):
```bash
sudo ufw allow 9000/tcp
sudo ufw reload
```

Or better, set up a reverse proxy with nginx:
```nginx
location /webhook {
    proxy_pass http://localhost:9000/webhook;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

---

## Security Considerations

### 1. **Webhook Secret**
   - Always use a strong, randomly generated secret
   - Never commit secrets to repository
   - Rotate secret periodically

### 2. **Firewall Configuration**
   - Consider using reverse proxy (nginx/Apache) with HTTPS
   - Limit access to webhook endpoint
   - Use rate limiting to prevent abuse

### 3. **GitHub Access**
   - Use SSH keys for Git authentication (not HTTPS with passwords)
   - Ensure SSH key is restricted to read-only if possible
   - Keep server's `~/.ssh` directory secure (chmod 700)

### 4. **Script Permissions**
   - Deploy script should not require sudo for normal operations
   - If sudo is needed, use sudoers file for specific commands only
   - Never run webhook server as root

### 5. **Logging and Monitoring**
   - Regularly review deployment logs
   - Set up alerts for deployment failures
   - Monitor webhook server uptime

---

## Troubleshooting

### Webhook Not Triggering Deployment

1. **Check webhook server status**:
   ```bash
   sudo systemctl status webhook-server
   tail -f /home/neo/deploy-projects/pizza-house/pizza-front-end/webhook.log
   ```

2. **Verify webhook in GitHub**:
   - Check "Recent Deliveries" tab
   - Look for error responses (401, 500, etc.)

3. **Test webhook manually**:
   ```bash
   curl -X POST http://localhost:9000/webhook \
     -H "Content-Type: application/json" \
     -H "X-GitHub-Event: push" \
     -d '{"ref":"refs/heads/master"}'
   ```

### Deployment Script Failing

1. **Check deployment logs**:
   ```bash
   tail -f deploy.log
   ```

2. **Run deployment manually** to see errors:
   ```bash
   ./deploy.sh
   ```

3. **Common issues**:
   - Git authentication failure: Check SSH keys
   - Dependency installation failure: Clear node_modules and try again
   - Build failure: Check for syntax errors in code
   - Permission issues: Ensure script has execute permissions

### Port Already in Use

```bash
# Find process using port 9000
sudo lsof -i :9000
# Or
sudo netstat -tulpn | grep 9000

# Kill the process if needed
sudo kill -9 <PID>
```

---

## Monitoring and Maintenance

### View Logs

```bash
# Webhook server logs
tail -f webhook.log
tail -f webhook-error.log

# Deployment logs
tail -f deploy.log

# Systemd service logs
journalctl -u webhook-server -f
```

### Restart Services

```bash
# Restart webhook server
sudo systemctl restart webhook-server

# Restart application (if using PM2)
pm2 restart pizza-front-end
```

### Update Deployment Configuration

After modifying `webhook-server.service`:
```bash
sudo systemctl daemon-reload
sudo systemctl restart webhook-server
```

---

## Alternative Deployment Methods

If webhook-based deployment doesn't fit your needs:

### GitHub Actions (Recommended for larger projects)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/neo/deploy-projects/pizza-house/pizza-front-end
            ./deploy.sh
```

### Cron-Based Polling

Add to crontab (`crontab -e`):
```bash
*/5 * * * * cd /home/neo/deploy-projects/pizza-house/pizza-front-end && git fetch origin master && [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ] && ./deploy.sh
```

---

## Best Practices

1. **Testing**: Always test deployment script in staging environment first
2. **Backups**: Keep backups of build artifacts before deploying
3. **Rollback Strategy**: Maintain ability to quickly rollback to previous version
4. **Health Checks**: Implement application health checks post-deployment
5. **Notifications**: Set up Slack/email notifications for deployment events
6. **Branch Protection**: Consider using branch protection rules on master
7. **Review Process**: Require PR reviews before merging to master

---

## Additional Resources

- [GitHub Webhooks Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Systemd Service Documentation](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
- [PM2 Process Manager](https://pm2.keymetrics.io/)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

---

## Support

For issues or questions about this deployment setup, please:
1. Check the troubleshooting section above
2. Review deployment and webhook logs
3. Verify GitHub webhook delivery status
4. Contact the development team

---

**Last Updated**: 2025-11-24
**Maintainer**: Development Team
