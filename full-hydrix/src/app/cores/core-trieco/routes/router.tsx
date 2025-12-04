import { createBrowserRouter, Navigate } from "react-router-dom";
import { Admin } from "../../modules/admin/kernel/admin";
import { Client } from "@/modules/client/kernel/client";
import { AdminPanelView } from "@/modules/admin-panel/kernel/view";


export const Router = createBrowserRouter([
    {
        path: "",
        element: <Client />,
        children: [
            {
                path: 'registration',
                async lazy() {
                    const { Registration } = await import("@/modules/client/viewports/registration/registration")
                    return {
                        Component: Registration
                    }
                }
            },
            {
                path: 'registration',
                element: <Navigate to="/auth" replace />,
                async lazy() {
                    const { Auth } = await import("@/modules/admin/viewports/auth/auth")
                    return {
                        Component: Auth
                    }
                }
            },
            {
                path: 'auth',
                async lazy() {
                    const { Auth } = await import("@/modules/client/viewports/auth/auth")
                    return {
                        Component: Auth
                    }
                }
            },
            {
                path: 'registration/confirm',
                async lazy() {
                    const { EmailConfirm } = await import("@/modules/client/viewports/emal-confirm/email-confirm")
                    return {
                        Component: EmailConfirm
                    }
                }
            },
            {
                path: 'reset',
                async lazy() {
                    const { PasswordRecovery } = await import("@/modules/client/viewports/recovery-password/recovery")
                    return {
                        Component: PasswordRecovery
                    }
                }
            },
            {
                path: '',
                async lazy() {
                    const { ClientLayout } = await import("@/modules/client/components/client-layout")
                    return {
                        Component: ClientLayout
                    }
                },
                children: [
                    {
                        path: '',
                        async lazy() {
                            const { Main } = await import("@/modules/client/viewports/main/main")
                            return {
                                Component: Main
                            }
                        }

                    },
                    {
                        path: 'order/create',
                        async lazy() {
                            const { CreateOrder } = await import("@/modules/client/viewports/create-order/create-order")
                            return {
                                Component: CreateOrder
                            }
                        }
                    },
                    {
                        path: 'pickup/create',
                        async lazy() {
                            const { CreatePoint } = await import("@/modules/client/viewports/create-pickup-point/create-point")
                            return {
                                Component: CreatePoint
                            }
                        }
                    },
                    {
                        path: 'pickup/edit',
                        async lazy() {
                            const { EditPoint } = await import("@/modules/client/viewports/edit-point/edit-point")
                            return {
                                Component: EditPoint
                            }
                        }
                    },
                    {
                        path: 'orders',
                        async lazy() {
                            const { Orders } = await import("@/modules/client/viewports/orders/orders")
                            return {
                                Component: Orders
                            }
                        }
                    },
                    {
                        path: 'profile',
                        async lazy() {
                            const { Profile } = await import("@/modules/client/viewports/profile/profile")
                            return {
                                Component: Profile
                            }
                        }
                    },
                ]
            },
        ]
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'auth',
                element: <Navigate to="/auth" replace />,
                async lazy() {
                    const { AuthLayout } = await import("@/modules/admin/components/auth-layout")
                    return {
                        Component: AuthLayout
                    }
                },
                children: [
                    {
                        path: 'main',
                        async lazy() {
                            const { Main } = await import("@/modules/admin/viewports/main/main")
                            return {
                                Component: Main
                            }
                        }
                    },
                    {
                        path: '',
                        element: <Navigate to="/auth" replace />,
                        // async lazy() {
                        //     const { Auth } = await import("@/modules/admin/viewports/auth/auth")

                        //     return {
                        //         Component: Auth
                        //     }
                        // }
                    },
                ]
            },
            {
                path: '',
                async lazy() {
                    const { AdminLayout } = await import('@/modules/admin/components/admin-layout')
                    return {
                        Component: AdminLayout
                    }
                },
                children: [
                    {
                        path: 'sewers',
                        async lazy() {
                            const { SewerList } = await import("@/modules/admin/viewports/sewer-list/sewer-list")
                            return {
                                Component: SewerList
                            }
                        }
                    },
                    {
                        path: 'orders',
                        async lazy() {
                            const { OrderList } = await import("@/modules/admin/viewports/orders/order-list")
                            return {
                                Component: OrderList
                            }
                        }
                    },
                    {
                        path: 'Calendar',
                        async lazy() {
                            const { Calendar } = await import("@/modules/admin/viewports/calendar/calendar")
                            return {
                                Component: Calendar
                            }
                        }
                    },
                    {
                        path: 'statistics',
                        async lazy() {
                            const { Stats } = await import("@/modules/admin/viewports/stats/stats")
                            return {
                                Component: Stats
                            }
                        }
                    },
                    {
                        path: 'settings',
                        async lazy() {
                            const { Settings } = await import("@/modules/admin/viewports/settings/settings")
                            return {
                                Component: Settings
                            }
                        }
                    },
                    {
                        path: 'cash',
                        async lazy() {
                            const { CashAccount } = await import("@/modules/admin/viewports/cash-account/cash-account")
                            return {
                                Component: CashAccount
                            }
                        }
                    }
                ]
            },
        ]
    },
    {
        path: '/admin-panel',
        element: <AdminPanelView />,
        children: [
            {
                path: 'auth',
                async lazy() {
                    const { Auth } = await import("@/modules/admin-panel/viewports/auth/auth")
                    return {
                        Component: Auth
                    }
                }
            },
            {
                path: '',
                async lazy() {
                    const { AdminPanelLayout } = await import("@/modules/admin-panel/components/admin-panel-layout")
                    return {
                        Component: AdminPanelLayout
                    }
                },
                children: [
                    {
                        path: '',
                        async lazy() {
                            const { Users } = await import("@/modules/admin-panel/viewports/users/users")
                            return {
                                Component: Users
                            }
                        }
                    },
                    {
                        path: 'sewers',
                        async lazy() {
                            const { SewerList } = await import("@/modules/admin-panel/viewports/sewer-list/sewer-list")
                            return {
                                Component: SewerList
                            }
                        }
                    },
                    {
                        path: 'companies',
                        async lazy() {
                            const { Companies } = await import("@/modules/admin-panel/viewports/companies/companies")
                            return {
                                Component: Companies
                            }
                        }
                    },
                ]
            },
        ]
    }
]);
