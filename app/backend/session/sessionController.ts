import { deleteSessionDB } from './sessionModel';
import { sessionDeleted } from '../helpers/successOperations';
import { getNoSessionDeleted } from '../helpers/errorsFunctions';

export async function deleteSession(sid: string) {
    const res = await deleteSessionDB(sid);

    res === 1 ? console.log(sessionDeleted()) : console.log(getNoSessionDeleted());
    return res === 1 ? sessionDeleted() : getNoSessionDeleted();
}
