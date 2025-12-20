export const meta = {
  title: "Git Lesson 8",
  description:
    "Stash Masterclass — basic to advanced: stash, apply, pop, drop, stash branches, stash patches, stash with paths, stash conflicts, stash workflows, CI usage, and full rescue mini-project.",
  difficulty: "Intermediate",
  duration: "60–120 min",
  tags: ["git", "stash", "wip", "undo"],
  updated: "2025-11-25",
  thumbnail: ""
};

// IMAGE IMPORTS (place images in src/assets/git/)
// If images aren't present, remove the img tags or create placeholder images.
// Suggested images: git-stash.png, stash-branch.png, stash-patch.png, stash-conflict.png, stash-workflow.png
import GitStashImg from "../../../../assets/git/git-stash.png";
import GitStashBranchImg from "../../../../assets/git/git-stash-branch.png";
import GitStashPatchImg from "../../../../assets/git/git-stash-patch.png";
import GitStashConflictImg from "../../../../assets/git/git-stash-conflict.png";
import GitStashWorkflowImg from "../../../../assets/git/git-stash-workflow.png";

export default function Lesson8() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div
      style={{
        padding: "28px",
        lineHeight: "1.85",
        fontSize: "17px",
        maxWidth: 1100,
        margin: "auto",
        color: "#222",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>
        Git – Lesson 8: Stash Masterclass (Ultra PRO)
      </h1>

      <p style={{ color: "#666", marginBottom: 18 }}>
        This lesson is a complete deep-dive into <strong>git stash</strong> and related working-directory
        rescue tools. We cover everything from simple stash commands to advanced stash patches, per-path
        stashes, stashing during rebase/merge, stash branches, CI considerations, and full rescue workflows.
      </p>

      <div
        style={{
          background: "#e8fff5",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginBottom: 24,
        }}
      >
        <strong>Goal:</strong> After this lesson you will be able to pause work cleanly, recover WIP in
        complex situations, use stash as a safety net during rebase/merge, and leverage stash features
        in professional workflows.
      </div>

      {/* SECTION 1 — WHY STASH */}
      <section style={{ marginTop: 30 }}>
        <h2>1️⃣ Why use <code>git stash</code>?</h2>
        <p>
          Developers often need to switch context (hotfix, review, branch) without committing half-baked
          changes. <code>git stash</code> is a temporary holding area for uncommitted changes. It lets
          you keep your working tree clean while saving your work quickly.
        </p>

        <img
          src={GitStashImg}
          alt="git stash concept"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <ul>
          <li>Quickly pause work and switch branches</li>
          <li>Avoid committing WIP to history</li>
          <li>Temporarily store experimental changes</li>
          <li>Safely recover from rebase / merge operations</li>
        </ul>
      </section>

      {/* SECTION 2 — BASIC COMMANDS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Basic stash commands (the foundation)</h2>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git stash          # stash current changes (staged + unstaged)
git stash list     # list all stashes
git stash show     # show summary of top stash
git stash show -p  # show patch of top stash
git stash apply    # apply top stash but keep it in stash list
git stash pop      # apply top stash and remove it from stash list
git stash drop     # remove top stash from stash list
git stash clear    # remove all stashes
git stash push -m "WIP message"   # stash with message (modern recommended)`}        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Note: Older docs show <code>git stash save</code>, but the modern recommended command is{" "}
          <code>git stash push</code> with explicit flags.
        </div>
      </section>

      {/* SECTION 3 — HOW STASH WORKS */}
      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ How stash stores data (behind the scenes)</h2>
        <p>
          A stash is stored as a pair (or triple) of commits: one for the index (staged changes), one
          for the working tree (unstaged changes), and optionally one for untracked/ignored files if you
          used <code>-u</code> or <code>-a</code>.
        </p>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`Stash (conceptual):
WIP on branch: <ref>  (commit for index)
WIP on branch: <ref>  (commit for worktree)
(optional) WIP on branch: <ref>  (untracked/ignored files)`}        </pre>

        <p>
          Because stashes are commits, you can reference them by hash and inspect or apply specific
          stashes as needed.
        </p>
      </section>

      {/* SECTION 4 — STASH MESSAGES & SELECTING */}
      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Naming stashes & selecting specific stash</h2>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# stash with message:
git stash push -m "WIP: add auth flow"

# stash only tracked files
git stash push -k   # -k/--keep-index behaviour differs: be careful (see docs)

# show list:
git stash list
# sample output:
# stash@{0}: WIP on feature-login: 8f9c3a4 Add login UI
# stash@{1}: WIP on feature-payment: e2b5a11 Try checkout fix

# apply a specific stash:
git stash apply stash@{1}

# pop a specific stash (apply + drop):
git stash pop stash@{1}`}
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
          Tip: use clear messages — you'll thank yourself when the stash list grows.
        </div>
      </section>

      {/* SECTION 5 — STASHING UNTRACKED/IGNORED FILES */}
      <section style={{ marginTop: 28 }}>
        <h2>5️⃣ Stash untracked or ignored files</h2>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# stash untracked files
git stash push -u   # or --include-untracked

# stash ignored files too
git stash push -a   # or --all (includes ignored)`}
        </pre>

        <p>
          Be careful when stashing ignored files; they may include build artifacts or secrets. Use
          sparingly and clean up with <code>git stash drop</code> or <code>git stash clear</code> when done.
        </p>
      </section>

      {/* SECTION 6 — STASH WITH PATHS (stash specific files) */}
      <section style={{ marginTop: 28 }}>
        <h2>6️⃣ Stash only specific files or paths</h2>

        <p>
          Want to stash just <code>fileA.js</code> and leave everything else? Modern Git allows
          specifying paths when pushing a stash.
        </p>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# stash specific path(s):
