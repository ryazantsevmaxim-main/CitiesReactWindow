export const fetchCities = () => fetch('/data/worldcities_clean.csv',{
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});