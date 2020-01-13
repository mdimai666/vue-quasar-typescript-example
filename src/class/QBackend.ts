import api from './../boot/api'

import LogItem from 'src/models/LogItem';
import { AxiosResponse } from 'axios';
import JobItem from 'src/models/JobItem';

export interface ISResponseList<T> {
    totalCount: int;
    data: T[];
    page: int;
    perpage: int;
    totalPages: int;
}

export interface IQBackend_ListRequestParam {
    page: int
    perpage: int
    sort: string
    desc: bool
}


export class QController<T> {

    controller: string = ''

    Data(res: AxiosResponse) {
        if (res.status == 200 && res.data) {
            return res.data
        }
        return undefined
    }

    async list(param: IQBackend_ListRequestParam): Promise<ISResponseList<T> | undefined> {
        let url = `${this.controller}/list?page=${param.page}&perpage=${param.perpage}`;
        url += `&sort=${param.sort}&desc=${param.desc}`;

        let res: AxiosResponse<ISResponseList<T>> = await api.get(url);

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

    async patch(id: int, itemPart: Partial<T>): Promise<T> {
        let url = `${this.controller}/${id}`
        let res: AxiosResponse<T> = await api.patch(url, itemPart)

        console.warn(res)

        return this.Data(res)
    }


}

export class LogsController extends QController<LogItem> {

    controller: string = 'logs'

    constructor() {
        super()
    }
}

export class JobsController extends QController<JobItem> {

    controller: string = 'jobs'

    constructor() {
        super()
    }
}


export class QBackend {
    public logs: LogsController = new LogsController
    public jobs: JobsController = new JobsController
}

export default new QBackend