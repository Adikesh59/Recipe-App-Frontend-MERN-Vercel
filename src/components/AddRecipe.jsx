import React, { useContext, useState } from "react";
import "./waveStyle.css";
import { AppContext } from "../context/App_Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    inst: "",
    ing1: "",
    ing2: "",
    ing3: "",
    ing4: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    imgUrl: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      title,
      inst,
      ing1,
      ing2,
      ing3,
      ing4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgUrl,
    } = formData;
    const result = await addRecipe(
      title,
      inst,
      ing1,
      ing2,
      ing3,
      ing4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgUrl
    );
    console.log(result);
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

    if (result.data.message !== "Login First !") {
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  const heading = "Recipe";
  return (
    <>
      {/* Toastify */}
      <ToastContainer />
      {/* Toastify End */}

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow p-4">
              {/* Applying Wave style animation in Login Heading */}
              {/* Code start */}
              {/* <h2 className="text-center mb-4 waveStyle">Login</h2> */}
              {/* Letter-by-letter wave heading */}
              <h2 className="mb-4 text-center">
                {heading.split("").map((char, index) => (
                  <span
                    key={index}
                    className="waveLetter"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              {/* Code end */}
              <form onSubmit={submitHandler}>
                {/* Name field */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                {/* Instruction Field */}
                <div className="mb-3">
                  <label className="form-label">Instruction</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inst"
                    value={formData.inst}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Ingredient-1 */}
                <div className="mb-3">
                  <label className="form-label">ing-1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ing1"
                    value={formData.ing1}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Ingredient-2 */}
                <div className="mb-3">
                  <label className="form-label">ing-2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ing2"
                    value={formData.ing2}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Ingredient-3 */}
                <div className="mb-3">
                  <label className="form-label">ing-3</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ing3"
                    value={formData.ing3}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Ingredient-4 */}
                <div className="mb-3">
                  <label className="form-label">ing-4</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ing4"
                    value={formData.ing4}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Quantity-1 */}
                <div className="mb-3">
                  <label className="form-label">qty-1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qty1"
                    value={formData.qty1}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Quantity-2 */}
                <div className="mb-3">
                  <label className="form-label">qty-2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qty2"
                    value={formData.qty2}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Quantity-3 */}
                <div className="mb-3">
                  <label className="form-label">qty-3</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qty3"
                    value={formData.qty3}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Quantity-4 */}
                <div className="mb-3">
                  <label className="form-label">qty-4</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qty4"
                    value={formData.qty4}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Image Url */}
                <div className="mb-3">
                  <label className="form-label">Image Url</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Paste Image Link"
                    name="imgUrl"
                    value={formData.imgUrl}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                {/* Add button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
