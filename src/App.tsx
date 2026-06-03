import { useState, useEffect, useCallback, useMemo } from "react";

// ============================================================
// DATA
// ============================================================
const ARCS_DATA = [
  {
    id: "romance-dawn", name: "Romance Dawn", saga: "East Blue", icon: "🌅",
    epsTotal: [1,2,3], epsEssential: [1,2,3], epsRecommended: [],
    hype: "O começo de tudo! Conheça Monkey D. Luffy e seu sonho impossível. Uma aventura épica está prestes a zarpar!",
    difficulty: 1,
    quiz: [
      { q: "Qual é o sonho de Luffy?", opts: ["Ser o melhor espadachim","Ser o Rei dos Piratas","Encontrar o One Piece e se aposentar","Vencer a Marinha"], correct: 1 },
      { q: "Qual fruta do diabo Luffy comeu?", opts: ["Mera Mera no Mi","Gomu Gomu no Mi","Yami Yami no Mi","Hana Hana no Mi"], correct: 1 },
      { q: "Quem é o pirata que Luffy admira desde criança?", opts: ["Barba Negra","Shanks","Whitebeard","Rayleigh"], correct: 1 },
      { q: "O que o Luffy carrega no chapéu de palha?", opts: ["Um mapa do tesouro","A memória de Shanks","Nada, é só um chapéu","Uma fruta do diabo"], correct: 1 },
      { q: "Qual poder Luffy ganhou ao comer a fruta?", opts: ["Controlar o fogo","Ser invisível","Corpo de borracha","Voar"], correct: 2 },
    ]
  },
  {
    id: "orange-town", name: "Orange Town", saga: "East Blue", icon: "🍊",
    epsTotal: [4,5,6,7,8], epsEssential: [4,5,6,7,8], epsRecommended: [],
    hype: "Luffy encontra seu primeiro companheiro! Um espadachim lendário e uma ladra misteriosa entram em cena. A tripulação está se formando!",
    difficulty: 1,
    quiz: [
      { q: "Qual é o objetivo de Zoro?", opts: ["Ser Rei dos Piratas","Ser o melhor espadachim do mundo","Encontrar o All Blue","Desenhar o mapa do mundo"], correct: 1 },
      { q: "Quantas espadas Zoro usa normalmente?", opts: ["1","2","3","4"], correct: 2 },
      { q: "Buggy é conhecido como o Palhaço Pirata. Qual é seu poder?", opts: ["Controlar o vento","Separar partes do corpo","Criar ilusões","Controlar metais"], correct: 1 },
      { q: "Nami é especialista em quê?", opts: ["Combate corpo a corpo","Navegação e roubo","Culinária","Medicina"], correct: 1 },
      { q: "O que Nami rouba dos piratas?", opts: ["Armas","Tesouros e dinheiro","Mapas","Comida"], correct: 1 },
    ]
  },
  {
    id: "syrup-village", name: "Syrup Village", saga: "East Blue", icon: "🎯",
    epsTotal: Array.from({length:10},(_,i)=>i+9), epsEssential: [9,10,11,14,16,17,18], epsRecommended: [12,13,15],
    hype: "Mentiras, lealdade e o atirador que mais mente... mas cujo coração não consegue enganar. Um arco cheio de emoção!",
    difficulty: 2,
    quiz: [
      { q: "Qual é a mentira mais famosa de Usopp?", opts: ["Que tem 100 seguidores","Que os piratas estão chegando","Que é o filho de Shanks","Que pode voar"], correct: 1 },
      { q: "Quem é o vilão de Syrup Village?", opts: ["Kuro","Buggy","Don Krieg","Arlong"], correct: 0 },
      { q: "Qual é o sonho de Usopp?", opts: ["Ser Rei dos Piratas","Ser um guerreiro do mar corajoso","Encontrar o All Blue","Ser médico"], correct: 1 },
      { q: "O navio Going Merry foi presenteado por quem?", opts: ["Usopp","Kaya","Nami","Luffy"], correct: 1 },
      { q: "Kuro era disfarçado de quê em Syrup Village?", opts: ["Médico","Pescador","Mordomo/Butler","Marinheiro"], correct: 2 },
    ]
  },
  {
    id: "baratie", name: "Baratie", saga: "East Blue", icon: "🍳",
    epsTotal: Array.from({length:12},(_,i)=>i+19), epsEssential: Array.from({length:12},(_,i)=>i+19), epsRecommended: [],
    hype: "Um restaurante flutuante, um cozinheiro de chutes mortais e um duelo de espadas que vai te deixar sem fôlego. Sanji entra na tripulação!",
    difficulty: 2,
    quiz: [
      { q: "Sanji usa qual parte do corpo para lutar?", opts: ["Punhos","Pernas e chutes","Armas de fogo","Magia"], correct: 1 },
      { q: "Qual é o sonho de Sanji?", opts: ["Ser chef do mundo","Encontrar o All Blue","Ser Rei dos Piratas","Vencer Zoro"], correct: 1 },
      { q: "Quem é o dono do restaurante Baratie?", opts: ["Sanji","Zeff","Don Krieg","Fullbody"], correct: 1 },
      { q: "O que Zeff fez para salvar Sanji quando jovem?", opts: ["Comeu sua própria perna","Lutou contra 100 piratas","Vendeu seu navio","Sacrificou seu tesouro"], correct: 0 },
      { q: "Don Krieg é o líder de qual frota?", opts: ["Piratas do Oriente","Grande Frota Krieg","Piratas da Armada","Frota do Leste"], correct: 1 },
    ]
  },
  {
    id: "arlong-park", name: "Arlong Park", saga: "East Blue", icon: "🦈",
    epsTotal: Array.from({length:15},(_,i)=>i+31), epsEssential: Array.from({length:15},(_,i)=>i+31), epsRecommended: [],
    hype: "O arco mais emocionante da East Blue! A verdade sobre Nami é revelada e Luffy mostrará o que significa ser um verdadeiro nakama. PREPARE OS LENÇOS!",
    difficulty: 3,
    quiz: [
      { q: "Por quanto tempo Nami trabalhou para Arlong?", opts: ["3 anos","8 anos","10 anos","5 anos"], correct: 1 },
      { q: "O que Nami estava tentando comprar de Arlong?", opts: ["A liberdade de seus amigos","Sua vila natal Cocoyasi","Um navio","O mapa do Grand Line"], correct: 1 },
      { q: "Qual é a habilidade especial de Arlong?", opts: ["Controla água","Dentes e força de tubarão","Pode voar","Controla peixes"], correct: 1 },
      { q: "O que Luffy faz quando Nami pede ajuda?", opts: ["Vai embora","Coloca o chapéu nela e vai lutar","Chama a Marinha","Pede para Zoro resolver"], correct: 1 },
      { q: "Onde fica escondido o verdadeiro tesouro de Nami?", opts: ["No fundo do mar","No quarto de Arlong","Na casa de Bellemere","Debaixo da tangerineira"], correct: 3 },
    ]
  },
  {
    id: "loguetown", name: "Loguetown", saga: "East Blue", icon: "⚓",
    epsTotal: [52,53], epsEssential: [52,53], epsRecommended: [],
    hype: "A cidade onde o Rei dos Piratas nasceu e morreu. Luffy está prestes a entrar no Grand Line. O destino está chamando!",
    difficulty: 2,
    quiz: [
      { q: "Loguetown é conhecida como a cidade de quê?", opts: ["Começo e Fim","Ouro e Prata","Tempestades e Ventos","Piratas e Marinheiros"], correct: 0 },
      { q: "Quem foi executado no cadafalso de Loguetown?", opts: ["Shanks","Gold Roger","Whitebeard","Rayleigh"], correct: 1 },
      { q: "O que Gold Roger disse em sua execução?", opts: ["Nada","'Matem todos os piratas'","Revelou onde está o One Piece","'Perdoem meus pecados'"], correct: 2 },
      { q: "Smoker encontra Luffy em Loguetown. O que Smoker pode fazer?", opts: ["Controlar fogo","Transformar em fumaça","Controlar vento","Ser invisível"], correct: 1 },
      { q: "O que salva Luffy de ser executado em Loguetown?", opts: ["Zoro o resgata","Um raio cai no momento","Nami negocia sua liberdade","A Marinha o liberta"], correct: 1 },
    ]
  },
  {
    id: "alabasta", name: "Alabasta", saga: "Alabasta", icon: "🏜️",
    epsTotal: Array.from({length:69},(_,i)=>i+62), epsEssential: [...Array.from({length:49},(_,i)=>i+92), ...Array.from({length:14},(_,i)=>i+117)],
    epsRecommended: Array.from({length:15},(_,i)=>i+62),
    hype: "Um reino à beira da guerra civil, uma princesa guerreira e o vilão mais inteligente que você já viu. Crocodile é ameaça real. Este arco vai te destruir emocionalmente!",
    difficulty: 4,
    quiz: [
      { q: "Quem é a princesa de Alabasta?", opts: ["Nami","Vivi","Robin","Hancock"], correct: 1 },
      { q: "Qual é o poder de Crocodile?", opts: ["Suna Suna no Mi (Areia)","Goro Goro no Mi (Raio)","Magu Magu no Mi (Magma)","Hie Hie no Mi (Gelo)"], correct: 0 },
      { q: "O que é a Baroque Works?", opts: ["Uma organização criminosa secreta","A Marinha disfarçada","Um grupo de piratas aliados","Uma guilda de mercadores"], correct: 0 },
      { q: "Como Robin (Miss All Sunday) ajudou Luffy?", opts: ["Lutou contra a Marinha","Deu uma chave para Luffy","Curou seus ferimentos","Revelou o plano de Crocodile"], correct: 1 },
      { q: "Como a tripulação se comunica e encontra em Alabasta?", opts: ["Transponders","Marcas nos braços","Sinais de fumaça","Mapa secreto"], correct: 1 },
    ]
  },
  {
    id: "skypiea", name: "Skypiea", saga: "Skypiea", icon: "☁️",
    epsTotal: Array.from({length:52},(_,i)=>i+144), epsEssential: [...Array.from({length:9},(_,i)=>i+144),...Array.from({length:20},(_,i)=>i+153),...Array.from({length:20},(_,i)=>i+176)],
    epsRecommended: Array.from({length:6},(_,i)=>i+170),
    hype: "Uma ilha nas nuvens, um deus louco e o maior sino do mundo. Skypiea parece opcional mas guarda segredos que vão importar muito mais tarde. Não pule!",
    difficulty: 3,
    quiz: [
      { q: "Quem é o 'deus' de Skypiea?", opts: ["Gan Fall","Enel","Mont Blanc Cricket","Wyper"], correct: 1 },
      { q: "Qual é o poder de Enel?", opts: ["Goro Goro no Mi (Raio)","Pika Pika no Mi (Luz)","Moku Moku no Mi (Fumaça)","Suna Suna no Mi (Areia)"], correct: 0 },
      { q: "Por que Luffy é imune ao poder de Enel?", opts: ["Luffy é muito forte","Borracha não conduz eletricidade","Luffy tem Haki","Enel escolheu não atacar"], correct: 1 },
      { q: "O que a tripulação encontra em Skypiea que conecta ao mundo?", opts: ["Um Log Pose","A Poneglyph com mensagem de Gol Roger","Um mapa do Grand Line","A fruta do diabo de Enel"], correct: 1 },
      { q: "Skypiea foi construída sobre qual cidade lendária?", opts: ["Jaya","Shandora","Marineford","Raftel"], correct: 1 },
    ]
  },
  {
    id: "water-7", name: "Water 7", saga: "Water 7", icon: "🚂",
    epsTotal: Array.from({length:35},(_,i)=>i+229), epsEssential: Array.from({length:35},(_,i)=>i+229), epsRecommended: [],
    hype: "A tripulação enfrenta sua maior crise interna. Traição, lágrimas, mentiras e um carpinteiro gigante. Water 7 vai fazer você questionar tudo. Arco OBRIGATÓRIO!",
    difficulty: 4,
    quiz: [
      { q: "Quem é Franky?", opts: ["Um Tenente da Marinha","Um carpinteiro cyborg de Water 7","Um capitão pirata aliado","Um agente do Governo Mundial"], correct: 1 },
      { q: "O que acontece com o Going Merry em Water 7?", opts: ["É roubado pela Marinha","É destruído numa batalha","É declarado irrecuperável pelos carpinteiros","Afunda num acidente"], correct: 2 },
      { q: "Qual é o segredo chocante revelado sobre Robin em Water 7?", opts: ["Ela é uma agente da Marinha","Ela se entregou ao Governo Mundial voluntariamente","Ela é filha de um Shichibukai","Ela tem uma fruta do diabo oculta"], correct: 1 },
      { q: "O que a Robin diz que justifica sua entrega ao CP9?", opts: ["'Eu nunca quis ser pirata'","'Destrua o Straw Hat!'","'Deixem-me morrer'","'Quero viver!'"], correct: 2 },
      { q: "Quem é o líder do CP9 em Water 7?", opts: ["Lucci","Kaku","Kalifa","Jabra"], correct: 0 },
    ]
  },
  {
    id: "enies-lobby", name: "Enies Lobby", saga: "Water 7", icon: "⚖️",
    epsTotal: Array.from({length:49},(_,i)=>i+264), epsEssential: Array.from({length:49},(_,i)=>i+264), epsRecommended: [],
    hype: "O arco mais épico da série. Luffy declara guerra ao Governo Mundial. Cada personagem tem seu momento de glória. Você VAI chorar. Garantido. Arco LENDÁRIO!",
    difficulty: 5,
    quiz: [
      { q: "O que Luffy faz ao ver a bandeira do Governo Mundial em Enies Lobby?", opts: ["Pede negociação","Ordena que Usopp atire nela","Foge com Robin","Luta contra todos sozinho"], correct: 1 },
      { q: "Qual é o poder de Lucci?", opts: ["Neko Neko no Mi Modelo Leopardo","Inu Inu no Mi Modelo Lobo","Uma espada mágica","Haki puro sem fruta"], correct: 0 },
      { q: "O que Robin quer quando chora e pede para ser salva?", opts: ["Dinheiro","Voltar para Water 7","Quero viver!","Vencer o CP9"], correct: 2 },
      { q: "Qual forma Luffy usa para derrotar Lucci?", opts: ["Gear Second","Gear Third","Gear Fourth","Segunda Engrenagem combinada"], correct: 0 },
      { q: "O que acontece com o Going Merry ao final de Enies Lobby?", opts: ["É destruído pela Marinha","Recebe um funeral no mar","É reformado por Franky","Vira museu em Water 7"], correct: 1 },
    ]
  },
  {
    id: "thriller-bark", name: "Thriller Bark", saga: "Thriller Bark", icon: "💀",
    epsTotal: Array.from({length:45},(_,i)=>i+337), epsEssential: Array.from({length:45},(_,i)=>i+337), epsRecommended: [],
    hype: "A ilha fantasma mais assustadora do Grand Line. Zoro enfrenta seu maior desafio e faz uma promessa que vai te partir o coração!",
    difficulty: 3,
    quiz: [
      { q: "Quem é o Shichibukai de Thriller Bark?", opts: ["Gekko Moriah","Bartholomew Kuma","Doflamingo","Hancock"], correct: 0 },
      { q: "Qual é o poder de Moriah?", opts: ["Controla fantasmas","Kage Kage no Mi — rouba sombras","Controla mortos","Yami Yami no Mi"], correct: 1 },
      { q: "O que Zoro faz para salvar Luffy do Kuma?", opts: ["Luta contra Kuma e ganha","Pede para Sanji ajudar","Absorve toda a dor de Luffy","Corre com Luffy"], correct: 2 },
      { q: "O que Kuma pergunta a Zoro antes do sacrifício?", opts: ["'Você quer poder?'","'Você se arrepende de ser pirata?'","'Você tem algo pelo qual viver?'","Nada, ataca direto"], correct: 2 },
      { q: "Brook faz parte da tripulação após Thriller Bark. O que é Brook?", opts: ["Um músico humano","Um esqueleto que comeu uma fruta","Um fantasma pirata","Um zumbi especial de Moriah"], correct: 1 },
    ]
  },
  {
    id: "sabaody", name: "Sabaody Archipelago", saga: "Summit War", icon: "🫧",
    epsTotal: Array.from({length:21},(_,i)=>i+385), epsEssential: Array.from({length:21},(_,i)=>i+385), epsRecommended: [],
    hype: "A realidade golpeia a tripulação com força total. O Grand Line Novo está começando e ninguém está preparado. Este arco vai te destruir de um jeito que você não esperava!",
    difficulty: 5,
    quiz: [
      { q: "Quem são os Supernovas (Onze Supernovas)?", opts: ["Os 11 Shichibukai","11 rookies piratas com recompensas acima de 100M","Os 11 almirantes da Marinha","Os capitães aliados de Whitebeard"], correct: 1 },
      { q: "O que Bartholomew Kuma faz com a tripulação?", opts: ["Prende todos na Marinha","Dispersa todos para lugares diferentes do mundo","Mata metade da tripulação","Os leva para Raftel"], correct: 1 },
      { q: "Quem é Rayleigh e por que é importante?", opts: ["Um almirante reformado","O Vice-Capitão de Gold Roger","Um Yonkou aposentado","O pai de Luffy"], correct: 1 },
      { q: "O que Luffy faz para avisar seus companheiros que estão vivos?", opts: ["Envia uma carta","Invade Marineford novamente e toca o sino 16 vezes","Usa um transponder","Pede que Rayleigh os avise"], correct: 1 },
      { q: "Sentoumaru trabalha para quem?", opts: ["Para a Marinha diretamente","Para o Dr. Vegapunk e a Marinha","Para o Governo Mundial secretamente","Para os Shichibukai"], correct: 1 },
    ]
  },
  {
    id: "marineford", name: "Marineford", saga: "Summit War", icon: "⚔️",
    epsTotal: Array.from({length:33},(_,i)=>i+457), epsEssential: Array.from({length:33},(_,i)=>i+457), epsRecommended: [],
    hype: "A MAIOR BATALHA DA HISTÓRIA DOS PIRATAS. Whitebeard, os Yonkous, os Almirantes, os Shichibukai — todos em um campo de batalha. Tenha lenços à mão. MUITOS LENÇOS!",
    difficulty: 5,
    quiz: [
      { q: "Por que Luffy invade Marineford?", opts: ["Para provar que é forte","Para salvar seu irmão Portgas D. Ace","Para liberar todos os prisioneiros","Para vencer a Marinha"], correct: 1 },
      { q: "Qual é o poder de Ace?", opts: ["Gomu Gomu no Mi","Mera Mera no Mi (Fogo)","Hie Hie no Mi (Gelo)","Gura Gura no Mi (Tremor)"], correct: 1 },
      { q: "O que Whitebeard afirma antes de morrer?", opts: ["'Luffy é o Rei dos Piratas'","'O One Piece existe'","'Ace era meu filho favorito'","'A Marinha não pode ser vencida'"], correct: 1 },
      { q: "Quem salva Luffy quando ele está prestes a ser executado?", opts: ["Shanks aparece","Hancock interfere","Whitebeard destrói o cadafalso","Barba Negra resgata"], correct: 2 },
      { q: "Como termina a batalha de Marineford?", opts: ["Os piratas vencem","A Marinha vence formalmente, mas o mundo muda","Empate — ambos os lados se retiram","Gold Roger aparece e para tudo"], correct: 1 },
    ]
  },
  {
    id: "fishman-island", name: "Fishman Island", saga: "New World", icon: "🐠",
    epsTotal: Array.from({length:58},(_,i)=>i+517), epsEssential: [...Array.from({length:6},(_,i)=>i+517),...Array.from({length:34},(_,i)=>i+541)],
    epsRecommended: Array.from({length:18},(_,i)=>i+523),
    hype: "Dois anos se passaram! A tripulação reunida, mais forte que nunca. O primeiro arco do New World reserva surpresas e uma mensagem importante sobre preconceito e liberdade!",
    difficulty: 3,
    quiz: [
      { q: "O que Luffy usa pela primeira vez em combate no New World?", opts: ["Gear Fourth","Gear Second mais potente","Haki","Gear Third aprimorado"], correct: 2 },
      { q: "Quem é Jinbe?", opts: ["Um almirante da Marinha","Um Homem-Peixe ex-Shichibukai","O rei de Fishman Island","Um companheiro de Ace"], correct: 1 },
      { q: "Qual profecia amedronta Fishman Island?", opts: ["Que Luffy destruirá a ilha","Que a ilha afundará","Que os peixes-homem serão extintos","Que a Marinha invadirá"], correct: 0 },
      { q: "O que Luffy faz que choca a todos em Fishman Island?", opts: ["Derrota o rei","Declara que vai proteger a ilha","Rejeita uma aliança","Rompe um navio da Marinha"], correct: 1 },
      { q: "Quem é o vilão principal de Fishman Island?", opts: ["Arlong","Hody Jones","Vander Decken","Fisher Tiger"], correct: 1 },
    ]
  },
  {
    id: "punk-hazard", name: "Punk Hazard", saga: "New World", icon: "🧪",
    epsTotal: Array.from({length:47},(_,i)=>i+579), epsEssential: Array.from({length:47},(_,i)=>i+579), epsRecommended: [],
    hype: "Metade fogo, metade gelo, 100% insano! Crianças gigantes, cientistas loucos e a estreia de Trafalgar Law como aliado. O New World está apenas começando!",
    difficulty: 3,
    quiz: [
      { q: "Quem é Caesar Clown?", opts: ["Um almirante disfarçado","Um cientista louco que faz experimentos com crianças","Um Yonkou aposentado","O líder dos Shichibukai"], correct: 1 },
      { q: "Qual aliança é formada em Punk Hazard?", opts: ["Luffy e Shanks","Luffy e Trafalgar Law","Luffy e Smoker","Luffy e Jinbe"], correct: 1 },
      { q: "O que há de especial em Punk Hazard?", opts: ["É uma ilha flutuante","Metade está em chamas, metade congelada — uma batalha antiga","É a base secreta da Marinha","É onde está o One Piece"], correct: 1 },
      { q: "Qual é o objetivo da aliança Luffy-Law?", opts: ["Derrotar Kaido","Derrotar um dos Quatro Imperadores — começando por Doflamingo","Encontrar o One Piece","Invadir Marineford novamente"], correct: 1 },
      { q: "O que Law faz com o poder da Ope Ope no Mi?", opts: ["Cura doenças","Cria 'Rooms' onde controla tudo dentro","Troca almas entre pessoas","Controla espirais de energia"], correct: 1 },
    ]
  },
  {
    id: "dressrosa", name: "Dressrosa", saga: "New World", icon: "🌹",
    epsTotal: Array.from({length:118},(_,i)=>i+629), epsEssential: Array.from({length:118},(_,i)=>i+629), epsRecommended: [],
    hype: "Touros metálicos, lutadores de gladiadores, um ditador que faz as pessoas de brinquedos e REBELDES por toda parte. Doflamingo é o vilão mais carismático até agora. ÉPICO!",
    difficulty: 5,
    quiz: [
      { q: "Qual é o poder de Doflamingo?", opts: ["Ito Ito no Mi — controla fios","Bara Bara no Mi — separa o corpo","Noro Noro no Mi — desacelera","Ope Ope no Mi — cria Rooms"], correct: 0 },
      { q: "Quem é Rebecca e qual é sua conexão em Dressrosa?", opts: ["Filha de Doflamingo","Neta do Rei Riku, herdeira legítima","Uma gladiadora sem família","Agente secreta da Marinha"], correct: 1 },
      { q: "O que o Doflamingo fez com a maioria dos habitantes de Dressrosa?", opts: ["Os escravizou","Os transformou em brinquedos — e fez todos esquecerem deles","Os banhou e prendeu","Os matou secretamente"], correct: 1 },
      { q: "Qual é a nova forma de Luffy apresentada em Dressrosa?", opts: ["Gear Second aprimorado","Gear Fourth","Gear Third turbo","Awakening da Gomu Gomu"], correct: 1 },
      { q: "Quem é Kyros e por que é trágico?", opts: ["Um gladiador que traiu Dressrosa","O melhor lutador de Dressrosa, transformado em brinquedo — a filha esqueceu dele","O pai de Doflamingo","O capitão da guarda real de Dressrosa"], correct: 1 },
    ]
  },
  {
    id: "whole-cake-island", name: "Whole Cake Island", saga: "New World", icon: "🎂",
    epsTotal: Array.from({length:95},(_,i)=>i+783), epsEssential: Array.from({length:95},(_,i)=>i+783), epsRecommended: [],
    hype: "Um reino de doces comandado por Big Mom — a Empress mais assustadora. Sanji enfrenta seu passado sombrio e decide quem realmente é. Prepare-se para ter o coração partido!",
    difficulty: 4,
    quiz: [
      { q: "Quem é Big Mom?", opts: ["Uma almirante reformada","Uma das Quatro Imperadores, temida por seu poder e fome","A rainha de Whole Cake Island apenas","A mãe biológica de Sanji"], correct: 1 },
      { q: "Por que Sanji vai para Whole Cake Island?", opts: ["Para encontrar o All Blue","Por causa de uma proposta de casamento forçada de sua família","Para salvar Nami sequestrada","Para ajudar Big Mom"], correct: 1 },
      { q: "Qual é o segredo da família Vinsmoke de Sanji?", opts: ["São agentes da Marinha","São guerreiros geneticamente modificados — o líder de uma organização criminosa","São descendentes de Roger","São piratas disfarçados de nobreza"], correct: 1 },
      { q: "O que Pedro sacrifica para ajudar a tripulação?", opts: ["Seu navio","Sua vida — explode para criar distração","Sua fruta do diabo","Suas memórias"], correct: 1 },
      { q: "Como a tripulação escapa de Whole Cake Island?", opts: ["Derrotam Big Mom completamente","Fogem no caos criado — com ajuda de Jinbe","A Marinha interfere","Roger aparece e distrai Big Mom"], correct: 1 },
    ]
  },
  {
    id: "wano", name: "Wano Kuni", saga: "New World", icon: "🏯",
    epsTotal: Array.from({length:196},(_,i)=>i+890), epsEssential: Array.from({length:196},(_,i)=>i+890), epsRecommended: [],
    hype: "O arco mais grandioso de toda a série! Samurais, shogun, Kaido o ser mais forte do mundo, e segredos sobre o passado que vão redefinir TUDO. One Piece em seu auge ABSOLUTO!",
    difficulty: 5,
    quiz: [
      { q: "Quem é Kaido?", opts: ["O mais poderoso dos Yonkou, considerado o ser mais forte do mundo","Um almirante disfarçado de pirata","O pai de Momonosuke","Um Shichibukai aposentado"], correct: 0 },
      { q: "Qual é a forma de dragão de Kaido relacionada a?", opts: ["Uma fruta do diabo Zoan Mítica","Uma habilidade inata de sua raça","Resultado de experimentos de Vegapunk","Uma técnica secreta de Haki"], correct: 0 },
      { q: "Quem é Kozuki Oden e por que é lendário?", opts: ["O samurai que viajou com Roger e deixou suas memórias em Poneglyphs","O fundador de Wano","O pai de Yamato","O líder dos Nine Red Scabbards"], correct: 0 },
      { q: "Qual nova habilidade de Luffy é revelada em Wano?", opts: ["Gear Fifth","Awakening — Luffy é na verdade o portador do Nika Nika no Mi","Ambas as opções anteriores","Nenhuma — ele apenas aprimora o Gear Fourth"], correct: 2 },
      { q: "O que torna Wano especial no contexto do One Piece geral?", opts: ["É onde o One Piece está escondido","Revela a verdadeira natureza da fruta de Luffy e sua conexão com o Joy Boy","É o último arco da série","É onde a Marinha é finalmente derrotada"], correct: 1 },
    ]
  },
];

