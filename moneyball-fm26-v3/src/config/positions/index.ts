import type { PositionKey } from '@/types/position.ts'
import type { PositionConfig } from './types.ts'
import { goleirosConfig } from './goleiros.ts'
import { zagueirosConfig } from './zagueiros.ts'
import { lateraisConfig } from './laterais.ts'
import { volantesConfig } from './volantes.ts'
import { b2bConfig } from './b2b.ts'
import { armadoresConfig } from './armadores.ts'
import { avancadosConfig } from './avancados.ts'
import { esforcoConfig } from './esforco.ts'
import { timeConfig } from './time.ts'
import { overallConfig } from './overall.ts'

export const positionConfigs: Record<PositionKey, PositionConfig> = {
  goleiros: goleirosConfig,
  zagueiros: zagueirosConfig,
  laterais: lateraisConfig,
  volantes: volantesConfig,
  b2b: b2bConfig,
  armadores: armadoresConfig,
  avancados: avancadosConfig,
  esforco: esforcoConfig,
  time: timeConfig,
  overall: overallConfig,
}
