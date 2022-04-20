import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";

const SignInModal = () => {
  // function setFormMessage(formElement, type, message) {
  //   const messageElement = formElement.querySelector(".form__message");

  //   messageElement.textContent = message;
  //   messageElement.classList.remove(
  //     "form__message--success",
  //     "form__message--error"
  //   );
  //   messageElement.classList.add(`form__message--${type}`);
  // }
  const [activeUser, setActiveUser] = useState("default value")
  useEffect(() => {afterSignIn()}, [activeUser])
  let history = useHistory();

  async function createAccount(e) {
    e.preventDefault()
    // to do
    let username = document.getElementById('signup_username').value;
    let password = document.getElementById('signup_password').value;
    let email = document.getElementById('signup_email').value;
  
    const myData = {
      username: username,
      email: email,
      password: password
    }
  
    let postPetResponse = await fetch(`/users/signup`,
    {method: "POST", body: JSON.stringify(myData), headers: {'Content-Type': 'application/json'}, mode: "cors"}
    )
    let status = await postPetResponse.json();
    console.log(status.status)
    if(status.status === "success"){
      document.getElementById("signup_username").value = "";
      document.getElementById("signup_email").value = "";
      document.getElementById("signup_password").value = "";
      document.getElementById("signup_confirm_password").value = "";
      alert("Successfully registered!")
    } else {
      alert("Error:" + status.error);
    }
  }
  
  async function signIn(e) {
    e.preventDefault();
    let email = document.getElementById("signin_email").value
    let password = document.getElementById("signin_password").value
    let loginData = {
        email: email,
        password: password
    } 
    let response = await fetch(
        "/users/signin",
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
              },
            mode: "cors"
        }
    );
    let statusInfo = await response.json();
    console.log("Sign in status", statusInfo)
    if(statusInfo.status === "success") {
      window.localStorage.setItem("user", statusInfo.user._id)
      console.log("signinmodal: ", window.localStorage)
      setActiveUser(statusInfo.user.username)
    } else {
      alert("Error: " + statusInfo.error)
    }
  }

  function afterSignIn() {
    // TO DO: add icon and user profile ...
    if(activeUser !== "default value"){
      let identity_div = document.getElementById("identity_div");
      identity_div.innerHTML = `
          <p> Hello, ${activeUser} </p>
          <button className="btn btn-main" id="logoutbtn">Log out</button>`
      document.getElementById("logoutbtn").addEventListener('click', signOut);
      alert("Successfully signed in")
      document.getElementById("signInModal").style.display = "none"
    }
  }

  async function signOut() {
    let response = await fetch(
      "/users/signout", 
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    let statusInfo = await response.json();
    if (statusInfo.status === "success") {
      window.localStorage.setItem("user", null)
      console.log(window.localStorage)
      setActiveUser("default value")
      document.getElementById("logoutbtn").removeEventListener('click', signOut);
      let div = document.getElementById("identity_div")
      div.innerHTML = `
      <button className="btn btn-main" data-toggle="modal" data-target= '#signInModal'>
        Sign in
      </button>`;
      document.getElementById("signInModal").style.display = "block"
      history.push("/");
    }
  }

  function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = message;
  }

  function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    createAccountForm.addEventListener("submit", createAccount)
    loginForm.addEventListener("submit", signIn)
    document
      .querySelector("#linkCreateAccount")
      .addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
      });

    document.querySelector("#linkLogin").addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
    });

    document.querySelectorAll(".form__input").forEach((inputElement) => {
      inputElement.addEventListener("blur", (e) => {
        if (
          e.target.id === "signupUsername" &&
          e.target.value.length > 0 &&
          e.target.value.length < 10
        ) {
          setInputError(
            inputElement,
            "Username must be at least 10 characters in length"
          );
        }
      });

      inputElement.addEventListener("input", (e) => {
        clearInputError(inputElement);
      });
    });
  });

  return (
    <section className="modal fade" id="signInModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title mx-auto">Welcome to Pawdy</h1>
          </div>
          <div className="modal-body">
            <form className="form" id="login">
              <h1 className="form__title">Login With UW Email</h1>
              <div className="form__message form__message--error"></div>
              <div className="form__input-group">
                <label htmlFor="fname">UW Email</label>
                <input type="text" className="form__input" id="signin_email"></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form__input"
                  id="signin_password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <button className="form__button" type="submit">
                Sign In
              </button>
              <p className="form__text">
                <a href="#" className="form__link">
                  Forgot your password?
                </a>
              </p>
              <p className="form__text">
                <a className="form__link" href="./" id="linkCreateAccount">
                  Don't have an account? Create account
                </a>
              </p>
            </form>
            <form className="form form--hidden" id="createAccount">
              <h1 className="form__title">Create Account</h1>
              <div className="form__message form__message--error"></div>
              <div className="form__input-group">
                <input
                  type="text"
                  id="signup_username"
                  className="form__input"
                  autoFocus
                  placeholder="Username"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  type="text"
                  className="form__input"
                  id="signup_email"
                  autoFocus
                  placeholder="Email Address"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  id="signup_password"
                  type="password"
                  className="form__input"
                  autoFocus
                  placeholder="Password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  id="signup_confirm_password"
                  type="password"
                  className="form__input"
                  autoFocus
                  placeholder="Confirm password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <button className="form__button" type="submit">
                Submit
              </button>
              <p className="form__text">
                <a className="form__link" href="./" id="linkLogin">
                  Already have an account? Sign in
                </a>
              </p>
              {/* <input type="submit" value="Submit" className="form__button"></input> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInModal;