const ACHIEVEMENTS = [
  { id: "first-step", name: "Primeiro Passo", desc: "Assista o episódio 1", icon: "👣", condition: (s) => s.watchedEps.includes(1) },
  { id: "east-blue", name: "East Blue Conquistada", desc: "Complete todos os arcos da East Blue", icon: "🌊", condition: (s) => ["romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown"].every(id => s.completedArcs.includes(id)) },
  { id: "marathoner", name: "Maratonista", desc: "Assista 5 episódios em um dia", icon: "🏃", condition: (s) => s.dailyEpsRecord >= 5 },
  { id: "no-mercy", name: "Sem Misericórdia", desc: "Pule 10 fillers", icon: "⏭️", condition: (s) => s.skippedFillers >= 10 },
  { id: "nakama", name: "Nakama", desc: "7 dias de streak", icon: "🤝", condition: (s) => s.maxStreak >= 7 },
  { id: "quiz-master", name: "Mestre dos Quizzes", desc: "100% em 3 quizzes seguidos", icon: "🎯", condition: (s) => s.perfectQuizzes >= 3 },
  { id: "grand-line", name: "Entrou no Grand Line", desc: "Complete Loguetown", icon: "🗺️", condition: (s) => s.completedArcs.includes("loguetown") },
  { id: "cry-baby", name: "Coração de Ouro", desc: "Complete Enies Lobby", icon: "😭", condition: (s) => s.completedArcs.includes("enies-lobby") },
  { id: "war-veteran", name: "Veterano de Guerra", desc: "Complete Marineford", icon: "⚔️", condition: (s) => s.completedArcs.includes("marineford") },
  { id: "new-world", name: "Novo Mundo", desc: "Complete Fishman Island", icon: "🌍", condition: (s) => s.completedArcs.includes("fishman-island") },
  { id: "level10", name: "Pirata de Respeito", desc: "Alcance o nível 10", icon: "🏴‍☠️", condition: (s) => s.level >= 10 },
  { id: "level25", name: "Capitão Lendário", desc: "Alcance o nível 25", icon: "👑", condition: (s) => s.level >= 25 },
  { id: "streak30", name: "Imparável", desc: "30 dias de streak", icon: "🔥", condition: (s) => s.maxStreak >= 30 },
  { id: "century", name: "Centenário", desc: "Assista 100 episódios", icon: "💯", condition: (s) => s.watchedEps.length >= 100 },
  { id: "pirate-king", name: "Rei dos Piratas", desc: "Atinja nível 51+", icon: "🌟", condition: (s) => s.level >= 51 },
];

