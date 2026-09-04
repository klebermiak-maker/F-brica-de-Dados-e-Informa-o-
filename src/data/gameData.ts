import {
  SortingItem,
  MachineChallenge,
  DetectiveCase,
  QuizQuestion,
  AchievementBadge,
  CreativeTheme,
  GlossaryItem
} from '../types';

export const SORTING_ITEMS: SortingItem[] = [
  // Grupo 1: Cotidiano & Tempo
  {
    id: 's1',
    content: '38',
    type: 'dado',
    category: 'numero',
    themeGroup: 'cotidiano',
    explanation: 'É apenas um número isolado! Sem contexto, não sabemos se é uma temperatura, uma idade, o número de uma casa ou o preço de um brinquedo.',
    iconName: 'Hash',
    colorHint: 'amber'
  },
  {
    id: 's2',
    content: 'O termômetro marcou 38°C de febre no Lucas, e ele tomou remédio.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Excelente! Aqui o número 38 ganhou sentido e contexto (temperatura corporal com febre), permitindo que cuidem do Lucas!',
    iconName: 'Thermometer',
    colorHint: 'emerald'
  },
  {
    id: 's3',
    content: 'Verde',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'cotidiano',
    explanation: 'Apenas uma cor solta! Não sabemos se é a cor da grama, de uma maçã, de um lápis ou do semáforo.',
    iconName: 'Palette',
    colorHint: 'amber'
  },
  {
    id: 's4',
    content: 'O semáforo está verde para os carros, então os veículos podem seguir.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Muito bem! A cor verde no contexto do trânsito significa que a passagem está liberada e segura para os carros.',
    iconName: 'TrafficCone',
    colorHint: 'emerald'
  },
  {
    id: 's5',
    content: '15:30',
    type: 'dado',
    category: 'simbolo',
    themeGroup: 'escola',
    explanation: 'É só um horário solto no relógio. Sem contexto, não sabemos o que vai acontecer nessa hora.',
    iconName: 'Clock',
    colorHint: 'amber'
  },
  {
    id: 's6',
    content: 'A aula de Educação Física no pátio começa pontualmente às 15:30.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'escola',
    explanation: 'Isso é informação! Une o horário (15:30) à atividade escolar (Educação Física) e ao local (pátio).',
    iconName: 'Activity',
    colorHint: 'emerald'
  },
  {
    id: 's7',
    content: 'Pipoca',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'escola',
    explanation: 'É um dado bruto (apenas uma palavra). Não tem frase, ação ou mensagem completa.',
    iconName: 'FileQuestion',
    colorHint: 'amber'
  },
  {
    id: 's8',
    content: 'Hoje a cantina da escola vai distribuir pipoca quentinha no recreio.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'escola',
    explanation: 'Informação completa! Comunica quem, onde, quando e o que vai acontecer no recreio.',
    iconName: 'Sparkles',
    colorHint: 'emerald'
  },
  {
    id: 's9',
    content: '12',
    type: 'dado',
    category: 'numero',
    themeGroup: 'escola',
    explanation: 'Número sem unidade nem história. São 12 anos? 12 figurinhas? 12 horas? É um dado bruto.',
    iconName: 'HelpCircle',
    colorHint: 'amber'
  },
  {
    id: 's10',
    content: 'A turma do 3º ano pegou 12 livros emprestados na biblioteca hoje.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'escola',
    explanation: 'Informação valiosa! Mostra a quantidade de livros e quem pegou na biblioteca escolar.',
    iconName: 'BookOpen',
    colorHint: 'emerald'
  },
  {
    id: 's11',
    content: 'Chuva',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'cotidiano',
    explanation: 'Uma palavra solta. Vai chover hoje? Choveu ontem? É um dado que precisa de previsão e local para virar informação.',
    iconName: 'CloudDrizzle',
    colorHint: 'amber'
  },
  {
    id: 's12',
    content: 'A previsão avisa que vai chover forte às 17h, por isso leve o guarda-chuva!',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Perfeito! Dados de tempo e hora foram processados em uma informação que nos ajuda a tomar uma decisão útil.',
    iconName: 'Umbrella',
    colorHint: 'emerald'
  },
  // Novos itens ampliados (s13 a s24)
  {
    id: 's13',
    content: '42',
    type: 'dado',
    category: 'numero',
    themeGroup: 'cotidiano',
    explanation: 'Apenas um número solto. Pode ser a linha do ônibus, o número do sapato ou o número de um apartamento.',
    iconName: 'Hash',
    colorHint: 'amber'
  },
  {
    id: 's14',
    content: 'O ônibus da linha 42 vai passar em frente à escola às 12:15.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Ótima informação! Agora o número 42 tem sentido (linha do ônibus), local (frente da escola) e horário certo.',
    iconName: 'Bus',
    colorHint: 'emerald'
  },
  {
    id: 's15',
    content: 'Azul',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'esporte',
    explanation: 'Cor isolada. Não indica quem está usando, qual o time ou o que a cor significa.',
    iconName: 'Palette',
    colorHint: 'amber'
  },
  {
    id: 's16',
    content: 'O time com camiseta azul marcou 3 gols e venceu a partida de futebol!',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'esporte',
    explanation: 'Informação esportiva completa! A cor azul identifica a equipe vencedora e o resultado do jogo.',
    iconName: 'Trophy',
    colorHint: 'emerald'
  },
  {
    id: 's17',
    content: 'Dinossauro',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'ciencia',
    explanation: 'Palavra isolada! É o nome de um ser vivo pré-histórico, mas sem nenhuma frase que explique um fato.',
    iconName: 'FileQuestion',
    colorHint: 'amber'
  },
  {
    id: 's18',
    content: 'Cientistas descobriram o fóssil de um dinossauro de 70 milhões de anos no Brasil.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'ciencia',
    explanation: 'Notícia científica cheia de informação! Explica o que foi achado, onde, por quem e a idade do fóssil.',
    iconName: 'Sparkles',
    colorHint: 'emerald'
  },
  {
    id: 's19',
    content: '100%',
    type: 'dado',
    category: 'simbolo',
    themeGroup: 'ciencia',
    explanation: 'Uma porcentagem sem objeto. 100% de bateria? 100% de acertos? 100% de desconto?',
    iconName: 'HelpCircle',
    colorHint: 'amber'
  },
  {
    id: 's20',
    content: 'A bateria do tablet da aula de robótica está em 100% carregada e pronta para o projeto.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'ciencia',
    explanation: 'Informação tecnológica precisa! Mostra o dispositivo, o nível de energia e a prontidão para o uso.',
    iconName: 'BatteryCharging',
    colorHint: 'emerald'
  },
  {
    id: 's21',
    content: 'Morangos',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'cotidiano',
    explanation: 'Apenas uma fruta mencionada. Quantos são? Onde estão? Para que servem? É um dado bruto.',
    iconName: 'Apple',
    colorHint: 'amber'
  },
  {
    id: 's22',
    content: 'A merendeira lavou 50 morangos fresquinhos para a salada de frutas da tarde.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Informação deliciosa! Detalha a quantidade (50), a ação (lavou) e o destino (salada de frutas da tarde).',
    iconName: 'ShoppingBag',
    colorHint: 'emerald'
  },
  {
    id: 's23',
    content: '384.400 km',
    type: 'dado',
    category: 'numero',
    themeGroup: 'ciencia',
    explanation: 'Uma medida solta. Embora tenha unidade (km), sem contexto não sabemos a distância de onde até onde.',
    iconName: 'Hash',
    colorHint: 'amber'
  },
  {
    id: 's24',
    content: 'A Lua orbita no espaço a uma distância média de 384.400 km do planeta Terra.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'ciencia',
    explanation: 'Fato astronômico completo! Conecta a medida ao satélite natural (Lua) e ao nosso planeta.',
    iconName: 'Moon',
    colorHint: 'emerald'
  },
  {
    id: 's25',
    content: '22',
    type: 'dado',
    category: 'numero',
    themeGroup: 'cotidiano',
    explanation: 'Apenas um número sem contexto. Pode ser a idade de alguém, o dia do mês, o número de um apartamento ou o canal da televisão.',
    iconName: 'Hash',
    colorHint: 'amber'
  },
  {
    id: 's26',
    content: 'Hoje é dia 22 de março, Dia Mundial da Água, e a turma fará cartazes sobre economia de água.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'cotidiano',
    explanation: 'Informação ecológica e cívica! O número 22 ganhou data (22 de março), motivo (Dia da Água) e ação educativa na escola.',
    iconName: 'Sparkles',
    colorHint: 'emerald'
  },
  {
    id: 's27',
    content: 'Silêncio',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'escola',
    explanation: 'Uma palavra solta no ar! Sem frase completa ou placa, não sabemos se é um pedido, uma regra ou o título de um livro.',
    iconName: 'FileQuestion',
    colorHint: 'amber'
  },
  {
    id: 's28',
    content: 'A placa na entrada da biblioteca pede silêncio para que os colegas possam se concentrar na leitura dos livros.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'escola',
    explanation: 'Informação escolar importantíssima! Dá sentido e propósito à palavra, orientando o respeito à concentração coletiva.',
    iconName: 'BookOpen',
    colorHint: 'emerald'
  },
  {
    id: 's29',
    content: '25%',
    type: 'dado',
    category: 'simbolo',
    themeGroup: 'ciencia',
    explanation: 'Uma porcentagem isolada. É o desconto de um produto? A chance de chuva? A carga da bateria do celular? Falta contexto!',
    iconName: 'HelpCircle',
    colorHint: 'amber'
  },
  {
    id: 's30',
    content: 'O sensor digital da horta mediu apenas 25% de umidade na terra, avisando que os canteiros precisam ser regados.',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'ciencia',
    explanation: 'Informação tecnológica de automação! O valor de 25% foi processado e alertou sobre o cuidado necessário com as plantinhas.',
    iconName: 'Sprout',
    colorHint: 'emerald'
  },
  {
    id: 's31',
    content: 'Dourado',
    type: 'dado',
    category: 'palavra',
    themeGroup: 'esporte',
    explanation: 'Apenas uma cor solta. É a cor de uma camiseta? De um laço? Do sol? É um dado bruto sem significado.',
    iconName: 'Palette',
    colorHint: 'amber'
  },
  {
    id: 's32',
    content: 'A equipe dos Leopardos conquistou o troféu dourado de campeã invicta na corrida de revezamento escolar!',
    type: 'informacao',
    category: 'frase_contextualizada',
    themeGroup: 'esporte',
    explanation: 'Notícia esportiva com celebração! Une a cor do prêmio à equipe vencedora e à modalidade do campeonato escolar.',
    iconName: 'Trophy',
    colorHint: 'emerald'
  }
];

