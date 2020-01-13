import { IMeta, QMeta, AppendQMeta } from 'src/class/QMeta'
import { FieldType, FReadOnly, FImage, FDropdown, FRadio, FCheckboxes, FHidden } from 'src/class/QDecorators'


@AppendQMeta()
export class JobItem {
    @FReadOnly
    public id: int = 0
    public code: int = 0
    public source: string = ''
    public title: string = ''
    public author: string = ''
    public link: string = ''
    public deleted: boolean = false
    public body: string = ''
    public json: string = ''
    @FReadOnly
    public dt_insert: Date = new Date(0)
    public dt_update: Date = new Date(0)
    public screenshot: string = ''
    public img: string = ''
    public m_spam: boolean = false
    public m_link: boolean = false
    public uid: string = ''

    constructor(item?: Partial<JobItem>) {

        if (item) Object.assign(this, item)

    }

}

export default JobItem