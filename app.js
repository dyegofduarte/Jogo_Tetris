/* IMPLEMENTAÇÕES EXTRA */

// VARIAVEIS USADAS
let Gamer = mostra_nome();
let Placar = {Primeiro: {nome : "", pontos : ""}, Segundo: {nome : "", pontos : ""}, Terceiro: {nome : "", pontos : ""} };


// FUNÇÃO PARA SETAR O NOME
function mostra_nome()
    {
        let nome_jogador = prompt("Digite um nome para o jogador");
        alert("Olá Jogador " + nome_jogador);
        return nome_jogador;
            }

  
// FUNÇÃO DE SALVAR A PONTUAÇÃO NO localStorage
function salva_placar()
    {
        let pontosAtuais = Number.parseInt(document.getElementById('pontos').innerHTML);  // RESGATA O VALOR DOS PONTOS ANTES DE SETAR A PALAVRA "FIM" NA FUNÇÃO gameOver()
        let string_JSON = localStorage.getItem("Placar");                                 // CARREGA DO localStorage O JSON
        let obj_JSON = JSON.parse(string_JSON);                                           // CARREGA DO localStorage O JSON
        
        if(pontosAtuais >= obj_JSON.Primeiro.pontos)
            {
                Placar.Primeiro.nome = Gamer;
                Placar.Primeiro.pontos = pontosAtuais;

                Placar.Segundo.nome = obj_JSON.Primeiro.nome;
                Placar.Segundo.pontos = obj_JSON.Primeiro.pontos;

                Placar.Terceiro.nome = obj_JSON.Segundo.nome;
                Placar.Terceiro.pontos = obj_JSON.Segundo.pontos;

                localStorage.setItem("Placar", JSON.stringify(Placar));                           // SALVA NO localStorage O JSON COM FORMATAÇÃO
                    }
        else if(pontosAtuais >= obj_JSON.Segundo.pontos)        /**CUIDAR QUANDO CAIR NESA SITUACAO POIS AO SALVAR NO LOCAL STORAGE PODE APAGAR OS VALORES NAO SETADOS */
            {
                Placar.Primeiro.nome = obj_JSON.Primeiro.nome;
                Placar.Primeiro.pontos = obj_JSON.Primeiro.pontos;

                Placar.Segundo.nome = Gamer;
                Placar.Segundo.pontos = pontosAtuais;

                Placar.Terceiro.nome = obj_JSON.Segundo.nome;
                Placar.Terceiro.pontos = obj_JSON.Segundo.pontos;

                localStorage.setItem("Placar", JSON.stringify(Placar));                           // SALVA NO localStorage O JSON COM FORMATAÇÃO
                    }
        else if(pontosAtuais >= obj_JSON.Terceiro.pontos)       /**CUIDAR QUANDO CAIR NESA SITUACAO POIS AO SALVAR NO LOCAL STORAGE PODE APAGAR OS VALORES NAO SETADOS */
            {
                Placar.Primeiro.nome = obj_JSON.Primeiro.nome;
                Placar.Primeiro.pontos = obj_JSON.Primeiro.pontos;

                Placar.Segundo.nome = obj_JSON.Segundo.nome;
                Placar.Segundo.pontos = obj_JSON.Segundo.pontos;

                Placar.Terceiro.nome = Gamer;
                Placar.Terceiro.pontos = pontosAtuais;
                localStorage.setItem("Placar", JSON.stringify(Placar));                           // SALVA NO localStorage O JSON COM FORMATAÇÃO
                    }
        else
            {
                console.log("SEM PONTUAÇÃO PARA ENTRAR NO PLACAR");
                    }
        // FUNÇÃO DE MUDANÇA DE VELOCIDADE (EXTRA)

        
            }

