/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2024-11-11 12:01:32.

export class Account {
    accountId?: number;
    username?: string;
    password?: string;
    email?: string;
    tasteProfile?: TasteProfile;
}

export class Allergy {
    allergyId?: number;
    allergy_name?: string;
}

export class TasteProfile {
    tasteProfileId?: number;
    allergies?: Allergy[];
}
