import { forgotPassReducer, sendEmailTC, setTokenAC, TForgotPass } from "../bll/forgotPassReducer";

let startState = {} as TForgotPass;

beforeEach(() => {
    startState = {
        isSendLetter: false,
        token: "waitToken",
    };
});

test("isSendLetter should be true", () => {
    const action = sendEmailTC.fulfilled(undefined, "requiredID", "test Email");

    const endState = forgotPassReducer(startState, action);
    expect(endState.isSendLetter).toBe(true);
});

test("setIsLoggedIn should be added with status true", () => {
    const action = setTokenAC("1234567");

    const endState = forgotPassReducer(startState, action);
    expect(endState.token).toBe("1234567");
});
