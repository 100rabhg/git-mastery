---
title: Lab Clean Up Git Commit History
description: Practice interactive rebase to squash, reorder, and reword local commits into a cleaner history before opening a pull request.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/labs/">Labs</a> / Clean History
</div>

# Lab: Clean Up Git Commit History

## Problem statement

Your branch works, but the history includes messages like `wip`, `fix typo`, and `try again`. You want a review-ready branch before opening a pull request.

## Expected outcome

- related commits are grouped meaningfully
- commit messages explain intent
- the resulting history is still truthful and understandable

## Hints

- Use `git rebase -i`
- Not every tiny commit must survive
- Do not erase useful checkpoints if they explain an important design decision

## Suggested practice setup

Create four to six small commits with weak messages, then clean them up into two or three strong commits.

## Success criteria

You can explain why history cleanup helps code review and where the line is between clarity and over-editing.

## Related lesson

- [Interactive rebase and cleanup](/git/history-manipulation)
