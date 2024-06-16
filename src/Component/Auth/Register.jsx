import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../ReduxToolkit/AuthSlice";
import passwordEye from "../../image/show-password.png"

const Register = () => {
  const navigate=useNavigate()
  const [passwordShown, setPasswordShown] = useState(false);
  const {redirectToo} = useSelector((s) => s?.Auth);
  const [img, setimg] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const togglePassword = (e) => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
e.preventDefault()
    setPasswordShown(!passwordShown);
  };
  const [error, setError] = useState({});
  console.log(error, "arpan");
  const dispatch = useDispatch();

  const validation = () => {
    let error = {};
    console.log(error,"error")
    if (!user.first_name) {
      error.first_name = "First_name is Required";
    }

    

    if (!user.last_name) {
      error.last_name = "Last_name is Required";
    }
    
    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    )
    
    if (!user.password) {
      error.password = "Password is Required";
    }
   

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "Name is Required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "last_name is Required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "@Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile_pic", img);
    dispatch(register(formData));
  
  };

  const RedirectUser = () => {
    let name = localStorage.getItem("name");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/register";

    if (name !== null && name !== undefined && name !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/login");
    }
};


useEffect(() => {
  RedirectUser();
}, [redirectToo])



  return (
    <div>
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Register</h2>
              <ol>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Register</li>
              </ol>
            </div>
          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{ width: "600px" }}>
            <div class="card-header">User Register</div>
            <div class="card-body">
              <form>
              <div>
            <label for="exampleInputEmail1">First Name</label>
            <input
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="first_name"
              value={user.first_name}
              onChange={(e) => postUserData(e)}
            />
            <span style={{ color: "red", marginLeft: "24px" }}>
              {" "}
              {error.first_name}{" "}
            </span>
          </div>
          <div>
            <label for="exampleInputEmail1">Last Name</label>
            <input
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="last_name"
              value={user.last_name}
              onChange={(e) => postUserData(e)}
            />
            <span style={{ color: "red", marginLeft: "24px" }}>
              {" "}
              {error.last_name}{" "}
            </span>
          </div>
               
          <div>
            <label for="exampleInputEmail1">Email address</label>
            <input
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={(e) => postUserData(e)}
            />
            <span style={{ color: "red", marginLeft: "24px" }}>
              {" "}
              {error.email}{" "}
            </span>
          </div>

          <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type={passwordShown ? "text" : "password"}  onChange={postUserData} value={user.password}class="form-control" name="password"/>
                  <br/>
                 <img  height="25px" color='green' src={passwordEye}/>

                  <Link onClick={togglePassword}>Show Password</Link>
                </div>

        
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setimg(e.target.files[0])}
                    name="img"
                    accept="image/*"
                    class="form-control"
                  />
                  {img !== "" && img !== undefined && img !== null ? (
                    <img
                      style={{ height: "180px" }}
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="upload-img"
                    />
                  ) : (
                    <>{img === "" && <p>Drag or drop content here</p>}</>
                  )}
                </div>

                <button type="submit" class="btn btn-success" onClick={SubmitInfo}>
                  Register
                </button>
              </form>
            </div>
            <div class="card-footer text-muted">
              have an Account ? <Link to="/login"> Login</Link>
            </div>
          </div>
        </div>
      </main>
    </div>

   
  );
};

export default Register;
