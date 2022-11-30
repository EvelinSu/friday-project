import {
    authReducer,
    changeUserProfileTC,
    setIsLoggedIn,
    setRegisterUserData,
    setUserData,
    TAuth,
} from "../bll/authReducer";

let startState = {} as TAuth;

beforeEach(() => {
    startState = {
        userData: {
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

    expect(endState.userData.id).toBe("1");
    expect(endState.userData.name).toBe("test");
    expect(endState.userData.email).toBe("emailTest");
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

    expect(endState.userData.name).toBe("myTestName");
    expect(endState.userData.avatar).toBe("newAvatar");
});
