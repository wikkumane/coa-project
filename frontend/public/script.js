let token = null

async function register() {
  await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("register-username").value,
      password: document.getElementById("register-password").value
    })
  })
  alert("Registered")
}

async function login() {
  const res = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("login-username").value,
      password: document.getElementById("login-password").value
    })
  })
  const data = await res.json()
  token = data.token
  alert("Logged in!")
}

async function loadLocals() {
  const res = await fetch("http://localhost:3002/locals")
  const data = await res.json()
  const list = document.getElementById("locals")
  list.innerHTML = ""
  data.forEach(r => {
    const li = document.createElement("li")
    li.textContent = `${r.name} - ${r.description}`
    list.appendChild(li)
  })
}

async function placeOrder() {
  await fetch("http://localhost:3003/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      restaurant: document.getElementById("order-local").value,
      items: document.getElementById("order-items").value.split(",").map(i => i.trim())
    })
  })
  alert("Order placed!")
}
