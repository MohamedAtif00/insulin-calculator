export interface GeneralResponse<T>{
    value:T | null,
    status:number,
    isSuccess:boolean,
    successMessage:string,
    correlationId:string,
    errors:string[],
    validationErrors:string[]
}