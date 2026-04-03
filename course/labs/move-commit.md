---
title: Lab Move a Commit to Another Branch
description: Practice moving a commit to the correct branch using cherry-pick and reset so you can recover from committing to the wrong branch.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/labs/">Labs</a> / Move a Commit
</div>

# Lab: Move a Commit to Another Branch

## Problem statement

You accidentally committed a payment fix on `main`, but the change belongs on `feature/payments`. The commit has not been pushed.

## Expected outcome

- the fix exists on `feature/payments`
- `main` no longer contains the accidental commit
- no code changes are lost

## Hints

- Find the commit SHA first
- Decide whether to cherry-pick, reset, or create a recovery branch
- Be extra careful about whether the commit was already shared

## Suggested practice setup

Make a small commit on the wrong branch, then move it cleanly.

## Success criteria

You can justify why your approach would change if the mistaken commit had already been pushed to origin.

## Related lesson

- [History manipulation](/git/history-manipulation)
