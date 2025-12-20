export const meta = {
  title: "Docker Lesson 6",
  description:
    "Complete Docker Compose Masterclass — multi-container apps, build, depends_on, networks, volumes, env files, healthchecks, scaling, profiles, overrides, production patterns.",
  difficulty: "Advanced",
  duration: "90 min",
  tags: ["docker", "compose", "yaml", "orchestration"],
  updated: "2025-11-30",
  thumbnail: ""
};

export default function Lesson6() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 30, lineHeight: 1.75, maxWidth: 1100, margin: "auto", fontSize: 17 }}>
      <h1 style={{ fontSize: 38, fontWeight: 800 }}>Docker Lesson 6 — Docker Compose Masterclass</h1>

      <p>
        Docker Compose lets you run **multi-container applications** with a single YAML file.  
        Instead of manually running Docker commands, you define everything in one place:
        images, services, ports, volumes, networks, environment variables, dependencies, scaling, healthchecks, and more.
      </p>

      {/* ------------------------------------------------------------
        INTRO
      ------------------------------------------------------------ */}
      <h2>1️⃣ What is Docker Compose?</h2>

      <p>
        Docker Compose = One file (<code>docker-compose.yml</code>) controlling:
      </p>

      <ul>
        <li>Multiple containers (services)</li>
        <li>Networking between them</li>
        <li>Volumes & persistent data</li>
        <li>Environments (.env)</li>
        <li>Build instructions (Dockerfile)</li>
        <li>Scaling & load balancing</li>
        <li>Dev/prod overrides</li>
      </ul>

      <pre style={pre}>
{`docker compose up -d
docker compose down
docker compose ps`}
      </pre>

      {/* ------------------------------------------------------------
        BASIC COMPOSE FILE
      ------------------------------------------------------------ */}
      <h2>2️⃣ Basic Compose File Structure</h2>

      <pre style={pre}>
{`version: "3.9"
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: pass123`}
      </pre>

      <p>Two services: Nginx + MySQL.</p>

      {/* ------------------------------------------------------------
        BUILD FROM DOCKERFILE
      ------------------------------------------------------------ */}
      <h2>3️⃣ Build from Dockerfile</h2>

      <pre style={pre}>
{`services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"`}
      </pre>

      <p>
        This builds the image automatically when running <code>docker compose up</code>.
      </p>

      {/* ------------------------------------------------------------
        DEPENDS_ON
      ------------------------------------------------------------ */}
      <h2>4️⃣ depends_on — Service Boot Order</h2>

      <pre style={pre}>
{`services:
  backend:
    build: ./backend
    depends_on:
      - db

  db:
    image: postgres`}
      </pre>

      <div style={note}>
        ⚠️ <code>depends_on</code> waits for container *start*, NOT “service is ready”.  
        Use healthchecks for real readiness.
      </div>

      {/* ------------------------------------------------------------
        HEALTHCHECKS
      ------------------------------------------------------------ */}
      <h2>5️⃣ Healthchecks (REAL readiness)</h2>

      <pre style={pre}>
{`services:
  db:
    image: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5`}
      </pre>

      <p>
        Combined with:
      </p>

      <pre style={pre}>
{`depends_on:
  db:
    condition: service_healthy`}
      </pre>

      <p>Now backend waits until DB is truly ready.</p>

      {/* ------------------------------------------------------------
        ENVIRONMENT VARIABLES + .ENV FILE
      ------------------------------------------------------------ */}
      <h2>6️⃣ Environment Variables & .env Files</h2>

      <pre style={pre}>
{`# docker-compose.yml
services:
  api:
    image: node:18
    environment:
      DB_HOST: ${DB_HOST}
      DB_PASS: ${DB_PASS}`}
      </pre>

      <pre style={pre}>
{`# .env file
DB_HOST=db
DB_PASS=supersecret`}
      </pre>

      <div style={note}>Compose automatically loads .env in same directory.</div>

      {/* ------------------------------------------------------------
        VOLUMES
      ------------------------------------------------------------ */}
      <h2>7️⃣ Volumes — Persistent Storage</h2>

      <pre style={pre}>
{`services:
  db:
    image: mysql
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:`}
      </pre>

      <p>Named volumes survive container removal.</p>

      {/* ------------------------------------------------------------
        BIND MOUNTS
      ------------------------------------------------------------ */}
      <h2>8️⃣ Bind Mounts — Local Development</h2>

      <pre style={pre}>
{`services:
  app:
    build: .
    volumes:
      - ./src:/app/src`}
      </pre>

      <p>
        Hot reload supported for Node/Python apps.
      </p>

      {/* ------------------------------------------------------------
        NETWORKS
      ------------------------------------------------------------ */}
      <h2>9️⃣ Compose Networks (Bridge + Custom Networks)</h2>

      <pre style={pre}>
{`services:
  api:
    build: .
    networks:
      - backend

  db:
    image: mysql
    networks:
      - backend

networks:
  backend:
    driver: bridge`}
      </pre>

      <p>
        Containers in same network resolve each other by name.
      </p>

      {/* DIAGRAM */}
      
