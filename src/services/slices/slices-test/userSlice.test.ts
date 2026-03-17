import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  updateUser
} from "../userSlice";

import { TUser } from "@utils-types";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

describe("userSlice", () => {
  const user: TUser = {
    email: "test@example.com",
    name: "Test User"
  };

  it("pending: registerUser → isLoading=true", () => {
    const s = reducer(undefined, registerUser.pending("", { email: '', password: '', name: '' }));
    expect(s.isLoading).toBe(true);
    expect(s.error).toBeNull();
  });

  it("fulfilled: registerUser → user записан", () => {
    const s = reducer(undefined, registerUser.fulfilled(user, "", { email: '', password: '', name: '' }));
    expect(s.user).toEqual(user);
    expect(s.isAuthChecked).toBe(true);
    expect(s.isLoading).toBe(false);
  });

  it("rejected: registerUser → error", () => {
    const error = new Error("fail");
    const s = reducer(undefined, registerUser.rejected(error, "", { email: '', password: '', name: '' }));
    expect(s.error).toBe("fail");
  });

  it("loginUser.fulfilled обновляет user", () => {
    const s = reducer(undefined, loginUser.fulfilled(user, "", { email: '', password: '' }));
    expect(s.user).toEqual(user);
  });

  it("logoutUser.fulfilled очищает user", () => {
    const prev: TUserState = {
      user,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };

    const s = reducer(prev, logoutUser.fulfilled(undefined, ""));
    expect(s.user).toBeNull();
  });

  it("checkUserAuth.fulfilled пишет user", () => {
    const s = reducer(undefined, checkUserAuth.fulfilled(user, "", undefined));
    expect(s.user).toEqual(user);
    expect(s.isAuthChecked).toBe(true);
  });

  it("updateUser.fulfilled обновляет user", () => {
    const prev: TUserState = {
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };

    const s = reducer(prev, updateUser.fulfilled(user, "", { name: '', email: '' }));
    expect(s.user).toEqual(user);
  });
});
