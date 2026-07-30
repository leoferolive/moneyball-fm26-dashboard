import { describe, expect, it } from 'vitest'
import { derivePlayer } from '@/engine/derive.ts'
import type { RawPlayer } from '@/types/player.ts'
import { armadoresConfig } from '../armadores.ts'

const RAW_COLUMNS = [
  'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
  'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
  'Golos', 'Assist.', 'OCG', 'Poss Perd/90', 'xG', 'xA',
  'Faltas Cometidas', 'Faltas Contra', 'Pas A', 'Ps C', 'Passes Ch',
  'PeP', 'Fnt', 'Remates', 'Rem %', 'Press. tent.', 'Press. conc.',
  'CT-JA', 'CC-JA', 'Cr T', 'Cr C', 'Golos marcados de fora da área',
  'Remates de fora da área em cada 90 minutes', 'Remates em livres',
  'Pens', 'Pens M', 'Sprints/90', 'Distância', 'Classificação',
]

const DERIVED_LABELS = [
  'Altura', 'Jogos completos', 'Jogos Totais', 'Minutos por partida',
  'Jogos como Titular', 'Gols', 'Assist', 'Gols + Ass',
  'Man of the match', 'Minutos pra ser o homem do jogo',
  '% de vezes que foi eleito o Homem do Jogo',
  'Tentativas de  Criar  uma chance em Bola Parada', 'Tentativas/90',
  'Chances Criadas em  Bolas Paradas', 'Chances C /90',
  '% Aproveitamento das Tentativas de Criar chance em  BP',
  'Cobranças de falta (Diretas)', 'Pênaltis batidos', 'Pênaltis marcados',
  'Pênaltis perdidos', '% Conversão de pênalti', 'Gols', 'Assistências',
  'Gols + Ass', 'Gols sem pênalti', 'Gols de fora da área', 'Gols/90',
  'Ast/90', 'Gols+ Assist / 90', 'Fintas', 'Fintas /90', 'xG',
  'xG sem pênaltis', 'non Pen xG /90', 'Assistências Esperadas xA',
  'xA /90', 'xG + xA', 'xG + xA /90', 'xA Conclusion', 'xG Conclusion',
  'Cruzamentos Tentados', 'Cruzamentos com sucesso', '% Cruzamentos certos',
  'Passes tentados', 'Passes completados', 'Passes Tentados / 90',
  'Passes Completados / 90', 'Média de passes errados / 90',
  '% passes certos', 'Passes errados', '%Passes errados',
  'Passes Decisivos (Total)', 'Passes Decisivos /90',
  'Passes Decisivos pra uma assistência',
  'Pass Decisivos que se converteram em assistências',
  'Assistências Claras que a Equipe desperdiçou', 'xA / Passe Decisivo',
  'Minutos pra fazer um Passe Decisivo',
  'Minutos pra criar uma chance perigosa', 'Gols não esperados',
  'nPen xG (xG=0,79)', 'Finalizações', 'Finalizações /90',
  'Finalizações no gol/90', '% Finalizações que foram no gol',
  'Finalizações pra um gol', 'Finalizações certas pra um gol',
  'Finalizações que se converteram em gols', 'Gols dentro da área',
  'Gols de fora da área', 'Gols de pênalti',
  'Conversão dos chutes de fora da  área', 'Faltas sofridas',
  'Faltas Sof / jogo', 'Ações com Bola Tentadas', 'Ações com Bola T/90',
  'Ações com Bola (Completadas)', 'Ações com Bola Comp /90',
  '% Sucesso de ações com bola', 'Ações que geraram finalizações ao gol',
  'Ações que geraram finalizações ao gol /90', 'Chances de perigo criadas',
  'Chances de perigo criadas /90',
  'Participação do jogador a cada 90 minutos (fnt, cabs, pass, finalizaçõs)',
  'Participação em passes / 90', 'Passes em construção de jogada ofensiva',
  'Passes em construção de jog OF /90',
  'Ações no último terço (Fintas, chances criadas, remates)',
  'Ações no último terço / 90', 'Tentativas de marcar um gol',
  'Tentativas de marcar um gol / 90', 'Posse Desperdiçada',
  'Posse Desperdiçada /90', 'Posse perdida /90',
  'Distância percorrida (Total)', 'Dist / 90',
  'Sprints de alta intensidade', 'Sprints/90', 'Nota média',
]

