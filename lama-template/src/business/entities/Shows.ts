export class Shows {
  constructor(
    public readonly id: string,
    public readonly weekDay: string,
    public readonly startTime: number,
    public readonly endTime: number,
    public readonly bandId: string
  ) { }
}

export interface ShowsInputDTO {
  week_day: string,
  start_time: number,
  end_time: number,
  band_id: string
}