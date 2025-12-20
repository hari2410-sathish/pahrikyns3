export const meta = {
  title: "Git Lesson 6",
  description:
    "Master Git Rebase: linear history, rebase -i, autosquash, fixup, rewriting history, resolving conflicts, and professional workflows.",
  difficulty: "Intermediate",
  duration: "45–60 min",
  tags: ["git", "rebase", "advanced", "history"],
  updated: "2025-11-25",
  thumbnail: ""
};

// ADD images inside /src/assets/git/
import GitRebaseImg from "../../../../assets/git/git-rebase.png";
import GitRebaseLinearImg from "../../../../assets/git/git-linear.png";
import GitRebaseConflictImg from "../../../../assets/git/git-rebase-conflict.png";
import GitRebaseInteractiveImg from "../../../../assets/git/git-rebase-i.png";
import GitRebaseAutosquashImg from "../../../../assets/git/git-autosquash.png";
import GitRebaseDangerImg from "../../../../assets/git/git-danger.png";

export default function Lesson6() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div
      style={{
        padding: "25px",
        lineHeight: "1.75",
        fontSize: "17px",
        maxWidth: 1000,
        margin: "auto",
        color: "#222",
      }}
    >
      {/* =============================================================== */}
      {/* TITLE */}
      {/* =============================================================== */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        Git – Lesson 6: Rebase (Full Masterclass – 800+ lines)
      </h1>

      <p style={{ color: "#666", marginBottom: 18 }}>
        Rebase is one of the most powerful and misunderstood Git commands. Today you will learn basic
        rebase, interactive rebase, autosquash, rewriting commit history, reordering commits, removing
        commits, resolving conflicts, and when to use rebase vs merge in real-world teams.
      </p>

      <div
        style={{
          background: "#e8fff5",
          padding: 16,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginBottom: 22,
        }}
      >
        <strong>Goal:</strong> Become fully comfortable with rebasing like a senior developer,
        rewriting clean commit history and handling advanced rebase workflows.
      </div>

      {/* =============================================================== */}
      {/* SECTION 1 — What is Rebase? */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣ What is Git Rebase?</h2>
        <p>
          Rebase takes your commits and replays them on top of another branch. Instead of merging two
          commit histories, rebase creates a <strong>clean, linear history</strong>.
        </p>

        <img
          src={GitRebaseImg}
          alt="git rebase"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>Visual Example</h3>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 16,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`Before Rebase (messy):
A -- B -- C (main)
       \\
        D -- E (feature)

After Rebase:
A -- B -- C -- D' -- E' (feature)
`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          🔥 Rebase rewrites commit IDs because it creates new copies of your commits on top of a
          different base.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 2 — Basic Rebase */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>2️⃣ Basic Rebase Example</h2>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git switch feature-1
git rebase main`}
        </pre>

        <p>Meaning: “Take feature-1 commits and put them on top of main.”</p>

        <img
          src={GitRebaseLinearImg}
          alt="linear history"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <div
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          ⚠️ After rebasing, Git generates NEW commits — so the commit IDs change.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 3 — Rebase vs Merge */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>3️⃣ Rebase vs Merge (Deep Understanding)</h2>

        <h3>Merge</h3>
        <pre
          style={{
            background: "#e6f0ff",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`A -- B -- C -- M (merge commit)
 \\        /
  D -- E`}
        </pre>

        <h3>Rebase</h3>
        <pre
          style={{
            background: "#e8fff5",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`A -- B -- C -- D' -- E'`}
        </pre>

        <p>Rebase creates a straight line. Merge creates a merge commit.</p>

        <ul>
          <li>
            <strong>Merge</strong> = keeps history real  
            Best for teamwork.
          </li>
          <li>
            <strong>Rebase</strong> = cleaner history  
            Best before creating PR.
          </li>
        </ul>

        <div
          style={{
            background: "#ffd8d8",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid red",
            marginTop: 12,
          }}
        >
          ⚠️ Never rebase shared/public branches.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 4 — Rebase Conflicts */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>4️⃣ Rebase Conflicts (How to solve)</h2>

        <img
          src={GitRebaseConflictImg}
          alt="rebase conflict"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>During rebase, Git replays each commit. Conflicts appear if code changed in same lines.</p>

        <h3>Fix conflict → continue</h3>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`git status
# open file, fix conflict
git add .
git rebase --continue`}
        </pre>

        <h3>Skip a commit</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`git rebase --skip`}
        </pre>

        <h3>Abort rebase (restore original state)</h3>
        <pre
          style={{
            background: "#ffebeb",
            color: "#c70000",
            padding: 14,
          }}
        >
{`git rebase --abort`}
        </pre>
      </section>

      {/* =============================================================== */}
      {/* SECTION 5 — Interactive Rebase */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>5️⃣ Interactive Rebase (<code>git rebase -i</code>)</h2>

        <img
          src={GitRebaseInteractiveImg}
          alt="interactive rebase"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>Interactive rebase lets you rewrite commit history:</p>

        <ul>
          <li>Edit commits</li>
          <li>Squash commits</li>
          <li>Reorder commits</li>
          <li>Delete commits</li>
          <li>Fixup commits</li>
        </ul>

        <h3>Start interactive rebase</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`git rebase -i HEAD~5`}
        </pre>

        <h3>You will see something like:</h3>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`pick a1b2c3 Commit A
pick d4e5f6 Commit B
pick 112233 Commit C
pick 445566 Commit D
pick 778899 Commit E`}
        </pre>

        <h3>Commands you can use:</h3>

        <ul>
          <li><strong>pick</strong> → keep commit</li>
          <li><strong>reword</strong> → change commit message</li>
          <li><strong>edit</strong> → pause and modify commit</li>
          <li><strong>squash</strong> → combine commits</li>
          <li><strong>fixup</strong> → squash but discard message</li>
          <li><strong>drop</strong> → delete commit</li>
        </ul>
      </section>

      {/* =============================================================== */}
      {/* SECTION 6 — Squashing Commits */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>6️⃣ Squashing Commits (Clean messy history)</h2>

        <pre
          style={{
            background: "#f5f5f7",
            padding: 14,
          }}
        >
{`Before:
pick A
pick B
pick C  # small fix
pick D  # small fix

After editing:
pick A
pick B
squash C
squash D`}
        </pre>

        <p>
          All commits from C and D will be merged into B. Your final commit history becomes clean and
          readable.
        </p>
      </section>

      {/* =============================================================== */}
      {/* SECTION 7 — Fixup & Autosquash */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>7️⃣ Fixup Commits + Autosquash</h2>

        <img
          src={GitRebaseAutosquashImg}
          alt="autosquash"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Fixup commits automatically attach themselves to a previous commit when rebasing with
          autosquash.
        </p>

        <h3>Create a fixup commit</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`git commit --fixup <commit-hash>`}
        </pre>

        <h3>Apply autosquash</h3>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`git rebase -i --autosquash HEAD~5`}
        </pre>

        <p>Git automatically rearranges fixup commits beneath the correct commits.</p>
      </section>

      {/* =============================================================== */}
      {/* SECTION 8 — Reordering Commits */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>8️⃣ Reorder Commits</h2>

        <p>You can simply rearrange commit lines:</p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
          }}
        >
{`Original:
pick A
pick B
pick C

Reordered:
pick C
pick A
pick B`}
        </pre>

        <p>This can help organize history before merging.</p>
      </section>

      {/* =============================================================== */}
      {/* SECTION 9 — Removing a Commit */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>9️⃣ Remove a Commit</h2>

        <p>To delete a commit from history:</p>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
          }}
        >
{`pick A
drop B
pick C`}
        </pre>

        <p>
          This is extremely powerful for cleaning mistakes, but dangerous if already pushed. Use
          carefully.
        </p>
      </section>

      {/* =============================================================== */}
      {/* SECTION 10 — Editing an Older Commit */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>🔟 Edit an Older Commit</h2>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`pick A
edit B
pick C`}
        </pre>

        <p>Git will pause at commit B. You can:</p>

        <ul>
          <li>Edit files</li>
          <li>git add .</li>
          <li>git commit --amend</li>
          <li>git rebase --continue</li>
        </ul>
      </section>

      {/* =============================================================== */}
      {/* SECTION 11 — Pull with Rebase */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣1️⃣ git pull --rebase</h2>

        <p>
          This prevents unnecessary merge commits when pulling updates from the remote branch.
        </p>

        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`git pull --rebase origin main`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          Recommended for solo developers or when your team workflow allows linear commits.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 12 — REAL-WORLD REBASE PROJECT */}
      {/* =============================================================== */}
      <section style={{ marginTop: 50 }}>
        <h2>1️⃣2️⃣ Real-World Project — “Rebase Cleanup Flow”</h2>

        <p>We will create a messy feature branch and clean it using rebase -i.</p>

        <h3>Step A — Setup Repo</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`mkdir rebase-lab
cd rebase-lab
git init

echo "v1" > app.txt
git add .
git commit -m "Initial commit"`}
        </pre>

        <h3>Step B — Create messy history</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`git switch -c feature-cleanup

echo "code A" >> app.txt
git add .
git commit -m "Add code"

echo "fix typo" >> app.txt
git add .
git commit -m "fix typo"

echo "refactor" >> app.txt
git add .
git commit -m "refactor small thing"

echo "final edits" >> app.txt
git add .
git commit -m "final edits"`}
        </pre>

        <h3>Step C — Clean history using interactive rebase</h3>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 14,
          }}
        >
{`git rebase -i HEAD~4`}
        </pre>

        <h3>Step D — Squash fix & refactor commits</h3>

        <pre
          style={{
            background: "#fafafa",
            padding: 14,
          }}
        >
{`pick A Add code
squash B fix typo
squash C refactor small thing
pick D final edits`}
        </pre>

        <h3>Step E — Result</h3>
        <p>
          Final history contains only two commits:  
          1. Add code (cleaned commit)  
          2. Final edits  
        </p>

        <div
          style={{
            background: "#e8fff5",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          🔥 This is how senior developers present clean PRs with meaningful commits.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 13 — Team Workflow Rules */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣3️⃣ Team Workflow Rules for Rebase</h2>

        <ul>
          <li>NEVER rebase shared branches</li>
          <li>Rebase ONLY your own local feature branches</li>
          <li>Rebase before opening a pull request</li>
          <li>Merge master into feature branches ONLY if team requires</li>
          <li>Use autosquash before PR review</li>
        </ul>

        <div
          style={{
            background: "#ffd8d8",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid red",
            marginTop: 12,
          }}
        >
          ⚠️ Rebasing shared branches destroys history → teammates will get errors.
        </div>
      </section>

      {/* =============================================================== */}
      {/* SECTION 14 — Troubleshooting */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣4️⃣ Troubleshooting</h2>

        <h3>❌ “I messed up rebase!”</h3>
        <pre
          style={{
            background: "#ffe6e6",
            padding: 14,
          }}
        >
{`git rebase --abort`}
        </pre>

        <h3>❌ “I lost commits”</h3>
        <pre
          style={{
            background: "#e6f0ff",
            padding: 14,
          }}
        >
{`git reflog
git reset --hard <hash>`}
        </pre>

        <h3>❌ “Conflict keeps repeating”</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
          }}
        >
{`Fix conflict
git add .
git rebase --continue`}
        </pre>
      </section>

      {/* =============================================================== */}
      {/* SECTION 15 — Interview Questions */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣5️⃣ Interview Questions</h2>

        <ol>
          <li>Difference between merge and rebase?</li>
          <li>What happens when rebasing a shared branch?</li>
          <li>Explain interactive rebase.</li>
          <li>What is autosquash? How does fixup work?</li>
          <li>What does “rebase rewrites history” mean?</li>
          <li>How do you recover from a bad rebase?</li>
        </ol>
      </section>

      {/* =============================================================== */}
      {/* Conclusion */}
      {/* =============================================================== */}
      <section style={{ marginTop: 40, marginBottom: 80 }}>
        <h2>✔ Conclusion</h2>
        <p>
          Rebase is a game-changing feature for producing clean, readable commit histories. You now
          understand basic rebase, interactive rebase, autosquash, fixup commits, rewriting history,
          removing commits, resolving conflicts, and real-world workflows.
        </p>

        <p>From here on, your Git skills are officially at an advanced level. 🔥</p>
      </section>
    </div>
  );
}

Lesson6.displayName = "GIT Lesson 6 – Full Content (800+ lines)";
