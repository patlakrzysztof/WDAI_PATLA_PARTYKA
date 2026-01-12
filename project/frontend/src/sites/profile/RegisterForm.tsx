import { Button, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";

export default function RegisterForm() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password != password2) {
      alert("passwords aren't the same");
      return;
    }

    try {
      const res = await fetch("http://localhost:3002/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          surname: surname,
          nickname: nickname,
          mail: mail,
          phone: phone,
          password: password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("error" + data?.error);
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Unknown error has occured");
    }
  };

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

      <form className="flex flex-col w-full gap-4" onSubmit={handleRegister}>
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
        <div className="flex flex-row gap-2">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
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
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          }}
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
        <TextField
          label="Repeat password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
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
          Register
        </Button>
      </form>
    </div>
  );
}
