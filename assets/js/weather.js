const key = "xKVJJ9tcAa85qmALGp6sLFyKtUb2GGfA";
let conditions = {};

const getCity = async city => {
  const base = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  const cityFetch = await fetch(base);
  const cityData = await cityFetch.json();
  const cityKey = cityData[0].Key;
  const cityName = cityData[0].EnglishName;
  const cityInfo = [cityKey, cityName];
  return cityInfo;
};

const getConditions = async (cityKey, cityName) => {
  const base = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=xKVJJ9tcAa85qmALGp6sLFyKtUb2GGfA`;
  const cityFetch = await fetch(base);
  const cityData = await cityFetch.json();
  const temp = cityData[0].Temperature.Metric.Value;
  const condition = cityData[0].WeatherText;
  const isDay = cityData[0].IsDayTime;
  const conditions = {
    temp: temp,
    condition: condition,
    isDay: isDay,
    name: cityName
  };
  return conditions;
};

const getInfo = cityName => {
  return getCity(cityName)
    .then(info => getConditions(info[0], info[1]))
    .then(conditions => conditions)
    .catch(err => {
      throw new Error("Cannot find location");
    });
};