const getLevelName = (level) => {
  if (level <= 5) return "Marinheiro Novato";
  if (level <= 10) return "Pirata Iniciante";
  if (level <= 20) return "Tripulante do Chapéu de Palha";
  if (level <= 35) return "Capitão dos Sete Mares";
  if (level <= 50) return "Imperador do Mar";
  return "REI DOS PIRATAS 🏴‍☠️";
};

const getXpForLevel = (level) => level * 200;

const MOTIVATIONAL = [
  "Seus nakamas acreditam em você, capitão! 🏴‍☠️",
  "Todo grande pirata começou do zero! ⚓",
  "O Grand Line te aguarda, aventureiro! 🗺️",
  "Nenhuma tempestade para o Rei dos Piratas! ⛵",
  "A tripulação conta com você! 💪",
  "Roger chegou lá, e você também vai! ✨",
  "Yarr harr fiddle dee dee! Continue navegando! 🌊",
];

const INITIAL_STATE = {
  onboarded: false,
  userName: "Pirata",
  goal: null,
  dailyGoal: 3,
  xp: 0,
  level: 1,
  streak: 0,
  maxStreak: 0,
  lastCheckin: null,
  watchedEps: [],
  completedArcs: [],
  unlockedArcs: ["romance-dawn"],
  quizResults: {},
  achievements: [],
  dailyEpsToday: 0,
  dailyEpsRecord: 0,
  skippedFillers: 0,
  perfectQuizzes: 0,
  consecutivePerfect: 0,
};

