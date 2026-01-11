import { Button, TextField, Typography } from "@mui/material";

export default function RegisterForm() {
  return (
    <div
      className="flex flex-col gap-6 items-center flex-grow
      max-w-[400px] w-[90vw] bg-white p-8 rounded-xl shadow-xl border-t-4 border-secondary"
    >
      <Typography
        variant="h5"
        component="h2"
        className="font-bold text-primary mb-2"
      >
        Create account
      </Typography>

      <div className="flex flex-col w-full gap-4">
        <TextField
          id="mail"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
          required
        />
        <div className="flex flex-row gap-2">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                color: "primary.main",
              },
            }}
            required
          />
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                color: "primary.main",
              },
            }}
            required
          />
        </div>
        <TextField
          id="nickname"
          label="Nickname"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
          required
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
          required
        />
        <TextField
          id="password2"
          label="Repeat password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
          required
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ color: "white", fontWeight: "bold", mt: 2 }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
