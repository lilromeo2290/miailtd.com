#!/bin/bash
# Background daemon that watches for changes and auto-commits every 5 minutes
# Starts as a background process

REPO_DIR="/home/z/my-project"
INTERVAL=300  # 5 minutes in seconds
LOG="$REPO_DIR/scripts/worklog-daemon.log"

echo "[$(date -u)] Worklog daemon started (interval: ${INTERVAL}s)" >> "$LOG"

while true; do
    sleep "$INTERVAL"
    bash "$REPO_DIR/scripts/auto-commit-worklog.sh" >> "$LOG" 2>&1
done