---
title: Git Conflict Resolution Guide
description: Learn how Git conflicts happen, how to resolve merge and rebase conflicts safely, and how to avoid common conflict-resolution mistakes.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Conflict Resolution
</div>

# Git Conflict Resolution Guide

Conflicts feel intimidating mostly because Git stops and asks you to make a human decision. That is normal. Git can detect overlap, but it cannot decide intent.

## How Conflicts Happen

**Problem:** Two commits changed the same lines or nearby logic in incompatible ways.

**Explanation:** Git tries to combine histories automatically. A conflict appears when automatic combination would be unsafe.

**Solution:** Inspect both intents, keep the right parts, test the result, then continue the merge or rebase.

Example:

```text
<<<<<<< HEAD
return calculateTotal(items, taxRate)
=======
return calculateTotal(items, taxRate, discountCode)
>>>>>>> feature/discounts
```

## Merge Conflict vs Rebase Conflict

### Merge conflict

**Problem:** You are combining two branches and Git cannot reconcile overlapping edits.

**Solution:** Resolve the file, stage it, then complete the merge.

**Command:**

```bash
git merge feature/discounts
git status
```

```text
You have unmerged paths.
  both modified:   src/billing/checkout.ts
```

After editing the file:

```bash
git add src/billing/checkout.ts
git commit
```

### Rebase conflict

**Problem:** Git is replaying your commit on a new base and one replay step conflicts.

**Solution:** Resolve the file, stage it, and continue the rebase.

**Command:**

```bash
git rebase origin/main
```

```text
error: could not apply a91a7f2... fix: handle empty password validation
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
```

Then:

```bash
git add src/auth/login.ts
git rebase --continue
```

## Conflict Resolution Workflow

1. Read the conflict carefully
2. Understand both sides of the change
3. Edit the file into the intended final state
4. Run tests or at least inspect surrounding code
5. Stage the resolved files
6. Continue the merge or rebase

## When to use merge vs rebase during conflict-heavy work

If the branch is shared or team coordination matters more than a linear log, merge is often safer. If the branch is private and you are preparing a clean pull request, rebase may still be worth it.

## Common mistakes

- Deleting conflict markers without understanding the code
- Keeping both lines when only one should survive
- Finishing the Git command without testing the resolved logic

## Pro tips

- Conflicts are a code understanding task, not just a Git task
- Smaller, more frequent syncs reduce conflict complexity
- If you are unsure, compare with `git diff` before continuing

## Read More

- [History manipulation and git merge vs rebase](/git/history-manipulation)
- [Git documentation](https://git-scm.com/docs)
