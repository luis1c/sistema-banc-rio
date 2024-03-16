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

    // Método para tranferir dinheiro entre contas
    transferir(valor, contaDestino) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            contaDestino.saldo += valor;
            console.log(`Transferência de ${valor} da conta de ${this.nomeUsuario} - ${this.numeroConta} para a conta de ${contaDestino.nomeUsuario} - ${contaDestino.numeroConta} realizada com sucesso.`);
        } else {
            console.log(`Transferência da conta de ${this.nomeUsuario} - ${this.numeroConta} não autorizada. Saldo insuficiente.`);
        }
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

    criarConta() {
        console.log("Conta Corrente criada com sucesso.");
    }

    verificarLimiteChequeEspecial() {
        console.log(`Limite de Cheque Especial: ${this.#limiteChequeEspecial}`);
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

    // Método para fechar conta corrente
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

    criarConta() {
        console.log("Conta Poupança criada com sucesso.");
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

    // Método para transferir dinheiro entre contas
    transferir(valor, contaDestino) {
        if (valor <= this.saldo) {
            if (contaDestino instanceof Conta) {
                this.saldo -= valor;
                contaDestino.saldo += valor;
                console.log(`Transferência de ${valor} da conta de ${this.nomeUsuario} - ${this.numeroConta} para a conta de ${contaDestino.nomeUsuario} - ${contaDestino.numeroConta} realizada com sucesso.`);
            } else {
                console.log("Conta de destino inválida.");
            }
        } else {
            console.log(`Transferência da conta de ${this.nomeUsuario} - ${this.numeroConta} não autorizada. Saldo insuficiente.`);
        }
    }
}

// Exemplo de uso
const LuisCorrente = new ContaCorrente(12345, 1000, "Luís", "Full Stack Developer", 500, 10);
LuisCorrente.criarConta();
LuisCorrente.checarExtrato();
LuisCorrente.verificarLimiteChequeEspecial();
LuisCorrente.gerenciarLimiteChequeEspecial(1000);
LuisCorrente.calcularTaxaManutencao();
ContaCorrente.listarTodasContasCorrente();
LuisCorrente.fecharConta();

const EduardaCorrente = new ContaCorrente(99887, 3000, "Eduarda", "Professora", 1500, 10);
EduardaCorrente.criarConta();
EduardaCorrente.checarExtrato();
EduardaCorrente.verificarLimiteChequeEspecial();
EduardaCorrente.calcularTaxaManutencao();
ContaCorrente.listarTodasContasCorrente();

const BrunaCorrente = new ContaCorrente(55667, 7000, "Bruna", "DevOps", 3500, 10);
BrunaCorrente.criarConta();
BrunaCorrente.checarExtrato();
BrunaCorrente.verificarLimiteChequeEspecial();
BrunaCorrente.calcularTaxaManutencao();
BrunaCorrente.transferir(100, LuisCorrente);
LuisCorrente.checarExtrato();
BrunaCorrente.checarExtrato();
ContaCorrente.listarTodasContasCorrente();

const MariaPoupanca = new ContaPoupanca(54321, 500, "Maria", "Médica", 0.05, 3);
MariaPoupanca.criarConta();
MariaPoupanca.checarExtrato();
MariaPoupanca.calcularJuros();
MariaPoupanca.gerenciarLimiteSaques(5);
ContaPoupanca.verificarMelhorInvestimento();

const AnaPoupanca = new ContaPoupanca(98765, 200, "Ana", "Advogada", 0.04, 2);
AnaPoupanca.criarConta();
AnaPoupanca.checarExtrato();
AnaPoupanca.calcularJuros();
AnaPoupanca.transferir(10000000, EduardaCorrente);
EduardaCorrente.checarExtrato();
AnaPoupanca.checarExtrato();

ContaCorrente.listarTodasContasCorrente();