// CARREGA PLACAR DO localStorage
function carrega_placar()
    {
        const MostraJogador = document.querySelector('#jogador');
        let string_JSON = localStorage.getItem("Placar");                                 // RECEBE DO localStorage A STRING DO JSON        
        let obj_JSON = JSON.parse(string_JSON);
        
        if(obj_JSON === null)                                                             // SOLUÇÃO PARA INICIALIZAR OS DADOS DO localStorage CASO NÃO EXISTA
            {
                console.log("PRIMEIRO localStorage VAZIO");
                localStorage.setItem("Placar", JSON.stringify(Placar));
                console.log("localStorage: " + obj_JSON);

                string_JSON = localStorage.getItem("Placar");                             // RECEBE DO localStorage A STRING DO JSON        
                obj_JSON = JSON.parse(string_JSON);
                    }
                   
        console.log("NOME DO PRIMEIRO:", obj_JSON.Primeiro.nome);
        console.log("PONTOS DO PRIMEIRO:", obj_JSON.Primeiro.pontos);
        console.log("NOME DO SEGUNDO:", obj_JSON.Segundo.nome);
        console.log("PONTOS DO SEGUNDO:", obj_JSON.Segundo.pontos);
        console.log("NOME DO TERCEIRO:", obj_JSON.Terceiro.nome);
        console.log("PONTOS DO TERCEIRO:", obj_JSON.Terceiro.pontos);

        const primeiroLugar = document.querySelector('#primeiro_l');
        const primeiroLugarPontos = document.querySelector('#primeiro_p');
        
        const segundoLugar = document.querySelector('#segundo_l');
        const segundoLugarPontos = document.querySelector('#segundo_p');
        
        const terceiroLugar = document.querySelector('#terceiro_l');
        const terceiroLugarPontos = document.querySelector('#terceiro_p');

        primeiroLugar.innerHTML = obj_JSON.Primeiro.nome;
        primeiroLugarPontos.innerHTML = obj_JSON.Primeiro.pontos;       
        
        segundoLugar.innerHTML = obj_JSON.Segundo.nome;
        segundoLugarPontos.innerHTML = obj_JSON.Segundo.pontos;

        terceiroLugar.innerHTML = obj_JSON.Terceiro.nome;
        terceiroLugarPontos.innerHTML = obj_JSON.Terceiro.pontos;

        MostraJogador.innerHTML = Gamer;                                                    // CARREGA O NOME DO JOGADOR NA TELA
            }





