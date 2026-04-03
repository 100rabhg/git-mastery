---
title: Lab Fix a Broken Git Commit
description: Practice undoing and repairing a broken Git commit by deciding whether to amend, reset, or revert based on whether the history is local or shared.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/labs/">Labs</a> / Fix a Broken Commit
</div>

# Lab: Fix a Broken Commit

## Problem statement

You just committed a bug fix, but the commit accidentally includes a debug log and the message is vague. The commit has not been pushed yet.

## Expected outcome

- the debug log is removed
- the commit message is improved
- the branch history stays clean

## Hints

- Ask whether the commit is local only or already shared
- Decide whether you need `commit --amend` or a reset-based rewrite
- Check `git status` before and after the repair

## Suggested practice setup

```bash
git init
echo "console.log('debug')" > app.js
git add app.js
git commit -m "fix stuff"
```

## Success criteria

You can explain why your repair choice is safe and what would change if the commit had already been pushed.

## Related lesson

- [Undo & recovery](/git/undo-and-recovery)
