import State from "./State";

class Country {
  constructor(
    private nome: string,
    private expectativa_vida: number,
    private total_casos_confirmados: number,
    private numero_populacao: number,
    private total_obitos: number,
    private total_doses_aplicadas: number,
    private pessoas_vacinadas: number,
    private pessoas_parcialmente_vacinadas: number,
    private states?: State[]
  ) {}

  get getNome() {
    return this.nome;
  }

  get expectativaVida(): number {
    return this.expectativa_vida;
  }

  get getTotalCasosConfirmados(): number {
    return this.total_casos_confirmados;
  }

  get getNumeroPopulacao(): number {
    return this.numero_populacao;
  }

  get getTotalObitos(): number {
    return this.total_obitos;
  }

  get getDosesAplicadas(): number {
    return this.total_doses_aplicadas;
  }

  get getPessoasVacinadas(): number {
    return this.pessoas_vacinadas;
  }

  get getPessoasParcialmenteVacinadas(): number {
    return this.pessoas_parcialmente_vacinadas;
  }

  get getStates(): State[] {
    return this.states;
  }
}

export default Country;