// ============================================================
// HOOKS
// ============================================================
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  const save = useCallback((v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [key, val]);
  return [val, save];
}

// ============================================================
// COMPONENTS
// ============================================================

function WaveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:0}}>
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:"120px",
        background:"linear-gradient(180deg, transparent 0%, rgba(26,188,156,0.15) 100%)",
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position:"absolute", bottom:0, left:`${-100+i*30}px`, right:`${-100+i*20}px`,
            height:`${60+i*20}px`,
            background:`rgba(26,188,156,${0.08+i*0.04})`,
            borderRadius:"50% 50% 0 0",
            animation:`wave ${3+i}s ease-in-out infinite alternate`,
            animationDelay:`${i*0.5}s`,
          }}/>
        ))}
      </div>
      <style>{`
        @keyframes wave { 0%{transform:translateX(0)} 100%{transform:translateX(40px)} }
        @keyframes pulse-xp { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fire { 0%,100%{transform:scaleY(1) translateX(0)} 50%{transform:scaleY(1.1) translateX(2px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes confetti-fall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(300px) rotate(720deg);opacity:0} }
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Nunito:wght@400;600;700;800&display=swap');
      `}</style>
    </div>
  );
}

function XPBar({ xp, level }) {
  const progress = (xp % 200) / 200 * 100;
  return (
    <div className="flex items-center gap-2">
      <span style={{color:"#f0a500",fontFamily:"Cinzel",fontSize:"12px",fontWeight:700}}>Nv.{level}</span>
      <div style={{flex:1,height:"8px",background:"rgba(255,255,255,0.1)",borderRadius:"4px",overflow:"hidden"}}>
        <div style={{
          width:`${progress}%`, height:"100%",
          background:"linear-gradient(90deg,#f0a500,#ffd700)",
          borderRadius:"4px", transition:"width 0.5s ease",
          boxShadow:"0 0 8px rgba(240,165,0,0.6)",
        }}/>
      </div>
      <span style={{color:"rgba(255,255,255,0.6)",fontSize:"11px"}}>{xp%200}/200</span>
    </div>
  );
}

function StreakBadge({ streak }) {
  if (streak === 0) return null;
  const isHot = streak >= 3;
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:"4px",
      background: isHot ? "linear-gradient(135deg,#c0392b,#e74c3c)" : "rgba(255,255,255,0.1)",
      padding:"4px 10px", borderRadius:"20px",
      animation: isHot ? "fire 1s ease-in-out infinite" : "none",
      boxShadow: isHot ? "0 0 12px rgba(192,57,43,0.5)" : "none",
    }}>
      <span style={{fontSize:"16px"}}>{isHot ? "🔥" : "⚓"}</span>
      <span style={{color:"white",fontWeight:700,fontSize:"13px"}}>{streak}</span>
    </div>
  );
}

// ONBOARDING
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(3);
  const [name, setName] = useState("");

  const goals = [
    { id:"fast", label:"Assistir rápido", sub:"Só o essencial", icon:"⚡" },
    { id:"nofillers", label:"Sem fillers chatos", sub:"Tudo importante", icon:"🎯" },
    { id:"all", label:"Maratonista", sub:"Quero tudo mesmo!", icon:"🏃" },
  ];

  const handleFinish = () => {
    onComplete({ goal, dailyGoal, userName: name || "Pirata" });
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"24px", background:"linear-gradient(135deg,#0a1628 0%,#0d2137 50%,#0a1628 100%)",
      fontFamily:"Nunito,sans-serif", animation:"fadeIn 0.6s ease",
    }}>
      <WaveBackground/>
      <div style={{position:"relative",zIndex:1,maxWidth:"480px",width:"100%",textAlign:"center"}}>
        {step === 0 && (
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"80px",marginBottom:"16px",animation:"float 3s ease-in-out infinite"}}>🏴‍☠️</div>
            <h1 style={{
              fontFamily:"Cinzel,serif", fontSize:"clamp(28px,6vw,42px)", fontWeight:900,
              background:"linear-gradient(135deg,#f0a500,#ffd700,#f0a500)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              marginBottom:"8px", lineHeight:1.2,
            }}>Torne-se o Rei dos Piratas!</h1>
            <p style={{color:"rgba(245,240,232,0.8)",marginBottom:"32px",fontSize:"16px"}}>
              Sua aventura épica por One Piece começa aqui. Vamos personalizar sua jornada!
            </p>
            <div style={{marginBottom:"24px",textAlign:"left"}}>
              <label style={{color:"#f0a500",fontWeight:700,display:"block",marginBottom:"8px"}}>Seu nome de pirata:</label>
              <input
                value={name} onChange={e=>setName(e.target.value)}
                placeholder="Ex: Luffy, Zoro, Nami..."
                style={{
                  width:"100%",padding:"12px 16px",borderRadius:"12px",border:"2px solid rgba(240,165,0,0.3)",
                  background:"rgba(255,255,255,0.05)",color:"white",fontSize:"16px",
                  outline:"none",boxSizing:"border-box",fontFamily:"Nunito,sans-serif",
                }}
              />
            </div>
            <button onClick={()=>setStep(1)} style={{
              background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
              padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",
              fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px",
              boxShadow:"0 4px 20px rgba(240,165,0,0.4)",transition:"transform 0.2s",
            }}
            onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}
            >ZARPAR! ⚓</button>
          </div>
        )}
        {step === 1 && (
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🎯</div>
            <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"24px",marginBottom:"8px"}}>Qual seu objetivo?</h2>
            <p style={{color:"rgba(245,240,232,0.7)",marginBottom:"24px"}}>Como você quer viver essa aventura?</p>
            <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"32px"}}>
              {goals.map(g => (
                <button key={g.id} onClick={()=>setGoal(g.id)} style={{
                  padding:"16px 20px",borderRadius:"16px",border:`2px solid ${goal===g.id?"#f0a500":"rgba(240,165,0,0.2)"}`,
                  background: goal===g.id?"rgba(240,165,0,0.15)":"rgba(255,255,255,0.03)",
                  cursor:"pointer",display:"flex",alignItems:"center",gap:"16px",textAlign:"left",
                  transition:"all 0.2s", color:"white",
                }}>
                  <span style={{fontSize:"32px"}}>{g.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:"16px",color:goal===g.id?"#f0a500":"white"}}>{g.label}</div>
                    <div style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>{g.sub}</div>
                  </div>
                  {goal===g.id && <span style={{marginLeft:"auto",color:"#f0a500",fontSize:"20px"}}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={()=>goal&&setStep(2)} style={{
              background: goal ? "linear-gradient(135deg,#f0a500,#ffd700)" : "rgba(255,255,255,0.1)",
              color: goal ? "#0a1628" : "rgba(255,255,255,0.4)",
              padding:"14px 40px",borderRadius:"50px",border:"none",cursor:goal?"pointer":"not-allowed",
              fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",transition:"all 0.2s",
            }}>Continuar →</button>
          </div>
        )}
        {step === 2 && (
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📺</div>
            <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"24px",marginBottom:"8px"}}>Meta diária</h2>
            <p style={{color:"rgba(245,240,232,0.7)",marginBottom:"24px"}}>Quantos episódios por dia você consegue?</p>
            <div style={{
              background:"rgba(240,165,0,0.1)",borderRadius:"20px",padding:"32px",
              border:"2px solid rgba(240,165,0,0.2)",marginBottom:"32px",
            }}>
              <div style={{
                fontFamily:"Cinzel,serif",fontSize:"64px",fontWeight:900,color:"#f0a500",
                marginBottom:"8px",lineHeight:1,
              }}>{dailyGoal}</div>
              <div style={{color:"rgba(255,255,255,0.7)",marginBottom:"24px"}}>episódios por dia</div>
              <input type="range" min="1" max="10" value={dailyGoal}
                onChange={e=>setDailyGoal(Number(e.target.value))}
                style={{width:"100%",accentColor:"#f0a500",height:"4px"}}
              />
              <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.5)",fontSize:"12px",marginTop:"8px"}}>
                <span>1 ep (40 min)</span><span>10 eps (4h)</span>
              </div>
            </div>
            <div style={{
              background:"rgba(26,188,156,0.1)",borderRadius:"12px",padding:"12px",
              border:"1px solid rgba(26,188,156,0.2)",marginBottom:"24px",color:"rgba(245,240,232,0.8)",fontSize:"14px",
            }}>
              ⏱️ Com {dailyGoal} eps/dia, você verá os ~500 eps essenciais em ~{Math.ceil(500/dailyGoal)} dias!
            </div>
            <button onClick={handleFinish} style={{
              background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
              padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",
              fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px",
              boxShadow:"0 4px 20px rgba(240,165,0,0.4)",
            }}>ZARPAR DE VERDADE! 🏴‍☠️</button>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"24px"}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{
              width:i===step?"24px":"8px",height:"8px",borderRadius:"4px",
              background:i<=step?"#f0a500":"rgba(255,255,255,0.2)",transition:"all 0.3s",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// HEADER
function Header({ state, onNav, currentScreen }) {
  const navItems = [
    {id:"dashboard",icon:"🏠",label:"Início"},
    {id:"map",icon:"🗺️",label:"Mapa"},
    {id:"profile",icon:"👤",label:"Perfil"},
    {id:"guide",icon:"📖",label:"Guia"},
  ];
  return (
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,zIndex:100,
      background:"rgba(10,22,40,0.95)",backdropFilter:"blur(12px)",
      borderTop:"1px solid rgba(240,165,0,0.2)",
      display:"flex",justifyContent:"space-around",padding:"8px 0 max(8px,env(safe-area-inset-bottom))",
    }}>
      {navItems.map(n=>(
        <button key={n.id} onClick={()=>onNav(n.id)} style={{
          display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",
          background:"none",border:"none",cursor:"pointer",padding:"6px 12px",
          color: currentScreen===n.id ? "#f0a500" : "rgba(255,255,255,0.5)",
          transition:"all 0.2s",
        }}>
          <span style={{fontSize:"22px"}}>{n.icon}</span>
          <span style={{fontSize:"10px",fontWeight:700,fontFamily:"Nunito,sans-serif"}}>{n.label}</span>
          {currentScreen===n.id&&<div style={{width:"4px",height:"4px",borderRadius:"50%",background:"#f0a500"}}/>}
        </button>
      ))}
    </div>
  );
}

