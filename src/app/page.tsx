import {
  Container,
  Typography,
  TypeWriter,
  StaggerText,
  StaggerItem,
  Button,
} from '@/components/shared';
import { ExperienceTimeline } from '@/components/experience-timeline';

export default function Home() {
  return (
    <Container id="main-content" className="flex-col gap-0">
      <section className="flex flex-col space-y-4">
        <div className="md:w-2/3">
          <TypeWriter text="Software Engineer" variant="h1" style="mono" speed={60} delay={300} />
          <StaggerText delay={0.3} staggerDelay={0.1}>
            <StaggerItem>
              <Typography variant="h2" style="mono">
                Joaquín Ordoñez
              </Typography>
            </StaggerItem>
          </StaggerText>
          <StaggerText delay={0.5} staggerDelay={0.15}>
            <StaggerItem>
              <Typography variant="body">
                Full-stack Software Engineer with experience building and shipping production web
                applications end-to-end in startup and early-stage environments.
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <div className="h-2" />
            </StaggerItem>
            <StaggerItem>
              <Typography variant="body">
                Specialized in React, Next.js, TypeScript, Node.js and Python, with hands-on
                experience designing scalable architectures, authentication and authorization
                systems and cloud-ready deployments.
              </Typography>
            </StaggerItem>
          </StaggerText>
        </div>
        <Button magnetic>Contact me</Button>
      </section>

      <ExperienceTimeline id="experience-timeline" />
    </Container>
  );
}
