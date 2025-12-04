import { Mobile } from "@/modules/mobile/kernel/mobile";
import { createBrowserRouter } from "react-router-dom";

export const MobileRouter = createBrowserRouter([
    {
        path: "",
        element: <Mobile />,
        children: [
            {
                path: 'registration',
                async lazy() {
                    const { Registration } = await import("@/modules/mobile/viewports/registration/registration")
                    return {
                        Component: Registration
                    }
                }
            },
            {
                path: 'auth',
                async lazy() {
                    const { Auth } = await import("@/modules/mobile/viewports/auth/auth")
                    return {
                        Component: Auth
                    }
                }
            },
            {
                path: 'registration/confirm',

                async lazy() {
                    const { EmailConfirm } = await import("@/modules/mobile/viewports/emal-confirm/email-confirm")
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
                    const { MobileLayout } = await import("@/modules/mobile/components/mobile-layout")
                    return {
                        Component: MobileLayout
                    }
                },
                children: [
                    {
                        path: '',
                        async lazy() {
                            const { Main } = await import("@/modules/mobile/viewports/main/main")
                            return {
                                Component: Main
                            }
                        }
                    },
                    {
                        path: 'order/create',
                        async lazy() {
                            const { CreateOrder } = await import("@/modules/mobile/viewports/create-order/create-order")
                            return {
                                Component: CreateOrder
                            }
                        }
                    },
                    {
                        path: 'pickup/create',
                        async lazy() {
                            const { CreatePoint } = await import("@/modules/mobile/viewports/create-pickup-point/create-point")
                            return {
                                Component: CreatePoint
                            }
                        }
                    },
                    {
                        path: 'pickup/edit',
                        async lazy() {
                            const { EditPoint } = await import("@/modules/mobile/viewports/edit-point/edit-point")
                            return {
                                Component: EditPoint
                            }
                        }
                    },
                    {
                        path: 'orders',
                        async lazy() {
                            const { Orders } = await import("@/modules/mobile/viewports/orders/orders")
                            return {
                                Component: Orders
                            }
                        }
                    },
                    {
                        path: 'order/:id',
                        async lazy() {
                            const { Order } = await import("@/modules/mobile/viewports/order/order")
                            return {
                                Component: Order
                            }
                        }
                    },
                    {
                        path: 'profile',
                        async lazy() {
                            const { Profile } = await import("@/modules/mobile/viewports/profile/profile")
                            return {
                                Component: Profile
                            }
                        }
                    },
                    {
                        path: 'notification',
                        async lazy() {
                            const { Notifications } = await import("@/modules/mobile/viewports/notifications/notification")
                            return {
                                Component: Notifications
                            }
                        }
                    },
                ]
            },
        ]
    },
]);
