const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || '';
const DEPLOY_SCRIPT = path.join(__dirname, 'deploy.sh');

// Verify GitHub webhook signature
function verifySignature(payload, signature) {
    if (!SECRET) {
        console.log('⚠️  Warning: No WEBHOOK_SECRET set, skipping signature verification');
        return true;
    }
    
    const hmac = crypto.createHmac('sha256', SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const signature = req.headers['x-hub-signature-256'];
            
            // Verify signature if secret is set
            if (SECRET && (!signature || !verifySignature(body, signature))) {
                console.log('❌ Invalid signature');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid signature' }));
                return;
            }

            try {
                const payload = JSON.parse(body);
                const event = req.headers['x-github-event'];
                
                console.log(`📥 Received ${event} event`);

                // Only deploy on push events to master branch
                if (event === 'push' && payload.ref === 'refs/heads/master') {
                    console.log('🚀 Triggering deployment...');
                    
                    exec(`bash ${DEPLOY_SCRIPT}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error('❌ Deployment failed:', error);
                            console.error('stderr:', stderr);
                            return;
                        }
                        console.log('✅ Deployment completed');
                        console.log(stdout);
                    });

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'Deployment triggered' }));
                } else {
                    console.log(`ℹ️  Ignoring ${event} event (not a push to master)`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'Ignored' }));
                }
            } catch (err) {
                console.error('❌ Error parsing payload:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid payload' }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', message: 'Webhook server is running' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🎣 Webhook server listening on port ${PORT}`);
    console.log(`🔐 Secret ${SECRET ? 'is set' : 'is NOT set (all requests accepted)'}`);
});
