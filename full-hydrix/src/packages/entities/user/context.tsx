import { createContext, useContext, useEffect, ReactNode } from "react";
import { userModel } from "../../features/user/user-god";
import { User, UserType } from "./type";
import { InitTriecoCompanyInterface, WaterCompany } from "../water-company/types";

interface AuthContextType {
    // Данные пользователя
    user: User | UserType | null;
    waterCompany: WaterCompany | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    triecoCompanyId: number | null;

    // Методы
    setUser: (user: User | UserType) => void;
    updateUser: (updates: Partial<User | UserType>) => void;
    initUser: () => Promise<void>;
    initCompany: (data: WaterCompany) => void;
    initTriecoCompany: (data: InitTriecoCompanyInterface) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // useEffect(() => {
    //     if (userModel.getToken()) {
    //         userModel.initUser();
    //     }
    // }, []);

    const value: AuthContextType = {
        // Данные
        user: userModel.user,
        waterCompany: userModel.waterCompany,
        isLoading: userModel.isLoading,
        error: userModel.error,
        isAuthenticated: userModel.isAuthenticated,

        // Методы
        triecoCompanyId: userModel.triecoCompanyId,
        setUser: userModel.setUser,
        updateUser: userModel.updateUser,
        initUser: userModel.initUser,
        initCompany: userModel.initCompany,
        initTriecoCompany: userModel.initTriecoCompany,
        logout: userModel.logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};