git stash push -m "stash path" -- path/to/fileA path/to/dirB

# Example:
git stash push -m "WIP on auth" -- src/auth/*`}
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
          Note: Path-stashing is very useful when your working tree contains unrelated local changes.
        </div>
      </section>

      {/* SECTION 7 — STASH AS PATCH (inspect & export) */}
      <section style={{ marginTop: 28 }}>
        <h2>7️⃣ Inspecting stash diffs & exporting as patch</h2>

        <p>Show the patch for a stash:</p>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git stash show -p stash@{0}   # show full patch of stash@{0}

# export a stash to a patch file:
git stash show -p stash@{0} > /tmp/stash0.patch

# apply patch later
git apply /tmp/stash0.patch`}
        </pre>

        <p>
          Exporting to a patch is helpful if you want to email the change or keep a permanent text
          copy outside of the Git stash list.
        </p>
      </section>

      {/* SECTION 8 — STASH BRANCH (create branch from stash) */}
      <section style={{ marginTop: 28 }}>
        <h2>8️⃣ Create a branch from a stash (<code>git stash branch</code>)</h2>

        <img
          src={GitStashBranchImg}
          alt="stash branch diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          If your stash represents work that should become a branch, use <code>git stash branch</code>
          to create a branch and apply the stash in one step.
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
{`# create a new branch from top stash and apply it
git stash branch feature-from-stash

