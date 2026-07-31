// GERADO AUTOMATICAMENTE — não editar à mão.
// Fonte: Moneyball FM26.xlsm, regras de conditionalFormatting extraídas via
// scripts_scratch_extract.py + scripts_scratch_generate.ts. Cada posição
// mapeia metric.key -> a formatação condicional real daquela coluna na
// planilha (colorScale/dataBar/iconSet), quando existir e quando o label da
// métrica foi identificado com confiança no cabeçalho correspondente do
// Excel (ver scripts_scratch_aliases.json para os casos parafraseados).
import type { PositionKey } from '@/types/position.ts'

export interface ExcelColorScale {
  colors: string[]
}

export interface ExcelDataBar {
  color: string
}

export interface ExcelIconSet {
  variant: string
  bands: number
}

export interface ExcelConditionalFormat {
  colorScale?: ExcelColorScale
  dataBar?: ExcelDataBar
  iconSet?: ExcelIconSet
}

export const EXCEL_CONDITIONAL_FORMATS: Record<PositionKey, Record<string, ExcelConditionalFormat>> = {
  "goleiros": {
    "jogos_completos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "man_of_the_match": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "min_p_hdj": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pct_hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "passes_tentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passes_completados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passes_c_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passes_errados": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "passes_certos_menos_errados": {
      "colorScale": {
        "colors": [
          "#C00000",
          "#FFEB84",
          "#A9D18E"
        ]
      }
    },
    "pct_passes_errados": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pct_passes_certos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passes_curtos": {
      "colorScale": {
        "colors": [
          "#C9E9D1",
          "#63BE7B"
        ]
      }
    },
    "passes_curtos_90": {
      "colorScale": {
        "colors": [
          "#C9E9D1",
          "#63BE7B"
        ]
      }
    },
    "passes_progressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#C9E9D1",
          "#00B0F0"
        ]
      }
    },
    "pass_prog_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#C9E9D1",
          "#00B0F0"
        ]
      }
    },
    "pct_passes_progressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#C9E9D1",
          "#00B0F0"
        ]
      }
    },
    "posse_perdida_total": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "posse_perdida_90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "passes_decisivos": {
      "colorScale": {
        "colors": [
          "#FFF2CC",
          "#C9E9D1",
          "#63BE7B"
        ]
      }
    },
    "pass_d_90": {
      "colorScale": {
        "colors": [
          "#FFF2CC",
          "#C9E9D1",
          "#63BE7B"
        ]
      }
    },
    "defesas_seguras": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "defesas_seguras_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pct_def_seguras": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "defesas_ponta_dedos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "def_ponta_dedos_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pct_def_ponta_dedos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "defesas_desviadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "defesas_desviadas_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pct_def_desviadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pct_jogos_clean_sheet": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "clean_sheets": {
      "colorScale": {
        "colors": [
          "#FFF2CC",
          "#F8CBAD",
          "#C65911"
        ]
      }
    },
    "clean_sheets_90": {
      "colorScale": {
        "colors": [
          "#FFF2CC",
          "#F8CBAD",
          "#C65911"
        ]
      }
    },
    "defesas_totais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "defesas_totais_jogo": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolas_enfrentadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#B4C7E7",
          "#2E75B6"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolas_enf_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "proporcao_def_vs_chutes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pct_def_dificeis": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chances_sofrer_gol_90": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "indice_defesas_criticas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "min_p_sofrer_gol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolas_enf_p_sofrer_gol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "bolas_dificeis_enf_p_sofrer_gol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "xg_defendidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xg_def_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xg_def_sem_pen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xg_def_sem_pen_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xpg_ratio": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xgp": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "penaltis_enfrentados": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#EC7524"
        ]
      }
    },
    "pen_enf_90": {
      "dataBar": {
        "color": "#C55A11"
      }
    },
    "penaltis_defendidos": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#EC7524"
        ]
      }
    },
    "pen_def_90": {
      "dataBar": {
        "color": "#EC7524"
      }
    },
    "pct_penaltis_def": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFF2CC",
          "#EC7524"
        ]
      }
    },
    "golos_sofridos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "sofridos_jogo": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "tentativas_saida_gol": {
      "colorScale": {
        "colors": [
          "#DAE3F3",
          "#B4C7E7",
          "#5A8AC6"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "tentativas_saida_90": {
      "colorScale": {
        "colors": [
          "#DAE3F3",
          "#B4C7E7",
          "#5A8AC6"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "saidas_sucesso": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "saidas_sucesso_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "saidas_falhas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "saidas_falhas_90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "pct_saidas_sucesso": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "posse_ganha_total": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "posse_ganha_90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "falhas": {
      "dataBar": {
        "color": "#A20000"
      }
    },
    "falhas_90": {
      "dataBar": {
        "color": "#A20000"
      }
    },
    "cartoes_amarelos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#FFAFAF",
          "#F8696B"
        ]
      }
    },
    "cartoes_vermelhos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "total_cartoes": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#FFAFAF",
          "#F8696B"
        ]
      }
    },
    "faltas_sofridas": {
      "colorScale": {
        "colors": [
          "#DAE3F3",
          "#BDD7EE",
          "#5799D5"
        ]
      }
    },
    "faltas_cometidas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "acoes_tentadas": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "acoes_com_sucesso": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "pct_acerto_goleiro": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "nota_media": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctGolosSofridosComparado": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "somaBolasEnfrentadas": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEF9C"
        ]
      }
    }
  },
  "zagueiros": {
    "altura": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosComoTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "gols90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "ga90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#EDEDED",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "xG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "xaNpxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "xaNpxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "minPorHdJ": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdJ": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pensBatidos": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensMarcados": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensPerdidos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctConversaoPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "errosGol": {
      "dataBar": {
        "color": "#9A0000"
      }
    },
    "erros90": {
      "dataBar": {
        "color": "#9A0000"
      }
    },
    "cabsTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctCabsGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsPerdidos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "cabsPerdidos90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctCabsPerdidos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "cabsEvitaramJogada": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabDec90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctCabsOfensivos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "cabsOfensivosTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsOfensivosT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsOfensivosNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsOfensivosNoGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCabsDirecaoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xgPorRemateCab": {
      "dataBar": {
        "color": "#00759E"
      }
    },
    "xgSemPenaltiRecalculado": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "golsNaoEsperados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "golsNaoEsperadosSemPenalti": {
      "colorScale": {
        "colors": [
          "#FBA3A5",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "interceptacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "interceptacoes90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "rematesBloqueados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "remBloq90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "interceptacoesBloqueios90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "alivios": {
      "colorScale": {
        "colors": [
          "#FFFFFF",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "alivios90": {
      "colorScale": {
        "colors": [
          "#FFFFFF",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "desarmesTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesSofridos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesSof90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctDesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesDecisivos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressaoT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pressaoT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pressaoG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pressaoG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "pctPressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesCurtos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "passesCurtosCertos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      }
    },
    "passesProgressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      }
    },
    "passProg90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      }
    },
    "pctPassesProgressao": {
      "dataBar": {
        "color": "#0D97FF"
      }
    },
    "passesErrados": {
      "dataBar": {
        "color": "#9A0000"
      }
    },
    "passErr90": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "pctPassesErrados": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "passesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xaPorPasseDecisivo": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "tentativasCriacao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasCriacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasCabsDesPressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasCabsDesPressao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acertosCabsDesPressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acertosCabsDesPressao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosCabsDesPressao": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "taxaAcerto": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInterceptadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInt90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRoubadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRob90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadas": {
      "dataBar": {
        "color": "#348850"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadas90": {
      "dataBar": {
        "color": "#348850"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadasGanhas": {
      "dataBar": {
        "color": "#348850"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadasGanhas90": {
      "dataBar": {
        "color": "#348850"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctBolasDisputadasGanhas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadasPerdidas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "bolasDisputadasPerdidas90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "faltas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "faltas90": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "pctDisputasPerdidas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "cartoesAmarelos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "cartoesVermelhos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "totalCartoes": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "cartoes90": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "pctFaltasComCartao": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "lancesDefTentados": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "lancesDefT90": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "lancesDefConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDefC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosDefensivos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "errosDefensivos90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "eficaciaDefensiva": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#DEEBF7",
          "#9DC3E6",
          "#19C3FF"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#DEEBF7",
          "#9DC3E6",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "sprints90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fintas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fintas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "posseDesperdicada": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "posseDesperdicada90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "possePerdida": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "possePerdida90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "laterais": {
    "altura": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctJogosTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "ga90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdJ": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xaNpxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xaNpxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "pensBatidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensMarcados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensPerdidos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "pctConversaoPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desarmesTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desarmesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "driblesSofridos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "driblesSof90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctDesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "faltasCometidas": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "faltas90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDisputados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDisputados90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesGanhosSemFalta": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesGanhosSemFalta90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctLancesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesTentados": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesT90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesErrados": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#F8696B"
        ]
      }
    },
    "passErr90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "umPasseErradoCada": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "passesCurtos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesCurtos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesProgressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#EDEDED",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passProg90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctPassesProgressao": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "cruzTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCruzamentos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFE699",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "passesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9DC3E6",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#BDD7EE",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "minPorChancePerigo": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minPorPasseDecisivo": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "assistenciasEsperadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "assistDesperdicadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chancesCriadas": {
      "dataBar": {
        "color": "#399357"
      }
    },
    "chances90": {
      "dataBar": {
        "color": "#399357"
      }
    },
    "fintas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fintas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesDecisivos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosGol": {
      "dataBar": {
        "color": "#9A0000"
      }
    },
    "erros90": {
      "dataBar": {
        "color": "#9A0000"
      }
    },
    "participacoes": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "participacoes90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabsTentados": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "cabsT90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsGanhos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "cabsG90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCabsGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabDec90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "bolasRoubadas": {
      "dataBar": {
        "color": "#399357"
      }
    },
    "bolasRob90": {
      "dataBar": {
        "color": "#399357"
      }
    },
    "movOfTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "movOfConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "movOf90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctMovOfSucesso": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDefTentados": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "lancesDefT90": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "lancesDefConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDefC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosDefensivos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "errosDefensivos90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "eficaciaDefensiva": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "sucessoOverall": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      }
    },
    "sprintsTotal": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "sprints90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "posseDesperdicada": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "posseDesperdicada90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "volantes": {
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctJogosTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "pensBatidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensMarcados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensPerdidos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "pctPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "amarelos": {
      "colorScale": {
        "colors": [
          "#FFF2CC",
          "#FFFF00",
          "#F8696B"
        ]
      }
    },
    "vermelhos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "totalCartoes": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "faltasComet": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "faltas90": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "faltasSemCartao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cartoesPorFalta": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "pctFaltasSemCartao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressaoT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "pressaoT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "pressaoG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "pressaoG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "pctPressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisputadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasDisp90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasGanhas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasGanhas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctBolasGanhas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesS": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesS90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctDes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desDecisivos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsEvitaramJogada": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsEvitaramJogada90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsDisp": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCabs": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "passesT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesC": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesErr": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesErr90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "saldoPasses90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesCurtos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "passesCurtos90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "passesProgr": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesProgr90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctProgr": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAPerPassD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "criacao": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "criacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "intRec": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "intRec90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInt": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInt90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRoubadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bRob90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possGanha90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDefT": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "lancesDefT90": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "lancesDefC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDefC90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosDef": {
      "dataBar": {
        "color": "#9A0000"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "errosDef90": {
      "dataBar": {
        "color": "#9A0000"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "eficaciaDef": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#FF5757",
          "#9DC3E6",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "velMedia": {
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possDesp": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "possDesp90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "somaTodosDesarmes": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEF9C"
        ]
      }
    },
    "pctDesEmRelacaoMedia": {
      "dataBar": {
        "color": "#399357"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    }
  },
  "b2b": {
    "altura": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "jogosComoTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pensBatidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensMarcados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pensPerdidos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctPen": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "bolasRecuperadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRec90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finalizacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "fin90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "finNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "finNoGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctFinCertas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "txConversao": {
      "dataBar": {
        "color": "#00589A"
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxGSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "minHdj": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "interceptacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "int90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "driblesS": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesS90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctDes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "faltasComet": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "faltas90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "desDec": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desDec90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pressaoT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressaoT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressaoG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressaoG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctPressao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "amarelos": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "vermelhos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "totalCartoes": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "faltasSemCartao": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "cartoesPorFalta": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "lancesDisputados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesLimpos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctLancesLimpos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctFaltasLimpas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cruzT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCruz": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "dataBar": {
        "color": "#B0C5E2"
      }
    },
    "passesT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesErr": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "passesCurtosErr": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsDisp": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsDisp90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "cabsG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctCabs": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passDecParaAst": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passDecConvertidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "assistClarasDesperdicadas": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "xAPerPassD": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "bolasInt": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInt90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRoubadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bRob90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "participacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctAcerto": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "chancesCriadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chances90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesUltimoTerco": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "ultimoTerco90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possDesp": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possDesp90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "armadores": {
    "altura": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "jogosComoTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "minHdj": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "tentsBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "tentsBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pctBP": {
      "dataBar": {
        "color": "#007A37"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cobrancasFalta": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensBatidos": {
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "pensMarcados": {
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "pensPerdidos": {
      "dataBar": {
        "color": "#9E0000"
      }
    },
    "pctPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAtaque": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "assistAtaque": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "golsAstAtaque": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "golsSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "golsForaArea": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "gols90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "ast90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAst90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "fintas": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "fintas90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAConclusion": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#00B0F0"
      }
    },
    "xGConclusion": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#00B0F0"
      }
    },
    "cruzT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCruz": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesErr90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesErr": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctPassesErr": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "passD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passDecParaAst": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctPassDecAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "astDespEquipe": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "xAPerPassD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "minParaPassD": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "4Arrows",
        "bands": 4
      }
    },
    "minParaChancePerigo": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "golsNaoEsperados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "npxGClean": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finalizacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "fin90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "finNoGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctFinNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "finParaGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "finCertasParaGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctConversao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsDentroArea": {
      "dataBar": {
        "color": "#2F5281"
      }
    },
    "golsForaAreaAtaque": {
      "dataBar": {
        "color": "#2F5281"
      }
    },
    "golsPen": {
      "dataBar": {
        "color": "#2F5281"
      }
    },
    "conversaoForaArea": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "faltasSofridas": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "faltasSof90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "acoesBolaTent": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaTent90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaSucess": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaSucess90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctSucessoAcoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "acoesFinalizacao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "4Arrows",
        "bands": 4
      }
    },
    "acoesFinalizacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chancesPerigo": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chancesPerigo90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "participacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "participacaoPasses90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesJogadaOf": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passesJogadaOf90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesUltimoTerco": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "ultimoTerco90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possDesp": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possDesp90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DAE3F3",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#8FAADC",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "sprintsAltaIntensidade": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "sprints90": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "avancados": {
    "altura": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "jogosComoTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "golsCarreira": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "mediaGolsCarreira": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "mediaGolsPart": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "mediaGolsAstPart": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "ast90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "minHdj": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsDentroArea": {
      "dataBar": {
        "color": "#305484"
      }
    },
    "golsForaArea": {
      "dataBar": {
        "color": "#305484"
      }
    },
    "golsPen": {
      "dataBar": {
        "color": "#305484"
      }
    },
    "golsSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctGolsSemPen": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "pctAst": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "pctPenGols": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "gols90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "assist90Ataque": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsAst90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsSemPen90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "golsDentroAreaResumo": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "golsDentroArea90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "golsForaAreaResumo": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "golsForaArea90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "chutesForaArea90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "pctConclusaoForaArea": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3TrafficLights1",
        "bands": 3
      }
    },
    "tentsBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "tentsBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pctBP": {
      "dataBar": {
        "color": "#007A37"
      }
    },
    "cobrancasFalta": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensBatidos": {
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "pensMarcados": {
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "pensPerdidos": {
      "dataBar": {
        "color": "#D6007B"
      }
    },
    "golsPen90": {
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "pctPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cabsDisp": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsDisp90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "pctCabs": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctCabsPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "impedimentos": {
      "dataBar": {
        "color": "#AD1457"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "impedimentos90": {
      "dataBar": {
        "color": "#AD1457"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finalizacoes": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fin90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finNoGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctFinNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finParaGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finCertasParaGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finOuCabParaGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctConversaoFin": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "gpi": {
      "colorScale": {
        "colors": [
          "#FF5D74",
          "#A3D9FB",
          "#61BFF9"
        ]
      },
      "dataBar": {
        "color": "#61BFF9"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xGPerJogo": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsConvertidos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "overUnderXG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xGPerChute": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "minParaFinalizar": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minParaAcertar": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minParaMarcar": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minParaParticipar": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "golsNaoEsperados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFE699",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsNaoEspSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFE699",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxGSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xAxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xGConclusion": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#00B0F0"
      }
    },
    "passD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xAResult": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "chancesDespEquipe": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "cruzT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCruz": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "fintas": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "fintas90": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "velMedia": {
      "dataBar": {
        "color": "#2E75B6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desPresT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desPresT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desPresC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "desPresC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctDesPresConcl": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "interceptacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "int90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "faltasSofridas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "faltasSof90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#D9E1F2",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#D9E1F2",
          "#00B0F0"
        ]
      }
    },
    "sprints": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "sprints90": {
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "lancesOfT": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      }
    },
    "lancesOf90": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      }
    },
    "lancesOfC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesOfC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "eficaciaOf": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesFinalizacao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "4Arrows",
        "bands": 4
      }
    },
    "acoesFinalizacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "participacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "acoesBolaTent": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#BDD7EE",
          "#2E75B6"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaTent90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaSucess": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesBolaSucess90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctSucessoAcoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesUltimoTerco": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "ultimoTerco90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "tentativasGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "possDesp": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possDesp90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possPerd90Resumo": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "time": {
    "minutosJogados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      }
    },
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      }
    },
    "altura": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesErrados90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "dataBar": {
        "color": "#FF555A"
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "passesTentados": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "passesErrados": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctPassesErrados": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possePerdida": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "possePerdida90": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "falhas": {
      "dataBar": {
        "color": "#A40000"
      }
    },
    "falhas90": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "acoesBola": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "acoesBola90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "gols90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      }
    },
    "golsAst90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "fintas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "fintas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "acoesFinalizacao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "acoesFin90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xgSemPen": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "npxg90": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "finalizacoes": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "fin90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "finCertas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctFinCertas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "conversaoGols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cruzamentos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cruzConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctCruzamentos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "xAxgSemPen": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "xAxg90": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#DDEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "assistencias": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "ast90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "passesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabsDisputados": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabsDisp90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabsGanhos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "cabsG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctCabs": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "desarmesTentados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "desT90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "desarmesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctDesarmes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "faltasCometidas": {
      "dataBar": {
        "color": "#A40000"
      }
    },
    "faltas90": {
      "dataBar": {
        "color": "#A40000"
      }
    },
    "chancesBPTentadas": {
      "dataBar": {
        "color": "#D6007B"
      }
    },
    "chancesBPCriadas": {
      "dataBar": {
        "color": "#D6007B"
      }
    },
    "pctAprovBP": {
      "dataBar": {
        "color": "#D6007B"
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#FAA0A2",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "esforco": {
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#EDEDED",
          "#00B0F0"
        ]
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      }
    },
    "velocidadeMedia": {
      "dataBar": {
        "color": "#008AEF"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressoesTentadas": {
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressoesT90": {
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressoesConcluidas": {
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pressoesC90": {
      "dataBar": {
        "color": "#638EC6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctDesPressoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesConseguidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desarmesDecisivos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "sprints90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "errosGeraramGol": {
      "dataBar": {
        "color": "#C00000"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "erros90": {
      "dataBar": {
        "color": "#920003"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "placarEsforco": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  },
  "overall": {
    "jogosCompletos": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "jogosTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "minPartida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "jogosComoTitular": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "hdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "minHdj": {
      "colorScale": {
        "colors": [
          "#C55A11",
          "#F4B183",
          "#FBE5D6"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "pctHdj": {
      "colorScale": {
        "colors": [
          "#FBE5D6",
          "#F4B183",
          "#C55A11"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "gols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "assist": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "golsAst": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "gols90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "ast90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "golsAst90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "dataBar": {
        "color": "#63C384"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "xG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#EDEDED",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "npxG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xGxA": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "xGxA90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "finalizacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fin90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finNoGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctFinNoGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "finPorGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "finNoGolPorGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "conversaoGols": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "minPorFinalizacao": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minPorFinNoGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "minPorGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "minPorParticipacaoGol": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "golsNaoEsperados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFE699",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "golsNaoEspSemPen": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFE699",
          "#00B0F0"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "foraJogo": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#F8696B",
          "#FF0000"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "foraJogo90": {
      "colorScale": {
        "colors": [
          "#FFAFAF",
          "#F8696B",
          "#FF0000"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "cabsDisp": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "cabsPerd": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "cabsG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctCabs": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "desG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "driblesS": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "desG90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "driblesS90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctDes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "faltasComet": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "faltas90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "amarelos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "amarelos90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "vermelhos": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "vermelhos90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5ArrowsGray",
        "bands": 5
      }
    },
    "totalCartoes": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      }
    },
    "cartoesPorFalta": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "saldoPosse": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pressaoT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pressaoG": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctPressao": {
      "colorScale": {
        "colors": [
          "#DEEBF7",
          "#9DC3E6",
          "#0085B4"
        ]
      },
      "iconSet": {
        "variant": "3ArrowsGray",
        "bands": 3
      }
    },
    "lancesDisputados": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesDisputados90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesGanhos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesGanhos90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "pctLancesGanhos": {
      "colorScale": {
        "colors": [
          "#DEEBF7",
          "#9DC3E6",
          "#0085B4"
        ]
      }
    },
    "bolasInt": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasInt90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "bolasRoubadas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "bolasRoubadas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "tentsBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "tentsBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "chancesBP90": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pctBP": {
      "dataBar": {
        "color": "#007A37"
      }
    },
    "pensBatidos": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensMarcados": {
      "dataBar": {
        "color": "#AD1457"
      }
    },
    "pensPerdidos": {
      "dataBar": {
        "color": "#C00000"
      }
    },
    "pctPen": {
      "dataBar": {
        "color": "#007A37"
      }
    },
    "lancesOfT": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesOf90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesOfC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "lancesOfC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctLancesOf": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesDefT": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      }
    },
    "lancesDefT90": {
      "colorScale": {
        "colors": [
          "#F4B084",
          "#F08E52",
          "#EC7328"
        ]
      }
    },
    "lancesDefC": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "lancesDefC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctLancesDef": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "lancesTotais": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "lancesConseguidosGlobal": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pctAcertoGlobal": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "fintas": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "fintas90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "jogadasCriacao": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "jogadasCriacao90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "tentativasGol": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "tentativasGol90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "rematesForaTotal": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "rematesFora90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "participacoes": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "participacoes90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FCFCFF",
          "#5A8AC6"
        ]
      }
    },
    "acoesUltimoTerco": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "acoesGeraramFin": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "acoesGeraramFin90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passD90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "passDecParaAst": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "passDecConvertidos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "chancesDespEquipe": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      }
    },
    "xAResult": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#DEEBF7",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#008AEF"
      }
    },
    "acoesComBola": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      }
    },
    "acoesComBola90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#9BC2E6",
          "#2F75B5"
        ]
      }
    },
    "minPorPassD": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "4Arrows",
        "bands": 4
      }
    },
    "minPorChancePerigosa": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "passesT90": {
      "colorScale": {
        "colors": [
          "#FFEF9C",
          "#63BE7B"
        ]
      }
    },
    "passesC90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      }
    },
    "pctPassesCertos": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "distancia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#BDD7EE",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#638EC6"
      }
    },
    "dist90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#BDD7EE",
          "#00B0F0"
        ]
      },
      "dataBar": {
        "color": "#2E75B6"
      }
    },
    "velocidadeMedia": {
      "dataBar": {
        "color": "#2E75B6"
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "sprintsTotal": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "sprints90": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "possDesp": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possDesp90": {
      "colorScale": {
        "colors": [
          "#63BE7B",
          "#FFEB84",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "possPerd90": {
      "colorScale": {
        "colors": [
          "#FCFCFF",
          "#F8696B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    },
    "pontuacaoRecebida": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "5Arrows",
        "bands": 5
      }
    },
    "notaMedia": {
      "colorScale": {
        "colors": [
          "#F8696B",
          "#FFEB84",
          "#63BE7B"
        ]
      },
      "iconSet": {
        "variant": "3Arrows",
        "bands": 3
      }
    }
  }
}
