import { useState, useCallback, useMemo } from "react";
import DiagnosticQuiz from "./DiagnosticQuiz";
import AdminPanel from "./AdminPanel";

// ============================================================
// EPISODES POOL — banco de episódios épicos por arco
// ============================================================
const EPISODES_POOL = {
  "romance-dawn": [
    { num: 1, title: "Sou Luffy! O Homem que Vai se Tornar o Rei dos Piratas!", desc: "O início de tudo. Um garoto com chapéu de palha e um sonho impossível. Prepare-se para se apaixonar." },
    { num: 2, title: "O Grande Espadachim Zoro!", desc: "Luffy encontra um espadachim amarrado num poste. O começo de uma das maiores amizades da história." },
    { num: 3, title: "Um Caso Difícil! A Espadachim Apanhada!", desc: "A tripulação cresce. O primeiro vislumbre do potencial absurdo de Luffy." },
  ],
  "orange-town": [
    { num: 4, title: "Vito Buggy! O Grande Capitão Palhaço!", desc: "O primeiro grande vilão aparece. Perigoso, hilário e inesquecível." },
    { num: 5, title: "Batalha Terrível! O Poder de Buggy!", desc: "Luffy vs Buggy. Borracha contra explosões. Caótico e épico." },
    { num: 8, title: "Nami Entra em Ação!", desc: "Nami rouba o mapa e deixa todo mundo confuso. Ela é esperta e vai ser essencial." },
  ],
  "syrup-village": [
    { num: 9, title: "O Mentiroso Atirador! O Capitão Usopp!", desc: "Conhecemos Usopp, o garoto que mente pra se proteger mas tem um coração enorme." },
    { num: 17, title: "Luffy em Perigo! O Monstro do Vento Kuro!", desc: "Kuro revela velocidade absurda. Tensão máxima." },
    { num: 18, title: "Você é um Amigo? O Testamento do Capitão!", desc: "Conclusão emocionante. Usopp faz sua escolha." },
  ],
  "baratie": [
    { num: 19, title: "Avante para o Grand Line! O Submergível que Cozinha!", desc: "A tripulação chega ao Baratie e conhece Sanji." },
    { num: 26, title: "O Rei do Culinário! Zeff e Sanji!", desc: "A história de Sanji e Zeff é revelada. Prepare os lenços." },
    { num: 30, title: "O Cozinheiro do Baratie!", desc: "Sanji toma sua decisão final. A despedida vai te destruir de um jeito bom." },
  ],
  "arlong-park": [
    { num: 31, title: "A Ameaça do Peixe-Homem! Arlong!", desc: "Arlong aparece e o mundo de One Piece fica extremamente cruel." },
    { num: 37, title: "Nami Pedindo Ajuda?", desc: "O momento mais icônico da East Blue. Nami pede ajuda a Luffy. Dois segundos que mudam tudo." },
    { num: 44, title: "Luffy vs Arlong! Batalha nas Profundezas!", desc: "Pura adrenalina e o poder da amizade ao máximo." },
    { num: 45, title: "Arlong's Park Vem Abaixo!", desc: "A cena mais catártica da East Blue. Garantido que vai gritar." },
  ],
  "loguetown": [
    { num: 52, title: "Cidade do Começo e do Fim!", desc: "A cidade onde Gold Roger nasceu e morreu. O peso do destino." },
    { num: 53, title: "O Espírito do Pirata que Sacudiu o Mundo!", desc: "O episódio mais épico da East Blue. O Grand Line chama." },
  ],
  "alabasta": [
    { num: 100, title: "Vivi! Seus Amigos estão Esperando!", desc: "Ep 100 e a série ainda tá aquecendo. A escala da aventura fica clara." },
    { num: 110, title: "Luffy vs Crocodile!", desc: "Primeira batalha. Luffy leva uma lição brutal." },
    { num: 129, title: "As Marcas da Amizade!", desc: "A despedida de Vivi vai ficar na memória para sempre." },
  ],
  "skypiea": [
    { num: 168, title: "Enel entra em Cena!", desc: "Enel revela seu poder. Você vai odiar e amar esse vilão." },
    { num: 182, title: "Luffy vs Enel! Borracha vs Raio!", desc: "Luffy descobre sua vantagem natural contra o Deus Enel." },
    { num: 195, title: "Toca o Sino! A Mensagem de Gol Roger!", desc: "O sino toca e revela que essa aventura sempre foi maior." },
  ],
  "water-7": [
    { num: 251, title: "A Briga de Luffy e Usopp!", desc: "Uma das cenas mais dolorosas. Nakamas brigando de verdade." },
    { num: 263, title: "Robin Grita 'Quero Viver!'", desc: "Robin chora e pede pra ser salva. Momento lendário." },
  ],
  "enies-lobby": [
    { num: 278, title: "Atire! A Bala que vai Furar o Mundo!", desc: "Usopp atira na bandeira do Governo Mundial. Arrepiante." },
    { num: 302, title: "Luffy vs Lucci! Gear Second!", desc: "A melhor batalha da série. Gear Second revelado. Perfeito." },
    { num: 312, title: "Obrigado, Going Merry!", desc: "O funeral do Going Merry. Chore. Não há vergonha nisso." },
  ],
  "thriller-bark": [
    { num: 377, title: "Nada Aconteceu! O Sacrifício de Zoro!", desc: "O momento mais lendário de Zoro. Ele absorve toda a dor de Luffy. Silêncio." },
  ],
  "sabaody": [
    { num: 392, title: "Os 11 Supernovas!", desc: "Kid, Law, Hawkins — os futuros rivais aparecem. A nova geração chegou." },
    { num: 405, title: "Os Chapéus de Palha São Dispersos!", desc: "Kuma dispersa a tripulação. Um dos finais mais chocantes da história." },
  ],
  "marineford": [
    { num: 476, title: "O Poder de Whitebeard!", desc: "Whitebeard em ação total. O homem mais poderoso do mundo." },
    { num: 483, title: "O Adeus de Ace!", desc: "O momento mais devastador. Tenha lenços. Muda One Piece para sempre." },
    { num: 489, title: "O Fim da Grande Guerra!", desc: "A guerra termina. O mundo nunca mais é o mesmo." },
  ],
  "fishman-island": [
    { num: 517, title: "Dois Anos Depois! A Reunião!", desc: "Dois anos se passaram. A tripulação de volta, mais forte." },
  ],
  "dressrosa": [
    { num: 726, title: "Luffy Gear Fourth! O Homem-Bala!", desc: "Gear Fourth revelado. A animação explode. Um dos melhores momentos." },
    { num: 733, title: "Luffy vs Doflamingo! King Kong Gun!", desc: "A batalha final de Dressrosa. O grito de todo o reino. Inesquecível." },
  ],
  "wano": [
    { num: 1015, title: "Luffy Não Morreu! O Grito de Nami!", desc: "Luffy cai. O mundo desespera. E então algo impossível acontece." },
    { num: 1071, title: "Gear 5! O Despertar!", desc: "O episódio mais aguardado da história. Gear 5 revelado. Arte pura. Histórico." },
  ],
};

const ARC_ORDER = [
  "romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown",
  "alabasta","skypiea","water-7","enies-lobby","thriller-bark","sabaody",
  "marineford","fishman-island","punk-hazard","dressrosa","zou","whole-cake-island","wano",
];

const SHOP_ITEMS = [
  { id:"straw-hat", name:"🎩 Chapéu de Palha", cost:300, type:"skin", desc:"O chapéu do Rei dos Piratas!" },
  { id:"marine-cloak", name:"⚓ Capa de Almirante", cost:500, type:"skin", desc:"Vista a capa da Marinha!" },
  { id:"zoro-wano", name:"⚔️ Robe de Wano", cost:400, type:"skin", desc:"O estilo de Zoro em Wano!" },
  { id:"chopper-hat", name:"🩺 Chapéu do Chopper", cost:250, type:"skin", desc:"Fofo e poderoso!" },
  { id:"gear-5", name:"☁️ Gear 5", cost:1000, type:"skin", desc:"O poder mais absurdo do mundo!" },
  { id:"wano-sakura", name:"🌸 Tema Wano", cost:400, type:"theme", desc:"Flores de cerejeira de Wano" },
  { id:"blackbeard-dark", name:"🌑 Tema Barba Negra", cost:450, type:"theme", desc:"O lado sombrio do Grand Line" },
  { id:"streak-freeze", name:"🧊 Proteção de Streak", cost:150, type:"item", desc:"Protege seu streak por 1 dia" },
  { id:"xp-double", name:"⚡ XP Duplo (15min)", cost:100, type:"item", desc:"Dobra o XP por 15 minutos!" },
];

