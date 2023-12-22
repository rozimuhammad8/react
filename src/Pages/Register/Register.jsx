import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Register() {
  var backendurl = "https://r671.pythonanywhere.com"


  var islogined = window.localStorage.getItem("lgnd")
  var crsftoken = window.localStorage.getItem("crsftoken")
  var uuid = window.localStorage.getItem("uuid")
  if(islogined === "true" && crsftoken && uuid){
    window.location.href = "/"
  }

    var iusername = document.getElementsByName("username")
    var iemail = document.getElementsByName("email")
    var ipassword = document.getElementsByName("password")
    var span = document.getElementById("label")


    var url = backendurl + "/i/register/"

function submit(e){
    if(span.style.color !== "red"){
      axios.post(url, {
        "username": iusername[0].value,
        "email": iemail[0].value,
        "password": ipassword[0].value
      }).then(response => {
        if(response.data.status === true){
          var uuid = response.data.uuid
          window.localStorage.setItem("crsftoken", response.data.token)
          window.localStorage.setItem("uuid", uuid)
          window.localStorage.setItem("lgnd", true)
          window.location.href = ""
        }
      })
    }
}
var span = document.getElementById("label")
function username(e){
  axios.post(backendurl + "/i/getusername/", {
    "username": e.target.value
  }).then(res => {
    if(res.data.status === true){
      span.style.color = "#45f3ff"
    }else{
      span.style.color = "red"
    }
  })
}


  return (
    <div className="form">
        <h2>Sign in</h2>
        <div className="inputBox">
            <input type="text" required="required" name="username" onChange={(e) => username(e)}/>
            <span id="label">Username</span>
            <i></i>
        </div>
        
        <div className="inputBox">
            <input type="text" required="required" name="email" />
            <span>Your email</span>
            <i></i>
        </div>

        <div className="inputBox">
            <input type="password" required="required" name="password"/>
            <span>Password</span>
            <i></i>
        </div>
        <div className="links">
          <NavLink className="nav-link" to="/login">Log in</NavLink>
        </div>
        <button id="submit" onClick={(e) => submit(e)}>Register</button>
    </div>
  )
}

export default Register;