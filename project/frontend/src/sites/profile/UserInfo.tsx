import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import type { User } from "../../types";
import { useState } from "react";

const user: User = {
  name: "Jan",
  surname: "Kochanowski",
  nickname: "Smoothie",
  id: 124444,
  mail: "someMail@gmail.com",
  phone: "48 695 209 243",
};

export default function UserInfo() {
  const [isShown, setIsShown] = useState(false);

  const showHideData = () => {
    setIsShown((before) => !before);
  };

  return (
    <Card
      elevation={5}
      className="w-full max-w-[400px] bg-white rounded-lg overflow-visible relative mt-10 px-4 py-5"
    >
      <CardContent className="pt-12 px-8">
        <div className="flex flex-col items-center mb-6">
          <Typography variant="h5" color="primary" fontWeight="bold">
            {user.name} {user.surname}
          </Typography>
          <Typography variant="subtitle1" color="secondary">
            @{user.nickname}
          </Typography>
        </div>

        <Divider />

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between">
            <Typography color="secondary">ID:</Typography>
            <Typography fontWeight="medium">
              #{isShown ? user.id : "●●●●●●"}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography color="secondary">Email:</Typography>
            <Typography fontWeight="medium">
              {isShown ? user.mail : "●●●●●●@gmail.com"}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography color="secondary">Phone:</Typography>
            {isShown ? (
              <Typography fontWeight="medium">
                +{user.phone ? user.phone : "-- --- ---"}
              </Typography>
            ) : (
              <Typography fontWeight="medium">+●● ●●● ●●● ●●●</Typography>
            )}
          </div>
        </div>
      </CardContent>
      <CardActions className="justify-center pb-6">
        <Button
          variant="contained"
          onClick={showHideData}
          className="bg-primary hover:bg-[#1A2D27] normal-case px-8"
        >
          {isShown ? "Hide Details" : "Show Details"}
        </Button>
      </CardActions>
    </Card>
  );
}
