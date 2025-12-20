export const meta = {
  title: "Git Lesson 7",
  description:
    "Remote repositories masterclass: origin, upstream, add, push, fetch, pull, tracking branches, SSH vs HTTPS, PATs, bare repos, mirroring, submodules, tags, pruning, fork workflows, CLI & VSCode tips, and advanced troubleshooting.",
  difficulty: "Intermediate",
  duration: "60–90 min",
  tags: ["git", "remote", "origin", "upstream", "ssh", "https", "github", "gitlab"],
  updated: "2025-11-25",
  thumbnail: ""
};

// IMAGE IMPORTS (put images in src/assets/git/)
// If you don't have these images, either create placeholders or remove <img/> tags.
import GitRemoteImg from "../../../../assets/git/git-remote.png";
import GitFetchPullImg from "../../../../assets/git/git-fetch-pull.png";
import GitSSHvsHTTPImg from "../../../../assets/git/git-ssh-http.png";
import GitBareImg from "../../../../assets/git/git-bare.png";
import GitSubmoduleImg from "../../../../assets/git/git-submodule.png";
import GitMirrorImg from "../../../../assets/git/git-mirror.png";
import GitPruneImg from "../../../../assets/git/git-prune.png";
import GitErrorsImg from "../../../../assets/git/git-remote-errors.png";

