#!/bin/bash
npm run build
cd dist
scp -r * breyt@breyt0.ssh.transip.me:/data/sites/web/breyt/subsites/guide.bre.yt/
cd ..
