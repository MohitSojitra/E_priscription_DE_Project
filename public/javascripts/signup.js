let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let email = document.getElementById("email")
let applyDoctor = document.getElementById("applyDoctor")
let username = document.getElementById("username")
let password = document.getElementById("password")
let btn = document.getElementById("btn")




btn.addEventListener("click",async (e)=>{

    let url = "http://localhost:3000/users/signup"
    
    let data = {
        "username" : username.value,
        "password" : password.value,
        "firstname" :firstName.value,
        "lastname" :lastName.value,
        "email" : email.value,
        "applyDoctor" :applyDoctor.value
    }
    console.log(data)
    let params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try{
        
        let res = await fetch(url , params)
        console.log(res);
    }
    catch(e)
    {
        console.log('errpo' , e);
    }
    e.preventDefault();
})



