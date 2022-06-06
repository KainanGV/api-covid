import axios from "axios";

import Country from "../entities/Country";
import State from "../entities/State";

type ResponseDataVaccines = {
  administered: number;
  people_vaccinated: number;
  people_partially_vaccinated: number;
  country: string;
  population: number;
  sq_km_area: number;
  life_expectancy: string;
  elevation_in_meters: number;
  continent: string;
  abbreviation: string;
  location: string;
  iso: number;
  capital_city: string;
  updated: string;
};

type ResponseDataState = {
  lat: string;
  long: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  updated: string;
};

class CovidRepository {
  private URL_API_COVID = "https://covid-api.mmediagroup.fr/v1";

  async findByCovidCaseBrazil(): Promise<Country> {
    const { data }: any = await axios.get(
      `${this.URL_API_COVID}/vaccines?country=Brazil`
    );

    const { All } = data;

    const responseDataVaccines: ResponseDataVaccines = All;

    const { data: dataStates }: any = await axios.get(
      `${this.URL_API_COVID}/cases?country=Brazil`
    );

    const listAllStates: Array<State> = [];

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const prop in dataStates) {
      if (prop !== "All") {
        const state: ResponseDataState = dataStates[prop];
        const stateInstance = new State(
          prop,
          state.confirmed,
          state.deaths,
          state.updated
        );

        listAllStates.push(stateInstance);
      }
    }

    const country = new Country(
      responseDataVaccines.country,
      responseDataVaccines.life_expectancy,
      dataStates.All.confirmed,
      responseDataVaccines.population,
      dataStates.All.deaths,
      responseDataVaccines.administered,
      responseDataVaccines.people_vaccinated,
      responseDataVaccines.people_partially_vaccinated,
      listAllStates
    );

    return country;
  }
}

export default CovidRepository;
