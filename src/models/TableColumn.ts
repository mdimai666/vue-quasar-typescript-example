import moment from 'moment'
import { date } from 'quasar'
import { IMeta, GetIMeta, IOption } from 'src/class/QMeta';
import { SDropdown, SRadio, SCheckboxes } from 'src/class/QDecorators';

const sampleOfDate = '2020-01-07T01:39:17.987612+09:00'
//   '2020-01-09T01:50:47.78666+09:00'

const validDateLength = sampleOfDate.length - 6;

export class TableColumn<TType> {
    public name: string
    public required: bool = false
    public label: string
    public align: 'left' | 'right' | 'center' = 'right'
    public field: string
    public format: (val: TType) => string;
    public sortable: bool = true
    public sort: (a: TType, b: TType) => int = (a, b) => parseInt(a as any, 10) - parseInt(b as any, 10)
    public classes: string = ''
    public style: string = ''
    public headerClasses: string = ''
    
    
    public type: Function
    public op_momentFormat = 'lll'

    public readonly: bool = false
    public m_options: IOption[] = []
    public hidden: bool = false


    constructor(private t: new () => TType, name: string, label: string = '', field: string = '', private modelType?: Function) {
        this.name = name
        this.label = label || name
        this.field = field || name

        // let ins = new t();
        this.type = t

        let readOnly: bool = false;
        let hidden: bool = false;
        let qmeta: IMeta | null = null;

        if (modelType) {
            qmeta = GetIMeta(modelType);
        }

        if (qmeta) {
            readOnly = qmeta.readOnlyList && qmeta.readOnlyList[this.field]
            hidden = qmeta.hiddenList && qmeta.hiddenList[this.field]

            let typeName: string;

            if (qmeta.mapFieldTypeList[this.field]) {
                typeName = qmeta.mapFieldTypeList[this.field].name;

                const optionedListTypes: string[] = [SDropdown.name, SRadio.name, SCheckboxes.name]

                if (optionedListTypes.includes(typeName)) {
                    this.m_options = qmeta.optionList[this.field]
                }
            }

        }

        // if(this.field == 'id') this.readonly = true;
        this.readonly = readOnly
        this.hidden = hidden

        this.format = this.Format
    }

    public Format(val: TType): string {

        if (this.IsValidDate(val)) {
            return moment(val).format(this.op_momentFormat)
        } else {
            return val as any
        }
    }

    IsValidDate(str: any): bool {
        return str && str.length && str.length > validDateLength && moment(str).isValid()
    }

}