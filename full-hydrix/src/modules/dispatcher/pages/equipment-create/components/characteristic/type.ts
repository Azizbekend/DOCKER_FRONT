// types/characteristics.ts
export interface Characteristic {
  id: string;
  name: string;
  value: string;
  hardwareId: 11
}

export interface CharacteristicsState {
  characteristics: Characteristic[];
}