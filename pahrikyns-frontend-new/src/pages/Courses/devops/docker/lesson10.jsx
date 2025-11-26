export const meta = {
  title: "Docker Lesson 10",
  description: "What is Dockerfile, instructions like FROM, COPY, RUN, CMD.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['docker','dockerfile'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson10() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 10</h1>

      <h2>What is Dockerfile?</h2>
      <p>
        Dockerfile is a script with instructions to build a Docker image.
      </p>

      <h2>Basic Instructions</h2>
      <pre>
{`FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]`}
      </pre>

      <h2>Build Image</h2>
      <pre>
{`docker build -t myapp .`}
      </pre>

      <h2>Run Container</h2>
      <pre>
{`docker run -p 3000:3000 myapp`}
      </pre>
    </div>
  );
}

Lesson10.displayName = "DOCKER Lesson 10 – Full Content";
export default Lesson10;
