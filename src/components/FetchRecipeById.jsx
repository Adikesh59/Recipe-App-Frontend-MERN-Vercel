import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App_Context";
import "./RecipeDetail.css"; // 👈 include animations and styling
import { Link } from "react-router-dom";

const FetchRecipeById = ({ id }) => {
  const { getRecipeById } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await getRecipeById(id);
      setRecipe(result.data.recipe);
    };
    fetchRecipe();
  }, [id, getRecipeById]);

  if (!recipe) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light py-5 fade-in-up">
      <div className="recipe-detail w-75 bg-white text-dark rounded-5 shadow-lg overflow-hidden animate-pop">
        {/* Image Section */}
        <div className="position-relative recipe-image">
          <img
            src={recipe.imgUrl}
            className="img-fluid w-100"
            alt={recipe.title}
            style={{ height: "450px", objectFit: "cover" }}
          />
          <div className="gradient-overlay"></div>
          <h1 className="position-absolute bottom-0 start-0 text-white fw-bold display-5 ps-4 pb-3 animate-title">
            {recipe.title}
          </h1>
        </div>

        {/* Details */}
        <div className="p-5">
          {/* Instructions */}
          <div className="mb-5 slide-in">
            <h3 className="fw-bold text-success mb-3">🍳 Instructions</h3>
            <p className="bg-light p-4 rounded-4 border-start border-5 border-success text-secondary lh-lg shadow-sm">
              {recipe.inst}
            </p>
          </div>

          {/* Ingredients Section */}
          <div className="slide-in-delay">
            <h3 className="fw-bold text-success mb-3">🧂 Ingredients & Quantity</h3>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {[
                { name: recipe.ing1, qty: recipe.qty1 },
                { name: recipe.ing2, qty: recipe.qty2 },
                { name: recipe.ing3, qty: recipe.qty3 },
                { name: recipe.ing4, qty: recipe.qty4 },
              ]
                .filter((item) => item.name)
                .map((item, index) => (
                  <div className="col" key={index}>
                    <div className="ingredient-card bg-success bg-opacity-10 rounded-4 p-3 shadow-sm d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">{item.name}</span>
                      <span className="badge bg-success fs-6 px-3 py-2">{item.qty || "-"}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-5 fade-in">
            <Link
              to={"/home"}
              className="btn btn-success px-5 py-2 rounded-pill shadow-lg hover-glow"
            >
              ⬅ Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchRecipeById;
