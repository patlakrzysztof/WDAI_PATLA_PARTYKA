import { Button, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";

export default function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e: FormEvent) => {
    e.preventDefault();
    //data auth
    // log in api call
  };

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

      <form className="flex flex-col w-full gap-4" onSubmit={handleLogIn}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}
