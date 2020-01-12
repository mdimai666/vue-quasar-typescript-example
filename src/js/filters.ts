import { date } from 'quasar'
import { translate_monthName } from './functions1'
import api from '../boot/api'

import * as moment from 'moment'

export function AsDateTime(value: Date): string {
    if (!value) return value
    return date.formatDate(value, 'H:mm D ') + translate_monthName(date.formatDate(value, 'MMM'))
}

export function AsFullDateTime(value: Date): string {
    if (!value) return value
    return date.formatDate(value, 'H:mm D ') + translate_monthName(date.formatDate(value, 'MMMM'))
}

export function AsDate(value: Date): string {
    if (!value) return value
    return date.formatDate(value, 'D ') + translate_monthName(date.formatDate(value, 'MMM'))
}

export function BackendUrl(value: string): string {
    if (!value) return value
    return (api as any).fullUrl(value);
}

export function AsCalendar(value: Date): string {
    let weekDays = [
        'none',
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ]

    if (!value) return value
    return weekDays[Number(date.formatDate(value, 'E'))] + ' ' + date.formatDate(value, 'D ') + translate_monthName(date.formatDate(value, 'MMMM')) + date.formatDate(value, ' YYYY')
}

export function FileSize(bytes: number, si: boolean): string {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

export function TimeSince(date: Date) {
    if (!date) return date;
    return moment(date).fromNow();
}

export function MomentFormat(date: Date, format = 'lll'){
    return moment(date).format(format)
}

export default {
    AsDateTime,
    AsDate,
    FileSize,
    AsFullDateTime,
    AsCalendar,
    BackendUrl,
    TimeSince,
    moment: MomentFormat
}