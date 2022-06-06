class State {
  constructor(
    private nome: string,
    private confirmados: number,
    private obitos: number,
    private ultima_atualizacao: string
  ) {
    this.ultima_atualizacao = State.formatDate(this.ultima_atualizacao);
  }

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

  private static formatDate(unformatted: string): string {
    const [date, time] = unformatted.split(" ");
    const [year, month, day] = date.split("-");
    const dateFormat = `${day}/${month}/${year} ${time}`;

    return dateFormat;
  }
}

export default State;
