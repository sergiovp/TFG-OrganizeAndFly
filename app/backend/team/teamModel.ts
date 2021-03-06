import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'teams';
const ID_DB_NAME = 'team_id';
const TEAM_DB_NAME = 'team_name';
const TEAM_DB_DESCRIPTION = 'team_description';

export async function addTeamDB(teamID: string, teamName: string, teamDescription: string, userID: string) {
    try {
        await dataBase(TABLE_NAME)
            .insert({
                team_id: teamID,
                team_name: teamName,
                team_description: teamDescription,
            })
        await dataBase('user_team')
            .insert({
                user_id: userID,
                team_id: teamID
            })
        return await dataBase(TABLE_NAME)
            .select('team_id', 'team_name', 'team_id')
            .first()
            .where(ID_DB_NAME, teamID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function getUserTeamsDB(userID: string) {
    try {
        return await dataBase('user_team')
            .select('team_id')
            .where('user_id', userID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function getTeamDB(teamID: string) {
    try {
        return await dataBase('teams')
            .select('team_name', 'team_description', 'team_id')
            .where('team_id', teamID)
            .first()
    } catch (err) {
        return getBDError(err);
    }
}

export async function setTeamDB(teamID: string, teamName: string, teamDescription: string) {
    try {
        await dataBase('teams')
            .first()
            .where('team_id', teamID)
            .update({
                'team_name': teamName,
                'team_description': teamDescription
            })
        return await dataBase('teams')
            .select('team_id', 'team_name', 'teamDescription')
            .first()
            .where('team_id', teamID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function deleteTeamDB(teamID: string) {
    try {
        return await dataBase('teams')
            .first()
            .where({
                'team_id': teamID
            })
            .del();
    } catch (err) {
        getBDError(err);
    }
}

export async function getTeamParticipantsDB(teamID: string) {
    try {
        return await dataBase('user_team')
            .where({'team_id': teamID})
    } catch (err) {
        return getBDError(err);
    }
}

export async function removeUserInTeamDB(userID: string, teamID: string) {
    try {
        return await dataBase('user_team')
            .first()
            .where({
                'user_id': userID,
                'team_id': teamID
            })
            .del();
    } catch (err) {
        return getBDError(err);
    }
}
