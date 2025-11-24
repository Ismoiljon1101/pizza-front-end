# Automated Deployment Setup - Overview

This directory now contains a complete automated deployment solution that deploys your React app whenever you push to the master branch on GitHub.

## 📁 Files Created

### Core Components
- **`deploy.sh`** - Deployment script that pulls code, installs dependencies, builds, and restarts the app
- **`webhook-server.js`** - Node.js webhook listener that receives GitHub push events
- **`webhook-server.service`** - Systemd service configuration to keep webhook server running

### Documentation
- **`QUICK-SETUP.md`** - ⚡ 5-minute quick start guide
- **`DEPLOYMENT.md`** - 📚 Comprehensive documentation with theory and practice
- **`DEPLOYMENT-README.md`** - This file (overview)

## 🚀 Getting Started

### Option 1: Quick Setup (Recommended)
Follow `QUICK-SETUP.md` for a fast, step-by-step setup in 5 minutes.

### Option 2: Detailed Setup
Read `DEPLOYMENT.md` for comprehensive understanding of how deployment works and detailed setup instructions.

## 🏗️ Architecture Overview

```
Developer pushes to master
         ↓
GitHub sends webhook
         ↓
webhook-server.js (port 9000) receives & validates
         ↓
Triggers deploy.sh
         ↓
1. Pull latest code
2. Install dependencies  
3. Build React app
4. Restart server
         ↓
App is live with new changes!
```

## 📋 What You Need

1. **Server Requirements**
   - Public IP or domain name
   - Node.js installed
   - Git with SSH access to GitHub
   - Port 9000 accessible (or reverse proxy)

2. **GitHub Requirements**
   - Repository admin access to configure webhooks
   - Webhook secret (generated during setup)

## 🎯 What This Achieves

✅ **Automatic deployment** on every push to master  
✅ **Secure** webhook verification with secrets  
✅ **Reliable** systemd service that auto-restarts on failure  
✅ **Logged** all deployment events for debugging  
✅ **Simple** pure bash + Node.js, no complex CI/CD platforms

## 🔧 Customization

The setup is designed to be flexible. You can modify:

- **`deploy.sh`** - Change build commands, add testing, customize restart logic
- **`webhook-server.js`** - Add notifications, change port, add additional validation
- **`webhook-server.service`** - Adjust environment variables, change user, modify logs location

## 🔒 Security Features

- Webhook signature verification using HMAC-SHA256
- Systemd service runs as non-root user
- Git access via SSH keys (not passwords)
- Deployment logs for audit trail
- Branch-specific deployment (only master triggers deployment)

## 📊 Monitoring

After setup, monitor your deployments:

```bash
# Watch webhook activity
tail -f webhook.log

# Watch deployment progress
tail -f deploy.log

# Check service status
sudo systemctl status webhook-server
```

## 🆘 Troubleshooting

Quick fixes for common issues:

```bash
# Service not running?
sudo systemctl restart webhook-server

# Deployment failing?
./deploy.sh  # Run manually to see errors

# Port blocked?
sudo ufw allow 9000/tcp
```

For detailed troubleshooting, see the "Troubleshooting" section in `DEPLOYMENT.md`.

## 📚 Learn More

### How Deployment Usually Works
`DEPLOYMENT.md` contains a detailed explanation of:
- Traditional CI/CD approaches (GitHub Actions, Jenkins, etc.)
- Webhook-based deployment (our approach)
- Pull-based deployment (polling)
- Container orchestration (Kubernetes, Docker)
- Pros and cons of each method

### Alternative Approaches
If this webhook approach doesn't fit your needs, `DEPLOYMENT.md` includes examples for:
- GitHub Actions workflow
- Cron-based polling deployment
- Manual deployment scripts

## 🎓 Best Practices Included

✅ Frozen lockfile for consistent dependencies  
✅ Hard reset to origin/master for clean state  
✅ Comprehensive error logging  
✅ Webhook signature verification  
✅ Systemd service for reliability  
✅ Health check endpoint  
✅ Proper file permissions

## 🔄 Next Steps After Setup

1. ✅ Test the deployment with a small commit
2. ⚙️ Configure your web server (nginx/Apache) or PM2
3. 🔥 Set up firewall rules or reverse proxy with SSL
4. 📧 Add deployment notifications (email/Slack)
5. 🧪 Consider adding automated tests before deployment
6. 📦 Set up backup strategy for build artifacts
7. 🔄 Plan rollback procedures

## 💡 Tips

- Always test `deploy.sh` manually before setting up the webhook
- Use a strong, randomly generated webhook secret
- Consider using a reverse proxy (nginx) with HTTPS for production
- Set up monitoring/alerting for deployment failures
- Keep deployment logs for compliance/debugging
- Use branch protection rules on master for added safety

## 🤝 Support

If you run into issues:
1. Check `DEPLOYMENT.md` troubleshooting section
2. Review `webhook.log` and `deploy.log` files
3. Verify GitHub webhook delivery in repository settings
4. Test deployment script manually: `./deploy.sh`

---

**Ready to start?** Open `QUICK-SETUP.md` and follow the steps!

**Want to learn more?** Read `DEPLOYMENT.md` for comprehensive documentation!
