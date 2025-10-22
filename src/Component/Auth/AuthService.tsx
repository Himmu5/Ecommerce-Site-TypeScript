import { loginUser, refreshToken, getUserById, createUser } from '../Api';
import { AuthResponse, User } from '../CommenType/Types';

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private token: string | null = null;

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.currentUser = JSON.parse(userStr);
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      if (this.currentUser) {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    }
  }

  private clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  public async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await loginUser(username, password);
      const authData: AuthResponse = response.data;
      
      this.token = authData.token;
      this.currentUser = {
        id: authData.id,
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        username: authData.username,
        image: authData.image,
        gender: authData.gender,
        // Set default values for required fields
        age: 0,
        phone: '',
        password: '',
        birthDate: '',
        bloodGroup: '',
        height: 0,
        weight: 0,
        eyeColor: '',
        hair: { color: '', type: '' },
        domain: '',
        ip: '',
        address: {
          address: '',
          city: '',
          coordinates: { lat: 0, lng: 0 },
          postalCode: '',
          state: ''
        },
        macAddress: '',
        university: '',
        bank: {
          cardExpire: '',
          cardNumber: '',
          cardType: '',
          currency: '',
          iban: ''
        },
        company: {
          department: '',
          name: '',
          title: '',
          address: {
            address: '',
            city: '',
            coordinates: { lat: 0, lng: 0 },
            postalCode: '',
            state: ''
          }
        },
        ein: '',
        ssn: '',
        userAgent: ''
      };
      
      this.saveToStorage();
      return authData;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  public async register(userData: Partial<User>): Promise<User> {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  public async refreshAuthToken(): Promise<boolean> {
    if (!this.token) return false;
    
    try {
      const response = await refreshToken(this.token);
      this.token = response.data.token;
      this.saveToStorage();
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  public logout(): void {
    this.currentUser = null;
    this.token = null;
    this.clearStorage();
  }

  public isAuthenticated(): boolean {
    return !!this.token && !!this.currentUser;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    return this.token;
  }

  public async updateUser(userData: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    try {
      const response = await getUserById(this.currentUser.id.toString());
      const updatedUser = { ...response.data, ...userData };
      this.currentUser = updatedUser;
      this.saveToStorage();
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
}

export default AuthService.getInstance();