// ============================================================
// DATA
// ============================================================
const ARCS_DATA = [
  {
    id:"romance-dawn",name:"Romance Dawn",saga:"East Blue",icon:"🌅",
    epsTotal:[1,2,3],epsEssential:[1,2,3],epsRecommended:[],
    hype:"O começo de tudo! Conheça Monkey D. Luffy e seu sonho impossível. Uma aventura épica está prestes a zarpar!",
    difficulty:1,
    quiz:[
      {q:"Qual é o sonho de Luffy?",opts:["Ser o melhor espadachim","Ser o Rei dos Piratas","Encontrar o One Piece e se aposentar","Vencer a Marinha"],correct:1},
      {q:"Qual fruta do diabo Luffy comeu?",opts:["Mera Mera no Mi","Gomu Gomu no Mi","Yami Yami no Mi","Hana Hana no Mi"],correct:1},
      {q:"Quem é o pirata que Luffy admira desde criança?",opts:["Barba Negra","Shanks","Whitebeard","Rayleigh"],correct:1},
      {q:"Qual poder Luffy ganhou ao comer a fruta?",opts:["Controlar o fogo","Ser invisível","Corpo de borracha","Voar"],correct:2},
      {q:"Como se chama o chapéu que Luffy sempre usa?",opts:["Chapéu de ouro","Chapéu de palha","Chapéu do Roger","Chapéu do vento"],correct:1},
    ]
  },
  {
    id:"orange-town",name:"Orange Town",saga:"East Blue",icon:"🍊",
    epsTotal:[4,5,6,7,8],epsEssential:[4,5,6,7,8],epsRecommended:[],
    hype:"Luffy encontra seu primeiro companheiro! Um espadachim lendário e uma ladra misteriosa entram em cena. A tripulação está se formando!",
    difficulty:1,
    quiz:[
      {q:"Qual é o objetivo de Zoro?",opts:["Ser Rei dos Piratas","Ser o melhor espadachim do mundo","Encontrar o All Blue","Desenhar o mapa do mundo"],correct:1},
      {q:"Quantas espadas Zoro usa normalmente?",opts:["1","2","3","4"],correct:2},
      {q:"Buggy é conhecido como o Palhaço Pirata. Qual é seu poder?",opts:["Controlar o vento","Separar partes do corpo","Criar ilusões","Controlar metais"],correct:1},
      {q:"Nami é especialista em quê?",opts:["Combate corpo a corpo","Navegação e roubo","Culinária","Medicina"],correct:1},
      {q:"O que Nami rouba dos piratas?",opts:["Armas","Tesouros e dinheiro","Mapas","Comida"],correct:1},
    ]
  },
  {
    id:"syrup-village",name:"Syrup Village",saga:"East Blue",icon:"🎯",
    epsTotal:Array.from({length:10},(_,i)=>i+9),epsEssential:[9,10,11,14,16,17,18],epsRecommended:[12,13,15],
    hype:"Mentiras, lealdade e o atirador que mais mente... mas cujo coração não consegue enganar. Um arco cheio de emoção!",
    difficulty:2,
    quiz:[
      {q:"Qual é a mentira mais famosa de Usopp?",opts:["Que tem 100 seguidores","Que os piratas estão chegando","Que é o filho de Shanks","Que pode voar"],correct:1},
      {q:"Quem é o vilão de Syrup Village?",opts:["Kuro","Buggy","Don Krieg","Arlong"],correct:0},
      {q:"Qual é o sonho de Usopp?",opts:["Ser Rei dos Piratas","Ser um guerreiro do mar corajoso","Encontrar o All Blue","Ser médico"],correct:1},
      {q:"O navio Going Merry foi presenteado por quem?",opts:["Usopp","Kaya","Nami","Luffy"],correct:1},
      {q:"Kuro era disfarçado de quê em Syrup Village?",opts:["Médico","Pescador","Mordomo/Butler","Marinheiro"],correct:2},
    ]
  },
  {
    id:"baratie",name:"Baratie",saga:"East Blue",icon:"🍳",
    epsTotal:Array.from({length:12},(_,i)=>i+19),epsEssential:Array.from({length:12},(_,i)=>i+19),epsRecommended:[],
    hype:"Um restaurante flutuante, um cozinheiro de chutes mortais e um duelo de espadas que vai te deixar sem fôlego. Sanji entra na tripulação!",
    difficulty:2,
    quiz:[
      {q:"Sanji usa qual parte do corpo para lutar?",opts:["Punhos","Pernas e chutes","Armas de fogo","Magia"],correct:1},
      {q:"Qual é o sonho de Sanji?",opts:["Ser chef do mundo","Encontrar o All Blue","Ser Rei dos Piratas","Vencer Zoro"],correct:1},
      {q:"Quem é o dono do restaurante Baratie?",opts:["Sanji","Zeff","Don Krieg","Fullbody"],correct:1},
      {q:"O que Zeff fez para salvar Sanji quando jovem?",opts:["Comeu sua própria perna","Lutou contra 100 piratas","Vendeu seu navio","Sacrificou seu tesouro"],correct:0},
      {q:"Don Krieg é o líder de qual frota?",opts:["Piratas do Oriente","Grande Frota Krieg","Piratas da Armada","Frota do Leste"],correct:1},
    ]
  },
  {
    id:"arlong-park",name:"Arlong Park",saga:"East Blue",icon:"🦈",
    epsTotal:Array.from({length:15},(_,i)=>i+31),epsEssential:Array.from({length:15},(_,i)=>i+31),epsRecommended:[],
    hype:"O arco mais emocionante da East Blue! A verdade sobre Nami é revelada e Luffy mostrará o que significa ser um verdadeiro nakama. PREPARE OS LENÇOS!",
    difficulty:3,
    quiz:[
      {q:"Por quanto tempo Nami trabalhou para Arlong?",opts:["3 anos","8 anos","10 anos","5 anos"],correct:1},
      {q:"O que Nami estava tentando comprar de Arlong?",opts:["A liberdade de seus amigos","Sua vila natal Cocoyasi","Um navio","O mapa do Grand Line"],correct:1},
      {q:"Qual é a habilidade especial de Arlong?",opts:["Controla água","Dentes e força de tubarão","Pode voar","Controla peixes"],correct:1},
      {q:"O que Luffy faz quando Nami pede ajuda?",opts:["Vai embora","Coloca o chapéu nela e vai lutar","Chama a Marinha","Pede para Zoro resolver"],correct:1},
      {q:"Onde fica escondido o verdadeiro tesouro de Nami?",opts:["No fundo do mar","No quarto de Arlong","Na casa de Bellemere","Debaixo da tangerineira"],correct:3},
    ]
  },
  {
    id:"loguetown",name:"Loguetown",saga:"East Blue",icon:"⚓",
    epsTotal:[52,53],epsEssential:[52,53],epsRecommended:[],
    hype:"A cidade onde o Rei dos Piratas nasceu e morreu. Luffy está prestes a entrar no Grand Line. O destino está chamando!",
    difficulty:2,
    quiz:[
      {q:"Loguetown é conhecida como a cidade de quê?",opts:["Começo e Fim","Ouro e Prata","Tempestades e Ventos","Piratas e Marinheiros"],correct:0},
      {q:"Quem foi executado no cadafalso de Loguetown?",opts:["Shanks","Gold Roger","Whitebeard","Rayleigh"],correct:1},
      {q:"O que Gold Roger disse em sua execução?",opts:["Nada","Matem todos os piratas","Revelou onde está o One Piece","Perdoem meus pecados"],correct:2},
      {q:"Smoker pode fazer o quê?",opts:["Controlar fogo","Transformar em fumaça","Controlar vento","Ser invisível"],correct:1},
      {q:"O que salva Luffy de ser executado?",opts:["Zoro o resgata","Um raio cai no momento","Nami negocia","A Marinha o liberta"],correct:1},
    ]
  },
  {
    id:"alabasta",name:"Alabasta",saga:"Alabasta",icon:"🏜️",
    epsTotal:Array.from({length:69},(_,i)=>i+62),
    epsEssential:[...Array.from({length:19},(_,i)=>i+92),...Array.from({length:14},(_,i)=>i+117)],
    epsRecommended:Array.from({length:15},(_,i)=>i+62),
    hype:"Um reino à beira da guerra civil, uma princesa guerreira e o vilão mais inteligente que você já viu. Crocodile é ameaça real!",
    difficulty:4,
    quiz:[
      {q:"Quem é a princesa de Alabasta?",opts:["Nami","Vivi","Robin","Hancock"],correct:1},
      {q:"Qual é o poder de Crocodile?",opts:["Suna Suna no Mi (Areia)","Goro Goro no Mi (Raio)","Magu Magu no Mi","Hie Hie no Mi"],correct:0},
      {q:"O que é a Baroque Works?",opts:["Uma organização criminosa secreta","A Marinha disfarçada","Um grupo de piratas aliados","Uma guilda de mercadores"],correct:0},
      {q:"Como Robin ajudou Luffy?",opts:["Lutou contra a Marinha","Deu uma chave para Luffy","Curou seus ferimentos","Revelou o plano de Crocodile"],correct:1},
      {q:"Como a tripulação se encontra em Alabasta?",opts:["Transponders","Marcas nos braços","Sinais de fumaça","Mapa secreto"],correct:1},
    ]
  },
  {
    id:"skypiea",name:"Skypiea",saga:"Skypiea",icon:"☁️",
    epsTotal:Array.from({length:43},(_,i)=>i+153),epsEssential:Array.from({length:43},(_,i)=>i+153).filter(n=>n<170||n>175),epsRecommended:[170,171,172,173,174,175],
    hype:"Uma ilha no céu com seus próprios deuses e regras. Enel é um dos vilões mais únicos da série. A lore aqui é essencial para o final!",
    difficulty:3,
    quiz:[
      {q:"Quem é o self-proclaimed 'Deus' de Skypiea?",opts:["Wiper","Enel","Gan Fall","Ohm"],correct:1},
      {q:"Qual é o poder de Enel?",opts:["Controlar vento","Raios e eletricidade","Controlar nuvens","Voar"],correct:1},
      {q:"Por que Luffy é imune ao ataque de Enel?",opts:["Tem Haki","É de borracha","Tem armadura","É muito rápido"],correct:1},
      {q:"O que Skypiea tem de especial historicamente?",opts:["É a ilha do One Piece","Tem os Poneglyphs de Roger","Tem a maior riqueza do mundo","É onde nasceu o primeiro pirata"],correct:1},
      {q:"Qual é a meta de Enel em Skypiea?",opts:["Conquistar o Grand Line","Destruir Skypiea e ir para a Lua","Capturar os piratas","Criar um exército"],correct:1},
    ]
  },
  {
    id:"water-7",name:"Water 7",saga:"Water 7",icon:"🚢",
    epsTotal:Array.from({length:35},(_,i)=>i+229),epsEssential:Array.from({length:35},(_,i)=>i+229),epsRecommended:[],
    hype:"Uma cidade incrível, carpinteiros gigantes e um mistério que vai mudar a tripulação para sempre. A briga entre nakamas vai te partir o coração.",
    difficulty:4,
    quiz:[
      {q:"O que acontece com o Going Merry em Water 7?",opts:["É roubado","É destruído numa batalha","É declarado irrecuperável","É vendido"],correct:2},
      {q:"Quem é Iceburg?",opts:["Um pirata","O prefeito de Water 7 e carpinteiro","Um agente do governo","Um espião"],correct:1},
      {q:"Por que Robin age de forma suspeita em Water 7?",opts:["Ela traiu a tripulação","Estava protegendo a tripulação dos CP9","Queria o dinheiro","Estava com medo de Luffy"],correct:1},
      {q:"O que é o CP9?",opts:["Um grupo de piratas","A agência de inteligência do Governo Mundial","Uma facção da Marinha","Um grupo de mercenários"],correct:1},
      {q:"Qual é a frase mais famosa de Robin nesse arco?",opts:["Eu quero viver","Me salvem","Eu não mereço viver","Deixem-me ir"],correct:0},
    ]
  },
  {
    id:"enies-lobby",name:"Enies Lobby",saga:"Water 7",icon:"⚖️",
    epsTotal:Array.from({length:49},(_,i)=>i+264),epsEssential:Array.from({length:49},(_,i)=>i+264),epsRecommended:[],
    hype:"O MELHOR ARCO DE TODA A SÉRIE! A tripulação invade a sede do Governo Mundial para salvar Robin. Gear Second. Going Merry. Você vai chorar, gritar e aplaudir.",
    difficulty:5,
    quiz:[
      {q:"O que Usopp faz com a bandeira do Governo Mundial?",opts:["Rasga com as mãos","Atira nela para destruí-la","A rouba","A queima"],correct:1},
      {q:"Qual é o poder especial de Rob Lucci?",opts:["Soru - velocidade extrema","Neko Neko no Mi modelo leopardo com Rokushiki","Controlar gravitação","Criar ilusões"],correct:1},
      {q:"O que é o Gear Second de Luffy?",opts:["Uma forma de usar Haki","Bombear sangue mais rápido para aumentar velocidade","Uma técnica de espada","Uma transformação permanente"],correct:1},
      {q:"O que acontece com o Going Merry no final?",opts:["É reformado","É roubado pelo governo","Tem um funeral no mar","Ainda está em uso"],correct:2},
      {q:"Quem é Spandam?",opts:["O líder do CP9","O chefe do governo de Enies Lobby","O vilão principal","Um aliado dos Chapéus de Palha"],correct:1},
    ]
  },
  {
    id:"thriller-bark",name:"Thriller Bark",saga:"Thriller Bark",icon:"👻",
    epsTotal:Array.from({length:45},(_,i)=>i+337),epsEssential:Array.from({length:45},(_,i)=>i+337),epsRecommended:[],
    hype:"A ilha mais estranha do Grand Line. Fantasmas, zumbis e um vilão que rouba sombras. E o momento mais lendário de Zoro está aqui!",
    difficulty:3,
    quiz:[
      {q:"Quem é Gecko Moriah?",opts:["Um Almirante da Marinha","Um Shichibukai que rouba sombras","Um pirata comum","O líder dos zumbis"],correct:1},
      {q:"O que Moriah faz com as sombras roubadas?",opts:["As usa para criar clones","As insere em zumbis para dar vida","As usa como escudo","As vende para o governo"],correct:1},
      {q:"O que Zoro faz no final do arco para salvar Luffy?",opts:["Usa uma técnica especial","Absorve toda a dor e ferimentos de Luffy","Derrota Moriah","Pede ajuda à Marinha"],correct:1},
      {q:"O que Sanji disse quando viu o sacrifício de Zoro?",opts:["Obrigado Zoro","Idiota","Nada aconteceu","Zoro é o melhor"],correct:2},
      {q:"Brook queria recuperar o quê de Thriller Bark?",opts:["Seu corpo","Sua sombra","Seu instrumento","Seu navio"],correct:1},
    ]
  },
  {
    id:"sabaody",name:"Sabaody",saga:"Sabaody",icon:"🫧",
    epsTotal:Array.from({length:21},(_,i)=>i+385),epsEssential:Array.from({length:21},(_,i)=>i+385),epsRecommended:[],
    hype:"O pré-New World começa. Novos piratas incríveis aparecem e a tripulação enfrenta seu maior desafio. A separação mais chocante da série.",
    difficulty:4,
    quiz:[
      {q:"Quem são os Supernovas?",opts:["Os piratas mais fortes do passado","Rookies com recompensa acima de 100M","Os aliados de Whitebeard","Os agentes do governo"],correct:1},
      {q:"Por que os Chapéus de Palha não podem usar seus poderes em Sabaody?",opts:["As regras locais proíbem","O mar raso neutraliza frutas do diabo","A Marinha os está observando","Eles estão com medo"],correct:1},
      {q:"Quem é Kuma?",opts:["Um Almirante","Um Shichibukai com poder de repelir qualquer coisa","Um agente do CP9","Um aliado secreto"],correct:1},
      {q:"O que Kuma faz com os Chapéus de Palha?",opts:["Os prende","Os dispersa para lugares diferentes do mundo","Os elimina","Os leva para o governo"],correct:1},
      {q:"O que Luffy faz quando vê a tripulação ser dispersada?",opts:["Corre atrás","Fica paralisado e grita","Pede ajuda à Marinha","Desiste de ser pirata"],correct:1},
    ]
  },
  {
    id:"marineford",name:"Marineford",saga:"Marineford",icon:"⚔️",
    epsTotal:Array.from({length:33},(_,i)=>i+457),epsEssential:Array.from({length:33},(_,i)=>i+457),epsRecommended:[],
    hype:"A MAIOR GUERRA DA HISTÓRIA DE ONE PIECE! Todos os Almirantes, Shichibukai, Whitebeard e seus aliados. O clímax épico que muda tudo para sempre.",
    difficulty:5,
    quiz:[
      {q:"Por que a guerra de Marineford acontece?",opts:["Para capturar Luffy","Para executar Portgas D. Ace","Para destruir os piratas","Para capturar Whitebeard"],correct:1},
      {q:"Qual é a relação de Ace com Luffy?",opts:["São rivais","São irmãos adotivos","São primos","São amigos de infância"],correct:1},
      {q:"Quem são os 3 Almirantes presentes em Marineford?",opts:["Akainu, Aokiji e Kizaru","Garp, Sengoku e Akainu","Smoker, Tashigi e Akainu","Kong, Sengoku e Garp"],correct:0},
      {q:"O que acontece com Ace em Marineford?",opts:["Escapa com Luffy","É morto por Akainu","É preso novamente","Fica ferido mas sobrevive"],correct:1},
      {q:"O que Luffy faz depois da guerra de Marineford?",opts:["Desiste de ser pirata","Vai direto para o New World","Envia uma mensagem aos nakamas e treina 2 anos","Procura vingança contra a Marinha"],correct:2},
    ]
  },
  {
    id:"fishman-island",name:"Fishman Island",saga:"New World",icon:"🐠",
    epsTotal:Array.from({length:58},(_,i)=>i+517),epsEssential:[...Array.from({length:6},(_,i)=>i+517),...Array.from({length:34},(_,i)=>i+541)],epsRecommended:[],
    hype:"Dois anos depois! A tripulação se reúne mais forte do que nunca. Um reino subaquático com história complexa sobre preconceito e poder.",
    difficulty:3,
    quiz:[
      {q:"O que é Fishman Island?",opts:["Uma ilha flutuante","Um reino subaquático habitado por homens-peixe","Uma ilha do Grand Line","Uma base da Marinha"],correct:1},
      {q:"Quem é Hody Jones?",opts:["O rei de Fishman Island","Um vilão que odeia humanos","Um aliado da Marinha","O guardião da ilha"],correct:1},
      {q:"O que é o Haki Real (Haoshoku)?",opts:["Uma técnica de luta","Um poder que desmaia oponentes mais fracos","Uma forma de Gear","Um tipo de arma"],correct:1},
      {q:"Qual é a conexão de Fishman Island com a missão de Luffy?",opts:["É o destino final","Nenhuma","Tiger Fisher foi importante para a luta contra preconceito","É onde está o One Piece"],correct:2},
      {q:"O que Big Mom quer de Fishman Island?",opts:["O território","10.000 doces por mês","Os homens-peixe como soldados","O tesouro local"],correct:1},
    ]
  },
  {
    id:"dressrosa",name:"Dressrosa",saga:"New World",icon:"🌹",
    epsTotal:Array.from({length:118},(_,i)=>i+629),epsEssential:Array.from({length:118},(_,i)=>i+629),epsRecommended:[],
    hype:"Um reino lindo com um segredo sombrio. Doflamingo governa com sorriso e fios de morte. Gear Fourth é revelado aqui. Um dos arcos mais épicos do New World!",
    difficulty:5,
    quiz:[
      {q:"Quem é Donquixote Doflamingo?",opts:["Um Almirante","Um ex-Shichibukai que controla o reino","O rei legítimo de Dressrosa","Um aliado de Luffy"],correct:1},
      {q:"Qual é o poder de Doflamingo?",opts:["Ito Ito no Mi - controlar fios","Goro Goro no Mi - raios","Moku Moku no Mi - fumaça","Suna Suna no Mi - areia"],correct:0},
      {q:"Quem é Rebecca?",opts:["A filha do rei verdadeiro de Dressrosa","Uma gladiadora famosa","A namorada de Luffy","Uma agente do governo"],correct:0},
      {q:"O que é o Gear Fourth?",opts:["Uma nova técnica de espada","Luffy inflado com Haki, mais forte e rápido","Uma forma de usar frutas do diabo","Um aliado de Luffy"],correct:1},
      {q:"Quem é Law nesse arco?",opts:["Um inimigo de Luffy","Um aliado que quer derrubar Doflamingo","Um agente do governo","O vilão principal"],correct:1},
    ]
  },
  {
    id:"wano",name:"Wano",saga:"New World",icon:"🏯",
    epsTotal:Array.from({length:196},(_,i)=>i+890),epsEssential:Array.from({length:196},(_,i)=>i+890),epsRecommended:[],
    hype:"O arco mais longo e épico de One Piece. Wano é One Piece em seu absoluto auge. Gear 5 é revelado aqui. Prepare-se para a maior aventura da série!",
    difficulty:5,
    quiz:[
      {q:"Quem é o shogun tirano de Wano?",opts:["Kaido","Orochi","Big Mom","Doflamingo"],correct:1},
      {q:"Qual é o poder de Kaido?",opts:["Uo Uo no Mi - dragão mítico","Tori Tori no Mi - pássaro","Inu Inu no Mi - lobo","Neko Neko no Mi - leopardo"],correct:0},
      {q:"O que é o Gear 5?",opts:["Uma forma mais forte do Gear 4","O despertar da Gomu Gomu no Mi - poder absurdo","Uma técnica de Haki","Uma nova espada"],correct:1},
      {q:"Quem é Yamato?",opts:["A filha de Kaido que admira Oden","Um samurai aliado","Um agente secreto","O rei legítimo de Wano"],correct:0},
      {q:"O que é o Oden Kozuki para Wano?",opts:["Um herói lendário que foi executado por Orochi e Kaido","O rei atual","Um pirata inimigo","Um aliado da Marinha"],correct:0},
    ]
  },
];

