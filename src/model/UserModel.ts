export interface IUserData {
  name: string;
}

export interface IUserModel {
  get userName(): string | null;
  get userData(): IUserData | null;
  get isAuthenticated(): boolean;
  setupUser(userData: any): void;
}

class UserModel implements IUserModel {

  static _instance: IUserModel = new UserModel();
  static getInstance(): IUserModel { return UserModel._instance; }

  private _userData: IUserData | undefined;

  constructor() {
    if (UserModel._instance) throw new Error('This is singleton');
    if (this.isAuthenticated) {
      this._userData = JSON.parse(localStorage.getItem('user-data')!) as IUserData;
    }
  }

  get userName(): string | null {
    return this._userData?.name || null;
  }

  get userData(): IUserData | null {
    return this._userData || null;
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('user-data');
  }

  setupUser(userData: IUserData): void {
    this._userData = userData as IUserData;
    localStorage.setItem('user-data', JSON.stringify(userData));
  }
}

const userModel = UserModel.getInstance();

export default userModel;