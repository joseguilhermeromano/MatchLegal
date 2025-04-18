export const generateSessionId = (): string => {
    const now = new Date();

    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}${second}`;
};

  
export const getSessionId = (): string => {

const storedSessionId = localStorage.getItem('sessionId');

if (storedSessionId) {
    return storedSessionId;
}

const newSessionId = generateSessionId();
    localStorage.setItem('sessionId', newSessionId);
    return newSessionId;
};

export const clearSessionId = (): void => {
    localStorage.removeItem('sessionId');
};