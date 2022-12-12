import axios from "axios";

// ----------------------------------------------------------------------

export const fetchCities = () => axios.get('/worldcities_clean.csv');

