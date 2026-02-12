import { Container, Typography } from '@/components/shared';

export default function Home() {
  return (
    <Container id="main-content" className="flex-col">
      <section className="space-y-4">
        <div>
          <Typography variant="h2" style="mono">
            Software Engineer
          </Typography>
          <Typography variant="h3" style="mono">
            Joaquín Ordoñez
          </Typography>
        </div>
        <Typography variant="body">
          Full-stack Software Engineer with experience building and shipping production web
          applications end-to-end in startup and early-stage environments.
          <span className="block h-2" />
          Specialized in React, Next.js, TypeScript, Node.js and Python, with hands-on experience
          designing scalable architectures, authentication and authorization systems and cloud-ready
          deployments.
        </Typography>
      </section>
    </Container>
  );
}
