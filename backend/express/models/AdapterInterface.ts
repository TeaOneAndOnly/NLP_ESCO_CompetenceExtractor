
export default interface AdapterInterface<T> {
    

    findById(id: string): Promise<T>
    findAll(opts?: { [key: string]: any }): Promise<T[]>
    deleteById(id: string): Promise<boolean>
    updateById(id: string, payload: any): Promise<T>
    insert(payload: any): Promise<T>

}