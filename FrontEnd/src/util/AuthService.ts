// auth.service.ts
import { User } from "../entities/User";

export type Role = "ADMIN" | "MODERATOR" | "USER";

class AuthService {
  private currentUser: User | null;

  constructor() {
    const savedUser = sessionStorage.getItem('currentUser');
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  setUser(user: User | null): void {
    this.currentUser = user;
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getUserRole(): Role {
    if (!this.currentUser) return "USER";

    if (this.currentUser.isAdmin) {
      return "ADMIN";
    } else if (this.currentUser.isModerator) {
      return "MODERATOR";
    } else {
      return "USER";
    }
  }

  hasRole(requiredRoles: Role[] = []): boolean {
    if (!this.currentUser) return false;

    const currentRole = this.getUserRole();

    if (currentRole === "ADMIN") return true;
    if (requiredRoles.includes("MODERATOR") && currentRole === "MODERATOR") return true;
    if (requiredRoles.includes("USER") && currentRole === "USER") return true;

    return false;
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }
}

const authService = new AuthService();

export default authService;