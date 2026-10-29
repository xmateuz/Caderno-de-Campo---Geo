/* ==========================================================================
   CADERNO DE CAMPO — CONFIGURAÇÃO E POSTS
   Este é o único arquivo que você precisa editar para publicar um post novo.
   ========================================================================== */

window.BLOG = {
  nome: "Caderno de Campo",
  slogan: "Blog de Geografia",
  autores: ["Nícolas Maruyama", "Mateus Romano"],
  autorPapel: "Autores do blog",
  descricao: "Um tema da Geografia por semana, explicado em partes, com ilustrações e questões no estilo ENEM.",
  intervaloDias: 7, // de quantos em quantos dias sai um post (usado para mostrar a data do próximo)
  sobre: [
    "O Caderno de Campo é um blog de Geografia com um post novo toda semana. Cada post escolhe um tema ou uma notícia e explica do básico ao curioso, com imagens e números.",
    "O tema é dividido em partes. Cada parte vira um card com uma imagem representativa no topo e a explicação logo abaixo, com os números mais importantes ao lado.",
    "No fim de cada post há três questões no estilo ENEM e vestibular, uma sobre cada parte, com resolução comentada. Também há uma lista de sites confiáveis para ir mais fundo."
  ]
};

/* --------------------------------------------------------------------------
   COMO ADICIONAR O POST DA SEMANA
   1. Copie o MODELO abaixo (sem as barras de comentário) e cole dentro da lista
      window.POSTS, antes ou depois do post que já existe. O site ordena pela data.
   2. Preencha os campos. O "id" vira o link do post: use só letras minúsculas,
      números e hífen (ex.: "sistema-solar").
   3. Para a imagem de cada card, coloque o arquivo na pasta img/ e escreva
      imagem: "img/nome-do-arquivo.jpg".
   4. Salve e recarregue a página. O post novo vira o destaque do Início.

   MODELO:
   {
     id: "nome-do-post",
     semana: 2,
     data: "2026-10-29",                       // AAAA-MM-DD
     categoria: "Geografia humana",
     tags: ["urbanização", "cidades"],
     manchete: "Frase principal da notícia",
     resumo: "Um parágrafo curto explicando do que o post trata.",
     passos: [                                 // opcional: resumo em 30 segundos
       ["Título curto", "Uma frase de explicação."]
     ],
     cards: [
       {
         parte: "Nome curto da parte",
         titulo: "Título do card",
         imagem: "img/minha-imagem.jpg",
         imagemAlt: "O que aparece na imagem",
         legenda: "Legenda embaixo da imagem",
         lead: "Primeiro parágrafo, em destaque.",
         conteudo: `
           <h3>Subtítulo</h3>
           <p>Texto do card. Pode usar <strong>negrito</strong>, listas e imagens.</p>
         `,
         numeros: [["100 km", "o que esse número significa"]],
         questao: {                            // questão estilo ENEM sobre ESTA parte
           texto: ["Texto-base da questão (um ou mais parágrafos)."],
           fonte: "Elaborado para o Caderno de Campo.",
           enunciado: "Comando da questão: o que o aluno precisa responder?",
           alternativas: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D", "Alternativa E"],
           correta: 1,                         // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
           resolucao: "Explique por que a alternativa certa está certa e por que as outras estão erradas."
         }
       }
     ],
     fontes: [
       { nome: "Nome do site", url: "https://exemplo.com", descricao: "O que tem lá." }
     ]
   },
   -------------------------------------------------------------------------- */

