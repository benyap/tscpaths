export class StepError extends Error {
  constructor(public readonly step: string, message: string) {
    super(message);
  }
}

export class ModuleNotFoundError extends StepError {
  constructor(public readonly step: string, public readonly module: string) {
    super(step, `${module} not found`);
  }
}

export class MissingTSConfigError extends StepError {
  constructor(public readonly step: string, public readonly path: string) {
    super(step, `${path} is not set`);
  }
}
