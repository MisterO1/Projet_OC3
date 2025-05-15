const form = document.querySelector("form")
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll("input")
    const email = inputs[0].value
    const password = inputs[1].value
    loginRequest(email,password)
})

async function loginRequest(email,password) {
    fetch(
        "http://localhost:5678/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "accept":"application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        }
    ).then(response => {
        if (!response.ok){
            if (response.status == 401){
                throw new Error(`mot de passe incorrecte !`)
            }else if (response.status == 404){
                throw new Error(`compte non existant !`)
            }
        }
        return response.json()
    }).then(data => {
        if (data){
            sessionStorage.setItem("token",data.token)
            window.location.href = "./homepage.html"
        }
    }).catch(error =>{
        document.querySelector(".msg-error").textContent = error.message
    })
}