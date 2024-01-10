export class CreateResMsg {
    public code: number
    public message: string[] | []
    public data: any | null
    public stack?: any | null

    constructor() {
        this.code = null
        this.data = null
        this.message = []

        if(process.env.NODE_ENV === 'development'){
          this.stack = null
        }
    }
}
