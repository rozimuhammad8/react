import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Userimage() {
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
    
    var iusername = document.getElementsByName("username")
    var iemail = document.getElementsByName("email")
    var ipassword = document.getElementsByName("password")

    if(islogined !== "true" || crsftoken === null || uuid === null){
      setTimeout(signout(),0)
    }else{
      var stoken = `Token ${crsftoken}`
        axios.get(url, {
          "headers":
            {"Authorization": stoken,"uuid": uuid}
          }).then(res => {
            if (res.data.status == false){
              signout()
            }
              console.log(res.data)
          iusername[0].value = `${res.data.username}`
          iemail[0].value = res.data.name
          ipassword[0].value = res.data.lastname
        })
    }

    const [state, setState] = useState()

          function handleFile(e){
            let file = e.target.files[0]
            setState({file: file})
          }
          

    var url1 = backendurl + "/i/userchange/"
    
      function submit(e){
        var span = document.getElementById("label")

        var formdata = new FormData()
        formdata.append("token", crsftoken)
        formdata.append("username", iusername[0].value)
        formdata.append("name", iemail[0].value)
        formdata.append("lastname", ipassword[0].value)

        if(state !== undefined){
          formdata.append("image", state.file)
        }

        if(span.style.color !== "red"){
          axios.post(url1, formdata)
        }
      }

      function username(e){
        var span = document.getElementById("label")
        console.log(backendurl + "/i/getusername/")
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
        <h2>Change Profile</h2>
        
        <div className="inputBox">
            <input type="file" accept="image/*" required="required" id="img"/>
            <label htmlFor="img" className="labelimg">Select a new profile image</label>
        </div>
        
        <div className="inputBox">
            <input type="text" required="required" name="username" onChange={(e) => username(e)}/>
            <span id="label">Username</span>
            <i></i>
        </div>
        
        <div className="inputBox">
            <input type="text" required="required" name="email" />
            <span>Name</span>
            <i></i>
        </div>

        <div className="inputBox">
            <input type="text" required="required" name="password"/>
            <span>Lastname</span>
            <i></i>
        </div>
          <NavLink id="submit" onClick={(e) => submit(e)} to="/">Save</NavLink>
          <NavLink id="submit" to="/">Don't save</NavLink>

    </div>
  )
}

export default Userimage;