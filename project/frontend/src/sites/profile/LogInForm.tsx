import { Button, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";

export default function LogInForm() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3002/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          mail: mail,
          password: password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("login failed: " + data?.error);
        return;
      }
      window.location.reload();
    } catch (e) {
      console.error("error: " + e);
      alert("login failed");
    }
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
          value={mail}
          onChange={(e) => setMail(e.target.value)}
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
