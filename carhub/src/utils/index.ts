import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  // Base rental price per day in dollars
  const basePricePerDay = 50;

  // Additional rate per mile driven
  const mileageFactor = 0.1;

  // Additional rate per year of vehicle age
  const ageFactor = 0.05;

  // calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // set the specified search parameter to the given value
  searchParams.set(type, value);

  // set the specified search param to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // set the specified search param to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );
  const result = await response.json();
  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`); // param must be string
  url.searchParams.append("angle", `${angle}`);
  // jehino1770@vip4e.com
  return `${url}`;
};
