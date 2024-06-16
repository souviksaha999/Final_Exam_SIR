import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister, login, reset_redirectToo } from '../../ReduxToolkit/AuthSlice';
import passwordEye from "../../image/show-password.png"

const Login = () => {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const {redirectTo,redirectToo} = useSelector((s) => s?.Auth);
  const navigate=useNavigate()
  const togglePassword = (e) => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
e.preventDefault()
    setPasswordShown(!passwordShown);
  };
  const [user, setUser] = useState({
   
    email: "",
    password: "",
  });
  const [img, setimg] = useState("");
  const [error, setError] = useState({});
  const validation = () => {
    let error = {};
   

    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    )
      if (!user.password) {
        error.password = "Password  is Required";
      }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

   
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password name is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };


  const RedirectUser = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token !== null && token !== undefined && token !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/productlist");
    }
};


useEffect(() => {
  RedirectUser();
}, [redirectTo])

useEffect(() => {
  dispatch(reset_redirectToo(null))
 }, [redirectToo])
 


  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    dispatch(login(formData));
  };

  const reg = () => {
    dispatch(handleRegister());
   
  };

  return (
    <>
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Login</h2>
              <ol>
                <li><a href="index.html">Home</a></li>
                <li>Login</li>
              </ol>
            </div>

          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{width:"600px"}}>
            <div class="card-header">
              User Login
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" onChange={postUserData} onvalue={user.email} class="form-control" name='email'/>
                  <span style={{ color: "red", marginLeft: "24px" }}>
              {" "}
              {error.email}{" "}
            </span>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type={passwordShown ? "text" : "password"}  onChange={postUserData} value={user.password}class="form-control" name="password"/>
                  <span style={{ color: "red", marginLeft: "24px" }}>
              {" "}
              {error.password}{" "}
            </span>

                  <br/>
                 <img  height="25px" color='green' src={passwordEye}/>

                  <Link onClick={togglePassword}>Show Password</Link>
                </div>

                <button type="submit"  onClick={SubmitInfo} class="btn btn-success">Login</button>
              </form>
            </div>
            <div class="card-footer text-muted">
              Don`t have an Account ? <Link onClick={reg} to='/register'> Register</Link>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default Login
