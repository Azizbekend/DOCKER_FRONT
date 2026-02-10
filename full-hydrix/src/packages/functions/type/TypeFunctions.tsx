export type StringKeys<T> = {
    // [K in keyof T]: T[K] extends string ? K : never;
    [K in keyof T]: T[K] extends string | number | boolean | null ? K : never
}[keyof T];

