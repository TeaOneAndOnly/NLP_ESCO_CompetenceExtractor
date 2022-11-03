import AdapterInterface from "./AdapterInterface"
import BaseModel from "./BaseModel"

const fs = require('fs')
const rootDir = process.cwd()


class FileDBAdapter<T extends BaseModel> implements AdapterInterface<T> {

    ModelClass: new (params: any) => T
    tablePath
    map: { [key: string]: any }

    constructor(ModelClass: new (params: any) => T, tableName: string) {
        this.tablePath = `${rootDir}/db/${tableName}.json`
        this.ModelClass = ModelClass
        if (!fs.existsSync(this.tablePath)) fs.writeFileSync(this.tablePath, JSON.stringify({}))
        this.map = JSON.parse(fs.readFileSync(this.tablePath))
    }

    async findById(id: string) {
        const model = this.map[id]
        return model
    }

    async findAll(opts: { [key: string]: any }) {
        let arr: any[] = []
        for (let key in this.map) {
            arr.push(this.map[key])
        }
        return arr;
    }

    async deleteById(id: string) {
        await this.findById(id)
        delete this.map[id]
        fs.writeFileSync(this.tablePath, JSON.stringify(this.map, null, 4))
        return true
    }

    async updateById(id: string, payload: any) {
        await this.findById(id)
        let updated = new this.ModelClass(payload)
        this.map[id] = updated
        fs.writeFileSync(this.tablePath, JSON.stringify(this.map, null, 4))
        return updated
    }

    async insert(payload: any) {
        let doc = new this.ModelClass(payload)
        // if (this.map[doc._id]) throw { message: 'Already exists!', status: 400 }
        this.map[doc._id] = doc
        fs.writeFileSync(this.tablePath, JSON.stringify(this.map, null, 4))
        return doc
    }

}



export default FileDBAdapter