let token = null;

        async function register() {
            try {
                const response = await fetch("/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: document.getElementById("register-username").value,
                        password: document.getElementById("register-password").value
                    })
                });
                
                if (response.ok) {
                    alert("Registered successfully!");
                } else {
                    const errorText = await response.text();
                    alert("Registration failed: " + errorText);
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }

        async function login() {
            try {
                const response = await fetch("/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: document.getElementById("login-username").value,
                        password: document.getElementById("login-password").value
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    token = data.token;
                    alert("Logged in successfully!");
                } else {
                    const errorText = await response.text();
                    alert("Login failed: " + errorText);
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }

        async function loadLocals() {
            try {
                const response = await fetch('/locals/locals');
                
                if (response.ok) {
                    const data = await response.json();
                    const list = document.getElementById("locals");
                    list.innerHTML = "";
                    
                    data.forEach(local => {
                        const li = document.createElement("li");
                        li.textContent = `ID: ${local.id} - ${local.name}`;
                        list.appendChild(li);
                    });
                } else {
                    alert("Failed to load restaurants");
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }

        async function placeOrder() {
            if (!token) {
                alert("Please login first");
                return;
            }
            
            try {
                const response = await fetch("/orders/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        user: document.getElementById("login-username").value,
                        localId: parseInt(document.getElementById("order-local").value),
                        items: document.getElementById("order-items").value.split(",").map(i => i.trim())
                    })
                });
                
                if (response.ok) {
                    alert("Order placed successfully!");
                } else {
                    const errorText = await response.text();
                    alert("Failed to place order: " + errorText);
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
