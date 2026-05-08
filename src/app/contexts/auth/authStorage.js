export const storeAuthData = (token, refreshToken, user) => {
    try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
        console.error('Error storing auth data:', error);
    }
};

export const getStoredUserData = () => {
    try {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

export const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
};