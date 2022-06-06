import Country from "../entities/Country";
import CovidRepository from "../repositories/CovidRepository";

class CovidService {
  constructor(private covidRepository: CovidRepository) {}

  async handle(): Promise<Country> {
    return this.covidRepository.findByCovidCaseBrazil();
  }
}

export default CovidService;
