import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ProjectCre, productDetails } from '../../ReduxToolkit/CrudSlice'; 

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [img, setimg] = useState("");

  const {redirect} = useSelector((s) => s?.Crud);

  const [user, setUser] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState({});
  console.log(error, "arpan");
 

  const validation = () => {
    let error = {};

    if (!user.name) {
      error.name = "Name is Required";
    }

    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a valid Email";
    }

    if (!user.mobile) {
      error.mobile = "Phone is Required";
    }

    if (!user.password) {
      error.password = "School name is Required";
    }

    if (!user.img) {
      error.img = "Image name is Required";
    }
    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "title") {
      if (value.length === 0) {
        setError({ ...error, title: "Title is Required" });
        setUser({ ...user, title: "" });
      } else {
        setError({ ...error, title: "" });
        setUser({ ...user, title: value });
      }
    }

    if (name === "description") {
      if (value.length === 0) {
        setError({ ...error, description: "Description is Required" });
        setUser({ ...user, description: "" });
      } else {
        setError({ ...error, description: "" });
        setUser({ ...user, description: value });
      }
    }

   

    
  };


  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("title", user.title);
    formData.append("description", user.description);
    formData.append("image", img);
    dispatch(ProjectCre(formData));
  };


  const RedirectUser = () => {
    let title = localStorage.getItem("title");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/createe";

    // alert(window.location.pathname.toLowerCase())

    if (title !== null && title !== undefined && title !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/productlist");
    }
};

console.log(redirect,"redirect")

useEffect(() => {
  RedirectUser();
}, [redirect])




  return (
    <>
     <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Create Product</h2>
              <ol>
                <li><a href="index.html">Home</a></li>
                <li>Create Product</li>
              </ol>
            </div>

          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{width:"900px"}}>
            <div class="card-header">
              Create Product
            </div>
            <div class="card-body">
              <form>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Title</label>
                  <input type="text" onChange={postUserData} value={user.title} class="form-control" name='title'/>
                </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Description</label>
                  <input type="text" onChange={postUserData} value={user.description} class="form-control" name='description'/>
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

                <button  onClick={SubmitInfo} type="submit" class="btn btn-success">Create</button>
              </form>
            </div>
           
          </div>
        </div>

      </main>
      
    </>
  )
}

export default CreateProduct
