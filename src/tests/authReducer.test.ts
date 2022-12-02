import {
    authReducer,
    changeUserProfileTC,
    setIsLoggedIn,
    setRegisterUserData,
    setUserData,
    TAuthState,
} from "../bll/authReducer";

let startState = {} as TAuthState;

beforeEach(() => {
    startState = {
        myData: {
            id: null,
            name: null,
            email: null,
            avatar: null,
        },
        registerData: {
            email: "",
            password: "",
        },
        isLoggedIn: false,
    };
});

test("setIsLoggedIn should be added with status true", () => {
    const action = setIsLoggedIn(true);

    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBe(true);
});

test("userData should be added", () => {
    const action = setUserData({ id: "1", name: "test", email: "emailTest" });

    const endState = authReducer(startState, action);

    expect(endState.myData.id).toBe("1");
    expect(endState.myData.name).toBe("test");
    expect(endState.myData.email).toBe("emailTest");
});

test("registerData should be added", () => {
    const action = setRegisterUserData({ email: "emailTestUser", password: "yourPassword" });

    const endState = authReducer(startState, action);

    expect(endState.registerData.email).toBe("emailTestUser");
    expect(endState.registerData.password).toBe("yourPassword");
});

test("userProfileData should be changed", () => {
    const userProfileData = { name: "myTestName", avatar: "newAvatar" };
    const action = changeUserProfileTC.fulfilled(userProfileData, "requiredId", userProfileData);

    const endState = authReducer(startState, action);

    expect(endState.myData.name).toBe("myTestName");
    expect(endState.myData.avatar).toBe("newAvatar");
});
