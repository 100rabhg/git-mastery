---
title: Advanced Git Topics
description: Learn advanced Git topics including stash, tags, commit SHA references, and commit message best practices for production teams.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Advanced Topics
</div>

# Advanced Git Topics

Advanced Git is often less about exotic commands and more about using small tools at the right moment.

## `git stash`

**Problem:** You need to switch context quickly, but your current changes are not ready to commit.

**Explanation:** Stash temporarily stores working directory and optionally staged changes so you can return to a cleaner state.

**Solution:** Use stash for short interruptions, not as a long-term storage system.

**Command:**

```bash
git stash push -m "wip: billing form copy cleanup"
git stash list
```

```text
stash@{0}: On feature/billing-copy: wip: billing form copy cleanup
```

Bring it back:

```bash
git stash pop
```

### When to use this?

During interruptions, branch switches, or quick hotfixes when a real commit would be misleading.

### Common mistakes

- Forgetting what is inside old stashes
- Using stash instead of creating a proper branch for multi-day work

### Pro tips

- Name your stash messages
- If the work matters, a commit on a temporary branch is often safer than stash

## Tags and Releases

**Problem:** You shipped version `2.4.0` and need a durable reference to that exact state.

**Explanation:** A tag is a human-friendly reference to a specific commit, commonly used for releases.

**Solution:** Use annotated tags for release points because they include metadata and a message.

**Command:**

```bash
git tag -a v2.4.0 -m "Release version 2.4.0"
git push origin v2.4.0
```

### When to use this?

At release boundaries, rollback checkpoints, or milestone snapshots.

### Common mistakes

- Forgetting to push tags
- Using lightweight tags when release metadata matters

### Pro tips

- Align tags with release notes and deployment records

## Commit SHA References

**Problem:** Someone asks, "Which exact commit introduced this change?"

**Explanation:** Every commit has a SHA identifier, which is how Git refers to history internally. Short SHAs are often enough for local work, but full SHAs avoid ambiguity.

**Solution:** Learn to reference commits directly in logs, diffs, cherry-picks, reverts, and deployments.

**Command:**

```bash
git show a91a7f2
```

```text
  commit 735d8802ba881ca7a7c196c765903fe0d4ebccff (HEAD -> main, origin/main)
  Author: 100rabhg <sourabhpatware100@gmail.com>
  Date:   Fri Apr 3 07:54:48 2026 +0000

      chore: initialize VitePress

  diff --git a/.gitignore b/.gitignore
  new file mode 100644
  index 0000000..9b7ea17
  --- /dev/null
  +++ b/.gitignore
  @@ -0,0 +1,2 @@
  +/node_modules
  +.vscode/*
```

## Commit Message Best Practices

**Problem:** A repository has many commits, but nobody can tell why changes happened.

**Explanation:** Commit messages are part of your engineering communication. Good messages reduce time spent in `git blame`, release notes, incident review, and code review.

**Solution:** Write messages that explain intent, not just activity.

Good examples:

```text
fix: prevent empty password submission
feat: add optimistic UI for comment posting
refactor: isolate billing tax calculation
```

Weak examples:

```text
update
changes
final fix
```

### When to use this?

Always. Commit quality compounds over time.

### Common mistakes

- Writing commit messages after the fact without thinking about reviewer context
- Using vague words like "stuff" or "misc"

### Pro tips

- A good subject line should help a teammate scanning `git log --oneline`
- If your organization benefits from structured commits, use [Conventional Commits](https://www.conventionalcommits.org/)

## Read More

- [Releases and tags on GitHub and GitLab](/github/collaboration-and-automation)
- [Git documentation](https://git-scm.com/docs)