const ACHIEVEMENTS = [
  {id:"first-ep",name:"Primeiro Passo",desc:"Assista o episódio 1",icon:"🌅",condition:(s)=>s.watchedEps.includes(1)},
  {id:"east-blue",name:"East Blue Conquistada",desc:"Complete Arlong Park",icon:"🦈",condition:(s)=>s.completedArcs.includes("arlong-park")},
  {id:"marathoner",name:"Maratonista",desc:"Assista 5 eps em um dia",icon:"🏃",condition:(s)=>s.dailyEpsRecord>=5},
  {id:"no-mercy",name:"Sem Misericórdia",desc:"Pule 10 fillers",icon:"⏭️",condition:(s)=>s.skippedFillers>=10},
  {id:"nakama",name:"Nakama",desc:"7 dias de streak",icon:"🤝",condition:(s)=>s.maxStreak>=7},
  {id:"quiz-master",name:"Mestre dos Quizzes",desc:"100% em 3 quizzes",icon:"🎯",condition:(s)=>s.perfectQuizzes>=3},
  {id:"grand-line",name:"Entrou no Grand Line",desc:"Complete Loguetown",icon:"🗺️",condition:(s)=>s.completedArcs.includes("loguetown")},
  {id:"cry-baby",name:"Coração de Ouro",desc:"Complete Enies Lobby",icon:"😭",condition:(s)=>s.completedArcs.includes("enies-lobby")},
  {id:"war-veteran",name:"Veterano de Guerra",desc:"Complete Marineford",icon:"⚔️",condition:(s)=>s.completedArcs.includes("marineford")},
  {id:"level10",name:"Pirata de Respeito",desc:"Alcance o nível 10",icon:"🏴‍☠️",condition:(s)=>s.level>=10},
  {id:"century",name:"Centenário",desc:"Assista 100 episódios",icon:"💯",condition:(s)=>s.watchedEps.length>=100},
  {id:"pirate-king",name:"Rei dos Piratas",desc:"Nível 51+",icon:"🌟",condition:(s)=>s.level>=51},
];

const getLevelName=(level)=>{
  if(level<=5)return"Marinheiro Novato";
  if(level<=10)return"Pirata Iniciante";
  if(level<=20)return"Tripulante do Chapéu de Palha";
  if(level<=35)return"Capitão dos Sete Mares";
  if(level<=50)return"Imperador do Mar";
  return"REI DOS PIRATAS 🏴‍☠️";
};

const MOTIVATIONAL=[
  "Seus nakamas acreditam em você, capitão! 🏴‍☠️",
  "Todo grande pirata começou do zero! ⚓",
  "O Grand Line te aguarda, aventureiro! 🗺️",
  "Nenhuma tempestade para o Rei dos Piratas! ⛵",
  "Roger chegou lá, e você também vai! ✨",
];

const INITIAL_STATE={
  onboarded:false,userName:"Pirata",goal:null,dailyGoal:3,
  xp:0,level:1,streak:0,maxStreak:0,lastCheckin:null,
  watchedEps:[],completedArcs:[],unlockedArcs:["romance-dawn"],
  quizResults:{},achievements:[],dailyEpsToday:0,dailyEpsRecord:0,
  skippedFillers:0,perfectQuizzes:0,consecutivePerfect:0,
  streakFreeze:false,unlockedSkins:["default"],currentSkin:"default",
  currentTheme:"classic",unlockedTitles:["Recruta"],currentTitle:"Recruta",
  weeklyXP:0,lastFishTime:0,spoilerFilterEp:9999,
  dailyChallengesStatus:[],lastChallengeDate:"",
};

const DAILY_POOL=[
  {id:1,desc:"Assista 3 episódios hoje",target:3,reward:50,type:"watch"},
  {id:2,desc:"Complete um quiz sem errar",target:1,reward:80,type:"perfect_quiz"},
  {id:3,desc:"Assista 5 episódios hoje",target:5,reward:100,type:"watch"},
  {id:4,desc:"Complete 2 quizzes",target:2,reward:60,type:"quiz"},
  {id:5,desc:"Ganhe 200 XP hoje",target:200,reward:70,type:"xp"},
];

// ============================================================
// HOOKS
// ============================================================
function useLocalStorage(key,initial){
  const[val,setVal]=useState(()=>{
    try{const s=localStorage.getItem(key);return s?{...initial,...JSON.parse(s)}:initial;}
    catch{return initial;}
  });
  const save=useCallback((v)=>{
    const next=typeof v==="function"?v(val):v;
    setVal(next);
    try{localStorage.setItem(key,JSON.stringify(next));}catch{}
  },[key,val]);
  return[val,save];
}

