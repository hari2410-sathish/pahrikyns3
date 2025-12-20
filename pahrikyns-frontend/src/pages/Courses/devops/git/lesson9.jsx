export const meta = {
  title: "Git Lesson 9",
  description:
    "Masterclass: Tags, Semantic Versioning, Annotated vs Lightweight tags, GPG-signed tags, release workflows + Undo tools: restore, reset (soft/mixed/hard), revert, reflog recovery, undo staging, undo merges, patch undo, and rescue workflows.",
  difficulty: "Intermediate",
  duration: "60–120 min",
  tags: ["git", "tags", "semver", "reset", "restore", "revert", "reflog", "recovery"],
  updated: "2025-11-25",
  thumbnail: ""
};

// Image imports (place these in src/assets/git/)
import GitTagImg from "../../../../assets/git/git-tag.png";
import GitSemverImg from "../../../../assets/git/git-semver.png";
import GitAnnotatedImg from "../../../../assets/git/git-annotated-tag.png";
import GitResetImg from "../../../../assets/git/git-reset-levels.png";
import GitRestoreImg from "../../../../assets/git/git-restore.png";
import GitReflogImg from "../../../../assets/git/git-reflog.png";
import GitUndoFlowImg from "../../../../assets/git/git-undo-flow.png";

export default function Lesson9() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, lineHeight: 1.8, fontSize: 17, maxWidth: 1100, margin: "auto", color: "#222" }}>
      {/* TITLE */}
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
        Git – Lesson 9 & 10: Tags, Semantic Versioning, and Undo Masterclass
      </h1>

      <p style={{ color: "#666", marginBottom: 18 }}>
        Combined master lesson covering release tagging & versioning (tags, annotated tags, signed tags,
        release strategies) plus comprehensive undo tools (restore, reset, revert, reflog, undo merges,
        patch-level undo, and recovery). Contains diagrams, real-world mini-projects, troubleshooting,
        and interview prep.
      </p>

      <div style={{ background: "#e8fff5", padding: 14, borderRadius: 8, borderLeft: "5px solid #28a745", marginBottom: 22 }}>
        <strong>Goals:</strong>
        <ul>
          <li>Understand and apply tags for releases, semver, and CI/CD integration.</li>
          <li>Master restore, reset (soft/mixed/hard), revert, reflog and recover lost work safely.</li>
          <li>Learn real-world workflows and rescue tactics used by senior developers.</li>
        </ul>
      </div>

      {/* ========================= TAGS SECTION ========================= */}
      <section style={{ marginTop: 30 }}>
        <h2>1️⃣ TAGS — What & Why</h2>
        <p>
          Tags mark a specific point in Git history — commonly used to mark releases (v1.0.0). Tags are lightweight
          pointers or annotated objects containing metadata (message, tagger, date). They are ideal for release marks.
        </p>

        <img src={GitTagImg} alt="git tags concept" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <h3>Types of tags</h3>
        <ul>
          <li><strong>Lightweight tag</strong> — simple pointer to a commit. (like branch that doesn’t move)</li>
          <li><strong>Annotated tag</strong> — full object: message, tagger, date, can be signed with GPG.</li>
        </ul>

        <h3>Basic commands</h3>
        <pre style={{ background: "#1f1f1f", color: "#f1f1f1", padding: 14, borderRadius: 8 }}>
{`# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release 1.0.0"

# Show tags
git tag

# Show tag details (annotated)
git show v1.0.0`}
        </pre>

        <h3>Push tags to remote</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# push a single tag
git push origin v1.0.0

