
import AdapterInterface from "./AdapterInterface"
import BaseModel from "./BaseModel"
import FileDBAdapter from "./FileAdapter"

export default class BaseDAO<T extends BaseModel> implements AdapterInterface<T> {

    adapter: AdapterInterface<T>

    constructor(ModleClass: new (props: any) => T, tableName: string, BaseAdapter?: new (...props: any) => AdapterInterface<T>) {
        this.adapter =
            BaseAdapter ? new BaseAdapter(ModleClass, tableName) :
                new FileDBAdapter(ModleClass, tableName)

    }

    async findById(id: string) {
        return this.adapter.findById(id)
    }

    async findAll(opts?: any) {
        return this.adapter.findAll(opts)
    }

    async deleteById(id: string) {
        return this.adapter.deleteById(id)
    }

    async updateById(id: string, payload: any) {
        return this.adapter.updateById(id, payload)
    }

    async insert(payload: any) {
        return this.adapter.insert(payload)
    }



}

