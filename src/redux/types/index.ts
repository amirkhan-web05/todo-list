export type InferValueTypes<T> = T extends {[key:string]:infer U} ? U : never
// export type TypeData = ReturnType<InferValueTypes<typeof actions>>