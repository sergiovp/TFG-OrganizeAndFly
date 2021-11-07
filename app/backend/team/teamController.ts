import * as teamModel from './teamModel';
import * as errorFunctions from '../helpers/errorsFunctions';
import { generateID } from '../helpers/generations';
import { getUserEmailByID } from '../user/userModel';

export async function addTeam(teamName: string, teamDescription: string, userID: string) {
    const teamID = generateID();

    const response = await teamModel.addTeamDB(teamID, teamName, teamDescription, userID);
}

export async function setTeam(teamID: string, teamName: string, teamDescription: string) {
    const response = await teamModel.setTeamDB(teamID, teamName, teamDescription);

    return response;
}

export async function deleteTeam(teamID: string) {
    const response = await teamModel.deleteTeamDB(teamID);

    return response;
}

export async function getUserTeams(userID: string) {
    const teamsIDs = await teamModel.getUserTeamsDB(userID);
    let teamInfo = [];
    
    for (let team of teamsIDs) {
        teamInfo.push(await teamModel.getTeamDB(team.team_id));
    }

    return teamInfo;
}

export async function getTeam(teamID: string) {
    const teamInfo = await teamModel.getTeamDB(teamID);

    return teamInfo;
}

export async function getTeamParticipants(teamID: string) {
    const usersInfo = await teamModel.getTeamParticipantsDB(teamID);
    const userEmails = [];

    for (let user of usersInfo) {
        userEmails.push(await getUserEmailByID(user.user_id));
    }

    return userEmails;
}

export async function leaveTeam(userID: string, teamID: string) {
    const usersInTeam = await teamModel.getTeamParticipantsDB(teamID);

    // There are more users in the team. Just remove this user.
    if (usersInTeam.length > 1) {
        return await teamModel.removeUserInTeamDB(userID, teamID);
    } 
    // Only this user is in the team. Remove it.
    else {
        return await teamModel.deleteTeamDB(teamID);
    }
}