export const MACHINE_CHALLENGES: MachineChallenge[] = [
  {
    id: 'm1',
    title: 'Boletim do Tempo no Fim de Semana',
    theme: 'Meteorologia & Passeio',
    story: 'O computador da estação meteorológica recebeu 4 dados brutos soltos. Ajude a organizar cada um na gaveta certa para gerar a previsão do tempo!',
    rawItems: [
      { id: 'p1', key: 'Dia da Semana', value: 'Sábado', category: 'Tempo', icon: 'Calendar' },
      { id: 'p2', key: 'Temperatura', value: '31°C', category: 'Termômetro', icon: 'ThermometerSun' },
      { id: 'p3', key: 'Condição do Céu', value: 'Ensolarado', category: 'Clima', icon: 'Sun' },
      { id: 'p4', key: 'Destino', value: 'Praia de Santos', category: 'Local', icon: 'MapPin' }
    ],
    targetSlots: [
      { key: 'Dia da Semana', label: 'Quando vai ser?', expectedPieceId: 'p1' },
      { key: 'Temperatura', label: 'Qual a temperatura prevista?', expectedPieceId: 'p2' },
      { key: 'Condição do Céu', label: 'Como estará o céu?', expectedPieceId: 'p3' },
      { key: 'Destino', label: 'Em qual cidade ou local?', expectedPieceId: 'p4' }
    ],
    resultingInformation: 'No sábado, fará 31°C com céu ensolarado na Praia de Santos!',
    whyItIsInformation: 'Os 4 dados isolados (dia, graus, clima e praia) foram combinados e ganharam sentido completo.',
    decisionImpact: 'Decisão inteligente: A família pode preparar roupas leves, protetor solar e muita água fresca!'
  },
  {
    id: 'm2',
    title: 'Ficha Médica do Bichinho de Estimação',
    theme: 'Clínica Veterinária',
    story: 'A veterinária Dra. Ana anotou dados rápidos num bloquinho. Organize-os no prontuário digital do animalzinho!',
    rawItems: [
      { id: 'v1', key: 'Nome do Pet', value: 'Thor', category: 'Identificação', icon: 'Dog' },
      { id: 'v2', key: 'Espécie & Raça', value: 'Cachorrinho Poodle', category: 'Animal', icon: 'HeartHandshake' },
      { id: 'v3', key: 'Peso', value: '6 kg', category: 'Balança', icon: 'Scale' },
      { id: 'v4', key: 'Vacinação', value: '100% em dia', category: 'Saúde', icon: 'ShieldCheck' }
    ],
    targetSlots: [
      { key: 'Nome do Pet', label: 'Como o animal se chama?', expectedPieceId: 'v1' },
      { key: 'Espécie & Raça', label: 'Qual o tipo e raça dele?', expectedPieceId: 'v2' },
      { key: 'Peso', label: 'Quantos quilos ele pesa?', expectedPieceId: 'v3' },
      { key: 'Vacinação', label: 'Qual a situação das vacinas?', expectedPieceId: 'v4' }
    ],
    resultingInformation: 'O cachorrinho Poodle Thor pesa 6 kg e está com a vacinação 100% em dia!',
    whyItIsInformation: 'Juntamos os dados do paciente animal em uma ficha organizada com significado médico.',
    decisionImpact: 'Decisão inteligente: A veterinária conclui que Thor está saudável e pronto para brincar no parque!'
  },
  {
    id: 'm3',
    title: 'Convite da Festa de Aniversário',
    theme: 'Comemoração da Turma',
    story: 'Mariana quer convidar a classe para sua festa. Organize os dados soltos para imprimir o convite com informação completa!',
    rawItems: [
      { id: 'f1', key: 'Aniversariante', value: 'Mariana', category: 'Pessoa', icon: 'Smile' },
      { id: 'f2', key: 'Idade Nova', value: '9 Anos', category: 'Idade', icon: 'Cake' },
      { id: 'f3', key: 'Horário', value: '16 horas', category: 'Relógio', icon: 'Clock' },
      { id: 'f4', key: 'Sabor do Bolo', value: 'Chocolate com Morango', category: 'Doces', icon: 'Sparkles' }
    ],
    targetSlots: [
      { key: 'Aniversariante', label: 'Quem está fazendo aniversário?', expectedPieceId: 'f1' },
      { key: 'Idade Nova', label: 'Quantos anos vai fazer?', expectedPieceId: 'f2' },
      { key: 'Horário', label: 'A que horas começará?', expectedPieceId: 'f3' },
      { key: 'Sabor do Bolo', label: 'Qual o sabor do bolo?', expectedPieceId: 'f4' }
    ],
    resultingInformation: 'Mariana comemora seus 9 anos às 16 horas com um bolo delicioso de chocolate com morango!',
    whyItIsInformation: 'Se déssemos só o número "9" ou "16", ninguém saberia o que fazer. Unidos, viraram um convite claro!',
    decisionImpact: 'Decisão inteligente: Os amigos sabem a que horas chegar e podem preparar um abraço e parabéns!'
  },
  {
    id: 'm4',
    title: 'Placar Final do Torneio Escolar',
    theme: 'Esporte & Interclasse',
    story: 'O apito tocou no fim do jogo de queimada! O juiz registrou dados no papel. Encaixe-os para gerar o boletim esportivo oficial!',
    rawItems: [
      { id: 'e1', key: 'Time Vencedor', value: 'Estrelas Azuis (3º B)', category: 'Equipe', icon: 'Trophy' },
      { id: 'e2', key: 'Pontos do Vencedor', value: '15 pontos', category: 'Placar', icon: 'Flame' },
      { id: 'e3', key: 'Time Desafiante', value: 'Falcões Dourados (3º A)', category: 'Equipe', icon: 'Users' },
      { id: 'e4', key: 'Pontos do Desafiante', value: '11 pontos', category: 'Placar', icon: 'Award' }
    ],
    targetSlots: [
      { key: 'Time Vencedor', label: 'Quem fez mais pontos?', expectedPieceId: 'e1' },
      { key: 'Pontos do Vencedor', label: 'Qual a pontuação do vencedor?', expectedPieceId: 'e2' },
      { key: 'Time Desafiante', label: 'Quem foi o time adversário?', expectedPieceId: 'e3' },
      { key: 'Pontos do Desafiante', label: 'Qual a pontuação do adversário?', expectedPieceId: 'e4' }
    ],
    resultingInformation: 'As Estrelas Azuis (3º B) venceram os Falcões Dourados (3º A) pelo placar de 15 a 11!',
    whyItIsInformation: 'Números soltos "15" e "11" não dizem quem ganhou. Com os nomes dos times e a relação de pontos, temos a notícia do jogo!',
    decisionImpact: 'Decisão inteligente: A comissão organizadora já sabe para quem entregar o troféu de campeão!'
  },
  // Novos desafios de máquina ampliados (m5 a m8)
  {
    id: 'm5',
    title: 'Missão Espacial: O Foguete Explorador',
    theme: 'Astronomia & Exploração',
    story: 'O centro de controle aeroespacial coletou dados brutos para o grande lançamento. Organize os slots para acionar a contagem regressiva!',
    rawItems: [
      { id: 'r1', key: 'Nome do Foguete', value: 'Apolo Curioso', category: 'Espaçonave', icon: 'Rocket' },
      { id: 'r2', key: 'Destino', value: 'Cratera Lunar', category: 'Alvo', icon: 'Moon' },
      { id: 'r3', key: 'Contagem Regressiva', value: 'T-10 segundos', category: 'Relógio', icon: 'Clock' },
      { id: 'r4', key: 'Combustível', value: 'Hidrogênio Verde', category: 'Energia', icon: 'Zap' }
    ],
    targetSlots: [
      { key: 'Nome do Foguete', label: 'Qual o nome da espaçonave?', expectedPieceId: 'r1' },
      { key: 'Destino', label: 'Para onde ela vai viajar?', expectedPieceId: 'r2' },
      { key: 'Contagem Regressiva', label: 'Quanto tempo falta para subir?', expectedPieceId: 'r3' },
      { key: 'Combustível', label: 'Qual a fonte de energia?', expectedPieceId: 'r4' }
    ],
    resultingInformation: 'O foguete Apolo Curioso partirá em T-10 segundos rumo à Cratera Lunar usando Hidrogênio Verde!',
    whyItIsInformation: 'Nome do foguete, contagem, destino e combustível formaram a ordem de lançamento perfeita para os cientistas.',
    decisionImpact: 'Decisão inteligente: Os astronautas ajustam os cintos e a equipe da base comemora o início da missão!'
  },
  {
    id: 'm6',
    title: 'Empréstimo na Biblioteca Escolar',
    theme: 'Leitura & Organização',
    story: 'O leitor de código de barras da biblioteca leu 4 dados do sistema. Processe-os no comprovante digital de empréstimo!',
    rawItems: [
      { id: 'b1', key: 'Título da Obra', value: 'O Mistério da Floresta', category: 'Livro', icon: 'BookOpen' },
      { id: 'b2', key: 'Nome da Leitora', value: 'Beatriz (3º ano)', category: 'Estudante', icon: 'Users' },
      { id: 'b3', key: 'Data de Devolução', value: 'Próxima Sexta-feira', category: 'Calendário', icon: 'Calendar' },
      { id: 'b4', key: 'Código de Registro', value: 'Tombo #412', category: 'Identificador', icon: 'Bookmark' }
    ],
    targetSlots: [
      { key: 'Título da Obra', label: 'Qual livro foi escolhido?', expectedPieceId: 'b1' },
      { key: 'Nome da Leitora', label: 'Quem retirou o exemplar?', expectedPieceId: 'b2' },
      { key: 'Data de Devolução', label: 'Quando o livro deve voltar?', expectedPieceId: 'b3' },
      { key: 'Código de Registro', label: 'Qual o código cadastral?', expectedPieceId: 'b4' }
    ],
    resultingInformation: 'Beatriz (3º ano) retirou o livro "O Mistério da Floresta" (Tombo #412) com devolução marcada para a próxima Sexta-feira!',
    whyItIsInformation: 'O código, a data e os nomes soltos viraram um comprovante claro com direitos e responsabilidades da leitora.',
    decisionImpact: 'Decisão inteligente: A bibliotecária registra o empréstimo e Beatriz sabe a data certa para ler e devolver!'
  },
  {
    id: 'm7',
    title: 'A Colheita Saudável da Horta Escolar',
    theme: 'Meio Ambiente & Merenda',
    story: 'Os alunos anotaram os vegetais colhidos na horta da escola. Processe os dados para enviar o relatório à cozinha escolar!',
    rawItems: [
      { id: 'h1', key: 'Alimento', value: 'Cenouras Crocantes', category: 'Hortaliça', icon: 'Sprout' },
      { id: 'h2', key: 'Quantidade Colhida', value: '45 unidades', category: 'Número', icon: 'Scale' },
      { id: 'h3', key: 'Destino da Merenda', value: 'Sopa Quentinha de Legumes', category: 'Receita', icon: 'Sparkles' },
      { id: 'h4', key: 'Turma Responsável', value: 'Equipe Guardiões Verdes', category: 'Alunos', icon: 'Users' }
    ],
    targetSlots: [
      { key: 'Alimento', label: 'Qual vegetal foi colhido?', expectedPieceId: 'h1' },
      { key: 'Quantidade Colhida', label: 'Quantas unidades colheram?', expectedPieceId: 'h2' },
      { key: 'Destino da Merenda', label: 'Qual prato será preparado?', expectedPieceId: 'h3' },
      { key: 'Turma Responsável', label: 'Quem cuidou da colheita?', expectedPieceId: 'h4' }
    ],
    resultingInformation: 'A Equipe Guardiões Verdes colheu 45 cenouras crocantes para a saborosa sopa quentinha de legumes da merenda!',
    whyItIsInformation: 'Vegetal, quantidade e receita viraram a ficha nutricional da horta da escola.',
    decisionImpact: 'Decisão inteligente: A cozinheira começa a preparar a sopa sabendo que haverá legumes nutritivos para todos!'
  },
  {
    id: 'm8',
    title: 'O Robô Jardineiro Automatizado',
    theme: 'Robótica & Pensamento Computacional',
    story: 'Um pequeno robô construído na aula de ciências precisa programar sua rotina de irrigação usando dados dos sensores!',
    rawItems: [
      { id: 'j1', key: 'Nome do Robô', value: 'Robô Regador 3000', category: 'Autômato', icon: 'Bot' },
      { id: 'j2', key: 'Leitura do Sensor', value: 'Solo com 15% de umidade (Seco)', category: 'Sensor', icon: 'Thermometer' },
      { id: 'j3', key: 'Ação Programada', value: 'Liberar 200 ml de água', category: 'Comando', icon: 'Droplets' },
      { id: 'j4', key: 'Horário do Ciclo', value: 'Diariamente às 7:00 da manhã', category: 'Programação', icon: 'Clock' }
    ],
    targetSlots: [
      { key: 'Nome do Robô', label: 'Qual é o robô programado?', expectedPieceId: 'j1' },
      { key: 'Leitura do Sensor', label: 'O que o sensor detectou?', expectedPieceId: 'j2' },
      { key: 'Ação Programada', label: 'Qual tarefa ele executará?', expectedPieceId: 'j3' },
      { key: 'Horário do Ciclo', label: 'Em qual momento ele agirá?', expectedPieceId: 'j4' }
    ],
    resultingInformation: 'O Robô Regador 3000 detectou solo seco (15%) e liberará 200 ml de água diariamente às 7:00 da manhã!',
    whyItIsInformation: 'Dados de sensores e horários transformaram-se em uma regra inteligente de automação de computação.',
    decisionImpact: 'Decisão inteligente: As plantas receberão água na medida exata, sem desperdício e sem risco de secar!'
  },
  {
    id: 'm9',
    title: 'O Painel Solar da Escola Inteligente',
    theme: 'Energia Limpa & Sustentabilidade',
    story: 'O sensor digital do teto da escola captou leituras de energia solar. Organize os blocos para calcular a eletricidade limpa gerada hoje!',
    rawItems: [
      { id: 'sol1', key: 'Nome do Sistema', value: 'Painel Solar Sol Radiante', category: 'Equipamento', icon: 'Sun' },
      { id: 'sol2', key: 'Intensidade da Luz', value: 'Radiação Alta (Céu Aberto)', category: 'Clima', icon: 'ThermometerSun' },
      { id: 'sol3', key: 'Energia Gerada', value: '85 Kilowatt-hora (kWh)', category: 'Medição', icon: 'Zap' },
      { id: 'sol4', key: 'Benefício Ecológico', value: 'Eletricidade limpa para 20 salas', category: 'Impacto', icon: 'Sparkles' }
    ],
    targetSlots: [
      { key: 'Nome do Sistema', label: 'Qual sistema gerou energia?', expectedPieceId: 'sol1' },
      { key: 'Intensidade da Luz', label: 'Como estava a luz do sol?', expectedPieceId: 'sol2' },
      { key: 'Energia Gerada', label: 'Quanto de eletricidade produziu?', expectedPieceId: 'sol3' },
      { key: 'Benefício Ecológico', label: 'Qual o benefício para a escola?', expectedPieceId: 'sol4' }
    ],
    resultingInformation: 'O painel Sol Radiante captou alta radiação e produziu 85 kWh, fornecendo energia limpa para 20 salas de aula!',
    whyItIsInformation: 'Os dados do sensor solar foram convertidos em um demonstrativo ecológico de sustentabilidade escolar.',
    decisionImpact: 'Decisão inteligente: A direção comemora a economia de energia e ensina os alunos sobre proteção ao meio ambiente!'
  },
  {
    id: 'm10',
    title: 'O Resgate do Cãozinho Caramelo',
    theme: 'Cuidado Animal & Cidadania',
    story: 'Um cãozinho amigável foi encontrado perto do parquinho da escola com uma plaquinha. Organize os dados da coleira para avisar a família!',
    rawItems: [
      { id: 'cao1', key: 'Nome do Animal', value: 'Pipoca (Cãozinho Caramelo)', category: 'Identificação', icon: 'Dog' },
      { id: 'cao2', key: 'Local Encontrado', value: 'Praça das Flores (perto do coreto)', category: 'Localização', icon: 'MapPin' },
      { id: 'cao3', key: 'Horário do Encontro', value: '11:45 da manhã', category: 'Relógio', icon: 'Clock' },
      { id: 'cao4', key: 'Contato na Coleira', value: 'Telefone da Tutora Clara gravado', category: 'Comunicação', icon: 'ShieldCheck' }
    ],
    targetSlots: [
      { key: 'Nome do Animal', label: 'Qual o nome e tipo do animal?', expectedPieceId: 'cao1' },
      { key: 'Local Encontrado', label: 'Em qual local ele foi achado?', expectedPieceId: 'cao2' },
      { key: 'Horário do Encontro', label: 'A que horas ele foi localizado?', expectedPieceId: 'cao3' },
      { key: 'Contato na Coleira', label: 'Qual o dado de contato da tutora?', expectedPieceId: 'cao4' }
    ],
    resultingInformation: 'O cãozinho Pipoca foi localizado na Praça das Flores às 11:45 e o telefone da tutora Clara foi acionado com sucesso!',
    whyItIsInformation: 'A junção dos dados da coleira transformou pistas soltas em um comunicado de resgate seguro.',
    decisionImpact: 'Decisão inteligente: A tutora Clara é avisada de imediato e o Pipoca retorna são e salvo para seu lar!'
  }
];

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'd1',
    title: 'O Mistério do Piquenique no Parque',
    scenario: 'A turminha do 3º ano planeja um piquenique à tarde. O detetive de dados encontrou três fatos na central meteorológica.',
    rawFacts: [
      { label: 'Temperatura', value: '34°C (Muito quente)', icon: 'ThermometerSun' },
      { label: 'Índice de Sol', value: 'Radiação Ultravioleta Extrema', icon: 'SunMedium' },
      { label: 'Árvores no Local', value: 'Pouca sombra natural no gramado', icon: 'Trees' }
    ],
    synthesizedInformation: 'Informação Gerada: A tarde no parque terá calor intenso de 34°C, sol escaldante e quase nenhuma sombra para a turma se proteger.',
    decisionPrompt: 'Com base nessa informação, qual é a decisão mais inteligente e saudável para os alunos?',
    options: [
      {
        id: 'opt1',
        text: 'Levar protetor solar, boné, garrafinha de água e montar tendas ou procurar a área coberta do parque.',
        isCorrect: true,
        feedback: 'Correto! A informação permitiu prever os riscos do calor e tomar medidas de proteção à saúde!'
      },
      {
        id: 'opt2',
        text: 'Vestir casaco de inverno, luvas de lã e levar chocolate quente para esquentar.',
        isCorrect: false,
        feedback: 'Ops! Lembre-se: os dados indicam 34°C de calor forte, então roupas pesadas causariam mal-estar!'
      },
      {
        id: 'opt3',
        text: 'Ignorar a previsão do tempo, sair sem protetor solar e correr no sol do meio-dia sem beber água.',
        isCorrect: false,
        feedback: 'Cuidado! Decisões sem olhar a informação podem causar desidratação e insolação.'
      }
    ],
    learningTakeaway: 'A informação transforma dados sobre o clima em escolhas seguras para o nosso corpo!'
  },
  {
    id: 'd2',
    title: 'A Missão dos Lanches da Cantina',
    scenario: 'Dona Cida, a cantineira da escola, observou dados no balcão e precisa resolver a situação antes do recreio terminar.',
    rawFacts: [
      { label: 'Alunos na Fila', value: '24 crianças esperando lanche', icon: 'Users' },
      { label: 'Maçãs Restantes', value: 'Apenas 4 maçãs na fruteira', icon: 'Apple' },
      { label: 'Bananas no Estoque', value: '30 bananas fresquinhas na despensa', icon: 'ShoppingBag' }
    ],
    synthesizedInformation: 'Informação Gerada: Há 24 crianças com fome na fila, mas só 4 maçãs prontas. No entanto, há 30 bananas prontas na despensa.',
    decisionPrompt: 'Que decisão inteligente a Dona Cida deve tomar imediatamente com essa informação?',
    options: [
      {
        id: 'opt1',
        text: 'Buscar as bananas na despensa e avisar a fila que há bananas fresquinhas para todos!',
        isCorrect: true,
        feedback: 'Excelente! Usando os dados do estoque e da fila, ela garantiu que todas as 24 crianças lanchassem felizes!'
      },
      {
        id: 'opt2',
        text: 'Vender as 4 maçãs e mandar as outras 20 crianças embora sem lanche algum.',
        isCorrect: false,
        feedback: 'Incorreto! Havia 30 bananas guardadas. A informação do estoque completo resolve o problema da turma toda!'
      },
      {
        id: 'opt3',
        text: 'Fechar a cantina correndo e esperar o recreio do dia seguinte.',
        isCorrect: false,
        feedback: 'Não! Quando relacionamos os dados, descobrimos que havia fruta suficiente para atender todo mundo.'
      }
    ],
    learningTakeaway: 'Informação organizada sobre estoque e demanda ajuda a resolver problemas práticos na escola!'
  },
  {
    id: 'd3',
    title: 'O Caminho Seguro da Van Escolar',
    scenario: 'Tio Beto dirige a van escolar para levar as crianças para casa. O aplicativo de trânsito emitiu alertas na tela.',
    rawFacts: [
      { label: 'Avenida Principal', value: 'Buraco na pista + Trânsito completamente parado', icon: 'AlertTriangle' },
      { label: 'Rua das Palmeiras', value: 'Trânsito livre, asfaltada e com faixa de pedestres', icon: 'Navigation' },
      { label: 'Horário de Chegada', value: 'Pais aguardam pontualmente às 18h', icon: 'Clock' }
    ],
    synthesizedInformation: 'Informação Gerada: A rota principal está travada por obras e causará 40 minutos de atraso, enquanto a Rua das Palmeiras está livre e segura.',
    decisionPrompt: 'Qual é a decisão correta que o motorista deve tomar guiado pela informação?',
    options: [
      {
        id: 'opt1',
        text: 'Mudar a rota para a Rua das Palmeiras para chegar no horário combinado com segurança.',
        isCorrect: true,
        feedback: 'Perfeito! Os dados do mapa foram processados em uma rota inteligente e pontual!'
      },
      {
        id: 'opt2',
        text: 'Entrar de propósito no trânsito parado da avenida e ficar buzinando por 1 hora.',
        isCorrect: false,
        feedback: 'Não seria bom! A informação indicava claramente que a outra rua estava livre e transitável.'
      },
      {
        id: 'opt3',
        text: 'Desligar o GPS e andar em círculos sem olhar as placas.',
        isCorrect: false,
        feedback: 'Nunca! Usar a informação disponível evita imprevistos e protege os passageiros.'
      }
    ],
    learningTakeaway: 'Aplicativos como GPS coletam dados de satélite e transformam em rotas inteligentes para nossa vida.'
  },
  // Novos Casos de Detetive Ampliados (d4 a d6)
  {
    id: 'd4',
    title: 'O Resgate das Mudinhas da Horta',
    scenario: 'O clube de jardinagem da escola observou sinais de alerta nos canteiros antes do fim de semana prolongado.',
    rawFacts: [
      { label: 'Umidade da Terra', value: 'Solo ressecado e folhas murchando', icon: 'Sprout' },
      { label: 'Previsão do Tempo', value: '0% de chance de chuva e calor forte', icon: 'SunMedium' },
      { label: 'Cisterna da Escola', value: '200 litros de água da chuva prontos para uso', icon: 'Droplets' }
    ],
    synthesizedInformation: 'Informação Gerada: As mudinhas precisam urgente de água, não vai chover nos próximos dias, mas há 200 litros de água armazenados na cisterna.',
    decisionPrompt: 'Qual decisão os pequenos jardineiros devem tomar com base nessa informação?',
    options: [
      {
        id: 'opt1',
        text: 'Organizar um mutirão para regar os canteiros com a água da cisterna antes de ir para casa.',
        isCorrect: true,
        feedback: 'Sensacional! Os alunos usaram a informação do clima e da cisterna para salvar a vida das plantas!'
      },
      {
        id: 'opt2',
        text: 'Esperar a chuva que a previsão disse que não virá.',
        isCorrect: false,
        feedback: 'Incorreto! A informação avisou com clareza que havia zero chance de chuva, logo as plantas secariam.'
      },
      {
        id: 'opt3',
        text: 'Arrancar todas as mudinhas e jogá-las fora no lixo comum.',
        isCorrect: false,
        feedback: 'Não! Havia água disponível na cisterna para regá-las e recuperá-las!'
      }
    ],
    learningTakeaway: 'A informação ambiental nos permite antecipar necessidades dos seres vivos e agir com responsabilidade.'
  },
  {
    id: 'd5',
    title: 'A Bateria Crítica na Aula de Robótica',
    scenario: 'Gabriel e Sofia estão programando um carrinho inteligente na sala de informática quando um ícone piscou na tela.',
    rawFacts: [
      { label: 'Nível da Bateria', value: '9% (Falta pouco para desligar)', icon: 'BatteryLow' },
      { label: 'Tempo Restante da Aula', value: 'Ainda faltam 35 minutos de atividade', icon: 'Clock' },
      { label: 'Bancada de Recarga', value: 'Cabo carregador livre a 1 metro de distância', icon: 'Zap' }
    ],
    synthesizedInformation: 'Informação Gerada: O tablet vai desligar em menos de 5 minutos se não for ligado à tomada, mas ainda faltam 35 minutos de aula e há um cabo ao lado.',
    decisionPrompt: 'Qual é a melhor atitude para não perder o projeto que a dupla estava montando?',
    options: [
      {
        id: 'opt1',
        text: 'Salvar o código imediatamente e conectar o tablet ao carregador da bancada.',
        isCorrect: true,
        feedback: 'Perfeito! Reconhecer os dados de bateria e tempo permitiu salvar o trabalho antes que o aparelho apagasse!'
      },
      {
        id: 'opt2',
        text: 'Aumentar o brilho da tela no máximo e abrir joguinhos pesados para gastar mais rápido.',
        isCorrect: false,
        feedback: 'Isso faria a bateria acabar em segundos e apagaria o trabalho da dupla!'
      },
      {
        id: 'opt3',
        text: 'Continuar digitando sem salvar até a tela ficar preta.',
        isCorrect: false,
        feedback: 'Cuidado! A informação do aviso de 9% serve exatamente para alertar a tempo de salvar e plugar.'
      }
    ],
    learningTakeaway: 'Sistemas digitais fornecem dados em tempo real para que possamos proteger nossos dados e tarefas.'
  },
  {
    id: 'd6',
    title: 'A Organização da Feira de Ciências',
    scenario: 'A diretora precisa acomodar os trabalhos da feira de ciências na quadra coberta para a visitação dos pais.',
    rawFacts: [
      { label: 'Projetos Inscritos', value: '30 maquetes científicas das turmas', icon: 'Bookmark' },
      { label: 'Mesas Disponíveis', value: '10 mesas compridas na quadra', icon: 'LayoutGrid' },
      { label: 'Horário de Visitação', value: 'Das 14h às 17h (3 horas no total)', icon: 'Clock' }
    ],
    synthesizedInformation: 'Informação Gerada: Há 30 projetos para distribuir igualmente em 10 mesas (3 por mesa) durante as 3 horas de feira para acomodar todos confortavelmente.',
    decisionPrompt: 'Como a comissão de alunos deve organizar o espaço da quadra?',
    options: [
      {
        id: 'opt1',
        text: 'Distribuir 3 projetos por mesa com placas identificadas e abrir corredores largos para a circulação dos pais.',
        isCorrect: true,
        feedback: 'Excelente raciocínio! Calculando 30 projetos divididos em 10 mesas, todos têm espaço para brilhar!'
      },
      {
        id: 'opt2',
        text: 'Empilhar todas as 30 maquetes em uma única mesa e deixar as outras 9 mesas vazias.',
        isCorrect: false,
        feedback: 'Isso quebraria as maquetes! Usar a informação dos dados de espaço organiza o evento com justiça e ordem.'
      },
      {
        id: 'opt3',
        text: 'Cancelar a feira porque 30 é um número muito grande.',
        isCorrect: false,
        feedback: 'De forma alguma! A divisão de dados mostra que cabem perfeitamente 3 maquetes por mesa.'
      }
    ],
    learningTakeaway: 'A matemática e a computação transformam contagens em planos organizados de sucesso!'
  },
  {
    id: 'd7',
    title: 'O Alerta Vermelho na Praia de Verão',
    scenario: 'A turminha do 3º ano chegou à orla da praia com a equipe de professores em um dia ensolarado. O posto de guarda-vidas emitiu comunicados visuais.',
    rawFacts: [
      { label: 'Bandeira no Mastro', value: 'Bandeira Vermelha Hasteada no Mar', icon: 'AlertTriangle' },
      { label: 'Aviso dos Salva-vidas', value: 'Correnteza forte e buracos de repuxo', icon: 'Navigation' },
      { label: 'Local Seguro', value: 'Piscininha natural rasa perto dos salva-vidas', icon: 'Trees' }
    ],
    synthesizedInformation: 'Informação Gerada: O mar aberto está muito perigoso hoje com bandeira vermelha e correntezas traiçoeiras, mas a piscina natural rasa e protegida é recomendada para o banho das crianças.',
    decisionPrompt: 'Qual é a decisão inteligente e segura que a turma deve adotar imediatamente?',
    options: [
      {
        id: 'opt1',
        text: 'Brincar apenas na piscina natural rasa com a supervisão dos professores e salva-vidas, sem entrar no mar aberto.',
        isCorrect: true,
        feedback: 'Brilhante! Você interpretou os avisos de segurança e escolheu a diversão com proteção total à vida!'
      },
      {
        id: 'opt2',
        text: 'Ignorar a bandeira vermelha e nadar no fundo do mar sozinho para ver se há peixes grandes.',
        isCorrect: false,
        feedback: 'Extremamente arriscado! A bandeira vermelha é um dado crucial que informa perigo iminente de correntezas.'
      },
      {
        id: 'opt3',
        text: 'Derrubar o mastro da bandeira para que ela não fique balançando com o vento.',
        isCorrect: false,
        feedback: 'Não faça isso! A bandeira é um canal público de comunicação e informação essencial para todos na praia.'
      }
    ],
    learningTakeaway: 'Sinais, bandeiras e alertas são dados vitais que salvam vidas quando interpretados corretamente.'
  },
  {
    id: 'd8',
    title: 'O Campeonato Escolar de Xadrez',
    scenario: 'O professor de matemática precisa organizar a primeira rodada do torneio de xadrez durante o recreio estendido.',
    rawFacts: [
      { label: 'Alunos Inscritos', value: '16 enxadristas inscritos com crachá', icon: 'Users' },
      { label: 'Tabuleiros Disponíveis', value: '8 tabuleiros completos com peças', icon: 'LayoutGrid' },
      { label: 'Relógios de Jogo', value: '8 relógios digitais com 10 minutos cada', icon: 'Clock' }
    ],
    synthesizedInformation: 'Informação Gerada: Como cada partida precisa de 2 enxadristas, 16 jogadores ocuparão exatamente os 8 tabuleiros e os 8 relógios de uma só vez na rodada de abertura.',
    decisionPrompt: 'Qual é o plano de ação perfeito para iniciar o campeonato sem atrasos?',
    options: [
      {
        id: 'opt1',
        text: 'Sortear 8 pares de jogadores (1 contra 1 por tabuleiro) e iniciar todas as 8 partidas simultâneas com relógio.',
        isCorrect: true,
        feedback: 'Mestre da estratégia! Ao cruzar os dados de participantes e equipamentos, você garantiu que 100% dos alunos joguem juntos!'
      },
      {
        id: 'opt2',
        text: 'Colocar os 16 alunos amontoados em um só tabuleiro e guardar os outros 7 tabuleiros no armário.',
        isCorrect: false,
        feedback: 'Isso geraria bagunça e ninguém conseguiria jogar! Os dados indicam capacidade perfeita de 8 jogos paralelos.'
      },
      {
        id: 'opt3',
        text: 'Mandar metade dos alunos embora porque xadrez é muito difícil.',
        isCorrect: false,
        feedback: 'De jeito nenhum! Há tabuleiros suficientes para todos participarem e exercitarem o raciocínio lógico.'
      }
    ],
    learningTakeaway: 'Cruzar dados de pessoas e recursos disponíveis permite criar organizações justas, eficientes e inclusivas.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'O que é um "DADO" no mundo da computação e do nosso dia a dia?',
    options: [
      'Um elemento bruto (número, palavra ou símbolo) isolado e sem contexto explicado.',
      'Uma história completa com começo, meio e fim.',
      'Um desenho animado que passa na televisão aos sábados.',
      'Uma decisão já tomada por um grupo de amigos.'
    ],
    correctIndex: 0,
    explanation: 'Correto! Dados são elementos brutos e soltos (como "32", "azul", "carro"). Sem contexto, não sabemos exatamente o que significam.',
    focusSkill: 'Conceito de Dado Bruto'
  },
  {
    id: 'q2',
    question: 'Qual das opções abaixo é um exemplo de INFORMAÇÃO e NÃO apenas um dado bruto?',
    options: [
      '42',
      'Banana',
      'Hoje a temperatura está em 25°C e o dia está ótimo para passear no jardim.',
      'Azul'
    ],
    correctIndex: 2,
    explanation: 'Muito bem! "25°C no jardim para passear" é uma frase com contexto, unidade e significado completo, ou seja, uma INFORMAÇÃO!',
    focusSkill: 'Diferenciação de Informação'
  },
  {
    id: 'q3',
    question: 'Como os dados brutos se transformam em INFORMAÇÃO?',
    options: [
      'Eles se transformam sozinhos se deixarmos o computador desligado.',
      'Quando são organizados, processados e recebem um contexto com significado.',
      'Pintando todos os números com tinta amarela.',
      'Apagando todas as palavras do caderno.'
    ],
    correctIndex: 1,
    explanation: 'Exato! O processo de organizar, classificar e dar sentido aos dados se chama PROCESSAMENTO, gerando informação!',
    focusSkill: 'Processamento de Dados'
  },
  {
    id: 'q4',
    question: 'Para que serve a INFORMAÇÃO depois que ela é gerada?',
    options: [
      'Para nada, podemos jogar fora.',
      'Apenas para gastar papel e tinta.',
      'Para nos ajudar a entender situações, resolver problemas e tomar decisões inteligentes!',
      'Para esconder as coisas das pessoas.'
    ],
    correctIndex: 2,
    explanation: 'Isso aí! A informação nos dá conhecimento para agir: levar guarda-chuva, escolher o melhor lanche, saber a hora do compromisso, etc.',
    focusSkill: 'Tomada de Decisão com Informação'
  },
  {
    id: 'q5',
    question: 'Se você ver apenas a palavra "CHUVA" escrita num papel solto, isso é:',
    options: [
      'Um dado bruto, porque não sabemos quando, onde nem quanta chuva vai cair.',
      'Uma decisão pronta.',
      'Uma informação completa de previsão meteorológica.',
      'Um computador de última geração.'
    ],
    correctIndex: 0,
    explanation: 'Parabéns! "Chuva" sozinha é só uma palavra/dado solto. Para ser informação precisaria de: "Vai chover em Curitiba às 15h".',
    focusSkill: 'Reconhecimento no Cotidiano'
  },
  // Novas perguntas ampliadas (q6 a q10)
  {
    id: 'q6',
    question: 'Se um boletim escolar mostrar apenas a nota "10" sem matéria ou nome, o que falta para ser uma informação?',
    options: [
      'Falta pintar a folha de papel com tinta roxa.',
      'Falta contexto: saber o nome do aluno, a disciplina e o bimestre avaliado.',
      'Falta trocar o número 10 por uma foto de cachorro.',
      'Não falta nada, o número 10 já é uma informação completa.'
    ],
    correctIndex: 1,
    explanation: 'Exato! O número 10 isolado é apenas um dado. Ele só vira informação quando sabemos: "Lucas tirou nota 10 em Ciências no 2º bimestre"!',
    focusSkill: 'Contexto no Ambiente Escolar'
  },
  {
    id: 'q7',
    question: 'Na metáfora da culinária, qual comparação está TOTALMENTE CORRETA?',
    options: [
      'Os ingredientes crus são os dados, a receita e o forno são o processamento, e o bolo pronto é a informação.',
      'O bolo pronto é o dado bruto e os ovos crus são a informação.',
      'O forno é o dado e os pratos são a inteligência artificial.',
      'Comer o bolo é a única coisa que existe na computação.'
    ],
    correctIndex: 0,
    explanation: 'Genial! Assim como farinha e ovos precisam ser misturados e assados para virar bolo, dados precisam de processamento para virar informação.',
    focusSkill: 'Analogia Construtiva'
  },
  {
    id: 'q8',
    question: 'O que os sensores em celulares e relógios inteligentes (smartwatches) fazem?',
    options: [
      'Eles apenas mostram desenhos animados para crianças.',
      'Coletam dados do mundo real (passos dados, batimentos do coração) para processar e informar a nossa saúde.',
      'Transformam o celular em um brinquedo de corda.',
      'Apagam todos os números do relógio quando corremos.'
    ],
    correctIndex: 1,
    explanation: 'Muito bem! Sensores medem dados contínuos do ambiente e do corpo e os transformam em relatórios informativos úteis!',
    focusSkill: 'Tecnologia & Sensores no Cotidiano'
  },
  {
    id: 'q9',
    question: 'Por que é perigoso tomar decisões importantes usando dados incompletos ou errados?',
    options: [
      'Porque podemos cometer erros, como sair sem casaco na tempestade ou comprar a passagem errada.',
      'Porque o computador explode se faltar um número.',
      'Não há nenhum problema, dados errados dão os mesmos resultados.',
      'Porque a bateria do celular descarrega na hora.'
    ],
    correctIndex: 0,
    explanation: 'Perfeito! Se a informação for gerada com dados falsos ou incompletos, a decisão pode nos prejudicar ou gerar confusão!',
    focusSkill: 'Pensamento Crítico & Confiabilidade'
  },
  {
    id: 'q10',
    question: 'Qual é o papel principal dos computadores e celulares na nossa sociedade?',
    options: [
      'Fazer barulho alto à noite para acordar a casa.',
      'Ajudar os seres humanos a armazenar, organizar e processar grandes volumes de dados rapidamente.',
      'Substituir completamente a imaginação e a amizade entre as pessoas.',
      'Gastar papel e pilhas sem nenhum objetivo.'
    ],
    correctIndex: 1,
    explanation: 'Parabéns! Computadores são máquinas de processamento criadas para nos ajudar a converter dados em conhecimento e soluções!',
    focusSkill: 'Papel Social da Computação'
  },
  {
    id: 'q11',
    question: 'Por que devemos cuidar com muita atenção dos nossos DADOS PESSOAIS (nome completo, endereço e senhas) na internet?',
    options: [
      'Porque são dados privativos sobre nossa vida e só devem ser compartilhados com a orientação dos pais ou professores.',
      'Porque as letras do nosso nome gastam a tinta do computador.',
      'Porque qualquer pessoa na internet pode saber todas as nossas senhas sem perigo algum.',
      'Porque dados pessoais não têm nenhuma importância.'
    ],
    correctIndex: 0,
    explanation: 'Excepcional! Dados pessoais identificam quem somos e onde moramos. Proteger nossos dados é cidadania digital e segurança preventiva para toda a família!',
    focusSkill: 'Cidadania Digital & Privacidade de Dados'
  },
  {
    id: 'q12',
    question: 'Como a coleta de dados de satélites e sensores ajuda a proteger as florestas e a natureza?',
    options: [
      'Não ajuda em nada, tecnologia só serve para assistir a desenhos animados.',
      'Transforma árvores e folhas em folhas de papel de impressora.',
      'Detecta focos de calor, desmatamento e níveis dos rios em tempo real, permitindo que guardas e bombeiros ajam rapidamente!',
      'Apaga os animais dos registros para que fiquem invisíveis.'
    ],
    correctIndex: 2,
    explanation: 'Sensacional! O processamento de dados ecológicos gerados por satélites e sensores permite proteger os animais, as árvores e a água do nosso planeta!',
    focusSkill: 'Computação & Sustentabilidade Ambiental'
  }
];