// ============================================================
// COMPONENTS
// ============================================================
function WaveBackground(){
  return(
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:0}}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"120px",background:"linear-gradient(180deg,transparent 0%,rgba(26,188,156,0.15) 100%)"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{position:"absolute",bottom:0,left:`${-100+i*30}px`,right:`${-100+i*20}px`,height:`${60+i*20}px`,background:`rgba(26,188,156,${0.08+i*0.04})`,borderRadius:"50% 50% 0 0",animation:`wave ${3+i}s ease-in-out infinite alternate`,animationDelay:`${i*0.5}s`}}/>
        ))}
      </div>
      <style>{`
        @keyframes wave{0%{transform:translateX(0)}100%{transform:translateX(40px)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fire{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.1)}}
        @keyframes pulse-xp{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}

function XPBar({xp,level}){
  const progress=(xp%200)/200*100;
  return(
    <div className="flex items-center gap-2">
      <span style={{color:"#f0a500",fontFamily:"Cinzel",fontSize:"12px",fontWeight:700}}>Nv.{level}</span>
      <div style={{flex:1,height:"8px",background:"rgba(255,255,255,0.1)",borderRadius:"4px",overflow:"hidden"}}>
        <div style={{width:`${progress}%`,height:"100%",background:"linear-gradient(90deg,#f0a500,#ffd700)",borderRadius:"4px",transition:"width 0.5s ease",boxShadow:"0 0 8px rgba(240,165,0,0.6)"}}/>
      </div>
      <span style={{color:"rgba(255,255,255,0.6)",fontSize:"11px"}}>{xp%200}/200</span>
    </div>
  );
}

function StreakBadge({streak}){
  if(streak===0)return null;
  const isHot=streak>=3;
  return(
    <div style={{display:"flex",alignItems:"center",gap:"4px",background:isHot?"linear-gradient(135deg,#c0392b,#e74c3c)":"rgba(255,255,255,0.1)",padding:"4px 10px",borderRadius:"20px",animation:isHot?"fire 1s ease-in-out infinite":"none",boxShadow:isHot?"0 0 12px rgba(192,57,43,0.5)":"none"}}>
      <span style={{fontSize:"16px"}}>{isHot?"🔥":"⚓"}</span>
      <span style={{color:"white",fontWeight:700,fontSize:"13px"}}>{streak}</span>
    </div>
  );
}

// MASCOTE GATO SVG
function ZoroCatMascot({skin,mood,onClick}){
  const[dialogue,setDialogue]=useState("Vai assistir One Piece! 🏴‍☠️");
  const[showBubble,setShowBubble]=useState(true);
  const[bouncing,setBouncing]=useState(false);

  const dialogues={
    happy:["Isso aí! Continue assistindo! 🔥","XP ganho! Vamo que vamo! 🏴‍☠️","Você tá indo muito bem, capitão! ⚔️","Nada vai me parar de assistir One Piece! 😼"],
    sad:["Errou feio... até eu acertaria isso. 😒","Isso foi embaraçoso. Não faça de novo. 😾","Nem o Zoro se perde tanto quanto você erra... 🗺️"],
    normal:["Tá dormindo ou vai assistir? 😼","O Grand Line não espera ninguém. 🌊","Qual ep você vai assistir hoje? 🏴‍☠️","Zoro se perderia aqui. Você não pode. 🗺️"],
  };

  const getDialogue=()=>{
    const lines=dialogues[mood]||dialogues.normal;
    return lines[Math.floor(Math.random()*lines.length)];
  };

  const handleClick=()=>{
    setBouncing(true);
    setDialogue(getDialogue());
    setShowBubble(true);
    setTimeout(()=>setBouncing(false),600);
    setTimeout(()=>setShowBubble(false),4000);
    onClick?.();
  };

  const eyeColor=mood==="happy"?"#f0a500":mood==="sad"?"#888":"#f0a500";
  const mouthPath=mood==="happy"?"M82 148 Q100 162 118 148":mood==="sad"?"M82 158 Q100 148 118 158":"M85 153 Q100 158 115 153";

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}}>
      {showBubble&&(
        <div style={{background:"rgba(255,255,255,0.95)",color:"#0a1628",borderRadius:"16px",padding:"10px 14px",fontSize:"13px",fontWeight:700,maxWidth:"180px",textAlign:"center",position:"relative",boxShadow:"0 4px 12px rgba(0,0,0,0.3)",animation:"fadeIn 0.3s ease",fontFamily:"Nunito,sans-serif"}}>
          {dialogue}
          <div style={{position:"absolute",bottom:"-8px",left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderTop:"8px solid rgba(255,255,255,0.95)"}}/>
        </div>
      )}
      <div onClick={handleClick} style={{cursor:"pointer",transform:bouncing?"scale(1.15)":"scale(1)",transition:"transform 0.3s cubic-bezier(0.68,-0.55,0.265,1.55)",filter:mood==="happy"?"drop-shadow(0 0 8px #f0a500)":"none"}}>
        <svg width="110" height="130" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="185" r="52" fill="#1a1a2e"/>
          <ellipse cx="100" cy="185" rx="52" ry="58" fill="#1a1a2e"/>
          <circle cx="100" cy="110" r="58" fill="#1a1a2e"/>
          <polygon points="52,72 72,108 32,108" fill="#1a1a2e"/>
          <polygon points="148,72 128,108 168,108" fill="#1a1a2e"/>
          <polygon points="52,80 67,105 40,105" fill="#c0392b" opacity="0.5"/>
          <polygon points="148,80 133,105 160,105" fill="#c0392b" opacity="0.5"/>
          <circle cx="158" cy="95" r="4" fill="#f0a500"/>
          <circle cx="162" cy="108" r="3.5" fill="#f0a500"/>
          <circle cx="158" cy="120" r="3" fill="#f0a500"/>
          <line x1="62" y1="92" x2="76" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
          <line x1="76" y1="92" x2="62" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="128" cy="105" r="13" fill={eyeColor}/>
          <circle cx="128" cy="105" r="8" fill="#0a1628"/>
          <circle cx="131" cy="101" r="3.5" fill="white"/>
          <ellipse cx="100" cy="128" rx="5" ry="3.5" fill="#c0392b"/>
          <path d={mouthPath} stroke="#f5f0e8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <line x1="45" y1="122" x2="84" y2="128" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="45" y1="132" x2="84" y2="132" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="116" y1="128" x2="155" y2="122" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="116" y1="132" x2="155" y2="132" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <ellipse cx="138" cy="230" rx="18" ry="12" fill="#1a1a2e"/>
          <path d="M62 218 Q55 228 60 238" stroke="#1a1a2e" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M148 225 Q185 215 188 195 Q190 178 170 172" stroke="#1a1a2e" strokeWidth="10" fill="none" strokeLinecap="round"/>
          {skin==="straw-hat"&&<>
            <ellipse cx="100" cy="52" rx="58" ry="11" fill="#f5e642" stroke="#c47f00" strokeWidth="2"/>
            <path d="M55 52 Q58 20 100 18 Q142 20 145 52 Z" fill="#f5e642" stroke="#c47f00" strokeWidth="2"/>
            <path d="M62 48 Q100 38 138 48" stroke="#c0392b" strokeWidth="7" fill="none" strokeLinecap="round"/>
          </>}
          {skin==="chopper-hat"&&<>
            <ellipse cx="100" cy="50" rx="48" ry="10" fill="#ff9eb5" stroke="#cc7799" strokeWidth="1.5"/>
            <path d="M58 50 Q60 22 100 20 Q140 22 142 50 Z" fill="#ff9eb5" stroke="#cc7799" strokeWidth="1.5"/>
            <rect x="91" y="25" width="18" height="6" rx="2" fill="white"/>
            <rect x="97" y="19" width="6" height="18" rx="2" fill="white"/>
          </>}
          {skin==="gear-5"&&<>
            <ellipse cx="100" cy="235" rx="55" ry="18" fill="white" opacity="0.7"/>
            <ellipse cx="68" cy="228" rx="22" ry="16" fill="white" opacity="0.6"/>
            <ellipse cx="132" cy="228" rx="22" ry="16" fill="white" opacity="0.6"/>
            <path d="M68 88 Q78 78 88 85" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M112 85 Q122 78 132 88" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </>}
        </svg>
      </div>
      <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif"}}>Toque para interagir</div>
    </div>
  );
}

// ONBOARDING
function Onboarding({onComplete}){
  const[step,setStep]=useState(0);
  const[goal,setGoal]=useState(null);
  const[dailyGoal,setDailyGoal]=useState(3);
  const[name,setName]=useState("");

  const goals=[
    {id:"fast",label:"Assistir rápido",sub:"Só o essencial",icon:"⚡"},
    {id:"nofillers",label:"Sem fillers chatos",sub:"Tudo importante",icon:"🎯"},
    {id:"all",label:"Maratonista",sub:"Quero tudo mesmo!",icon:"🏃"},
  ];

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",background:"linear-gradient(135deg,#0a1628 0%,#0d2137 50%,#0a1628 100%)",fontFamily:"Nunito,sans-serif"}}>
      <WaveBackground/>
      <div style={{position:"relative",zIndex:1,maxWidth:"480px",width:"100%",textAlign:"center"}}>
        {step===0&&(
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"80px",marginBottom:"16px",animation:"float 3s ease-in-out infinite"}}>🏴‍☠️</div>
            <h1 style={{fontFamily:"Cinzel,serif",fontSize:"clamp(28px,6vw,42px)",fontWeight:900,background:"linear-gradient(135deg,#f0a500,#ffd700,#f0a500)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px"}}>Torne-se o Rei dos Piratas!</h1>
            <p style={{color:"rgba(245,240,232,0.8)",marginBottom:"32px",fontSize:"16px"}}>Sua aventura épica por One Piece começa aqui!</p>
            <div style={{marginBottom:"24px",textAlign:"left"}}>
              <label style={{color:"#f0a500",fontWeight:700,display:"block",marginBottom:"8px"}}>Seu nome de pirata:</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex: Luffy, Zoro, Nami..." style={{width:"100%",padding:"12px 16px",borderRadius:"12px",border:"2px solid rgba(240,165,0,0.3)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:"16px",outline:"none",boxSizing:"border-box",fontFamily:"Nunito,sans-serif"}}/>
            </div>
            <button onClick={()=>setStep(1)} style={{background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px",boxShadow:"0 4px 20px rgba(240,165,0,0.4)"}}>ZARPAR! ⚓</button>
          </div>
        )}
        {step===1&&(
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🎯</div>
            <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"24px",marginBottom:"8px"}}>Qual seu objetivo?</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"32px"}}>
              {goals.map(g=>(
                <button key={g.id} onClick={()=>setGoal(g.id)} style={{padding:"16px 20px",borderRadius:"16px",border:`2px solid ${goal===g.id?"#f0a500":"rgba(240,165,0,0.2)"}`,background:goal===g.id?"rgba(240,165,0,0.15)":"rgba(255,255,255,0.03)",cursor:"pointer",display:"flex",alignItems:"center",gap:"16px",textAlign:"left",color:"white"}}>
                  <span style={{fontSize:"32px"}}>{g.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:"16px",color:goal===g.id?"#f0a500":"white"}}>{g.label}</div>
                    <div style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>{g.sub}</div>
                  </div>
                  {goal===g.id&&<span style={{marginLeft:"auto",color:"#f0a500",fontSize:"20px"}}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={()=>goal&&setStep(2)} style={{background:goal?"linear-gradient(135deg,#f0a500,#ffd700)":"rgba(255,255,255,0.1)",color:goal?"#0a1628":"rgba(255,255,255,0.4)",padding:"14px 40px",borderRadius:"50px",border:"none",cursor:goal?"pointer":"not-allowed",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px"}}>Continuar →</button>
          </div>
        )}
        {step===2&&(
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📺</div>
            <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"24px",marginBottom:"8px"}}>Meta diária</h2>
            <div style={{background:"rgba(240,165,0,0.1)",borderRadius:"20px",padding:"32px",border:"2px solid rgba(240,165,0,0.2)",marginBottom:"32px"}}>
              <div style={{fontFamily:"Cinzel,serif",fontSize:"64px",fontWeight:900,color:"#f0a500",marginBottom:"8px"}}>{dailyGoal}</div>
              <div style={{color:"rgba(255,255,255,0.7)",marginBottom:"24px"}}>episódios por dia</div>
              <input type="range" min="1" max="10" value={dailyGoal} onChange={e=>setDailyGoal(Number(e.target.value))} style={{width:"100%",accentColor:"#f0a500"}}/>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",marginTop:"8px"}}>⏱️ Com {dailyGoal} eps/dia, verá os essenciais em ~{Math.ceil(500/dailyGoal)} dias!</div>
            </div>
            <button onClick={()=>onComplete({goal,dailyGoal,userName:name||"Pirata"})} style={{background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px",boxShadow:"0 4px 20px rgba(240,165,0,0.4)"}}>ZARPAR DE VERDADE! 🏴‍☠️</button>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"24px"}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{width:i===step?"24px":"8px",height:"8px",borderRadius:"4px",background:i<=step?"#f0a500":"rgba(255,255,255,0.2)",transition:"all 0.3s"}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// HEADER / BOTTOM NAV
function Header({onNav,currentScreen}){
  const navItems=[
    {id:"dashboard",icon:"🏠",label:"Início"},
    {id:"map",icon:"🗺️",label:"Mapa"},
    {id:"profile",icon:"👤",label:"Perfil"},
    {id:"guide",icon:"📖",label:"Guia"},
  ];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(10,22,40,0.95)",backdropFilter:"blur(12px)",borderTop:"1px solid rgba(240,165,0,0.2)",display:"flex",justifyContent:"space-around",padding:"8px 0 max(8px,env(safe-area-inset-bottom))"}}>
      {navItems.map(n=>(
        <button key={n.id} onClick={()=>onNav(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",background:"none",border:"none",cursor:"pointer",padding:"6px 12px",color:currentScreen===n.id?"#f0a500":"rgba(255,255,255,0.5)",transition:"all 0.2s"}}>
          <span style={{fontSize:"22px"}}>{n.icon}</span>
          <span style={{fontSize:"10px",fontWeight:700,fontFamily:"Nunito,sans-serif"}}>{n.label}</span>
          {currentScreen===n.id&&<div style={{width:"4px",height:"4px",borderRadius:"50%",background:"#f0a500"}}/>}
        </button>
      ))}
    </div>
  );
}

// WAKE UP RECOMMENDER
function WakeUpRecommender({state}){
  const[showModal,setShowModal]=useState(false);
  const[minutes,setMinutes]=useState(60);
  const[recs,setRecs]=useState([]);
  const[searched,setSearched]=useState(false);

  const currentArcId=useMemo(()=>{
    return state.unlockedArcs.find(id=>!state.completedArcs.includes(id))||ARC_ORDER[0];
  },[state.unlockedArcs,state.completedArcs]);

  const handleRecommend=()=>{
    const maxEps=Math.floor(minutes/24);
    const pool=EPISODES_POOL[currentArcId]||[];
    const watched=state.watchedEps||[];
    const results=pool.filter(ep=>!watched.includes(ep.num)&&ep.num<=(state.spoilerFilterEp||9999)).slice(0,maxEps);
    setRecs(results);
    setSearched(true);
  };

  return(
    <>
      <button onClick={()=>setShowModal(true)} style={{width:"100%",marginTop:"16px",padding:"18px",borderRadius:"20px",background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"white",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",boxShadow:"0 8px 24px rgba(192,57,43,0.4)",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",transition:"transform 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
        onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
      >
        🍖 Acordei! Me recomenda um EP!
      </button>
      {showModal&&(
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(5,10,20,0.97)",display:"flex",flexDirection:"column",padding:"24px",fontFamily:"Nunito,sans-serif",animation:"fadeIn 0.3s ease",overflowY:"auto"}}>
          <div style={{maxWidth:"480px",width:"100%",margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px"}}>
              <button onClick={()=>{setShowModal(false);setSearched(false);setRecs([]);}} style={{background:"rgba(255,255,255,0.05)",border:"none",color:"white",width:"36px",height:"36px",borderRadius:"50%",cursor:"pointer",fontSize:"18px"}}>←</button>
              <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"20px",fontWeight:700}}>🍖 Modo Acordei!</div>
            </div>
            <div style={{background:"rgba(192,57,43,0.1)",borderRadius:"20px",border:"2px solid rgba(192,57,43,0.3)",padding:"20px",marginBottom:"20px"}}>
              <div style={{color:"white",fontWeight:700,marginBottom:"16px",fontSize:"16px"}}>Quanto tempo livre você tem?</div>
              <div style={{fontFamily:"Cinzel,serif",fontSize:"48px",fontWeight:900,color:"#f0a500",textAlign:"center",marginBottom:"8px"}}>{minutes}min</div>
              <div style={{color:"rgba(255,255,255,0.5)",textAlign:"center",marginBottom:"16px",fontSize:"13px"}}>≈ {Math.floor(minutes/24)} episódio(s)</div>
              <input type="range" min="24" max="480" step="24" value={minutes} onChange={e=>setMinutes(Number(e.target.value))} style={{width:"100%",accentColor:"#f0a500"}}/>
            </div>
            <button onClick={handleRecommend} style={{width:"100%",padding:"14px",borderRadius:"16px",background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",marginBottom:"20px"}}>
              🗺️ Me mostra o que assistir!
            </button>
            {searched&&recs.length===0&&(
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.5)",padding:"20px",background:"rgba(255,255,255,0.03)",borderRadius:"16px"}}>
                {Math.floor(minutes/24)===0?"Precisa de pelo menos 24 minutos! 😅":"Você já assistiu todos os eps épicos desse arco! 🏴‍☠️"}
              </div>
            )}
            {recs.map(ep=>(
              <div key={ep.num} style={{background:"rgba(255,255,255,0.04)",borderRadius:"16px",border:"1px solid rgba(240,165,0,0.2)",padding:"14px",marginBottom:"12px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                  <div style={{background:"linear-gradient(135deg,#f0a500,#ffd700)",borderRadius:"8px",padding:"4px 10px",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"13px",color:"#0a1628"}}>EP {ep.num}</div>
                  <div style={{color:"white",fontWeight:700,fontSize:"14px",flex:1}}>{ep.title}</div>
                </div>
                <div style={{color:"rgba(245,240,232,0.7)",fontSize:"13px",lineHeight:1.6}}>{ep.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// FISHING MINIGAME
function FishingGame({state,onUpdate}){
  const[result,setResult]=useState(null);
  const[casting,setCasting]=useState(false);
  const FISH_COOLDOWN=60000;
  const canFish=Date.now()-( state.lastFishTime||0)>=FISH_COOLDOWN;
  const cooldownLeft=Math.max(0,Math.ceil((( state.lastFishTime||0)+FISH_COOLDOWN-Date.now())/1000));

  const handleFish=()=>{
    if(!canFish||casting)return;
    setCasting(true);setResult(null);
    setTimeout(()=>{
      const catches=[
        {xp:1,msg:"Pescou um peixinho! +1 XP 🐟"},
        {xp:2,msg:"Um peixe médio! +2 XP 🐠"},
        {xp:3,msg:"Peixe grande! +3 XP 🐡"},
        {xp:5,msg:"PEIXE ÉPICO! +5 XP 🦈"},
        {xp:0,msg:"Não pescou nada... 🎣"},
      ];
      const weights=[30,30,25,10,5];
      let rand=Math.random()*100,idx=0;
      for(let i=0;i<weights.length;i++){rand-=weights[i];if(rand<=0){idx=i;break;}}
      const res=catches[idx];
      setResult(res);
      onUpdate({...state,xp:state.xp+res.xp,level:Math.floor((state.xp+res.xp)/200)+1,lastFishTime:Date.now()});
      setCasting(false);
    },1200);
  };

  return(
    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(26,188,156,0.15)",padding:"16px",marginTop:"16px"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#1abc9c",fontSize:"15px",fontWeight:700,marginBottom:"12px"}}>🎣 Minijogo de Pesca</div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:"48px",marginBottom:"12px",animation:casting?"float 0.5s ease-in-out infinite":"none"}}>{casting?"🎣":"🐟"}</div>
        {result&&<div style={{background:"rgba(240,165,0,0.1)",borderRadius:"12px",padding:"10px",border:"1px solid rgba(240,165,0,0.2)",marginBottom:"12px",color:"#f0a500",fontWeight:700,fontSize:"14px"}}>{result.msg}</div>}
        <button onClick={handleFish} disabled={!canFish||casting} style={{padding:"12px 32px",borderRadius:"50px",border:"none",cursor:canFish&&!casting?"pointer":"not-allowed",background:canFish&&!casting?"linear-gradient(135deg,#1abc9c,#2ecc71)":"rgba(255,255,255,0.1)",color:canFish&&!casting?"#0a1628":"rgba(255,255,255,0.4)",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"14px"}}>
          {casting?"Pescando...":canFish?"🎣 Pescar!":` ⏳ ${cooldownLeft}s`}
        </button>
        <div style={{color:"rgba(255,255,255,0.3)",fontSize:"11px",marginTop:"8px"}}>1 pesca por minuto • 1-5 XP</div>
      </div>
    </div>
  );
}

// DAILY CHALLENGES
function DailyChallenges({state,onUpdate}){
  const challenges=useMemo(()=>{
    const today=new Date().toDateString();
    if(state.lastChallengeDate===today&&state.dailyChallengesStatus?.length>0)return state.dailyChallengesStatus;
    const shuffled=[...DAILY_POOL].sort(()=>Math.random()-0.5).slice(0,3).map(c=>({...c,current:0,done:false}));
    setTimeout(()=>onUpdate({...state,dailyChallengesStatus:shuffled,lastChallengeDate:today}),0);
    return shuffled;
  },[state.lastChallengeDate]);

  return(
    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(26,188,156,0.2)",padding:"16px",marginTop:"16px"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#1abc9c",fontSize:"15px",fontWeight:700,marginBottom:"12px"}}>⚓ Desafios Diários</div>
      {challenges.map(c=>(
        <div key={c.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px",borderRadius:"12px",marginBottom:"8px",background:c.done?"rgba(26,188,156,0.1)":"rgba(255,255,255,0.02)",border:`1px solid ${c.done?"rgba(26,188,156,0.3)":"rgba(255,255,255,0.05)"}`}}>
          <div style={{fontSize:"20px"}}>{c.done?"✅":"🎯"}</div>
          <div style={{flex:1}}>
            <div style={{color:c.done?"rgba(255,255,255,0.5)":"white",fontSize:"13px",fontWeight:600}}>{c.desc}</div>
            <div style={{height:"4px",background:"rgba(255,255,255,0.08)",borderRadius:"2px",marginTop:"4px",overflow:"hidden"}}>
              <div style={{width:`${Math.min(100,(c.current/c.target)*100)}%`,height:"100%",background:"linear-gradient(90deg,#1abc9c,#2ecc71)",borderRadius:"2px"}}/>
            </div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px",marginTop:"2px"}}>{c.current}/{c.target} • +{c.reward} XP</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// BLACK MARKET SHOP
function BlackMarketShop({state,onUpdate}){
  const[activeTab,setActiveTab]=useState("skins");
  const[notif,setNotif]=useState(null);

  const showNotif=(msg,ok)=>{setNotif({msg,ok});setTimeout(()=>setNotif(null),2500);};

  const handleBuy=(item)=>{
    if(state.xp<item.cost){showNotif(`XP insuficiente! Precisa de ${item.cost} XP.`,false);return;}
    let updated={...state,xp:state.xp-item.cost};
    if(item.type==="skin"){
      updated={...updated,unlockedSkins:[...( state.unlockedSkins||["default"]),item.id],currentSkin:item.id};
    }else if(item.type==="theme"){
      updated={...updated,currentTheme:item.id};
    }else if(item.id==="streak-freeze"){
      updated={...updated,streakFreeze:true};
    }else if(item.id==="xp-double"){
      updated={...updated,xpMultiplier:{active:true,expiresAt:Date.now()+15*60*1000}};
    }
    onUpdate(updated);
    showNotif(`${item.name} adquirido! 🎉`,true);
  };

  const tabs=[{id:"skins",label:"🐱 Skins"},{id:"themes",label:"🎨 Temas"},{id:"items",label:"⚡ Itens"}];
  const filtered=SHOP_ITEMS.filter(i=>i.type===activeTab.replace("s","").replace("theme","theme")||
    (activeTab==="skins"&&i.type==="skin")||(activeTab==="themes"&&i.type==="theme")||(activeTab==="items"&&i.type==="item"));

  return(
    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.2)",padding:"16px",marginTop:"16px"}}>
      {notif&&<div style={{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:2000,background:notif.ok?"linear-gradient(135deg,#1abc9c,#2ecc71)":"linear-gradient(135deg,#c0392b,#e74c3c)",color:"white",padding:"10px 20px",borderRadius:"50px",fontWeight:700,animation:"fadeIn 0.3s ease",fontFamily:"Nunito,sans-serif"}}>{notif.msg}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"15px",fontWeight:700}}>🏪 Mercado Negro</div>
        <div style={{background:"rgba(240,165,0,0.1)",borderRadius:"50px",padding:"4px 12px",border:"1px solid rgba(240,165,0,0.3)",color:"#f0a500",fontWeight:700,fontSize:"13px"}}>⭐ {state.xp} XP</div>
      </div>
      <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{padding:"6px 12px",borderRadius:"20px",border:"none",cursor:"pointer",background:activeTab===t.id?"rgba(240,165,0,0.2)":"rgba(255,255,255,0.04)",color:activeTab===t.id?"#f0a500":"rgba(255,255,255,0.5)",fontWeight:700,fontSize:"12px",fontFamily:"Nunito,sans-serif",borderBottom:activeTab===t.id?"2px solid #f0a500":"2px solid transparent"}}>{t.label}</button>
        ))}
      </div>
      {SHOP_ITEMS.filter(i=>(activeTab==="skins"&&i.type==="skin")||(activeTab==="themes"&&i.type==="theme")||(activeTab==="items"&&i.type==="item")).map(item=>{
        const owned=(state.unlockedSkins||[]).includes(item.id)||(state.currentTheme===item.id);
        const canAfford=state.xp>=item.cost;
        return(
          <div key={item.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px",borderRadius:"14px",background:owned?"rgba(26,188,156,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${owned?"rgba(26,188,156,0.2)":"rgba(255,255,255,0.06)"}`,marginBottom:"8px"}}>
            <div style={{flex:1}}>
              <div style={{color:"white",fontWeight:700,fontSize:"14px"}}>{item.name}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{item.desc}</div>
              <div style={{color:"#f0a500",fontSize:"12px",fontWeight:700,marginTop:"2px"}}>⭐ {item.cost} XP</div>
            </div>
            <button onClick={()=>!owned&&handleBuy(item)} disabled={owned||!canAfford} style={{padding:"8px 14px",borderRadius:"12px",border:"none",cursor:owned||!canAfford?"not-allowed":"pointer",background:owned?"rgba(26,188,156,0.2)":canAfford?"linear-gradient(135deg,#f0a500,#ffd700)":"rgba(255,255,255,0.08)",color:owned?"#1abc9c":canAfford?"#0a1628":"rgba(255,255,255,0.3)",fontWeight:700,fontSize:"12px",fontFamily:"Nunito,sans-serif",flexShrink:0}}>
              {owned?"✓ Obtido":canAfford?"Comprar":"Sem XP"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// LEAGUE PANEL
function LeaguePanel({state}){
  const LEAGUES=[
    {name:"East Blue",icon:"🌊",minXP:0,maxXP:500,color:"#3498db"},
    {name:"Grand Line",icon:"🗺️",minXP:500,maxXP:1500,color:"#2ecc71"},
    {name:"New World",icon:"⚔️",minXP:1500,maxXP:3000,color:"#9b59b6"},
    {name:"Marineford",icon:"⚓",minXP:3000,maxXP:6000,color:"#e67e22"},
    {name:"Novo Mundo",icon:"👑",minXP:6000,maxXP:99999,color:"#f0a500"},
  ];
  const currentLeague=LEAGUES.find(l=>state.xp>=l.minXP&&state.xp<l.maxXP)||LEAGUES[LEAGUES.length-1];
  const progress=currentLeague.maxXP===99999?100:((state.xp-currentLeague.minXP)/(currentLeague.maxXP-currentLeague.minXP))*100;
  const weekXP=state.weeklyXP||0;
  const bots=[
    {name:"Buggy_Fan",xp:Math.max(5,weekXP+80),avatar:"🤡"},
    {name:"Sogeking_King",xp:Math.max(5,weekXP+120),avatar:"🎯"},
    {name:"Nami_Nav",xp:Math.max(5,weekXP+60),avatar:"🗺️"},
  ];
  const ranking=[{name:"Você",xp:weekXP,avatar:"🏴‍☠️"},...bots].sort((a,b)=>b.xp-a.xp);

  return(
    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginTop:"16px"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"15px",fontWeight:700,marginBottom:"12px"}}>🏆 Liga Pirata</div>
      <div style={{background:"rgba(240,165,0,0.08)",borderRadius:"16px",padding:"14px",border:"1px solid rgba(240,165,0,0.2)",marginBottom:"12px",textAlign:"center"}}>
        <div style={{fontSize:"32px",marginBottom:"4px"}}>{currentLeague.icon}</div>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontWeight:700,fontSize:"16px"}}>{currentLeague.name}</div>
        <div style={{height:"6px",background:"rgba(255,255,255,0.08)",borderRadius:"3px",margin:"8px 0",overflow:"hidden"}}>
          <div style={{width:`${progress}%`,height:"100%",background:`linear-gradient(90deg,${currentLeague.color},#ffd700)`,borderRadius:"3px",transition:"width 0.5s"}}/>
        </div>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{state.xp} / {currentLeague.maxXP===99999?"∞":currentLeague.maxXP} XP</div>
      </div>
      <div style={{fontWeight:700,color:"rgba(255,255,255,0.6)",fontSize:"12px",marginBottom:"8px"}}>RANKING SEMANAL</div>
      {ranking.map((p,i)=>(
        <div key={p.name} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 10px",borderRadius:"10px",marginBottom:"4px",background:p.name==="Você"?"rgba(240,165,0,0.08)":"rgba(255,255,255,0.02)",border:`1px solid ${p.name==="Você"?"rgba(240,165,0,0.2)":"transparent"}`}}>
          <div style={{fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"14px",color:i===0?"#ffd700":i===1?"#c0c0c0":i===2?"#cd7f32":"rgba(255,255,255,0.4)",width:"20px"}}>{i+1}</div>
          <div style={{fontSize:"20px"}}>{p.avatar}</div>
          <div style={{flex:1,color:p.name==="Você"?"#f0a500":"rgba(255,255,255,0.8)",fontWeight:p.name==="Você"?700:400,fontSize:"14px"}}>{p.name}</div>
          <div style={{color:"#f0a500",fontWeight:700,fontFamily:"Cinzel,serif",fontSize:"13px"}}>{p.xp} XP</div>
        </div>
      ))}
    </div>
  );
}