# push all tags
git push origin --tags`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderRadius: 8, borderLeft: "5px solid #f4b400" }}>
          Tip: Tags are not pushed by default with <code>git push</code> unless you specify them or use --tags.
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Semantic Versioning (SemVer)</h2>
        <img src={GitSemverImg} alt="semver" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Semantic versioning is MAJOR.MINOR.PATCH:
          <ul>
            <li><strong>MAJOR</strong> — incompatible API changes</li>
            <li><strong>MINOR</strong> — backward-compatible features</li>
            <li><strong>PATCH</strong> — backward-compatible bug fixes</li>
          </ul>
        </p>

        <h3>Tagging strategy examples</h3>
        <pre style={{ background: "#1f1f1f", color: "#f1f1f1", padding: 12, borderRadius: 8 }}>
{`# Release v2.3.1
git tag -a v2.3.1 -m "Release v2.3.1"

# hotfix -> bump PATCH
# feature -> bump MINOR
# breaking -> bump MAJOR`}
        </pre>

        <p>
          Many CI pipelines generate tags automatically (e.g., using commit messages, version files, or npm package.json).
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ Signed Tags (GPG)</h2>
        <p>
          Annotated tags can be cryptographically signed so consumers can verify author of the tag.
        </p>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Create signed annotated tag
git tag -s v1.2.0 -m "Signed release v1.2.0"

# Verify signed tag
git tag -v v1.2.0`}
        </pre>
        <p>Requires a GPG private key configured with Git (<code>git config user.signingkey &lt;key-id&gt;</code>).</p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Tagging in monorepos & microservices</h2>
        <p>
          Tagging strategies differ in monorepos: you may tag per-package, use composite tags, or use release tooling (Lerna, Changesets).
        </p>
        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# Example using npm package version (repo root)
npm version patch   # updates package.json and creates a tag: vX.Y.Z
git push origin --tags`}
        </pre>
        <p>Ensure build & test steps run for the relevant package(s) when tagging.</p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>5️⃣ Moving & Deleting Tags</h2>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# delete local tag
git tag -d v1.0.0

# delete remote tag
git push origin --delete v1.0.0

# move tag to a different commit:
git tag -f v1.0.0 <new-commit>
git push --force origin v1.0.0`}
        </pre>
        <div style={{ background: "#ffd8d8", padding: 12, borderRadius: 8, borderLeft: "5px solid #ff5c5c" }}>
          Warning: moving tags rewrites remote tag pointers — coordinate with team.
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>6️⃣ Tagging & CI/CD Integration</h2>
        <p>
          Common CI flows:
          <ul>
            <li>Tag created on merge to main triggers release pipeline.</li>
            <li>CI can create tags automatically (e.g., GitHub Actions using actions/create-release).</li>
            <li>Use annotated signed tags for release authenticity in production artifacts.</li>
          </ul>
        </p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# Example GitHub Actions step to create tag (pseudo)
- name: Create Release Tag
  run: |
    git tag -a v${{ envVERSION }} -m "Release ${{ envVERSION }}"
    git push origin --tags`}
        </pre>
      </section>

      {/* ========================= UNDO SECTION ========================= */}
      <section style={{ marginTop: 40 }}>
        <h2>7️⃣ UNDO TOOLS — Overview (restore / reset / revert / reflog)</h2>
        <p>
          Git includes multiple "undo" tools with different scopes:
          <ul>
            <li><strong>git restore</strong> — undo changes in working tree and staging area (file-level)</li>
            <li><strong>git reset</strong> — move branch pointer (undo commits: soft/mixed/hard)</li>
            <li><strong>git revert</strong> — create a new commit that undoes a previous commit (safe for shared history)</li>
            <li><strong>git reflog</strong> — history of HEAD moves; your rescue tool.</li>
          </ul>
        </p>

        <img src={GitUndoFlowImg} alt="undo flow" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>8️⃣ git restore — file-level undo</h2>
        <img src={GitRestoreImg} alt="git restore" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />
        <pre style={{ background: "#1f1f1f", color: "#f1f1f1", padding: 12, borderRadius: 8 }}>
{`# Discard working tree changes for a file (unstaged)
git restore file.txt

# Unstage a file (move from staged to unstaged)
git restore --staged file.txt

# Restore file to a specific commit
git restore --source <commit-id> -- file.txt`}
        </pre>
        <p>Use <code>git restore</code> for fine-grained file fixes without touching branch history.</p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>9️⃣ git reset — undo commits (soft / mixed / hard)</h2>
        <img src={GitResetImg} alt="git reset levels" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <h3>Soft reset — keep changes staged</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`git reset --soft HEAD~1  # moves branch back one commit, leaves index & working tree intact`}
        </pre>

        <h3>Mixed reset (default) — keep changes unstaged</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`git reset HEAD~1  # moves branch back, unstages changes (working tree intact)`}
        </pre>

        <h3>Hard reset — discard changes</h3>
        <pre style={{ background: "#ffe6e6", padding: 12, borderRadius: 8 }}>
{`git reset --hard HEAD~1  # destructive: moves branch and resets index & working tree to target commit`}
        </pre>

        <div style={{ background: "#ffd8d8", padding: 12, borderRadius: 8, borderLeft: "5px solid #ff5c5c" }}>
          <strong>Warning:</strong> Hard reset discards uncommitted work. Use reflog if you need recovery.
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>🔟 git revert — safe undo for public history</h2>
        <p>
          <code>git revert &lt;commit&gt;</code> creates a new commit that negates the targeted commit. This is the
          safe approach for undoing commits that are already pushed and potentially shared with others.
        </p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# revert a commit
