import fetch from "node-fetch";

import Country from "../entities/Country";
import State from "../entities/State";

class CovidRepository {
  private URL_API_COVID = "https://covid-api.mmediagroup.fr/v1";

  async findByCovidCaseBrazil(): Promise<Country> {
    const response = await fetch(
      `${this.URL_API_COVID}/vaccines?country=Brazil`
    );

    const data: any = await response.json();

    const responseState = await fetch(
      `${this.URL_API_COVID}/cases?country=Brazil`
    );

    const dataStates: any = await responseState.json();

    const country = new Country(
      data.all.country,
      data.all.life_expectancy,
      0,
      data.all.population,
      data.all.administered,
      data.all.elevation_in_meters,
      data.all.people_vaccinated,
      data.all.people_partially_vaccinated
    );

    const state = new State(
      "Test",
      dataStates.Global.all.confirmed,
      dataStates.Global.all.deaths,
      dataStates.Global.all.recovered
    );

    const listStates: State[] = country.getStates;

    listStates.push(state);

    return country;
  }
}

export default CovidRepository;
