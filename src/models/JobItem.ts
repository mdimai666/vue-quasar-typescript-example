import { IMeta, QMeta, AppendQMeta } from 'src/class/QMeta'
import { FieldType, FReadOnly, FImage, FDropdown, FRadio, FCheckboxes, FHidden } from 'src/class/QDecorators'
import $backend from 'src/class/QBackend'
import $api from 'src/boot/api'
import { NotifySuccess, NotifyError } from 'src/boot/notify'


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

    static async ParserUpdateAsync() {
        // NotifySuccess('Updating...')

        let res = await $api.get($api.RedURL + `/vk_api2/update`)
        if (res.status == 200) {
            NotifySuccess('Updating...')
        } else {
            NotifyError(res)
        }
    }

    static async ParserSearch(text: string) {
        // NotifySuccess('Searching...')

        let res = await $api.get($api.RedURL + `/vk_api2/search?search=${text}`)
        if (res.status == 200) {
            NotifySuccess(`Searching... ${text}`)
        } else {
            NotifyError(res)
        }
    }

}

export default JobItem