import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";

const App_State = (props) => {
  // const url = "http://localhost:5000/backend";
  //Vercel code start 
// const url = "https://recipe-app-backend-mern-vercel.vercel.app/backend";
const url = import.meta.env.VITE_BACKEND_URL;
  // const url =
    // import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/backend";

  //end
  // ✅ Axios global config
  axios.defaults.withCredentials = true;

  //Functions of Recipe App

  const [token, setToken] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [user, setUser] = useState([])
  const [isAuthenticated,setIsAuthenticated] = useState(false)

//FetchRecipe
      const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.recipe)
      setRecipe(api.data.recipe);
    };

  useEffect(() => {

    fetchRecipe();
    getSavedRecipe();
    profile();
  }, []);

  //Token Storage
  //For token -> We storing token in browser local storage so we refresh the page we don't need to login again
  // useEffect(()=>{
  //   if(token){
  //     localStorage.setItem("token",token)
  //   }
  //   const tokenFromLocalStorage = localStorage.getItem("token",token)
  //   if(tokenFromLocalStorage){
  //     setToken(tokenFromLocalStorage);
  //   }
  // },[token])
    // ✅ Load token once on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // ✅ Whenever token changes, store it
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // ✅ Once token is ready, now fetch profile and saved data
      profile();
      getSavedRecipe();
      setIsAuthenticated(true)
    }
  }, [token]);

  //Register
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      {
        name,
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return api;
  };

  //Login Function
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    setToken(api.data.token);
    setIsAuthenticated(true)
    return api;
    // console.log("Login data", api);
  };

  //Add Recipe Function
  const addRecipe = async (
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
  ) => {
    const api = await axios.post(
      `${url}/recipe/add`,
      {
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
        if (api.data.recipe) {
      setRecipe((prev) => [...prev, api.data.recipe]);
    } else {
      // ✅ Option 2: Otherwise re-fetch recipe list
      await fetchRecipe();
    }
    return api;
  };

  //recipe by Id
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return api;
  };

  //Save recipe by Id
  const savedRecipeById = async (id) => {
    const api = await axios.post(`${url}/${id}`,{}, {
      headers: {
        "Content-Type": "application/json",
        Auth:token
      },
      withCredentials: true,
    });
    return api;
  };

  //Get saved recipe
  const getSavedRecipe = async () => {
    const api = await axios.get(`${url}/saved`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // return api;
    // console.log("Getting saved recipe ", api.data.savedRecipe)
    setSavedRecipe(api.data.savedRecipe);

  };

  //Profile
  const profile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth:token
      },
      withCredentials: true,
    });
    console.log("This is user Profile",api.data.user)
    setUser(api.data.user)
  }

  //Logout Function
  const logOut = () => {
    localStorage.removeItem("token",token);
    setToken("")
    setIsAuthenticated(false)
  }


  return (
    <AppContext.Provider
      value={{ login, register, addRecipe, recipe, getRecipeById, savedRecipeById, savedRecipe, user
        , isAuthenticated, setIsAuthenticated, logOut
       }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;