// DASHBOARD
function Dashboard({state,onUpdate,onNav}){
  const[checkedIn,setCheckedIn]=useState(false);
  const[notification,setNotification]=useState(null);

  const totalEssential=useMemo(()=>ARCS_DATA.reduce((s,a)=>s+a.epsEssential.length,0),[]);
  const watchedEssential=useMemo(()=>ARCS_DATA.reduce((s,a)=>s+a.epsEssential.filter(ep=>(state.watchedEps||[]).includes(ep)).length,0),[state.watchedEps]);
  const todayArc=useMemo(()=>{
    const unlocked=ARCS_DATA.find(a=>(state.unlockedArcs||[]).includes(a.id)&&!(state.completedArcs||[]).includes(a.id));
    return unlocked||ARCS_DATA[0];
  },[state.unlockedArcs,state.completedArcs]);

  const showNotification=(msg)=>{setNotification(msg);setTimeout(()=>setNotification(null),2500);};
  const progress=totalEssential>0?(watchedEssential/totalEssential*100).toFixed(1):0;
  const alreadyCheckedIn=state.lastCheckin===new Date().toDateString();

  const handleCheckin=()=>{
    if(checkedIn||alreadyCheckedIn)return;
    const today=new Date().toDateString();
    const yesterday=new Date(Date.now()-86400000).toDateString();
    const newStreak=state.lastCheckin===yesterday?state.streak+1:1;
    const newXP=state.xp+20;
    onUpdate({...state,xp:newXP,level:Math.floor(newXP/200)+1,streak:newStreak,maxStreak:Math.max(state.maxStreak,newStreak),lastCheckin:today,weeklyXP:(state.weeklyXP||0)+20});
    setCheckedIn(true);
    showNotification("+20 XP por check-in diário! ⚓");
  };

  const mascotMood=state.streak>=3?"happy":state.xp===0?"normal":"happy";

  return(
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease"}}>
      {notification&&(
        <div style={{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:1000,background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",padding:"10px 20px",borderRadius:"50px",fontWeight:700,animation:"fadeIn 0.3s ease",boxShadow:"0 4px 20px rgba(240,165,0,0.4)",whiteSpace:"nowrap",fontFamily:"Nunito,sans-serif"}}>{notification}</div>
      )}

      {/* Header card */}
      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginBottom:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
          <div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:"12px",fontFamily:"Nunito,sans-serif"}}>Capitão</div>
            <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"20px",fontWeight:700}}>{state.userName}</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{getLevelName(state.level)} • {state.currentTitle||"Recruta"}</div>
          </div>
          <StreakBadge streak={state.streak}/>
        </div>
        <XPBar xp={state.xp} level={state.level}/>
      </div>

      {/* Progress */}
      <div style={{background:"linear-gradient(135deg,rgba(26,188,156,0.1),rgba(10,22,40,0.3))",borderRadius:"20px",border:"1px solid rgba(26,188,156,0.2)",padding:"16px",marginBottom:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
          <span style={{color:"rgba(245,240,232,0.8)",fontFamily:"Nunito,sans-serif",fontWeight:700}}>📊 Progresso Geral</span>
          <span style={{color:"#1abc9c",fontWeight:700,fontFamily:"Cinzel,serif"}}>{progress}%</span>
        </div>
        <div style={{height:"12px",background:"rgba(255,255,255,0.08)",borderRadius:"6px",overflow:"hidden",marginBottom:"6px"}}>
          <div style={{width:`${progress}%`,height:"100%",background:"linear-gradient(90deg,#1abc9c,#2ecc71)",borderRadius:"6px",transition:"width 1s ease",boxShadow:"0 0 10px rgba(26,188,156,0.5)"}}/>
        </div>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{watchedEssential} de {totalEssential} episódios essenciais</div>
      </div>

      {/* Daily mission */}
      <div style={{background:"linear-gradient(135deg,rgba(192,57,43,0.1),rgba(10,22,40,0.3))",borderRadius:"20px",border:"1px solid rgba(192,57,43,0.3)",padding:"16px",marginBottom:"16px"}}>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"16px",fontWeight:700,marginBottom:"4px"}}>⚓ Missão de Hoje</div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",marginBottom:"12px",fontFamily:"Nunito,sans-serif"}}>Meta: {state.dailyGoal} eps — Assistidos hoje: {state.dailyEpsToday||0}</div>
        <div style={{height:"8px",background:"rgba(255,255,255,0.08)",borderRadius:"4px",overflow:"hidden",marginBottom:"12px"}}>
          <div style={{width:`${Math.min(100,((state.dailyEpsToday||0)/state.dailyGoal)*100)}%`,height:"100%",background:"linear-gradient(90deg,#c0392b,#e74c3c)",borderRadius:"4px",transition:"width 0.5s"}}/>
        </div>
        <button onClick={()=>onNav("map")} style={{background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"white",padding:"10px 20px",borderRadius:"12px",border:"none",cursor:"pointer",fontWeight:700,fontFamily:"Nunito,sans-serif",fontSize:"14px",width:"100%"}}>Ver Mapa de Arcos →</button>
      </div>

      {/* Next arc */}
      {todayArc&&(
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginBottom:"16px"}}>
          <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"14px",fontWeight:700,marginBottom:"8px"}}>🗺️ Próxima Missão</div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{fontSize:"40px"}}>{todayArc.icon}</div>
            <div>
              <div style={{color:"white",fontWeight:700,fontFamily:"Cinzel,serif"}}>{todayArc.name}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{todayArc.saga}</div>
              <div style={{color:"#1abc9c",fontSize:"12px",marginTop:"4px"}}>{todayArc.epsEssential.length} eps essenciais</div>
            </div>
          </div>
          <div style={{marginTop:"12px",padding:"10px",background:"rgba(240,165,0,0.05)",borderRadius:"10px",color:"rgba(245,240,232,0.7)",fontSize:"13px",fontFamily:"Nunito,sans-serif"}}>{todayArc.hype}</div>
        </div>
      )}

      {/* Check-in */}
      <button onClick={handleCheckin} disabled={checkedIn||alreadyCheckedIn} style={{width:"100%",padding:"14px",borderRadius:"16px",border:"2px solid rgba(240,165,0,0.3)",background:(checkedIn||alreadyCheckedIn)?"rgba(255,255,255,0.03)":"rgba(240,165,0,0.1)",color:(checkedIn||alreadyCheckedIn)?"rgba(255,255,255,0.3)":"#f0a500",cursor:(checkedIn||alreadyCheckedIn)?"not-allowed":"pointer",fontWeight:700,fontFamily:"Nunito,sans-serif",fontSize:"15px",transition:"all 0.2s"}}>
        {(checkedIn||alreadyCheckedIn)?"✅ Check-in feito hoje!":"⚓ Check-in diário (+20 XP)"}
      </button>

      {/* Mascote */}
      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginTop:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}}>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"13px",fontWeight:700,alignSelf:"flex-start"}}>🐱 Zoro-Gato</div>
        <ZoroCatMascot skin={state.currentSkin||"default"} mood={mascotMood}/>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)"}}>🏴‍☠️ {Math.floor(state.xp*1.5)} Berries de recompensa</div>
      </div>

      {/* Botão Acordei */}
      <WakeUpRecommender state={state}/>

      {/* Desafios diários */}
      <DailyChallenges state={state} onUpdate={onUpdate}/>

      {/* Pesca */}
      <FishingGame state={state} onUpdate={onUpdate}/>

      {/* Loja */}
      <BlackMarketShop state={state} onUpdate={onUpdate}/>

      {/* Liga */}
      <LeaguePanel state={state}/>

      <div style={{textAlign:"center",marginTop:"16px",color:"rgba(255,255,255,0.3)",fontSize:"12px",fontFamily:"Nunito,sans-serif"}}>
        {MOTIVATIONAL[Math.floor(Math.random()*MOTIVATIONAL.length)]}
      </div>
    </div>
  );
}

