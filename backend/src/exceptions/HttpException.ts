export class HttpException {
    public code: number
    public data?: any
    public message: any[]
    public stack: any

    constructor (status: number, message?: any, data?: any, stack?: any) {
        this.code = status || null
        this.data = data || null
        this.message = message || null

        if(process.env.NODE_ENV === 'development'){
          this.stack = stack || null
        }
    }
}
