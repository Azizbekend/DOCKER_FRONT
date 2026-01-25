import { Role } from "@/packages/entities/user/enums";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleGuard } from "@/packages/features/user/role-guard";

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        async lazy() {
            const { Layout } = await import("@/modules/auth/loyauts")
            return {
                Component: Layout
            }
        },

        children: [
            {
                index: true,
                async lazy() {
                    const { Login } = await import("@/modules/auth/pages/login")
                    return {
                        Component: Login
                    }
                }
            },
            {
                element: <RoleGuard roles={[Role.Admin, Role.Guest, Role.Client, Role.CompanyOperator, Role.Ministry, Role.WaterCompany]} />,
                children: [
                    {
                        path: '/menu-moduls',
                        async lazy() {
                            const { MenuModuls } = await import("@/modules/auth/pages/menu-moduls")
                            return {
                                Component: MenuModuls
                            }
                        }
                    },
                ]
            },
        ]
    },
    {
        element: <RoleGuard roles={[Role.Admin, Role.Guest, Role.Client, Role.CompanyOperator, Role.Ministry, Role.WaterCompany, Role.Sewer, Role.TransporterCompany, Role.Participant]} />,
        children: [
            {
                path: '/gis',
                async lazy() {
                    const { Layout } = await import("@/modules/gis/layout")
                    return {
                        Component: Layout
                    }
                },
                children: [
                    {
                        path: 'companies',
                        async lazy() {
                            const { CompanyList } = await import("@/modules/gis/pages/water-companies")
                            return {
                                Component: CompanyList
                            }
                        },
                    },
                    {
                        path: 'sewers',
                        async lazy() {
                            const { SewerList } = await import("@/modules/gis/pages/sewer-list")
                            return {
                                Component: SewerList
                            }
                        },
                    },
                    {
                        path: 'orders',
                        async lazy() {
                            const { OrderList } = await import("@/modules/gis/pages/orders")
                            return {
                                Component: OrderList
                            }
                        },

                    },
                    {
                        path: 'drain-stations',
                        async lazy() {
                            const { StationsList } = await import("@/modules/gis/pages/drain-stations")
                            return {
                                Component: StationsList
                            }
                        },
                    },
                    {
                        path: 'enterprises',
                        async lazy() {
                            const { EnterprisesList } = await import("@/modules/gis/pages/enterprises")
                            return {
                                Component: EnterprisesList
                            }
                        },
                    },
                    {
                        path: 'operators',
                        async lazy() {
                            const { Operators } = await import("@/modules/gis/pages/operators")
                            return {
                                Component: Operators
                            }
                        },
                    },
                    {
                        path: "company/:companyId",
                        async lazy() {
                            const { WaterCompany } = await import("@/modules/gis/pages/company")
                            return {
                                Component: WaterCompany
                            }
                        },
                    },
                    {
                        path: 'company/:companyId/stats/all',
                        async lazy() {
                            const { AllStats } = await import("@/modules/gis/pages/stats-all")
                            return {
                                Component: AllStats
                            }
                        },
                    },
                    // {
                    //     path: 'company/:companyId/stats/transportation',
                    //     async lazy() {
                    //         const { TransportationStats } = await import("@/modules/gis/pages/stats-transportation")
                    //         return {
                    //             Component: TransportationStats
                    //         }
                    //     },
                    // },
                    {
                        path: 'company/:companyId/stats/recycling',
                        async lazy() {
                            const { RecyclingStats } = await import("@/modules/gis/pages/stats-recycling")
                            return {
                                Component: RecyclingStats
                            }
                        },
                    },
                    {
                        path: 'company/:companyId/stats',
                        async lazy() {
                            const { Stats } = await import("@/modules/gis/pages/stats/stats.tsx")
                            return {
                                Component: Stats
                            }
                        },
                    },
                    {
                        path: 'enterprise/enterpriseId',
                        async lazy() {
                            const { Enterprise } = await import("@/modules/gis/pages/enterprise")
                            return {
                                Component: Enterprise
                            }
                        },
                    },
                ]
            },
            {
                path: '/domain',
                async lazy() {
                    const { Layout } = await import("@/modules/domain/layout")
                    return {
                        Component: Layout
                    }
                },
                children: [
                    {
                        path: ":page",
                        async lazy() {
                            const { RegistryObjectsLayout } = await import("@/modules/domain/pages/registry-objects")
                            return {
                                Component: RegistryObjectsLayout
                            }
                        },
                    },
                    {
                        path: "passport/:objectId",
                        async lazy() {
                            const { PassportObject } = await import("@/modules/domain/pages/passport")
                            return {
                                Component: PassportObject
                            }
                        },
                        children: [
                            {
                                path: "information",
                                async lazy() {
                                    const { PassportInformation } = await import("@/modules/domain/pages/passport/pages/information")
                                    return {
                                        Component: PassportInformation
                                    }
                                },
                            },
                            {
                                path: "participants",
                                async lazy() {
                                    const { PassportParticipants } = await import("@/modules/domain/pages/passport/pages/participants")
                                    return {
                                        Component: PassportParticipants
                                    }
                                },
                            },
                            {
                                path: "hardwares",
                                children: [
                                    {
                                        index: true,
                                        async lazy() {
                                            const { HardwareRegistry } = await import("@/modules/domain/pages/passport/pages/hardwares")
                                            return {
                                                Component: HardwareRegistry
                                            }
                                        },
                                    },
                                    {
                                        path: ":id",
                                        async lazy() {
                                            const { HardwareInformation } = await import("@/modules/domain/pages/passport/pages/hardware")
                                            return {
                                                Component: HardwareInformation
                                            }
                                        },
                                        children: [
                                            {
                                                index: true,
                                                async lazy() {
                                                    const { HardwareInformationPassport } = await import("@/modules/domain/pages/passport/pages/hardware/hardware-passport")
                                                    return {
                                                        Component: HardwareInformationPassport
                                                    }
                                                },
                                            },
                                            {
                                                path: "logs",
                                                async lazy() {
                                                    const { HardwareInformationLogs } = await import("@/modules/domain/pages/passport/pages/hardware/hardware-logs")
                                                    return {
                                                        Component: HardwareInformationLogs
                                                    }
                                                },
                                            }
                                        ]
                                    },
                                    {
                                        path: "form",
                                        async lazy() {
                                            const { HardwareForm } = await import("@/modules/domain/pages/passport/pages/hardware-form")
                                            return {
                                                Component: HardwareForm
                                            }
                                        },
                                    },
                                ]
                            },
                            {
                                path: "incident",
                                async lazy() {
                                    const { Incident } = await import("@/modules/domain/pages/passport/pages/incident")
                                    return {
                                        Component: Incident
                                    }
                                },
                            },
                            {
                                path: "documentation",
                                async lazy() {
                                    const { PassportDocumentation } = await import("@/modules/domain/pages/passport/pages/documentation")
                                    return {
                                        Component: PassportDocumentation
                                    }
                                },
                            },
                        ]
                    },
                ]
            },
            {
                path: '/dispatcher',
                async lazy() {
                    const { Layout } = await import("@/modules/dispatcher/layout")
                    return {
                        Component: Layout
                    }
                },
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { Scheme } = await import("@/modules/dispatcher/pages/scheme")
                            return {
                                Component: Scheme
                            }
                        },
                    },
                    {
                        path: 'helper',
                        async lazy() {
                            const { Helper } = await import("@/modules/dispatcher/pages/helper")
                            return {
                                Component: Helper
                            }
                        }
                    },
                    {
                        path: "timmodel",
                        async lazy() {
                            const { TimModel } = await import("@/modules/dispatcher/pages/tim-model")
                            return {
                                Component: TimModel
                            }
                        },
                    },
                    {
                        path: "video-surveillance",
                        async lazy() {
                            const { VideoSurveillance } = await import("@/modules/dispatcher/pages/video-surveillance")
                            return {
                                Component: VideoSurveillance
                            }
                        },
                    },
                    {
                        path: "hardware",
                        async lazy() {
                            const { HardwareRegistry } = await import("@/modules/dispatcher/pages/hardware-list")
                            return {
                                Component: HardwareRegistry
                            }
                        },
                    },
                    {
                        path: "hardware/form/:id?",
                        async lazy() {
                            const { HardwareForm } = await import("@/modules/dispatcher/pages/hardware-form")
                            return {
                                Component: HardwareForm
                            }
                        },
                    },
                    {
                        path: "hardware-about/:id/:tab",
                        async lazy() {
                            const { HardwareAbout } = await import("@/modules/dispatcher/pages/hardware-about")
                            return {
                                Component: HardwareAbout
                            }
                        },
                    },
                    {
                        path: "services",
                        async lazy() {
                            const { RequestRegistry } = await import("@/modules/dispatcher/pages/services/layout")
                            return {
                                Component: RequestRegistry
                            }
                        },
                        children: [
                            {
                                index: true,
                                async lazy() {
                                    const { RequestRegistryList } = await import("@/modules/dispatcher/pages/services/services-list")
                                    return {
                                        Component: RequestRegistryList
                                    }
                                },
                            },
                            {
                                path: "form",
                                async lazy() {
                                    const { RequestRegistryForm } = await import("@/modules/dispatcher/pages/services/service-form")
                                    return {
                                        Component: RequestRegistryForm
                                    }
                                },
                            }
                        ]
                    },
                    {
                        path: "stages",
                        async lazy() {
                            const { Stages } = await import("@/modules/dispatcher/pages/stages")
                            return {
                                Component: Stages
                            }
                        },
                    },
                    {
                        path: "incident",
                        async lazy() {
                            const { Incident } = await import("@/modules/dispatcher/pages/incident")
                            return {
                                Component: Incident
                            }
                        },
                    },
                    {
                        path: "sensor/form",
                        async lazy() {
                            const { SensorForm } = await import("@/modules/dispatcher/pages/sensor-form")
                            return {
                                Component: SensorForm
                            }
                        },
                    }
                ]
            },
            {
                path: '/trieco',
                children: [
                    {
                        path: "client",
                        async lazy() {
                            const { ClientLayout } = await import("@/modules/trieco/client/layout")
                            return {
                                Component: ClientLayout
                            }
                        },
                        children: [
                            {
                                path: '',
                                async lazy() {
                                    const { Main } = await import("@/modules/trieco/client/pages/main")
                                    return {
                                        Component: Main
                                    }
                                }

                            },
                            {
                                path: 'order/create/:tab',
                                async lazy() {
                                    const { CreateOrder } = await import("@/modules/trieco/client/pages/create-order")
                                    return {
                                        Component: CreateOrder
                                    }
                                },
                            },
                            {
                                path: 'pickup/create',
                                async lazy() {
                                    const { CreatePoint } = await import("@/modules/trieco/client/pages/create-point/")
                                    return {
                                        Component: CreatePoint
                                    }
                                }
                            },
                            {
                                path: 'pickup/edit',
                                async lazy() {
                                    const { EditPoint } = await import("@/modules/trieco/client/pages/edit-point/")
                                    return {
                                        Component: EditPoint
                                    }
                                }
                            },
                            {
                                path: 'orders',
                                async lazy() {
                                    const { Orders } = await import("@/modules/trieco/client/pages/orders")
                                    return {
                                        Component: Orders
                                    }
                                }
                            },
                            {
                                path: 'profile',
                                async lazy() {
                                    const { Profile } = await import("@/modules/trieco/client/pages/profile")
                                    return {
                                        Component: Profile
                                    }
                                }
                            },
                        ]
                    },
                    {
                        path: 'admin',
                        async lazy() {
                            const { AdminLayout } = await import('@/modules/trieco/admin/components/admin-layout')
                            return {
                                Component: AdminLayout
                            }
                        },
                        children: [

                            {
                                index: true,
                                async lazy() {
                                    const { SewerList } = await import("@/modules/trieco/admin/pages/sewer-list/sewer-list")
                                    return {
                                        Component: SewerList
                                    }
                                }
                            },
                            {
                                path: 'orders',
                                async lazy() {
                                    const { OrderList } = await import("@/modules/trieco/admin/pages/orders/order-list")
                                    return {
                                        Component: OrderList
                                    }
                                }
                            },
                            {
                                path: 'Calendar',
                                async lazy() {
                                    const { Calendar } = await import("@/modules/trieco/admin/pages/calendar/calendar")
                                    return {
                                        Component: Calendar
                                    }
                                }
                            },
                            {
                                path: 'statistics',
                                async lazy() {
                                    const { Stats } = await import("@/modules/trieco/admin/pages/stats/stats")
                                    return {
                                        Component: Stats
                                    }
                                }
                            },
                            {
                                path: 'settings',
                                async lazy() {
                                    const { Settings } = await import("@/modules/trieco/admin/pages/settings/settings")
                                    return {
                                        Component: Settings
                                    }
                                }
                            },
                            {
                                path: 'cash',
                                async lazy() {
                                    const { CashAccount } = await import("@/modules/trieco/admin/pages/cash-account/cash-account")
                                    return {
                                        Component: CashAccount
                                    }
                                }
                            }
                        ]
                    },
                    {
                        path: 'admin-panel',
                        async lazy() {
                            const { AdminPanelLayout } = await import('@/modules/trieco/admin-panel/components/admin-panel-layout')
                            return {
                                Component: AdminPanelLayout
                            }
                        },
                        children: [
                            {
                                index: true,
                                async lazy() {
                                    const { Users } = await import("@/modules/trieco/admin-panel/pages/users/users")
                                    return {
                                        Component: Users
                                    }
                                }
                            },
                            {
                                path: 'sewers',
                                async lazy() {
                                    const { SewerList } = await import("@/modules/trieco/admin-panel/pages/sewer-list/sewer-list")
                                    return {
                                        Component: SewerList
                                    }
                                }
                            },
                            //                 {
                            //                     path: 'companies',
                            //                     async lazy() {
                            //                         const { Companies } = await import("@/modules/trieco/admin-panel/viewports/companies/companies")
                            //                         return {
                            //                             Component: Companies
                            //                         }
                            //                     }
                            //                 },
                            //             ]
                            //         },
                        ]
                    },
                    // {
                    //     path: "mobile",
                    //     async lazy() {
                    //         const { Mobile } = await import('@/modules/trieco/mobile/kernel/mobile')
                    //         return {
                    //             Component: Mobile
                    //         }
                    //     },
                    //     children: [
                    //         // {
                    //         //     path: 'registration',
                    //         //     async lazy() {
                    //         //         const { Registration } = await import("@/modules/trieco/mobile/pages/registration/registration")
                    //         //         return {
                    //         //             Component: Registration
                    //         //         }
                    //         //     }
                    //         // },
                    //         // {
                    //         //     path: 'auth',
                    //         //     async lazy() {
                    //         //         const { Auth } = await import("@/modules/trieco/mobile/pages/auth/auth")
                    //         //         return {
                    //         //             Component: Auth
                    //         //         }
                    //         //     }
                    //         // },
                    //         // {
                    //         //     path: 'registration/confirm',

                    //         //     async lazy() {
                    //         //         const { EmailConfirm } = await import("@/modules/trieco/mobile/pages/emal-confirm/email-confirm")
                    //         //         return {
                    //         //             Component: EmailConfirm
                    //         //         }
                    //         //     }
                    //         // },
                    //         {
                    //             path: '',
                    //             async lazy() {
                    //                 const { MobileLayout } = await import("@/modules/trieco/mobile/components/mobile-layout")
                    //                 return {
                    //                     Component: MobileLayout
                    //                 }
                    //             },
                    //             children: [
                    //                 {
                    //                     path: '',
                    //                     async lazy() {
                    //                         const { Main } = await import("@/modules/trieco/mobile/pages/main/main")
                    //                         return {
                    //                             Component: Main
                    //                         }
                    //                     }
                    //                 },
                    //                 // {
                    //                 //     path: 'order/create',
                    //                 //     async lazy() {
                    //                 //         const { CreateOrder } = await import("@/modules/trieco/mobile/pages/create-order/create-order")
                    //                 //         return {
                    //                 //             Component: CreateOrder
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'pickup/create',
                    //                 //     async lazy() {
                    //                 //         const { CreatePoint } = await import("@/modules/trieco/mobile/pages/create-pickup-point/create-point")
                    //                 //         return {
                    //                 //             Component: CreatePoint
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'pickup/edit',
                    //                 //     async lazy() {
                    //                 //         const { EditPoint } = await import("@/modules/trieco/mobile/pages/edit-point/edit-point")
                    //                 //         return {
                    //                 //             Component: EditPoint
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'orders',
                    //                 //     async lazy() {
                    //                 //         const { Orders } = await import("@/modules/trieco/mobile/pages/orders/orders")
                    //                 //         return {
                    //                 //             Component: Orders
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'order/:id',
                    //                 //     async lazy() {
                    //                 //         const { Order } = await import("@/modules/trieco/mobile/pages/order/order")
                    //                 //         return {
                    //                 //             Component: Order
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'profile',
                    //                 //     async lazy() {
                    //                 //         const { Profile } = await import("@/modules/trieco/mobile/pages/profile/profile")
                    //                 //         return {
                    //                 //             Component: Profile
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //                 // {
                    //                 //     path: 'notification',
                    //                 //     async lazy() {
                    //                 //         const { Notifications } = await import("@/modules/trieco/mobile/pages/notifications/notification")
                    //                 //         return {
                    //                 //             Component: Notifications
                    //                 //         }
                    //                 //     }
                    //                 // },
                    //             ]
                    //         },
                    //     ]
                    // },
                ]
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/error/404" replace />
    },
    {
        path: '/error',
        async lazy() {
            const { Layout } = await import("@/modules/errors/layout")
            return {
                Component: Layout
            }
        },
        children: [
            {
                path: '404',
                async lazy() {
                    const { Error404 } = await import("@/modules/errors/404")
                    return {
                        Component: Error404
                    }
                }
            },
            {
                path: '403',
                async lazy() {
                    const { Error403 } = await import("@/modules/errors/403")
                    return {
                        Component: Error403
                    }
                }
            }
        ]
    }
]);
