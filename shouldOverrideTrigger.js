'use es6';

export const shouldOverrideTrigger = startOpen => {
    if (startOpen === undefined || startOpen) {
        return false;
    }

    return true;
};