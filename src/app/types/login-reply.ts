export interface LoginReply {
    loggedIn: boolean;
    client_id?: string;
    scopes?: string;
    state?: string;
}