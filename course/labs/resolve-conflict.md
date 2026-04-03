---
title: Lab Resolve a Git Conflict
description: Practice resolving a Git merge or rebase conflict by understanding both code paths and creating the intended final version safely.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/labs/">Labs</a> / Resolve a Conflict
</div>

# Lab: Resolve a Git Conflict

## Problem statement

Two branches both changed the same function signature. One branch added a `discountCode` argument. The other renamed a variable for readability. Git cannot combine them automatically.

## Expected outcome

- the function keeps the correct final signature
- the code compiles or passes local checks
- the merge or rebase finishes successfully

## Hints

- Read the conflict markers line by line
- Ask what each side was trying to achieve
- After editing, stage the file and continue the interrupted Git operation

## Suggested practice setup

Create two branches from the same base, edit the same line differently, then merge or rebase one onto the other.

## Success criteria

You can explain the semantic resolution, not just the Git commands you typed.

## Related lesson

- [Conflict resolution guide](/git/conflict-resolution)
