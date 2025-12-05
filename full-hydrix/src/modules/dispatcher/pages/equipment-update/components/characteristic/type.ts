// types/characteristics.ts
export interface Characteristic {
  id: string;
  name: string;
  value: string;
}

export interface CharacteristicsState {
  characteristics: Characteristic[];
}