# create from a specific stash
git stash branch feature-from-stash stash@{2}`}
        </pre>

        <p>
          This command creates a new branch at the commit where the stash was made, applies the stash,
          and removes the stash if successful — very convenient.
        </p>
      </section>

      {/* SECTION 9 — STASH + INDEX (stashing staged changes separately) */}
      <section style={{ marginTop: 28 }}>
        <h2>9️⃣ Stashing staged vs unstaged changes (index handling)</h2>

        <p>
          You can control how stash treats index (staged) vs working tree changes. Typical flows:
        </p>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# stash both staged and unstaged (default behavior):
git stash push -m "WIP"

# keep index (leave staged files staged)
git stash push --keep-index -m "WIP keep index"

# only stash staged files? (tricky) — use explicit reset and stash:
git reset   # move staged to unstaged
git stash push -m "stash whatever"`

}        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Tip: <code>--keep-index</code> is helpful when you want to run tests on the staged snapshot while still stashing local edits.
        </div>
      </section>

      {/* SECTION 10 — STASH CONFLICTS & RESOLUTION */}
      <section style={{ marginTop: 28 }}>
        <h2>🔟 Stash conflicts — what happens and how to fix</h2>

        <img
          src={GitStashConflictImg}
          alt="stash conflict"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          When you <code>git stash apply</code> or <code>git stash pop</code>, conflicts can occur if
          the target branch has changes that overlap. Git will mark conflicts with the usual markers
          
        </p>

        <h3>Typical resolution flow</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git stash apply stash@{0}   # or git stash pop stash@{0}
