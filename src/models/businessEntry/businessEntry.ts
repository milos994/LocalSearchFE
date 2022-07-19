export interface IDay {
  start: string; // time
  end: string; // time
  type: 'OPEN';
}

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface IOpeningHours {
  days: Record<Day, Array<IDay>>;
  closed_on_holidays: boolean;
  open_by_arrangement: boolean;
}

export class BusinessEntryDto {
  displayWhat!: string;
  displayWhere!: string;
  openingHours!: IOpeningHours;
  phoneNumbers!: Array<string>;
  zipCodes!: Array<number>;
  websites!: Array<string>;
}

export class BusinessEntry extends BusinessEntryDto {
  constructor(dto: BusinessEntryDto) {
    super();
    Object.assign(this, dto);
  }
}
