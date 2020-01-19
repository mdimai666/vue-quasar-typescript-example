import api from 'src/boot/api'
import { AxiosResponse } from 'axios'
import { ObjectMapAsKeyVal, ObjectToQueryString } from 'src/js/functions1'

export interface ISResponseList<T> {
    totalCount: int
    data: T[]
    page: int
    perpage: int
    totalPages: int
}

export interface IQBackend_ListRequestParam {
    page?: int
    perpage?: int
    sort?: string
    desc?: bool
}

export class QController<T> {

    controller: string = ''

    Data(res: AxiosResponse) {
        if (res.status == 200 && res.data) {
            return res.data
        }
        return undefined
    }

    async list(param: Partial<IQBackend_ListRequestParam> | any): Promise<ISResponseList<T> | undefined> {
        // let url = `${this.controller}/list?page=${param.page}&perpage=${param.perpage}`
        // url += `&sort=${param.sort}&desc=${param.desc}`
        
        let url = `${this.controller}/list?${ObjectToQueryString(param)}`
        let res: AxiosResponse<ISResponseList<T>> = await api.get(url)

        console.log(url)

        return this.Data(res)
    }

    async get(id: int): Promise<T | undefined> {
        let url = `${this.controller}/${id}`
        let res: AxiosResponse<T> = await api.get(url)

        return this.Data(res)

    }

    async post(item: T): Promise<T | undefined> {
        let url = `${this.controller}`
        let res: AxiosResponse<T> = await api.post(url, item)

        return this.Data(res)

    }

    async delete(id: int): Promise<bool> {
        let url = `${this.controller}/${id}`
        let res: AxiosResponse<T> = await api.delete(url)

        return this.Data(res)
    }

    async patch(id: int, itemPart: Partial<T> | IPatchOp[]): Promise<T> {

        let patch: IPatchOp[]

        if (itemPart instanceof Array && itemPart[0].op) {
            patch = itemPart
        } else {
            patch = this.ConvertToPatch(itemPart as any)
        }

        let url = `${this.controller}/${id}`
        let res: AxiosResponse<T> = await api.patch(url, patch)

        return this.Data(res)
    }

    ConvertToPatch(itemPart: Partial<T>): IPatchOp[] {

        let ops: IPatchOp[] = []

        for (let key in itemPart) {
            ops.push({
                op: 'replace',
                path: '/' + key,
                value: itemPart[key]
            })
        }

        return ops
    }
}


/**
 * JsonPatchDocument interface
 */
export interface IPatchOp {
    op: IPatchOp_operation
    /**
     * must begin '/' 
     *  for adday field:
     * 
     *      ✔ '/items/-' - to append last 
     *      ✔ '/items/0' - to prepend first
     *      ✔ '/items/5' - to index
     * 
     * @example 
     * '/body'
     */
    path: string
    value: any
}


type IPatchOp_operation = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test'
