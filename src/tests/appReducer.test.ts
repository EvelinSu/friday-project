import {
    appReducer,
    setAppMessage,
    setCurrentTheme,
    setIsFetching,
    setIsInitialized,
    TAppState,
} from "../bll/appReducer";

let startState = {} as TAppState;

beforeEach(() => {
    startState = {
        isInitialized: false,
        messages: [],
        isFetching: false,
        currentTheme: "light",
    };
});

test("message should be added with status success", () => {
    const action = setAppMessage({text: "this operation is done", severity: "success"});

    const endState = appReducer(startState, action);

    expect(endState.messages[0].text).toBe("this operation is done");
    expect(endState.messages[0].severity).toBe("success");
    expect(endState.messages[1]).toBeUndefined();
});

test("isFetching should be changed on true", () => {
    const action = setIsFetching(true);
    const endState = appReducer(startState, action);

    expect(endState.isFetching).toBe(true);
});

test("isInitialized should be changed on true", () => {
    const action = setIsInitialized(true);
    const endState = appReducer(startState, action);

    expect(endState.isInitialized).toBe(true);
});

test("currentTheme should be changed on dark", () => {
    const action = setCurrentTheme("dark");

    const endState = appReducer(startState, action);

    expect(endState.currentTheme).toBe("dark");
});
