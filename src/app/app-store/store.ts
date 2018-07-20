import { IAppState } from './store';
import { Person } from 'src/app/model/person';
import { FETCH_PEOPLE_SUCCESS, ADD_TO_PEOPLE, REMOVE_FROM_PEOPLE } from './actions';


export interface IAppState{
    peopleArray:Array<Person>
}

export const INITIAL_STATE = {
    peopleArray: []
}

/**
 * A pure function that initializes the people in the store with the 
 * people coming from the action
 */
function fetchPeopleSuccess(state,action):IAppState{ 
    return {peopleArray:action.people }
}

/**
 * A pure function that adds a person to the people in the store
 */
function addToPeople(state,action):IAppState{
    var peopleFromStore = state.peopleArray
    peopleFromStore.push(action.person)
    return {peopleArray:peopleFromStore}
}

/**
 * A pure function that removes a person from the people in the store
 */
function removeFromPeople(state,action):IAppState{
    var peopleFromStore:Array<Person> = state.peopleArray
    var indexOfPerson = peopleFromStore.indexOf(action.person)
    peopleFromStore.splice(indexOfPerson,1)
    return {peopleArray:peopleFromStore}
}

export function rootReducer(state,action):IAppState{
    switch(action.type){
        case FETCH_PEOPLE_SUCCESS: return fetchPeopleSuccess(state,action)
        case ADD_TO_PEOPLE: return addToPeople(state,action);
        case REMOVE_FROM_PEOPLE: return removeFromPeople(state,action)
    }
    return state 
}