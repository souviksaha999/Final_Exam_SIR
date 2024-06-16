import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleLoggedout } from '../ReduxToolkit/AuthSlice';
import { pro } from '../ReduxToolkit/AuthSlice';
import { profile_pic } from '../Helper/Helper';

export default function () {
  const Name = localStorage.getItem("Name")
  const proimg=localStorage.getItem("proimg")
  console.log(proimg,"proimg")
  const { profile } = useSelector((s) => s?.Crud);
  const { isloggedIn } = useSelector((s) => s?.Auth);
  const tokenId = localStorage.getItem("token");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(tokenId);
  }, []);
  useEffect(() => {
    dispatch(pro())
  }, [])

  const [name, setName] = useState("")
  useEffect(() => {
    setName(Name);
  }, [Name]);
  const logout = () => {
    dispatch(handleLoggedout());
    navigate("/login");
  };


  return (
    <>
      <header id="header" class="fixed-top">

        <div class="container d-flex align-items-center">

          <h1 class="logo mr-auto"><a href="index.html"><img class="hello" src="./assets/img/logo.png" /></a></h1>


          <nav class="nav-menu d-none d-lg-block">
            <ul>
              <li class="active"><Link to="/">Home</Link></li>
              <li class="active"><Link to="/productlist">Product List</Link></li>

            </ul>
          </nav>



          <div class="header-social-links">

            <a href="#" class="twitter"><i class="icofont-twitter"></i></a>
            <a href="#" class="facebook"><i class="icofont-facebook"></i></a>
            <a href="#" class="instagram"><i class="icofont-instagram"></i></a>
            <a href="#" class="linkedin"><i class="icofont-linkedin"></i></a>
          </div>
          {isloggedIn ? (
            <>

              <li
                style={{ cursor: "pointer" }}

              >
                {name}
              </li>

            </>
          ) : (
            ""
          )}


          {isloggedIn ? (
            <>
              <img
                height="30px"
                src={
                  proimg
                    ? profile_pic(proimg)
                    : "error"
                }
                alt="No Image"
              />


            </>
          ) : (
            <img
            height="30px"
            src=""
            alt=""
          />


          )}





          {isloggedIn ? (
            <>
               



              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>

            </>
          ) : (
            ""
          )}
        </div>
      </header>

    </>
  )
}
