import axios from 'axios';
import { Link, useLoaderData, Navigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import { useQuery } from '@tanstack/react-query';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const response = await axios.get(`${singleCocktailUrl}${id}`);
      // console.log(response);
      const { data } = response;
      return data;
    },
  };
};

// function that takes a parameter - queryClient and returns a function
// cannot use react hooks in loader
export const loader = (queryClient) => async (obj) => {
  // console.log(obj);
  const { params } = obj;
  const { id } = params;
  await queryClient.ensureQueryData(singleCocktailQuery(id));
  return { id };
};

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));

  if (!data || !data.drinks) {
    // return <h2>Something went wrong...</h2>;
    return <Navigate to='/' />;
  }

  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strGlass: glass,
    strCategory: category,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>Category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>Info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>Glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>Ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>Instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
