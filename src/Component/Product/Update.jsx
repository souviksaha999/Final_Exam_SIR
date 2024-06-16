import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {productDetails, productUpdate } from '../../ReduxToolkit/CrudSlice';
import { useDispatch, useSelector } from 'react-redux';
import image from "../../image/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"



const Update = () => {
  const [error, setError] = useState({});
  const {redirectUpdate } = useSelector((s) => s?.Crud); 

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { id } = useParams();

  const { det} = useSelector((state) =>{ 
    console.log("DET", state.crud)
    return state.Crud});


  useEffect(() => {
    dispatch(productDetails(id));
  }, [id]);

 
  console.log(id, "params")
  const [img, setimg] = useState("");
  console.log(img, "photo")
  const [user, setUser] = useState({
    title:"",
    description:""
  });



  const validation = () => {
    let error = {};

    if (!user.title) {

      error.title = "Title is Required";
    }

    if (!user.description) {
      error.description = "Description is Required";
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

  // const c

  // console.log(error);

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    // if (click != "") {
    //   dispatch(update(click))
    // }

    // let data={
    //   "title":user.title,
    //   "description":user.description,
    //   "image":img,
    //   "id":id
    //  }
    let formData=new FormData()
    formData.append("title",user.title)
    formData.append("description",user.description)
    formData.append("image",img)
    formData.append("id",id)
    dispatch(productUpdate(formData))
  };

  // useEffect(() => {
  //   if (click) {
  //     SubmitInfo()
  //   }
  // }, [click])

  useEffect(() => {
    if (det !== null) {
      setUser({
        title: det?.title,
        description: det?.description,
        
      });    
    }
  }, [det])




  const RedirectUser = () => {
    let title = localStorage.getItem("title");
    let isInLoginPage = window.location.pathname.toLowerCase() === `/update/${id}`;

    if (title !== null && title !== undefined && title !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/productlist");
    }
};


useEffect(() => {
  RedirectUser();
}, [redirectUpdate])
  return (
    <>
        <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Update Product</h2>
              <ol>
                <li><a href="index.html">Home</a></li>
                <li>Update Product</li>
              </ol>
            </div>

          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{width:"900px"}}>
            <div class="card-header">
              Update Product
            </div>
            <div class="card-body">
              <form>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Title</label>
                  <input type="text" value={user.title} onChange={postUserData} class="form-control" name='title'/>
                </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Description</label>
                  <input type="text" value={user.description} onChange={postUserData} class="form-control" name='description'/>
                </div>
                
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Image</label>
                  <input type="file"
                    onChange={(e) => setimg(e.target.files[0])}
                    name="img"
                    accept="image/*"
                    class="form-control"/>
                  {img !== "" &&
                                  img !== undefined &&
                                  img !== null ? (
                                    <img
                                      height="40px"
                                      src={URL.createObjectURL(img)}
                                      alt=""
                                      className="upload-img"
                                    />
                                  ) : (
                                    <>
                                      {det?.image=== "" ? (
                                        <img
                                        height="70px"
                                          src={image}
                                          alt=""
                                          className="upload-img"
                                        />
                                      ) : (
                                        <img
                                          height="60px"
                                          src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${det?.image}`}
                                          alt=""
                                          className="upload-img"
                                        />
                                      )}
                                    </>
                                  )}
                                  {img === "" && (
                                    <p>Drag or drop content here</p>
                                  )}


                                  
                </div>

                <button type="submit"  onClick={SubmitInfo}class="btn btn-success">Update</button>
              </form>
            </div>
           
          </div>
        </div>

      </main>
    </>
  )
}

export default Update
