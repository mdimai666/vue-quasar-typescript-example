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
    public id: number = 0;
    public code: number = 0;
    // @FieldType(Date)
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

    constructor(item?: Partial<LogItem>) {

        if (item) Object.assign(this, item)

    }

}

export default LogItem

/**
 * Set advanced fiel type Decorator
 * @param name 
 */
export function FieldType(fFieldType: Function) {
    return function (target: Object, propertyKey: string | symbol): void {
        AddTypeFieldToQMeta(target, propertyKey.toString(), fFieldType)
    }
}

function AddTypeFieldToQMeta(target: Object, propertyKey: string, constructorFunc: Function): void {
    let proto = (target as any).constructor;
    // console.warn(1, target)
    // console.warn(2, proto)

    if (!proto.qmeta) proto.qmeta = {
        mapFieldTypeList: {}
    }

    let qmeta: IMeta = proto.qmeta;
    qmeta.mapFieldTypeList[propertyKey.toString()] = constructorFunc
    // target.constructor.prototype['f_type'].propertyKey = name
}

export interface IMeta {
    mapFieldTypeList: any
}

export function GetIMeta(t: Function): IMeta {
    let con = (t as any)
    return con.qmeta ? con.qmeta : null
}

export function GetIMetaFieldType(t: Function, field: string): Function | null {
    // let T = t();
    let qmeta = GetIMeta(t)
    if (!qmeta) return null
    let map = qmeta.mapFieldTypeList ? qmeta.mapFieldTypeList : {}
    return map[field] ? map[field] : null
}

function AppendQMeta() {
    return function (target: Function): void {
        let f = target as any;
        let instance = new f()

        let fields: string[] = Object.keys(instance)

        for (let field of fields) {
            // console.warn('field-' + field, instance[field])
            let cf = instance[field].constructor;
            // console.dir(instance[field].constructor)
            AddTypeFieldToQMeta(target.prototype, field, cf)
        }

    }
}


// https://github.com/kblok/puppeteer-sharp