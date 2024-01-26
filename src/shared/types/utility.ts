export type ExtractTypeFromArray<T> = T extends (infer U)[] ? U : never;
