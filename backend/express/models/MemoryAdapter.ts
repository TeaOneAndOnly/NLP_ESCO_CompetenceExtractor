import AdapterInterface from "./AdapterInterface";
import BaseModel from "./BaseModel";

let store: { [key: string]: any } = {}
export default class MemoryAdapter<T extends BaseModel> implements AdapterInterface<T> {

    currentMap: { [key: string]: T }
    ModelClass: new (...props: any) => T

    constructor(ModelClass: new (...props: any) => T, tableName: string) {
        store[tableName] = {}
        this.currentMap = store[tableName]
        this.ModelClass = ModelClass
    }

    async findById(id: string): Promise<T> {
        return this.currentMap[id]
    }

    async deleteById(id: string): Promise<boolean> {
        delete this.currentMap[id]
        return true
    }


    async findAll(opts?: { [key: string]: any; } | undefined): Promise<T[]> {
        let arr: any[] = []
        for (let key in this.currentMap) {
            arr.push(this.currentMap[key])
        }
        return arr;
    }
  
    async updateById(id: string, payload: any): Promise<T> {
        if(await this.findById(id))
        this.currentMap[id] = payload
        return payload
    }
    async insert(payload: T): Promise<T> {
        this.currentMap[payload._id] = payload;
        return payload
    }

}