// ARC CARD
function ArcCard({arc,state,onOpen}){
  const isUnlocked=(state.unlockedArcs||[]).includes(arc.id);
  const isCompleted=(state.completedArcs||[]).includes(arc.id);
  const isActive=isUnlocked&&!isCompleted;
  const watchedInArc=arc.epsEssential.filter(ep=>(state.watchedEps||[]).includes(ep)).length;
  const progress=arc.epsEssential.length>0?watchedInArc/arc.epsEssential.length*100:0;
  const statusIcon=isCompleted?"✅":isActive?"⚓":"🔒";
  const statusColor=isCompleted?"#1abc9c":isActive?"#f0a500":"rgba(255,255,255,0.2)";
  return(
    <div onClick={()=>isUnlocked&&onOpen(arc)} style={{background:isCompleted?"linear-gradient(135deg,rgba(26,188,156,0.1),rgba(10,22,40,0.5))":isActive?"linear-gradient(135deg,rgba(240,165,0,0.08),rgba(10,22,40,0.5))":"rgba(255,255,255,0.02)",borderRadius:"20px",border:`2px solid ${isCompleted?"rgba(26,188,156,0.4)":isActive?"rgba(240,165,0,0.3)":"rgba(255,255,255,0.05)"}`,padding:"16px",cursor:isUnlocked?"pointer":"default",transition:"all 0.2s",opacity:isUnlocked?1:0.4,boxShadow:isActive?"0 4px 20px rgba(240,165,0,0.1)":isCompleted?"0 4px 20px rgba(26,188,156,0.1)":"none"}}
      onMouseEnter={e=>{if(isUnlocked)e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
    >
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"8px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{fontSize:"32px"}}>{arc.icon}</div>
          <div>
            <div style={{fontFamily:"Cinzel,serif",color:statusColor,fontWeight:700,fontSize:"15px"}}>{arc.name}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px"}}>{arc.saga}</div>
          </div>
        </div>
        <div style={{fontSize:"20px"}}>{statusIcon}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:"12px"}}>{arc.epsEssential.length} essenciais / {arc.epsTotal.length} total</div>
        <div style={{color:"#f0a500",fontSize:"12px"}}>{"⭐".repeat(arc.difficulty)}</div>
      </div>
      {isUnlocked&&(
        <div style={{height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden"}}>
          <div style={{width:`${progress}%`,height:"100%",background:isCompleted?"linear-gradient(90deg,#1abc9c,#2ecc71)":"linear-gradient(90deg,#f0a500,#ffd700)",borderRadius:"3px",transition:"width 0.5s"}}/>
        </div>
      )}
    </div>
  );
}

// ARC MAP
function ArcMap({state,onUpdate}){
  const[selectedArc,setSelectedArc]=useState(null);
  const sagas=useMemo(()=>{
    const map={};
    ARCS_DATA.forEach(a=>{if(!map[a.saga])map[a.saga]=[];map[a.saga].push(a);});
    return map;
  },[]);
  return(
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700,marginBottom:"4px"}}>🗺️ Grand Line</div>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",marginBottom:"20px",fontFamily:"Nunito,sans-serif"}}>Sua rota pela maior aventura do mundo</div>
      {Object.entries(sagas).map(([saga,arcs])=>(
        <div key={saga} style={{marginBottom:"24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",paddingBottom:"8px",borderBottom:"1px solid rgba(240,165,0,0.15)"}}>
            <div style={{background:"linear-gradient(135deg,#f0a500,#ffd700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px"}}>Saga {saga}</div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",background:"rgba(255,255,255,0.05)",padding:"2px 8px",borderRadius:"10px"}}>
              {arcs.filter(a=>(state.completedArcs||[]).includes(a.id)).length}/{arcs.length} completos
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {arcs.map(arc=><ArcCard key={arc.id} arc={arc} state={state} onOpen={setSelectedArc}/>)}
          </div>
        </div>
      ))}
      {selectedArc&&<ArcModal arc={selectedArc} state={state} onUpdate={onUpdate} onClose={()=>setSelectedArc(null)}/>}
    </div>
  );
}

