#!/bin/sh

cd /done24bot
npm install
pm2 start ecosystem.config.js
/bin/bash