// DASHBOARD
function Dashboard({ state, onUpdate, onNav }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  const totalEssential = useMemo(() => ARCS_DATA.reduce((s,a)=>s+a.epsEssential.length,0), []);
  const watchedEssential = useMemo(() =>
    ARCS_DATA.reduce((s,a)=>s+a.epsEssential.filter(ep=>state.watchedEps.includes(ep)).length,0)
  , [state.watchedEps]);

  const todayArc = useMemo(() => {
    const unlocked = ARCS_DATA.find(a => state.unlockedArcs.includes(a.id) && !state.completedArcs.includes(a.id));
    return unlocked || ARCS_DATA[0];
  }, [state.unlockedArcs, state.completedArcs]);

  const todayWatched = useMemo(() => {
    const today = new Date().toDateString();
    return state.dailyEpsToday || 0;
  }, [state.dailyEpsToday]);

  const showNotification = (msg, type="xp") => {
    setNotification({msg,type});
    setTimeout(()=>setNotification(null),2500);
  };

  const handleCheckin = () => {
    if (checkedIn || state.lastCheckin === new Date().toDateString()) return;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now()-86400000).toDateString();
    const newStreak = state.lastCheckin === yesterday ? state.streak + 1 : 1;
    const newXP = state.xp + 20;
    const newLevel = Math.floor(newXP / 200) + 1;
    onUpdate({
      ...state, xp: newXP, level: newLevel, streak: newStreak,
      maxStreak: Math.max(state.maxStreak, newStreak), lastCheckin: today,
    });
    setCheckedIn(true);
    showNotification("+20 XP por check-in diário! ⚓");
  };

  const progress = totalEssential > 0 ? (watchedEssential/totalEssential*100).toFixed(1) : 0;

  return (
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease"}}>
      {notification && (
        <div style={{
          position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:1000,
          background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
          padding:"10px 20px",borderRadius:"50px",fontWeight:700,
          animation:"fadeIn 0.3s ease",boxShadow:"0 4px 20px rgba(240,165,0,0.4)",
          whiteSpace:"nowrap",fontFamily:"Nunito,sans-serif",
        }}>{notification.msg}</div>
      )}

      {/* Top header */}
      <div style={{
        background:"rgba(255,255,255,0.03)",borderRadius:"20px",
        border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginBottom:"16px",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
          <div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:"12px",fontFamily:"Nunito,sans-serif"}}>Capitão</div>
            <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"20px",fontWeight:700}}>{state.userName}</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{getLevelName(state.level)}</div>
          </div>
          <StreakBadge streak={state.streak}/>
        </div>
        <XPBar xp={state.xp} level={state.level}/>
      </div>

      {/* Progress */}
      <div style={{
        background:"linear-gradient(135deg,rgba(26,188,156,0.1),rgba(10,22,40,0.3))",
        borderRadius:"20px",border:"1px solid rgba(26,188,156,0.2)",padding:"16px",marginBottom:"16px",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
          <span style={{color:"rgba(245,240,232,0.8)",fontFamily:"Nunito,sans-serif",fontWeight:700}}>📊 Progresso Geral</span>
          <span style={{color:"#1abc9c",fontWeight:700,fontFamily:"Cinzel,serif"}}>{progress}%</span>
        </div>
        <div style={{height:"12px",background:"rgba(255,255,255,0.08)",borderRadius:"6px",overflow:"hidden",marginBottom:"6px"}}>
          <div style={{
            width:`${progress}%`,height:"100%",
            background:"linear-gradient(90deg,#1abc9c,#2ecc71)",
            borderRadius:"6px",transition:"width 1s ease",
            boxShadow:"0 0 10px rgba(26,188,156,0.5)",
          }}/>
        </div>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",fontFamily:"Nunito,sans-serif"}}>
          {watchedEssential} de {totalEssential} episódios essenciais
        </div>
      </div>

      {/* Daily mission */}
      <div style={{
        background:"linear-gradient(135deg,rgba(192,57,43,0.1),rgba(10,22,40,0.3))",
        borderRadius:"20px",border:"1px solid rgba(192,57,43,0.3)",padding:"16px",marginBottom:"16px",
      }}>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"16px",fontWeight:700,marginBottom:"4px"}}>
          ⚓ Missão de Hoje
        </div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",marginBottom:"12px",fontFamily:"Nunito,sans-serif"}}>
          Meta: {state.dailyGoal} eps — Assistidos hoje: {todayWatched}
        </div>
        <div style={{height:"8px",background:"rgba(255,255,255,0.08)",borderRadius:"4px",overflow:"hidden",marginBottom:"12px"}}>
          <div style={{
            width:`${Math.min(100,(todayWatched/state.dailyGoal)*100)}%`,
            height:"100%",background:"linear-gradient(90deg,#c0392b,#e74c3c)",
            borderRadius:"4px",transition:"width 0.5s",
          }}/>
        </div>
        <button onClick={()=>onNav("map")} style={{
          background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"white",
          padding:"10px 20px",borderRadius:"12px",border:"none",cursor:"pointer",
          fontWeight:700,fontFamily:"Nunito,sans-serif",fontSize:"14px",width:"100%",
        }}>
          Ver Mapa de Arcos →
        </button>
      </div>

      {/* Next arc */}
      {todayArc && (
        <div style={{
          background:"rgba(255,255,255,0.03)",borderRadius:"20px",
          border:"1px solid rgba(240,165,0,0.15)",padding:"16px",marginBottom:"16px",
        }}>
          <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"14px",fontWeight:700,marginBottom:"8px"}}>
            🗺️ Próxima Missão
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{fontSize:"40px"}}>{todayArc.icon}</div>
            <div>
              <div style={{color:"white",fontWeight:700,fontFamily:"Cinzel,serif"}}>{todayArc.name}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>{todayArc.saga}</div>
              <div style={{color:"#1abc9c",fontSize:"12px",marginTop:"4px"}}>
                {todayArc.epsEssential.length} eps essenciais
              </div>
            </div>
          </div>
          <div style={{
            marginTop:"12px",padding:"10px",background:"rgba(240,165,0,0.05)",
            borderRadius:"10px",color:"rgba(245,240,232,0.7)",fontSize:"13px",fontFamily:"Nunito,sans-serif",
          }}>
            {todayArc.hype}
          </div>
        </div>
      )}

      {/* Check-in */}
      <button onClick={handleCheckin} disabled={checkedIn || state.lastCheckin===new Date().toDateString()} style={{
        width:"100%",padding:"14px",borderRadius:"16px",border:"2px solid rgba(240,165,0,0.3)",
        background: (checkedIn||state.lastCheckin===new Date().toDateString()) ? "rgba(255,255,255,0.03)" : "rgba(240,165,0,0.1)",
        color: (checkedIn||state.lastCheckin===new Date().toDateString()) ? "rgba(255,255,255,0.3)" : "#f0a500",
        cursor: (checkedIn||state.lastCheckin===new Date().toDateString()) ? "not-allowed" : "pointer",
        fontWeight:700,fontFamily:"Nunito,sans-serif",fontSize:"15px",transition:"all 0.2s",
      }}>
        {(checkedIn||state.lastCheckin===new Date().toDateString()) ? "✅ Check-in feito hoje!" : "⚓ Check-in diário (+20 XP)"}
      </button>

      <div style={{
        textAlign:"center",marginTop:"16px",color:"rgba(255,255,255,0.3)",
        fontSize:"12px",fontFamily:"Nunito,sans-serif",
      }}>
        {MOTIVATIONAL[Math.floor(Math.random()*MOTIVATIONAL.length)]}
      </div>
    </div>
  );
}

