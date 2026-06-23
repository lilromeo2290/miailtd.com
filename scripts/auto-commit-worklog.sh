#!/bin/bash
# auto-commit-worklog.sh
# Commits all changes and pushes to GitHub
# Run manually: bash /home/z/my-project/scripts/auto-commit-worklog.sh

REPO_DIR="/home/z/my-project"
REMOTE="origin"
BRANCH="main"
WORKLOG="$REPO_DIR/worklog.md"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

cd "$REPO_DIR" || exit 1

# Check if there are any changes to commit
if git diff --quiet && git diff --cached --quiet; then
    echo "[$TIMESTAMP] No changes to commit."
    exit 0
fi

# Stage all changes
git add -A

# Generate commit message from staged files
CHANGED_FILES=$(git diff --cached --name-only | tr '\n' ', ')
COMMIT_MSG="auto-update: $TIMESTAMP | Files: $CHANGED_FILES"

# Commit
git commit -m "$COMMIT_MSG" 2>&1

if [ $? -ne 0 ]; then
    echo "[$TIMESTAMP] Commit failed."
    exit 1
fi

# Push to remote
git push "$REMOTE" "$BRANCH" 2>&1

if [ $? -ne 0 ]; then
    echo "[$TIMESTAMP] Push failed."
    exit 1
fi

echo "[$TIMESTAMP] Successfully committed and pushed to GitHub."