import { Button, Card, CardContent, Typography } from "@mui/material";

function HomePage() {
  return (
    <div className="flex justify-center w-screen h-screen">
      <Card
        className="flex justify-center p-10 w-screen h-2/4"
        sx={{ backgroundColor: "primary.main" }}
      >
        <CardContent className="flex flex-col gap-10">
          <Typography
            className="flex justify-center"
            variant="h3"
            color="textSecondary"
          >
            NAME OF THE SHOP
          </Typography>
          <Typography
            className="flex justify-center"
            variant="h6"
            color="textSecondary"
          >
            We are the best online shop that u can imagine!
            <br /> We sell the best quality products!
            <br /> All of them are handmade and eco-friendly!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
