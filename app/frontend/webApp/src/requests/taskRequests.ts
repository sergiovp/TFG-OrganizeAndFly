import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

function parseDeadLine(deadLine: Date) {
    return `${deadLine.getUTCFullYear()}-${deadLine.getMonth()}-${deadLine.getDate()}`
}

export async function addTask(
    taskName: string,
    taskDescription: string,
    taskPriority: string,
    deadLine: Date,
    listID: string,
    token: string) {
        const year = deadLine.getUTCFullYear();
        const month = deadLine.getMonth();
        const day = deadLine.getDate();
        
        try {
            return await axios.post(URL + 'task',
            {
                taskName,
                taskDescription,
                taskPriority,
                year,
                month,
                day,
                listID
            },
            {
                headers: generateHeader(token),
            });
        } catch (err: any) {
            return err.response ? err.response.data : err;
        }

}

export async function getListTasks(token: string, listID: string) {
    try {
        return await axios.get(URL + 'tasks/' + listID, {
            headers: generateHeader(token),
        });
    } catch(err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function setTask(
    token: string,
    taskID: string,
    name: string,
    description: string,
    priority: string,
    deadLine: string,
    listID: string) {
        try {
            return await axios.put(URL + 'task/' + taskID, {
                name,
                description,
                priority,
                deadLine,
                listID
            },
            {
                headers: generateHeader(token),
            });
        } catch (err: any) {
            return err.response ? err.response.data : err;
        }
}

export async function deleteTask(token: string, taskID: string) {
    try {
        return await axios.delete(URL + 'task/' + taskID, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}
