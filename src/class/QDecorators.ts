import { IMeta, QMeta, AddTypeFieldToQMeta, IOption } from './QMeta';
import { isString } from 'src/js/functions1';

/**
 * Set advanced fiel type Decorator
 * @param name 
 */
export function FieldType(fFieldType: Function) {
    return function (target: Object, propertyKey: string | symbol): void {
        AddTypeFieldToQMeta(target, propertyKey.toString(), fFieldType)
    }
}

export function FReadOnly(target: Object, propertyKey: string | symbol): void {
    let proto = (target as any).constructor;
    if (!proto.qmeta) proto.qmeta = new QMeta()

    let qmeta: IMeta = proto.qmeta;
    qmeta.readOnlyList[propertyKey.toString()] = true
}

export function FHidden(target: Object, propertyKey: string | symbol): void {
    let proto = (target as any).constructor;
    if (!proto.qmeta) proto.qmeta = new QMeta()

    let qmeta: IMeta = proto.qmeta;
    qmeta.hiddenList[propertyKey.toString()] = true
}

export function FTextarea(target: Object, propertyKey: string | symbol): void {
    let proto = (target as any).constructor;
    if (!proto.qmeta) proto.qmeta = new QMeta()

    let qmeta: IMeta = proto.qmeta;
    qmeta.textareaList[propertyKey.toString()] = true
}

export function FImage(target: Object, propertyKey: string | symbol): void {
    let proto = (target as any).constructor;
    if (!proto.qmeta) proto.qmeta = new QMeta()

    let qmeta: IMeta = proto.qmeta;
    qmeta.mapFieldTypeList[propertyKey.toString()] = Image
}


function AddTypeFieldToQMeta_andOptions(target: Object, propertyKey: string, constructorFunc: Function, options: IOption[] | string[]): void {
    let proto = (target as any).constructor;
    if (!proto.qmeta) proto.qmeta = new QMeta()

    let qmeta: IMeta = proto.qmeta;

    let opts: any

    AddTypeFieldToQMeta(target, propertyKey.toString(), constructorFunc)

    try {
        if (isString(options[0])) {
            opts = (options as any).map((s: string) => ({ label: s, value: s }))
        } else {
            opts = options
        }
    } catch (error) {
        console.log('options Require { label: label, value: value}', error)
    }

    qmeta.optionList[propertyKey.toString()] = opts
}

export function FDropdown(options: IOption[] | string[]) {
    return function (target: Object, propertyKey: string | symbol): void {
        AddTypeFieldToQMeta_andOptions(target, propertyKey.toString(), SDropdown, options)
    }
}

export function FRadio(options: IOption[] | string[]) {
    return function (target: Object, propertyKey: string | symbol): void {
        AddTypeFieldToQMeta_andOptions(target, propertyKey.toString(), SRadio, options)
    }
}

export function FCheckboxes(options: IOption[] | string[]) {
    return function (target: Object, propertyKey: string | symbol): void {
        AddTypeFieldToQMeta_andOptions(target, propertyKey.toString(), SCheckboxes, options)
    }
}

export class SDropdown { }
export class SRadio { }
export class SCheckboxes { }
