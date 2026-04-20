#!/bin/bash
# ssh-tunnel.sh — Open SSH tunnel to production MySQL
#
# Forwards local port 33306 → production MySQL (port 3306)
# Run this BEFORE using --target production with build-page.js
#
# Usage:
#   ./ssh-tunnel.sh           # Open tunnel (runs in background)
#   ./ssh-tunnel.sh stop      # Close tunnel
#   ./ssh-tunnel.sh status    # Check if tunnel is running
#
# Requires: SSH access configured in DirectAdmin or ~/.ssh/config
# Update SSH_USER and SSH_HOST below with your production credentials.

SSH_USER="${PROD_SSH_USER:-root}"
SSH_HOST="${PROD_SSH_HOST:-digiwin.co.th}"
LOCAL_PORT=33306
REMOTE_PORT=3306
PID_FILE="/tmp/digiwin-ssh-tunnel.pid"

case "${1:-start}" in
  start)
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
      echo "Tunnel already running (PID $(cat "$PID_FILE"))"
      echo "Local port $LOCAL_PORT → $SSH_HOST:$REMOTE_PORT"
      exit 0
    fi
    echo "Opening SSH tunnel: localhost:$LOCAL_PORT → $SSH_HOST:$REMOTE_PORT"
    ssh -fN -L ${LOCAL_PORT}:localhost:${REMOTE_PORT} ${SSH_USER}@${SSH_HOST}
    if [ $? -eq 0 ]; then
      # Find the PID of the tunnel process
      PID=$(pgrep -f "ssh.*-L.*${LOCAL_PORT}:localhost:${REMOTE_PORT}.*${SSH_HOST}" | head -1)
      echo "$PID" > "$PID_FILE"
      echo "Tunnel open (PID $PID). You can now use: --target production"
    else
      echo "Failed to open tunnel. Check SSH credentials."
      exit 1
    fi
    ;;
  stop)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        echo "Tunnel closed (PID $PID)"
      else
        echo "Tunnel process $PID already dead"
      fi
      rm -f "$PID_FILE"
    else
      echo "No tunnel PID file found"
      # Try to find and kill anyway
      PID=$(pgrep -f "ssh.*-L.*${LOCAL_PORT}:localhost:${REMOTE_PORT}.*${SSH_HOST}" | head -1)
      if [ -n "$PID" ]; then
        kill "$PID"
        echo "Killed orphaned tunnel (PID $PID)"
      fi
    fi
    ;;
  status)
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
      echo "Tunnel RUNNING (PID $(cat "$PID_FILE"))"
      echo "localhost:$LOCAL_PORT → $SSH_HOST:$REMOTE_PORT"
    else
      echo "Tunnel NOT running"
      [ -f "$PID_FILE" ] && rm -f "$PID_FILE"
    fi
    ;;
  *)
    echo "Usage: $0 [start|stop|status]"
    exit 1
    ;;
esac
