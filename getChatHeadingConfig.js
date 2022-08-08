'use es6';

import {
    createSelector
} from 'reselect';
import {
    getWelcomeMessage
} from '../../selectors/widgetDataSelectors/getWelcomeMessage';
import {
    getChatHeadingConfig as getChatHeadingConfigOperator
} from 'conversations-internal-schema/message/operators/messageGetters';
export const getChatHeadingConfig = createSelector(getWelcomeMessage, getChatHeadingConfigOperator);