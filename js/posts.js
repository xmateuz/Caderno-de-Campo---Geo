/* ==========================================================================
   CADERNO DE CAMPO — TEXTOS DAS TRÊS PUBLICAÇÕES DO TRABALHO
   ========================================================================== */

window.BLOG = {
  nome: "Caderno de Campo",
  slogan: "Trabalho de Geografia",
  autores: ["Nícolas Maruyama", "Mateus Romano"],
  autorPapel: "Autores do trabalho",
  descricao: "Três temas da Geografia explicados em partes, com figuras, números e questões no estilo ENEM.",
  sobre: [
    "O Caderno de Campo é um trabalho de Geografia organizado em três publicações. Cada uma escolhe um tema e explica do básico ao curioso, com figuras e números.",
    "O tema de cada publicação é dividido em partes. Cada parte tem uma figura numerada no topo e a explicação logo abaixo, com os números mais importantes ao lado.",
    "No fim de cada publicação há três questões no estilo ENEM e vestibular, uma sobre cada parte, com resolução comentada. Também há uma lista de sites confiáveis para ir mais fundo."
  ]
};

window.POSTS = [
  {
    id: "camadas-placas-terremotos",
    numero: 1,
    data: "2026-10-22",
    categoria: "Geografia física",
    tags: ["camadas da Terra", "placas tectônicas", "terremotos", "vulcões", "Brasil"],
    manchete: "O chão sob seus pés está se movendo",
    resumo: "A Terra tem um núcleo quase tão quente quanto a superfície do Sol, um manto de rocha que flui devagar e uma casca partida em placas que andam alguns centímetros por ano. Quando essas placas travam e se soltam de repente, o planeta treme. Nesta publicação, seguimos esse caminho em três partes.",
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
  ,
  /* ======================================================================
     POST 2 — Biomas, climas e camadas da atmosfera
     ====================================================================== */
  {
    id: "biomas-climas-atmosfera",
    numero: 2,
    data: "2026-11-19",
    categoria: "Geografia física",
    tags: ["biomas", "clima", "atmosfera", "camada de ozônio", "efeito estufa", "Brasil"],
    manchete: "Do chão ao espaço: o que faz cada paisagem ser única",
    resumo: "Por que a Amazônia é uma floresta fechada e a Caatinga fica cinza na seca? A resposta começa no céu. O ar que envolve a Terra guarda calor e umidade, os climas surgem dessa mistura, e a vegetação de cada lugar se adapta ao clima. Nesta publicação, começamos pelos biomas e subimos até o limite da atmosfera.",
    passos: [
      ["Sol desigual", "O Sol aquece mais a região do equador do que os polos."],
      ["Atmosfera", "Uma capa de gases segura o calor e faz o ar e a umidade circularem."],
      ["Tempo do dia a dia", "Chuva, frio e calor mudam de hora em hora na troposfera."],
      ["Clima", "A média do tempo ao longo de décadas define o clima de cada lugar."],
      ["Bioma", "Plantas e animais se adaptam ao clima, ao relevo e ao solo e formam o bioma."]
    ],
    cards: [
      /* ------------------------------------------------------------ Parte 1 */
      {
        parte: "Biomas",
        titulo: "Seis biomas, seis paisagens dentro de um só país",
        imagem: ILUSTRACOES.biomas,
        legenda: "As paisagens típicas dos seis biomas brasileiros. A barra de baixo mostra quanto do território cada um ocupa, segundo o IBGE. Fora de escala.",
        lead: "Bioma é uma grande área com clima, relevo, solo e vegetação parecidos, que se formou ao longo de milhares de anos. O Brasil tem seis biomas continentais e uma das maiores biodiversidades do planeta. Cada um tem sua paisagem, seus bichos e seus problemas.",
        conteudo: `
          <h3>Os seis biomas brasileiros</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead>
                <tr><th scope="col">Bioma</th><th scope="col">Área do país</th><th scope="col">Clima</th><th scope="col">Vegetação</th><th scope="col">Principal ameaça</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row"><i class="amostra" style="--c:#2E7D46"></i>Amazônia</th><td class="n">~49%</td><td>Equatorial, quente e úmido</td><td>Floresta alta e fechada, com árvores de até 50 m</td><td>Desmatamento para pasto e garimpo</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:#B5A642"></i>Cerrado</th><td class="n">~24%</td><td>Tropical, com inverno seco</td><td>Capim e árvores baixas de tronco torto e casca grossa</td><td>Avanço da soja e da pecuária</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:#3FA37A"></i>Mata Atlântica</th><td class="n">~13%</td><td>Tropical úmido</td><td>Floresta densa nas serras do litoral</td><td>Crescimento das cidades</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:#C99A5B"></i>Caatinga</th><td class="n">~10%</td><td>Semiárido</td><td>Cactos e arbustos que perdem as folhas na seca</td><td>Desertificação</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:#9CC46B"></i>Pampa</th><td class="n">~2%</td><td>Subtropical</td><td>Campos de gramíneas em coxilhas</td><td>Monoculturas e arenização</td></tr>
                <tr><th scope="row"><i class="amostra" style="--c:#4A90B8"></i>Pantanal</th><td class="n">~2%</td><td>Tropical, com cheias no verão</td><td>Mistura de campos, matas e áreas alagadas</td><td>Queimadas</td></tr>
              </tbody>
            </table>
          </div>
          <p class="tab-nota">Porcentagens aproximadas da área do território brasileiro, segundo o IBGE.</p>

          <h3>O clima manda, a vegetação se adapta</h3>
          <p>As plantas de cada bioma têm "soluções" para o ambiente em que vivem. No <strong>Cerrado</strong>, as raízes vão fundo para alcançar água na seca, e a casca grossa protege as árvores do fogo, que é comum na região. Por isso o Cerrado é chamado de "berço das águas": suas raízes e seus solos alimentam nascentes de rios importantes do Brasil.</p>
          <p>Na <strong>Caatinga</strong>, muitas plantas perdem as folhas na estação seca para não perder água, e os cactos guardam água no caule. Na <strong>Amazônia</strong>, com chuva e calor o ano todo, as árvores crescem altas e disputam a luz do sol.</p>

          <h3>A Mata Atlântica e as cidades</h3>
          <p>A Mata Atlântica é o bioma onde vive a maior parte da população brasileira, incluindo cidades como São Paulo, Rio de Janeiro e Campinas. Por isso, é também um dos mais devastados: restam só cerca de 12% da floresta original em bom estado.</p>

          <div class="nota">
            <p class="rotulo">Você sabia?</p>
            <p>Caatinga vem do tupi e quer dizer "mata branca". Na seca, as árvores perdem as folhas e a paisagem fica cinza-esbranquiçada. É o único bioma que existe só no Brasil.</p>
          </div>
        `,
        numeros: [
          ["6", "biomas continentais no Brasil"],
          ["~49%", "do território é Amazônia"],
          ["~12%", "da Mata Atlântica original ainda resiste"],
          ["1", "bioma exclusivamente brasileiro: a Caatinga"]
        ],
        questao: {
          texto: [
            "Neste bioma, as árvores costumam ser baixas, com troncos tortos e casca grossa. Suas raízes podem passar de 10 metros de profundidade. Durante cerca de cinco meses quase não chove, e o fogo faz parte da dinâmica natural da paisagem."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "As características da vegetação descritas no texto são adaptações do Cerrado a",
          alternativas: [
            "temperaturas negativas e neve durante o inverno.",
            "solos encharcados durante todo o ano.",
            "uma longa estação seca e à ocorrência de queimadas.",
            "chuvas abundantes e bem distribuídas ao longo do ano.",
            "solos salgados típicos do litoral."
          ],
          correta: 2,
          resolucao: "As raízes profundas buscam água no subsolo durante a seca, e a casca grossa protege a planta do fogo. As duas são respostas à estação seca e às queimadas do Cerrado. A alternativa A não descreve o Brasil Central, onde não há neve. A B lembra o Pantanal. A D descreve o clima equatorial da Amazônia. A E lembra os manguezais e as restingas do litoral."
        }
      },

      /* ------------------------------------------------------------ Parte 2 */
      {
        parte: "Climas",
        titulo: "Tempo é o agora, clima é o que se repete",
        imagem: ILUSTRACOES.climas,
        legenda: "Climogramas de três capitais: as barras mostram a chuva de cada mês e a linha mostra a temperatura média. Valores aproximados.",
        lead: "\"Hoje está chovendo\" fala do tempo. \"No verão chove muito em Campinas\" fala do clima. O tempo é o estado da atmosfera em um momento. O clima é o padrão que se repete ao longo de pelo menos 30 anos de observação.",
        conteudo: `
          <h3>O que decide o clima de um lugar</h3>
          <ul>
            <li><strong>Latitude:</strong> perto do equador, o Sol bate mais forte o ano todo. Quanto mais longe, mais frio e mais diferentes as estações.</li>
            <li><strong>Altitude:</strong> a temperatura cai cerca de 0,6 °C a cada 100 metros de subida. Por isso São Paulo, a cerca de 760 m, é mais fresca que Santos, no nível do mar.</li>
            <li><strong>Maritimidade e continentalidade:</strong> perto do mar, a temperatura varia menos. No interior do continente, os dias são mais quentes e as noites mais frias.</li>
            <li><strong>Massas de ar:</strong> grandes porções de ar com temperatura e umidade parecidas. A massa polar atlântica, vinda do sul, traz as frentes frias.</li>
            <li><strong>Relevo:</strong> serras barram a umidade. O lado que recebe o vento úmido do mar é chuvoso, e o outro lado é mais seco.</li>
          </ul>

          <h3>Como ler um climograma</h3>
          <p>O climograma junta duas informações em um só gráfico: as <strong>barras</strong> mostram quanto chove em cada mês, e a <strong>linha</strong> mostra a temperatura média. Na imagem, Manaus tem barras altas e linha reta lá em cima: chove muito e faz calor o ano todo. Cuiabá tem barras que quase somem no meio do ano, o inverno seco. Em Porto Alegre, a chuva é parecida todos os meses, mas a linha desce bastante no inverno.</p>

          <h3>Os principais climas do Brasil</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead><tr><th scope="col">Clima</th><th scope="col">Onde</th><th scope="col">Como é</th></tr></thead>
              <tbody>
                <tr><th scope="row">Equatorial</th><td>Amazônia</td><td>Quente e chuvoso o ano todo</td></tr>
                <tr><th scope="row">Tropical</th><td>Brasil Central</td><td>Verão quente e chuvoso, inverno seco</td></tr>
                <tr><th scope="row">Tropical de altitude</th><td>Partes altas do Sudeste</td><td>Mais ameno, com geadas em alguns invernos</td></tr>
                <tr><th scope="row">Tropical litorâneo</th><td>Faixa litorânea</td><td>Quente e úmido, influenciado pelo mar</td></tr>
                <tr><th scope="row">Semiárido</th><td>Sertão nordestino</td><td>Quente, com chuvas escassas e irregulares</td></tr>
                <tr><th scope="row">Subtropical</th><td>Região Sul</td><td>Estações bem definidas, inverno frio e chuva o ano todo</td></tr>
              </tbody>
            </table>
          </div>

          <div class="nota">
            <p class="rotulo">Friagem na Amazônia</p>
            <p>Às vezes, a massa polar atlântica é tão forte que chega até a Amazônia. A temperatura em cidades como Rio Branco e Porto Velho pode cair mais de 10 °C em poucas horas. Esse fenômeno é chamado de friagem.</p>
          </div>
        `,
        numeros: [
          ["30 anos", "de dados para definir o clima de um lugar"],
          ["~0,6 °C", "mais frio a cada 100 m de altitude"],
          ["~2.300 mm", "de chuva por ano em Manaus"],
          ["< 800 mm", "de chuva por ano em boa parte do Sertão"]
        ],
        questao: {
          texto: [
            "Uma cidade brasileira registra temperaturas médias mensais entre 23 °C e 28 °C. O total de chuvas é de cerca de 1.300 mm por ano, concentrado entre outubro e março. De junho a agosto, quase não chove."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "As características descritas correspondem ao clima",
          alternativas: [
            "equatorial, com chuvas abundantes em todos os meses.",
            "subtropical, com inverno frio e chuvas bem distribuídas.",
            "tropical, com verão chuvoso e inverno seco.",
            "semiárido, com chuvas escassas e irregulares.",
            "temperado, com quatro estações e neve no inverno."
          ],
          correta: 2,
          resolucao: "Calor o ano todo, chuva concentrada no verão e um inverno seco bem marcado: esse é o clima tropical, típico do Brasil Central, como em Cuiabá. A alternativa A não serve, porque no equatorial chove muito em todos os meses. A B não serve porque a cidade não tem inverno frio. A D falha porque 1.300 mm é chuva demais para o semiárido, que costuma ficar abaixo de 800 mm. A E descreve um clima que não ocorre no Brasil."
        }
      },

      /* ------------------------------------------------------------ Parte 3 */
      {
        parte: "Camadas da atmosfera",
        titulo: "Cinco camadas de ar entre nós e o espaço",
        imagem: ILUSTRACOES.atmosfera,
        legenda: "As camadas da atmosfera, do chão até o espaço. As alturas foram ajustadas para tudo caber na imagem: na proporção real, a troposfera seria uma faixa finíssima.",
        lead: "A atmosfera é uma capa de gases presa à Terra pela gravidade. Ela é formada por 78% de nitrogênio, 21% de oxigênio e 1% de outros gases, como argônio, gás carbônico e vapor de água. Os cientistas a dividem em camadas de acordo com o jeito como a temperatura muda com a altitude.",
        conteudo: `
          <h3>As camadas, de baixo para cima</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead><tr><th scope="col">Camada</th><th scope="col">Altitude</th><th scope="col">Temperatura</th><th scope="col">O que acontece lá</th></tr></thead>
              <tbody>
                <tr><th scope="row">Troposfera</th><td class="n">0 a ~12 km</td><td>Cai com a altitude, até cerca de -55 °C</td><td>Nuvens, chuva, ventos e voos comerciais. Concentra cerca de 3/4 de todo o ar</td></tr>
                <tr><th scope="row">Estratosfera</th><td class="n">12 a 50 km</td><td>Sobe, chegando perto de 0 °C</td><td>Camada de ozônio, entre 20 e 35 km</td></tr>
                <tr><th scope="row">Mesosfera</th><td class="n">50 a 85 km</td><td>Cai até cerca de -90 °C, a mais fria</td><td>Meteoros queimam e viram estrelas cadentes</td></tr>
                <tr><th scope="row">Termosfera</th><td class="n">85 a ~600 km</td><td>Sobe muito, mas o ar é rarefeito</td><td>Auroras e Estação Espacial Internacional, a ~400 km</td></tr>
                <tr><th scope="row">Exosfera</th><td class="n">acima de ~600 km</td><td>Quase não há ar</td><td>Transição para o espaço, onde orbitam satélites</td></tr>
              </tbody>
            </table>
          </div>
          <p class="tab-nota">A altura da troposfera varia: cerca de 8 km nos polos e até 18 km no equador.</p>

          <h3>Por que a temperatura sobe e desce?</h3>
          <p>A troposfera é aquecida de baixo para cima, pelo calor que a superfície da Terra devolve. Por isso, quanto mais alto, mais frio: é o motivo de o topo das montanhas ter neve. Já na estratosfera a temperatura volta a subir, porque o ozônio absorve a radiação ultravioleta do Sol e se aquece.</p>

          <h3>Efeito estufa e buraco na camada de ozônio não são a mesma coisa</h3>
          <p>O <strong>efeito estufa</strong> acontece na troposfera: gases como o gás carbônico e o metano seguram parte do calor da Terra. Ele é natural e necessário. Sem ele, a temperatura média do planeta seria de cerca de -18 °C, e não de 15 °C. O problema é a intensificação do efeito estufa pela queima de combustíveis fósseis, que provoca o aquecimento global.</p>
          <p>O <strong>buraco na camada de ozônio</strong> acontece na estratosfera. Gases chamados CFCs, usados em geladeiras antigas e aerossóis, destruíam o ozônio. Em 1987, o Protocolo de Montreal proibiu esses gases, e a camada está se recuperando.</p>

          <div class="nota alerta">
            <p class="rotulo">Atenção na prova</p>
            <p>É comum o vestibular misturar os dois assuntos. Lembre: efeito estufa tem a ver com calor e troposfera. Camada de ozônio tem a ver com raios ultravioleta e estratosfera.</p>
          </div>
        `,
        numeros: [
          ["78%", "do ar é nitrogênio; 21% é oxigênio"],
          ["~12 km", "altura média da troposfera"],
          ["-90 °C", "na mesosfera, a camada mais fria"],
          ["1987", "ano do Protocolo de Montreal"]
        ],
        questao: {
          texto: [
            "Em 1987, quase todos os países do mundo assinaram o Protocolo de Montreal, que determinou o fim gradual da produção de clorofluorcarbonos (CFCs), gases usados em geladeiras, aparelhos de ar-condicionado e sprays. Décadas depois, a ONU confirmou que a camada atingida está em recuperação."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "O acordo descrito teve como objetivo proteger a camada atmosférica responsável por",
          alternativas: [
            "reter o calor da Terra, provocando o efeito estufa na troposfera.",
            "filtrar grande parte da radiação ultravioleta do Sol, na estratosfera.",
            "refletir ondas de rádio, na termosfera.",
            "formar as nuvens e as chuvas, na mesosfera.",
            "queimar os meteoros, na exosfera."
          ],
          correta: 1,
          resolucao: "Os CFCs destroem o ozônio, gás que fica concentrado na estratosfera e filtra boa parte dos raios ultravioleta, que causam câncer de pele e prejudicam plantas e animais. A alternativa A confunde camada de ozônio com efeito estufa. A C descreve um fato verdadeiro da termosfera, mas que não tem relação com os CFCs. A D erra porque as nuvens e as chuvas se formam na troposfera. A E erra porque os meteoros queimam na mesosfera."
        }
      }
    ],
    fontes: [
      { nome: "IBGE Educa", url: "https://educa.ibge.gov.br", descricao: "Biomas, território e dados do Brasil explicados para estudantes." },
      { nome: "Instituto Nacional de Meteorologia (INMET)", url: "https://portal.inmet.gov.br", descricao: "Previsão do tempo e normais climatológicas das cidades brasileiras." },
      { nome: "Instituto Nacional de Pesquisas Espaciais (INPE)", url: "https://www.gov.br/inpe", descricao: "Monitoramento do desmatamento, das queimadas e do clima." }
    ]
  },

  /* ======================================================================
     POST 3 — Revolução Industrial e Primavera Árabe
     ====================================================================== */
  {
    id: "revolucao-industrial-primavera-arabe",
    numero: 3,
    data: "2026-11-23",
    categoria: "Geografia humana",
    tags: ["Revolução Industrial", "urbanização", "globalização", "internet", "Primavera Árabe", "Oriente Médio"],
    manchete: "Da máquina a vapor ao celular erguido na praça",
    resumo: "Em pouco mais de 250 anos, novas tecnologias mudaram como o mundo produz, onde as pessoas vivem e até como elas protestam. Nesta publicação, saímos das fábricas inglesas do século XVIII, passamos pela internet e chegamos às ruas do mundo árabe em 2011.",
    passos: [
      ["Máquina a vapor", "A Inglaterra troca o trabalho manual pela máquina, movida a carvão."],
      ["Eletricidade e petróleo", "A indústria se espalha pela Europa, pelos EUA e pelo Japão."],
      ["Computador e internet", "Ciência e tecnologia passam a comandar a produção e conectam o mundo."],
      ["Redes sociais", "Informação e convocações circulam em segundos pelo celular."],
      ["Primavera Árabe", "Em 2011, uma onda de protestos derruba governos no Norte da África e no Oriente Médio."]
    ],
    cards: [
      /* ------------------------------------------------------------ Parte 1 */
      {
        parte: "Revolução Industrial",
        titulo: "Quando a máquina entrou na fábrica",
        imagem: ILUSTRACOES.revolucao,
        legenda: "A fábrica e a locomotiva a vapor, símbolos da Primeira Revolução Industrial. Embaixo, as três primeiras fases da industrialização.",
        lead: "Na segunda metade do século XVIII, a Inglaterra começou a trocar a produção manual pela produção com máquinas. A mudança foi tão profunda que ganhou o nome de revolução: transformou o trabalho, as cidades, o ambiente e a economia do mundo todo.",
        conteudo: `
          <h3>Por que começou na Inglaterra?</h3>
          <ul>
            <li><strong>Dinheiro para investir:</strong> a burguesia inglesa tinha acumulado capital com o comércio e as colônias.</li>
            <li><strong>Matéria-prima:</strong> o país tinha muito carvão mineral e ferro no próprio território.</li>
            <li><strong>Mão de obra:</strong> com os cercamentos, terras de uso comum viraram propriedade privada, e milhares de camponeses foram expulsos para as cidades.</li>
            <li><strong>Mercado:</strong> as colônias e o comércio marítimo garantiam compradores para os produtos.</li>
          </ul>

          <h3>As fases da industrialização</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead><tr><th scope="col">Fase</th><th scope="col">Quando</th><th scope="col">Energia</th><th scope="col">Inovações</th><th scope="col">Onde</th></tr></thead>
              <tbody>
                <tr><th scope="row">1ª Revolução</th><td class="n">c. 1760–1850</td><td>Carvão e vapor</td><td>Máquina a vapor, tear mecânico, ferrovia</td><td>Inglaterra</td></tr>
                <tr><th scope="row">2ª Revolução</th><td class="n">c. 1870–1950</td><td>Eletricidade e petróleo</td><td>Aço, motor a combustão, linha de montagem</td><td>EUA, Alemanha, França, Japão</td></tr>
                <tr><th scope="row">3ª Revolução</th><td class="n">a partir de c. 1950</td><td>Eletrônica e informática</td><td>Computador, robótica, internet</td><td>EUA, Japão, Europa, Ásia (veja a Parte 2)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>O que mudou no espaço geográfico</h3>
          <p><strong>As cidades explodiram.</strong> O êxodo rural levou multidões para perto das fábricas. Londres passou de cerca de 1 milhão de habitantes em 1800 para mais de 6 milhões em 1900, com bairros operários superlotados e sem saneamento.</p>
          <p><strong>O trabalho mudou.</strong> Jornadas de 14 a 16 horas por dia, salários baixos e trabalho infantil eram comuns. Em reação, os operários criaram os sindicatos e lutaram por direitos.</p>
          <p><strong>O mundo foi dividido.</strong> Surgiu a divisão internacional do trabalho: países industrializados vendiam produtos fabricados, e as colônias e ex-colônias, como o Brasil, forneciam matérias-primas e alimentos.</p>
          <p><strong>O ar começou a mudar.</strong> A queima de carvão, e depois de petróleo, aumentou o gás carbônico na atmosfera, de cerca de 280 ppm antes da industrialização para mais de 420 ppm hoje.</p>

          <div class="nota">
            <p class="rotulo">E o Brasil?</p>
            <p>A industrialização brasileira foi tardia. Ganhou força a partir dos anos 1930, com Getúlio Vargas, que criou a Companhia Siderúrgica Nacional e a Petrobras. Nos anos 1950, com Juscelino Kubitschek, chegaram as montadoras de carros ao ABC paulista. Até hoje, a indústria está concentrada no Sudeste, principalmente em São Paulo.</p>
          </div>
        `,
        numeros: [
          ["1769", "James Watt patenteia sua máquina a vapor"],
          ["6×", "foi quanto Londres cresceu no século XIX"],
          ["14 a 16 h", "de trabalho por dia nas primeiras fábricas"],
          ["280 → 420", "ppm de gás carbônico no ar, antes e hoje"]
        ],
        questao: {
          texto: [
            "Entre os séculos XVI e XIX, os cercamentos transformaram terras de uso comum da Inglaterra em propriedades privadas, cercadas e usadas principalmente para criar ovelhas. Milhares de famílias camponesas perderam o acesso à terra de onde tiravam seu sustento."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "Esse processo contribuiu para o início da Revolução Industrial na Inglaterra porque",
          alternativas: [
            "fortaleceu a produção artesanal nas pequenas aldeias.",
            "formou uma grande massa de trabalhadores que migrou para as cidades e passou a vender sua força de trabalho às fábricas.",
            "diminuiu a população das cidades inglesas.",
            "garantiu um pedaço de terra para cada família camponesa.",
            "substituiu o carvão mineral pela eletricidade nas fábricas."
          ],
          correta: 1,
          resolucao: "Sem terra para plantar, os camponeses foram para as cidades em busca de trabalho e se tornaram a mão de obra barata das fábricas. A alternativa A diz o contrário: a produção artesanal perdeu espaço. A C também inverte o processo, porque as cidades cresceram. A D é o oposto dos cercamentos, que tiraram a terra dos camponeses. A E mistura as fases: a eletricidade só chega com a Segunda Revolução Industrial."
        }
      },

      /* ------------------------------------------------------------ Parte 2 */
      {
        parte: "Mundo conectado",
        titulo: "A Terceira Revolução Industrial e o mundo em rede",
        imagem: ILUSTRACOES.conectado,
        legenda: "Cabos, satélites e celulares ligam o planeta e fazem a informação circular em segundos.",
        lead: "A partir da segunda metade do século XX, ciência e produção passaram a andar juntas. Computadores, satélites, robôs e a internet mudaram de novo a forma de produzir e de se comunicar. É a ponte entre as fábricas a vapor da Parte 1 e as praças lotadas da Parte 3.",
        conteudo: `
          <h3>O meio técnico-científico-informacional</h3>
          <p>O geógrafo brasileiro <strong>Milton Santos</strong> explicou essa mudança dividindo a história do espaço geográfico em três momentos. Primeiro, o <strong>meio natural</strong>, em que a sociedade dependia quase só da natureza. Depois, o <strong>meio técnico</strong>, com as máquinas das primeiras revoluções industriais. Por fim, o <strong>meio técnico-científico-informacional</strong>, o mundo de hoje, em que ciência, tecnologia e informação estão presentes em quase tudo, do campo à cidade.</p>

          <h3>A fábrica espalhada pelo mundo</h3>
          <p>Com a internet e os transportes rápidos, as empresas transnacionais passaram a dividir a produção entre vários países. Um celular pode ser projetado nos Estados Unidos, ter chips fabricados em Taiwan e na Coreia do Sul, ser montado na China e vendido no mundo todo. Essa integração é uma das marcas da <strong>globalização</strong>.</p>
          <p>A tecnologia também criou os <strong>tecnopolos</strong>, regiões que reúnem universidades, centros de pesquisa e empresas de tecnologia. O mais famoso é o Vale do Silício, nos Estados Unidos. No Brasil, Campinas, com a Unicamp, e São José dos Campos, com o ITA e a Embraer, são exemplos.</p>

          <h3>Um mundo conectado, mas desigual</h3>
          <p>Quase toda a informação que viaja entre continentes passa por cabos de fibra óptica no fundo do mar. Mas o acesso não é igual para todos. Em 2011, só cerca de 1 em cada 3 pessoas no mundo usava a internet. Hoje são cerca de 2 em cada 3, e a maior parte de quem ainda está desconectado vive em países pobres. Essa diferença é chamada de exclusão digital.</p>

          <div class="nota">
            <p class="rotulo">Ponte para a Parte 3</p>
            <p>Por volta de 2010, celulares com câmera e redes sociais como Facebook e Twitter já estavam espalhados pelo mundo árabe, principalmente entre os jovens. Eles se tornaram ferramentas para organizar protestos e mostrar ao mundo o que acontecia nas ruas.</p>
          </div>
        `,
        numeros: [
          ["1969", "primeira conexão da Arpanet, origem da internet"],
          ["~99%", "dos dados entre continentes passa por cabos submarinos"],
          ["1 em 3", "pessoas usava internet em 2011"],
          ["2 em 3", "pessoas usam internet hoje"]
        ],
        questao: {
          texto: [
            "Um smartphone vendido no Brasil foi projetado nos Estados Unidos, usa chips fabricados em Taiwan e na Coreia do Sul, tela produzida no Japão e foi montado na China. As etapas foram coordenadas em tempo real por meio de redes de computadores."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "A forma de organizar a produção descrita no texto é característica",
          alternativas: [
            "da Primeira Revolução Industrial, quando a produção se concentrava na Inglaterra.",
            "da economia de subsistência, voltada ao consumo da própria família.",
            "da globalização, apoiada no meio técnico-científico-informacional, que permite espalhar as etapas da produção pelo mundo.",
            "do período das Grandes Navegações, baseado no comércio de especiarias.",
            "de um modelo em que cada país fabrica sozinho todos os produtos de que precisa."
          ],
          correta: 2,
          resolucao: "Dividir as etapas da produção entre vários países e coordenar tudo em tempo real só é possível com as redes de informação e os transportes da Terceira Revolução Industrial. É o que Milton Santos chamou de meio técnico-científico-informacional. A alternativa A erra porque na Primeira Revolução a produção era concentrada em um só país. A B descreve uma economia sem trocas. A D fala de um período anterior à indústria. A E descreve o contrário da globalização."
        }
      },

      /* ------------------------------------------------------------ Parte 3 */
      {
        parte: "Primavera Árabe",
        titulo: "A onda de protestos que sacudiu o mundo árabe",
        imagem: ILUSTRACOES.primavera,
        legenda: "Multidões ocuparam praças com celulares e bandeiras. Em poucos meses, os protestos se espalharam da Tunísia para o Egito, a Líbia, a Síria e outros países.",
        lead: "Entre o fim de 2010 e 2012, uma onda de protestos tomou países do Norte da África e do Oriente Médio. A população foi às ruas contra governos autoritários que estavam no poder havia décadas, contra o desemprego, a alta dos preços e a corrupção.",
        conteudo: `
          <h3>A faísca na Tunísia</h3>
          <p>Em 17 de dezembro de 2010, na cidade de Sidi Bouzid, na Tunísia, o vendedor ambulante Mohamed Bouazizi teve suas mercadorias apreendidas pela polícia. Em protesto, ele ateou fogo ao próprio corpo e morreu semanas depois. Vídeos dos protestos que se seguiram circularam pelas redes sociais e pela TV, e as manifestações tomaram o país. Em 14 de janeiro de 2011, o presidente Ben Ali, no poder havia 23 anos, fugiu do país.</p>

          <h3>Por que os protestos se espalharam</h3>
          <ul>
            <li><strong>Governos autoritários e longos:</strong> Ben Ali governou a Tunísia por 23 anos, Hosni Mubarak o Egito por quase 30 e Muamar Kadafi a Líbia por 42.</li>
            <li><strong>População jovem e sem emprego:</strong> muitos jovens, inclusive com diploma, não encontravam trabalho.</li>
            <li><strong>Alimentos mais caros:</strong> o preço da comida subiu muito em 2010 e 2011.</li>
            <li><strong>Censura e corrupção:</strong> a imprensa era controlada e as eleições não eram livres.</li>
            <li><strong>Redes sociais:</strong> ajudaram a marcar protestos e a mostrar a repressão. No Egito, o governo chegou a desligar a internet do país inteiro em janeiro de 2011.</li>
          </ul>

          <h3>O que aconteceu em cada país</h3>
          <div class="tab-wrap">
            <table class="tab-camadas">
              <thead><tr><th scope="col">País</th><th scope="col">Início</th><th scope="col">Resultado</th></tr></thead>
              <tbody>
                <tr><th scope="row">Tunísia</th><td class="n">dez. 2010</td><td>Ben Ali fugiu. O país fez eleições livres, mas a democracia voltou a enfraquecer a partir de 2021</td></tr>
                <tr><th scope="row">Egito</th><td class="n">jan. 2011</td><td>Mubarak renunciou após 18 dias de protestos na Praça Tahrir. Em 2013, um golpe militar voltou a fechar o regime</td></tr>
                <tr><th scope="row">Líbia</th><td class="n">fev. 2011</td><td>Guerra civil com intervenção da OTAN. Kadafi foi morto em outubro de 2011 e o país segue dividido</td></tr>
                <tr><th scope="row">Síria</th><td class="n">mar. 2011</td><td>A repressão de Bashar al-Assad levou a uma longa guerra civil. Assad só caiu em dezembro de 2024</td></tr>
                <tr><th scope="row">Iêmen</th><td class="n">jan. 2011</td><td>O presidente deixou o poder em 2012, e o país entrou em guerra civil poucos anos depois</td></tr>
                <tr><th scope="row">Bahrein</th><td class="n">fev. 2011</td><td>Os protestos foram reprimidos com apoio de tropas da Arábia Saudita</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Consequências geográficas</h3>
          <p>Em vez da "primavera" esperada, vários países viveram anos de guerra. A guerra na Síria provocou uma das maiores crises de refugiados do século: mais de 6 milhões de sírios deixaram o país, muitos rumo à Turquia, ao Líbano, à Jordânia e à Europa. O caos também abriu espaço para grupos extremistas, como o Estado Islâmico, que chegou a controlar partes da Síria e do Iraque.</p>
          <p>Os pesquisadores lembram que as redes sociais não "fizeram" a revolução. As causas eram sociais, econômicas e políticas. A internet foi uma ferramenta que acelerou e espalhou os protestos.</p>

          <div class="nota">
            <p class="rotulo">Por que "primavera"?</p>
            <p>O nome lembra outros movimentos por liberdade, como a Primavera dos Povos, as revoluções que se espalharam pela Europa em 1848, e a Primavera de Praga, na antiga Tchecoslováquia, em 1968.</p>
          </div>
        `,
        numeros: [
          ["23 anos", "de Ben Ali no poder na Tunísia"],
          ["18 dias", "de protestos derrubaram Mubarak no Egito"],
          ["42 anos", "de Kadafi no poder na Líbia"],
          ["6 mi+", "de refugiados sírios fora do país"]
        ],
        questao: {
          texto: [
            "Em dezembro de 2010, protestos começaram na Tunísia após um vendedor ambulante atear fogo ao próprio corpo depois de ter suas mercadorias apreendidas. Em poucas semanas, manifestações semelhantes tomaram o Egito, a Líbia, a Síria, o Iêmen e o Bahrein. Vídeos gravados com celulares eram compartilhados nas redes sociais e reproduzidos por emissoras de TV."
          ],
          fonte: "Texto elaborado para o Caderno de Campo.",
          enunciado: "A rápida difusão dos protestos da Primavera Árabe pela região pode ser explicada",
          alternativas: [
            "pelo apoio dos governos autoritários da região às manifestações populares.",
            "por problemas comuns aos países, como autoritarismo e desemprego, somados ao uso de celulares e redes sociais para organizar os atos e divulgar a repressão.",
            "pela decisão dos países árabes de parar de exportar petróleo.",
            "pela vitória de partidos comunistas nas eleições da região.",
            "pela unificação dos países árabes em um único Estado."
          ],
          correta: 1,
          resolucao: "Os países tinham problemas parecidos, como governos longos e autoritários, jovens sem emprego e alimentos caros. As redes sociais ajudaram a convocar os atos e a mostrar a repressão, o que acelerou o efeito dominó. A alternativa A inverte a situação, porque os governos reprimiram os protestos. As alternativas C, D e E citam acontecimentos que não ocorreram."
        }
      }
    ],
    fontes: [
      { nome: "Agência da ONU para Refugiados (ACNUR)", url: "https://www.acnur.org", descricao: "Dados sobre refugiados no mundo, incluindo os da Síria." },
      { nome: "BBC News Brasil", url: "https://www.bbc.com/portuguese", descricao: "Reportagens sobre o Oriente Médio e a Primavera Árabe." },
      { nome: "Cetic.br", url: "https://cetic.br", descricao: "Pesquisas sobre o uso da internet no Brasil." }
    ]
  }
];
