export const CREATECHATTER = 'CREATECHATTER';
export const CREATGROUPCHAT = 'CREATGROUPCHAT';
export const UPDATECHATTER = 'UPDATECHATTER';
export const UPDATEGROUPCHAT = 'UPDATEGROUPCHAT';
export const GETCHATTER = 'GETCHATTER';
export const GETGROUPCHAT = 'GETGROUPCHAT';
export const DELETECHATTER = 'DELETECHATTER';
export const DELETEGROUPCHAT = 'DELETEGROUPCHAT';

export const createChatter = (payload) => ({
    type: CREATECHATTER,
    payload
});

export const createGroupChat = (payload) => ({
    type: CREATGROUPCHAT,
    payload
});

export const updateChatter = (payload) => ({
    type: UPDATECHATTER,
    payload
});

export const updateGroupchat = (payload) => ({
    type: UPDATEGROUPCHAT,
    payload
});

export const readChatter = (payload) => ({
    type: GETCHATTER,
    payload
});

export const readGroupChatters = (payload) => ({
    type: GETGROUPCHAT,
    payload
});

export const deleteChatter = (payload) => ({
    type: DELETECHATTER,
    payload
});

export const deleteGroupChatters = (payload) => ({
    type: DELETEGROUPCHAT,
    payload
})







