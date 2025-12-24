import { Button, Card, CardContent, Typography } from "@mui/material";

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-6" color="background">
        <CardContent className="flex flex-col gap-4 items-center">
          <Typography variant="h5" color="textPrimary">
            MUI + Tailwind working
          </Typography>

          <Button variant="contained" color="primary">
            Works
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
