import React, { useContext } from 'react'
import { AppContext } from '../context/App_Context'
import FetchRecipeById from './FetchRecipeById';



const Saved = () => {
  const { savedRecipe} = useContext(AppContext);
  return (
    <>
    <div>{
      savedRecipe?.map((data)=><FetchRecipeById key={data._id} id={data.recipe} />)
      }</div>
    </>
  )
}

export default Saved