export class AppUser {
  name!: string;
  email!: string;
  password!: string;
  idToken: string = '';
  uId: string = '';
  isLoggedIn: boolean = false;
}
