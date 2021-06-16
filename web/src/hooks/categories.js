import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_CATEGORIES } from '../queries';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const {data} = useQuery(GET_CATEGORIES);
  
  useEffect(() => {
    if(data){
      setCategories(data.getCategories);
    }
  });

  return categories;
}