// ARC CARD
function ArcCard({ arc, state, onOpen }) {
  const isUnlocked = state.unlockedArcs.includes(arc.id);
  const isCompleted = state.completedArcs.includes(arc.id);
  const isActive = isUnlocked && !isCompleted;
  const watchedInArc = arc.epsEssential.filter(ep=>state.watchedEps.includes(ep)).length;
  const progress = arc.epsEssential.length > 0 ? watchedInArc/arc.epsEssential.length*100 : 0;

  const stars = arc.difficulty;
  const statusIcon = isCompleted ? "✅" : isActive ? "⚓" : "🔒";
  const statusColor = isCompleted ? "#1abc9c" : isActive ? "#f0a500" : "rgba(255,255,255,0.2)";

  return (
    <div
      onClick={()=>isUnlocked&&onOpen(arc)}
      style={{
        background: isCompleted
          ? "linear-gradient(135deg,rgba(26,188,156,0.1),rgba(10,22,40,0.5))"
          : isActive
          ? "linear-gradient(135deg,rgba(240,165,0,0.08),rgba(10,22,40,0.5))"
          : "rgba(255,255,255,0.02)",
        borderRadius:"20px",
        border:`2px solid ${isCompleted?"rgba(26,188,156,0.4)":isActive?"rgba(240,165,0,0.3)":"rgba(255,255,255,0.05)"}`,
        padding:"16px",cursor:isUnlocked?"pointer":"default",
        transition:"all 0.2s",opacity:isUnlocked?1:0.4,
        boxShadow: isActive ? "0 4px 20px rgba(240,165,0,0.1)" : isCompleted ? "0 4px 20px rgba(26,188,156,0.1)" : "none",
      }}
      onMouseEnter={e=>{if(isUnlocked)e.currentTarget.style.transform="translateY(-2px)"}}
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
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:"12px",fontFamily:"Nunito,sans-serif"}}>
          {arc.epsEssential.length} essenciais / {arc.epsTotal.length} total
        </div>
        <div style={{color:"#f0a500",fontSize:"12px"}}>
          {"⭐".repeat(stars)}
        </div>
      </div>
      {isUnlocked && (
        <div style={{height:"6px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden"}}>
          <div style={{
            width:`${progress}%`,height:"100%",
            background:isCompleted?"linear-gradient(90deg,#1abc9c,#2ecc71)":"linear-gradient(90deg,#f0a500,#ffd700)",
            borderRadius:"3px",transition:"width 0.5s",
          }}/>
        </div>
      )}
    </div>
  );
}

// MAP
function ArcMap({ state, onUpdate }) {
  const [selectedArc, setSelectedArc] = useState(null);
  const sagas = useMemo(() => {
    const map = {};
    ARCS_DATA.forEach(a=>{if(!map[a.saga])map[a.saga]=[];map[a.saga].push(a);});
    return map;
  },[]);

  return (
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700,marginBottom:"4px"}}>🗺️ Grand Line</div>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",marginBottom:"20px",fontFamily:"Nunito,sans-serif"}}>
        Sua rota pela maior aventura do mundo
      </div>
      {Object.entries(sagas).map(([saga,arcs])=>(
        <div key={saga} style={{marginBottom:"24px"}}>
          <div style={{
            display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",
            paddingBottom:"8px",borderBottom:"1px solid rgba(240,165,0,0.15)",
          }}>
            <div style={{
              background:"linear-gradient(135deg,#f0a500,#ffd700)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",
            }}>Saga {saga}</div>
            <div style={{
              fontSize:"11px",color:"rgba(255,255,255,0.4)",
              background:"rgba(255,255,255,0.05)",padding:"2px 8px",borderRadius:"10px",
            }}>
              {arcs.filter(a=>state.completedArcs.includes(a.id)).length}/{arcs.length} completos
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {arcs.map(arc=>(
              <ArcCard key={arc.id} arc={arc} state={state} onOpen={setSelectedArc}/>
            ))}
          </div>
        </div>
      ))}
      {selectedArc && (
        <ArcModal arc={selectedArc} state={state} onUpdate={onUpdate} onClose={()=>setSelectedArc(null)}/>
      )}
    </div>
  );
}

