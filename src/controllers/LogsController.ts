import { QController, IQBackend_ListRequestParam, ISResponseList } from 'src/controllers/QController'
import LogItem from 'src/models/LogItem'



export class LogsController extends QController<LogItem> {

    controller: string = 'logs'

    constructor() {
        super()
    }
}

export default LogsController