/* JOGO BASE */
document.addEventListener('DOMContentLoaded', () => {
    const campo = document.querySelector('.Campo');
    let quadrados = Array.from(document.querySelectorAll('.Campo div'));
    const tamanho_campo = 10;
    const MostraPontos = document.querySelector('#pontos');
    const BtnInicioPausa = document.querySelector('#botao_inicio');
    let proxima_random = 0;
    let timerId;
    let score = 0;
    const cores = ['orange', 'red', 'green', 'blue', 'yellow'];
 
    const SelVelocidade = document.querySelector("#seletorVelocidade");
    const BtnZeraPlacar = document.querySelector('#zerarPlacar');
    const BtnAbreInstrucoes = document.querySelector('#abreInstrucoes');
    const BtnFechaInstrucoes = document.querySelector('#fechaInstrucoes');
    const modal = document.querySelector(".modal-container");
    const BtnReiniciar = document.querySelector('#reiniciar');
    const BtnFinalizar = document.querySelector('#finalizar');
    

    /* PEÇAS */
    // PEÇA L
    const peca_L = [    
        [1, tamanho_campo+1, tamanho_campo*2+1, 2],
        [tamanho_campo, tamanho_campo+1, tamanho_campo+2, tamanho_campo*2+2],
        [1, tamanho_campo+1, tamanho_campo*2+1, tamanho_campo*2],
        [tamanho_campo, tamanho_campo*2, tamanho_campo*2+1, tamanho_campo*2+2]
      ];
    // PEÇA Z
      const peca_Z = [
        [0,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1],
        [tamanho_campo+1, tamanho_campo+2,tamanho_campo*2,tamanho_campo*2+1],
        [0,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1],
        [tamanho_campo+1, tamanho_campo+2,tamanho_campo*2,tamanho_campo*2+1]
      ];
    // PEÇA T
      const peca_T = [
        [1,tamanho_campo,tamanho_campo+1,tamanho_campo+2],
        [1,tamanho_campo+1,tamanho_campo+2,tamanho_campo*2+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo*2+1],
        [1,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1]
      ];
    // PEÇA QUADRADO
      const peca_Q = [
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1]
      ];
    // PEÇA BARRA
      const peca_I = [
        [1,tamanho_campo+1,tamanho_campo*2+1,tamanho_campo*3+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo+3],
        [1,tamanho_campo+1,tamanho_campo*2+1,tamanho_campo*3+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo+3]
      ];

    
    const pecas = [peca_L, peca_Z, peca_T, peca_Q, peca_I];

    let posicao_atual = 4;
    let rotacao_atual = 0;
    let aux_random = Math.floor(Math.random()*pecas.length);
    let peca_atual = pecas[aux_random][rotacao_atual];
    
    /* DESENHANDO A PEÇA */
    function desenha_peca()
        {
            peca_atual.forEach(index => {
                quadrados[posicao_atual + index].classList.add('Pecas');
                quadrados[posicao_atual + index].style.backgroundColor = cores[aux_random];
            })
                }


    /* APAGANDO A PEÇA */
    function apaga_peca()
        {
            peca_atual.forEach(index => {
                quadrados[posicao_atual + index].classList.remove('Pecas');
                quadrados[posicao_atual + index].style.backgroundColor = '';
            })
                }

    
    /* FUNÇÕES DE CONTROLE */
    function controle(e)
        {
            if(e.keyCode === 37)
                {
                    esquerda();
                        }
            else if(e.keyCode === 38)
                {
                    rotacao();
                        }
            else if(e.keyCode === 39)
                {
                    direita();
                        }
            else if(e.keyCode === 40)
                {
                    desce();
                        }                        
                    }


    document.addEventListener('keyup', controle);

    /* FUNÇÃO QUE REPRESENTA A PEÇA PARANDO*/
    function para_peca()
        {
            if(peca_atual.some(index => quadrados[posicao_atual + index + tamanho_campo].classList.contains('ocupada')))
                {
                    peca_atual.forEach(index => quadrados[posicao_atual + index].classList.add('ocupada'));
                    // CHAMANDO OUTRA PEÇA
                    aux_random = proxima_random;
                    proxima_random = Math.floor(Math.random()*pecas.length);
                    peca_atual = pecas[aux_random][rotacao_atual];
                    posicao_atual = 4;
                    desenha_peca();
                    mostrar_previa();
                    pontuacao();
                    gameOver();
                        }
                }

    /* MOVIMENTAÇÃO DAS PEÇAS*/
    // ESQUERDA
    function esquerda()
        {
            apaga_peca();
            const fimBordaEsquerda = peca_atual.some(index => (posicao_atual + index) % tamanho_campo === 0);

            if(!fimBordaEsquerda) {posicao_atual -= 1;}

            if(peca_atual.some(index => quadrados[posicao_atual + index].classList.contains('ocupada')))
                {
                    posicao_atual += 1;
                        }
            desenha_peca();
                }

    // DIREITA
    function direita()
        {
            apaga_peca();
            const fimBordaDireita = peca_atual.some(index => (posicao_atual + index) % tamanho_campo === tamanho_campo - 1);

            if(!fimBordaDireita) {posicao_atual += 1;}

            if(peca_atual.some(index => quadrados[posicao_atual + index].classList.contains('ocupada')))
                {
                    posicao_atual -= 1;
                        }
            desenha_peca();
                }

    // CIMA (ROTAÇÃO DA PEÇA)
    function rotacao()
        {
            apaga_peca();
            rotacao_atual ++;
            if(rotacao_atual === peca_atual.length)
                {
                    rotacao_atual = 0;
                        }
            peca_atual = pecas[aux_random][rotacao_atual];
            checkRotacaoPosicao();
            desenha_peca();
                }

    // BAIXO (DESCE A PEÇA MAIS RÁPIDO)
    function desce()
        {
            apaga_peca();
            posicao_atual += tamanho_campo;
            desenha_peca();
            para_peca();
                }


    /* CORREÇÃO DA ROTAÇÃO DAS PEÇAS NAS BORDAS */
    function estaNaDireita()
        {
            return peca_atual.some(index => (posicao_atual + index + 1) % tamanho_campo === 0);
                }

    function estaNaEsquerda()
        {
            return peca_atual.some(index => (posicao_atual + index) % tamanho_campo === 0);
                }

    function checkRotacaoPosicao(P)
        {
            P = P || posicao_atual;
            if((P+1) % tamanho_campo < 4)
                {
                    if(estaNaDireita())
                        {
                            posicao_atual += 1;
                            checkRotacaoPosicao(P);
                                }
                        }
            else if(P % tamanho_campo > 5)
                {
                    if(estaNaEsquerda())
                        {
                            posicao_atual -= 1;
                            checkRotacaoPosicao(P);
                                }
                        }
                }

    
    /* PREVIA DE PEÇAS */
    const mostra_previa = document.querySelectorAll('.previa_peca div');
    const tamanho_previa = 4;
    let index_previa = 0;
        
    // ARRAY COM AS POSSÍVEIS PEÇAS
    const proxima_peca = [
        [1, tamanho_previa+1, tamanho_previa*2+1, 2],                    // PEÇA L
        [0, tamanho_previa, tamanho_previa+1, tamanho_previa*2+1],       // PEÇA Z
        [1, tamanho_previa, tamanho_previa+1, tamanho_previa+2],         // PEÇA T
        [0, 1, tamanho_previa, tamanho_previa+1],                        // PEÇA Q
        [1, tamanho_previa+1, tamanho_previa*2+1, tamanho_previa*3+1],   // PEÇA I
    ];
    
    
    // FUNÇÃO PARA MOSTRAR PREVIA DE PECÁS
    function mostrar_previa()
        {
            mostra_previa.forEach(quadrado => {
                quadrado.classList.remove('Pecas');
                quadrado.style.backgroundColor = '';
            })
            proxima_peca[proxima_random].forEach(index => {
                mostra_previa[index_previa + index].classList.add("Pecas");
                mostra_previa[index_previa + index].style.backgroundColor = cores[proxima_random];
            })
                }
    
    // FUNÇÃO DO BOTÃO DE START E PAUSE
    BtnInicioPausa.addEventListener('click', () => {
        if(timerId)
            {
                clearInterval(timerId);
                timerId = null;
                    }
        else
            {
                desenha_peca();
                timerId = setInterval(desce, 1000);      // MUDA TEMPO DE DESCIDA DA PEÇA
                proxima_random = Math.floor(Math.random()*pecas.length);
                mostrar_previa();
                    }
    SelVelocidade.value = "n1";
    })

    // FUNÇÃO PARA CONTROLAR O SCORE
    function pontuacao()
        {
            for(let i = 0 ; i < 199 ; i += tamanho_campo)
                {
                    const linha = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

                    if(linha.every(index => quadrados[index].classList.contains('ocupada')))
                        {
                            score += 10;
                            MostraPontos.innerHTML = score;
                            linha.forEach(index => {
                                quadrados[index].classList.remove('ocupada');
                                quadrados[index].classList.remove('Pecas');
                                quadrados[index].style.backgroundColor = '';
                            })
                            const quadradosRemovidos = quadrados.splice(i, tamanho_campo);
                            quadrados = quadradosRemovidos.concat(quadrados);
                            quadrados.forEach(cell => campo.appendChild(cell));
                                }
                        }
                }


    // GAME OVER
    function gameOver()
        {
            if(peca_atual.some(index => quadrados[posicao_atual + index].classList.contains('ocupada')))
                {
                    salva_placar();
                    MostraPontos.innerHTML = 'FIM';
                    clearInterval(timerId);
                    /*   // GERA O PROBLEMA DE ACABAR O JOGO ANTES DE A ULTIMA PEÇA ENCOSTAR NO SOLO E NO TETO DO GRIND
                    var resposta = confirm("GAME OVER " + Gamer + " Deseja iniciar um novo Jogo ?");
                    
                    if(resposta == true)
                        {
                            document.location.reload(); 
                                }
                    */
                        }
                }


    // FUNÇÃO DE MUDANÇA DE VELOCIDADE (EXTRA)
    SelVelocidade.addEventListener('click', () => {
        let selNivel = SelVelocidade.value;
            console.log("TROCOU A VELOCIDADE PARA O NÍVEL: " + selNivel);
            
            clearInterval(timerId);
            timerId = null;

            switch(selNivel)
                {
                    case "n1":
                        timerId = setInterval(desce, 1000);
                        console.log("VELOCIDADE 1 " + timerId);
                        break;
                    case "n2":
                        timerId = setInterval(desce, 500);
                        console.log("VELOCIDADE 2 " + timerId);
                        break;
                    case "n3":
                        timerId = setInterval(desce, 250);
                        console.log("VELOCIDADE 3 " + timerId);
                        break;
                        }
    })


    // FUNÇÃO DE ZERAR O PLACAR
    BtnZeraPlacar.addEventListener('click', () => {
        var resposta = confirm("Deseja Zerar o placar do jogo: " + Gamer + " ?" + "\n Todos os pontos serão zerados e o Jogo reiniciado");

        if(resposta == true)
            {
                localStorage.setItem("Placar", JSON.stringify(Placar));         // ZERA O PLACAR POR SETAR O PLACAR SEM NENHUMA ATUALIZAÇÃO
                document.location.reload();
                    }
    })

    // FUNÇÕES DE ABRIR E FECHAR AS INSTRUÇÕES
    BtnAbreInstrucoes.addEventListener('click', () => {
        modal.classList.add("active");
    })

    BtnFechaInstrucoes.addEventListener('click', () => {
        modal.classList.remove("active");
    })

    // FUNÇÕES DE REINICIAR JOGO
    BtnReiniciar.addEventListener('click', () => {
        document.location.reload();
        alert("Atenção " + Gamer + " Todos os Pontos serão predidos");
    })

    // FUNÇÕES DE FINALIZAR O JOGO
    BtnFinalizar.addEventListener('click', () => {
        var resposta = confirm("Deseja terminar o jogo: " + Gamer + " ?" + "\n Todos os pontos serão mantidos");

        if(resposta == true)
            {
                salva_placar();
                MostraPontos.innerHTML = score;
                clearInterval(timerId);
                document.location.reload();
                    }
    })

    
})