export const BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-step',
    title: 'Primeiro Passo na Fábrica',
    description: 'Iniciou a jornada e realizou a sua primeira exploração e classificação de dados!',
    icon: 'Rocket',
    category: 'Boas-Vindas',
    missionName: 'Início da Jornada',
    missionTarget: 'sorting',
    colorScheme: 'amber',
    howToUnlock: 'Ganhe sua 1ª estrela em qualquer missão da Fábrica de Dados.',
    pedagogicalSkill: 'Perceber que estamos cercados por dados e iniciar a investigação computacional.',
    unlocked: false
  },
  {
    id: 'badge-sorter',
    title: 'Separador Oficial de Dados',
    description: 'Classificou com maestria dados brutos e informações contextualizadas na esteira!',
    icon: 'Layers',
    category: 'Missão 1',
    missionName: '1. Separador de Cartões',
    missionTarget: 'sorting',
    colorScheme: 'amber',
    howToUnlock: 'Conclua a rodada de triagem de cartões na Missão 1.',
    pedagogicalSkill: 'Diferenciar dados soltos (sem sentido imediato) de informações contextualizadas.',
    unlocked: false
  },
  {
    id: 'badge-machine',
    title: 'Engenheiro de Dados',
    description: 'Alimentou os dados nas gavetas certas da Máquina e gerou informações estruturadas!',
    icon: 'Cpu',
    category: 'Missão 2',
    missionName: '2. A Máquina Processadora',
    missionTarget: 'machine',
    colorScheme: 'indigo',
    howToUnlock: 'Encaixe os dados brutos e acione a Máquina Processadora na Missão 2.',
    pedagogicalSkill: 'Compreender o processamento computacional: transformar entradas em saídas compreensíveis.',
    unlocked: false
  },
  {
    id: 'badge-detective',
    title: 'Detetive de Decisões',
    description: 'Investigou casos reais, analisou pistas e tomou decisões inteligentes e conscientes!',
    icon: 'Search',
    category: 'Missão 3',
    missionName: '3. Detetive Decisor',
    missionTarget: 'detective',
    colorScheme: 'teal',
    howToUnlock: 'Solucione os casos de investigação da Missão 3 tomando a decisão correta.',
    pedagogicalSkill: 'Reconhecer o papel indispensável da informação para orientar ações do cotidiano.',
    unlocked: false
  },
  {
    id: 'badge-creator',
    title: 'Arquiteto da Informação',
    description: 'Criou sua própria síntese autoral de dados e gerou comunicados completos!',
    icon: 'Wand2',
    category: 'Missão 4',
    missionName: '4. Laboratório Criativo',
    missionTarget: 'creator',
    colorScheme: 'fuchsia',
    howToUnlock: 'Preencha dados e gere seu informativo personalizado no Laboratório Criador.',
    pedagogicalSkill: 'Autoria computacional: combinar dados brutos para construir novas mensagens com significado.',
    unlocked: false
  },
  {
    id: 'badge-master',
    title: 'Mestre EF03CO04',
    description: 'Demonstrou proficiência no Grande Quiz da Computação na Educação Básica!',
    icon: 'Award',
    category: 'Missão 5',
    missionName: '5. O Grande Desafio',
    missionTarget: 'quiz',
    colorScheme: 'violet',
    howToUnlock: 'Responda às questões do Grande Quiz formativo da BNCC.',
    pedagogicalSkill: 'Consolidação e avaliação de conceitos de dados, contexto e informação.',
    unlocked: false
  },
  {
    id: 'badge-star-collector',
    title: 'Colecionador de Estrelas',
    description: 'Acumulou 15 ou mais estrelas brilhantes com empenho, dedicação e persistência!',
    icon: 'Star',
    category: 'Dedicação',
    missionName: 'Fábrica Geral',
    missionTarget: 'sorting',
    colorScheme: 'rose',
    howToUnlock: 'Acumule pelo menos 15 estrelas ao longo de suas atividades.',
    pedagogicalSkill: 'Desenvolver persistência e curiosidade na exploração de dados e desafios lógicos.',
    unlocked: false
  },
  {
    id: 'badge-champion',
    title: 'Cientista Mirim Condecorado',
    description: 'Completou todas as 5 missões pedagógicas e está apto a emitir seu Certificado Oficial!',
    icon: 'GraduationCap',
    category: 'Honra Máxima',
    missionName: 'Certificado de Mérito',
    missionTarget: 'certificate',
    colorScheme: 'emerald',
    howToUnlock: 'Conclua as 5 missões e acesse a área do Certificado de Mérito.',
    pedagogicalSkill: 'Domínio articulado da habilidade EF03CO04 com certificação de aprendizagem.',
    unlocked: false
  }
];

