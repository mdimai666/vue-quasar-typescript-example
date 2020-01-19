import { QController, IQBackend_ListRequestParam, ISResponseList } from './QController'
import JobItem from 'src/models/JobItem'


export interface IRequestJobsListFilter {
    m_spam?: bool
    m_link?: bool
    deleted?: bool
    dt_actual?: bool
}

function JobsKindToFilter(kind: EJobsKind): IRequestJobsListFilter {
    if (kind == EJobsKind.spam) {
        return {
            deleted: false,
            m_spam: true,
        }
    } else if (kind == EJobsKind.linked) {
        return {
            m_link: true
        }
    } else if (kind == EJobsKind.deleted) {
        return {
            m_spam: false,
            deleted: true,
        }
    } else if (kind == EJobsKind.all) {
        return {}
    } else {
        // actual
        return {
            m_spam: false,
            deleted: false,
            dt_actual: true
        }
    }

    // if (filter_mode == 'spam') return `m_spam=true&m_link=&deleted=false`
    // else if (filter_mode == 'linked') return `m_spam=&m_link=true&deleted=`
    // else if (filter_mode == 'deleted')
    //   return `m_spam=false&m_link=&deleted=true`
    // else if (filter_mode == 'all') return `m_spam=&m_link=&deleted=`
    // // if(filter_mode == 'actual')
    // else return `m_spam=false&m_link=&deleted=false&dt_actual=true`
}


export class JobsController extends QController<JobItem> {

    controller: string = 'jobs'

    constructor() {
        super()
    }

    async list2(_param: IQBackend_ListRequestParam, _kind: EJobsKind | IRequestJobsListFilter): Promise<ISResponseList<JobItem> | undefined> {

        let kind: IRequestJobsListFilter

        if (<any>_kind in EJobsKind) {
            kind = JobsKindToFilter(_kind as any)
        } else {
            kind = _kind as any
        }
        let param = Object.assign(_param, kind)

        return await super.list(param)

    }

}

export default JobsController

export enum EJobsKind {
    actual,
    all,
    spam,
    linked,
    deleted
}