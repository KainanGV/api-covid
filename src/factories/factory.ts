import CovidRepository from "../repositories/CovidRepository";
import CovidService from "../services/CovidService";

const generateInstance = () => {
  const covidRepository = new CovidRepository();
  const covidService = new CovidService(covidRepository);

  return covidService;
};

export default generateInstance;
