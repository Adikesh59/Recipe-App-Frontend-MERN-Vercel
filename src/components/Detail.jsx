import React from "react";
import { useParams } from "react-router-dom";
import FetchRecipeById from "./FetchRecipeById";

const Detail = () => {
  const { id } = useParams();


  return (
    <>
    <FetchRecipeById id={id}/>
    </>
  );
};

export default Detail;
