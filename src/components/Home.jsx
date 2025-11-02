import React, { useContext } from 'react';
import { AppContext } from '../context/App_Context';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from "react-toastify";

const Home = () => {
  const { recipe, savedRecipeById } = useContext(AppContext);
  const navigate = useNavigate();

  const saved = async (id) => {
    const result = await savedRecipeById(id);

        // Toastify code
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        //Toastify code end
  }
  return (
    <>

          {/* Toastify */}
          <ToastContainer />
          {/* Toastify End */}
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">🍽️ Delicious Recipes</h2>

      <div className="row justify-content-center g-4">
        {recipe?.length > 0 ? (
          recipe.map((data) => (
            <div key={data._id} className="col-md-4 d-flex justify-content-center">
              <div className="recipe-card">
                {/* Image container with overlay */}
                <div className="card-img-container">
                  <img
                    src={data.imgUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={data.title || 'Recipe'}
                    className="recipe-img"
                  />
                  <div className="overlay">
                    <h4 className="overlay-title">{data.title || 'Untitled Recipe'}</h4>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body text-center">

                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <button className="btn btn-success btn-hover" onClick={()=>saved(data._id)}>Save</button>
                    <button className="btn btn-outline-primary btn-hover" 
                    onClick={()=>navigate(`/home/${data._id}`)}>View More</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-5">No recipes found.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
