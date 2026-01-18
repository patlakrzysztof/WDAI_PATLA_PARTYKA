import { Card, CardContent, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function HomePage() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Card
        className="flex justify-center p-10 w-screen"
        sx={{ backgroundColor: "primary.main" }}
      >
        <CardContent className="flex flex-col justify-center items-center gap-10">
          <Typography variant="h3" color="textSecondary">
            Pat & Par
          </Typography>
          <Typography variant="h6" color="textSecondary">
            We are the best online shop that u can imagine!
            <br /> We sell the best quality products!
            <br /> All of them are eco-friendly!
          </Typography>
        </CardContent>
      </Card>
      <div className="flex p-10 flex-row justify-around">
        <Card
          className="flex justify-center items-center"
          sx={{ width: 1 / 4, backgroundColor: "secondary.main" }}
        >
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <LocalShippingIcon fontSize="large" />
            <Typography variant="h6" component="div">
              Ships within 24 hours
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="flex justify-center items-center"
          sx={{ width: 1 / 4, backgroundColor: "secondary.main" }}
        >
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <DiscountIcon fontSize="large" />
            <Typography variant="h6" component="div">
              Free shipment for
              <br />
              orders over 20$
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="flex justify-center items-center"
          sx={{ width: 1 / 4, backgroundColor: "secondary.main" }}
        >
          <CardContent className="flex flex-col justify-center items-center gap-2">
            <CurrencyExchangeIcon fontSize="large" />
            <Typography variant="h6" component="div">
              30 days for refund
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
