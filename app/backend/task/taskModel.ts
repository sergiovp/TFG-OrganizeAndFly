import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

export async function addTaskDB(
    taskName: string,
    listID: string,
    taskID: string,
    taskDescription?: string,
    taskPriority?: string,
    taskDeadline?: Date) {
        try {
            await dataBase('tasks')
                .insert({
                    'task_id': taskID,
                    'task_name': taskName,
                    'task_description': taskDescription,
                    'task_priority': taskPriority,
                    'deadline': taskDeadline
                })
            await dataBase('list_task')
                .insert({
                    list_id: listID,
                    task_id: taskID
                })
            return await dataBase('tasks')
                .select('task_id', 'task_name', 'task_description', 'task_priority', 'deadline')
                .first()
                .where('task_id', taskID)
        } catch (err) {
            return getBDError(err);
        }
    
}

export async function getListTasksDB(listID: string) {
    try {
        return await dataBase('list_task')
            .select('task_id')
            .where('list_id', listID)
    } catch (err) {
        return getBDError(err);
    }
}

export async function getTaskDB(taskID: string) {
    try {
        return await dataBase('tasks')
            .select('task_id', 'task_name', 'task_description', 'task_priority', 'deadline')
            .where('task_id', taskID)
            .first();
    } catch (err) {
        return getBDError(err);
    }
}

export async function setTaskDB(
    taskID: string,
    name: string,
    description: string,
    priority: string,
    deadLine: string,
    listID: string) {
        try {
            await dataBase('list_task')
                .first()
                .where({ 'task_id': taskID })
                .update({
                    'list_id': listID
                })
            await dataBase('tasks')
            .first()
            .where('task_id', taskID)
            .update({
                task_name: name,
                task_description: description,
                task_priority: priority,
                deadline: deadLine
            })
            return await dataBase('tasks')
                .select('task_id', 'task_name', 'task_description', 'task_priority', 'deadline')
                .first()
                .where('task_id', taskID)
        } catch (err) {
            return getBDError(err);
        }
}

export async function deleteTaskDB(taskID: string) {
    try {
        return await dataBase('tasks')
            .first()
            .where({'task_id': taskID})
            .del()
    } catch (err) {
        return getBDError(err);
    }
}