import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Home() {
  var backendurl = "https://r671.pythonanywhere.com"

  function signout(){
    window.localStorage.removeItem("lgnd")
    window.localStorage.removeItem("crsftoken")
    window.localStorage.removeItem("uuid")
    window.location.href = "/login"
  }

    var url = backendurl + "/i/getuser/"
    var islogined = window.localStorage.getItem("lgnd")
    var crsftoken = window.localStorage.getItem("crsftoken")
    var uuid = window.localStorage.getItem("uuid")
    function getdata(){
      if(islogined !== "true" || crsftoken === null || uuid === null){
        console.log("mout")
        setTimeout(() => {
          signout()
        }, 0);
      }else{
        var stoken = `Token ${crsftoken}`
            axios.get(url, {
              "headers":
                {"Authorization": stoken,"uuid": uuid}
              }).then(res => {
                console.log(res.data)
                if (res.data.status == false){
                  signout()
                }
              var username = document.getElementById("username")
              var full_name = document.getElementById("full_name")
              var image = document.getElementById("image")
              username.innerHTML = `${res.data.username}`
              image.setAttribute("src", `${backendurl}${res.data.image}`)
              full_name.innerHTML = res.data.name + " " + res.data.lastname
            })
          
      }
    }
    getdata()

  return (
    <div className="home">
      <div className="navbar">
        <div className="navcenter">
          <NavLink className="nav-link" to="/direct">Chats</NavLink>
        </div>
      </div>
      
      <div className="profilehover">
          <img alt="profileimg" className="profileimg" id="image" />
          <h2 id="username">Username</h2>
          <h4 id="full_name">Name lastname</h4>
          <p><NavLink  onClick={()=>signout()} className="nav-link signout" to="/login">logout</NavLink></p>
          
          <NavLink className="nav-link change" to="/change">Change</NavLink>
      </div>
    </div>
  )
}

export default Home;