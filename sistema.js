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

    // Getters e Setters
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

    // Ponto Extra: método para fechar conta corrente
    fecharConta() {
        const index = ContaCorrente.contasCorrente.indexOf(this.numeroConta);
        if (index !== -1) {
            ContaCorrente.contasCorrente.splice(index, 1);
            console.log(`Conta corrente ${this.numeroConta} fechada com sucesso.`);
        } else {
            console.log("Conta corrente não encontrada.");
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

    // Método para transferir dinheiro para outra conta poupança
    transferir(valor, contaDestino) {
        if (valor <= this.saldo && contaDestino instanceof ContaPoupanca) {
            this.saldo -= valor;
            contaDestino.saldo += valor;
            console.log(`Transferência de ${valor} para a conta ${contaDestino.numeroConta} realizada com sucesso.`);
        } else {
            console.log("Transferência não autorizada.");
        }
    }
}

// Exemplo de uso
const contaCorrente = new ContaCorrente(12345, 1000, "Luís", "Full Stack Developer", 500, 10);
contaCorrente.criarConta();
contaCorrente.checarExtrato();
contaCorrente.gerenciarLimiteChequeEspecial(1000);
contaCorrente.calcularTaxaManutencao();
ContaCorrente.listarTodasContasCorrente();

const contaPoupanca1 = new ContaPoupanca(54321, 500, "Maria", "Médica", 0.05, 3);
contaPoupanca1.criarConta();
contaPoupanca1.checarExtrato();
contaPoupanca1.calcularJuros();
contaPoupanca1.gerenciarLimiteSaques(5);
ContaPoupanca.verificarMelhorInvestimento();

const contaPoupanca2 = new ContaPoupanca(98765, 200, "Ana", "Advogada", 0.04, 2);
contaPoupanca2.transferir(100, contaPoupanca1);
contaPoupanca1.checarExtrato();
contaPoupanca2.checarExtrato();

contaCorrente.fecharConta();
ContaCorrente.listarTodasContasCorrente();
