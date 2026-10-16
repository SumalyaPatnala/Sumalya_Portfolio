import type { Dataset, EvaluationRun, ModelConfig } from "@/lib/workbench/types";
import datasetsJson from "@/content/workbench/datasets.json";
import configsJson from "@/content/workbench/configurations.json";
import { runs } from "@/content/workbench/runs";

export const datasets = datasetsJson as Dataset[];
export const configurations = configsJson as ModelConfig[];
export { runs };

export function getDataset(id: string) {
  return datasets.find((item) => item.id === id);
}

export function getConfig(id: string) {
  return configurations.find((item) => item.id === id);
}

export function getRun(id: string) {
  return runs.find((item) => item.id === id);
}

export function runsFor(datasetId: string, configIds: string[]): EvaluationRun[] {
  return runs.filter(
    (run) => run.datasetId === datasetId && configIds.includes(run.configId),
  );
}
