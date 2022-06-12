/*
function mostra_nome()
    {
        nome_jogador = "Diego";
        alert("OLA " + nome_jogador);
            }

//mostra_nome();
*/
document.addEventListener('DOMContentLoaded', () => {
    const campo = document.querySelector('.Campo');
    let quadrados = Array.from(document.querySelectorAll('.Campo div'));
    const tamanho_campo = 10;
    const MostraPontos = document.querySelector('#pontos');
    const BtnInicio = document.querySelector('#botao_inicio');
    let proxima_random = 0;
    let timerId;
    let score = 0;

    /* PEÇAS */
    // PEÇA L
    const peca_L = [    
        [1, tamanho_campo+1, tamanho_campo*2+1, 2],
        [tamanho_campo, tamanho_campo+1, tamanho_campo+2, tamanho_campo*2+2],
        [1, tamanho_campo+1, tamanho_campo*2+1, tamanho_campo*2],
        [tamanho_campo, tamanho_campo*2, tamanho_campo*2+1, tamanho_campo*2+2]
      ]
    // PEÇA Z
      const peca_z = [
        [0,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1],
        [tamanho_campo+1, tamanho_campo+2,tamanho_campo*2,tamanho_campo*2+1],
        [0,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1],
        [tamanho_campo+1, tamanho_campo+2,tamanho_campo*2,tamanho_campo*2+1]
      ]
    // PEÇA T
      const peca_T = [
        [1,tamanho_campo,tamanho_campo+1,tamanho_campo+2],
        [1,tamanho_campo+1,tamanho_campo+2,tamanho_campo*2+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo*2+1],
        [1,tamanho_campo,tamanho_campo+1,tamanho_campo*2+1]
      ]
    // PEÇA QUADRADO
      const peca_Q = [
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1],
        [0,1,tamanho_campo,tamanho_campo+1]
      ]
    // PEÇA BARRA
      const peca_I = [
        [1,tamanho_campo+1,tamanho_campo*2+1,tamanho_campo*3+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo+3],
        [1,tamanho_campo+1,tamanho_campo*2+1,tamanho_campo*3+1],
        [tamanho_campo,tamanho_campo+1,tamanho_campo+2,tamanho_campo+3]
      ]

    
    const pecas = [peca_L, peca_z, peca_T, peca_Q, peca_I];

    let posicao_atual = 4;
    let rotacao_atual = 0;
    let aux_random = Math.floor(Math.random()*pecas.length);
    //console.log(aux_ramdom);
    let peca_atual = pecas[aux_random][rotacao_atual];
    
    /* DESENHANDO A PEÇA */
    function desenha_peca()
        {
            peca_atual.forEach(index => {
                quadrados[posicao_atual + index].classList.add('Pecas');
            })
                }

    //desenha_peca();

    /* APAGANDO A PEÇA */
    function apaga_peca()
        {
            peca_atual.forEach(index => {
                quadrados[posicao_atual + index].classList.remove('Pecas');
            })
                }

    /* TEMPO DE DESCIDA DAS PEÇAS */
    //timerId = setInterval(baixa_peca, 1000)
    
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

    /* FUNÇÃO QUE REPRESENTA A PEÇA DESCENDO*/
    function baixa_peca()
        {
            apaga_peca();
            posicao_atual += tamanho_campo;
            desenha_peca();
            para_peca()
                }

    /* FUNÇÃO QUE REPRESENTA A PEÇA PARANDO*/
    function para_peca()
        {
            if(peca_atual.some(index => quadrados[posicao_atual + index + tamanho_campo].classList.contains('ocupada')))
                {
                    peca_atual.forEach(index => quadrados[posicao_atual + index].classList.add('ocupada'))
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

            if(!fimBordaEsquerda) posicao_atual -= 1;

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

            if(!fimBordaDireita) posicao_atual += 1;

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
                quadrado.classList.remove('Pecas')
            })
            proxima_peca[proxima_random].forEach(index => {
                mostra_previa[index_previa + index].classList.add("Pecas")
            })
                }
    
    // FUNÇÃO DO BOTÃO DE START E PAUSE
    BtnInicio.addEventListener('click', () => {
        if(timerId)
            {
                clearInterval(timerId);
                timerId = null;
                    }
        else
            {
                desenha_peca();
                timerId = setInterval(desce, 1000)
                proxima_random = Math.floor(Math.random()*pecas.length)
                mostrar_previa();
                    }
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
                                quadrados[index].classList.remove('ocupado');
                                quadrados[index].classList.remove('Pecas')
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
                    MostraPontos.innerHTML = 'FIM';
                    clearInterval(timerId);
                        }
                }




})