// ARC MODAL
function ArcModal({ arc, state, onUpdate, onClose }) {
  const [activeTab, setActiveTab] = useState("episodes");
  const [showQuiz, setShowQuiz] = useState(false);
  const [notification, setNotification] = useState(null);

  const allEssentialWatched = arc.epsEssential.every(ep=>state.watchedEps.includes(ep));
  const quizDone = state.quizResults[arc.id] !== undefined;

  const showNotif = (msg) => { setNotification(msg); setTimeout(()=>setNotification(null),2000); };

  const toggleEp = (ep, type) => {
    const isWatched = state.watchedEps.includes(ep);
    let xpGain = type==="essential"?10:type==="recommended"?5:2;
    let newWatched = isWatched ? state.watchedEps.filter(e=>e!==ep) : [...state.watchedEps,ep];
    let newXP = isWatched ? state.xp - xpGain : state.xp + xpGain;
    let newLevel = Math.floor(Math.max(0,newXP)/200)+1;
    let newDailyEps = isWatched ? Math.max(0,state.dailyEpsToday-1) : state.dailyEpsToday+1;

    // Check if arc is now complete
    const allEssDone = arc.epsEssential.every(ep=>newWatched.includes(ep));
    let newCompleted = [...state.completedArcs];
    let newUnlocked = [...state.unlockedArcs];
    if (allEssentialWatched && !newCompleted.includes(arc.id)) {
      newCompleted.push(arc.id);
      // unlock next arc
      const idx = ARCS_DATA.findIndex(a=>a.id===arc.id);
      if (idx < ARCS_DATA.length-1) newUnlocked.push(ARCS_DATA[idx+1].id);
    }

    if (!isWatched) showNotif(`+${xpGain} XP`);
    onUpdate({...state, watchedEps:newWatched, xp:Math.max(0,newXP), level:newLevel,
      dailyEpsToday:newDailyEps, dailyEpsRecord:Math.max(state.dailyEpsRecord,newDailyEps),
      completedArcs:newCompleted, unlockedArcs:newUnlocked });
  };

  const fillerEps = arc.epsTotal.filter(ep=>!arc.epsEssential.includes(ep)&&!arc.epsRecommended.includes(ep));
  const totalHours = (arc.epsEssential.length * 24 / 60).toFixed(1);

  if (showQuiz) return (
    <Quiz arc={arc} state={state} onUpdate={onUpdate} onClose={()=>{setShowQuiz(false);onClose();}}/>
  );

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:200,background:"rgba(5,10,20,0.92)",
      display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease",
      fontFamily:"Nunito,sans-serif",
    }}>
      {notification&&(
        <div style={{
          position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:300,
          background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
          padding:"8px 20px",borderRadius:"50px",fontWeight:700,
          animation:"fadeIn 0.2s ease",
        }}>{notification}</div>
      )}
      {/* Header */}
      <div style={{
        background:"rgba(10,22,40,0.98)",borderBottom:"1px solid rgba(240,165,0,0.2)",
        padding:"16px",display:"flex",alignItems:"center",gap:"12px",
        flexShrink:0,
      }}>
        <button onClick={onClose} style={{
          background:"rgba(255,255,255,0.05)",border:"none",color:"white",
          width:"36px",height:"36px",borderRadius:"50%",cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",
        }}>←</button>
        <div style={{fontSize:"32px"}}>{arc.icon}</div>
        <div>
          <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontWeight:700,fontSize:"16px"}}>{arc.name}</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px"}}>Saga {arc.saga}</div>
        </div>
      </div>
      {/* Hype */}
      <div style={{
        background:"linear-gradient(135deg,rgba(240,165,0,0.08),rgba(10,22,40,0))",
        padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)",
        color:"rgba(245,240,232,0.8)",fontSize:"13px",lineHeight:1.6,flexShrink:0,
      }}>{arc.hype}</div>
      {/* Stats */}
      <div style={{
        display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",padding:"12px 16px",
        borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0,
      }}>
        {[
          {label:"Essenciais",val:arc.epsEssential.length,color:"#f0a500"},
          {label:"Total eps",val:arc.epsTotal.length,color:"#1abc9c"},
          {label:"Horas",val:`${totalHours}h`,color:"#9b59b6"},
        ].map(s=>(
          <div key={s.label} style={{
            background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"10px",textAlign:"center",
          }}>
            <div style={{color:s.color,fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"18px"}}>{s.val}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div style={{
        display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0,
        background:"rgba(10,22,40,0.5)",
      }}>
        {["episodes","tips"].map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{
            flex:1,padding:"12px",background:"none",border:"none",cursor:"pointer",
            color:activeTab===tab?"#f0a500":"rgba(255,255,255,0.4)",fontWeight:700,
            borderBottom:activeTab===tab?"2px solid #f0a500":"2px solid transparent",
            fontFamily:"Nunito,sans-serif",fontSize:"14px",
          }}>{tab==="episodes"?"📋 Episódios":"💡 Dicas"}</button>
        ))}
      </div>
      {/* Content */}
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
        {activeTab==="episodes"&&(
          <div>
            {arc.epsEssential.length>0&&(
              <div style={{marginBottom:"16px"}}>
                <div style={{color:"#f0a500",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>🌟 Essenciais</div>
                {arc.epsEssential.map(ep=>(
                  <EpRow key={ep} ep={ep} type="essential" state={state} onToggle={toggleEp}/>
                ))}
              </div>
            )}
            {arc.epsRecommended.length>0&&(
              <div style={{marginBottom:"16px"}}>
                <div style={{color:"#1abc9c",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>👍 Recomendados</div>
                {arc.epsRecommended.map(ep=>(
                  <EpRow key={ep} ep={ep} type="recommended" state={state} onToggle={toggleEp}/>
                ))}
              </div>
            )}
            {fillerEps.length>0&&(
              <div style={{marginBottom:"16px"}}>
                <div style={{color:"rgba(255,255,255,0.4)",fontWeight:700,marginBottom:"8px",fontSize:"13px"}}>💤 Fillers (pode pular)</div>
                {fillerEps.map(ep=>(
                  <EpRow key={ep} ep={ep} type="filler" state={state} onToggle={toggleEp}/>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab==="tips"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <TipCard icon="⚡" title="Velocidade 1.5x"
              text={`Assista em 1.5x e economize ${Math.round(arc.epsEssential.length*24*0.33)} minutos neste arco!`}
            />
            <TipCard icon="⏭️" title="Pule os fillers"
              text={`Pulando os ${fillerEps.length} fillers deste arco, você economiza ${Math.round(fillerEps.length*24)} minutos.`}
            />
            <TipCard icon="🎯" title="Foco no essencial"
              text={`${arc.epsEssential.length} episódios essenciais = ${(arc.epsEssential.length*24/60).toFixed(1)}h de puro conteúdo.`}
            />
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{
        padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.05)",
        background:"rgba(10,22,40,0.98)",flexShrink:0,
      }}>
        {allEssentialWatched && !quizDone ? (
          <button onClick={()=>setShowQuiz(true)} style={{
            width:"100%",padding:"14px",borderRadius:"16px",border:"none",cursor:"pointer",
            background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
            fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",
            boxShadow:"0 4px 20px rgba(240,165,0,0.4)",
          }}>⚓ Iniciar Quiz do Arco!</button>
        ) : quizDone ? (
          <div style={{
            textAlign:"center",color:"#1abc9c",fontWeight:700,fontSize:"15px",
          }}>✅ Quiz completo! {state.quizResults[arc.id]?.score}/{arc.quiz.length} corretas</div>
        ) : (
          <div style={{
            textAlign:"center",color:"rgba(255,255,255,0.5)",fontSize:"13px",
          }}>Assista todos os episódios essenciais para liberar o quiz!</div>
        )}
      </div>
    </div>
  );
}

function EpRow({ ep, type, state, onToggle }) {
  const watched = state.watchedEps.includes(ep);
  const colors = { essential:"#f0a500", recommended:"#1abc9c", filler:"rgba(255,255,255,0.3)" };
  const tags = { essential:"ESSENCIAL", recommended:"RECOMEND.", filler:"FILLER" };
  return (
    <div
      onClick={()=>onToggle(ep, type)}
      style={{
        display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",
        borderRadius:"10px",cursor:"pointer",marginBottom:"4px",
        background: watched ? "rgba(26,188,156,0.08)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${watched?"rgba(26,188,156,0.2)":"rgba(255,255,255,0.04)"}`,
        transition:"all 0.15s",
      }}
    >
      <div style={{
        width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
        border:`2px solid ${watched?"#1abc9c":colors[type]}`,
        background:watched?"#1abc9c":"transparent",
        display:"flex",alignItems:"center",justifyContent:"center",
        color:"white",fontSize:"12px",transition:"all 0.2s",
      }}>{watched?"✓":""}</div>
      <div style={{flex:1}}>
        <span style={{color:watched?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.9)",fontSize:"14px",fontWeight:600}}>
          Ep. {ep}
        </span>
      </div>
      <div style={{
        fontSize:"9px",fontWeight:700,color:colors[type],
        border:`1px solid ${colors[type]}`,padding:"2px 6px",borderRadius:"6px",
        opacity:0.8,flexShrink:0,
      }}>{tags[type]}</div>
      <div style={{color:"rgba(255,255,255,0.3)",fontSize:"11px",flexShrink:0}}>24min</div>
    </div>
  );
}

function TipCard({ icon, title, text }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"16px",
      border:"1px solid rgba(240,165,0,0.1)",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
        <span style={{fontSize:"24px"}}>{icon}</span>
        <span style={{color:"#f0a500",fontWeight:700,fontFamily:"Cinzel,serif",fontSize:"14px"}}>{title}</span>
      </div>
      <p style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",margin:0,lineHeight:1.6}}>{text}</p>
    </div>
  );
}

// QUIZ
function Quiz({ arc, state, onUpdate, onClose }) {
  const [questions] = useState(()=>[...arc.quiz].sort(()=>Math.random()-0.5));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    if (correct) setScore(s=>s+1);
  };

  const handleNext = () => {
    if (current < questions.length-1) {
      setCurrent(c=>c+1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalScore = score + (selected===q.correct?1:0);
      const isPerfect = finalScore === questions.length;
      const xpGain = 30 + (isPerfect?50:0);
      const newXP = state.xp + xpGain;
      const newLevel = Math.floor(newXP/200)+1;
      const newConsecutive = isPerfect ? state.consecutivePerfect+1 : 0;
      
      // Unlock next arc
      const idx = ARCS_DATA.findIndex(a=>a.id===arc.id);
      let newUnlocked = [...state.unlockedArcs];
      let newCompleted = [...state.completedArcs];
      if (!newCompleted.includes(arc.id)) newCompleted.push(arc.id);
      if (idx < ARCS_DATA.length-1 && !newUnlocked.includes(ARCS_DATA[idx+1].id)) {
        newUnlocked.push(ARCS_DATA[idx+1].id);
      }
      
      onUpdate({...state, xp:newXP, level:newLevel,
        quizResults:{...state.quizResults,[arc.id]:{score:finalScore,total:questions.length}},
        completedArcs:newCompleted, unlockedArcs:newUnlocked,
        perfectQuizzes: isPerfect ? state.perfectQuizzes+1 : state.perfectQuizzes,
        consecutivePerfect: newConsecutive,
      });
      setDone(true);
      setScore(finalScore);
    }
  };

  const progress = (current/questions.length)*100;
  const finalScore = done ? score : 0;

  if (done) {
    const pct = finalScore/questions.length;
    const msgs = [
      "Você precisa estudar mais, marinheiro! 💪",
      "Bom esforço! O Grand Line te aguarda!",
      "Muito bem! Digno de um capitão pirata!",
      "PERFEITO! Você é um verdadeiro nakama! 🏴‍☠️",
    ];
    const msgIdx = pct<0.4?0:pct<0.7?1:pct<1?2:3;
    return (
      <div style={{
        position:"fixed",inset:0,zIndex:300,background:"rgba(5,10,20,0.98)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        padding:"32px",fontFamily:"Nunito,sans-serif",animation:"fadeIn 0.4s ease",
      }}>
        <div style={{fontSize:"80px",marginBottom:"16px"}}>{pct>=1?"🏆":pct>=0.7?"⭐":"⚓"}</div>
        <h2 style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"28px",marginBottom:"8px",textAlign:"center"}}>
          Quiz Completo!
        </h2>
        <div style={{
          fontFamily:"Cinzel,serif",fontSize:"48px",fontWeight:900,
          background:"linear-gradient(135deg,#f0a500,#ffd700)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          marginBottom:"8px",
        }}>{finalScore}/{questions.length}</div>
        <p style={{color:"rgba(255,255,255,0.7)",textAlign:"center",marginBottom:"24px"}}>{msgs[msgIdx]}</p>
        <div style={{
          background:"rgba(240,165,0,0.1)",borderRadius:"16px",padding:"12px 24px",
          border:"1px solid rgba(240,165,0,0.2)",marginBottom:"24px",
          color:"#f0a500",fontWeight:700,fontSize:"18px",
        }}>
          +{30+(pct===1?50:0)} XP ganhos!
        </div>
        <button onClick={onClose} style={{
          background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
          padding:"14px 40px",borderRadius:"50px",border:"none",cursor:"pointer",
          fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",
          boxShadow:"0 4px 20px rgba(240,165,0,0.4)",
        }}>Próxima Ilha! 🗺️</button>
      </div>
    );
  }

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:300,background:"rgba(5,10,20,0.98)",
      display:"flex",flexDirection:"column",padding:"20px",
      fontFamily:"Nunito,sans-serif",animation:"fadeIn 0.4s ease",
    }}>
      {/* Progress */}
      <div style={{marginBottom:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,0.6)",fontSize:"13px",marginBottom:"8px"}}>
          <span>Quiz — {arc.name}</span>
          <span>{current+1}/{questions.length}</span>
        </div>
        <div style={{height:"6px",background:"rgba(255,255,255,0.08)",borderRadius:"3px",overflow:"hidden"}}>
          <div style={{
            width:`${progress}%`,height:"100%",
            background:"linear-gradient(90deg,#f0a500,#ffd700)",
            borderRadius:"3px",transition:"width 0.4s",
          }}/>
        </div>
      </div>

      {/* Question */}
      <div style={{
        background:"rgba(255,255,255,0.03)",borderRadius:"20px",
        border:"1px solid rgba(240,165,0,0.2)",padding:"24px",
        marginBottom:"20px",flex:0,
      }}>
        <div style={{color:"rgba(240,165,0,0.6)",fontSize:"12px",fontWeight:700,marginBottom:"8px"}}>PERGUNTA {current+1}</div>
        <p style={{color:"white",fontSize:"17px",fontWeight:700,lineHeight:1.5,margin:0}}>{q.q}</p>
      </div>

      {/* Options */}
      <div style={{display:"flex",flexDirection:"column",gap:"10px",flex:1}}>
        {q.opts.map((opt,i)=>{
          let bg = "rgba(255,255,255,0.03)";
          let border = "rgba(255,255,255,0.1)";
          let color = "rgba(255,255,255,0.9)";
          if (answered) {
            if (i===q.correct) { bg="rgba(26,188,156,0.15)"; border="#1abc9c"; color="#1abc9c"; }
            else if (i===selected && i!==q.correct) { bg="rgba(192,57,43,0.15)"; border="#c0392b"; color="#c0392b"; }
          } else if (selected===i) {
            bg="rgba(240,165,0,0.1)"; border="#f0a500"; color="#f0a500";
          }
          return (
            <button key={i} onClick={()=>handleAnswer(i)} disabled={answered} style={{
              padding:"14px 16px",borderRadius:"14px",border:`2px solid ${border}`,
              background:bg,color,cursor:answered?"default":"pointer",
              textAlign:"left",fontFamily:"Nunito,sans-serif",fontWeight:600,fontSize:"15px",
              transition:"all 0.2s",display:"flex",alignItems:"center",gap:"12px",
            }}>
              <span style={{
                width:"28px",height:"28px",borderRadius:"50%",
                border:`2px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,fontSize:"12px",fontWeight:700,color,
              }}>{String.fromCharCode(65+i)}</span>
              {opt}
              {answered&&i===q.correct&&<span style={{marginLeft:"auto"}}>✓</span>}
              {answered&&i===selected&&i!==q.correct&&<span style={{marginLeft:"auto"}}>✗</span>}
            </button>
          );
        })}
      </div>

      {answered&&(
        <button onClick={handleNext} style={{
          marginTop:"16px",width:"100%",padding:"14px",borderRadius:"16px",
          background:"linear-gradient(135deg,#f0a500,#ffd700)",color:"#0a1628",
          border:"none",cursor:"pointer",fontFamily:"Cinzel,serif",fontWeight:700,fontSize:"16px",
        }}>
          {current<questions.length-1?"Próxima Pergunta →":"Ver Resultado 🏆"}
        </button>
      )}
    </div>
  );
}

// PROFILE
function Profile({ state }) {
  const totalHours = (state.watchedEps.length * 24 / 60).toFixed(1);
  const accuracy = Object.values(state.quizResults).length > 0
    ? Math.round(Object.values(state.quizResults).reduce((s,r)=>s+r.score/r.total,0)/Object.values(state.quizResults).length*100)
    : 0;

  return (
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease",fontFamily:"Nunito,sans-serif"}}>
      {/* Avatar card */}
      <div style={{
        background:"linear-gradient(135deg,rgba(240,165,0,0.1),rgba(10,22,40,0.5))",
        borderRadius:"24px",border:"2px solid rgba(240,165,0,0.2)",
        padding:"24px",textAlign:"center",marginBottom:"16px",
      }}>
        <div style={{fontSize:"64px",marginBottom:"8px",animation:"float 3s ease-in-out infinite"}}>🏴‍☠️</div>
        <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700}}>{state.userName}</div>
        <div style={{color:"rgba(255,255,255,0.6)",marginBottom:"16px"}}>{getLevelName(state.level)}</div>
        <div style={{
          display:"inline-block",background:"rgba(240,165,0,0.15)",
          borderRadius:"50px",padding:"6px 20px",
          border:"1px solid rgba(240,165,0,0.3)",
          fontFamily:"Cinzel,serif",color:"#ffd700",fontWeight:700,fontSize:"24px",
        }}>Nível {state.level}</div>
        <div style={{marginTop:"16px"}}>
          <XPBar xp={state.xp} level={state.level}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px",marginBottom:"16px",
      }}>
        {[
          {icon:"📺",label:"Horas assistidas",val:`${totalHours}h`},
          {icon:"🔥",label:"Streak máximo",val:`${state.maxStreak}d`},
          {icon:"⭐",label:"Eps assistidos",val:state.watchedEps.length},
          {icon:"🎯",label:"Accuracy quiz",val:`${accuracy}%`},
        ].map(s=>(
          <div key={s.label} style={{
            background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"14px",
            border:"1px solid rgba(255,255,255,0.06)",textAlign:"center",
          }}>
            <div style={{fontSize:"24px",marginBottom:"4px"}}>{s.icon}</div>
            <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"20px",fontWeight:700}}>{s.val}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:"11px"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"18px",fontWeight:700,marginBottom:"12px"}}>
        🏆 Conquistas
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
        {ACHIEVEMENTS.map(ach=>{
          const unlocked = state.achievements.includes(ach.id) || ach.condition(state);
          return (
            <div key={ach.id} style={{
              display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",
              borderRadius:"14px",
              background:unlocked?"rgba(240,165,0,0.08)":"rgba(255,255,255,0.02)",
              border:`1px solid ${unlocked?"rgba(240,165,0,0.2)":"rgba(255,255,255,0.04)"}`,
              opacity:unlocked?1:0.5,
            }}>
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
function Guide() {
  const [open, setOpen] = useState(null);
  const sections = [
    {
      id:"how", icon:"⚡", title:"Como assistir One Piece RÁPIDO",
      content: `One Piece tem mais de 1000 episódios, mas não se assuste! Existem tipos de episódio:

🌟 CANON: São os episódios baseados no mangá original. SEMPRE assista.

👍 RECOMENDADO: Anime original com qualidade, não essencial mas vale a pena.

💤 FILLER: Episódios inventados pelo anime (sem base no mangá). Podem ser pulados sem perder nada da história principal.

📝 RECAP: Episódios de revisão. Pule sempre.

Dicas de velocidade:
• 1.5x poupa 33% do tempo — perfeito para diálogos
• 2x só para cenas lentas ou recaps
• Use o guia do Arco no app para saber exatamente o que pular`,
    },
    {
      id:"fillers", icon:"⏭️", title:"Fillers para PULAR com segurança",
      content: `Estes arcos são 100% filler — pule sem medo:

🚫 Arco Goat Island (eps 196-206)
🚫 Arco Ruluka Island (eps 220-228)  
🚫 Arco G-8 (eps 196-206) — OK, este é amado pelos fãs mas ainda é filler
🚫 Arco Ocean's Dream (eps 220-224)
🚫 Arco Foxy's Return (eps 225-228)
🚫 Arco Spa Island (eps 382-384)
🚫 Arco Little East Blue (eps 426-429)
🚫 Arco Z's Ambition (eps 575-578)
🚫 Arco Caesar Retrieval (eps 626-628)

Episódios internos a pular:
• 50, 51 (entre East Blue e Grand Line)
• 131-143 (entre Alabasta e Skypiea)
• 196-206 (entre Skypiea e Long Ring)`,
    },
    {
      id:"arcs", icon:"🏆", title:"Os 10 arcos que vão te viciar",
      content: `Em ordem de impacto emocional:

1. 🦈 Arlong Park — Você vai chorar. Garanto.
2. ⚖️ Enies Lobby — O melhor arco de toda a série
3. ⚔️ Marineford — A maior batalha da história
4. 🌹 Dressrosa — Villain mais carismático
5. 🏜️ Alabasta — A primeira grande aventura
6. 🏯 Wano — One Piece em seu auge
7. 🚂 Water 7 — Drama máximo
8. 🎂 Whole Cake Island — Sanji em profundidade
9. 🫧 Sabaody — A maior virada de roteiro
10. ☁️ Skypiea — Subestimado, importantíssimo`,
    },
    {
      id:"sagas", icon:"🗺️", title:"Quais sagas são essenciais?",
      content: `ESSENCIAIS (não pule nada):
✅ East Blue — Origem de tudo
✅ Alabasta — Primeira grande saga  
✅ Water 7 / Enies Lobby — Melhor da série
✅ Thriller Bark — Momento lendário do Zoro
✅ Sabaody a Marineford — Clímax épico
✅ New World inteiro

OPCIONAIS mas recomendadas:
⭐ Skypiea — Lore importante para o final
⭐ Fishman Island — Transição do timeskip

PODE PULAR:
⏭️ Long Ring Long Land — 100% desnecessária`,
    },
  ];

  return (
    <div style={{padding:"16px",paddingBottom:"80px",animation:"fadeIn 0.4s ease",fontFamily:"Nunito,sans-serif"}}>
      <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"22px",fontWeight:700,marginBottom:"4px"}}>📖 Guia do Pirata</div>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:"13px",marginBottom:"20px"}}>
        Tudo que você precisa saber para navegar One Piece
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {sections.map(s=>(
          <div key={s.id} style={{
            background:"rgba(255,255,255,0.03)",borderRadius:"18px",
            border:"1px solid rgba(240,165,0,0.15)",overflow:"hidden",
          }}>
            <button
              onClick={()=>setOpen(open===s.id?null:s.id)}
              style={{
                width:"100%",padding:"16px",background:"none",border:"none",cursor:"pointer",
                display:"flex",alignItems:"center",gap:"12px",textAlign:"left",
              }}
            >
              <span style={{fontSize:"28px"}}>{s.icon}</span>
              <span style={{
                fontFamily:"Cinzel,serif",color:"#f0a500",fontWeight:700,fontSize:"15px",flex:1,
              }}>{s.title}</span>
              <span style={{color:"rgba(255,255,255,0.4)",fontSize:"20px",transition:"transform 0.3s",
                transform:open===s.id?"rotate(180deg)":"rotate(0)",
              }}>⌄</span>
            </button>
            {open===s.id&&(
              <div style={{
                padding:"0 16px 16px",color:"rgba(245,240,232,0.8)",fontSize:"14px",
                lineHeight:1.8,borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"12px",
                whiteSpace:"pre-line",
              }}>{s.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [state, setState] = useLocalStorage("op-tracker-state", INITIAL_STATE);
  const [screen, setScreen] = useState("dashboard");

  const handleOnboard = (prefs) => {
    setState({...INITIAL_STATE, onboarded:true, ...prefs});
  };

  const handleUpdate = useCallback((newState) => {
    // Check achievements
    const newAchs = ACHIEVEMENTS
      .filter(a=>!newState.achievements.includes(a.id) && a.condition(newState))
      .map(a=>a.id);
    setState({...newState, achievements:[...newState.achievements,...newAchs]});
  }, [setState]);

  if (!state.onboarded) return <Onboarding onComplete={handleOnboard}/>;

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(180deg,#0a1628 0%,#0d2137 60%,#0a1628 100%)",
      color:"white",position:"relative",
    }}>
      <WaveBackground/>
      <div style={{position:"relative",zIndex:1,maxWidth:"600px",margin:"0 auto"}}>
        {/* Top bar */}
        <div style={{
          position:"sticky",top:0,zIndex:50,
          background:"rgba(10,22,40,0.92)",backdropFilter:"blur(12px)",
          padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",
          borderBottom:"1px solid rgba(240,165,0,0.1)",
        }}>
          <div style={{fontFamily:"Cinzel,serif",color:"#f0a500",fontSize:"18px",fontWeight:900}}>
            🏴‍☠️ One Piece
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <StreakBadge streak={state.streak}/>
            <div style={{
              display:"flex",alignItems:"center",gap:"6px",
              background:"rgba(240,165,0,0.1)",borderRadius:"20px",padding:"4px 12px",
              border:"1px solid rgba(240,165,0,0.2)",
            }}>
              <span style={{color:"#f0a500",fontSize:"12px"}}>⭐</span>
              <span style={{
                color:"#f0a500",fontWeight:700,fontFamily:"Cinzel,serif",fontSize:"13px",
                animation:"pulse-xp 2s ease-in-out infinite",
              }}>{state.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Screen content */}
        {screen==="dashboard"&&<Dashboard state={state} onUpdate={handleUpdate} onNav={setScreen}/>}
        {screen==="map"&&<ArcMap state={state} onUpdate={handleUpdate}/>}
        {screen==="profile"&&<Profile state={state}/>}
        {screen==="guide"&&<Guide/>}
      </div>
      <Header state={state} onNav={setScreen} currentScreen={screen}/>
    </div>
  );
}
