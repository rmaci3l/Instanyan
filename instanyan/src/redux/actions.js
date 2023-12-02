export const loginUser = (user) => ({
    type: 'LOGIN',
    payload: user
});

export const logoutUser = () => ({
    type: 'LOGOUT',
});