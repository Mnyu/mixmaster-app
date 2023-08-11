import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const loader = async (obj) => {
  // console.log(obj);
  const { request } = obj;
  // console.log(request);
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || '';
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  // console.log(response);
  return { drinks: response.data.drinks, searchTerm };
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  // console.log(drinks);
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
