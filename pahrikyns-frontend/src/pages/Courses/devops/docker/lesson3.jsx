// ----------------------------------------------
// Docker Lesson 3 – IMAGES DEEP DIVE (Layers, Dockerfile, BuildKit, Multi-stage, Caching, Slimming)
// Target: Detailed, production-ready content (compacted to fit ~700-line target)
// ----------------------------------------------

export const meta = {
  title: "Docker Lesson 3",
  description:
    "Deep dive into Docker images: layers, caching, Dockerfile best practices, multi-stage builds, BuildKit/buildx, image size optimization, manifests, digests, signing, and image lifecycle operations.",
  difficulty: "Intermediate",
  duration: "60–90 min",
  tags: ["docker", "images", "dockerfile", "buildkit", "multistage"],
  updated: "2025-11-30",
  thumbnail: ""
};

// IMAGE IMPORTS — add them in src/assets/docker/
import ImgLayers from "../../../../assets/docker/docker-images-layers.png";
import ImgDockerfileBest from "../../../../assets/docker/dockerfile-best-practices.png";
import ImgBuildkit from "../../../../assets/docker/docker-buildkit.png";
import ImgSlimImages from "../../../../assets/docker/docker-image-slim.png";

export default function Lesson3() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.8, fontSize: 17 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker – Lesson 3: Images Deep Dive</h1>

      <p style={{ color: "#444" }}>
        This lesson covers everything you need to master Docker images: how layers work, how to write efficient Dockerfiles,
        BuildKit and buildx features, multi-stage builds, caching strategies, image size optimization, manifests & digests,
        signing images, saving/loading images, and practical exercises to solidify your knowledge.
      </p>

      <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "5px solid #007bff", marginBottom: 20 }}>
        <strong>Learning goals:</strong>
        <ul>
          <li>Understand image layering & union filesystem</li>
          <li>Write Dockerfiles that leverage caching and buildkit</li>
          <li>Create secure and small images using multi-stage builds</li>
          <li>Use advanced build features (cache mounts, build args, secrets)</li>
          <li>Manage image lifecycle: tag, push, pull, inspect, save, load</li>
        </ul>
      </div>

      {/* SECTION: Layers */}
      <section>
        <h2>1️⃣ Image layers & how they work</h2>
        <p>
          Docker images are built from a stack of read-only layers. Each Dockerfile instruction (like <code>RUN</code>, <code>COPY</code>, <code>ADD</code>)
          typically creates a new layer. Layers are cached and reused across images that share identical layer content — this is how Docker saves space and speeds up builds.
        </p>

        <img src={ImgLayers} alt="Image layers and union filesystem" style={{ width: "100%", borderRadius: 8, marginTop: 12, marginBottom: 12 }} />

        <h3>Key concepts</h3>
        <ul>
          <li><strong>Read-only layers:</strong> built on top of each other using a union filesystem.</li>
          <li><strong>Writable container layer:</strong> when you run an image, Docker adds a top, writable layer for the container.</li>
          <li><strong>Layer reuse:</strong> If two images share the same layer (same instruction and same content), Docker reuses the layer instead of duplicating it.</li>
        </ul>

        <h3>Inspect layers</h3>
        <pre style={preStyle}>
{`# Show image history (layers + commands)
docker history --no-trunc your-image:tag

# Inspect image metadata
docker image inspect your-image:tag`}
        </pre>

        <div style={tipStyle}>
          Tip: Use <code>docker history</code> to see which Dockerfile instruction created each layer — helpful for slimming images.
        </div>
      </section>

      {/* SECTION: Dockerfile best practices */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Dockerfile best practices</h2>

        <img src={ImgDockerfileBest} alt="Dockerfile best practices" style={{ width: "100%", borderRadius: 8, marginTop: 12, marginBottom: 12 }} />

        <ol>
          <li><strong>Order matters:</strong> Put infrequently changing instructions earlier (e.g., package installs) and frequently changing ones later (e.g., <code>COPY src/</code>).</li>
          <li><strong>Reduce number of layers:</strong> Combine related <code>RUN</code> commands with <code>&amp;&amp;</code> or use shell scripts.</li>
          <li><strong>Avoid unnecessary files:</strong> Use <code>.dockerignore</code> to exclude node_modules, .git, build artifacts.</li>
          <li><strong>Use explicit versions:</strong> Pin base images and package versions for reproducibility.</li>
          <li><strong>Use multi-stage builds</strong> to keep final image minimal (covered in next section).</li>
        </ol>

        <h3>Example — bad vs good</h3>
        <pre style={preStyle}>
{`# BAD (unoptimized)
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# GOOD (better layer caching & smaller final)
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
RUN npm ci --only=production`}
        </pre>

        <div style={tipStyle}>
          Tip: Use <code>npm ci</code> for predictable installs in CI and production builds.
        </div>
      </section>

      {/* SECTION: Multi-stage builds */}
      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ Multi-stage builds — build once, produce tiny runtime images</h2>

        <p>
          Multi-stage builds let you use intermediate images to compile, test, or build artifacts, then copy only the necessary results into the final runtime image. This dramatically reduces image size and attack surface.
        </p>

        <pre style={preStyle}>
{`# Multi-stage example (Go app)
# Stage 1: builder
FROM golang:1.20-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/app ./cmd/app

# Stage 2: runtime
FROM scratch
COPY --from=builder /bin/app /bin/app
ENTRYPOINT ["/bin/app"]`}
        </pre>

        <p>
          For interpreted languages (Node, Python, Java), builder stage may include installing dev dependencies and building assets.
        </p>
      </section>

      {/* SECTION: Build cache & invalidation */}
      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Caching & cache invalidation — how Docker reuses layers</h2>

        <p>
          Docker caches layers during builds. Cache hits happen when the instruction and its context (files copied, environment variables, build args) match a previous build. Changing a file used in a layer invalidates that and subsequent layers.
        </p>

        <h3>Practical advice</h3>
        <ul>
          <li>Copy package manifest & run dependency install before copying the rest of the source so you benefit from cache when only code changes.</li>
          <li>Use <code>--cache-from</code> in CI to reuse previous build cache (requires pushing a cache image).</li>
          <li>BuildKit provides advanced caching mechanisms and cache mounts (see next section).</li>
        </ul>

        <pre style={preStyle}>
{`# Use previous image as cache source
docker build --cache-from=repo/your-image:previous -t repo/your-image:latest .`}
        </pre>
      </section>

      {/* SECTION: BuildKit & buildx */}
      <section style={{ marginTop: 28 }}>
        <h2>5️⃣ BuildKit & buildx — faster, secure, advanced builds</h2>

        <img src={ImgBuildkit} alt="BuildKit buildx" style={{ width: "100%", borderRadius: 8, marginTop: 12, marginBottom: 12 }} />

        <p>
          BuildKit is a modern backend for docker build that offers concurrency, better caching, secret handling, and cache mounts. buildx is a CLI frontend that enables cross-platform builds and advanced features.
        </p>

        <h3>Enable BuildKit (temporarily)</h3>
        <pre style={preStyle}>
{`# Linux / macOS / WSL
DOCKER_BUILDKIT=1 docker build -t myimage:buildkit .

# Permanently enable (daemon.json or env depending on platform)
# Example for environment: export DOCKER_BUILDKIT=1`}
        </pre>

        <h3>Using buildx for multi-platform builds</h3>
        <pre style={preStyle}>
{`# Create a builder (if not existing)
docker buildx create --use --name mybuilder

# Build and push multi-arch image (example: linux/amd64 + linux/arm64)
docker buildx build --platform linux/amd64,linux/arm64 -t yourrepo/app:latest --push .`}
        </pre>

        <h3>Secrets & mounts in BuildKit</h3>
        <pre style={preStyle}>
{`# Example: use secrets for private npm registry tokens
DOCKER_BUILDKIT=1 docker build --secret id=npm_token,src=./.npm_token -t myapp:secure .

# In Dockerfile (BuildKit syntax)
# syntax=docker/dockerfile:1.4
RUN --mount=type=secret,id=npm_token npm ci`}
        </pre>

        <div style={tipStyle}>
          Tip: BuildKit's cache mounts (<code>--mount=type=cache</code>) are great for accelerating dependency installs while keeping final images clean.
        </div>
      </section>

      {/* SECTION: Image size optimization */}
      <section style={{ marginTop: 28 }}>
        <h2>6️⃣ Image size optimization — small images, faster deploys</h2>

        <img src={ImgSlimImages} alt="Slim images" style={{ width: "100%", borderRadius: 8, marginTop: 12, marginBottom: 12 }} />

        <h3>Strategies</h3>
        <ul>
          <li>Use minimalist base images: <code>alpine</code>, <code>distroless</code>, or language-specific slim variants (e.g., <code>node:18-slim</code>).</li>
          <li>Leverage multi-stage builds to discard build-time tools.</li>
          <li>Delete package manager caches in the same <code>RUN</code> statement to avoid leaving them in layers.</li>
          <li>Remove unnecessary files, docs, and man pages during build.</li>
          <li>Use <code>.dockerignore</code> to avoid copying dev files into the image.</li>
        </ul>

        <h3>Example — cleaning in same RUN</h3>
        <pre style={preStyle}>
{`RUN apt-get update && apt-get install -y build-essential \
  && do-some-build-step \
  && apt-get remove --purge -y build-essential \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*`}
        </pre>

        <h3>Use distroless / scratch for final</h3>
        <pre style={preStyle}>
{`FROM gcr.io/distroless/nodejs:16
COPY --from=builder /app/dist /app
CMD ["index.js"]`}
        </pre>

        <div style={tipStyle}>
          Tip: Measure image sizes with <code>docker images --format "{{Repository}}:{{Tag}} {{Size}}"</code> and compare before/after optimizations.
        </div>
      </section>

      {/* SECTION: Tagging, digests, manifests */}
      <section style={{ marginTop: 28 }}>
        <h2>7️⃣ Tags, digests, manifests & image immutability</h2>

        <p>
          A tag (e.g., <code>:latest</code>) is a mutable pointer to an image manifest. Digests (content-addressable identifiers) are immutable and look like <code>sha256:...</code>.
          Use digests for reproducible deployments.
        </p>

        <pre style={preStyle}>
{`# Pull by digest
docker pull nginx@sha256:<digest>

# Show manifest using docker CLI (experimental) or registry API
docker manifest inspect yourrepo/image:tag`}
        </pre>

        <p>
          For Kubernetes and production deployments, prefer the digest form to ensure you run the exact image you tested:
        </p>

        <pre style={preStyle}>
{`image: yourrepo/app@sha256:<digest>`}
        </pre>
      </section>

      {/* SECTION: Signing images (Notary / cosign) */}
      <section style={{ marginTop: 28 }}>
        <h2>8️⃣ Image signing & provenance</h2>

        <p>
          Image signing helps verify who built the image and that it wasn't tampered with. Tools include Docker Content Trust (Notary v1) and <code>cosign</code> (sigstore project).
        </p>

        <h3>Cosign example (simplified)</h3>
        <pre style={preStyle}>
{`# Install cosign, then sign an image
cosign sign --key cosign.key yourrepo/app:tag

# Verify signature
cosign verify --key cosign.pub yourrepo/app:tag`}
        </pre>

        <div style={tipStyle}>
          Note: Cosign integrates with OCI registries and provides transparency logs via Sigstore.
        </div>
      </section>

      {/* SECTION: Image lifecycle ops (save/load/export/import) */}
      <section style={{ marginTop: 28 }}>
        <h2>9️⃣ Image lifecycle — save, load, export, import</h2>

        <p>
          Sometimes you need to move images without registries (air-gapped envs), or save a build artifact.
        </p>

        <pre style={preStyle}>
{`# Save an image to tar
docker save -o myimage.tar yourrepo/app:tag

# Load back
docker load -i myimage.tar

# Export a container filesystem (no image history)
docker export container-id -o containerfs.tar

# Import as image
cat containerfs.tar | docker import - yourrepo/imported:tag`}
        </pre>
      </section>

      {/* SECTION: Registry best practices */}
      <section style={{ marginTop: 28 }}>
        <h2>🔟 Registry & pushing best practices</h2>

        <ul>
          <li>Use scoped tags: <code>yourrepo/app:1.2.3</code> and <code>yourrepo/app:latest</code> for convenience.</li>
          <li>Push signed images and keep a content trust policy for deployments.</li>
          <li>Set lifecycle/retention rules on private registries to remove old images & blobs.</li>
          <li>For CI, push intermediate/cache images to a registry used as <code>--cache-from</code>.</li>
        </ul>

        <pre style={preStyle}>
{`# Tag & push
docker tag local-image:tag registry.example.com/org/app:1.2.3
docker push registry.example.com/org/app:1.2.3`}
        </pre>
      </section>

      {/* SECTION: Troubleshooting image builds */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣1️⃣ Troubleshooting common build issues</h2>

        <h3>1) Cache not used</h3>
        <pre style={preStyle}>
{`# Ensure files referenced by earlier steps did not change.
# Example: COPY package.json before COPY . to keep node_modules layer cached.`}
        </pre>

        <h3>2) Large image unexpectedly</h3>
        <pre style={preStyle}>
{`# Use docker history and inspect to find large layers
docker history --no-trunc your-image:tag
docker image inspect your-image:tag --format '{{.RootFS.Layers}}'`}
        </pre>

        <h3>3) BuildKit secret not available</h3>
        <pre style={preStyle}>
{`# Ensure BuildKit enabled: DOCKER_BUILDKIT=1 docker build --secret id=mysecret,src=./secretfile .`}
        </pre>

        <div style={tipStyle}>
          Tip: Use <code>--progress=plain</code> with buildx to see full logs when diagnosing failures: <code>docker buildx build --progress=plain .</code>
        </div>
      </section>

      {/* SECTION: Security considerations */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣2️⃣ Security & minimizing attack surface</h2>

        <ul>
          <li>Use minimal base images and remove package manager tooling from final image.</li>
          <li>Scan images for vulnerabilities (Trivy, Clair, Anchore).</li>
          <li>Avoid embedding secrets in images. Use secrets/build-time mounts or a secret manager at runtime.</li>
          <li>Run processes as non-root inside containers (<code>USER</code> directive).</li>
        </ul>

        <pre style={preStyle}>
{`# Example: create non-root user
RUN addgroup --system app && adduser --system --ingroup app app
USER app`}
        </pre>
      </section>

      {/* SECTION: Practical exercises */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣3️⃣ Practice tasks — solidify learning</h2>

        <ol>
          <li>
            Create a multi-stage Dockerfile for a Node.js app that builds with dev dependencies and produces a tiny runtime image with only production dependencies.
          </li>
          <li>
            Enable BuildKit and use a secret to fetch a private npm package during build without leaving the token in layers.
          </li>
          <li>
            Build a multi-arch image using <code>docker buildx</code> for linux/amd64 and linux/arm64, push it to Docker Hub, and inspect the manifest.
          </li>
          <li>
            Measure image size before and after optimization (alpine vs slim vs distroless).
          </li>
        </ol>

        <pre style={preStyle}>
{`# Example: build with BuildKit & push
DOCKER_BUILDKIT=1 docker buildx build --platform linux/amd64,linux/arm64 -t yourrepo/app:1.0.0 --push .`}
        </pre>
      </section>

      {/* SECTION: Cheatsheet */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣4️⃣ Cheatsheet — quick commands</h2>

        <pre style={preStyle}>
{`# Build with buildkit
DOCKER_BUILDKIT=1 docker build -t myimage:latest .

# Use buildx for multi-platform
docker buildx build --platform linux/amd64,linux/arm64 -t repo/app:tag --push .

# List images
docker images

# Inspect image layers
docker history --no-trunc repo/app:tag

# Save/Load
docker save -o app.tar repo/app:tag
docker load -i app.tar`}
        </pre>
      </section>

      {/* SECTION: Further reading & resources */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣5️⃣ Further reading</h2>

        <ul>
          <li>Docker Docs — Dockerfile reference & Best practices</li>
          <li>BuildKit docs & docker/dockerfile syntax versions</li>
          <li>Sigstore / Cosign for image signing</li>
          <li>Trivy for vulnerability scanning</li>
        </ul>

        <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "5px solid #007bff", marginTop: 12 }}>
          👉 When you're ready, say: <strong>“Start Lesson 4”</strong> — we'll cover <em>Containers Full Mastery</em> (lifecycle, inspect, exec, logs, troubleshooting).
        </div>
      </section>
    </div>
  );
}

Lesson3.displayName = "Docker Lesson 3 – Images Deep Dive";

// Inline styles used to keep file tidy
const preStyle = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
  marginTop: 12
};

const tipStyle = {
  background: "#fff7e6",
  padding: 12,
  borderLeft: "5px solid #f4b400",
  borderRadius: 8,
  marginTop: 12
};