git revert <commit-id>

# revert multiple commits (range)
git revert <oldest>.. <newest>  # note direction and behavior differs; test carefully`}
        </pre>

        <p>Reverting preserves history and is ideal for production rollbacks without rewriting history.</p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣1️⃣ Combining tools: common undo workflows</h2>
        <p>Examples of practical tasks and how to use the right tool:</p>

        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# 1) I committed prematurely and want the changes back in the index (keep changes staged):
git reset --soft HEAD~1

# 2) I committed and want the changes in the working tree (unstaged):
git reset HEAD~1

# 3) I want to remove local commits and match remote exactly:
git fetch origin
git reset --hard origin/main

# 4) I need to undo a public commit safely:
git revert <commit-id>`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderRadius: 8, borderLeft: "5px solid #f4b400" }}>
          Remember: <em>reset</em> rewrites history (dangerous on shared branches). <em>revert</em> does not.
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣2️⃣ git reflog — your rescue toolkit</h2>
        <img src={GitReflogImg} alt="git reflog" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />
        <p>
          Reflog records every update to HEAD (including commits, resets, rebases). Use it to recover lost heads.
        </p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# show reflog
git reflog

# recover commit (create branch from old HEAD)
git checkout -b recover-branch <reflog-hash>

# or reset to a reflog entry
git reset --hard <reflog-hash>`}
        </pre>

        <div style={{ background: "#e8fff0", padding: 12, borderRadius: 8, borderLeft: "5px solid #28a745" }}>
          Tip: Reflog entries are local. If reflog doesn't show it, try <code>git fsck --lost-found</code> (advanced).
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣3️⃣ Undo staged changes & patch-level undo</h2>
        <p>To unstage files:</p>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`git restore --staged file.txt   # newer command
# or old style:
git reset HEAD file.txt`}
        </pre>

        <p>To interactively undo hunks:</p>
        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# interactively select hunks to unstage:
git add -p   # stage hunks interactively
git restore -p file.txt  # interactively restore parts`}
        </pre>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣4️⃣ Undoing merges & rollbacks</h2>
        <p>
          If a merge commit caused problems after push, revert the merge commit (requires special flag).
        </p>

        <pre style={{ background: "#fff7e6", padding: 12, borderRadius: 8 }}>
{`# revert a merge commit:
git revert -m 1 <merge-commit>

# explanation:
# -m 1 indicates parent number to keep (usually main)
# this creates a new commit that undoes the merge changes`}
        </pre>

        <p>
          If the merge is local and you haven't pushed, consider <code>git reset --hard &lt;pre-merge-hash&gt;</code> or
          <code>git merge --abort</code> depending on state.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣5️⃣ Removing sensitive files from history (BFG / git filter-repo)</h2>
        <p>
          For secrets accidentally committed, do not rely on simple resets. Use tools like <code>git filter-repo</code>
          or <code>BFG Repo Cleaner</code> to rewrite history and then force-push (coordinate with team).
        </p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# Example (BFG):
