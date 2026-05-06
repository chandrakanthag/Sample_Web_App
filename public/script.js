document.getElementById("F").addEventListener("submit",async function(event){
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let number = Number(document.getElementById("number").value.trim());
    const res = await fetch("/save", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, number })
    });
    const data = await res.json();
    if (data.message)
    {
        document.getElementById("result").style.color = "green";
        result.textContent = "Registration Successful!";
    }
});

async function searchUser() {
    document.getElementById("result").style.color = "red";
    let number = Number(document.getElementById("searchNumber").value);

    const res = await fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number })
    });

    const data = await res.json();

    if (data.name) {
        document.getElementById("result").innerText = data.name;
    } else {
        document.getElementById("result").innerText = data.message;
    }
}

async function deleteUser() {

    document.getElementById("result").style.color = "red";

    let number = Number(document.getElementById("searchNumber").value);

    const res = await fetch("/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number })
    });

    const data = await res.json();

    document.getElementById("result").innerText = data.message;
}
