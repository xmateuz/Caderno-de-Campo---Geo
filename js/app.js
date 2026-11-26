/* ==========================================================================
   Caderno de Campo — monta as páginas do trabalho a partir de js/posts.js
   Páginas: Início, Publicações, Sobre e a página de cada publicação.
   ========================================================================== */
(function () {
  'use strict';

  var B = window.BLOG || {};
  var NOME = B.nome || 'Caderno de Campo';
  var AUTORES = B.autores || [];
  var NOMES = AUTORES.length > 1 ? AUTORES.slice(0, -1).join(', ') + ' e ' + AUTORES[AUTORES.length - 1] : (AUTORES[0] || '');
  var POSTS = (window.POSTS || []).slice().sort(function (a, b) { return a.data < b.data ? -1 : (a.data > b.data ? 1 : 0); });
  POSTS.forEach(function (p, i) { p._n = p.numero || i + 1; });

  var main = document.getElementById('conteudo');
  var reduz = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var MESES_L = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var CORES = ['p1', 'p2', 'p3'];
  var LETRAS = 'ABCDE';

  /* ---------------------------------------------------------------- utilidades */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function partes(iso) { var p = String(iso).split('-'); return [+p[0], +p[1], +p[2]]; }
  function dataCurta(iso) { var p = partes(iso); return p[2] + ' ' + MESES[p[1] - 1] + ' ' + p[0]; }
  function dataLonga(iso) { var p = partes(iso); return p[2] + ' de ' + MESES_L[p[1] - 1] + ' de ' + p[0]; }
  function mesAno(iso) { var p = partes(iso); var m = MESES_L[p[1] - 1]; return m.charAt(0).toUpperCase() + m.slice(1) + ' de ' + p[0]; }
  function semAcento(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function semTags(html) { return String(html || '').replace(/<[^>]*>/g, ' '); }
  function iniciais(nome) {
    return String(nome || '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }
  function cor(i) { var c = CORES[i % CORES.length]; return '--pc:var(--' + c + ');--pc-tint:var(--' + c + '-tint)'; }
  function rotulo(p) { return 'Publicação ' + pad(p._n); }
  function capa(p) { return p.capa || (p.cards && p.cards[0] && p.cards[0].imagem) || ''; }
  function questoes(p) {
    var q = [];
    (p.cards || []).forEach(function (c, i) { if (c.questao) q.push({ q: c.questao, parte: i }); });
    return q;
  }
  function textoDoPost(p) {
    return [p.manchete, p.resumo, p.categoria, (p.tags || []).join(' ')].concat((p.cards || []).map(function (c) {
      return [c.parte, c.titulo, c.lead, semTags(c.conteudo)].join(' ');
    })).join(' ');
  }
  function minutos(p) { return Math.max(1, Math.round(textoDoPost(p).trim().split(/\s+/).length / 200)); }
  function avatares() {
    return '<span class="avatares" aria-hidden="true">' + AUTORES.map(function (a) {
      return '<span class="avatar">' + esc(iniciais(a)) + '</span>';
    }).join('') + '</span>';
  }
  function total(fn) { return POSTS.reduce(function (s, p) { return s + fn(p); }, 0); }
  function contagem(campo) {
    var m = {};
    POSTS.forEach(function (p) {
      (campo === 'tags' ? (p.tags || []) : [p[campo]]).forEach(function (x) { if (x) m[x] = (m[x] || 0) + 1; });
    });
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a] || a.localeCompare(b, 'pt-BR'); }).map(function (k) { return [k, m[k]]; });
  }

  /* Ilustrações em SVG ganham ids únicos, para a mesma figura poder aparecer mais de uma vez na página. */
  var contaSvg = 0;
  function ehSvg(src) { return /^\s*<svg/i.test(src || ''); }
  function imagem(src, alt) {
    if (!src) return '';
    if (ehSvg(src)) {
      var suf = '-u' + (++contaSvg);
      return src.replace(/\bid="([^"]+)"/g, 'id="$1' + suf + '"')
        .replace(/url\(#([^)]+)\)/g, 'url(#$1' + suf + ')')
        .replace(/aria-labelledby="([^"]+)"/g, function (m, ids) {
          return 'aria-labelledby="' + ids.split(/\s+/).map(function (i) { return i + suf; }).join(' ') + '"';
        });
    }
    return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }
  function decorativa(src) { return imagem(src, '').replace('role="img"', 'aria-hidden="true" focusable="false"'); }

  /* ---------------------------------------------------------------- Início */
  function pgInicio() {
    var ano = POSTS.length ? partes(POSTS[0].data)[0] : '';
    var h = '<section class="cab cab-home" aria-labelledby="home-t"><canvas class="contornos" data-semente="2" aria-hidden="true"></canvas>' +
      '<div class="wrap"><div class="col cab-in">' +
        '<p class="eyebrow">' + esc(B.slogan || 'Trabalho de Geografia') + (ano ? ' · ' + ano : '') + '</p>' +
        '<h1 id="home-t">Caderno de <em>Campo</em></h1>' +
        '<p class="cab-lead">' + esc(B.descricao || '') + '</p>' +
        '<div class="cab-rodape">' +
          '<div class="autores">' + avatares() + '<span><strong>' + esc(NOMES) + '</strong><small>' + esc(B.autorPapel || 'Autores') + '</small></span></div>' +
          '<dl class="numeros-trab">' +
            '<div><dt>Publicações</dt><dd>' + POSTS.length + '</dd></div>' +
            '<div><dt>Partes</dt><dd>' + total(function (p) { return (p.cards || []).length; }) + '</dd></div>' +
            '<div><dt>Questões ENEM</dt><dd>' + total(function (p) { return questoes(p).length; }) + '</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div></div></section>';

    h += '<section class="wrap secao" aria-labelledby="pubs-t"><div class="col">' +
      '<div class="secao-topo"><div><p class="eyebrow">Sumário</p><h2 id="pubs-t">As três publicações</h2>' +
      '<p>Cada publicação explica um tema em partes, com uma figura, os números principais e uma questão no estilo ENEM para cada parte.</p></div></div>' +
      '<ol class="pubs">' + POSTS.map(cartaoPub).join('') + '</ol></div></section>';

    var cats = contagem('categoria');
    var tags = contagem('tags');
    h += '<section class="wrap secao" aria-labelledby="exp-t"><div class="col">' +
      '<div class="secao-topo"><div><p class="eyebrow">Explorar</p><h2 id="exp-t">Encontre um assunto</h2></div></div>' +
      '<div class="explorar">' +
        '<div class="painel"><h3><label for="busca-inicio">Buscar nas publicações</label></h3>' +
          '<form class="busca" data-busca role="search"><input class="campo" type="search" id="busca-inicio" placeholder="Ex.: magma, Cerrado, Tunísia"><button type="submit">Buscar</button></form>' +
          '<ul class="cats">' + cats.map(function (c) {
            return '<li><button type="button" data-categoria="' + esc(c[0]) + '">' + esc(c[0]) + ' <span>' + c[1] + (c[1] === 1 ? ' publicação' : ' publicações') + '</span></button></li>';
          }).join('') + '</ul></div>' +
        '<div class="painel"><h3>Temas</h3><div class="tags">' + tags.map(function (t) {
          return '<button type="button" class="tag" data-tag="' + esc(t[0]) + '">' + esc(t[0]) + '</button>';
        }).join('') + '</div></div>' +
      '</div></div></section>';
    return h;
  }

  function cartaoPub(p) {
    return '<li><article class="pub">' +
      '<div class="pub-fig">' + decorativa(capa(p)) + '</div>' +
      '<div class="pub-corpo">' +
        '<div class="pub-num"><span class="eyebrow">' + rotulo(p) + '</span><span class="chip">' + esc(p.categoria) + '</span></div>' +
        '<h3><a href="#' + esc(p.id) + '">' + esc(p.manchete) + '</a></h3>' +
        '<p class="pub-resumo">' + esc(p.resumo) + '</p>' +
        '<ol class="pub-partes">' + (p.cards || []).map(function (c, i) {
          return '<li style="' + cor(i) + '"><a href="#' + esc(p.id) + '--parte-' + (i + 1) + '"><b>' + pad(i + 1) + '</b>' + esc(c.parte) + '</a></li>';
        }).join('') + '</ol>' +
        '<div class="pub-pe"><span>' + dataCurta(p.data) + ' · ' + minutos(p) + ' min</span><span class="pub-ler">Ler <span aria-hidden="true">→</span></span></div>' +
      '</div></article></li>';
  }

  /* ---------------------------------------------------------------- Publicação */
  function pgPost(p) {
    var i = POSTS.indexOf(p);
    var ant = POSTS[i - 1], prox = POSTS[i + 1];
    var totalP = (p.cards || []).length;
    var qs = questoes(p);
    var h = '<header class="cab cab-post"><canvas class="contornos" data-semente="' + (p._n + 5) + '" aria-hidden="true"></canvas>' +
      '<div class="wrap"><div class="col cab-in">' +
        '<nav class="trilha" aria-label="Você está em"><a href="#inicio">Início</a><span aria-hidden="true">/</span><a href="#arquivo">Publicações</a><span aria-hidden="true">/</span><span aria-current="page">' + rotulo(p) + '</span></nav>' +
        '<div class="chips-linha"><span class="eyebrow">' + rotulo(p) + '</span><span class="chip">' + esc(p.categoria) + '</span></div>' +
        '<h1>' + esc(p.manchete) + '</h1>' +
        '<p class="cab-lead">' + esc(p.resumo) + '</p>' +
        '<div class="autores">' + avatares() + '<span><strong>' + esc(NOMES) + '</strong>' +
          '<small><time datetime="' + esc(p.data) + '">' + dataLonga(p.data) + '</time> · ' + minutos(p) + ' min de leitura · ' + qs.length + ' questões</small></span></div>' +
      '</div></div></header>';

    h += '<nav class="barra-partes" aria-label="Partes desta publicação"><div class="wrap"><div class="col bp-in">' +
      '<a class="bp-titulo" href="#' + esc(p.id) + '">' + rotulo(p) + '</a><ol class="bp-links">' +
      (p.cards || []).map(function (c, k) {
        return '<li><a style="' + cor(k) + '" href="#' + esc(p.id) + '--parte-' + (k + 1) + '" data-alvo="' + esc(p.id) + '--parte-' + (k + 1) + '"><span>' + (k + 1) + '</span>' + esc(c.parte) + '</a></li>';
      }).join('') +
      (qs.length ? '<li><a href="#' + esc(p.id) + '--enem" data-alvo="' + esc(p.id) + '--enem"><span>?</span>Questões ENEM</a></li>' : '') +
      '</ol></div></div><span class="bp-prog" aria-hidden="true"></span></nav>';

    h += '<article class="post" data-post>';
    if (p.passos && p.passos.length) {
      h += '<section class="wrap resumo" aria-labelledby="' + esc(p.id) + '--resumo-t"><div class="col">' +
        '<h2 class="rotulo" id="' + esc(p.id) + '--resumo-t">Resumo em 30 segundos</h2>' +
        '<ol class="cadeia" style="--n:' + p.passos.length + '">' + p.passos.map(function (s, k) {
          return '<li><span class="passo">' + (k + 1) + '</span><strong>' + esc(s[0]) + '</strong><p>' + esc(s[1]) + '</p></li>';
        }).join('') + '</ol></div></section>';
    }
    h += '<div class="wrap"><div class="col cards">' + (p.cards || []).map(function (c, k) { return card(p, c, k, totalP, qs); }).join('') + '</div></div>';
    h += blocoEnem(p, qs);

    if (p.fontes && p.fontes.length) {
      h += '<section class="wrap secao fontes" aria-labelledby="' + esc(p.id) + '--fontes-t"><div class="col">' +
        '<div class="secao-topo"><div><p class="eyebrow">Referências</p><h2 id="' + esc(p.id) + '--fontes-t">Para ir mais fundo</h2></div></div><ul>' +
        p.fontes.map(function (f) {
          var host = String(f.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
          return '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener"><strong>' + esc(f.nome) + '</strong><span>' + esc(f.descricao) + '</span><small>' + esc(host) + ' ↗</small></a></li>';
        }).join('') + '</ul>';
      if (p.tags && p.tags.length) {
        h += '<div class="post-tags"><span class="rotulo">Temas</span>' + p.tags.map(function (t) {
          return '<button type="button" class="tag" data-tag="' + esc(t) + '">' + esc(t) + '</button>';
        }).join('') + '</div>';
      }
      h += '</div></section>';
    }

    h += '<nav class="wrap" aria-label="Outras publicações"><div class="col post-nav">' +
      (ant ? '<a class="pn" href="#' + esc(ant.id) + '"><span class="pn-dir">← ' + rotulo(ant) + '</span><strong>' + esc(ant.manchete) + '</strong></a>'
           : '<a class="pn" href="#inicio"><span class="pn-dir">← Início</span><strong>Voltar ao sumário do trabalho</strong></a>') +
      (prox ? '<a class="pn pn-d" href="#' + esc(prox.id) + '"><span class="pn-dir">' + rotulo(prox) + ' →</span><strong>' + esc(prox.manchete) + '</strong></a>'
            : '<a class="pn pn-d" href="#arquivo"><span class="pn-dir">Publicações →</span><strong>Ver todas as publicações</strong></a>') +
      '</div></nav>';
    return h + '</article>';
  }

  function card(p, c, i, totalP, qs) {
    var id = p.id + '--parte-' + (i + 1);
    var svg = ehSvg(c.imagem);
    var temNum = c.numeros && c.numeros.length;
    var h = '<section class="card" id="' + esc(id) + '" data-secao style="' + cor(i) + '" aria-labelledby="' + esc(id) + '-t">';
    if (c.imagem) {
      h += '<figure class="fig"><div class="fig-img' + (svg ? ' rolavel' : '') + '">' + imagem(c.imagem, c.imagemAlt) + '</div>' +
        '<figcaption><span><b>Figura ' + p._n + '.' + (i + 1) + '</b>' + esc(c.legenda || '') + '</span>' +
        (svg ? '<span class="deslize" aria-hidden="true">Deslize para ver a figura inteira →</span>' : '') + '</figcaption></figure>';
    }
    h += '<div class="card-head"><span class="num" aria-hidden="true">' + (i + 1) + '</span><div>' +
      '<p class="parte">Parte ' + (i + 1) + ' de ' + totalP + ' · ' + esc(c.parte) + '</p>' +
      '<h2 id="' + esc(id) + '-t">' + esc(c.titulo) + '</h2>' +
      (c.lead ? '<p class="lead">' + esc(c.lead) + '</p>' : '') + '</div></div>';
    h += '<div class="card-body' + (temNum ? '' : ' sem-numeros') + '"><div class="texto">' + (c.conteudo || '') + '</div>';
    if (temNum) {
      h += '<aside class="numeros" aria-labelledby="' + esc(id) + '-n"><h3 class="rotulo" id="' + esc(id) + '-n">Em números</h3><ul>' +
        c.numeros.map(function (n) { return '<li><strong>' + esc(n[0]) + '</strong><span>' + esc(n[1]) + '</span></li>'; }).join('') + '</ul></aside>';
    }
    h += '</div>';
    if (c.questao) {
      var nq = qs.map(function (x) { return x.parte; }).indexOf(i) + 1;
      h += '<a class="card-cta" href="#' + esc(p.id) + '--questao-' + nq + '"><span class="cta-txt"><b>Questão ' + pad(nq) + ' · estilo ENEM</b>' +
        '<span>Teste o que você aprendeu sobre ' + esc(c.parte.toLowerCase()) + '.</span></span><span class="cta-seta">Responder <span aria-hidden="true">→</span></span></a>';
    }
    return h + '</section>';
  }

  function blocoEnem(p, qs) {
    if (!qs.length) return '';
    var id = p.id + '--enem';
    var h = '<section class="wrap enem" id="' + esc(id) + '" data-secao data-enem aria-labelledby="' + esc(id) + '-t"><div class="col">' +
      '<div class="enem-head"><p class="eyebrow">Hora de praticar</p><h2 id="' + esc(id) + '-t">Questões no estilo ENEM e vestibular</h2>' +
      '<p>Uma questão sobre cada parte da publicação. Leia o texto-base, escolha uma alternativa e confira a resolução comentada.</p></div>' +
      '<div class="enem-grid"><div class="questoes">';
    qs.forEach(function (item, k) {
      var q = item.q, c = p.cards[item.parte], qid = p.id + '--questao-' + (k + 1);
      h += '<article class="questao" id="' + esc(qid) + '" style="' + cor(item.parte) + '" data-correta="' + q.correta + '" aria-labelledby="' + esc(qid) + '-t">' +
        '<div class="q-topo"><span class="q-num" id="' + esc(qid) + '-t">Questão ' + pad(k + 1) + '<small>Estilo ENEM</small></span>' +
        '<a class="q-tag" href="#' + esc(p.id) + '--parte-' + (item.parte + 1) + '">Parte ' + (item.parte + 1) + ' · ' + esc(c.parte) + '</a></div><div class="q-corpo">';
      if (q.texto && q.texto.length) {
        h += '<div class="q-texto">' + q.texto.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          (q.fonte ? '<span class="q-fonte">' + esc(q.fonte) + '</span>' : '') + '</div>';
      }
      h += '<p class="q-enunciado">' + esc(q.enunciado) + '</p><ol class="alts">' + q.alternativas.map(function (a, j) {
        return '<li><button type="button" class="alt" data-alt="' + j + '"><span class="bolha">' + LETRAS.charAt(j) + '</span><span>' + esc(a) + '</span></button></li>';
      }).join('') + '</ol>' +
        '<div class="resolucao" hidden aria-live="polite"><p class="res-titulo"><span class="res-veredito"></span><small>Gabarito: ' + LETRAS.charAt(q.correta) + '</small></p><p>' + esc(q.resolucao) + '</p></div>' +
        '</div></article>';
    });
    h += '</div><aside class="cartao" aria-labelledby="' + esc(id) + '-c"><p class="rotulo">Seu desempenho</p><h3 id="' + esc(id) + '-c">Cartão-resposta</h3>';
    qs.forEach(function (item, k) {
      h += '<div class="c-linha" data-linha="' + k + '"><a class="c-num" href="#' + esc(p.id) + '--questao-' + (k + 1) + '">' + pad(k + 1) + '</a>' +
        LETRAS.split('').map(function (L) { return '<span class="c-bolha">' + L + '</span>'; }).join('') + '</div>';
    });
    return h + '<p class="c-placar"><strong data-acertos>0</strong><span>de ' + qs.length + ' acertos</span></p>' +
      '<p class="c-msg" data-msg aria-live="polite"></p><button type="button" class="refazer" data-refazer>Refazer questões</button></aside></div></div></section>';
  }

  /* ---------------------------------------------------------------- Publicações (lista com busca e filtros) */
  var filtro = { busca: '', categoria: '', tag: '' };

  function pgArquivo() {
    var cats = contagem('categoria');
    return '<section class="cab" aria-labelledby="arq-t"><canvas class="contornos" data-semente="11" aria-hidden="true"></canvas><div class="wrap"><div class="col cab-in">' +
      '<p class="eyebrow">Publicações</p><h1 id="arq-t">Todas as publicações</h1>' +
      '<p class="cab-lead">As três publicações do trabalho, da mais antiga à mais recente. Busque por palavra ou filtre por categoria e tema.</p>' +
      '</div></div></section>' +
      '<section class="wrap" aria-label="Lista de publicações"><div class="col">' +
        '<div class="filtros">' +
          '<label class="sr" for="arq-busca">Buscar nas publicações</label>' +
          '<input class="campo" type="search" id="arq-busca" placeholder="Buscar por tema, palavra ou lugar" value="' + esc(filtro.busca) + '">' +
          '<div class="chips-filtro" role="group" aria-label="Filtrar por categoria">' +
            '<button type="button" data-categoria="" aria-pressed="' + (!filtro.categoria) + '">Todas (' + POSTS.length + ')</button>' +
            cats.map(function (c) { return '<button type="button" data-categoria="' + esc(c[0]) + '" aria-pressed="' + (filtro.categoria === c[0]) + '">' + esc(c[0]) + ' (' + c[1] + ')</button>'; }).join('') +
          '</div><p class="filtro-ativo" data-filtro-tag hidden></p>' +
        '</div>' +
        '<div id="arq-lista" aria-live="polite"></div>' +
      '</div></section>';
  }

  function desenhaLista() {
    var alvo = document.getElementById('arq-lista');
    if (!alvo) return;
    var q = semAcento(filtro.busca).trim();
    var lista = POSTS.filter(function (p) {
      if (filtro.categoria && p.categoria !== filtro.categoria) return false;
      if (filtro.tag && (p.tags || []).indexOf(filtro.tag) < 0) return false;
      if (q) {
        var t = semAcento(textoDoPost(p));
        return q.split(/\s+/).every(function (w) { return t.indexOf(w) >= 0; });
      }
      return true;
    });
    var ft = main.querySelector('[data-filtro-tag]');
    if (ft) {
      ft.hidden = !filtro.tag;
      ft.innerHTML = filtro.tag ? 'Mostrando o tema <strong>' + esc(filtro.tag) + '</strong> <button type="button" data-limpar-tag>Limpar</button>' : '';
    }
    if (!lista.length) {
      alvo.innerHTML = '<p class="vazio">Nenhuma publicação encontrada' + (q ? ' para “' + esc(filtro.busca) + '”' : '') + '. Tente outra palavra ou limpe os filtros.</p>';
      return;
    }
    var h = '', mes = '';
    lista.forEach(function (p) {
      var m = mesAno(p.data);
      if (m !== mes) { h += (mes ? '</ol>' : '') + '<h2 class="mes">' + m + '</h2><ol class="lista">'; mes = m; }
      h += '<li><article class="item"><div class="item-fig">' + decorativa(capa(p)) + '</div><div class="item-txt">' +
        '<p class="meta"><span>' + rotulo(p) + '</span><span>' + esc(p.categoria) + '</span><span>' + dataCurta(p.data) + '</span></p>' +
        '<h3><a href="#' + esc(p.id) + '">' + esc(p.manchete) + '</a></h3><p>' + esc(p.resumo) + '</p>' +
        '<div class="item-partes">' + (p.cards || []).map(function (c, i) { return '<span style="' + cor(i) + '">' + esc(c.parte) + '</span>'; }).join('') + '</div>' +
        '</div></article></li>';
    });
    alvo.innerHTML = h + '</ol>';
  }

  /* ---------------------------------------------------------------- Sobre */
  function pgSobre() {
    return '<section class="cab" aria-labelledby="sobre-t"><canvas class="contornos" data-semente="17" aria-hidden="true"></canvas><div class="wrap"><div class="col cab-in">' +
      '<p class="eyebrow">Sobre</p><h1 id="sobre-t">Sobre o trabalho</h1>' +
      '<p class="cab-lead">' + esc(B.descricao || '') + '</p></div></div></section>' +
      '<section class="wrap secao"><div class="col sobre-grid">' +
        '<div class="sobre-texto">' + (B.sobre || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        '<aside class="painel"><h2 class="rotulo" style="margin-bottom:16px">Autores</h2><ul class="autor-lista">' +
          AUTORES.map(function (a) { return '<li><span class="avatar" aria-hidden="true">' + esc(iniciais(a)) + '</span>' + esc(a) + '</li>'; }).join('') +
        '</ul></aside>' +
      '</div></section>' +
      '<section class="wrap secao" aria-labelledby="montagem-t"><div class="col">' +
        '<div class="secao-topo"><div><p class="eyebrow">Estrutura</p><h2 id="montagem-t">Como cada publicação é organizada</h2></div></div>' +
        '<ol class="montagem">' +
          '<li style="' + cor(1) + '"><span class="num-p" aria-hidden="true">1</span><strong>Manchete</strong><p>Uma frase que resume o tema da publicação, seguida de um parágrafo de abertura e de um resumo em 30 segundos.</p></li>' +
          '<li style="' + cor(0) + '"><span class="num-p" aria-hidden="true">2</span><strong>Partes com figura</strong><p>O tema é dividido em partes. Cada uma tem uma figura numerada no topo, a explicação e os números mais importantes.</p></li>' +
          '<li style="' + cor(2) + '"><span class="num-p" aria-hidden="true">3</span><strong>Questões estilo ENEM</strong><p>Uma questão sobre cada parte, com texto-base, alternativas de A a E e resolução comentada.</p></li>' +
        '</ol></div></section>';
  }

  /* ---------------------------------------------------------------- Rotas */
  var rotaAtual = null, postAtual = null;

  function lerRota() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h || h === 'inicio') return { tipo: 'inicio' };
    if (h === 'arquivo' || h === 'sobre') return { tipo: h };
    var base = h.split('--')[0];
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].id === base) return { tipo: 'post', post: POSTS[i], ancora: h !== base ? h : null };
    }
    return { tipo: 'inicio' };
  }

  function render(inicial) {
    var r = lerRota();
    var mesmo = r.tipo === 'post' && rotaAtual === 'post' && postAtual === r.post;
    if (!mesmo) {
      contaSvg = 0;
      main.innerHTML = r.tipo === 'post' ? pgPost(r.post) : r.tipo === 'arquivo' ? pgArquivo() : r.tipo === 'sobre' ? pgSobre() : pgInicio();
      rotaAtual = r.tipo; postAtual = r.post || null;
      ligar();
      if (!inicial) { main.classList.remove('entrando'); void main.offsetWidth; main.classList.add('entrando'); }
      document.title = r.tipo === 'post' ? r.post.manchete + ' · ' + NOME : r.tipo === 'arquivo' ? 'Publicações · ' + NOME : r.tipo === 'sobre' ? 'Sobre · ' + NOME : NOME;
      document.querySelectorAll('[data-menu]').forEach(function (a) {
        var ativo = a.getAttribute('data-menu') === r.tipo || (r.tipo === 'post' && a.getAttribute('data-menu') === 'arquivo');
        if (ativo) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
    }
    if (r.ancora) {
      var el = document.getElementById(r.ancora);
      if (el) requestAnimationFrame(function () { el.scrollIntoView({ behavior: (reduz || inicial || !mesmo) ? 'auto' : 'smooth', block: 'start' }); });
    } else if (!mesmo && !inicial) {
      window.scrollTo(0, 0);
    } else if (mesmo) {
      window.scrollTo({ top: 0, behavior: reduz ? 'auto' : 'smooth' });
    }
    atualizaBarra();
  }

  function irArquivo() {
    if (rotaAtual === 'arquivo') {
      main.querySelectorAll('[data-categoria]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-categoria') === filtro.categoria)); });
      var campo = document.getElementById('arq-busca');
      if (campo && campo.value !== filtro.busca) campo.value = filtro.busca;
      desenhaLista();
    } else {
      location.hash = 'arquivo';
    }
  }

  /* ---------------------------------------------------------------- Eventos de cada página */
  var espiao = null;

  function ligar() {
    main.querySelectorAll('[data-enem]').forEach(ligarEnem);
    main.querySelectorAll('[data-regua]').forEach(ligarRegua);

    var form = main.querySelector('[data-busca]');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      filtro = { busca: form.querySelector('input').value.trim(), categoria: '', tag: '' };
      irArquivo();
    });
    var campo = document.getElementById('arq-busca');
    if (campo) {
      campo.addEventListener('input', function () { filtro.busca = campo.value; desenhaLista(); });
      desenhaLista();
    }

    if (espiao) { espiao.disconnect(); espiao = null; }
    var links = main.querySelectorAll('.bp-links a');
    if (links.length && 'IntersectionObserver' in window) {
      espiao = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            var ativo = a.getAttribute('data-alvo') === en.target.id;
            a.setAttribute('aria-current', ativo ? 'true' : 'false');
            if (ativo && a.scrollIntoView) {
              var ul = a.closest('.bp-links');
              ul.scrollTo({ left: a.offsetLeft - ul.clientWidth / 2 + a.clientWidth / 2, behavior: reduz ? 'auto' : 'smooth' });
            }
          });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      main.querySelectorAll('[data-secao]').forEach(function (s) { espiao.observe(s); });
    }
    contornos();
  }

  main.addEventListener('click', function (e) {
    if (e.target.closest('[data-limpar-tag]')) { filtro.tag = ''; desenhaLista(); return; }
    var b = e.target.closest('[data-categoria],[data-tag]');
    if (!b || !main.contains(b) || b.closest('[data-regua]')) return;
    if (rotaAtual !== 'arquivo') filtro.busca = '';
    if (b.hasAttribute('data-tag')) { filtro.tag = b.getAttribute('data-tag'); filtro.categoria = ''; }
    else { filtro.categoria = b.getAttribute('data-categoria'); filtro.tag = ''; }
    irArquivo();
  });
  window.addEventListener('hashchange', function () { render(false); });

  /* barra de leitura */
  function atualizaBarra() {
    var barra = main.querySelector('.bp-prog');
    var art = main.querySelector('[data-post]');
    if (!barra || !art) return;
    var r = art.getBoundingClientRect();
    var tot = r.height - window.innerHeight;
    var f = tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 1;
    barra.style.transform = 'scaleX(' + f.toFixed(4) + ')';
  }
  window.addEventListener('scroll', atualizaBarra, { passive: true });
  window.addEventListener('resize', atualizaBarra);

  /* ---------------------------------------------------------------- Questões estilo ENEM */
  function ligarEnem(sec) {
    var qs = Array.prototype.slice.call(sec.querySelectorAll('.questao'));
    var acertos = sec.querySelector('[data-acertos]');
    var msg = sec.querySelector('[data-msg]');
    function atualiza() {
      var feitas = 0, certas = 0;
      qs.forEach(function (q, k) {
        var bolhas = sec.querySelectorAll('[data-linha="' + k + '"] .c-bolha');
        bolhas.forEach(function (b) { b.className = 'c-bolha'; });
        if (q.dataset.resp == null) return;
        feitas++;
        var r = +q.dataset.resp, c = +q.dataset.correta;
        if (r === c) { certas++; bolhas[r].classList.add('certa'); }
        else { bolhas[r].classList.add('errada'); bolhas[c].classList.add('gabarito'); }
      });
      acertos.textContent = certas;
      if (feitas < qs.length) msg.textContent = feitas ? 'Faltam ' + (qs.length - feitas) + ' de ' + qs.length + ' questões.' : 'Responda as questões para preencher o cartão.';
      else msg.textContent = certas === qs.length ? 'Você acertou todas. Ótimo domínio do tema!'
        : certas >= qs.length / 2 ? 'Bom resultado. Releia a resolução das que errou.'
        : 'Vale reler as partes da publicação e tentar de novo.';
    }
    qs.forEach(function (q) {
      var correta = +q.dataset.correta;
      var alts = Array.prototype.slice.call(q.querySelectorAll('.alt'));
      alts.forEach(function (b) {
        b.addEventListener('click', function () {
          if (q.dataset.resp != null) return;
          var escolha = +b.dataset.alt;
          q.dataset.resp = escolha;
          alts.forEach(function (o) { o.disabled = true; if (+o.dataset.alt === correta) o.classList.add('certa'); });
          if (escolha !== correta) b.classList.add('errada');
          var res = q.querySelector('.resolucao');
          var v = res.querySelector('.res-veredito');
          var ok = escolha === correta;
          res.className = 'resolucao ' + (ok ? 'ok' : 'erro');
          v.className = 'res-veredito ' + (ok ? 'certo' : 'errado');
          v.textContent = ok ? 'Resposta certa.' : 'Resposta errada. Veja por quê:';
          res.hidden = false;
          atualiza();
        });
      });
    });
    sec.querySelector('[data-refazer]').addEventListener('click', function () {
      qs.forEach(function (q) {
        delete q.dataset.resp;
        q.querySelectorAll('.alt').forEach(function (o) { o.disabled = false; o.classList.remove('certa', 'errada'); });
        q.querySelector('.resolucao').hidden = true;
      });
      atualiza();
      qs[0].scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });
    });
    atualiza();
  }

  /* ---------------------------------------------------------------- Régua de magnitudes (Publicação 01) */
  var CATS = [
    { ate: 3, nome: 'Micro', cor: '#8DB580', tinta: '#14200F', efeito: 'Quase nunca é sentido. Só os sismógrafos registram.', ano: 'Cerca de 1,3 milhão', faixa: 'magnitudes 2,0 a 2,9' },
    { ate: 4, nome: 'Pequeno', cor: '#B9C46A', tinta: '#1C1F08', efeito: 'Sentido por algumas pessoas paradas. Lustres e objetos pendurados balançam.', ano: 'Cerca de 130 mil', faixa: 'magnitudes 3,0 a 3,9' },
    { ate: 5, nome: 'Leve', cor: '#E3C04F', tinta: '#241B04', efeito: 'Sentido pela maioria das pessoas perto do epicentro. Louças e janelas chacoalham.', ano: 'Cerca de 13 mil', faixa: 'magnitudes 4,0 a 4,9' },
    { ate: 6, nome: 'Moderado', cor: '#EC9A3A', tinta: '#251404', efeito: 'Pode rachar paredes e derrubar construções frágeis.', ano: 'Cerca de 1.300', faixa: 'magnitudes 5,0 a 5,9' },
    { ate: 7, nome: 'Forte', cor: '#E2652B', tinta: '#1F0C03', efeito: 'Pode ser destrutivo em áreas povoadas até cerca de 100 km do epicentro.', ano: 'Cerca de 130', faixa: 'magnitudes 6,0 a 6,9' },
    { ate: 8, nome: 'Grande', cor: '#CC3B2A', tinta: '#FFFFFF', efeito: 'Causa danos graves em uma região extensa.', ano: 'Cerca de 15', faixa: 'magnitudes 7,0 a 7,9' },
    { ate: 99, nome: 'Enorme', cor: '#8F1D2C', tinta: '#FFFFFF', efeito: 'Pode destruir cidades inteiras e, no mar, gerar tsunamis.', ano: 'Cerca de 1', faixa: 'magnitude 8 ou mais' }
  ];
  var EVENTOS = [
    { m: 4.9, local: 'Itacarambi (MG)', ano: 2007, nota: 'a primeira morte por terremoto registrada no Brasil' },
    { m: 6.2, local: 'Serra do Tombador (MT)', ano: 1955, nota: 'o maior já medido no Brasil' },
    { m: 7.8, local: 'Turquia e Síria', ano: 2023, nota: 'um dos mais mortais deste século' },
    { m: 9.1, local: 'Oceano Índico', ano: 2004, nota: 'gerou o tsunami que atingiu 14 países' },
    { m: 9.5, local: 'Valdivia (Chile)', ano: 1960, nota: 'o maior já registrado' }
  ];
  function fmtMag(m) { return m.toFixed(1).replace('.', ','); }
  function grande(v) {
    if (v < 10) return v.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    if (v < 10000) return Math.round(v).toLocaleString('pt-BR');
    var unid = [[1e12, 'trilhão', 'trilhões'], [1e9, 'bilhão', 'bilhões'], [1e6, 'milhão', 'milhões'], [1e3, 'mil', 'mil']];
    for (var i = 0; i < unid.length; i++) {
      var u = unid[i];
      if (v >= u[0]) {
        var x = v / u[0];
        var t = x < 10 ? x.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : Math.round(x).toLocaleString('pt-BR');
        return t + ' ' + (x < 2 ? u[1] : u[2]);
      }
    }
    return String(v);
  }
  function com(s, palavra) { return /(milh|bilh|trilh)/.test(s) ? s + ' de ' + palavra : s + ' ' + palavra; }

  function ligarRegua(rg) {
    var input = rg.querySelector('[data-mag-input]');
    var num = rg.querySelector('[data-mag-num]'), cat = rg.querySelector('[data-mag-cat]');
    var energia = rg.querySelector('[data-mag-energia]'), efeito = rg.querySelector('[data-mag-efeito]');
    var freq = rg.querySelector('[data-mag-freq]'), caso = rg.querySelector('[data-mag-caso]');
    var marcas = rg.querySelector('[data-marcas]'), chips = rg.querySelector('[data-chips]');
    var botoes = [], min = parseFloat(input.min), max = parseFloat(input.max);
    EVENTOS.forEach(function (ev) {
      var mk = document.createElement('span');
      mk.style.left = ((ev.m - min) / (max - min) * 100) + '%';
      mk.title = ev.local + ', ' + ev.ano;
      marcas.appendChild(mk);
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = ev.local + ' · ' + ev.ano + ' · ' + fmtMag(ev.m);
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { input.value = ev.m; atualiza(); });
      chips.appendChild(b);
      botoes.push(b);
    });
    function atualiza() {
      var m = parseFloat(input.value);
      num.textContent = fmtMag(m);
      var c = CATS[CATS.length - 1];
      for (var i = 0; i < CATS.length; i++) { if (m < CATS[i].ate - 1e-9) { c = CATS[i]; break; } }
      cat.textContent = c.nome;
      rg.style.setProperty('--cat', c.cor);
      rg.style.setProperty('--cat-ink', c.tinta);
      var r = Math.pow(10, 1.5 * (m - 4));
      var rel = Math.abs(m - 4) < 0.05 ? 'A mesma de um tremor de magnitude 4'
        : r > 1 ? '≈ ' + com(grande(r), 'vezes') + ' a de um tremor de magnitude 4'
        : '≈ ' + com(grande(1 / r), 'vezes') + ' menos que um tremor de magnitude 4';
      var ton = Math.pow(10, 1.5 * m + 4.8) / 4.184e9;
      var tnt = ton < 1 ? 'cerca de ' + grande(ton * 1000) + ' kg de TNT' : 'cerca de ' + com(grande(ton), 'toneladas') + ' de TNT';
      energia.textContent = rel + ', ou ' + tnt + '.';
      efeito.textContent = c.efeito;
      freq.textContent = c.ano + ' (' + c.faixa + ').';
      var melhor = EVENTOS[0];
      EVENTOS.forEach(function (ev) { if (Math.abs(ev.m - m) < Math.abs(melhor.m - m) - 1e-9) melhor = ev; });
      caso.textContent = melhor.local + ', ' + melhor.ano + ', magnitude ' + fmtMag(melhor.m) + ': ' + melhor.nota + '.';
      botoes.forEach(function (b, k) { b.setAttribute('aria-pressed', Math.abs(EVENTOS[k].m - m) < 0.05 ? 'true' : 'false'); });
    }
    input.addEventListener('input', atualiza);
    atualiza();
  }

  /* ---------------------------------------------------------------- Curvas de nível dos cabeçalhos */
  function hashR(i, j, s) { var v = Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); }
  function suave(t) { return t * t * (3 - 2 * t); }
  function ruido(x, y, s) {
    var i = Math.floor(x), j = Math.floor(y), u = suave(x - i), v = suave(y - j);
    var a = hashR(i, j, s), b = hashR(i + 1, j, s), c = hashR(i, j + 1, s), d = hashR(i + 1, j + 1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function relevo(x, y, s) { return ruido(x, y, s) * .62 + ruido(x * 2.1 + 5.3, y * 2.1 + 1.7, s) * .26 + ruido(x * 4.3 + 9.1, y * 4.3 + 3.3, s) * .12; }

  function desenhaCanvas(tela) {
    var pai = tela.parentElement;
    var w = Math.round(pai.clientWidth), h = Math.round(pai.clientHeight);
    if (!w || !h) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    tela.width = w * dpr; tela.height = h * dpr;
    var ctx = tela.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var rgb = getComputedStyle(document.documentElement).getPropertyValue('--contorno').trim() || '31,95,85';
    var s = +tela.getAttribute('data-semente') || 1;
    var passo = 10, nx = Math.ceil(w / passo) + 1, ny = Math.ceil(h / passo) + 1;
    var f = new Float32Array(nx * ny), mn = Infinity, mx = -Infinity;
    for (var j = 0; j < ny; j++) for (var i = 0; i < nx; i++) {
      var val = relevo(i * passo / 300, j * passo / 300, s);
      f[j * nx + i] = val; if (val < mn) mn = val; if (val > mx) mx = val;
    }
    var niveis = 16;
    for (var k = 1; k < niveis; k++) {
      var t = mn + (mx - mn) * k / niveis, mestra = k % 4 === 0;
      ctx.strokeStyle = 'rgba(' + rgb + ',' + (mestra ? .34 : .16) + ')';
      ctx.lineWidth = mestra ? 1.2 : .8;
      ctx.beginPath();
      for (j = 0; j < ny - 1; j++) for (i = 0; i < nx - 1; i++) {
        var a = f[j * nx + i], b = f[j * nx + i + 1], c = f[(j + 1) * nx + i + 1], d = f[(j + 1) * nx + i];
        var caso = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
        if (caso === 0 || caso === 15) continue;
        var x = i * passo, y = j * passo;
        var topo = [x + passo * (t - a) / (b - a), y], dir = [x + passo, y + passo * (t - b) / (c - b)];
        var base = [x + passo * (t - d) / (c - d), y + passo], esq = [x, y + passo * (t - a) / (d - a)];
        var seg;
        switch (caso) {
          case 1: case 14: seg = [esq, base]; break;
          case 2: case 13: seg = [base, dir]; break;
          case 3: case 12: seg = [esq, dir]; break;
          case 4: case 11: seg = [topo, dir]; break;
          case 6: case 9: seg = [topo, base]; break;
          case 7: case 8: seg = [esq, topo]; break;
          case 5: seg = [esq, topo, base, dir]; break;
          default: seg = [topo, dir, esq, base];
        }
        for (var q = 0; q < seg.length; q += 2) { ctx.moveTo(seg[q][0], seg[q][1]); ctx.lineTo(seg[q + 1][0], seg[q + 1][1]); }
      }
      ctx.stroke();
    }
  }
  var obsTam = window.ResizeObserver ? new ResizeObserver(function (ents) {
    ents.forEach(function (en) { var c = en.target.querySelector(':scope > .contornos'); if (c) desenhaCanvas(c); });
  }) : null;
  function contornos() {
    if (obsTam) obsTam.disconnect();
    main.querySelectorAll('.contornos').forEach(function (c) {
      if (!c.getContext) return;
      desenhaCanvas(c);
      if (obsTam) obsTam.observe(c.parentElement);
    });
  }
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', contornos);
  }
  if (window.MutationObserver) new MutationObserver(contornos).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ---------------------------------------------------------------- Topo e rodapé */
  document.querySelectorAll('[data-blog="nome"]').forEach(function (el) { el.textContent = NOME; });
  document.querySelectorAll('[data-blog="slogan"]').forEach(function (el) { el.textContent = B.slogan || ''; });
  var rod = document.getElementById('rodape');
  if (rod) {
    var ano = POSTS.length ? partes(POSTS[POSTS.length - 1].data)[0] : new Date().getFullYear();
    rod.innerHTML = '<div class="rodape-marca"><b>' + esc(NOME) + '</b><p>' + esc(B.descricao || '') + '</p></div>' +
      '<div><h2>Publicações</h2><ul>' + POSTS.map(function (p) { return '<li><a href="#' + esc(p.id) + '">' + rotulo(p) + ' · ' + esc((p.cards || []).map(function (c) { return c.parte; }).join(', ')) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h2>Navegação</h2><ul><li><a href="#inicio">Início</a></li><li><a href="#arquivo">Publicações</a></li><li><a href="#sobre">Sobre o trabalho</a></li></ul></div>' +
      '<div class="rodape-base"><span>' + esc(B.slogan || '') + ' · ' + esc(NOMES) + ' · ' + ano + '</span><span>Figuras desenhadas para este trabalho</span></div>';
  }

  render(true);
})();
