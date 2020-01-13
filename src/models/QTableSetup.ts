import instance from 'src/boot/api';
import { TableColumn } from './TableColumn';
import { isString } from 'src/js/functions1';
import { GetIMetaFieldType } from 'src/class/QMeta';

//TODO: Add decorator

export class QTableSetup<T> {

    public columns: TableColumn<any>[] = []

    public options: QTableSetup_Options

    constructor(private t: new () => T,
        public _options: Partial<QTableSetup_Options> = new QTableSetup_Options()
    ) {

        this.options = new QTableSetup_Options(_options);

        //append not setters fields
        // this.options = {...new QTableSetup_Options(), ...this.options}

        let instance = new t();
        let fields: string[] = Object.keys(instance)


        for (let field of fields) {


            let index = this.columns.findIndex(s => s.field == field)

            let noExist: bool = index < 0;

            if (noExist) {

                // let f = (instance as any)[field]
                // console.warn('T.' + field, GetTypeName(f))
                // let typeName: string = GetTypeName(f)
                // let fieldType: Type = ThisType<f>;

                // let col = new TableColumn<InstanceType>(t, field)
                let cnstcr : Function | null = GetIMetaFieldType(t, field);
                let col = new TableColumn<any>(cnstcr as any, field)

                this.columns.push(col)
            }

        }

    }

    public Columns(): TableColumn<any>[] {
        return this.columns.filter(col => this.options.ColIsShow(col.name))
    }

}

export function GetTypeName(obj: any) {
    let f = obj
    let typeName: string = typeof f

    if (f instanceof Date)
        typeName = f.constructor.name;

    else if (f instanceof Array)
        typeName = f.constructor.name;
    // typeName = f.constructor.name + '<' + GetTypeName(f[0]) + '>';

    return typeName
}

export default QTableSetup

export class QTableSetup_Options {

    public includeColumns: string | string[] | RegExp = '*'
    public excludeColumns: string | string[] | RegExp | null = null
    // public tableMode: E_QTableMode = E_QTableMode.Default

    constructor(_partial?: Partial<QTableSetup_Options>) {

        //append partial options
        for (let key in _partial) {
            (this as any)[key] = (_partial as any)[key]
        }


        //normalize cols from string to array
        if (
            isString(this.includeColumns) &&
            this.includeColumns != '*' &&
            (this.includeColumns as any).includes(',')) {

            this.includeColumns = ((this.includeColumns as any).split(',') as string[]).map(s => s.trim())
        }


        if (this.excludeColumns &&
            isString(this.excludeColumns) &&
            (this.excludeColumns as any).includes(',')) {

            this.excludeColumns = ((this.excludeColumns as any).split(',') as string[]).map(s => s.trim())
        }
    }

    public ColIsShow(colName: string): bool {
        return !this.InExcludeColumn(colName) && this.InIncludeColumn(colName)
    }

    InIncludeColumn(colName: string): bool {
        if (!this.includeColumns) {
            return true
        }
        else if (this.includeColumns instanceof RegExp) {
            return this.includeColumns.test(colName)
        }
        if (this.includeColumns == '*' || this.includeColumns.includes(colName)) {
            return true
        }
        else {
            return false
        }
    }

    InExcludeColumn(colName: string): bool {
        if (!this.excludeColumns) {
            return false
        }
        else if (this.excludeColumns instanceof RegExp) {
            return this.excludeColumns.test(colName)
        }
        if (this.excludeColumns.includes(colName)) {
            return true
        }
        else {
            return false
        }
    }
}


//TodoAddFeature
export enum E_QTableMode {
    Default,
    Header
}