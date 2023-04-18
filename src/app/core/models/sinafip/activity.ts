export interface Activity {
    id?: string;
    dateStart: moment.Moment | Date | string;
    dateEnd: moment.Moment | Date | string;
    activity: string;
    unitMeasure: string;
    cant: number;
    priceU: number;
    subTotal: number;
}