const brunoGomesRaw: RawPlayer = {
  Inf: '',
  Nação: 'BRA',
  Jogador: 'Bruno Gomes',
  Idade: '25',
  Clube: 'Internacional',
  Altura: '175 cm',
  'Pé Preferido': 'Pé Direito',
  'Valor Estimado': '650m € - 8M €',
  Salário: '26,5m € p/m',
  Expira: '2027-12-31T00:00:00',
  Minutos: '3015',
  Presenças: '36 (3)',
  HdJ: '0',
  Golos: '2',
  'Assist.': '6',
  OCG: '17',
  'Poss Perd/90': '13.8',
  xG: '1.65',
  xA: '5.74',
  'Faltas Cometidas': '56',
  'Faltas Contra': '25',
  'Pas A': '1687',
  'Ps C': '1510',
  'Passes Ch': '62',
  PeP: '183',
  Fnt: '81',
  Remates: '22',
  'Rem %': '9',
  'Press. tent.': '293',
  'Press. conc.': '77',
  'CT-JA': '188',
  'CC-JA': '36',
  'Cr T': '188',
  'Cr C': '36',
  'Golos marcados de fora da área': '1',
  'Remates de fora da área em cada 90 minutes': '0.4',
  'Remates em livres': '1',
  Pens: '0',
  'Pens M': '0',
  'Sprints/90': '23',
  Distância: '420,3 km',
  Classificação: '6.92',
}

// Valores cacheados da linha 2 da aba. Percentuais foram convertidos da
// fração armazenada pelo Excel para a convenção 0–100 usada pelo site.
const brunoGomesExpected: Record<string, number> = {
  altura: 1.75,
  jogosCompletos: 33.5,
  jogosTotais: 39,
  minPartida: 77.3076923076923,
  jogosComoTitular: 92,
  gols: 2,
  assist: 6,
  golsAst: 8,
  hdj: 0,
  minHdj: 5000,
  pctHdj: 0,
  tentsBP: 0,
  tentsBP90: 0,
  chancesBP: 0,
  chancesBP90: 0,
  pctBP: 0,
  cobrancasFalta: 1,
  pensBatidos: 0,
  pensMarcados: 0,
  pensPerdidos: 0,
  pctPen: 0.00001,
  golsAtaque: 2,
  assistAtaque: 6,
  golsAstAtaque: 8,
  golsSemPen: 2,
  golsForaArea: 1,
  gols90: 0.05970149253731343,
  ast90: 0.1791044776119403,
  golsAst90: 0.23880597014925373,
  fintas: 81,
  fintas90: 2.417910447761194,
  xG: 1.65,
  npxG: 1.65,
  npxG90: 0.04925373134328358,
  xA: 5.74,
  xA90: 0.17134328358208956,
  xAxG: 7.390000000000001,
  xAxG90: 0.22059701492537315,
  xAConclusion: 48.89267461669506,
  xGConclusion: 54.794520547945204,
  cruzT: 188,
  cruzC: 36,
  pctCruz: 19.148936170212767,
  passesT: 1687,
  passesC: 1510,
  passesT90: 50.35820895522388,
  passesC90: 45.07462686567164,
  passesErr90: 5.28358208955224,
  pctPassesCertos: 89.50800237107292,
  passesErr: 177,
  pctPassesErr: 10.491997628927086,
  passD: 62,
  passD90: 1.8507462686567164,
  passDecParaAst: 10.333333333333334,
  pctPassDecAst: 9.67741935483871,
  astDespEquipe: -0.2599999999999998,
  xAPerPassD: 0.09258064516129033,
  minParaPassD: 48.62903225806452,
  minParaChancePerigo: 34.26136363636363,
  golsNaoEsperados: 0.3500000000000001,
  npxGClean: 0.3500000000000001,
  finalizacoes: 22,
  fin90: 0.6567164179104478,
  finNoGol90: 0.26865671641791045,
  pctFinNoGol: 40.909090909090914,
  finParaGol: 11,
  finCertasParaGol: 4.5,
  pctConversao: 9.090909090909092,
  golsDentroArea: 1,
  golsForaAreaAtaque: 1,
  golsPen: 0,
  conversaoForaArea: 7.462686567164178,
  faltasSofridas: 13.8,
  faltasSof90: 0.4119402985074627,
  acoesBolaTent: 353,
  acoesBolaTent90: 10.537313432835822,
  acoesBolaSucess: 188,
  acoesBolaSucess90: 5.611940298507463,
  pctSucessoAcoes: 53.25779036827195,
  acoesFinalizacao: 134.74,
  acoesFinalizacao90: 4.022089552238806,
  chancesPerigo: 135.74,
  chancesPerigo90: 4.051940298507463,
  participacao90: 65.73134328358209,
  participacaoPasses90: 52.8955223880597,
  passesJogadaOf: 245,
  passesJogadaOf90: 7.313432835820896,
  acoesUltimoTerco: 553,
  ultimoTerco90: 16.507462686567163,
  tentativasGol: 101,
  tentativasGol90: 3.014925373134328,
  possDesp: 342,
  possDesp90: 10.208955223880597,
  possPerd90: 13.8,
  distancia: 420.3,
  dist90: 12.546268656716418,
  sprintsAltaIntensidade: 770.5,
  sprints90: 23,
  notaMedia: 6.92,
}