bfg --delete-files id_rsa
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force --all`}
        </pre>

        <div style={{ background: "#ffd8d8", padding: 12, borderRadius: 8, borderLeft: "5px solid #ff5c5c" }}>
          Important: Rewriting history is disruptive. Notify collaborators and consider new clones.
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣6️⃣ Real-world mini-project — Release & Rollback</h2>
        <p>We’ll simulate a release with tagging, then a rollback using revert.</p>

        <h3>Step A — Setup repo</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`mkdir release-lab
cd release-lab
git init
echo "v1" > app.txt
git add .
git commit -m "initial"`
}
        </pre>

        <h3>Step B — make changes and tag</h3>
        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`# make a release commit
echo "features" >> app.txt
git add .
git commit -m "feat: add features"
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main
git push origin v1.0.0`}
        </pre>

        <h3>Step C — bug discovered → rollback</h3>
        <pre style={{ background: "#fff7e6", padding: 12, borderRadius: 8 }}>
{`# create a revert commit to undo the release commit
git revert <commit-id-of-feat-commit> -m "Revert release due to bug"
git push origin main`}
        </pre>

        <p>
          Reverting preserves history and documents the rollback action — ideal for production.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣7️⃣ Troubleshooting & Recovery Recipes</h2>
        <ol>
          <li><strong>Forgot to push tags:</strong> <code>git push --tags</code></li>
          <li><strong>Accidentally moved a tag:</strong> push the new tag with --force and coordinate with team.</li>
          <li><strong>Lost commit after reset:</strong> use <code>git reflog</code>, find hash, then <code>git reset --hard &lt;hash&gt;</code>.</li>
          <li><strong>Need to undo a pushed commit:</strong> prefer <code>git revert</code> unless you coordinate a history rewrite and force-push with <code>--force-with-lease</code>.</li>
        </ol>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣8️⃣ Cheatsheet — quick commands</h2>
        <pre style={{ background: "#282c34", color: "#9cd37a", padding: 12, borderRadius: 8 }}>
{`# Tags
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
git push origin --tags
git tag -d v1.2.3
git push origin --delete v1.2.3

# Undo
git restore file.txt
git restore --staged file.txt
git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1
git revert <commit>
git reflog
git checkout -b recover <reflog-hash>

# Advanced
git filter-repo (or bfg) -> remove secrets
git push --force-with-lease`}
        </pre>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>1️⃣9️⃣ Interview Questions (tags & undo)</h2>
        <ol>
          <li>Explain annotated vs lightweight tags and when to use each.</li>
          <li>How do you sign tags and why?</li>
          <li>What's the difference between reset --hard and revert?</li>
          <li>How can you recover a commit after a hard reset?</li>
          <li>Describe a safe rollback strategy for production releases.</li>
        </ol>
      </section>

      <section style={{ marginTop: 28, marginBottom: 60 }}>
        <h2>✔ Conclusion</h2>
        <p>
          This combined lesson gave you both the release/versioning toolkit (tags & semver) and the recovery toolkit (restore, reset, revert, reflog, and removal of sensitive history). Use tags to mark releases and revert/reflog to recover and fix mistakes safely. Practice the mini-project and keep a copy of the cheatsheet nearby.
        </p>

        <p style={{ color: "#666" }}>
          If you want more (extra expanded examples, every command with 200 real command-line examples to reach literal 2000+ lines, or a split per-subsection file), tell me which expansion you want and I will produce it right away — either in one big split-safe output or as many incremental safe parts as you prefer.
        </p>
      </section>
    </div>
  );
}

Lesson9.displayName = "GIT Lesson 9+10 – Tags & Undo Masterclass (Combined)";
