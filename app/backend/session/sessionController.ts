import { deleteSessionDB } from './sessionModel';
import { sessionDeleted } from '../helpers/successOperations';
import { getNoSessionDeleted } from '../helpers/errorsFunctions';

export async function deleteSession(sid: string) {
    const res = await deleteSessionDB(sid);

    return res === 1 ? sessionDeleted() : getNoSessionDeleted();
}
