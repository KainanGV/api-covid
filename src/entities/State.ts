class State {
  constructor(
    private nome: string,
    private confirmados: number,
    private obitos: number,
    private ultima_atualizacao: string
  ) {}

  get getNome(): string {
    return this.nome;
  }

  get getConfirmados() {
    return this.confirmados;
  }

  get getObitos() {
    return this.obitos;
  }

  get getUltimaAtualizacao() {
    return this.ultima_atualizacao;
  }
}

export default State;
