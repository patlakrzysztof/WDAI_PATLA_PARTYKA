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
  address: {
    country: "Poland",
    city: "Krakow",
    zipCode: "20-231",
    street: "Imaginary",
    houseNumber: 20,
    flatNumber: 3,
  },
};

export default function UserInfo() {
  const [isShown, setIsShown] = useState(false);

  const showHideData = () => {
    setIsShown((before) => !before);
  };

  return (
    <Card variant="outlined" className="w-full max-w-[20rem]">
      <CardContent>
        <div className="mb-4">
          <Typography variant="h5" className="black">
            {" "}
            {user.name + " " + user.surname}
          </Typography>
          <Typography variant="body1">{user.nickname}</Typography>
          <Typography variant="body2">
            {isShown ? `#${user.id}` : "#******"}
          </Typography>
        </div>

        <Divider />

        <div className="my-4">
          {isShown ? (
            <>
              <Typography variant="body1">e-mail: {user.mail}</Typography>
              <Typography variant="body1">
                phone: {user.phone ? user.phone : "---"}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1">e-mail: ****</Typography>
              <Typography variant="body1">phone: ****</Typography>
            </>
          )}
        </div>

        <Divider />

        <div className="my-4">
          <Typography variant="subtitle2" gutterBottom>
            Delivery address:
          </Typography>
          {isShown ? (
            user.address ? (
              <>
                <Typography variant="body1">{user.address.country}</Typography>
                <Typography variant="body1">{user.address.city}</Typography>
                <Typography variant="body1">
                  {user.address.street} st. {user.address.houseNumber}
                  {user.address.flatNumber ? "/" + user.address.flatNumber : ""}
                </Typography>
                <Typography variant="body1">{user.address.zipCode}</Typography>
                <Typography variant="body1">{user.address.city}</Typography>
              </>
            ) : (
              <Typography variant="body1">---</Typography>
            )
          ) : (
            <Typography variant="body1">****</Typography>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={showHideData}>
          {isShown ? "hide" : "show"}
        </Button>
      </CardActions>
    </Card>
  );
}
