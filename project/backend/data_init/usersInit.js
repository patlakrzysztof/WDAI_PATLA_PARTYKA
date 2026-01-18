const Users = require("../models/users");

async function usersInit() {
  try {
    await fetch("http://localhost:3002/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: "Mateusz",
        surname: "Jarosz",
        nickname: "superProwadzący123",
        mail: "mjarosz@agh.edu.pl",
        phone: "+48 230 223 433",
        password: "mjarosz123",
      }),
    });

    await fetch("http://localhost:3002/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: "Mateusz",
        surname: "Partyka",
        nickname: "boskiUczeń",
        mail: "mpartyka@student.agh.edu.pl",
        phone: "+48 600 100 200",
        password: "mpartyka123",
      }),
    });

    await fetch("http://localhost:3002/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: "Krzysztof",
        surname: "Patla",
        nickname: "nawetLepszyUczeń",
        mail: "kpatla@student.agh.edu.pl",
        phone: "+48 500 600 700",
        password: "kpatla123",
      }),
    });
  } catch {}
}

module.exports = usersInit;
