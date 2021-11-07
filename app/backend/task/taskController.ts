import * as taskModel from './taskModel';
import { generateID } from '../helpers/generations';

export async function addTask(
    taskName: string,
    listID: string,
    taskDescription?: string,
    taskPriority?: string,
    year?: number,
    month?: number,
    day?: number) {
        const taskID = generateID();

        let taskDeadline;

        if (year && month && day) {
            taskDeadline = new Date(year, month, day);
        }

        const response = await taskModel.addTaskDB(
            taskName,
            listID,
            taskID,
            taskDescription,
            taskPriority,
            taskDeadline
        );
        return response;
}

export async function getListTasks(listID: string) {
    const taskIDs = await taskModel.getListTasksDB(listID);
    let taskInfo = [];

    for (let task of taskIDs) {
        taskInfo.push(await taskModel.getTaskDB(task.task_id));
    }

    return taskInfo;
}

export async function setTask(
    taskID: string,
    name: string,
    description: string,
    priority: string,
    deadLine: string,
    listID: string) {

        const response = taskModel.setTaskDB(taskID, name, description, priority, deadLine, listID);

        return response;

}

export async function deleteTask(taskID: string) {
    const response = await taskModel.deleteTaskDB(taskID);

    return response;
}
