import { LogsController } from 'src/controllers/LogsController'
import { JobsController } from 'src/controllers/JobsController'




export class QBackend {
    public logs: LogsController = new LogsController
    public jobs: JobsController = new JobsController
}

export default new QBackend




