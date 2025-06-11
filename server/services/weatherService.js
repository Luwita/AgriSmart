// This service would integrate with a real weather API in production
// For now, we'll use mock data

// Mock weather data for Zambian provinces
const zambianWeatherData = {
  'Lusaka Province': {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: 'Partly Cloudy',
    rainfall: 2.5
  },
  'Copperbelt Province': {
    temperature: 25,
    humidity: 75,
    windSpeed: 8,
    pressure: 1015,
    visibility: 8,
    uvIndex: 5,
    condition: 'Cloudy',
    rainfall: 8.1
  },
  'Central Province': {
    temperature: 29,
    humidity: 60,
    windSpeed: 15,
    pressure: 1011,
    visibility: 12,
    uvIndex: 7,
    condition: 'Sunny',
    rainfall: 1.2
  }
};

export const getWeatherForProvince = (province) => {
  return zambianWeatherData[province] || zambianWeatherData['Lusaka Province'];
};

export const getWeatherForecast = (province) => {
  const currentWeather = getWeatherForProvince(province);
  
  return [
    { day: 'Today', high: currentWeather.temperature + 2, low: currentWeather.temperature - 8, condition: currentWeather.condition, rain: 25 },
    { day: 'Tomorrow', high: currentWeather.temperature + 1, low: currentWeather.temperature - 7, condition: 'Partly Cloudy', rain: 40 },
    { day: 'Friday', high: currentWeather.temperature - 2, low: currentWeather.temperature - 10, condition: 'Rainy', rain: 80 },
    { day: 'Saturday', high: currentWeather.temperature, low: currentWeather.temperature - 8, condition: 'Cloudy', rain: 40 },
    { day: 'Sunday', high: currentWeather.temperature + 3, low: currentWeather.temperature - 6, condition: 'Sunny', rain: 5 },
    { day: 'Monday', high: currentWeather.temperature + 4, low: currentWeather.temperature - 5, condition: 'Hot', rain: 0 },
    { day: 'Tuesday', high: currentWeather.temperature - 1, low: currentWeather.temperature - 9, condition: 'Rainy', rain: 75 }
  ];
};

export const getWeatherAlerts = () => {
  return [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rains Expected - Northern Provinces',
      message: 'Expect 40-80mm of rainfall in Northern, Luapula, and Muchinga provinces.',
      severity: 'high',
      provinces: ['Northern Province', 'Luapula Province', 'Muchinga Province'],
      validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Spraying Conditions',
      message: 'Low wind conditions expected. Ideal for pesticide application.',
      severity: 'low',
      provinces: ['Central Province', 'Eastern Province'],
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];
};