let u = document.getElementById("username");
let p = document.getElementById("password");
let btn = document.getElementById("btn");

btn.addEventListener("click",async (e)=>{

    let url = "http://localhost:3000/users/login"
    
    let data = {
        "username" : u.value,
        "password" : p.value,
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
        let data = await res.json();
        console.log(data);
    }
    catch(e)
    {
        console.log('errpo' , e);
    }
    e.preventDefault();
})



