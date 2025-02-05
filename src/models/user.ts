//ef du modèle utilisateur avec validation
export interface User {
    id: string;
    pseudo: string;
    name: string;
    firstname: string;
    email: string;
    role: 'SUPERADMIN' | 'ADMIN' | 'REFERENT' | 'CONTRIBUTOR';
    token: string;
    password: string;
}

// Validation de l'email avec une regex
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
    return emailRegex.test(email);
};

// Validation de la longueur des champs
export const validateLength = (input: string): boolean => {
    return input.length <= 50;
};

// État initial de l'utilisateur
export const initialUserState: User = {
    id: '',
    pseudo: '',
    name: '',
    firstname: '',
    email: '',
    role: 'CONTRIBUTOR',
    token: '',
    password: '',
};
