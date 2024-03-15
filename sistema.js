// Classe Conta
class Conta {
    #numeroConta;
    #saldo;
    nomeUsuario;
    profissaoUsuario;

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario) {
        this.#numeroConta = numeroConta;
        this.#saldo = saldoInicial;
        this.nomeUsuario = nomeUsuario;
        this.profissaoUsuario = profissaoUsuario;
    }

    criarConta() {
        console.log("Conta criada com sucesso.");
    }

    checarExtrato() {
        console.log(`Número da Conta: ${this.#numeroConta}`);
        console.log(`Saldo Atual: ${this.#saldo}`);
        console.log(`Nome do Usuário: ${this.nomeUsuario}`);
        console.log(`Profissão do Usuário: ${this.profissaoUsuario}`);
    }

    solicitarEmprestimo(valor) {
        console.log(`Empréstimo de ${valor} solicitado.`);
    }

    static imprimirInstrucoes() {
        console.log("Instruções gerais para o uso das contas.");
    }

    get numeroConta() {
        return this.#numeroConta;
    }

    get saldo() {
        return this.#saldo;
    }

    set saldo(novoSaldo) {
        this.#saldo = novoSaldo;
    }
}

// Classe ContaCorrente
class ContaCorrente extends Conta {
    #limiteChequeEspecial;
    #taxaManutencao;
    static contasCorrente = [];

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, limiteChequeEspecial, taxaManutencao) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#limiteChequeEspecial = limiteChequeEspecial;
        this.#taxaManutencao = taxaManutencao;
        ContaCorrente.contasCorrente.push(numeroConta);
    }

    gerenciarLimiteChequeEspecial(novoLimite) {
        this.#limiteChequeEspecial = novoLimite;
        console.log(`Limite do Cheque Especial alterado para ${novoLimite}.`);
    }

    calcularTaxaManutencao() {
        console.log(`Taxa de manutenção: ${this.#taxaManutencao}`);
    }

    static listarTodasContasCorrente() {
        console.log("Contas Corrente:");
        for (const conta of ContaCorrente.contasCorrente) {
            console.log(conta);
        }
    }
}

// Classe ContaPoupanca
class ContaPoupanca extends Conta {
    #taxaJuros;
    #limiteSaques;
    static melhoresInvestimentos = ["Tesouro Direto", "Ações"];

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, taxaJuros, limiteSaques) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#taxaJuros = taxaJuros;
        this.#limiteSaques = limiteSaques;
    }

    calcularJuros() {
        const juros = this.saldo * this.#taxaJuros;
        console.log(`Juros calculados: ${juros}`);
    }

    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaques = novoLimite;
        console.log(`Limite de saques alterado para ${novoLimite}.`);
    }

    static verificarMelhorInvestimento() {
        console.log(`Melhores Investimentos: ${ContaPoupanca.melhoresInvestimentos}`);
    }
}

// Exemplo de uso
const contaCorrente = new ContaCorrente(12345, 1000, "Luís", "Full Stack Developer", 500, 10);
contaCorrente.criarConta();
contaCorrente.checarExtrato();
contaCorrente.gerenciarLimiteChequeEspecial(1000);
contaCorrente.calcularTaxaManutencao();
ContaCorrente.listarTodasContasCorrente();

const contaPoupanca = new ContaPoupanca(54321, 500, "Maria", "Médica", 0.05, 3);
contaPoupanca.criarConta();
contaPoupanca.checarExtrato();
contaPoupanca.calcularJuros();
contaPoupanca.gerenciarLimiteSaques(5);
ContaPoupanca.verificarMelhorInvestimento();
