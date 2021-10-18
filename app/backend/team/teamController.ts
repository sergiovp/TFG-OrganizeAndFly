import * as teamModel from './teamModel';
import * as errorFunctions from '../helpers/errorsFunctions';
import { generateID } from '../helpers/generations';

export async function addTeam(teamName: string, teamDescription: string, userID: string) {
    const teamID = generateID();

    const response = await teamModel.addTeamDB(teamID, teamName, teamDescription, userID);
}

export async function setTeam(teamID: string, teamName: string, teamDescription: string) {

}

export async function deleteTeam(teadID: string) {

}

export async function addTeamMember(teamID: string, userEmail: string) {

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