window.POSTS = [
  {
    id: "camadas-placas-terremotos",
    semana: 1,
    data: "2026-10-22",
    categoria: "Geografia física",
    tags: ["camadas da Terra", "placas tectônicas", "terremotos", "vulcões", "Brasil"],
    manchete: "O chão sob seus pés está se movendo",
    resumo: "A Terra tem um núcleo quase tão quente quanto a superfície do Sol, um manto de rocha que flui devagar e uma casca partida em placas que andam alguns centímetros por ano. Quando essas placas travam e se soltam de repente, o planeta treme. Neste post, seguimos esse caminho em três partes.",
    passos: [
      ["Núcleo quente", "O calor que vem do centro da Terra aquece o manto por baixo."],
      ["Manto em movimento", "Rocha quente sobe e rocha fria desce. São as correntes de convecção."],
      ["Placas à deriva", "A casca rígida da Terra, partida em placas, é arrastada alguns centímetros por ano."],
      ["Tensão nas bordas", "Onde as placas se encontram, o atrito trava o movimento e a pressão se acumula."],
      ["Terremoto", "A rocha cede de uma vez e a energia se espalha em ondas sísmicas."]
    ],
    cards: [
      /* ------------------------------------------------------------ Parte 1 */
      {
        parte: "Camadas da Terra",
        titulo: "Uma viagem de 6.371 km até o centro do planeta",
        imagem: ILUSTRACOES.camadas,
        legenda: "Corte da Terra em escala. Só a crosta foi engrossada no desenho: na proporção real, ela teria a espessura de um traço.",
        lead: "Se desse para cavar um túnel em linha reta até o centro da Terra, você atravessaria quatro camadas bem diferentes, cada uma mais quente e mais comprimida que a anterior. A estrutura lembra um pêssego: casca fina, polpa grossa e um caroço duro no meio.",
        conteudo: `
          <h3>As quatro camadas</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead>
                <tr><th scope="col">Camada</th><th scope="col">Profundidade</th><th scope="col">Estado</th><th scope="col">Do que é feita</th><th scope="col">Temperatura</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row"><i class="amostra" style="--c:var(--c-crosta)"></i>Crosta</th><td class="n">0 a 5–70 km</td><td>Sólida</td><td>Granito nos continentes, basalto sob os oceanos</td><td class="n">até ~870 °C</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:var(--c-manto)"></i>Manto</th><td class="n">até 2.890 km</td><td>Sólido, mas flui muito devagar</td><td>Rochas ricas em ferro e magnésio</td><td class="n">~1.000 a 3.700 °C</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:var(--c-next)"></i>Núcleo externo</th><td class="n">2.890 a 5.150 km</td><td>Líquido</td><td>Ferro e níquel derretidos</td><td class="n">~4.000 a 5.000 °C</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:var(--c-nint)"></i>Núcleo interno</th><td class="n">5.150 a 6.371 km</td><td>Sólido, por causa da pressão</td><td>Ferro e níquel</td><td class="n">~5.200 °C</td></tr>
              </tbody>
            </table>
          </div>
          <p class="tab-nota">A crosta é mais fina sob os oceanos (5 a 10 km) e mais grossa sob as grandes montanhas (até 70 km).</p>

          <h3>Litosfera e astenosfera: o detalhe que explica tudo</h3>
          <p>Os geólogos também dividem as camadas de cima pelo jeito como elas se comportam. A <strong>litosfera</strong> junta a crosta e o topo do manto em uma camada rígida, com cerca de 100 km de espessura, que se quebra em pedaços. Logo abaixo fica a <strong>astenosfera</strong>, uma faixa do manto tão quente que se deforma como massa de modelar e deixa a litosfera deslizar por cima. Esses pedaços de litosfera são as placas tectônicas da Parte 2.</p>

          <h3>Como sabemos disso, se ninguém foi lá?</h3>
          <p>O buraco mais fundo já perfurado, o Poço Superprofundo de Kola, na Rússia, chegou a 12,2 km. Isso é menos de 0,2% do caminho até o centro. Todo o resto foi descoberto ouvindo terremotos: suas ondas mudam de velocidade e de direção quando passam de uma camada para outra, e sismógrafos espalhados pelo mundo registram essas mudanças.</p>
          <p>As ondas S, por exemplo, não atravessam líquidos. Do outro lado do planeta existe uma grande região aonde elas nunca chegam, e foi isso que revelou que o núcleo externo é líquido. Em 1936, a sismóloga dinamarquesa Inge Lehmann notou ondas fracas chegando a lugares onde não deveriam aparecer e concluiu que elas ricocheteavam em um núcleo interno sólido.</p>

          <div class="nota">
            <p class="rotulo">Por que isso importa aqui em cima?</p>
            <p>O ferro líquido do núcleo externo se move sem parar e cria correntes elétricas. Elas geram o campo magnético da Terra, que faz a bússola apontar para o norte e desvia boa parte das partículas do vento solar. As auroras são o pedaço desse escudo que dá para ver.</p>
          </div>
        `,
        numeros: [
          ["6.371 km", "raio médio da Terra"],
          ["12,2 km", "profundidade do buraco mais fundo já cavado"],
          ["84%", "do volume do planeta é manto"],
          ["~5.200 °C", "no núcleo interno, quase a temperatura da superfície do Sol"]
        ],
        questao: {
          texto: [
            "Os sismógrafos espalhados pelo planeta funcionam como uma espécie de radiografia do interior da Terra. Depois de um grande terremoto, as ondas P são registradas em estações de quase todo o mundo.",
            "Já as ondas S, que só se propagam em meios sólidos, deixam de ser registradas pelas estações situadas a mais de cerca de 104° de distância do epicentro, o que forma uma extensa zona de sombra do outro lado do planeta."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "A ausência de registro das ondas S nas estações mais distantes do epicentro permitiu aos cientistas concluir que",
          alternativas: [
            "a crosta continental é mais espessa sob as grandes cordilheiras.",
            "o núcleo externo da Terra se encontra em estado líquido.",
            "o manto é formado por magma totalmente derretido.",
            "a temperatura diminui à medida que se aproxima do centro da Terra.",
            "as ondas S se propagam mais rápido que as ondas P."
          ],
          correta: 1,
          resolucao: "As ondas S não atravessam líquidos. Se elas somem do outro lado do planeta, é porque encontram no caminho uma camada líquida: o núcleo externo, de ferro e níquel derretidos. A alternativa A é verdadeira, mas não tem relação com a zona de sombra. A C está errada porque o manto é sólido, ainda que flua muito devagar. A D inverte a realidade: a temperatura aumenta com a profundidade. A E também inverte: as ondas P são as mais rápidas."
        }
      },

      /* ------------------------------------------------------------ Parte 2 */
      {
        parte: "Placas tectônicas",
        titulo: "Um quebra-cabeça gigante que nunca para de se mexer",
        imagem: ILUSTRACOES.placas,
        legenda: "Duas placas se chocam: a oceânica, mais densa, afunda sob a continental. O atrito causa terremotos e o magma forma vulcões. Fora de escala.",
        lead: "A litosfera não é uma casca inteira. Ela está partida em cerca de 15 placas principais, que se encaixam como peças de um quebra-cabeça e se movem de 2 a 10 cm por ano. Parece pouco, mas é mais ou menos a velocidade com que suas unhas crescem. Em milhões de anos, isso redesenha o mapa do mundo.",
        conteudo: `
          <h3>A pista que estava no mapa</h3>
          <p>Em 1912, o cientista alemão Alfred Wegener reparou que a costa leste da América do Sul se encaixa na costa oeste da África. Ele também viu que fósseis do mesossauro, um pequeno réptil aquático, aparecem no Brasil e na África do Sul. Aqui, eles estão nas rochas da Formação Irati, que afloram inclusive no interior de São Paulo. Um animal desse tamanho não atravessaria um oceano a nado.</p>
          <p>A conclusão de Wegener foi que os continentes já estiveram unidos em um supercontinente, a <strong>Pangeia</strong>, que começou a se partir há cerca de 200 milhões de anos. Muitos cientistas da época rejeitaram a ideia, porque ele não sabia explicar o que movia os continentes. A resposta só veio nos anos 1960, quando o mapeamento do fundo do mar mostrou crosta nova nascendo no meio dos oceanos.</p>

          <h3>O que empurra as placas</h3>
          <p>O motor é o calor que vem de dentro. No manto, a rocha mais quente e menos densa sobe devagar, esfria perto da superfície e volta a descer, como a água fervendo em uma panela. Essas <strong>correntes de convecção</strong> arrastam as placas. Nas bordas onde uma placa afunda, o próprio peso dela ajuda a puxar o resto para baixo.</p>

          <h3>Três jeitos de as placas se encontrarem</h3>
          <div class="limites">
            <div class="limite">
              <svg class="ic" viewBox="0 0 120 52" aria-hidden="true"><rect class="ic-b" x="4" y="22" width="48" height="22"/><rect class="ic-b" x="68" y="22" width="48" height="22"/><rect class="ic-m" x="54" y="26" width="12" height="18"/><path class="ic-s" d="M42 10H14M20 5L14 10L20 15M78 10H106M100 5L106 10L100 15"/></svg>
              <p class="rotulo">Se afastam</p>
              <h4>Divergente</h4>
              <p>O magma sobe pela fenda, esfria e forma crosta nova. É assim que oceanos nascem e crescem.</p>
              <p class="ex">Ex.: Dorsal Mesoatlântica, que alarga o Atlântico cerca de 2,5 cm por ano.</p>
            </div>
            <div class="limite">
              <svg class="ic" viewBox="0 0 120 52" aria-hidden="true"><path class="ic-b" d="M4 24H60L76 48H62L52 38H4Z"/><path class="ic-b" d="M60 20H116V42H74Z"/><path class="ic-b" d="M84 20L91 13L98 20Z"/><path class="ic-s" d="M14 8H40M34 3L40 8L34 13M110 8H84M90 3L84 8L90 13"/></svg>
              <p class="rotulo">Colidem</p>
              <h4>Convergente</h4>
              <p>Se uma das placas é oceânica, ela mergulha sob a outra (subducção) e forma fossas, vulcões e cordilheiras. Se as duas são continentais, a crosta se dobra e sobe.</p>
              <p class="ex">Ex.: Andes (subducção) e Himalaia (choque entre Índia e Ásia).</p>
            </div>
            <div class="limite">
              <svg class="ic" viewBox="0 0 120 52" aria-hidden="true"><rect class="ic-b" x="4" y="6" width="54" height="40"/><rect class="ic-b" x="62" y="6" width="54" height="40"/><path class="ic-f" d="M60 2V50"/><path class="ic-s" d="M31 38V14M26 20L31 14L36 20M89 14V38M84 32L89 38L94 32"/></svg>
              <p class="rotulo">Deslizam lado a lado</p>
              <h4>Transformante</h4>
              <p>As placas raspam uma na outra sem criar nem destruir crosta, acumulando muita tensão no caminho.</p>
              <p class="ex">Ex.: Falha de San Andreas, na Califórnia.</p>
            </div>
          </div>

          <div class="nota">
            <p class="rotulo">E o Brasil?</p>
            <p>O Brasil fica no meio da Placa Sul-Americana, longe das bordas. Por isso não temos vulcões ativos e os terremotos por aqui costumam ser fracos. Do outro lado do continente, a Placa de Nazca mergulha sob a Sul-Americana. É por isso que o Chile e o Peru tremem tanto e que existe a Cordilheira dos Andes.</p>
          </div>
        `,
        numeros: [
          ["~15", "placas principais"],
          ["2–10 cm", "é quanto elas andam por ano"],
          ["200 mi", "de anos desde que a Pangeia começou a se partir"],
          ["8.849 m", "altura do Everest, erguido pelo choque entre Índia e Ásia"]
        ],
        questao: {
          texto: [
            "A costa oeste da América do Sul concentra vulcões ativos, terremotos frequentes e a Cordilheira dos Andes, com picos de quase 7.000 metros. O território brasileiro, por outro lado, não tem vulcões ativos e registra principalmente tremores de baixa magnitude."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "A diferença entre essas duas porções do continente sul-americano se explica porque, na costa oeste,",
          alternativas: [
            "as placas Sul-Americana e Africana se afastam, formando crosta oceânica nova.",
            "a Placa de Nazca mergulha sob a Placa Sul-Americana, em um limite convergente.",
            "duas placas deslizam lateralmente sem colidir, como ocorre na Falha de San Andreas.",
            "o clima árido do Deserto do Atacama deixa as rochas mais frágeis.",
            "a ausência de grandes rios impede a erosão e mantém as montanhas elevadas."
          ],
          correta: 1,
          resolucao: "Na costa do Pacífico, a Placa de Nazca, oceânica e mais densa, mergulha sob a Sul-Americana. Essa subducção ergue a cordilheira, alimenta os vulcões e provoca terremotos. O Brasil fica no interior da placa, longe das bordas, por isso quase não tem atividade tectônica. A alternativa A descreve o limite divergente do meio do Atlântico, do outro lado do Brasil. A C descreve um limite transformante. A D e a E citam fatores climáticos e erosivos, que não explicam vulcões nem terremotos."
        }
      },

      /* ------------------------------------------------------------ Parte 3 */
      {
        parte: "Terremotos",
        titulo: "Quando a energia presa nas falhas se solta de uma vez",
        imagem: ILUSTRACOES.terremotos,
        legenda: "A rocha se rompe no hipocentro e as ondas atravessam o chão até uma estação, que registra a chegada das ondas P, S e superficiais. Fora de escala.",
        lead: "Nas bordas das placas, as rochas não deslizam com suavidade. O atrito as prende enquanto as placas continuam empurrando, e a tensão se acumula por anos ou séculos. Quando a rocha não aguenta mais, ela se rompe ao longo de uma falha. Em segundos, a energia guardada se espalha em ondas sísmicas. Isso é um terremoto.",
        conteudo: `
          <h3>Hipocentro e epicentro</h3>
          <p>O ponto dentro da Terra onde a ruptura começa é o <strong>hipocentro</strong>, também chamado de foco. Ele pode estar a poucos quilômetros ou a centenas de quilômetros de profundidade. O ponto da superfície bem acima dele é o <strong>epicentro</strong>, que costuma ser onde o tremor é mais forte.</p>

          <h3>Três tipos de onda</h3>
          <ul class="ondas">
            <li>
              <svg class="onda-g" viewBox="0 0 88 30" aria-hidden="true"><path d="M3 5V25M6 5V25M8 5V25M10 5V25M12 5V25M15 5V25M21 5V25M28 5V25M33 5V25M36 5V25M38 5V25M40 5V25M42 5V25M45 5V25M51 5V25M58 5V25M63 5V25M66 5V25M68 5V25M70 5V25M72 5V25M75 5V25M81 5V25"/></svg>
              <p class="onda-nome">Ondas P <span class="vel">~6 km/s na crosta</span></p>
              <p>São as primeiras a chegar. Comprimem e esticam a rocha na direção em que viajam, como uma mola. Atravessam sólidos e líquidos.</p>
            </li>
            <li>
              <svg class="onda-g" viewBox="0 0 88 30" aria-hidden="true"><path d="M2 15C7 4 15 4 20 15S33 26 38 15S51 4 56 15S69 26 74 15S82 7 86 11"/></svg>
              <p class="onda-nome">Ondas S <span class="vel">~3,5 km/s</span></p>
              <p>Chegam depois. Sacodem a rocha de um lado para o outro e só passam por sólidos.</p>
            </li>
            <li>
              <svg class="onda-g" viewBox="0 0 88 30" aria-hidden="true"><path d="M2 20C10 2 22 2 30 15S46 29 56 15S74 2 86 9"/></svg>
              <p class="onda-nome">Ondas superficiais <span class="vel">as mais lentas</span></p>
              <p>Correm pela superfície depois das outras. Têm as maiores oscilações e são as que mais derrubam construções.</p>
            </li>
          </ul>
          <p>Como as ondas P chegam primeiro e quase não causam estragos, sistemas de alerta, como o do Japão, detectam o começo do terremoto e avisam a população alguns segundos antes de o tremor forte chegar. Dá tempo de frear trens e de se proteger.</p>

          <h3>Magnitude: cada ponto vale cerca de 32 vezes mais energia</h3>
          <p>A magnitude mede a energia liberada no foco. A escala é logarítmica: subir um ponto multiplica por 10 o tamanho das ondas no sismograma e por cerca de 32 a energia. Um terremoto de magnitude 7 libera por volta de mil vezes mais energia que um de magnitude 5. A famosa escala Richter, de 1935, foi substituída pela escala de magnitude de momento, que funciona melhor para os grandes terremotos. Já os efeitos sentidos em cada lugar são medidos pela escala de Mercalli, que vai de I a XII.</p>

          <div class="regua" data-regua>
            <div class="regua-top">
              <div>
                <p class="rotulo">Régua de magnitudes</p>
                <p class="regua-dica">Arraste o marcador ou toque em um terremoto real para comparar.</p>
              </div>
              <div class="mag" aria-live="polite">
                <span class="mag-num" data-mag-num>7,0</span>
                <span class="mag-cat" data-mag-cat>Grande</span>
              </div>
            </div>
            <div class="trilho">
              <div class="faixa" aria-hidden="true"></div>
              <div class="marcas" aria-hidden="true" data-marcas></div>
              <label class="sr" for="regua-magnitude">Magnitude do terremoto</label>
              <input type="range" id="regua-magnitude" min="2" max="9.5" step="0.1" value="7" data-mag-input>
              <div class="escala" aria-hidden="true"><span style="left:0%">2</span><span style="left:13.333%">3</span><span style="left:26.667%">4</span><span style="left:40%">5</span><span style="left:53.333%">6</span><span style="left:66.667%">7</span><span style="left:80%">8</span><span style="left:93.333%">9</span></div>
            </div>
            <dl class="leituras">
              <div><dt>Energia liberada</dt><dd data-mag-energia></dd></div>
              <div><dt>Como é sentido</dt><dd data-mag-efeito></dd></div>
              <div><dt>Quantos por ano no mundo</dt><dd data-mag-freq></dd></div>
              <div><dt>Caso real mais próximo</dt><dd data-mag-caso></dd></div>
            </dl>
            <div class="chips" data-chips></div>
            <p class="regua-nota">Frequências: estimativas do Serviço Geológico dos EUA (USGS). Os efeitos também dependem da profundidade, da distância e do tipo de construção.</p>
          </div>

          <h3>O Brasil treme?</h3>
          <p>Treme, mas pouco e quase sempre de leve. O interior das placas também guarda falhas antigas que acumulam tensão. O maior terremoto já medido no país aconteceu em 1955, na Serra do Tombador, em Mato Grosso, com magnitude 6,2, numa região quase desabitada. Em 2007, um tremor de magnitude 4,9 em Itacarambi, no norte de Minas Gerais, derrubou casas e causou a primeira morte por terremoto registrada no Brasil.</p>

          <div class="nota alerta">
            <p class="rotulo">Se a terra tremer</p>
            <p>Abaixe-se, proteja a cabeça embaixo de uma mesa firme e segure-se nela até o tremor passar. Fique longe de janelas, estantes e objetos que possam cair, e não use elevadores.</p>
          </div>
        `,
        numeros: [
          ["9,5", "o maior já registrado, em Valdivia (Chile), em 1960"],
          ["~32×", "mais energia a cada ponto de magnitude"],
          ["~81%", "dos maiores terremotos acontecem no Anel de Fogo do Pacífico"],
          ["~500 mil", "tremores detectados por ano no mundo"]
        ],
        questao: {
          texto: [
            "Em dezembro de 2007, um tremor de magnitude 4,9 atingiu o povoado de Caraíbas, em Itacarambi, no norte de Minas Gerais. Casas simples, muitas delas de adobe, desabaram, e uma criança morreu. Foi a primeira morte por terremoto registrada no Brasil.",
            "Tremores dessa magnitude são frequentes em países como o Japão e raramente causam vítimas."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "A comparação entre as duas situações indica que o impacto de um terremoto sobre a população depende",
          alternativas: [
            "exclusivamente da magnitude registrada pelos sismógrafos.",
            "apenas da distância do país em relação ao Anel de Fogo do Pacífico.",
            "também da vulnerabilidade social, como o tipo de construção e o preparo da população.",
            "da estação do ano em que o tremor acontece.",
            "da escala usada para medi-lo, se Richter ou Mercalli."
          ],
          correta: 2,
          resolucao: "Com a mesma magnitude, o tremor teve efeitos muito diferentes. Isso acontece porque o dano depende também de quem está exposto e de como vive: casas frágeis, sem estrutura resistente, e a falta de preparo deixam a população mais vulnerável. A alternativa A está errada justamente porque a magnitude sozinha não explica a diferença. A B ignora que o Japão, que está no Anel de Fogo, sofre menos com tremores desse porte. A D não tem relação com os terremotos. A E confunde a medida com o fenômeno: a escala escolhida não muda o tremor."
        }
      }
    ],
    fontes: [
      { nome: "Serviço Geológico dos EUA", url: "https://earthquake.usgs.gov", descricao: "Mapa de terremotos em tempo real e estatísticas do mundo todo." },
      { nome: "Centro de Sismologia da USP", url: "https://www.moho.iag.usp.br", descricao: "Tremores registrados no Brasil e boletins sísmicos." },
      { nome: "Serviço Geológico do Brasil", url: "https://www.sgb.gov.br", descricao: "Mapas e estudos sobre a geologia do território brasileiro." }
    ]
  }
];
