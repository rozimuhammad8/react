import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./lg.css"


function Login() {
  var backendurl = "https://r671.pythonanywhere.com"

  var islogined = window.localStorage.getItem("lgnd")
  var crsftoken = window.localStorage.getItem("crsftoken")
  var uuid = window.localStorage.getItem("uuid")
  if(islogined === "true" && crsftoken && uuid){
    window.location.href = "/"
  }

    var iusername = document.getElementsByName("username")
    var ipassword = document.getElementsByName("password")


    var url = backendurl + "/i/login/"

function submit(e){
  if(iusername[0].value != "" && ipassword[0].value != ""){

    axios.post(url, {
      "username": iusername[0].value,
      "password": ipassword[0].value
    }).then(response => {
      console.log(response.data)
        if(response.data.status === true && response.data.token){
            window.localStorage.setItem("crsftoken", response.data.token)
            window.localStorage.setItem("uuid", response.data.uuid)
            window.localStorage.setItem("lgnd", true)
            window.location.href = ""
      }
        if(response.data.status === false || response.data.status === null){
            var label = document.getElementById("label")
            label.style.color = "red"
            label.innerHTML = "Parol yoki username hato"
        }
      })
    }
  }

    return (
            <div className="form">
                <h2>Sign in</h2>
                <div className="inputBox">
                    <input type="text" required="required" name="username" />
                    <span id="label">Username</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="password" required="required" name="password"/>
                    <span>Password</span>
                    <i></i>
                </div>
                <div className="links">
                  <NavLink className="nav-link" to="/login">Forgot password</NavLink>
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </div>
                <button id="submit" onClick={(e) => submit(e)}>Log in</button>
            </div>
    )
  }

export default Login;