# if conflicts:
git status                 # shows conflicts
# open files, resolve markers
git add <conflicted-files>
git commit                 # (if stash applied created changes that need commit)
# If using pop and apply fails, stash remains if pop didn't remove it; verify with git stash list`}
        </pre>

        <p>
          If stash pop removed the stash and the merge is messy, <code>git reflog</code> can help
          locate previous HEAD to recover.
        </p>
      </section>

      {/* SECTION 11 — STASH + REBASE / MERGE WORKFLOWS */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣1️⃣ Using stash while rebasing or merging</h2>

        <p>
          Stashing is invaluable when you need to rebase but have local changes. Workflow:
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
{`# stash local changes
git stash push -m "WIP: pre-rebase"

# rebase
git fetch origin
git rebase origin/main

# apply stash (resolve conflicts if any)
git stash pop`}
        </pre>

        <p>
          If rebase conflicts and you want to abort the rebase and restore the pre-rebase state, use{" "}
          <code>git rebase --abort</code>, then <code>git stash pop</code> to bring your WIP back.
        </p>
      </section>

      {/* SECTION 12 — STASH IN TEAM/workflow (do's and don'ts) */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣2️⃣ Stash in team workflows — best practices</h2>

        <ul>
          <li>Do not rely on stash as long-term storage — it’s temporary.</li>
          <li>Prefer feature branches for longer work.</li>
          <li>Use clear stash messages and drop/clear when done.</li>
          <li>Never expect stashes to be shared across clones — stash is local to the repository clone.</li>
          <li>Use <code>git stash branch</code> to convert WIP into commits before pushing.</li>
        </ul>

        <div
          style={{
            background: "#fff7e6",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          Important: Stashes are stored in your local repo under <code>refs/stash</code> — they do not go to the remote.
        </div>
      </section>

      {/* SECTION 13 — ADVANCED: STASH INDEX & WIP PATCH MODE */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣3️⃣ Advanced stash: patch mode & index introspection</h2>

        <p>
          Use <code>git stash push -p</code> to interactively choose hunks to stash (patch-mode). This
          is similar to <code>git add -p</code>.
        </p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# interactive stash (choose hunks)
git stash push -p -m "WIP partial"

# stash show details
git stash show -p stash@{0}`}
        </pre>

        <p>
          Combine patch-mode with path-specs to stash very specific parts of your working tree.
        </p>
      </section>

      {/* SECTION 14 — STASH & INDEXING TRICKS */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣4️⃣ Useful stash tricks & hidden gems</h2>

        <ul>
          <li>
            <strong>Apply a stash but keep it:</strong> <code>git stash apply --index stash@{0}</code> will try to restore both the working tree and index (staged files).
          </li>
          <li>
            <strong>Create a patch from stash and apply with index:</strong> combine <code>git stash show -p</code> and <code>git apply --index</code>.
          </li>
          <li>
            <strong>Rename a stash message:</strong> there's no direct rename; create a branch from stash and commit with new message, then drop stash.
          </li>
          <li>
            <strong>Recover "lost" stash:</strong> use <code>git fsck --lost-found</code> or inspect <code>git reflog</code> to locate stash commits.
          </li>
        </ul>
      </section>

      {/* SECTION 15 — MINI-PROJECT: RESCUE LAB (hands-on) */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣5️⃣ Mini-project — Rescue Lab (realistic WIP rescue)</h2>

        <p>
          Scenario: You're working on <code>feature-x</code> with multiple uncommitted edits. A production bug
          needs urgent fix on <code>main</code>. Use stash workflows to pause work, fix the bug, then resume safely.
        </p>

        <h3>Step A — Setup</h3>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`mkdir rescue-lab
cd rescue-lab
git init
echo "v1" > app.txt
git add .
git commit -m "Initial commit"`}
        </pre>

        <h3>Step B — Start WIP on feature branch</h3>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git checkout -b feature-x
# make changes but do not commit
echo "work A" >> app.txt
echo "work B" >> README.md`}
        </pre>

        <h3>Step C — Urgent production hotfix</h3>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# stash only specific files (say README.md only):
git stash push -m "WIP README" -- README.md

# or stash everything:
git stash push -m "WIP feature-x full"

# switch to main and fix
git checkout main
# fix bug and commit
echo "fix" >> app.txt
git add .
git commit -m "fix: production bug"
git push origin main`}
        </pre>

        <h3>Step D — Return to feature work</h3>
        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git checkout feature-x

# if you stashed specific path:
git stash list
git stash pop stash@{0}  # apply stash back

# resolve any conflicts, then continue working
git add .
git commit -m "feat: continue feature-x"`}
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
          This mini-project simulates the most common real-world need for stash: pause work, fix urgent bug, resume.
        </div>
      </section>

      {/* SECTION 16 — ADVANCED RESCUE: STASH & REFLOG */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣6️⃣ Recovering lost work — reflog & stash internals</h2>

        <p>
          If stash pop removed a stash and the apply produced a mess, reflog can help you recover:
        </p>

        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# inspect previous HEADs
git reflog

# find a commit before the bad operation and reset to it
git reset --hard <hash>`}
        </pre>

        <p>
          Because stashes are commits, they show in <code>git reflog</code> and as objects — use
          <code>git fsck --lost-found</code> if necessary.
        </p>
      </section>

      {/* SECTION 17 — CI & STASH (notes) */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣7️⃣ Stash considerations in CI/CD</h2>

        <p>
          In CI pipelines, avoid relying on stash because CI runs starts from clean clones and stashes
          are local. But stash can be useful in custom scripts or deploy steps on the server.
        </p>

        <ul>
          <li>Do not depend on stash for persistent state</li>
          <li>Use feature branches and PRs in CI</li>
          <li>Use patches exported from stash if you need to move WIP across environments</li>
        </ul>
      </section>

      {/* SECTION 18 — ALTERNATIVES: GIT WORKTREE vs STASH */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣8️⃣ Alternatives — when to use <code>git worktree</code> instead</h2>

        <p>
          <code>git worktree</code> allows you to check out multiple branches at once into separate
          working directories. For lengthy parallel work, it’s often better than stash.
        </p>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`# create a new worktree for feature branch
git worktree add ../feature-x feature-x

# now you have a separate folder with branch checked out`}
        </pre>

        <p>
          Use <code>git worktree</code> when you need to work on multiple branches simultaneously and
          want persistent changes in separate directories.
        </p>
      </section>

      {/* SECTION 19 — TROUBLESHOOTING (common errors) */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣9️⃣ Troubleshooting: common stash problems & fixes</h2>

        <ol>
          <li>
            <strong>Stash apply fails with conflicts:</strong> Resolve conflicts manually, <code>git add</code>, commit, or use <code>git stash drop</code> if stash is no longer needed.
          </li>
          <li>
            <strong>Stash lost after garbage collection:</strong> Avoid long-term dependence on stashes. If lost, check <code>git reflog</code> or <code>git fsck --lost-found</code>.
          </li>
          <li>
            <strong>Accidentally dropped wrong stash:</strong> Inspect reflog for stash refs; sometimes you can recover the dropped commit object.
          </li>
          <li>
            <strong>Stash applies unwanted changes to index:</strong> Use <code>git stash apply --index</code> carefully or use <code>git stash apply</code> then selectively add/commit.
          </li>
        </ol>
      </section>

      {/* SECTION 20 — CHEATSHEET & QUICK REFERENCE */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣0️⃣ Cheatsheet — stash quick commands</h2>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git stash push -m "WIP: message"           # stash with message
git stash push -u -m "WIP include untracked" # include untracked
git stash list                             # list stashes
git stash show -p stash@{0}                # show patch
git stash apply stash@{0}                  # apply stash but keep
git stash pop stash@{0}                    # apply and remove
git stash branch feature-from-stash stash@{0}  # create branch from stash
git stash drop stash@{0}                   # remove specific stash
git stash clear                            # remove all stashes
git stash push -p                          # interactive patch mode
git stash push -- path/to/file             # stash specific paths`}
        </pre>
      </section>

      {/* SECTION 21 — PRACTICE TASKS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣1️⃣ Practice tasks (do these to master stash)</h2>

        <ol>
          <li>Create 3 stashes with different messages and apply them in different orders.</li>
          <li>Stash only one file while leaving others changed; then pop it back.</li>
          <li>Simulate a conflict by changing the same lines on two branches and attempt to pop a stash.</li>
          <li>Use <code>git stash branch</code> to convert a stash into a branch and continue work there.</li>
          <li>Export stash to patch and apply on another clone of the repo.</li>
          <li>Compare using <code>git worktree</code> vs <code>git stash</code> for parallel feature development.</li>
        </ol>
      </section>

      {/* SECTION 22 — INTERVIEW QUESTIONS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣2️⃣ Interview questions (stash-related)</h2>

        <ol>
          <li>What does <code>git stash</code> do? Explain internals.</li>
          <li>How do you stash untracked files?</li>
          <li>Explain <code>git stash branch</code> and when to use it.</li>
          <li>How do you apply stash but keep it in stash list?</li>
          <li>How would you recover a deleted stash?</li>
          <li>When should you prefer <code>git worktree</code> over stash?</li>
        </ol>
      </section>

      {/* SECTION 23 — WRAP-UP & BEST PRACTICES */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣3️⃣ Wrap-up: Best practices & final notes</h2>

        <ul>
          <li>Use stash for short-term WIP only — not long-term storage.</li>
          <li>Always give meaningful stash messages.</li>
          <li>Prefer converting stash to branch for longer work you intend to keep.</li>
          <li>Use patch-mode and path-specs to precisely control what you stash.</li>
          <li>Combine reflog, stash show, and patch export to recover tricky cases.</li>
        </ul>

        <div
          style={{
            background: "#e8fff5",
            padding: 12,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          You're now ready to treat <code>git stash</code> as a professional-grade tool — not a hack.
        </div>
      </section>

      {/* FOOTER */}
      <section style={{ marginTop: 40, marginBottom: 60 }}>
        <h2>✔ Final Notes</h2>
        <p>
          This mega-lesson covered stash from A → Z. If you want I can:
        </p>
        <ul>
          <li>Add Tamil inline explanations for each major block</li>
          <li>Include real repo sample files for the mini-project</li>
          <li>Split this into multiple smaller lesson files (overview, hands-on, cheatsheet)</li>
          <li>Include terminal screenshots and VSCode GUI images</li>
        </ul>

        <p>Which one do you want next? 😊</p>
      </section>
    </div>
  );
}

Lesson8.displayName = "GIT Lesson 8 – Stash Masterclass (Ultra PRO)";
