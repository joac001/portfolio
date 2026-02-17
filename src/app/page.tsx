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
      <section className="flex flex-col space-y-2">
        <TypeWriter text="Software Engineer" variant="h1" style="mono" speed={60} delay={300} />
        <StaggerText delay={0.3} staggerDelay={0.1}>
          <StaggerItem>
            <Typography variant="h2" style="mono">
              Joaquín Ordoñez
            </Typography>
          </StaggerItem>
        </StaggerText>
      </section>

      <section className="flex w-full md:w-2/3" aria-labelledby="about-heading">
        <StaggerText delay={0.5} staggerDelay={0.12}>
          <StaggerItem>
            <Typography variant="h2" id="about-heading">
              About me
            </Typography>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-4 flex flex-col gap-4">
              <Typography variant="body">
                Full-Stack Developer with a product mindset. I build web applications end-to-end
                from architecture and UX decisions to production deployment using TypeScript, React,
                Next.js, Node.js, FastAPI and PostgreSQL.
              </Typography>
              <Typography variant="body">
                Recently focused on integrating LLMs into real user workflows: structured outputs,
                real-time interactions, and RAG pipelines with OpenAI, Gemini and MongoDB.
              </Typography>
              <Typography variant="body">
                I thrive in small teams where I can own features across the stack, shape how
                products evolve, and solve meaningful problems especially in SaaS and AI-driven
                applications.
              </Typography>
            </div>
          </StaggerItem>
        </StaggerText>
      </section>

      <ExperienceTimeline id="experience-timeline" />
    </Container>
  );
}
