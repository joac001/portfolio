import { Button, Card, Container, Typography } from '@/components/shared';

export default function Home() {
  return (
    <Container id="main-content" className="flex-col">
      <div className="grid grid-cols-2">
        <Typography variant="h1" style="formal">
          H1 Formal
        </Typography>
        <Typography variant="h1" style="futuristic">
          H1 Futuristic
        </Typography>
        <Typography variant="h1" style="mono">
          H1 Mono
        </Typography>
        <Typography variant="h2" style="formal">
          H2 Formal
        </Typography>
        <Typography variant="h2" style="futuristic">
          H2 Futuristic
        </Typography>
        <Typography variant="h2" style="mono">
          H2 Mono
        </Typography>
        <Typography variant="h3" style="formal">
          H3 Formal
        </Typography>
        <Typography variant="h3" style="futuristic">
          H3 Futuristic
        </Typography>
        <Typography variant="h3" style="mono">
          H3 Mono
        </Typography>
        <Typography variant="body" style="formal">
          Body Formal
        </Typography>
        <Typography variant="body" style="futuristic">
          Body Futuristic
        </Typography>
        <Typography variant="body" style="mono">
          Body Mono
        </Typography>
        <Typography variant="caption" style="formal">
          Caption Formal
        </Typography>
        <Typography variant="caption" style="futuristic">
          Caption Futuristic
        </Typography>
        <Typography variant="caption" style="mono">
          Caption Mono
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="filled" style="formal">
          filled - formal
        </Button>
        <Button variant="ghost" style="futuristic">
          ghost - futuristic
        </Button>
        <Button variant="outlined" style="mono">
          outlined - mono
        </Button>
      </div>

      <Card
        title="Card Title"
        subtitle="Card Subtitle"
        actions={[
          <Button key="action1" variant="filled" style="formal">
            Action
          </Button>,
          <Button key="action2" variant="outlined" style="formal">
            Action
          </Button>,
        ]}
      >
        <Typography variant="body">
          This is a sample card content. It can include text, images, or any other elements you want
          to display within the card.
        </Typography>
      </Card>
    </Container>
  );
}
