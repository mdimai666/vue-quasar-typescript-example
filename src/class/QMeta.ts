export interface IOption {
    label: string
    value: string
}

export interface IMeta {
    mapFieldTypeList: any
    readOnlyList: any
    hiddenList: any
    optionList: { [key:string]: IOption[] }
}

export class QMeta implements IMeta {
    public mapFieldTypeList: any = {}
    public readOnlyList: any = {}
    public hiddenList: any = {}
    public optionList: { [key:string]: IOption[] } = {}

    constructor() {

    }
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

export function AppendQMeta() {
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

export function AddTypeFieldToQMeta(target: Object, propertyKey: string, constructorFunc: Function): void {
    let proto = (target as any).constructor;
    // console.warn(1, target)
    // console.warn(2, proto)

    if (!proto.qmeta) proto.qmeta = {
        mapFieldTypeList: {},
        readOnlyList: {}
    }

    let qmeta: IMeta = proto.qmeta;
    if (!qmeta.mapFieldTypeList[propertyKey.toString()]) {

        qmeta.mapFieldTypeList[propertyKey.toString()] = constructorFunc
        // target.constructor.prototype['f_type'].propertyKey = name
    }
}