describe('configuração da aba ⚙️Armadores', () => {
  it('preserva exatamente os 42 cabeçalhos brutos do FM26', () => {
    expect(armadoresConfig.rawColumns).toEqual(RAW_COLUMNS)
  })

  it('expõe todas as 99 colunas numéricas de linha com os títulos da planilha', () => {
    expect(armadoresConfig.metrics.map((item) => item.label)).toEqual(DERIVED_LABELS)
    expect(armadoresConfig.metrics.map((item) => item.key)).toEqual(
      Object.keys(brunoGomesExpected),
    )
  })

  it('reproduz todas as fórmulas cacheadas da linha Bruno Gomes', () => {
    const player = derivePlayer(brunoGomesRaw, armadoresConfig)
    expect(player).not.toBeNull()

    for (const [key, expected] of Object.entries(brunoGomesExpected)) {
      expect(Number(player?.[key]), key).toBeCloseTo(expected, 10)
    }
  })

  it('interpreta Presenças e replica os fallbacks explícitos do Excel', () => {
    const player = derivePlayer({
      ...brunoGomesRaw,
      Minutos: '2790',
      Presenças: '31',
      HdJ: '0',
      Pens: '0',
      'Pens M': '0',
      'Passes Ch': '0',
      'Assist.': '0',
      Golos: '0',
      Remates: '0',
      'Rem %': '0',
    }, armadoresConfig)

    expect(player).toMatchObject({
      jogosCompletos: 31,
      jogosTotais: 31,
      minPartida: 90,
      jogosComoTitular: 100,
      minHdj: 5000,
      pctPen: 0.00001,
      passDecParaAst: 25,
      finParaGol: 50,
      finCertasParaGol: 50,
    })
  })

  it('usa CT-JA/CC-JA nos cruzamentos e Cr T/Cr C apenas no saldo de bola parada', () => {
    const player = derivePlayer({
      ...brunoGomesRaw,
      'CT-JA': '8',
      'CC-JA': '3',
      'Cr T': '13',
      'Cr C': '5',
    }, armadoresConfig)

    expect(player).toMatchObject({
      cruzT: 8,
      cruzC: 3,
      pctCruz: 37.5,
      tentsBP: 5,
      chancesBP: 2,
      pctBP: 40,
    })
  })

  it('mantém a assimetria da aba entre pênaltis batidos e marcados', () => {
    const player = derivePlayer({
      ...brunoGomesRaw,
      Golos: '4',
      xG: '3',
      Remates: '10',
      'Rem %': '6',
      Pens: '2',
      'Pens M': '1',
      'Golos marcados de fora da área': '1',
    }, armadoresConfig)

    expect(player).toMatchObject({
      golsSemPen: 3,
      npxG: 1.42,
      finalizacoes: 8,
      pctFinNoGol: 62.5,
      finParaGol: 8 / 3,
      pctConversao: 37.5,
      golsDentroArea: 1,
      golsPen: 2,
    })
    expect(Number(player?.npxGClean)).toBeCloseTo(0.21, 10)
  })
})
