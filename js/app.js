/* ==========================================================================
   Caderno de Campo — motor do blog
   Lê BLOG e POSTS (js/posts.js) e monta as páginas: Início, Post, Posts e Sobre.
   Para publicar um post novo você NÃO precisa mexer neste arquivo.
   ========================================================================== */
(function () {
  'use strict';

  var B = window.BLOG || {};
  var NOME = B.nome || 'Blog';
  var AUTORES = B.autores || (B.autor ? [B.autor] : []);
  var NOMES = AUTORES.length > 1 ? AUTORES.slice(0, -1).join(', ') + ' e ' + AUTORES[AUTORES.length - 1] : (AUTORES[0] || '');
  var POSTS = (window.POSTS || []).slice().sort(function (a, b) {
    return a.data < b.data ? 1 : (a.data > b.data ? -1 : 0);
  });
  POSTS.forEach(function (p, i) { p._n = POSTS.length - i; });

  var hero = document.getElementById('hero');
  var main = document.getElementById('conteudo');
  var barra = document.getElementById('progresso');
  var banda = document.getElementById('banda');
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
  function addDias(iso, n) {
    var p = partes(iso);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + n));
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }
  function semAcento(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function semTags(html) { return String(html || '').replace(/<[^>]*>/g, ' '); }
  function iniciais(nome) {
    return String(nome || '').split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }
  function avatares() {
    return '<span class="avatares" aria-hidden="true">' + AUTORES.map(function (a) {
      return '<span class="avatar">' + esc(iniciais(a)) + '</span>';
    }).join('') + '</span>';
  }
  function cor(i) { var c = CORES[i % CORES.length]; return '--pc:var(--' + c + ');--pc-tint:var(--' + c + '-tint)'; }
  function semana(p) { return p.semana || p._n; }
  function rotuloSemana(p) { return 'Semana ' + pad(semana(p)); }
  function proximaData() { return POSTS.length ? addDias(POSTS[0].data, B.intervaloDias || 7) : null; }
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

  /* Imagens: aceita SVG desenhado (texto que começa com <svg) ou caminho de arquivo ("img/foto.jpg").
     Cada SVG ganha ids únicos, para a mesma ilustração poder aparecer mais de uma vez na página. */
  var contaSvg = 0;
  function ehSvg(src) { return /^\s*<svg/i.test(src || ''); }
  function imagem(src, alt) {
    if (!src) return '';
    if (ehSvg(src)) {
      contaSvg++;
      var suf = '-u' + contaSvg;
      return src
        .replace(/\bid="([^"]+)"/g, 'id="$1' + suf + '"')
        .replace(/url\(#([^)]+)\)/g, 'url(#$1' + suf + ')')
        .replace(/aria-labelledby="([^"]+)"/g, function (m, ids) {
          return 'aria-labelledby="' + ids.split(/\s+/).map(function (i) { return i + suf; }).join(' ') + '"';
        });
    }
    return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }

  function contagem(campo) {
    var m = {};
    POSTS.forEach(function (p) {
      var v = campo === 'tags' ? (p.tags || []) : [p[campo]];
      v.forEach(function (x) { if (x) m[x] = (m[x] || 0) + 1; });
    });
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a] || a.localeCompare(b, 'pt-BR'); })
      .map(function (k) { return [k, m[k]]; });
  }

  function legendaMapa() {
    return '<div class="legenda-mapa" aria-hidden="true">' +
      '<svg class="rosa" viewBox="0 0 74 92"><text x="37" y="12" text-anchor="middle">N</text>' +
      '<circle class="anel" cx="37" cy="55" r="30"/><path class="norte" d="M37 20L46 55H28Z"/><path class="sul" d="M37 90L46 55H28Z"/></svg>' +
      '<div class="escala-mapa"><div class="escala-barra"><span></span><span></span><span></span><span></span></div>Escala 1 : 1 semana</div>' +
    '</div>';
  }

  /* ---------------------------------------------------------------- pedaços reutilizados */
  function meta(p) {
    return '<p class="meta"><time datetime="' + esc(p.data) + '">' + dataCurta(p.data) + '</time>' +
      '<span>' + minutos(p) + ' min de leitura</span>' +
      '<span>' + questoes(p).length + ' questões estilo ENEM</span></p>';
  }

  function listaPartes(p) {
    return '<ul class="pi-partes">' + (p.cards || []).map(function (c, i) {
      return '<li style="' + cor(i) + '">' + esc(c.parte) + '</li>';
    }).join('') + '</ul>';
  }

  function itemPost(p, novo) {
    return '<article class="pi">' +
      '<a class="pi-img" href="#' + esc(p.id) + '" tabindex="-1" aria-hidden="true">' + imagem(capa(p), '') + '</a>' +
      '<div class="pi-txt">' +
        '<p class="pi-sup"><span class="chip">' + esc(p.categoria) + '</span><span>' + rotuloSemana(p) + ' · ' + dataCurta(p.data) + '</span>' +
          (novo ? '<span class="status novo">Novo</span>' : '') + '</p>' +
        '<h3><a href="#' + esc(p.id) + '">' + esc(p.manchete) + '</a></h3>' +
        '<p class="pi-resumo">' + esc(p.resumo) + '</p>' +
        listaPartes(p) +
      '</div></article>';
  }

  function itemProximo() {
    var d = proximaData();
    if (!d) return '';
    return '<div class="pi pi-prox">' +
      '<div class="pi-img pi-vazia" aria-hidden="true">' + pad(POSTS.length + 1) + '</div>' +
      '<div class="pi-txt">' +
        '<p class="pi-sup"><span>Semana ' + pad(POSTS.length + 1) + ' · previsto para ' + dataCurta(d) + '</span><span class="status">Em breve</span></p>' +
        '<h3>Próximo post</h3>' +
        '<p class="pi-resumo">O tema da próxima semana aparece aqui assim que for publicado.</p>' +
      '</div></div>';
  }

  function lateral() {
    var cats = contagem('categoria');
    var tags = contagem('tags');
    return '<aside class="lateral" aria-label="Sobre o blog e navegação">' +
      '<section class="caixa painel"><h2 class="rotulo">Sobre o blog</h2>' +
        '<div class="autor">' + avatares() +
        '<div><strong>' + esc(NOMES) + '</strong><small>' + esc(B.autorPapel || 'Autor') + '</small></div></div>' +
        '<p>' + esc(B.descricao) + '</p>' +
        '<a class="link-seta" href="#sobre">Saiba mais →</a></section>' +
      '<section class="caixa painel"><h2 class="rotulo"><label for="busca-lateral">Buscar no blog</label></h2>' +
        '<form class="busca" data-busca role="search"><input class="campo" type="search" id="busca-lateral" placeholder="Ex.: magma, Andes"><button type="submit">Buscar</button></form></section>' +
      '<section class="caixa painel"><h2 class="rotulo">Categorias</h2><ul class="cats">' +
        cats.map(function (c) { return '<li><button type="button" data-categoria="' + esc(c[0]) + '">' + esc(c[0]) + ' <span>' + c[1] + '</span></button></li>'; }).join('') +
      '</ul></section>' +
      '<section class="caixa painel"><h2 class="rotulo">Tags</h2><div class="tags">' +
        tags.map(function (t) { return '<button type="button" class="tag" data-tag="' + esc(t[0]) + '">#' + esc(t[0]) + '</button>'; }).join('') +
      '</div></section>' +
    '</aside>';
  }

  /* ---------------------------------------------------------------- página: Início */
  function heroInicio() {
    return '<div class="hero alto"><div class="hero-grid"><div>' +
      '<p class="eyebrow">' + esc(B.slogan || '') + '</p>' +
      '<h1>' + esc(NOME) + '</h1>' +
      '<p class="hero-sub">' + esc(B.descricao || '') + '</p>' +
      '</div>' + legendaMapa() + '</div></div>';
  }

  function pgInicio() {
    if (!POSTS.length) {
      return '<section class="col painel sobe caixa"><p class="vazio">Ainda não há posts. Adicione o primeiro em js/posts.js.</p></section>';
    }
    var p = POSTS[0];
    var h = '<section class="col sobe" aria-labelledby="destaque-t"><article class="pd painel">' +
      '<a class="pd-img" href="#' + esc(p.id) + '" tabindex="-1" aria-hidden="true">' + imagem(capa(p), '') + '</a>' +
      '<div class="pd-txt">' +
        '<div class="chips-topo"><span class="chip">Post da semana</span><span class="chip">' + esc(p.categoria) + '</span><span class="chip">' + rotuloSemana(p) + '</span></div>' +
        '<h2 id="destaque-t"><a href="#' + esc(p.id) + '">' + esc(p.manchete) + '</a></h2>' +
        '<p class="pd-resumo">' + esc(p.resumo) + '</p>' +
        meta(p) +
        '<a class="btn" href="#' + esc(p.id) + '">Ler o post <span aria-hidden="true">→</span></a>' +
      '</div></article></section>';

    if (p.cards && p.cards.length > 1) {
      h += '<section class="col partes" aria-labelledby="partes-t">' +
        '<div class="sec-titulo"><h2 id="partes-t">Neste post</h2><span class="sec-nota">' + p.cards.length + ' partes · 1 questão ENEM em cada</span></div>' +
        '<ol class="partes-lista">' + p.cards.map(function (c, i) {
          return '<li><a class="parte-card" style="' + cor(i) + '" href="#' + esc(p.id) + '--parte-' + (i + 1) + '">' +
            '<span class="parte-img" aria-hidden="true">' + imagem(c.imagem, '') + '</span>' +
            '<span class="parte-txt"><span class="parte-n">Parte ' + (i + 1) + ' · ' + esc(c.parte) + '</span><strong>' + esc(c.titulo) + '</strong></span>' +
          '</a></li>';
        }).join('') + '</ol></section>';
    }

    h += '<div class="col home-grid"><section class="feed painel" aria-labelledby="feed-t">' +
      '<div class="sec-titulo"><h2 id="feed-t">Todos os posts</h2><a class="sec-nota" href="#arquivo">Ver arquivo →</a></div>' +
      '<div class="feed-lista">' + itemProximo() +
      POSTS.map(function (x, i) { return itemPost(x, i === 0); }).join('') +
      '</div></section>' + lateral() + '</div>';
    return h;
  }

  /* ---------------------------------------------------------------- página: Post */
  function card(p, c, i, total) {
    var id = p.id + '--parte-' + (i + 1);
    var svg = ehSvg(c.imagem);
    var temNumeros = c.numeros && c.numeros.length;
    var h = '<section class="card" id="' + esc(id) + '" style="' + cor(i) + '" aria-labelledby="' + esc(id) + '-t">';
    if (c.imagem) {
      h += '<figure class="card-img"><div class="ilus-wrap' + (svg ? ' rolavel' : '') + '">' + imagem(c.imagem, c.imagemAlt) + '</div>';
      if (c.legenda || svg) {
        h += '<figcaption><span>' + esc(c.legenda || '') + '</span>' +
          (svg ? '<span class="deslize" aria-hidden="true">Deslize para ver tudo →</span>' : '') + '</figcaption>';
      }
      h += '</figure>';
    }
    h += '<div class="card-head"><span class="num" aria-hidden="true">' + pad(i + 1) + '</span><div>' +
      '<p class="parte">Parte ' + (i + 1) + ' de ' + total + ' · ' + esc(c.parte) + '</p>' +
      '<h2 id="' + esc(id) + '-t">' + esc(c.titulo) + '</h2>' +
      (c.lead ? '<p class="lead">' + esc(c.lead) + '</p>' : '') +
      '</div></div>';
    h += '<div class="card-body' + (temNumeros ? '' : ' sem-numeros') + '"><div class="texto">' + (c.conteudo || '') + '</div>';
    if (temNumeros) {
      h += '<aside class="numeros" aria-labelledby="' + esc(id) + '-n"><h3 class="rotulo" id="' + esc(id) + '-n">Em números</h3><ul>' +
        c.numeros.map(function (n) { return '<li><strong>' + esc(n[0]) + '</strong><span>' + esc(n[1]) + '</span></li>'; }).join('') +
        '</ul></aside>';
    }
    h += '</div>';
    if (c.questao) {
      var nq = questoes(p).map(function (x) { return x.parte; }).indexOf(i) + 1;
      h += '<a class="card-cta" href="#' + esc(p.id) + '--questao-' + nq + '">' +
        '<span class="cta-txt"><b>Questão ' + pad(nq) + ' · estilo ENEM</b><span>Teste o que você aprendeu sobre ' + esc(c.parte.toLowerCase()) + '.</span></span>' +
        '<span class="cta-seta">Responder <span aria-hidden="true">→</span></span></a>';
    }
    return h + '</section>';
  }

  function blocoEnem(p) {
    var qs = questoes(p);
    if (!qs.length) return '';
    var id = p.id + '--enem';
    var h = '<section class="col enem" id="' + esc(id) + '" aria-labelledby="' + esc(id) + '-t" data-enem>' +
      '<div class="enem-head"><p class="rotulo">Hora de praticar</p>' +
      '<h2 id="' + esc(id) + '-t">Questões no estilo ENEM e vestibular</h2>' +
      '<p>Uma questão sobre cada parte do post. Leia o texto-base, escolha uma alternativa e confira a resolução comentada.</p></div>' +
      '<div class="enem-grid"><div class="questoes">';
    qs.forEach(function (item, k) {
      var q = item.q;
      var c = p.cards[item.parte];
      var qid = p.id + '--questao-' + (k + 1);
      h += '<article class="questao" id="' + esc(qid) + '" style="' + cor(item.parte) + '" data-correta="' + q.correta + '" data-q="' + k + '" aria-labelledby="' + esc(qid) + '-t">' +
        '<div class="q-topo"><span class="q-num" id="' + esc(qid) + '-t">Questão ' + pad(k + 1) + '<small>Estilo ENEM</small></span>' +
        '<a class="q-tag" href="#' + esc(p.id) + '--parte-' + (item.parte + 1) + '">Parte ' + (item.parte + 1) + ' · ' + esc(c.parte) + '</a></div>' +
        '<div class="q-corpo">';
      if (q.texto && q.texto.length) {
        h += '<div class="q-texto">' + q.texto.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          (q.fonte ? '<span class="q-fonte">' + esc(q.fonte) + '</span>' : '') + '</div>';
      }
      h += '<p class="q-enunciado">' + esc(q.enunciado) + '</p><ol class="alts">' +
        q.alternativas.map(function (a, j) {
          return '<li><button type="button" class="alt" data-alt="' + j + '"><span class="bolha">' + LETRAS.charAt(j) + '</span><span>' + esc(a) + '</span></button></li>';
        }).join('') + '</ol>' +
        '<div class="resolucao" hidden><p class="res-titulo"><span class="res-veredito"></span><small>Gabarito: ' + LETRAS.charAt(q.correta) + '</small></p><p>' + esc(q.resolucao) + '</p></div>' +
        '</div></article>';
    });
    h += '</div><aside class="cartao painel" aria-labelledby="' + esc(id) + '-c"><p class="rotulo">Seu desempenho</p><h3 id="' + esc(id) + '-c">Cartão-resposta</h3>';
    qs.forEach(function (item, k) {
      h += '<div class="c-linha" data-linha="' + k + '"><a class="c-num" href="#' + esc(p.id) + '--questao-' + (k + 1) + '">' + pad(k + 1) + '</a>' +
        LETRAS.split('').map(function (L) { return '<span class="c-bolha">' + L + '</span>'; }).join('') + '</div>';
    });
    h += '<p class="c-placar"><strong data-acertos>0</strong><span>de ' + qs.length + ' acertos</span></p>' +
      '<p class="c-msg" data-msg aria-live="polite">Responda as questões para preencher o cartão.</p>' +
      '<button type="button" class="refazer" data-refazer>Refazer questões</button></aside></div></section>';
    return h;
  }

  function heroPost(p) {
    var total = (p.cards || []).length;
    var h = '<div class="hero alto post-hero">' +
      '<nav class="trilha" aria-label="Você está em"><a href="#inicio">Início</a><span aria-hidden="true">/</span><a href="#arquivo">Posts</a><span aria-hidden="true">/</span><span aria-current="page">' + rotuloSemana(p) + '</span></nav>' +
      '<div class="chips-topo"><span class="chip claro">' + esc(p.categoria) + '</span><span class="chip claro">' + rotuloSemana(p) + '</span></div>' +
      '<h1>' + esc(p.manchete) + '</h1>' +
      '<p class="hero-sub">' + esc(p.resumo) + '</p>' +
      '<div class="assina">' + avatares() +
        '<span><strong>Por ' + esc(NOMES) + '</strong><small><time datetime="' + esc(p.data) + '">' + dataLonga(p.data) + '</time> · ' + minutos(p) + ' min de leitura</small></span></div>';
    if (total > 1) {
      h += '<nav class="sumario" aria-label="Partes deste post">' + p.cards.map(function (c, k) {
        return '<a style="' + cor(k) + '" href="#' + esc(p.id) + '--parte-' + (k + 1) + '"><span>' + (k + 1) + '</span>' + esc(c.parte) + '</a>';
      }).join('') + (questoes(p).length ? '<a href="#' + esc(p.id) + '--enem"><span>?</span>Questões ENEM</a>' : '') + '</nav>';
    }
    return h + '</div>';
  }

  function pgPost(p) {
    var i = POSTS.indexOf(p);
    var maisNovo = POSTS[i - 1];
    var maisAntigo = POSTS[i + 1];
    var total = (p.cards || []).length;
    var h = '<article class="post">';
    var temPassos = p.passos && p.passos.length;

    if (temPassos) {
      h += '<section class="col sobe painel resumo" aria-labelledby="' + esc(p.id) + '--resumo-t">' +
        '<h2 class="rotulo" id="' + esc(p.id) + '--resumo-t">Resumo em 30 segundos</h2>' +
        '<ol class="cadeia" style="--n:' + p.passos.length + '">' + p.passos.map(function (s, k) {
          return '<li><span class="passo">' + (k + 1) + '</span><strong>' + esc(s[0]) + '</strong><p>' + esc(s[1]) + '</p></li>';
        }).join('') + '</ol></section>';
    }

    h += '<div class="col cards' + (temPassos ? '' : ' sobe') + '">' + (p.cards || []).map(function (c, k) { return card(p, c, k, total); }).join('') + '</div>';
    h += blocoEnem(p);

    if (p.fontes && p.fontes.length) {
      h += '<section class="col fontes" aria-labelledby="' + esc(p.id) + '--fontes-t"><div class="sec-titulo"><h2 id="' + esc(p.id) + '--fontes-t">Para ir mais fundo</h2></div><ul>' +
        p.fontes.map(function (f) {
          var host = String(f.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
          return '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener"><strong>' + esc(f.nome) + '</strong><span>' + esc(f.descricao) + '</span><small>' + esc(host) + ' ↗</small></a></li>';
        }).join('') + '</ul></section>';
    }

    if (p.tags && p.tags.length) {
      h += '<div class="col post-tags"><span class="rotulo">Tags</span>' + p.tags.map(function (t) {
        return '<button type="button" class="tag" data-tag="' + esc(t) + '">#' + esc(t) + '</button>';
      }).join('') + '</div>';
    }

    h += '<nav class="col post-nav" aria-label="Outros posts">' +
      (maisAntigo
        ? '<a class="pn" href="#' + esc(maisAntigo.id) + '"><span class="pn-dir">← Post anterior</span><strong>' + esc(maisAntigo.manchete) + '</strong></a>'
        : '<div class="pn pn-vazio"><span class="pn-dir">← Post anterior</span><strong>Este é o primeiro post do blog</strong></div>') +
      (maisNovo
        ? '<a class="pn pn-d" href="#' + esc(maisNovo.id) + '"><span class="pn-dir">Próximo post →</span><strong>' + esc(maisNovo.manchete) + '</strong></a>'
        : '<div class="pn pn-d pn-vazio"><span class="pn-dir">Próximo post →</span><strong>Previsto para ' + dataLonga(proximaData()) + '</strong></div>') +
      '</nav>';

    return h + '</article>';
  }

  /* ---------------------------------------------------------------- página: Posts (arquivo) */
  var filtro = { busca: '', categoria: '', tag: '' };

  function heroArquivo() {
    return '<div class="hero alto"><p class="eyebrow">Arquivo</p><h1>Todos os posts</h1>' +
      '<p class="hero-sub">' + POSTS.length + (POSTS.length === 1 ? ' post publicado' : ' posts publicados') +
      (POSTS.length ? ' desde ' + dataLonga(POSTS[POSTS.length - 1].data) : '') + '. Um tema novo por semana.</p></div>';
  }

  function pgArquivo() {
    var cats = contagem('categoria');
    return '<section class="col" aria-label="Lista de posts">' +
      '<div class="filtros painel sobe">' +
        '<label class="sr" for="arq-busca">Buscar posts</label>' +
        '<input class="campo" type="search" id="arq-busca" placeholder="Buscar por tema, palavra ou tag" value="' + esc(filtro.busca) + '">' +
        '<div class="chips-filtro" role="group" aria-label="Filtrar por categoria">' +
          '<button type="button" data-categoria="" aria-pressed="' + (!filtro.categoria) + '">Todas (' + POSTS.length + ')</button>' +
          cats.map(function (c) { return '<button type="button" data-categoria="' + esc(c[0]) + '" aria-pressed="' + (filtro.categoria === c[0]) + '">' + esc(c[0]) + ' (' + c[1] + ')</button>'; }).join('') +
        '</div>' +
        '<p class="filtro-ativo" data-filtro-tag hidden></p>' +
      '</div>' +
      '<div class="arq painel" id="arq-lista" aria-live="polite"></div>' +
    '</section>';
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
      ft.innerHTML = filtro.tag ? 'Mostrando a tag <strong>#' + esc(filtro.tag) + '</strong> <button type="button" data-limpar-tag>limpar</button>' : '';
    }

    var h = '';
    if (!q && !filtro.categoria && !filtro.tag && POSTS.length) {
      h += '<h2 class="mes">Em breve</h2><ol class="arq-lista"><li>' +
        '<span class="arq-quando">' + dataCurta(proximaData()) + '</span>' +
        '<span class="arq-tema"><b>Semana ' + pad(POSTS.length + 1) + ' · próximo tema</b></span>' +
        '<span class="status">Em breve</span></li></ol>';
    }
    if (!lista.length) {
      h += '<p class="vazio">Nenhum post encontrado' + (q ? ' para “' + esc(filtro.busca) + '”' : '') + '. Tente outra palavra ou limpe os filtros.</p>';
    } else {
      var mesAtual = '';
      lista.forEach(function (p) {
        var m = mesAno(p.data);
        if (m !== mesAtual) {
          if (mesAtual) h += '</ol>';
          h += '<h2 class="mes">' + m + '</h2><ol class="arq-lista">';
          mesAtual = m;
        }
        h += '<li><span class="arq-quando">' + rotuloSemana(p) + '<br>' + dataCurta(p.data) + '</span>' +
          '<span class="arq-tema"><a href="#' + esc(p.id) + '">' + esc(p.manchete) + '</a><span>' + esc(p.resumo) + '</span></span>' +
          '<span class="chip">' + esc(p.categoria) + '</span></li>';
      });
      h += '</ol>';
    }
    alvo.innerHTML = h;
  }

  /* ---------------------------------------------------------------- página: Sobre */
  function heroSobre() {
    return '<div class="hero alto"><p class="eyebrow">Sobre</p><h1>Sobre o ' + esc(NOME) + '</h1>' +
      '<p class="hero-sub">' + esc(B.descricao || '') + '</p></div>';
  }

  function pgSobre() {
    var d = proximaData();
    return '<section class="col" aria-label="Sobre o blog">' +
      '<div class="sobre-grid painel sobe"><div class="sobre-texto">' +
        (B.sobre || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      '</div>' +
      '<aside class="sobre-autor"><h2 class="rotulo">Quem escreve</h2>' +
        '<div class="autor" style="margin-top:14px">' + avatares() +
        '<div><strong>' + esc(NOMES) + '</strong><small>' + esc(B.autorPapel || 'Autor') + '</small></div></div>' +
        (d ? '<p>Próximo post previsto para <strong>' + dataLonga(d) + '</strong>.</p>' : '') +
      '</aside></div>' +
      '<section class="sobre-sec" aria-labelledby="montagem-t"><div class="sec-titulo"><h2 id="montagem-t">Como cada post é montado</h2></div>' +
        '<ol class="montagem">' +
          '<li class="painel" style="' + cor(1) + '"><span class="num-p" aria-hidden="true">01</span><strong>Manchete</strong><p>Uma frase que resume a notícia ou a ideia da semana, com um parágrafo de abertura.</p></li>' +
          '<li class="painel" style="' + cor(0) + '"><span class="num-p" aria-hidden="true">02</span><strong>Cards com imagem</strong><p>O tema dividido em partes. Cada card tem uma imagem no topo e a explicação logo abaixo.</p></li>' +
          '<li class="painel" style="' + cor(2) + '"><span class="num-p" aria-hidden="true">03</span><strong>Questões estilo ENEM</strong><p>Uma questão de vestibular sobre cada parte, com texto-base, alternativas de A a E e resolução comentada.</p></li>' +
        '</ol></section>' +
    '</section>';
  }

  /* ---------------------------------------------------------------- rotas */
  var rotaAtual = null;
  var postAtual = null;

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
    var mesmoPost = r.tipo === 'post' && rotaAtual === 'post' && postAtual === r.post;
    if (!mesmoPost) {
      contaSvg = 0;
      if (r.tipo === 'post') { hero.innerHTML = heroPost(r.post); main.innerHTML = pgPost(r.post); }
      else if (r.tipo === 'arquivo') { hero.innerHTML = heroArquivo(); main.innerHTML = pgArquivo(); }
      else if (r.tipo === 'sobre') { hero.innerHTML = heroSobre(); main.innerHTML = pgSobre(); }
      else { hero.innerHTML = heroInicio(); main.innerHTML = pgInicio(); }
      rotaAtual = r.tipo;
      postAtual = r.post || null;
      ligar();
      contornos();
      document.title = r.tipo === 'post' ? r.post.manchete + ' · ' + NOME
        : r.tipo === 'arquivo' ? 'Posts · ' + NOME
        : r.tipo === 'sobre' ? 'Sobre · ' + NOME : NOME;
      document.querySelectorAll('[data-menu]').forEach(function (a) {
        if (a.getAttribute('data-menu') === r.tipo) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }
    barra.hidden = r.tipo !== 'post';
    if (r.ancora) {
      var el = document.getElementById(r.ancora);
      if (el) requestAnimationFrame(function () {
        el.scrollIntoView({ behavior: (reduz || inicial || !mesmoPost) ? 'auto' : 'smooth', block: 'start' });
      });
    } else if (!mesmoPost && !inicial) {
      window.scrollTo(0, 0);
    }
    progresso();
  }

  function irArquivo() {
    if (rotaAtual === 'arquivo') {
      main.querySelectorAll('[data-categoria]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-categoria') === filtro.categoria));
      });
      var campo = document.getElementById('arq-busca');
      if (campo && campo.value !== filtro.busca) campo.value = filtro.busca;
      desenhaLista();
    } else {
      location.hash = 'arquivo';
    }
  }

  /* ---------------------------------------------------------------- eventos de cada página */
  function ligar() {
    main.querySelectorAll('.ilus-wrap.rolavel').forEach(function (w) {
      var extra = w.scrollWidth - w.clientWidth;
      if (extra > 0) w.scrollLeft = extra / 2;
    });
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

  /* ---------------------------------------------------------------- barra de leitura */
  function progresso() {
    if (barra.hidden) return;
    var art = main.querySelector('.post');
    if (!art) return;
    var r = art.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    var f = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
    barra.firstElementChild.style.transform = 'scaleX(' + f.toFixed(4) + ')';
  }
  window.addEventListener('scroll', progresso, { passive: true });
  window.addEventListener('resize', progresso);

  /* ---------------------------------------------------------------- questões estilo ENEM */
  function ligarEnem(sec) {
    var qs = Array.prototype.slice.call(sec.querySelectorAll('.questao'));
    var acertos = sec.querySelector('[data-acertos]');
    var msg = sec.querySelector('[data-msg]');

    function atualizaCartao() {
      var feitas = 0, certas = 0;
      qs.forEach(function (q, k) {
        var linha = sec.querySelector('[data-linha="' + k + '"]');
        var bolhas = linha.querySelectorAll('.c-bolha');
        bolhas.forEach(function (b) { b.className = 'c-bolha'; });
        if (q.dataset.resp == null) return;
        feitas++;
        var r = +q.dataset.resp, c = +q.dataset.correta;
        if (r === c) { certas++; bolhas[r].classList.add('certa'); }
        else { bolhas[r].classList.add('errada'); bolhas[c].classList.add('gabarito'); }
      });
      acertos.textContent = certas;
      if (feitas < qs.length) msg.textContent = feitas ? 'Faltam ' + (qs.length - feitas) + ' de ' + qs.length + ' questões.' : 'Responda as questões para preencher o cartão.';
      else msg.textContent = certas === qs.length ? 'Gabaritou! Você dominou o tema da semana.'
        : certas >= qs.length / 2 ? 'Bom resultado. Releia a resolução das que errou.'
        : 'Vale reler as partes do post e tentar de novo.';
    }

    qs.forEach(function (q) {
      var correta = +q.dataset.correta;
      var alts = Array.prototype.slice.call(q.querySelectorAll('.alt'));
      alts.forEach(function (b) {
        b.addEventListener('click', function () {
          if (q.dataset.resp != null) return;
          var escolha = +b.dataset.alt;
          q.dataset.resp = escolha;
          alts.forEach(function (o) {
            o.disabled = true;
            if (+o.dataset.alt === correta) o.classList.add('certa');
          });
          if (escolha !== correta) b.classList.add('errada');
          var res = q.querySelector('.resolucao');
          var v = res.querySelector('.res-veredito');
          v.className = 'res-veredito ' + (escolha === correta ? 'certo' : 'errado');
          v.textContent = escolha === correta ? 'Resposta certa!' : 'Resposta errada. Veja por quê:';
          res.hidden = false;
          atualizaCartao();
        });
      });
    });

    sec.querySelector('[data-refazer]').addEventListener('click', function () {
      qs.forEach(function (q) {
        delete q.dataset.resp;
        q.querySelectorAll('.alt').forEach(function (o) { o.disabled = false; o.classList.remove('certa', 'errada'); });
        q.querySelector('.resolucao').hidden = true;
      });
      atualizaCartao();
      qs[0].scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });
    });
    atualizaCartao();
  }

  /* ---------------------------------------------------------------- régua de magnitudes (post da semana 1) */
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
    var num = rg.querySelector('[data-mag-num]');
    var cat = rg.querySelector('[data-mag-cat]');
    var energia = rg.querySelector('[data-mag-energia]');
    var efeito = rg.querySelector('[data-mag-efeito]');
    var freq = rg.querySelector('[data-mag-freq]');
    var caso = rg.querySelector('[data-mag-caso]');
    var marcas = rg.querySelector('[data-marcas]');
    var chips = rg.querySelector('[data-chips]');
    var botoes = [];
    var min = parseFloat(input.min), max = parseFloat(input.max);

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
      var rel;
      if (Math.abs(m - 4) < 0.05) rel = 'A mesma de um tremor de magnitude 4';
      else if (r > 1) rel = '≈ ' + com(grande(r), 'vezes') + ' a de um tremor de magnitude 4';
      else rel = '≈ ' + com(grande(1 / r), 'vezes') + ' menos que um tremor de magnitude 4';
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

  /* ---------------------------------------------------------------- curvas de nível da faixa oceano */
  var tela = banda && banda.querySelector('.contornos');
  function hash(i, j) { var s = Math.sin(i * 127.1 + j * 311.7 + 17.3) * 43758.5453; return s - Math.floor(s); }
  function suave(t) { return t * t * (3 - 2 * t); }
  function ruido(x, y) {
    var i = Math.floor(x), j = Math.floor(y), u = suave(x - i), v = suave(y - j);
    var a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function relevo(x, y) { return ruido(x, y) * 0.6 + ruido(x * 2.1 + 5.3, y * 2.1 + 1.7) * 0.28 + ruido(x * 4.3 + 9.1, y * 4.3 + 3.3) * 0.12; }

  function contornos() {
    if (!tela || !tela.getContext) return;
    var w = Math.round(banda.clientWidth), h = Math.round(banda.clientHeight);
    if (!w || !h) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    tela.width = w * dpr; tela.height = h * dpr;
    var ctx = tela.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // grade de coordenadas (meridianos e paralelos)
    ctx.strokeStyle = 'rgba(169,211,230,.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var gx = 120; gx < w; gx += 160) { ctx.moveTo(gx + .5, 0); ctx.lineTo(gx + .5, h); }
    for (var gy = 100; gy < h; gy += 160) { ctx.moveTo(0, gy + .5); ctx.lineTo(w, gy + .5); }
    ctx.stroke();

    var passo = 9, nx = Math.ceil(w / passo) + 1, ny = Math.ceil(h / passo) + 1;
    var f = new Float32Array(nx * ny), mn = Infinity, mx = -Infinity;
    for (var j = 0; j < ny; j++) for (var i = 0; i < nx; i++) {
      var val = relevo(i * passo / 280, j * passo / 280);
      f[j * nx + i] = val;
      if (val < mn) mn = val;
      if (val > mx) mx = val;
    }
    var niveis = 18;
    for (var k = 1; k < niveis; k++) {
      var t = mn + (mx - mn) * k / niveis;
      var mestra = k % 4 === 0;
      ctx.strokeStyle = mestra ? 'rgba(169,211,230,.30)' : 'rgba(169,211,230,.13)';
      ctx.lineWidth = mestra ? 1.4 : 0.9;
      ctx.beginPath();
      for (j = 0; j < ny - 1; j++) for (i = 0; i < nx - 1; i++) {
        var a = f[j * nx + i], b = f[j * nx + i + 1], c = f[(j + 1) * nx + i + 1], d = f[(j + 1) * nx + i];
        var caso = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
        if (caso === 0 || caso === 15) continue;
        var x = i * passo, y = j * passo;
        var topo = [x + passo * (t - a) / (b - a), y];
        var dir = [x + passo, y + passo * (t - b) / (c - b)];
        var base = [x + passo * (t - d) / (c - d), y + passo];
        var esq = [x, y + passo * (t - a) / (d - a)];
        var seg;
        switch (caso) {
          case 1: case 14: seg = [esq, base]; break;
          case 2: case 13: seg = [base, dir]; break;
          case 3: case 12: seg = [esq, dir]; break;
          case 4: case 11: seg = [topo, dir]; break;
          case 6: case 9: seg = [topo, base]; break;
          case 7: case 8: seg = [esq, topo]; break;
          case 5: seg = [esq, topo, base, dir]; break;
          case 10: seg = [topo, dir, esq, base]; break;
        }
        for (var s = 0; s < seg.length; s += 2) { ctx.moveTo(seg[s][0], seg[s][1]); ctx.lineTo(seg[s + 1][0], seg[s + 1][1]); }
      }
      ctx.stroke();
    }
  }
  var fila = null;
  function agendaContornos() { if (fila) cancelAnimationFrame(fila); fila = requestAnimationFrame(contornos); }
  if (window.ResizeObserver && banda) new ResizeObserver(agendaContornos).observe(banda);
  else window.addEventListener('resize', agendaContornos);

  /* ---------------------------------------------------------------- topo e rodapé */
  document.querySelectorAll('[data-blog="nome"]').forEach(function (el) { el.textContent = NOME; });
  document.querySelectorAll('[data-blog="slogan"]').forEach(function (el) { el.textContent = B.slogan || ''; });
  var rod = document.getElementById('rodape');
  if (rod) {
    rod.innerHTML = '<div class="rodape-marca"><b>' + esc(NOME) + '</b><span>' + esc(B.slogan || '') + ' · um tema por semana</span></div>' +
      '<nav aria-label="Rodapé"><a href="#inicio">Início</a><a href="#arquivo">Posts</a><a href="#sobre">Sobre</a></nav>' +
      '<small>© ' + new Date().getFullYear() + ' ' + esc(NOMES || NOME) + ' · Ilustrações desenhadas para este blog</small>';
  }

  render(true);
})();
