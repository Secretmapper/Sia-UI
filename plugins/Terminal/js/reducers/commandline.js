import { Map, List } from 'immutable'
import * as constants from '../constants/commandline.js'

const initialState = Map({
    commandHistory: List([]),
    currentCommand: '',
    commandIndex: 0,
    showWalletPrompt: false,
    showSeedPrompt: false,
    showCommandOverview: true
})

export default function commandLineReducer(state = initialState, action) {
	switch (action.type) {

        case constants.ADD_COMMAND:
            //Add command to the command history.
            console.log('NEW COMMAND!')
            var newCommandHistory = state.get('commandHistory').push(action.command)
            var newState = state.set('commandHistory', newCommandHistory)
            newState = newState.set('commandIndex', 0)
            newState = newState.set('currentCommand', '')
            return newState

    
        case constants.UPDATE_COMMAND:
            //Updates output of command given by command name and id.
            var newCommandHistory = state.get('commandHistory')
            var commandArray = newCommandHistory.findLastEntry(
                (val) => (val.get('command') == action.command && val.get('id') == action.id)
            )

            if (!commandArray){
                console.log(`Error did not find command: { command: ${action.command}, id: ${action.id} } in command history: ${JSON.stringify(newCommandHistory)}`)
                return state
            }
    
            var [commandIdx, newCommand] = commandArray

            if (action.dataChunk){
                newCommand = newCommand.set('result', newCommand.get('result') + action.dataChunk)
            }

            if (action.stat){
                newCommand = newCommand.set('stat', action.stat)
            }

            console.log(newCommand)
            newCommandHistory = newCommandHistory.set(commandIdx, newCommand)
            return state.set('commandHistory', newCommandHistory)


        case constants.LOAD_PREV_COMMAND:
            var newCommandIndex = state.get('commandIndex')
            newCommandIndex++; //How many commands back do we load.
            if (newCommandIndex > state.get('commandHistory').size){
                newCommandIndex = state.get('commandHistory').size
            }
            var newState = state.set('commandIndex', newCommandIndex)
            var returnvalue = state;
            if ( state.get('commandHistory').size-newCommandIndex < state.get('commandHistory').size ){
                returnvalue = newState.set('currentCommand', state.get('commandHistory').get(state.get('commandHistory').size-newCommandIndex).get('command'))
            }
            return returnvalue;


        case constants.LOAD_NEXT_COMMAND:
            var newCommandIndex = state.get('commandIndex')
            newCommandIndex--;
            if (newCommandIndex < 0){ newCommandIndex = 0 }
            var newState = state.set('commandIndex', newCommandIndex)

            if (newCommandIndex){
                newState = newState.set('currentCommand',
                    state.get('commandHistory').get(
                        state.get('commandHistory').size-newCommandIndex
                    ).get('command')
                )
            }     
            else { newState = newState.set('currentCommand', '') }       

            return newState

        case constants.SET_CURRENT_COMMAND:
            return state.set('currentCommand', action.command)

        case constants.SHOW_WALLET_PROMPT:
            return state.set('showWalletPrompt', true)

        case constants.HIDE_WALLET_PROMPT:
            return state.set('showWalletPrompt', false)

        case constants.SHOW_SEED_PROMPT:
            return state.set('showSeedPrompt', true)

        case constants.HIDE_SEED_PROMPT:
            return state.set('showSeedPrompt', false)
 
        case constants.SHOW_COMMAND_OVERVIEW:
            return state.set('showCommandOverview', true)

        case constants.HIDE_COMMAND_OVERVIEW:
            return state.set('showCommandOverview', false)

    	default:
    		return state
	}
}
