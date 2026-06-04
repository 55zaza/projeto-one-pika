// ============================================================
// BANCO DE EPISÓDIOS ÉPICOS — ANTI-SPOILER
// ============================================================

export interface EpisodeEntry {
  num: number;
  title: string;
  desc: string;
}

export const EPISODES_POOL: Record<string, EpisodeEntry[]> = {
  'romance-dawn': [
    { num: 1, title: 'Sou Luffy! O Homem que Vai se Tornar o Rei dos Piratas!', desc: 'O início de tudo. Um garoto com chapéu de palha e um sonho impossível. Prepare-se para se apaixonar.' },
    { num: 2, title: 'O Grande Espadachim Zoro! O Caçador de Recompensas Pirata!', desc: 'Luffy encontra um espadachim amarrado num poste. O começo de uma das maiores amizades da história.' },
    { num: 3, title: 'Um Caso Difícil! A Espadachim Apanhada Pela Armadilha!', desc: 'A tripulação cresce. Ação, risadas e o primeiro vislumbre do potencial absurdo de Luffy.' },
  ],
  'orange-town': [
    { num: 4, title: 'Vito Buggy! O Grande Capitão Palhaço!', desc: 'O primeiro grande vilão aparece e é... um palhaço. Mas não se engane, ele é mortalmente perigoso.' },
    { num: 5, title: 'Uma Terrível Batalha! O Poder da Fruta do Diabo Bara Bara!', desc: 'Luffy vs Buggy. Borracha contra explosões. Uma batalha caótica e hilária que define o tom da série.' },
    { num: 8, title: 'Nami Entra em Ação! O Truque da Ladrona de Piratas!', desc: 'Nami rouba o mapa e deixa todo mundo confuso. Ela é esperta, rápida e vai ser essencial pra tripulação.' },
  ],
  'syrup-village': [
    { num: 9, title: 'O Mentiroso Atirador! O Capitão Usopp!', desc: 'Conhecemos Usopp, o garoto que mente pra se proteger mas tem um coração maior que qualquer verdade.' },
    { num: 10, title: 'O Sonho de Usopp! Rumo ao Grand Line!', desc: 'O sonho de Usopp é revelado e você vai entender porque ele é um dos personagens mais humanos da série.' },
    { num: 17, title: 'Luffy em Perigo! O Monstro do Vento Kuro!', desc: 'Kuro revela sua velocidade absurda e Luffy luta no limite. Tensão máxima.' },
    { num: 18, title: 'Você é um Amigo? O Testamento do Capitão!', desc: 'A conclusão emocionante do arco. Usopp faz sua escolha e nunca mais é o mesmo.' },
  ],
  'baratie': [
    { num: 19, title: 'Avante para o Grand Line! O Submergível que Cozinha!', desc: 'A tripulação chega ao Baratie e conhece Sanji, o cozinheiro mais estiloso do Grand Line.' },
    { num: 20, title: 'Nenhum Intruso Passará! O Guarda-Costas do Mar, Zoro!', desc: 'Zoro enfrenta um oficial da Marinha e deixa claro: ele não brinca quando o assunto é se tornar o melhor.' },
    { num: 26, title: 'O Rei do Culinário! Zeff e Sanji!', desc: 'A história de Sanji e Zeff é revelada. Prepare os lenços — essa é uma das origens mais lindas da série.' },
    { num: 30, title: 'O Cozinheiro do Baratie! O Grande Chef Zeff!', desc: 'Sanji toma sua decisão final. A despedida do Baratie vai te destruir emocionalmente de um jeito bom.' },
  ],
  'arlong-park': [
    { num: 31, title: 'A Ameaça do Peixe-Homem! Arlong do Nariz de Serrote!', desc: 'Arlong aparece e você entende que o mundo de One Piece pode ser extremamente cruel e injusto.' },
    { num: 36, title: 'O Segredo de Nami! O Mapa do Grand Line Desenhado pela Aldeia!', desc: 'A verdade sobre Nami é revelada. Prepare-se para sentir raiva, tristeza e admiração ao mesmo tempo.' },
    { num: 37, title: 'Cuidado Pessoal! Nami Pedindo Ajuda?', desc: 'O momento mais icônico da saga East Blue. Nami pede ajuda a Luffy. Só isso. Dois segundos que mudam tudo.' },
    { num: 44, title: 'Grito do Coração! Luffy vs Arlong! Batalha nas Profundezas do Mar!', desc: 'Luffy submerge e luta debaixo d\'água. Pura adrenalina e o poder da amizade ao máximo.' },
    { num: 45, title: 'Derrubado! Arlong\'s Park Vem Abaixo!', desc: 'A cena mais catártica da East Blue. Você vai querer gritar junto com a Nami. Garantido.' },
  ],
  'loguetown': [
    { num: 52, title: 'Cidade do Começo e do Fim! O Destino de Luffy!', desc: 'A cidade onde Gold Roger nasceu e morreu. Luffy visita o cadafalso e sente o peso do destino.' },
    { num: 53, title: 'Basta Rir! O Espírito do Pirata que Sacudiu o Mundo!', desc: 'O episódio mais épico da East Blue. Gold Roger ressurge na memória e o Grand Line chama.' },
  ],
  'alabasta': [
    { num: 92, title: 'Rumo a Alabasta! A Princesa do Reino do Deserto, Vivi!', desc: 'A tripulação parte para salvar um reino. Vivi é uma das personagens mais complexas da série.' },
    { num: 100, title: 'Vivi! Seus Amigos estão Esperando!', desc: 'O episódio 100 e a série ainda tá aquecendo. A escala da aventura fica clara aqui.' },
    { num: 110, title: 'Luta no Deserto! Luffy vs Crocodile!', desc: 'Primeira batalha contra Crocodile. Luffy leva uma lição brutal. Nem tudo é força.' },
    { num: 129, title: 'Vivi e os Nakamas! As Marcas da Amizade!', desc: 'A conclusão de Alabasta. A cena da despedida de Vivi vai ficar na sua memória para sempre.' },
  ],
  'skypiea': [
    { num: 153, title: 'Skypiea! O País nas Nuvens!', desc: 'A tripulação chega num lugar impossível. Uma ilha no céu com seus próprios deuses e regras.' },
    { num: 168, title: 'Enel entra em Cena! A Terrível Verdade!', desc: 'Enel revela seu poder e seu plano. Você vai odiar e amar esse vilão ao mesmo tempo.' },
    { num: 182, title: 'Luffy vs Enel! Borracha vs Raio!', desc: 'A batalha mais estratégica até agora. Luffy descobre sua vantagem natural contra o "Deus" Enel.' },
    { num: 195, title: 'Toca o Sino! A Mensagem de Gol Roger!', desc: 'O finale de Skypiea. O sino toca e revela que essa aventura sempre foi maior do que parecia.' },
  ],
  'water-7': [
    { num: 229, title: 'Água 7! A Cidade sobre as Águas!', desc: 'Uma cidade incrível, carpinteiros gigantes e um mistério que vai mudar a tripulação para sempre.' },
    { num: 236, title: 'O Inimigo é Robin! O Caso das Mãos Assassinas!', desc: 'Robin age de forma suspeita e a tensão dentro da tripulação aumenta. O que ela está escondendo?' },
    { num: 251, title: 'Luffy Enlouquecido! Protejam Usopp!', desc: 'A briga entre Luffy e Usopp. Uma das cenas mais dolorosas da série. Nakamas brigando de verdade.' },
    { num: 263, title: 'A Resolução de Robin! O Grito de \'Quero Viver!\'', desc: 'Robin chora e pede para ser salva. Dois segundos. Toda a plateia chora junto. Momento lendário.' },
  ],
  'enies-lobby': [
    { num: 264, title: 'Os Chapéus de Palha Chegam! A Grande Invasão de Enies Lobby!', desc: 'A tripulação invade a sede do governo. Isso é loucura. Isso é One Piece. Isso é épico.' },
    { num: 278, title: 'Atire! A Bala que vai Furar o Mundo!', desc: 'Usopp atira na bandeira do Governo Mundial. Um dos momentos mais arrepiantes da série.' },
    { num: 302, title: 'Luffy vs Lucci! O Poder do Gear Second!', desc: 'A melhor batalha da série até aqui. Gear Second é revelado. A animação, a música, o impacto — perfeito.' },
    { num: 312, title: 'Obrigado, Going Merry!', desc: 'O funeral do Going Merry. Chore. Não há vergonha nisso. Todo mundo chora nesse episódio.' },
  ],
  'thriller-bark': [
    { num: 337, title: 'A Ilha Fantasma! O Mistério do Thriller Bark!', desc: 'A ilha mais estranha do Grand Line. Fantasmas, zumbis e um vilão que rouba sombras.' },
    { num: 362, title: 'Zoro\'s Capitulação! Thriller Bark\'s Darkness!', desc: 'Zoro enfrenta o poder de Moriah e demonstra porque é o espadachim mais determinado do mundo.' },
    { num: 377, title: 'Nada Aconteceu! O Sacrifício de Zoro!', desc: 'O momento mais lendário de Zoro. Ele absorve toda a dor de Luffy. Sanji entende. Você entende. Silêncio.' },
    { num: 381, title: 'Novo Nakama! O Misterioso Brook Entra na Tripulação!', desc: 'Brook oficialmente entra pra tripulação. Um esqueleto músico. One Piece é maravilhoso.' },
  ],
  'sabaody': [
    { num: 385, title: 'Sabaody! O Arquipélago de Bolhas!', desc: 'O pré-New World começa. Novos piratas incríveis aparecem e a escala do mundo fica enorme.' },
    { num: 392, title: 'Os 11 Supernovas! Os Piratas com Recompensas Acima de 100M!', desc: 'Kid, Law, Hawkins, Drake — os futuros rivais e aliados aparecem. A nova geração chegou.' },
    { num: 405, title: 'Separados! Os Chapéus de Palha São Dispersos!', desc: 'Kuma dispersa toda a tripulação. Luffy assiste impotente. Um dos finais de arco mais chocantes da história.' },
  ],
  'marineford': [
    { num: 457, title: 'A Grande Guerra Começa! Whitebeard vs os Shichibukai!', desc: 'A maior batalha da história de One Piece começa. Todos os lados, todos os poderes, tudo de uma vez.' },
    { num: 476, title: 'O Poder de Whitebeard! O Homem Mais Forte do Mundo!', desc: 'Whitebeard em ação total. Você entende porque ele é chamado de o homem mais poderoso do mundo.' },
    { num: 483, title: 'O Grande Incêndio de Marineford! O Adeus de Ace!', desc: 'O momento mais devastador da série. Tenha lenços. Muitos. Esse episódio muda One Piece para sempre.' },
    { num: 489, title: 'Luffy Perde Consciência! O Fim da Grande Guerra!', desc: 'A guerra termina. O mundo nunca mais é o mesmo. Luffy nunca mais é o mesmo. Você nunca mais é o mesmo.' },
  ],
  'fishman-island': [
    { num: 517, title: 'Dois Anos Depois! A Reunião no Sabaody!', desc: 'Dois anos se passaram e a tripulação está de volta. Mais fortes, mais maduros, mais prontos.' },
    { num: 541, title: 'Fishman Island! O Reino Embaixo do Mar!', desc: 'Um reino subaquático incrível com história complexa sobre racismo e poder. One Piece não brinca.' },
    { num: 574, title: 'Luffy Usa o Haki! A Promessa de Luffy para Otohime!', desc: 'Luffy demonstra o poder do Haki Real pela primeira vez em combate. Impactante.' },
  ],
  'punk-hazard': [
    { num: 579, title: 'Punk Hazard! A Ilha Proibida!', desc: 'Metade fogo, metade gelo. Uma ilha dividida por uma batalha antiga entre dois gigantes.' },
    { num: 592, title: 'A Aliança dos Chapéus de Palha e Law!', desc: 'Luffy e Law formam aliança. Dois dos personagens mais carismáticos da série juntos. Perfeito.' },
    { num: 625, title: 'Caesar Clown Derrotado! A Vitória da Aliança!', desc: 'O finale de Punk Hazard. Doflamingo aparece brevemente e já deixa claro que o próximo arco vai ser épico.' },
  ],
  'dressrosa': [
    { num: 629, title: 'Dressrosa! O País das Flores e Paixão!', desc: 'Um reino lindo com um segredo sombrio. Doflamingo governa com sorriso e fios de morte.' },
    { num: 657, title: 'Trafalgar Law vs Doflamingo! A Batalha no Céu!', desc: 'Law confronta Doflamingo e a rivalidade épica entre eles é estabelecida definitivamente.' },
    { num: 726, title: 'Luffy Gear Fourth! O Homem-Bala!', desc: 'Gear Fourth é revelado. A animação explode. O impacto é absurdo. Um dos melhores momentos da série.' },
    { num: 733, title: 'Luffy vs Doflamingo! O Fim do Jogo da Gaiola de Pássaros!', desc: 'A batalha final de Dressrosa. King Kong Gun. O grito de todo o reino. Inesquecível.' },
  ],
  'zou': [
    { num: 751, title: 'Zou! O País nas Costas de um Elefante!', desc: 'Uma ilha no lombo de um elefante gigante. One Piece continua sendo surreal da melhor forma.' },
    { num: 763, title: 'A Trágica História de Zou! O Shogun Jack!', desc: 'A devastação causada por Jack é revelada. A crueldade do mundo de One Piece em seu nível mais alto.' },
    { num: 779, title: 'Luffy\'s Resolve! A Decisão do Chapéu de Palha!', desc: 'As alianças são formadas. O plano para Wano começa. A saga mais épica da série está chegando.' },
  ],
  'whole-cake-island': [
    { num: 783, title: 'Big Mom! A Imperatriz do Mar!', desc: 'Big Mom em ação. Um dos Yonkous mais aterrorizantes aparece e o perigo é imediato e real.' },
    { num: 850, title: 'O Passado de Sanji! A Família Vinsmoke!', desc: 'A origem de Sanji é revelada. Dor, superação e o entendimento de porque ele é quem é.' },
    { num: 870, title: 'Luffy vs Katakuri! O Poder do Observatório de Haki!', desc: 'Uma das melhores batalhas da série. Luffy aprende e cresce em tempo real. Katakuri é incrível.' },
    { num: 877, title: 'A Fuga! O Sunny e Zoro em Ação!', desc: 'O escape caótico de Whole Cake Island. Ação, humor e o poder da amizade em cada segundo.' },
  ],
  'wano': [
    { num: 890, title: 'Wano! O País Fechado do Samurai!', desc: 'Wano abre com uma animação cinematográfica. Beleza, tensão e um mundo completamente novo.' },
    { num: 954, title: 'Zoro e a Espada Enma! O Presente de Ryuma!', desc: 'Zoro recebe Enma, uma das espadas mais poderosas. O teste é brutal e a cena é lendária.' },
    { num: 1015, title: 'Luffy Não Morreu! O Grito de Nami!', desc: 'Luffy cai. O mundo desespera. Nami grita. E então — algo impossível acontece.' },
    { num: 1071, title: 'Gear 5! O Despertar da Gomu Gomu no Mi!', desc: 'O episódio mais aguardado da história de One Piece. Gear 5 é revelado. A animação é arte pura. Histórico.' },
  ],
};

// Função para recomendar episódios baseado no tempo disponível
export function recommendEpisodes(
  freeMinutes: number,
  currentArcId: string,
  watchedEps: Record<string, number[]>,
  spoilerFilterEp: number
): EpisodeEntry[] {
  const EP_DURATION = 24; // minutos por episódio
  const maxEps = Math.floor(freeMinutes / EP_DURATION);
  if (maxEps === 0) return [];

  const pool = EPISODES_POOL[currentArcId] || [];
  const watched = watchedEps[currentArcId] || [];

  const available = pool
    .filter(ep => !watched.includes(ep.num) && ep.num <= spoilerFilterEp)
    .slice(0, maxEps);

  return available;
}

// Retorna todos os arcos em ordem para navegação
export const ARC_ORDER = [
  'romance-dawn', 'orange-town', 'syrup-village', 'baratie',
  'arlong-park', 'loguetown', 'alabasta', 'skypiea',
  'water-7', 'enies-lobby', 'thriller-bark', 'sabaody',
  'marineford', 'fishman-island', 'punk-hazard', 'dressrosa',
  'zou', 'whole-cake-island', 'wano',
];
