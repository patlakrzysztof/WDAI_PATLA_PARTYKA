import { Button, TextField, Typography } from "@mui/material";

export default function LogInForm() {
  return (
    <div
      className="flex flex-col gap-6 items-center 
      max-w-[400px] w-[90vw] bg-white p-8 rounded-xl shadow-xl border-t-4 border-secondary"
    >
      <Typography
        variant="h5"
        component="h2"
        className="font-bold text-primary mb-2"
      >
        I've got an account
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