// EPISODE ROW
function EpRow({ep,type,state,onToggle}:{ep:number,type:string,state:any,onToggle:(ep:number,type:string)=>void}){
  const watched=(state.watchedEps||[]).map(Number).includes(Number(ep));
  const colors:{[k:string]:string}={essential:"#f0a500",recommended:"#1abc9c",filler:"rgba(255,255,255,0.3)"};
  const tags:{[k:string]:string}={essential:"ESSENCIAL",recommended:"RECOMEND.",filler:"FILLER"};
  return(
    <div onClick={()=>onToggle(ep,type)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"10px",marginBottom:"4px",background:watched?"rgba(26,188,156,0.08)":"rgba(255,255,255,0.02)",border:`1px solid ${watched?"rgba(26,188,156,0.2)":"rgba(255,255,255,0.04)"}`,transition:"all 0.15s",cursor:"pointer"}}>
      <div style={{width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,border:`2px solid ${watched?"#1abc9c":colors[type]}`,background:watched?"#1abc9c":"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"12px",transition:"all 0.2s"}}>{watched?"✓":""}</div>
      <div style={{flex:1}}><span style={{color:watched?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.9)",fontSize:"14px",fontWeight:600}}>Ep. {ep}</span></div>
      <div style={{fontSize:"9px",fontWeight:700,color:colors[type],border:`1px solid ${colors[type]}`,padding:"2px 6px",borderRadius:"6px",opacity:0.8,flexShrink:0}}>{tags[type]}</div>
      <div style={{color:"rgba(255,255,255,0.3)",fontSize:"11px",flexShrink:0}}>24min</div>
    </div>
  );
}

// ARC MODAL
function ArcModal({arc,state,onUpdate,onClose}){
  const[activeTab,setActiveTab]=useState("episodes");
  const[showQuiz,setShowQuiz]=useState(false);
  const[notification,setNotification]=useState(null);

  const watchedEps=(state.watchedEps||[]).map(Number);
  const allEssentialWatched=arc.epsEssential.every(ep=>watchedEps.includes(Number(ep)));
  const quizDone=state.quizResults?.[arc.id]!==undefined;

  const showNotif=(msg)=>{setNotification(msg);setTimeout(()=>setNotification(null),2000);};

  const toggleEp=(ep:number,type:string)=>{
    const watched=(state.watchedEps||[]).map(Number);
    const isWatched=watched.includes(Number(ep));
    const xpGain=type==="essential"?10:type==="recommended"?5:2;
    const newWatched=isWatched?watched.filter((e:number)=>e!==Number(ep)):[...watched,Number(ep)];
    const newXP=isWatched?Math.max(0,state.xp-xpGain):state.xp+xpGain;
    const newDailyEps=isWatched?Math.max(0,(state.dailyEpsToday||0)-1):(state.dailyEpsToday||0)+1;
    const allEssDone=arc.epsEssential.every((ep:number)=>newWatched.includes(Number(ep)));
    let newCompleted=[...(state.completedArcs||[])];
    let newUnlocked=[...(state.unlockedArcs||[])];
    if(allEssDone&&!newCompleted.includes(arc.id)){
      newCompleted.push(arc.id);
      const idx=ARCS_DATA.findIndex(a=>a.id===arc.id);
      if(idx<ARCS_DATA.length-1&&!newUnlocked.includes(ARCS_DATA[idx+1].id))newUnlocked.push(ARCS_DATA[idx+1].id);
    }
    if(!isWatched)showNotif(`+${xpGain} XP`);
    onUpdate({...state,watchedEps:newWatched,xp:newXP,level:Math.floor(newXP/200)+1,dailyEpsToday:newDailyEps,dailyEpsRecord:Math.max(state.dailyEpsRecord||0,newDailyEps),completedArcs:newCompleted,unlockedArcs:newUnlocked,weeklyXP:(state.weeklyXP||0)+(isWatched?-xpGain:xpGain)});
  };

  const fillerEps=arc.epsTotal.filter(ep=>!arc.epsEssential.includes(ep)&&!(arc.epsRecommended||[]).includes(ep));
  const totalHours=(arc.epsEssential.length*24/60).toFixed(1);

  if(showQuiz)return<Quiz arc={arc} state={state} onUpdate={onUpdate} onClose={()=>{setShowQuiz(false);onClose();}}/>;

  return(
    <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(5,10,20,0.92)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease",fontFamily:"Nunito,sans-serif"}}>
      {notification&&<div style={{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:300,background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",padding:"8px 20px",borderRadius:"50px",fontWeight:700,animation:"fadeIn 0.2s ease"}}>{notification}</div>}
      <div style={{background:"rgba(10,22,40,0.98)",borderBottom:"1px solid rgba(240,165,0,0.2)",padding:"16px",display:"flex",alignItems:"center",gap:"12px",flexShrink:0}}>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.05)",border:"none",color:"white",width:"36px",height:"36px",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>←</button>
        <div style={{fontSize:"32px"}}>{arc.icon}</div>
        <div>
          <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontWeight:700,fontSize:"16px"}}>{arc.name}</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>Saga {arc.saga}</div>
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,rgba(240,165,0,0.08),rgba(10,22,40,0))",padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"rgba(245,240,232,0.8)",fontSize:"13px",lineHeight:1.6,flexShrink:0}}>{arc.hype}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0}}>
        {[{label:"Essenciais",val:arc.epsEssential.length,color:"#f0a500"},{label:"Total eps",val:arc.epsTotal.length,color:"#1abc9c"},{label:"Horas",val:`${totalHours}h`,color:"#9b59b6"}].map(s=>(
          <div key={s.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"10px",textAlign:"center"}}>
            <div style={{color:s.color,fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px"}}>{s.val}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0,background:"rgba(10,22,40,0.5)"}}>
        {["episodes","tips"].map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{flex:1,padding:"12px",background:"none",border:"none",cursor:"pointer",color:activeTab===tab?"#f0a500":"rgba(255,255,255,0.4)",fontWeight:700,borderBottom:activeTab===tab?"2px solid #f0a500":"2px solid transparent",fontFamily:"Nunito,sans-serif",fontSize:"14px"}}>
            {tab==="episodes"?"📋 Episódios":"💡 Dicas"}
          </button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px",paddingBottom:"32px"}}>
        {activeTab==="episodes"&&(
          <div>
            {arc.epsEssential.length>0&&<div style={{marginBottom:"16px"}}><div style={{color:"#f0a500",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>🌟 Essenciais</div>{arc.epsEssential.map(ep=><EpRow key={ep} ep={ep} type="essential" state={state} onToggle={toggleEp}/>)}</div>}
            {(arc.epsRecommended||[]).length>0&&<div style={{marginBottom:"16px"}}><div style={{color:"#1abc9c",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>👍 Recomendados</div>{arc.epsRecommended.map(ep=><EpRow key={ep} ep={ep} type="recommended" state={state} onToggle={toggleEp}/>)}</div>}
            {fillerEps.length>0&&<div style={{marginBottom:"16px"}}><div style={{color:"rgba(255,255,255,0.4)",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>💤 Fillers (pode pular)</div>{fillerEps.map(ep=><EpRow key={ep} ep={ep} type="filler" state={state} onToggle={toggleEp}/>)}</div>}
            {/* BOTÃO QUIZ DENTRO DO SCROLL */}
            <div style={{marginTop:"24px",paddingTop:"16px",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
              {allEssentialWatched&&!quizDone?(
                <button onClick={()=>setShowQuiz(true)} style={{width:"100%",padding:"16px",borderRadius:"16px",border:"none",cursor:"pointer",background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",boxShadow:"0 4px 20px rgba(240,165,0,0.4)"}}>⚓ Iniciar Quiz do Arco!</button>
              ):quizDone?(
                <div style={{textAlign:"center",color:"#1abc9c",fontWeight:700,fontSize:"15px",padding:"16px"}}>✅ Quiz completo! {state.quizResults[arc.id]?.score}/{arc.quiz.length} corretas</div>
              ):(
                <div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:"13px",padding:"12px",background:"rgba(255,255,255,0.02)",borderRadius:"12px"}}>
                  🔒 Marque todos os {arc.epsEssential.length} essenciais para liberar o quiz!
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab==="tips"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {[{icon:"⚡",title:"Velocidade 1.5x",text:`Economize ${Math.round(arc.epsEssential.length*24*0.33)} minutos neste arco!`},{icon:"⏭️",title:"Pule os fillers",text:`${fillerEps.length} fillers = ${Math.round(fillerEps.length*24)} minutos economizados.`},{icon:"🎯",title:"Foco no essencial",text:`${arc.epsEssential.length} essenciais = ${totalHours}h de puro conteúdo.`}].map(t=>(
              <div key={t.icon} style={{background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"16px",border:"1px solid rgba(240,165,0,0.1)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}><span style={{fontSize:"24px"}}>{t.icon}</span><span style={{color:"#f0a500",fontWeight:700,fontFamily:"Cinzel,serif",fontSize:"14px"}}>{t.title}</span></div>
                <p style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",margin:0,lineHeight:1.6}}>{t.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// QUIZ
function Quiz({arc,state,onUpdate,onClose}){
  const[questions]=useState(()=>[...arc.quiz].sort(()=>Math.random()-0.5));
  const[current,setCurrent]=useState(0);
  const[selected,setSelected]=useState(null);
  const[answered,setAnswered]=useState(false);
  const[score,setScore]=useState(0);
  const[done,setDone]=useState(false);

  const q=questions[current];

  const handleAnswer=(idx)=>{
    if(answered)return;
    setSelected(idx);setAnswered(true);
    if(idx===q.correct)setScore(s=>s+1);
  };

  const handleNext=()=>{
    if(current<questions.length-1){setCurrent(c=>c+1);setSelected(null);setAnswered(false);}
    else{
      const finalScore=score+(selected===q.correct?1:0);
      const isPerfect=finalScore===questions.length;
      const xpGain=30+(isPerfect?50:0);
      const newXP=state.xp+xpGain;
      const idx=ARCS_DATA.findIndex(a=>a.id===arc.id);
      let newUnlocked=[...(state.unlockedArcs||[])];
      let newCompleted=[...(state.completedArcs||[])];
      if(!newCompleted.includes(arc.id))newCompleted.push(arc.id);
      if(idx<ARCS_DATA.length-1&&!newUnlocked.includes(ARCS_DATA[idx+1].id))newUnlocked.push(ARCS_DATA[idx+1].id);
      onUpdate({...state,xp:newXP,level:Math.floor(newXP/200)+1,quizResults:{...(state.quizResults||{}),[arc.id]:{score:finalScore,total:questions.length}},completedArcs:newCompleted,unlockedArcs:newUnlocked,perfectQuizzes:isPerfect?(state.perfectQuizzes||0)+1:(state.perfectQuizzes||0),weeklyXP:(state.weeklyXP||0)+xpGain});
      setDone(true);setScore(finalScore);
    }
  };

  if(done){
    const pct=score/questions.length;
    const msgs=["Precisa estudar mais, marinheiro! 💪","Bom esforço! O Grand Line te aguarda!","Muito bem! Digno de um capitão pirata!","PERFEITO! Você é um verdadeiro nakama! 🏴‍☠️"];
    return(
      <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(5,10,20,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px",fontFamily:"Nunito,sans-serif",animation:"fadeIn 0.4s ease"}}>
        <div style={{fontSize:"80px",marginBottom:"16px"}}>{pct>=1?"🏆":pct>=0.7?"⭐":"⚓"}</div>
        <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"28px",marginBottom:"8px",textAlign:"center"}}>Quiz Completo!</h2>
        <div style={{fontFamily:"Cinzel,serif",fontSize:"48px",fontWeight:900,background:"linear-gradient(135deg,#f0a500,#ffd700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px"}}>{score}/{questions.length}</div>
        <p style={{color:"rgba(255,255,255,0.7)",textAlign:"center",marginBottom:"24px"}}>{msgs[pct<0.4?0:pct<0.7?1:pct<1?2:3]}</p>
        <div style={{background:"rgba(240,165,0,0.1)",borderRadius:"16px",padding:"12px 24px",border:"1px solid rgba(240,165,0,0.2)",marginBottom:"24px",color:"#f0a500",fontWeight:700,fontSize:"18px"}}>+{30+(pct===1?50:0)} XP ganhos!</div>
        <button onClick={onClose} style={{background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",boxShadow:"0 4px 20px rgba(240,165,0,0.4)"}}>Próxima Ilha! 🗺️</button>
      </div>
    );
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(5,10,20,0.98)",display:"flex",flexDirection:"column",fontFamily:"Nunito,sans-serif",animation:"fadeIn 0.4s ease",overflowY:"auto",padding:"20px 20px 40px"}}>
      <div style={{marginBottom:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.6)",fontSize:"13px",marginBottom:"8px"}}><span>Quiz — {arc.name}</span><span>{current+1}/{questions.length}</span></div>
        <div style={{height:"6px",background:"rgba(255,255,255,0.08)",borderRadius:"3px",overflow:"hidden"}}>
          <div style={{width:`${(current/questions.length)*100}%`,height:"100%",background:"linear-gradient(90deg,#f0a500,#ffd700)",borderRadius:"3px",transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"20px",border:"1px solid rgba(240,165,0,0.2)",padding:"24px",marginBottom:"20px"}}>
        <div style={{color:"rgba(240,165,0,0.6)",fontSize:"12px",fontWeight:700,marginBottom:"8px"}}>PERGUNTA {current+1}</div>
        <p style={{color:"white",fontSize:"17px",fontWeight:700,lineHeight:1.5,margin:0}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"16px"}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.03)",border="rgba(255,255,255,0.1)",color="rgba(255,255,255,0.9)";
          if(answered){if(i===q.correct){bg="rgba(26,188,156,0.15)";border="#1abc9c";color="#1abc9c";}else if(i===selected&&i!==q.correct){bg="rgba(192,57,43,0.15)";border="#c0392b";color="#c0392b";}}
          else if(selected===i){bg="rgba(240,165,0,0.1)";border="#f0a500";color="#f0a500";}
          return(
            <button key={i} onClick={()=>handleAnswer(i)} disabled={answered} style={{padding:"14px 16px",borderRadius:"14px",border:`2px solid ${border}`,background:bg,color,cursor:answered?"default":"pointer",textAlign:"left",fontFamily:"Nunito,sans-serif",fontWeight:600,fontSize:"15px",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{width:"28px",height:"28px",borderRadius:"50%",border:`2px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"12px",fontWeight:700,color}}>{String.fromCharCode(65+i)}</span>
              {opt}
              {answered&&i===q.correct&&<span style={{marginLeft:"auto"}}>✓</span>}
              {answered&&i===selected&&i!==q.correct&&<span style={{marginLeft:"auto"}}>✗</span>}
            </button>
          );
        })}
      </div>
      {answered&&(
        <button onClick={handleNext} style={{width:"100%",padding:"16px",borderRadius:"16px",background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",boxShadow:"0 4px 20px rgba(240,165,0,0.3)"}}>
          {current<questions.length-1?"Próxima Pergunta →":"Ver Resultado 🏆"}
        </button>
      )}
    </div>
  );
}

// PROFILE
function Profile({state}){
  const totalHours=((state.watchedEps||[]).length*24/60).toFixed(1);
  const quizVals=Object.values(state.quizResults||{});
  const accuracy=quizVals.length>0?Math.round(quizVals.reduce((s,r)=>s+r.score/r.total,0)/quizVals.length*100):0;
  return(
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease",fontFamily:"Nunito,sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,rgba(240,165,0,0.1),rgba(10,22,40,0.5))",borderRadius:"24px",border:"2px solid rgba(240,165,0,0.2)",padding:"24px",textAlign:"center",marginBottom:"16px"}}>
        <div style={{fontSize:"64px",marginBottom:"8px",animation:"float 3s ease-in-out infinite"}}>🏴‍☠️</div>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700}}>{state.userName}</div>
        <div style={{color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>{getLevelName(state.level)}</div>
        <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",marginBottom:"16px"}}>"{state.currentTitle||"Recruta"}"</div>
        <div style={{display:"inline-block",background:"rgba(240,165,0,0.15)",borderRadius:"50px",padding:"6px 20px",border:"1px solid rgba(240,165,0,0.3)",fontFamily:"Cinzel,serif",color:"#ffd700",fontWeight:700,fontSize:"24px"}}>Nível {state.level}</div>
        <div style={{marginTop:"16px"}}><XPBar xp={state.xp} level={state.level}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px",marginBottom:"16px"}}>
        {[{icon:"📺",label:"Horas assistidas",val:`${totalHours}h`},{icon:"🔥",label:"Streak máximo",val:`${state.maxStreak||0}d`},{icon:"⭐",label:"Eps assistidos",val:(state.watchedEps||[]).length},{icon:"🎯",label:"Accuracy quiz",val:`${accuracy}%`}].map(s=>(
          <div key={s.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"14px",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
            <div style={{fontSize:"24px",marginBottom:"4px"}}>{s.icon}</div>
            <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"20px",fontWeight:700}}>{s.val}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"18px",fontWeight:700,marginBottom:"12px"}}>🏆 Conquistas</div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
        {ACHIEVEMENTS.map(ach=>{
          const unlocked=(state.achievements||[]).includes(ach.id)||ach.condition(state);
          return(
            <div key={ach.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",borderRadius:"14px",background:unlocked?"rgba(240,165,0,0.08)":"rgba(255,255,255,0.02)",border:`1px solid ${unlocked?"rgba(240,165,0,0.2)":"rgba(255,255,255,0.04)"}`,opacity:unlocked?1:0.5}}>
              <span style={{fontSize:"28px"}}>{ach.icon}</span>
              <div style={{flex:1}}>
                <div style={{color:unlocked?"#f0a500":"rgba(255,255,255,0.6)",fontWeight:700,fontSize:"14px"}}>{ach.name}</div>
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px"}}>{ach.desc}</div>
              </div>
              {unlocked&&<span style={{color:"#1abc9c",fontSize:"18px"}}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// GUIDE
function Guide(){
  const[open,setOpen]=useState(null);
  const sections=[
    {id:"how",icon:"⚡",title:"Como assistir One Piece RÁPIDO",content:`🌟 CANON: Baseados no mangá. SEMPRE assista.\n👍 RECOMENDADO: Anime original de qualidade.\n💤 FILLER: Inventados pelo anime. Pode pular.\n📝 RECAP: Revisão. Pule sempre.\n\nDicas:\n• 1.5x poupa 33% do tempo\n• 2x só para cenas lentas\n• Use o guia de cada arco no app`},
    {id:"fillers",icon:"⏭️",title:"Fillers para PULAR com segurança",content:`🚫 Arco G-8 (eps 196-206)\n🚫 Arco Ruluka Island (eps 220-228)\n🚫 Arco Ocean's Dream (eps 220-224)\n🚫 Arco Spa Island (eps 382-384)\n🚫 Arco Little East Blue (eps 426-429)\n🚫 Arco Z's Ambition (eps 575-578)\n🚫 Arco Caesar Retrieval (eps 626-628)\n\nEpisódios soltos pra pular:\n• 50, 51, 131-143, 196-206`},
    {id:"arcs",icon:"🏆",title:"Os 10 arcos que vão te viciar",content:`1. 🦈 Arlong Park — Você vai chorar. Garanto.\n2. ⚖️ Enies Lobby — O melhor arco da série\n3. ⚔️ Marineford — A maior batalha da história\n4. 🌹 Dressrosa — Villain mais carismático\n5. 🏜️ Alabasta — A primeira grande aventura\n6. 🏯 Wano — One Piece em seu auge\n7. 🚢 Water 7 — Drama máximo\n8. 🎂 Whole Cake Island — Sanji em profundidade\n9. 🫧 Sabaody — A maior virada de roteiro\n10. ☁️ Skypiea — Subestimado, importantíssimo`},
    {id:"sagas",icon:"🗺️",title:"Quais sagas são essenciais?",content:`ESSENCIAIS:\n✅ East Blue\n✅ Alabasta\n✅ Water 7 / Enies Lobby\n✅ Thriller Bark\n✅ Sabaody a Marineford\n✅ New World inteiro\n\nRECOMENDADAS:\n⭐ Skypiea — Lore importante\n⭐ Fishman Island — Transição\n\nPODE PULAR:\n⏭️ Long Ring Long Land`},
  ];
  return(
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease",fontFamily:"Nunito,sans-serif"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700,marginBottom:"4px"}}>📖 Guia do Pirata</div>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",marginBottom:"20px"}}>Tudo que você precisa saber para navegar One Piece</div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {sections.map(s=>(
          <div key={s.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:"18px",border:"1px solid rgba(240,165,0,0.15)",overflow:"hidden"}}>
            <button onClick={()=>setOpen(open===s.id?null:s.id)} style={{width:"100%",padding:"16px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",textAlign:"left"}}>
              <span style={{fontSize:"28px"}}>{s.icon}</span>
              <span style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontWeight:700,fontSize:"15px",flex:1}}>{s.title}</span>
              <span style={{color:"rgba(255,255,255,0.4)",fontSize:"20px",transition:"transform 0.3s",transform:open===s.id?"rotate(180deg)":"rotate(0)"}}>⌄</span>
            </button>
            {open===s.id&&<div style={{padding:"0 16px 16px",color:"rgba(245,240,232,0.8)",fontSize:"14px",lineHeight:1.8,borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"12px",whiteSpace:"pre-line"}}>{s.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// APP ROOT
export default function App(){
  const[state,setState]=useLocalStorage("op-tracker-v2",INITIAL_STATE);
  const[screen,setScreen]=useState("dashboard");
  const[showDiagnostic,setShowDiagnostic]=useState(false);

  const handleOnboard=(prefs)=>{
    setState({...INITIAL_STATE,onboarded:true,...prefs});
    setShowDiagnostic(true);
  };

  const[showAdmin,setShowAdmin]=useState(false);

  const handleDiagnosticComplete=(result)=>{
    setState(s=>({
      ...s,
      completedArcs:result.completedArcs||[],
      unlockedArcs:result.unlockedArcs||["romance-dawn"],
      diagnosticDone:true,
    }));
    setShowDiagnostic(false);
  };

  const handleDiagnosticSkip=()=>{
    setState(s=>({...s,diagnosticDone:true}));
    setShowDiagnostic(false);
  };

  const handleUpdate=useCallback((newState)=>{
    const newAchs=ACHIEVEMENTS.filter(a=>!(newState.achievements||[]).includes(a.id)&&a.condition(newState)).map(a=>a.id);
    setState({...newState,achievements:[...(newState.achievements||[]),...newAchs]});
  },[setState]);

  if(!state.onboarded)return<Onboarding onComplete={handleOnboard}/>;

  if(showDiagnostic||!state.diagnosticDone){
    return<DiagnosticQuiz onComplete={handleDiagnosticComplete} onSkip={handleDiagnosticSkip}/>;
  }

  const THEMES={
    "classic":{bg:"linear-gradient(180deg,#0a1628 0%,#0d2137 60%,#0a1628 100%)",accent:"#f0a500",header:"rgba(10,22,40,0.92)",border:"rgba(240,165,0,0.1)"},
    "wano-sakura":{bg:"linear-gradient(180deg,#1a0a1e 0%,#2d0a2e 60%,#1a0a1e 100%)",accent:"#ff69b4",header:"rgba(26,10,30,0.92)",border:"rgba(255,105,180,0.15)"},
    "blackbeard-dark":{bg:"linear-gradient(180deg,#050505 0%,#0d0d0d 60%,#050505 100%)",accent:"#8b0000",header:"rgba(5,5,5,0.95)",border:"rgba(139,0,0,0.2)"},
    "marine-blue":{bg:"linear-gradient(180deg,#001a33 0%,#002a4d 60%,#001a33 100%)",accent:"#00bfff",header:"rgba(0,26,51,0.92)",border:"rgba(0,191,255,0.15)"},
  };
  const theme=THEMES[state.currentTheme||"classic"]||THEMES["classic"];

  return(
    <div style={{minHeight:"100vh",background:theme.bg,color:"white",position:"relative",transition:"background 0.5s ease"}}>
      <style>{`
        :root {
          --accent: ${theme.accent};
          --header-bg: ${theme.header};
          --border-color: ${theme.border};
        }
      `}</style>
      <WaveBackground/>
      <div style={{position:"relative",zIndex:1,maxWidth:"600px",margin:"0 auto"}}>
        <div style={{position:"sticky",top:0,zIndex:50,background:theme.header,backdropFilter:"blur(12px)",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${theme.border}`,transition:"all 0.5s ease"}}>
          <div style={{fontFamily:"Cinzel,serif",color:theme.accent,fontSize:"18px",fontWeight:900}}>🏴‍☠️ One Piece</div>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <button onClick={()=>setShowAdmin(true)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center"}}>⚙️</button>
            <StreakBadge streak={state.streak}/>
            <div style={{display:"flex",alignItems:"center",gap:"6px",background:`${theme.accent}18`,borderRadius:"20px",padding:"4px 12px",border:`1px solid ${theme.accent}40`}}>
              <span style={{color:theme.accent,fontSize:"12px"}}>⭐</span>
              <span style={{color:theme.accent,fontWeight:700,fontFamily:"Cinzel,serif",fontSize:"13px"}}>{state.xp} XP</span>
            </div>
          </div>
        </div>
        {screen==="dashboard"&&<Dashboard state={state} onUpdate={handleUpdate} onNav={setScreen}/>}
        {screen==="map"&&<ArcMap state={state} onUpdate={handleUpdate}/>}
        {screen==="profile"&&<Profile state={state}/>}
        {screen==="guide"&&<Guide/>}
      </div>
      <Header onNav={setScreen} currentScreen={screen}/>
      {showAdmin&&<AdminPanel state={state} onUpdate={handleUpdate} onClose={()=>setShowAdmin(false)}/>}
    </div>
  );
}
