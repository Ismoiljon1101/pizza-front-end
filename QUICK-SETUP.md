# Quick Setup Guide for Automated Deployment

## TL;DR - Get Running in 5 Minutes

### 1. Generate Webhook Secret
```bash
SECRET=$(openssl rand -hex 32)
echo "Your webhook secret: $SECRET"
# Save this secret!
```

### 2. Configure and Start Webhook Server
```bash
# Edit the service file with your secret
sed -i "s/your_secret_here/$SECRET/" webhook-server.service

# Install and start the service
sudo cp webhook-server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webhook-server
sudo systemctl start webhook-server

# Verify it's running
sudo systemctl status webhook-server
curl http://localhost:9000/health
```

### 3. Configure GitHub Webhook
1. Go to: https://github.com/Ismoiljon1101/pizza-front-end/settings/hooks
2. Click "Add webhook"
3. Set Payload URL: `http://YOUR_SERVER_IP:9000/webhook`
4. Set Content type: `application/json`
5. Set Secret: (paste your generated secret)
6. Select "Just the push event"
7. Click "Add webhook"

### 4. Test It
```bash
# Make a test commit and push to master
echo "# Test" >> README.md
git add README.md
git commit -m "Test automated deployment"
git push origin master

# Watch the logs
tail -f webhook.log deploy.log
```

## Done! 🎉

Now every push to master will automatically:
1. Pull latest code
2. Install dependencies
3. Build the project
4. Restart the application

## Next Steps

- Read DEPLOYMENT.md for detailed documentation
- Set up firewall rules or reverse proxy
- Configure your web server (nginx/PM2) to serve the built app
- Set up monitoring and alerts

## Troubleshooting

**Webhook not triggering?**
```bash
# Check if service is running
sudo systemctl status webhook-server

# Check logs
tail -f webhook.log
```

**Deployment failing?**
```bash
# Run deployment manually to see errors
./deploy.sh
```

**Port 9000 blocked?**
```bash
# Allow through firewall
sudo ufw allow 9000/tcp
```
