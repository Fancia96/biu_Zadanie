import './App.css';

import React, {useState, useEffect} from "react";

function GitHubUser() {
    const [data, setData] = useState();
    const [recipe, setRecipe] = useState();

    const fetchData = async () => {

        var characters = 'abcdefghijklmnoprstuwyz';
        var charactersLength = characters.length;
        var result = characters.charAt(Math.floor(Math.random() *
            charactersLength));




        const response = await fetch("https://themealdb.com/api/json/v1/1/search.php?f="+result);
        const data = await response.json();

        data.meals = data.meals.slice(0, 8);
        setData(data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onRecipeClick = async (e) => {

        const response = await fetch("https://themealdb.com/api/json/v1/1/lookup.php?i="+e);
        const recipe = await response.json();

        recipe.meals = recipe.meals.slice(0, 8);

        setRecipe(recipe);
    }

    if(recipe){
        return <div>hello mfckers
            <div>
                {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

                <div id={"details"}>
                    {
                        recipe.meals.map((recipe) =>
                            <div>
                                <h2>{recipe.strMeal}</h2>
                                <h2>{recipe.strCategory}</h2>
                                <h2>{recipe.strTags}</h2>
                                <img src={recipe.strMealThumb} alt="" />
                                <h3>{recipe.strInstructions}</h3>

                            </div>

                        )}
                </div>

                <button onClick={() => {setRecipe(null)}}> Go back </button>
            </div>
        </div>
    }
    if (data)
        return <div>
            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

            <h2>MENU</h2>
            <div id={"dishes"}>
            {
                data.meals.map((user) =>
                    <a key={user.idMeal} onClick={(e) => {onRecipeClick(user.idMeal); e.preventDefault()}} href={"#"}>
                        <img src={user.strMealThumb} alt="" />
                        <h2>{user.strMeal}</h2>
                    </a>

                )}
            </div>

            <button onClick={fetchData}> Get New Data </button>
        </div>
    return null;
}



export default function App() {
    return <GitHubUser />;
}