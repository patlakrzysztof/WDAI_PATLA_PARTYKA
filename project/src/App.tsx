import { Button, Card, CardContent, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6">
        <CardContent className="flex flex-col gap-4 items-center">
          <Typography variant="h5">MUI + Tailwind working</Typography>

          <Button variant="contained" color="primary">
            Works
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
