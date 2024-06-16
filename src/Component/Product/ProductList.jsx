import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Link, useNavigate } from "react-router-dom";
import { createlog, productRemove, productlist, reset_redirectToUpdate, updatelog } from "../../ReduxToolkit/CrudSlice";
import { image } from "../../Helper/Helper";
import SweetAlertComponent from "../SweetAlert/SweetAlert";
import { Pagination } from "@mui/material";
import { reset_redirectTo } from "../../ReduxToolkit/AuthSlice";

const ProductList = () => {
  const { list, totalpage, redirect, redirectUpdate } = useSelector((state) => state?.Crud);
  
  const [totalRecords, setPage] = useState()

  const navigate = useNavigate()

  const handleChange = (e, pageno) => {
    setPage(pageno);

    dispatch(productlist(
      {
        page: pageno,
        perpage: 10

      }));
  };

  <Pagination count={totalpage} onChange={handleChange} totalRecords={totalRecords} />

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productlist());
  }, []);

  const [delete_id, setDelete_id] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  console.log(list, "list");


  const delete_funcc = (id) => {
    if (delete_id !== "") {
      dispatch(productRemove({ id: delete_id })).then(() => { dispatch(productlist()) })
    }
    setDelete_id("");
    setIsDelete(false);
  }


  useEffect(() => {
    dispatch(reset_redirectToUpdate(null))
  }, [redirect])

  useEffect(() => {
    dispatch(reset_redirectTo(null))
  }, [redirectUpdate])


  const crelog = () => {
    dispatch(createlog());

  };


  const uplog = () => {
    dispatch(updatelog());

  };


  return (
    <>
      <div>
        <main id="main">
          <section id="breadcrumbs" class="breadcrumbs">
            <div class="container mt-4">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Product List</h2>
                <ol>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Product List</li>
                </ol>
              </div>
            </div>
          </section>
          <div className="container mt-2">
            <div class="card">
              <div class="card-header">
                <Link onClick={crelog} to="/createe" className="btn btn-warning">
                  Create Product
                </Link>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">User NAme</th>
                      <th scope="col" colSpan={2}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length !== 0 ? (

                      list?.map((item) => {
                        return (
                          <>
                            <tr>
                              {/* <th scope="row">1</th> */}
                              <td>{item?.title}</td>
                              <td>
                                {" "}
                                <img height="30px" src={ item?.image  ? image(item?.image)  : "error" }  alt="No Image"  />
                              </td>
                              <td>{item?.description}</td>
                              <td>
                                <Link onClick={uplog} to={`/update/${item?._id}`} className="btn btn-primary">
                                  Update
                                </Link>
                              </td>
                              <td>
                                <Link to='' onClick={() => {   setDelete_id(item?._id);  setIsDelete(true);   }} class="btn btn-primary mr">Delete</Link>
                              </td>
                            </tr>
                          </>

                        )

                      })

                    ) : (

                      <>
                        <p >No Data Found</p>
                      </>
                    )}
                  </tbody>
                </table>
              </div>


              {list.length !== 0 ? (

                <Pagination count={totalpage} onChange={handleChange} totalRecords={totalRecords} />

              ) : (

                <>
                
                </>
              )}


            </div>
          </div>
        </main>
      </div>

      {isDelete && (
        <SweetAlertComponent
          confirm={delete_funcc}
          cancle={() => setIsDelete(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}




    </>
  );
};

export default ProductList;
