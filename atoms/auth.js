import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

// Atom to store the authentication token
export const tokenAtom = atomWithStorage('token', null);

// Atom to store the user object
export const userAtom = atomWithStorage('user', null); 