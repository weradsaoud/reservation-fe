export class AppUser {
  name!: string;
  email!: string;
  password!: string;
  idToken: string = '';
  isLoggedIn: boolean = false;
}
