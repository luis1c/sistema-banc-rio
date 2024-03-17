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

    // Método para checar o extrato da conta, retornando o nome do usuário, número da conta, salto atual e profissão do usuário
    checarExtrato() {
        console.log(`Nome do Usuário: ${this.nomeUsuario}`);
        console.log(`Número da Conta: ${this.#numeroConta}`);
        console.log(`Saldo Atual: ${this.#saldo}`);
        console.log(`Profissão do Usuário: ${this.profissaoUsuario}`);
        console.log("*******************************************************");
    }

    // Método para solicitar um empréstimo, retornando uma mensagem da solicitação e o valor solicitado
    solicitarEmprestimo(valor) {
        console.log(`Empréstimo de ${valor} solicitado.`);
        console.log("*******************************************************");
    }

    // Método para imprimir as instruções gerais para o uso das contas
    static imprimirInstrucoes() {
        console.log("Instruções gerais para o uso das contas.");
        console.log("*******************************************************");
    }

    // get e set para obter e definir algumas informações nas contas
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
            if (contaDestino instanceof Conta) {
                this.saldo -= valor;
                contaDestino.saldo += valor;
                console.log(`Transferência de ${valor} da conta de ${this.nomeUsuario} (nº: ${this.numeroConta}) para a conta de ${contaDestino.nomeUsuario} (nº: ${contaDestino.numeroConta}) realizada com sucesso.`);
                console.log("*******************************************************");
            } else {
                console.log("Conta de destino inválida.");
                console.log("*******************************************************");
            }
        } else {
            console.log(`Transferência da conta de ${this.nomeUsuario} (nº: ${this.numeroConta}) não autorizada. Saldo insuficiente.`);
            console.log("*******************************************************");
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
        ContaCorrente.contasCorrente.push(this); //Atualiza o array adicionando a instância atual, atualizando quando contas são criadas e/ou fechadas
    }

    // Método para criar uma conta corrente, retornando um texto contendo o nome do usuário e o número da conta
    criarConta() {
        console.log(`Conta Corrente de ${this.nomeUsuario} (nº: ${this.numeroConta}) criada com sucesso.`);
        console.log("*******************************************************");
    }

    // Método que verifica o limite do cheque especial permitido para uma conta específica
    verificarLimiteChequeEspecial() {
        console.log(`Limite de Cheque Especial: ${this.#limiteChequeEspecial}`);
        console.log("*******************************************************");
    }

    // Método para alterar o limite do cheque especial de uma conta específica, podendo aumentar ou diminuir o limite anterior
    gerenciarLimiteChequeEspecial(novoLimite) {
        this.#limiteChequeEspecial = novoLimite;
        console.log(`Limite do Cheque Especial alterado para ${novoLimite}.`);
        console.log("*******************************************************");
    }

    //Método para exibir a taxa de manutenção definida para determinada conta
    calcularTaxaManutencao() {
        console.log(`Taxa de manutenção: ${this.#taxaManutencao}`);
        console.log("*******************************************************");
    }

    // Método para listar todas as contas corrente ativas, não exibindo as contas fechadas
    static listarTodasContasCorrente() {
        console.log("Todas as Contas Corrente Ativas:");
        for (const conta of ContaCorrente.contasCorrente) {
            console.log(`Nome do Usuário: ${conta.nomeUsuario}; Número da Conta: ${conta.numeroConta}`);
            console.log("*******************************************************");
        }
    }

    // Método para fechar uma conta corrente
    fecharConta() {
        const index = ContaCorrente.contasCorrente.indexOf(this);
        if (index !== -1) {
            ContaCorrente.contasCorrente.splice(index, 1);
            console.log(`Conta corrente de ${this.nomeUsuario} (nº: ${this.numeroConta}) fechada com sucesso.`);
            console.log("*******************************************************");
        } else {
            console.log("Conta corrente não encontrada.");
            console.log("*******************************************************");
        }
    }
}

// Classe ContaPoupanca
class ContaPoupanca extends Conta {
    #taxaJuros;
    #limiteSaques;
    static contasPoupanca = [];
    static melhoresInvestimentos = ["Tesouro Direto", " Fundos Imobiliários", " Ações"];

    constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario, taxaJuros, limiteSaques) {
        super(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario);
        this.#taxaJuros = taxaJuros;
        this.#limiteSaques = limiteSaques;
        ContaPoupanca.contasPoupanca.push(this); //Atualiza o array adicionando a instância atual, atualizando quando contas são criadas e/ou fechadas
    }

    // Método para criar uma conta poupança, retornando um texto contendo o nome do usuário e o número da conta
    criarConta() {
        console.log(`Conta Poupança de ${this.nomeUsuario} (nº: ${this.numeroConta}) criada com sucesso.`);
        console.log("*******************************************************");
    }

    // Método que calcula o juros de uma conta específica multiplicando o saldo da conta pela taxa de juros passada
    calcularJuros() {
        const juros = this.saldo * this.#taxaJuros;
        console.log(`Juros calculados: ${juros}`);
        console.log("*******************************************************");
    }

    // Método para alterar o limite de saque da conta, podendo aumentar ou diminuir
    gerenciarLimiteSaques(novoLimite) {
        this.#limiteSaques = novoLimite;
        console.log(`Limite de saques alterado para ${novoLimite}.`);
        console.log("*******************************************************");
    }

    // Método que virifica melhores investimentos para a conta e retorna um texto contendo esses investimentos
    static verificarMelhorInvestimento() {
        console.log(`Melhores Investimentos: ${ContaPoupanca.melhoresInvestimentos}`);
        console.log("*******************************************************");
    }

    // Método para listar todas as contas poupança ativas, não exibindo as contas fechadas
    static listarTodasContasPoupancas() {
        console.log("Todas as Contas Poupança Ativas:");
        for (const conta of ContaPoupanca.contasPoupanca) {
            console.log(`Nome do Usuário: ${conta.nomeUsuario}; Número da Conta: ${conta.numeroConta}`);
            console.log("*******************************************************");
        }
    }
    
    // Método para fechar uma conta poupança
    fecharConta() {
        const index = ContaPoupanca.contasPoupanca.indexOf(this);
        if (index !== -1) {
            ContaPoupanca.contasPoupanca.splice(index, 1);
            console.log(`Conta poupança de ${this.nomeUsuario} (nº: ${this.numeroConta}) fechada com sucesso.`);
            console.log("*******************************************************");
        } else {
            console.log("Conta poupança não encontrada.");
            console.log("*******************************************************");
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

const AndrePoupanca = new ContaPoupanca(16843, 900, "André", "Professor", 0.08, 4);
AndrePoupanca.criarConta();
AndrePoupanca.checarExtrato();
AndrePoupanca.calcularJuros();
AndrePoupanca.gerenciarLimiteSaques(7);

EduardaCorrente.fecharConta()
MariaPoupanca.fecharConta()
ContaPoupanca.listarTodasContasPoupancas();

ContaCorrente.listarTodasContasCorrente();
