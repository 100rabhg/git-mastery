---
title: Git Setup and Authentication
description: Install Git on Windows, macOS, and Linux, set your identity, understand SSH vs HTTPS, and connect your first remote with confidence.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Setup & Authentication
</div>

# Git Setup and Authentication

This lesson gets your machine ready for real work: install Git, configure your identity, choose an authentication method, and connect to a remote safely.

## Install Git on Windows, macOS, and Linux

**Problem:** A learner wants to start using Git, but the machine is not ready and every tutorial assumes Git is already installed.

**Explanation:** Installation is a one-time setup, but it matters because later issues often come from outdated Git versions, shell integration, or missing SSH tools.

**Solution:** Install Git from the official distribution page, then verify the version from a terminal.

**Command:**

```bash
git --version
```

```text
git version 2.48.1
```

### Installation guide

- Windows: install from [git-scm.com/downloads](https://git-scm.com/downloads) and include Git Bash unless your team standardizes on PowerShell
- macOS: install Xcode Command Line Tools or use Homebrew if your team already uses it
- Linux: install with your package manager, then confirm the version and available SSH tools

### When to use this?

Use this during onboarding, on a new laptop, or when troubleshooting authentication and compatibility issues.

### Common mistakes

- Using an old system Git without noticing
- Skipping terminal verification after installation
- Copying commands from a tutorial that assumes a different shell

### Pro tips

- Ask your team if they require a minimum Git version before adopting newer flags like `git switch`.
- Document your shell choice early so terminal examples remain consistent.

## Configure Your Identity

**Problem:** Commits show the wrong name or email, which breaks attribution and sometimes code owner automation.

**Explanation:** Git stores author information inside each commit. If your config is wrong before you start committing, cleanup later is annoying.

**Solution:** Set your global identity once, then override locally only when a repository needs a different identity.

**Command:**

```bash
git config --global user.name "100rabhg"
git config --global user.email "sourabhpatware100@gmail.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

```bash
git config --global --list
```

```text
user.name=100rabhg
user.email=sourabhpatware100@gmail.com
init.defaultbranch=main
pull.rebase=false
```

### When to use this?

Use global config for personal defaults across all repositories. Use local config when work and personal repositories need separate identities.

### Common mistakes

- Setting `user.name` to a GitHub username instead of a real display name
- Forgetting that `--global` affects every repository on the machine
- Copying a teammate's config without understanding the defaults

### Pro tips

- Run `git config --list --show-origin` when debugging where a setting came from.
- Decide intentionally whether your team prefers merge-based pulls or rebase-based pulls.

## Start a Repository or Clone an Existing One

**Problem:** You need to begin tracking a project, but you are unsure whether to use `init` or `clone`.

**Explanation:** `git init` creates a brand-new local repository. `git clone` copies an existing repository, including remote references and history.

**Solution:** Use `init` for brand-new projects and `clone` when the repository already exists on a server.

**Command:**

```bash
git init
git clone git@github.com:your-org/platform-api.git
```

```text
Cloning into 'platform-api'...
remote: Enumerating objects: 2481, done.
Receiving objects: 100% (2481/2481), 1.14 MiB | 2.83 MiB/s, done.
Resolving deltas: 100% (1310/1310), done.
```

## SSH vs HTTPS Authentication

**Problem:** `git push` fails because Git can see the remote URL but cannot prove you are allowed to write.

**Explanation:** Authentication decides how you identify yourself to the remote host:

- HTTPS usually uses a browser sign-in, token, or credential manager
- SSH uses a key pair where your public key is registered with the platform

**Solution:** Prefer SSH for developer machines when your platform supports it well. It usually reduces repeated credential prompts and works cleanly in automation-friendly environments.

**Command:**

```bash
ssh-keygen -t ed25519 -C "sourabhpatware100@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Then test:

```bash
ssh -T git@github.com
```

```text
Hi your-github-username! You've successfully authenticated, but GitHub does not provide shell access.
```

### When to use this?

Use SSH when you want stable authentication across terminal sessions and repositories. Use HTTPS when your organization manages authentication through credential helpers or browser-based login policies.

### Common mistakes

- Adding the private key to GitHub instead of the public key
- Forgetting to start the SSH agent
- Cloning with HTTPS and later wondering why SSH setup changed nothing

### Pro tips

- Check the remote URL before debugging auth: `git remote -v`
- If a repository already uses HTTPS, switch it with `git remote set-url origin git@github.com:org/repo.git`

Read more: [GitHub SSH setup documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Add a Remote

**Problem:** You created a local repo but it is not connected to GitHub yet.

**Explanation:** A remote is just a named connection to another repository. `origin` is a convention, not a requirement.

**Solution:** Add the remote, then push the current branch and set upstream tracking.

**Command:**

```bash
git remote add origin git@github.com:your-org/git-github-course.git
git push -u origin main
```

```text
Enumerating objects: 14, done.
Writing objects: 100% (14/14), 3.22 KiB | 3.22 MiB/s, done.
branch 'main' set up to track 'origin/main'.
```

## Read More

- [Official Git downloads](https://git-scm.com/downloads)
- [Git documentation](https://git-scm.com/docs)
- [Basic commands for daily work](/git/basic-commands)
