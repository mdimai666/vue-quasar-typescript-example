import { IMeta, QMeta, AppendQMeta } from 'src/class/QMeta';
import { FieldType, FReadOnly, FImage, FDropdown, FRadio, FCheckboxes, FHidden } from 'src/class/QDecorators';

export interface ILogItem {
    id: int;
    code: int;
    source: string;
    title: string;
    deleted: bool;
    checked: bool;
    body: string;
    json: string;
    dt_insert: Date;
    dt_checked: Date;
    screenshot: string;
    uid: string;
}

@AppendQMeta()
export class LogItem implements ILogItem {
    @FReadOnly
    public id: number = 0;
    @FieldType(Number)
    public code: number = 0;
    public source: string = '';
    public title: string = '';
    public deleted: boolean = false;
    public checked: boolean = false;
    public body: string = '';
    public json: string = '';
    @FReadOnly
    public dt_insert: Date = new Date;
    public dt_checked: Date = new Date;
    @FImage
    public screenshot: string = '';
    @FHidden
    public uid: string = '';

    // @FDropdown(['dima', 'vasya'])
    // public zfan: 'dima' | 'vasya' = 'dima'

    // @FRadio(['dima', 'vasya'])
    // public zfan2: 'dima' | 'vasya' = 'dima'

    // @FCheckboxes(['dima', 'vasya', 'aefaef', 'DDsdsd'])
    // public zfan4: string[] = ['dima']

    constructor(item?: Partial<LogItem>) {

        if (item) Object.assign(this, item)

    }

}

export default LogItem


// https://github.com/kblok/puppeteer-sharp