export default function Lesson7() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div
      style={{
        padding: "28px",
        lineHeight: "1.8",
        fontSize: "17px",
        maxWidth: 1100,
        margin: "auto",
        color: "#222",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>
        Git – Lesson 7: Remote Repositories Masterclass (origin, push, fetch, pull, upstream & advanced)
      </h1>

      <p style={{ color: "#666", marginBottom: 18 }}>
        This lesson covers everything you need to know about remote repositories: adding and managing
        remotes, push & fetch & pull semantics, tracking branches and upstreams, SSH vs HTTPS,
        authentication (SSH keys, PATs), bare repositories, mirroring, submodules, pruning, tags,
        fork workflows, GitHub/GitLab nuances, VSCode & GitHub CLI tips, and a full real-world remote
        workflow with troubleshooting and interview questions.
      </p>

      <div
        style={{
          background: "#e8f7ff",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #007bff",
          marginBottom: 24,
        }}
      >
        <strong>Learning outcomes:</strong> After this lesson you will be able to:
        <ul>
          <li>Connect local repos to remotes using SSH & HTTPS</li>
          <li>Understand push/pull/fetch differences and tracking branches</li>
          <li>Manage multiple remotes (origin, upstream)</li>
          <li>Handle authentication issues (SSH keys, PAT)</li>
          <li>Use bare & mirrored repos for advanced setups</li>
          <li>Work with submodules and tags</li>
          <li>Troubleshoot remote errors and fix diverged branches</li>
        </ul>
      </div>

      {/* OVERVIEW */}
      <section style={{ marginTop: 30 }}>
        <h2>1️⃣ Remote repositories — the big picture</h2>
        <p>
          A remote repository is simply a Git repository that lives on another machine or service
          (GitHub, GitLab, Bitbucket, your own server). Remotes let teams share work. The most common
          remote name is <code>origin</code>, and many workflows include an <code>upstream</code> remote
          for the original repository when working with forks.
        </p>

        <img
          src={GitRemoteImg}
          alt="git remote concept"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Remotes are simply URLs with names. Example:
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git remote add origin https://github.com/yourname/repo.git
git remote add upstream https://github.com/someorg/repo.git`}
        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Tip: Use <code>git remote -v</code> to list remotes and see fetch/push URLs.
        </div>
      </section>

      {/* BASICS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Basic remote commands</h2>
        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Show remotes
git remote -v

# Add a remote (origin)
git remote add origin <url>

# Push local main to origin and set upstream
git push -u origin main

# Fetch from remote (doesn't change working tree)
git fetch origin

# Pull from remote (fetch + merge or fetch + rebase)
git pull origin main

# Remove a remote
git remote remove origin

# Rename a remote
git remote rename origin upstream`}
        </pre>

        <p>
          Important: <code>git push -u origin branch</code> sets the upstream so you can later use
          <code>git push</code> and <code>git pull</code> without specifying the remote and branch.
        </p>
      </section>

      {/* FETCH vs PULL */}
      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ Fetch vs Pull — what's the difference?</h2>

        <img
          src={GitFetchPullImg}
          alt="fetch vs pull"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          <strong>git fetch</strong> downloads objects and refs from the remote into your local
          repository (remote branches under <code>origin/</code>). It does not change your working
          files or current branch.
        </p>

        <p>
          <strong>git pull</strong> is a convenience that runs <code>git fetch</code> then merges or
          rebases the fetched branch into your current branch (default is merge unless configured
          otherwise).
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# safer workflow:
git fetch origin
git status   # inspect differences
git merge origin/main   # or git rebase origin/main

# quick:
git pull origin main   # fetch + merge`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          Best practice: prefer <code>git fetch</code> + manual merge/rebase in critical projects so
          you can inspect changes before integrating.
        </div>
      </section>

      {/* TRACKING BRANCHES */}
      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Tracking branches & upstreams</h2>

        <p>
          When you create a branch and push it with <code>-u</code>, Git sets your local branch to
          track a remote branch. Tracking makes it easy to run <code>git push</code> and
          <code>git pull</code> without arguments.
        </p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# create & push and set upstream
git checkout -b feature-login
git push -u origin feature-login

# now simple push/pull works
git push
git pull`}
        </pre>

        <p>
          To see the upstream:
          <code>git branch -vv</code> shows which remote branch each local branch tracks and whether
          the local branch is ahead/behind.
        </p>
      </section>

      {/* MULTIPLE REMOTES */}
      <section style={{ marginTop: 28 }}>
        <h2>5️⃣ Multiple remotes — origin & upstream (fork workflow)</h2>

        <p>
          When you fork a repository, you'll usually have two remotes:
          <ul>
            <li><code>origin</code> — your fork (where you push)</li>
            <li><code>upstream</code> — the original repo (you fetch from)</li>
          </ul>
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Add upstream once:
git remote add upstream https://github.com/original/repo.git

# Sync upstream changes into your forked repo:
git fetch upstream
git checkout main
git merge upstream/main
# or rebase:
git rebase upstream/main

# Push back to your fork:
git push origin main`}
        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Tip: Keep your fork synced with upstream frequently to reduce conflicts.
        </div>
      </section>

      {/* SSH VS HTTPS */}
      <section style={{ marginTop: 28 }}>
        <h2>6️⃣ SSH vs HTTPS remotes — which to choose?</h2>

        <img
          src={GitSSHvsHTTPImg}
          alt="ssh vs https"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          <strong>HTTPS:</strong> Simple URL like <code>https://github.com/user/repo.git</code>. It
          often uses username/password or PAT for authentication. Good for environments where SSH is
          blocked or when PATs are preferred.
        </p>

        <p>
          <strong>SSH:</strong> URL like <code>git@github.com:user/repo.git</code>. Uses SSH keys and
          is preferred for developers who want seamless auth without typing credentials.
        </p>

        <h3>SSH key setup (quick)</h3>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# generate key (on Linux / macOS / Git Bash)
ssh-keygen -t ed25519 -C "your_email@example.com"
# or (RSA)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# copy public key to clipboard
cat ~/.ssh/id_ed25519.pub   # then paste into GitHub SSH keys settings`}
        </pre>

        <h3>PAT (Personal Access Token) for HTTPS</h3>
        <p>
          Many Git hosting services (GitHub since Aug 2021) require PATs for HTTPS auth rather than
          passwords. Create a PAT in your account settings and use it as the password when Git
          prompts.
        </p>
      </section>

      {/* AUTHENTICATION */}
      <section style={{ marginTop: 28 }}>
        <h2>7️⃣ Authentication & common issues</h2>

        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Common error:
remote: Invalid username or password.
fatal: Authentication failed

# Fixes:
- If using HTTPS, generate a PAT and use it as password.
- If using SSH, ensure your public key is added to your Git host and ssh-agent is running.
- For Windows, consider Git Credential Manager for secure storage.`}
        </pre>

        <p>
          For SSH troubleshooting:
          <pre
            style={{
              background: "#f5f5f7",
              padding: 10,
              borderRadius: 6,
              overflowX: "auto",
            }}
          >
{`ssh -T git@github.com   # test ssh connection
# You should see a welcome message if keys are configured.`}
          </pre>
        </p>
      </section>

      {/* BARE REPOS */}
      <section style={{ marginTop: 28 }}>
        <h2>8️⃣ Bare repositories & server-side repos</h2>

        <img
          src={GitBareImg}
          alt="bare repo"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          A bare repository has no working directory and is typically used as a central remote. It
          contains only the <code>.git</code> data. On servers, you usually create bare repos:
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# create bare repo on server
git init --bare /srv/git/myrepo.git

# clone from server
git clone user@server:/srv/git/myrepo.git`}
        </pre>

        <p>
          Bare repos are the basis of multiple remote workflows (mirrors, CI servers, deploy servers).
        </p>
      </section>

      {/* MIRRORING */}
      <section style={{ marginTop: 28 }}>
        <h2>9️⃣ Mirroring repositories</h2>

        <img
          src={GitMirrorImg}
          alt="mirror repo"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Mirroring is used to create a full copy of a repository including all refs and tags:
        </p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# clone mirror
git clone --mirror https://github.com/user/repo.git
cd repo.git
git push --mirror ssh://git@yourserver:/srv/git/repo.git`}
        </pre>

        <p>
          Use mirrors for backups, migration, or moving between hosting providers.
        </p>
      </section>

      {/* SUBMODULES */}
      <section style={{ marginTop: 28 }}>
        <h2>🔟 Submodules — include one repository inside another</h2>

        <img
          src={GitSubmoduleImg}
          alt="submodule"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Submodules allow you to include another repo within a parent repo. They are powerful but
          tricky—use with care.
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Add submodule
git submodule add https://github.com/example/library.git libs/library