export const CREATIVE_THEMES: CreativeTheme[] = [
  {
    id: 'festa',
    title: 'Festa da Turma',
    description: 'Crie o convite ou aviso do grande evento da escola.',
    icon: 'Cake',
    fields: [
      { key: 'evento', label: 'Nome do Evento', placeholder: 'Ex: Festa da Primavera' },
      { key: 'data_hora', label: 'Quando acontecerá?', placeholder: 'Ex: Sexta-feira às 15h' },
      { key: 'local', label: 'Onde será?', placeholder: 'Ex: Pátio das Jabuticabeiras' },
      { key: 'atracao', label: 'Qual a grande atração?', placeholder: 'Ex: Teatro de Fantoches e Picolé' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `A ${vals.evento || '[Evento]'} acontecerá em ${vals.data_hora || '[Data]'} no(a) ${vals.local || '[Local]'}, trazendo ${vals.atracao || '[Atração]'} para todos se divertirem!`,
    impact: 'Com esses dados combinados, todos os alunos e famílias sabem exatamente quando e onde comemorar!'
  },
  {
    id: 'esporte',
    title: 'Boletim do Jogo Interclasse',
    description: 'Relate o resultado da grande disputa esportiva.',
    icon: 'Trophy',
    fields: [
      { key: 'esporte', label: 'Modalidade Esportiva', placeholder: 'Ex: Queimada Maluca' },
      { key: 'campeao', label: 'Time Vencedor', placeholder: 'Ex: Turma do 3º B' },
      { key: 'placar', label: 'Placar Final', placeholder: 'Ex: 12 a 8 pontos' },
      { key: 'destaque', label: 'Jogador ou Lance Destaque', placeholder: 'Ex: Defesa espetacular do Pedro' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `Na disputa de ${vals.esporte || '[Esporte]'}, o time ${vals.campeao || '[Vencedor]'} venceu pelo placar de ${vals.placar || '[Placar]'}, com destaque para ${vals.destaque || '[Destaque]'}!`,
    impact: 'A notícia esportiva comunica o resultado com clareza e celebra o espírito de equipe da escola!'
  },
  {
    id: 'ciencia',
    title: 'Diário de Bordo da Ciência',
    description: 'Registre uma descoberta no laboratório ou horta da escola.',
    icon: 'Sprout',
    fields: [
      { key: 'objeto', label: 'O que foi observado?', placeholder: 'Ex: Broto do feijãozinho' },
      { key: 'medida', label: 'Qual a medição ou tamanho?', placeholder: 'Ex: Cresceu 4 centímetros' },
      { key: 'tempo', label: 'Em quanto tempo?', placeholder: 'Ex: Em apenas 5 dias de sol' },
      { key: 'conclusao', label: 'Qual a conclusão?', placeholder: 'Ex: A luz solar ajudou no crescimento' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `O experimento com o(a) ${vals.objeto || '[Objeto]'} registrou ${vals.medida || '[Medida]'} ao longo de ${vals.tempo || '[Tempo]'}, comprovando que ${vals.conclusao || '[Conclusão]'}!`,
    impact: 'O cientista mirim transforma anotações soltas em uma conclusão científica fundamentada!'
  },
  {
    id: 'robo',
    title: 'Relatório do Robô Assistente',
    description: 'Programação e dados de rotina do robô da biblioteca.',
    icon: 'Bot',
    fields: [
      { key: 'nome_robo', label: 'Nome do Robô', placeholder: 'Ex: Robô Faísca' },
      { key: 'tarefa', label: 'Tarefa Realizada', placeholder: 'Ex: Organizar 40 livros de ciências' },
      { key: 'bateria', label: 'Nível de Bateria', placeholder: 'Ex: 92% de carga' },
      { key: 'aviso', label: 'Mensagem de Alerta', placeholder: 'Ex: Nenhum livro rasgado encontrado' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `O ${vals.nome_robo || '[Robô]'} concluiu a tarefa "${vals.tarefa || '[Tarefa]'}" com ${vals.bateria || '[Bateria]'} restante. Status: ${vals.aviso || '[Status]'}!`,
    impact: 'A equipe da escola sabe que a biblioteca está em ordem e que o robô está pronto para a próxima missão!'
  },
  {
    id: 'jornal',
    title: 'Jornal Mural da Turma',
    description: 'Escreva a manchete principal da semana para o jornal da escola.',
    icon: 'BookOpen',
    fields: [
      { key: 'reporter', label: 'Nome do Repórter Mirim', placeholder: 'Ex: Sofia e Gabriel' },
      { key: 'acontecimento', label: 'Qual foi o grande acontecimento?', placeholder: 'Ex: Criação da Horta Comunitária' },
      { key: 'local', label: 'Em qual espaço da escola?', placeholder: 'Ex: Ao lado do pátio coberto' },
      { key: 'mensagem', label: 'Qual a mensagem para todos?', placeholder: 'Ex: Venham plantar sementinhas na sexta!' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `REPORTAGEM ESPECIAL por ${vals.reporter || '[Repórter]'}: "${vals.acontecimento || '[Acontecimento]'}" empolga a todos no(a) ${vals.local || '[Local]'}. Chamada: ${vals.mensagem || '[Mensagem]'}!`,
    impact: 'A notícia conecta dados do repórter e do evento em uma mensagem inspiradora para toda a escola!'
  },
  {
    id: 'reciclagem',
    title: 'Operação Planeta Limpo',
    description: 'Divulgue os resultados da campanha ecológica de reciclagem.',
    icon: 'Sparkles',
    fields: [
      { key: 'material', label: 'Material Reciclável', placeholder: 'Ex: Tampinhas plásticas e papelão' },
      { key: 'peso', label: 'Quantidade Coletada', placeholder: 'Ex: 48 quilos' },
      { key: 'destino', label: 'Para onde foi doado?', placeholder: 'Ex: Cooperativa de Recicladores da Cidade' },
      { key: 'impacto', label: 'Qual o benefício para a natureza?', placeholder: 'Ex: Menos lixo no rio e ajuda a famílias' }
    ],
    generateSentence: (vals: Record<string, string>) =>
      `CAMPANHA SUSTENTÁVEL: Nossa turma arrecadou ${vals.peso || '[Quantidade]'} de ${vals.material || '[Material]'}, que foram entregues para ${vals.destino || '[Destino]'}, garantindo: ${vals.impacto || '[Impacto]'}!`,
    impact: 'Transformar números de quilos em impacto ambiental motiva toda a comunidade a cuidar do planeta!'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'gl-1',
    term: 'Dado Bruto',
    simpleDefinition: 'É um pedacinho solto (um número, uma palavra, uma cor ou um símbolo) que ainda não foi explicado e não tem história completa.',
    analogy: 'Como uma única pecinha solta de Lego ou um ovo cru na bancada da cozinha: sozinho, você não sabe o que ele vai se tornar.',
    example: 'Exemplos: "32", "Azul", "Cachorro", "14:00".',
    iconName: 'Hash',
    tag: 'fundamento'
  },
  {
    id: 'gl-2',
    term: 'Informação',
    simpleDefinition: 'É o dado depois de ser organizado, explicado e colocado em um contexto claro, ganhando significado e utilidade prática para as pessoas.',
    analogy: 'Como o castelo de Lego montado com todas as peças encaixadas, ou o bolo assado com a receita seguida à risca.',
    example: 'Exemplo: "A temperatura hoje em Curitiba está em 32°C com sol forte e sensação de calor intenso."',
    iconName: 'BookOpen',
    tag: 'fundamento'
  },
  {
    id: 'gl-3',
    term: 'Processamento',
    simpleDefinition: 'É o trabalho de organizar, comparar, calcular e juntar os dados soltos para transformá-los em uma informação que faça sentido.',
    analogy: 'Como a batedeira e o forno da cozinheira, ou a nossa mente pensando para montar um quebra-cabeça.',
    example: 'Exemplo: O computador somar os votos de todos os alunos e mostrar quem foi o representante de turma eleito.',
    iconName: 'Cpu',
    tag: 'processamento'
  },
  {
    id: 'gl-4',
    term: 'Sensor',
    simpleDefinition: 'É um dispositivo eletrônico que funciona como os "olhos", "ouvidos" ou "termômetro" do computador, medindo coisas reais do ambiente.',
    analogy: 'Como a nossa pele sentindo calor ou frio, e nossos olhos vendo a luz do dia.',
    example: 'Exemplo: O sensor de chuva do carro que liga o limpador de para-brisa sozinho quando caem as primeiras gotas.',
    iconName: 'Zap',
    tag: 'processamento'
  },
  {
    id: 'gl-5',
    term: 'Tomada de Decisão',
    simpleDefinition: 'É a escolha ou atitude inteligente que fazemos com base na informação que recebemos.',
    analogy: 'Como um capitão de navio que olha o mapa e o tempo antes de decidir por onde navegar com segurança.',
    example: 'Exemplo: Olhar a previsão de chuva forte (informação) e decidir levar a capa de chuva na mochila antes de sair.',
    iconName: 'Sparkles',
    tag: 'aplicacao'
  },
  {
    id: 'gl-6',
    term: 'Contexto',
    simpleDefinition: 'São os detalhes ao redor do dado (onde, quando, com quem e por quê) que dão sentido verdadeiro àquilo que estamos lendo.',
    analogy: 'Como a moldura e a legenda de um quadro que nos contam o que a pintura representa.',
    example: 'Exemplo: O número "10" pode ser a sua nota em ciências, o número da sua casa ou o tempo de 10 minutos para o recreio.',
    iconName: 'FileQuestion',
    tag: 'fundamento'
  },
  {
    id: 'gl-7',
    term: 'Dado Pessoal & Privacidade',
    simpleDefinition: 'São informações exclusivas sobre nós (nome completo, onde moramos, fotos pessoais e senhas) que devem ser protegidas com segurança.',
    analogy: 'Como a chave da porta da nossa casa: nunca entregamos a estranhos na rua!',
    example: 'Exemplo: Nunca compartilhar endereço ou telefone com desconhecidos em joguinhos da internet.',
    iconName: 'ShieldCheck',
    tag: 'aplicacao'
  },
  {
    id: 'gl-8',
    term: 'Algoritmo / Regra',
    simpleDefinition: 'É a sequência passo a passo de instruções bem explicadas que ensina ao computador como processar os dados da forma correta.',
    analogy: 'Como o passo a passo de uma receita de bolo ou o manual de montagem de um brinquedo.',
    example: 'Exemplo: "Se o solo estiver seco (menos de 20% de água), ligar a torneira por 3 minutos".',
    iconName: 'Layers',
    tag: 'processamento'
  }
];

export const TEACHER_GUIDE_CONTENT = {
  skillCode: 'EF03CO04',
  skillName: 'Relacionar o conceito de informação com o de dados',
  grade: '3º ano do Ensino Fundamental - Anos Iniciais',
  area: 'Computação na Educação Básica (Complemento à BNCC)',
  thematicAxis: 'Mundo Digital / Pensamento Computacional',
  pedagogicalSummary: `A habilidade EF03CO04 busca introduzir aos estudantes a distinção fundacional entre DADOS (elementos brutos, quantitativos ou qualitativos desprovidos de contextualização direta) e INFORMAÇÃO (o resultado da organização, filtragem e interpretação desses dados em um contexto específico que produz sentido e conhecimento acionável). O app ampliado e revisado oferece 32 cartões no classificador temático, 10 desafios completos na máquina de processamento, 8 casos de investigação com tomada de decisão no detetive, 6 temas no laboratório criativo autoral, 12 perguntas formativas no quiz e um Glossário Ilustrado com os 8 conceitos fundamentais.`,
  learningGoals: [
    'Reconhecer que palavras soltas, símbolos e números isolados constituem dados brutos.',
    'Compreender que o processamento consiste em ordenar, categorizar e contextualizar dados.',
    'Identificar informações em situações do cotidiano escolar, familiar e comunitário.',
    'Perceber o papel da informação na resolução de problemas e tomada de decisões conscientes.',
    'Construir ativamente relações autorais entre dados e informativos com significado prático.'
  ],
  unpluggedActivities: [
    {
      title: 'A Caixa Misteriosa dos Dados',
      description: 'O professor coloca tiras de papel com números e palavras soltas (ex.: "27", "azul", "pipoca", "terça-feira"). Os alunos sorteiam tiras e tentam adivinhar o que significam. Em seguida, o professor revela o contexto ("Hoje às 15h, 27 alunos da turma comeram pipoca!") e debate como a informação nasceu da junção dos dados.'
    },
    {
      title: 'O Repórter Mirim da Turma',
      description: 'As crianças coletam dados reais da turma (ex: cor favorita, fruta preferida, quantidade de irmãos) e montam um cartaz coletivo onde os dados viram gráficos e textos informativos para a sala.'
    },
    {
      title: 'O Semáforo dos Dados',
      description: 'Cartões vermelhos (dado bruto) e cartões verdes (informação contextualizada). O professor lê uma frase e os alunos levantam a cor correspondente, justificando sua resposta oralmente.'
    },
    {
      title: 'O Engenheiro de Dados Desplugado',
      description: 'Em grupos, cada equipe recebe 4 fichas com dados (quem, o que, onde e quando) e uma placa com lacunas para preencher e criar a "manchete do dia" da escola.'
    }
  ],
  assessmentRubric: [
    {
      level: 'Em Construção',
      criteria: 'Apresenta dificuldade para distinguir entre uma palavra/número isolado e uma sentença contextualizada.'
    },
    {
      level: 'Básico',
      criteria: 'Identifica que números e palavras soltas são dados, mas ainda necessita de mediação para explicar o papel do contexto.'
    },
    {
      level: 'Proficiente (Alvo BNCC)',
      criteria: 'Diferencia com clareza dados de informações, explica como o processamento gera sentido e reconhece seu uso para tomada de decisões com autonomia.'
    },
    {
      level: 'Avançado',
      criteria: 'Articula como sistemas computacionais capturam dados do ambiente (sensores, registros) e produz seus próprios enunciados informativos aplicados à realidade.'
    }
  ]
};
