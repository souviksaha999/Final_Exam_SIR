import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLoggedout } from "../../ReduxToolkit/AuthSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const tokenId = localStorage.getItem("token");
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(tokenId);
  }, []);

  const logout = () => {
    dispatch(handleLoggedout());
    navigate("/login");
  };

  return (
    <>
      <section id="hero">
        <div
          id="heroCarousel"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner" role="listbox">
            <div
              class="carousel-item active"
              style={{ backgroundImage: "url(./assets/img/slide/slide-1.jpg)" }}
            >
              <div class="carousel-container">
                <div class="carousel-content animate__animated animate__fadeInUp">
                  <h2>
                    Welcome to <span>Company</span>
                  </h2>
                  <p>
                    Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea
                    ut et est quaerat sequi nihil ut aliquam. Occaecati alias
                    dolorem mollitia ut. Similique ea voluptatem. Esse
                    doloremque accusamus repellendus deleniti vel. Minus et
                    tempore modi architecto.
                  </p>
                  {token ? (
                    <>
                     <div class="text-center">
                      <Link to="/login" onClick={logout} class="btn-get-started">
                        Logout
                      </Link>
                    </div>
                    </>
                  ) : (
                    <div class="text-center">
                      <Link to="/login" class="btn-get-started">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about-us" class="about-us">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>About Us</h2>
            </div>

            <div class="row content">
              <div class="col-lg-6" data-aos="fade-right">
                <h2>Eum ipsam laborum deleniti velitena</h2>
                <h3>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assum perenda sruen jonee trave
                </h3>
              </div>
              <div class="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left">
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
                <ul>
                  <li>
                    <i class="ri-check-double-line"></i> Ullamco laboris nisi ut
                    aliquip ex ea commodo consequa
                  </li>
                  <li>
                    <i class="ri-check-double-line"></i> Duis aute irure dolor
                    in reprehenderit in voluptate velit
                  </li>
                  <li>
                    <i class="ri-check-double-line"></i> Ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in
                  </li>
                </ul>
                <p class="font-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