# Clone repo with submodules
git clone --recurse-submodules https://github.com/user/repo.git

# Initialize and update submodules after clone
git submodule init
git submodule update

# Update submodules to latest commit from their remotes
cd libs/library
git checkout main
git pull`}
        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Note: Submodules record a specific commit in the parent repo; updating a submodule requires
          committing the new submodule SHA in the parent repo.
        </div>
      </section>

      {/* TAGS */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣1️⃣ Tags — share release points</h2>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0"

# push tags
git push origin v1.0.0

# push all tags
git push origin --tags`}
        </pre>

        <p>Tags are useful for marking releases and are commonly pushed to remotes.</p>
      </section>

      {/* PRUNING */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣2️⃣ Prune & cleanup remote branches</h2>

        <img
          src={GitPruneImg}
          alt="prune"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          When remote branches are deleted on the server, your local copy still lists them under
          <code>origin/</code>. Use fetch --prune to remove deleted remote branches locally:
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Prune deleted remote branches
git fetch --prune origin

# or configure fetch to prune automatically:
git config --global fetch.prune true`}
        </pre>

        <p>
          Delete a remote branch:
          <code>git push origin --delete feature-branch</code>
        </p>
      </section>

      {/* DIVERGED BRANCHES */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣3️⃣ Fixing diverged branches (rejected updates)</h2>

        <p>
          A common error when pushing is: <code>rejected - non-fast-forward</code>. This means your
          local branch is behind the remote. Resolve by fetching and integrating changes, then push:
        </p>

        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# When push is rejected:
git fetch origin
git merge origin/main   # or git rebase origin/main

# If you are sure:
git push --force-with-lease origin main   # safer force push`}
        </pre>

        <div
          style={{
            background: "#ffd8d8",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          Warning: force-pushing rewrites remote history — use <code>--force-with-lease</code> to
          avoid clobbering others' work when possible.
        </div>
      </section>

      {/* REMOTE HEAD */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣4️⃣ Remote HEAD & default branches</h2>

        <p>
          The remote <code>HEAD</code> points to the default branch on the remote (e.g., main). When
          cloning, Git creates a local branch that tracks the remote HEAD by default.
        </p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Show remote HEAD reference
git ls-remote --symref origin HEAD`}
        </pre>

        <p>Useful when you manage multiple branches and need to determine which one is the default.</p>
      </section>

      {/* BARE & DEPLOY */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣5️⃣ Using bare repos for deployment & CI</h2>

        <p>
          Bare repositories are perfect as central repos for CI systems or simple deployment hooks.
          You can create post-receive hooks to checkout code into a deployment directory.
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Example post-receive hook (on server, inside /srv/git/repo.git/hooks/post-receive)
#!/bin/sh
GIT_WORK_TREE=/var/www/myapp git checkout -f main`}
        </pre>
      </section>

      {/* GITHUB CLI & VS CODE */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣6️⃣ GitHub CLI & VSCode tips for remote workflows</h2>

        <p>
          The GitHub CLI (<code>gh</code>) speeds up PR creation and management:
        </p>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# create a PR from current branch
gh pr create --title "Feature X" --body "Description" --base main --head mybranch

# view PRs
gh pr list

# checkout a PR locally
gh pr checkout 123`}
        </pre>

        <p>
          VSCode provides a GUI for push/pull, creating remotes, and handling merge conflicts. Use
          the Source Control panel and the GitLens extension for advanced insights (blame, history).
        </p>
      </section>

      {/* REAL-WORLD REMOTE WORKFLOW */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣7️⃣ Real-world remote workflow (end-to-end)</h2>

        <p>
          Scenario: You fork a repo, implement a feature, keep your fork synced with upstream, and
          open a PR.
        </p>

        <h3>Steps</h3>
        <ol>
          <li>Fork the repository on GitHub.</li>
          <li>Clone your fork: <code>git clone git@github.com:you/repo.git</code></li>
          <li>Add upstream: <code>git remote add upstream git@github.com:original/repo.git</code></li>
          <li>Create branch: <code>git checkout -b feature-x</code></li>
          <li>Work, commit, push: <code>git push -u origin feature-x</code></li>
          <li>Create PR from your fork's feature branch to upstream's main</li>
          <li>If upstream changed, keep your branch updated: <code>git fetch upstream; git rebase upstream/main</code></li>
          <li>Push updated branch to your fork (may require force-with-lease): <code>git push --force-with-lease origin feature-x</code></li>
        </ol>

        <div
          style={{
            background: "#e8fff0",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          This workflow keeps your PR clean and helps maintain a tidy repo history.
        </div>
      </section>

      {/* ADVANCED: RESET TO REMOTE */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣8️⃣ Reset local branch to match remote</h2>

        <p>
          Sometimes you want your local branch to exactly match the remote (discard local changes).
          Use cautiously:
        </p>

        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git fetch origin
git reset --hard origin/main`}
        </pre>

        <div
          style={{
            background: "#ffd8d8",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          Danger: This discards local commits and working tree changes. Use only when you are sure.
        </div>
      </section>

      {/* TROUBLESHOOTING: AUTH & PERMISSIONS */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣9️⃣ Troubleshooting remote errors (auth, permissions, rejected)</h2>

        <img
          src={GitErrorsImg}
          alt="remote errors"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>Authentication failed</h3>
        <pre
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Fix steps:
- If HTTPS: ensure PAT is used instead of password; update stored credentials.
- If SSH: add public key to account, ensure ssh-agent is running and key is loaded:
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519`}
        </pre>

        <h3>Remote rejected (non-fast-forward)</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# safe approach:
git fetch origin
git merge origin/main   # resolve conflicts if any
git push

# if you must force:
git push --force-with-lease origin main`}
        </pre>

        <h3>Permission denied</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# Ensure you have write access to the remote repo.
# For GitHub, be a collaborator or have fork & PR workflow.`}
        </pre>
      </section>

      {/* ADVANCED: SUBMODULE STRATEGIES */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣0️⃣ Submodule strategies & pitfalls</h2>

        <p>
          Submodules lock to commit SHAs. When working on submodules in tandem with parent, coordinate
          commit orders and pushes. Use <code>git submodule foreach</code> to run commands across
          submodules and consider alternatives (git subtree) for simpler workflows.
        </p>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# run tests in every submodule
git submodule foreach 'git pull origin main && npm test'`}
        </pre>
      </section>

      {/* MINI-PROJECT: FORK & SYNC */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣1️⃣ Mini-project — Fork + Sync + PR flow</h2>

        <p>
          Follow these steps to practise a full fork workflow. This is the real developer flow when
          contributing to open-source.
        </p>

        <h3>Step 1 — Fork and clone</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# clone your fork
git clone git@github.com:you/repo.git
cd repo

# add upstream
git remote add upstream git@github.com:original/repo.git`}
        </pre>

        <h3>Step 2 — Create feature branch</h3>
        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git checkout -b feature-awesome
# implement changes
git add .
git commit -m "feat: add awesome feature"
git push -u origin feature-awesome`}
        </pre>

        <h3>Step 3 — Create PR & keep branch updated</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# if upstream changes before merge:
git fetch upstream
git checkout main
git merge upstream/main   # or git rebase upstream/main

# rebase your feature
git checkout feature-awesome
git rebase main

# push updated feature (force required)
git push --force-with-lease origin feature-awesome`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          Using <code>--force-with-lease</code> is safer than <code>--force</code> because it checks
          that your remote branch has not advanced unexpectedly.
        </div>
      </section>

      {/* ADVANCED: MIRROR MIGRATION */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣2️⃣ Migrating between hosts (mirror + push)</h2>

        <p>
          When moving repositories between hosts (e.g., GitHub → GitLab), use mirror clone and push:
        </p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git clone --mirror https://github.com/old/repo.git
cd repo.git
git remote add new ssh://git@gitlab.com/group/repo.git
git push --mirror new`}
        </pre>

        <p>
          This copies refs, branches, and tags. Be mindful of LFS objects and CI pipeline settings
          which may require separate migration steps.
        </p>
      </section>

      {/* INTERVIEW PREP */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣3️⃣ Interview questions (remote & advanced)</h2>

        <ol>
          <li>What is the difference between git fetch and git pull?</li>
          <li>Explain what <code>git push -u origin branch</code> does.</li>
          <li>How do you resolve a non-fast-forward push rejection?</li>
          <li>How do you mirror a repository to a new host?</li>
          <li>Describe how to set up SSH keys and test them with GitHub.</li>
          <li>What is a bare repository and why is it used on servers?</li>
          <li>Explain the fork + upstream workflow for open-source contributions.</li>
          <li>How to safely force push your branch if needed?</li>
          <li>How does <code>git fetch --prune</code> help maintain cleanliness?</li>
          <li>Describe submodules vs subtree—pros & cons.</li>
        </ol>
      </section>

      {/* CHEATSHEET */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣4️⃣ Remote cheatsheet — quick commands</h2>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# show remotes
git remote -v

# add remote
git remote add origin <url>

# push and set upstream
git push -u origin branch

# fetch and prune
git fetch --prune origin

# delete remote branch
git push origin --delete feature-x

# rename remote
git remote rename origin upstream

# mirror clone
git clone --mirror <url>

# submodule commands
git submodule add <url> path
git submodule update --init --recursive`}
        </pre>
      </section>

      {/* TROUBLESHOOTING SUMMARY */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣5️⃣ Troubleshooting summary (common patterns)</h2>

        <ul>
          <li>
            <strong>Auth failed:</strong> Use PAT for HTTPS or configure SSH keys. Test with{" "}
            <code>ssh -T git@github.com</code>.
          </li>
          <li>
            <strong>Non-fast-forward (push rejected):</strong> Fetch and merge/rebase then push. Use
            force-with-lease if needed.
          </li>
          <li>
            <strong>Diverged branch:</strong> Communicate with team — don't force-push others' work.
          </li>
          <li>
            <strong>Submodule must be updated:</strong> Update submodule commit and push submodule repo first.
          </li>
          <li>
            <strong>Large files (LFS):</strong> Ensure LFS is installed and objects are pushed to LFS-enabled remote.
          </li>
        </ul>
      </section>

      {/* PRACTICE TASKS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣6️⃣ Practice tasks (do these)</h2>

        <ol>
          <li>Set up SSH keys and clone a private repo using SSH.</li>
          <li>Fork an open-source project, implement a tiny fix, open a PR following fork workflow.</li>
          <li>Create a bare repo on a server and push to it as a remote origin.</li>
          <li>Mirror a GitHub repo to another host using <code>--mirror</code>.</li>
          <li>Add a submodule and update it; commit new submodule SHA in parent repo.</li>
          <li>Simulate a push rejection and fix it by fetching/rebasing and pushing safely.</li>
        </ol>
      </section>

      {/* FINAL NOTES */}
      <section style={{ marginTop: 28, marginBottom: 60 }}>
        <h2>✔ Conclusion</h2>

        <p>
          Remote repositories are the backbone of collaborative development. Mastering the
          commands and concepts in this lesson will let you contribute to any Git-based project with
          confidence and ease. Practice the mini-projects and use safe commands like <code>fetch</code>
          and <code>--force-with-lease</code> to avoid destructive mistakes.
        </p>

        <p>
          When you're ready, send Lesson 8 (or tell me if you want Lesson 7 expanded further with
          localized Tamil explanations, extra screenshots, or a split-file format).
        </p>
      </section>
    </div>
  );
}

Lesson7.displayName = "GIT Lesson 7 – Full Content (Remote Masterclass)";