::contentReference[oaicite:1]{index=1}


      {/* ------------------------------------------------------------
        MULTI-CONTAINER EXAMPLE
      ------------------------------------------------------------ */}
      <h2>🔟 Real Multi-Container Example (Nginx + Node + MongoDB)</h2>

      <pre style={pre}>
{`version: "3.9"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    environment:
      MONGO_URL: "mongodb://mongo:27017/app"
    depends_on:
      - mongo

  mongo:
    image: mongo
    volumes:
      - mongodata:/data/db

volumes:
  mongodata:`}
      </pre>

      <p>
        Full-stack app — all launched with:
      </p>

      <pre style={pre}>{`docker compose up -d`}</pre>

      {/* ------------------------------------------------------------
        RESTART POLICIES
      ------------------------------------------------------------ */}
      <h2>1️⃣1️⃣ Restart Policies</h2>

      <pre style={pre}>
{`restart: always
restart: on-failure
restart: unless-stopped`}
      </pre>

      {/* ------------------------------------------------------------
        SCALING / LOAD BALANCING
      ------------------------------------------------------------ */}
      <h2>1️⃣2️⃣ Scaling Containers</h2>

      <pre style={pre}>
{`docker compose up --scale api=3 -d`}
      </pre>

      <p>
        Compose creates:
      </p>

      <ul>
        <li>api_1</li>
        <li>api_2</li>
        <li>api_3</li>
      </ul>

      <div style={note}>
        Works only if your service is stateless or uses external DB.
      </div>

      {/* ------------------------------------------------------------
        PROFILES
      ------------------------------------------------------------ */}
      <h2>1️⃣3️⃣ Compose Profiles (Run only selected services)</h2>

      <pre style={pre}>
{`services:
  dashboard:
    build: .
    profiles: ["dev"]`}
      </pre>

      <pre style={pre}>
{`docker compose --profile dev up`}
      </pre>

      {/* ------------------------------------------------------------
        OVERRIDE FILES
      ------------------------------------------------------------ */}
      <h2>1️⃣4️⃣ Override Files (docker-compose.override.yml)</h2>

      <p>
        Compose automatically loads:
      </p>

      <ul>
        <li><code>docker-compose.yml</code></li>
        <li><code>docker-compose.override.yml</code></li>
      </ul>

      <h3>Example override (dev):</h3>

      <pre style={pre}>
{`# docker-compose.override.yml
services:
  app:
    environment:
      DEBUG: true
    volumes:
      - ./src:/app/src`}
      </pre>

      <p>Used for development without modifying production file.</p>

      {/* ------------------------------------------------------------
        PROD FILE + DEV FILE PATTERN
      ------------------------------------------------------------ */}
      <h2>1️⃣5️⃣ Classic Pattern: docker-compose.dev.yml + docker-compose.prod.yml</h2>

      <h3>Run Dev:</h3>
      <pre style={pre}>
{`docker compose -f docker-compose.yml -f docker-compose.dev.yml up`}
      </pre>

      <h3>Run Prod:</h3>
      <pre style={pre}>
{`docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`}
      </pre>

      {/* ------------------------------------------------------------
        LOGGING
      ------------------------------------------------------------ */}
      <h2>1️⃣6️⃣ Logging with Compose</h2>

      <pre style={pre}>
{`docker compose logs -f api`}
      </pre>

      <p>Supports custom log drivers too.</p>

      {/* ------------------------------------------------------------
        DEPLOY SETTINGS (LIMITS)
      ------------------------------------------------------------ */}
      <h2>1️⃣7️⃣ Resource Limits (deploy:)</h2>

      <div style={note}>
        ⚠️ <strong>deploy</strong> works in Swarm Mode only.
      </div>

      <pre style={pre}>
{`services:
  api:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: "512M"`}
      </pre>

      {/* ------------------------------------------------------------
        NETWORK DEBUGGING
      ------------------------------------------------------------ */}
      <h2>1️⃣8️⃣ Compose Network Debugging</h2>

      <pre style={pre}>
{`docker compose exec api ping mongo
docker compose exec api curl http://backend:3000`}
      </pre>

      <p>Use <code>docker compose ps</code> for service inspection.</p>

      {/* ------------------------------------------------------------
        FULL PRODUCTION TEMPLATE
      ------------------------------------------------------------ */}
      <h2>1️⃣9️⃣ Production Template (Nginx Reverse Proxy + App + DB)</h2>

      <pre style={pre}>
{`version: "3.9"

services:
  proxy:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app

  app:
    build: ./app
    environment:
      DB_HOST: db

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: pass123
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}
      </pre>

      {/* ------------------------------------------------------------
        BEST PRACTICES
      ------------------------------------------------------------ */}
      <h2>2️⃣0️⃣ Best Practices (VERY IMPORTANT)</h2>

      <ul>
        <li>Use multi-stage Dockerfiles inside build contexts</li>
        <li>Use <code>.dockerignore</code></li>
        <li>Use <code>depends_on</code> + <code>healthchecks</code></li>
        <li>Put passwords in <code>.env</code> (NOT in compose file)</li>
        <li>Split prod/dev compose files</li>
        <li>Use named volumes for databases</li>
        <li>Avoid 100% host-mode networking</li>
        <li>Always version control your compose files</li>
      </ul>

      {/* ------------------------------------------------------------
        CONCLUSION
      ------------------------------------------------------------ */}
      <h2>✔ Conclusion</h2>

      <p>
        You now fully understand Docker Compose: multi-container orchestration, environments, volumes, 
        networks, scaling, healthchecks, profiles, logging, dev/prod patterns and production deployment.
      </p>

      <p>
        Next → **Lesson 7 (Docker Registry & Private Registry)**?
      </p>

    </div>
  );
}

// Styles
const pre = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
  marginBottom: 20
};

const note = {
  background: "#fff7e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "5px solid #f4b400",
  marginTop: 12,
  marginBottom: 12
};
