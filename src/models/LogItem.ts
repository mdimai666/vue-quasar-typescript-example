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

export class LogItem implements ILogItem {
    public id: number = 0;
    public code: number = 0;
    public source: string = '';
    public title: string = '';
    public deleted: boolean = false;
    public checked: boolean = false;
    public body: string = '';
    public json: string = '';
    public dt_insert: Date = new Date;
    public dt_checked: Date = new Date;
    public screenshot: string = '';
    public uid: string = '';
}

export default LogItem