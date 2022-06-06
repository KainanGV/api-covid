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

type responseData = {
  pais: object;
  estados: State[];
};

class CovidRepository {
  private URL_API_COVID = "https://covid-api.mmediagroup.fr/v1";

  async findByCovidCaseBrazil(): Promise<object> {
    const { data }: any = await axios.get(
      `${this.URL_API_COVID}/vaccines?country=Brazil`
    );

    const { All } = data;

    const responseDataVaccines: ResponseDataVaccines = All;

    const { data: dataStates }: any = await axios.get(
      `${this.URL_API_COVID}/case?country=Brazil`
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

    const objectFinal: responseData = {
      pais: {
        nome: country.getNome,
        expectativa_vida: country.getExpectativaVida,
        total_casos_confirmados: country.getTotalCasosConfirmados,
        numero_populacao: country.getNumeroPopulacao,
        total_obitos: country.getTotalObitos,
        total_doses_aplicadas: country.getDosesAplicadas,
        pessoas_vacinadas: country.getPessoasVacinadas,
        pessoas_parcialmente_vacinadas: country.getPessoasParcialmenteVacinadas,
      },
      estados: country.getEstados,
    };

    return objectFinal;
  }
}

export default CovidRepository;
