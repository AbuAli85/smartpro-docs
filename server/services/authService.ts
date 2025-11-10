/**
 * Authentication Service
 * Handles user registration, login, and JWT token management
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient: PC } = require("@prisma/client");
  prisma = new PC();
} catch (error) {
  console.warn("Prisma client not available");
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: string; // provider, client, admin
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = "24h";
const REFRESH_TOKEN_EXPIRY = "7d";

export class AuthService {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          role: input.role || "provider",
          password: hashedPassword,
        },
      });

      // Create notification preferences
      await prisma.notificationPreferences.create({
        data: {
          userId: user.id,
        },
      });

      // Generate tokens
      const token = this.generateToken(user.id, user.email, user.role);
      const refreshToken = this.generateRefreshToken(user.id);

      console.log(`User registered: ${user.email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
        refreshToken,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(input.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }

      // Generate tokens
      const token = this.generateToken(user.id, user.email, user.role);
      const refreshToken = this.generateRefreshToken(user.id);

      console.log(`User logged in: ${user.email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
        refreshToken,
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || "refresh-secret"
      ) as { userId: string };

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Generate new access token
      const token = this.generateToken(user.id, user.email, user.role);

      return { token };
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Invalid refresh token");
    }
  }

  /**
   * Verify token
   */
  verifyToken(token: string): { userId: string; email: string; role: string } {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      ) as { userId: string; email: string; role: string };
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  /**
   * Generate JWT token
   */
  private generateToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: TOKEN_EXPIRY }
    );
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET || "refresh-secret",
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    data: { name?: string; email?: string }
  ) {
    try {
      // Check if new email is already taken
      if (data.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (existingUser && existingUser.id !== userId) {
          throw new Error("Email already in use");
        }
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    try {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Verify old password
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!passwordMatch) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      console.log(`Password changed for user: ${user.email}`);

      return { success: true };
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Don't reveal if user exists
        return { success: true };
      }

      // Generate reset token (valid for 1 hour)
      const resetToken = jwt.sign(
        { userId: user.id, type: "password-reset" },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      // In production, send email with reset link
      console.log(`Password reset requested for: ${email}`);
      console.log(`Reset token: ${resetToken}`);

      return { success: true };
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(resetToken: string, newPassword: string) {
    try {
      // Verify reset token
      const decoded = jwt.verify(
        resetToken,
        process.env.JWT_SECRET || "secret"
      ) as { userId: string; type: string };

      if (decoded.type !== "password-reset") {
        throw new Error("Invalid reset token");
      }

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      // Update password
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword },
      });

      console.log(`Password reset for user: ${user.email}`);

      return { success: true };
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(limit: number = 50, offset: number = 0) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      });

      const total = await prisma.user.count();

      return { users, total };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string) {
    try {
      // Delete related data
      await prisma.notificationPreferences.deleteMany({
        where: { userId },
      });

      await prisma.notification.deleteMany({
        where: { userId },
      });

      // Delete user
      await prisma.user.delete({
        where: { id: userId },
      });

      console.log(`User deleted: ${userId}`);

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default AuthService;
