import { createBrowserRouter, Navigate } from "react-router-dom";


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
            // {
            //     path: 'company/:companyId/stats/all',
            //     async lazy() {
            //         const { AllStats } = await import("@/modules/gis/pages/stats-all")
            //         return {
            //             Component: AllStats
            //         }
            //     },
            // },
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
                path: "passport",
                async lazy() {
                    const { PassportObject } = await import("@/modules/domain/pages/passport")
                    return {
                        Component: PassportObject
                    }
                },
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
                    const { Scheme } = await import("@/modules/dispatcher/pages/scheme-3d")
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
                path: "equipment",
                async lazy() {
                    const { EquipmentRegistry } = await import("@/modules/dispatcher/pages/equipment")
                    return {
                        Component: EquipmentRegistry
                    }
                },
            },
            {
                path: "equipment/create",
                async lazy() {
                    const { EquipmentCreate } = await import("@/modules/dispatcher/pages/equipment-create")
                    return {
                        Component: EquipmentCreate
                    }
                },
            },
            {
                path: "equipment-about",
                async lazy() {
                    const { EquipmentAbout } = await import("@/modules/dispatcher/pages/equipment-about")
                    return {
                        Component: EquipmentAbout
                    }
                },
                children: [
                    {
                        path: "passport/:id",
                        async lazy() {
                            const { EquipmentPassport } = await import("@/modules/dispatcher/pages/equipment-about/tabs/passport")
                            return {
                                Component: EquipmentPassport
                            }
                        }
                    },
                    {
                        path: "controll/:id",
                        async lazy() {
                            const { EquipmentControll } = await import("@/modules/dispatcher/pages/equipment-about/tabs/controll")
                            return {
                                Component: EquipmentControll
                            }
                        }
                    }
                ]
            },
            {
                path: "orders",
                async lazy() {
                    const { RequestRegistry } = await import("@/modules/dispatcher/pages/orders")
                    return {
                        Component: RequestRegistry
                    }
                },
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { RequestRegistryList } = await import("@/modules/dispatcher/pages/orders/tabs/list")
                            return {
                                Component: RequestRegistryList
                            }
                        },
                    },
                    {
                        path: "create",
                        async lazy() {
                            const { RequestRegistryForm } = await import("@/modules/dispatcher/pages/orders/tabs/form")
                            return {
                                Component: RequestRegistryForm
                            }
                        },
                        children: [
                            {
                                path: "form",
                                async lazy() {
                                    const { RequestForm } = await import("@/modules/dispatcher/pages/orders/tabs/form/tabs/request-form")
                                    return {
                                        Component: RequestForm
                                    }
                                },
                            },
                            {
                                path: "information",
                                async lazy() {
                                    const { RequestForm } = await import("@/modules/dispatcher/pages/orders/tabs/form/tabs/request-form")
                                    return {
                                        Component: RequestForm
                                    }
                                },
                            },
                            {
                                path: "tasks",
                                async lazy() {
                                    const { RequestForm } = await import("@/modules/dispatcher/pages/orders/tabs/form/tabs/request-form")
                                    return {
                                        Component: RequestForm
                                    }
                                },
                            },
                            {
                                path: "journal",
                                async lazy() {
                                    const { RequestForm } = await import("@/modules/dispatcher/pages/orders/tabs/form/tabs/request-form")
                                    return {
                                        Component: RequestForm
                                    }
                                },
                            },
                            {
                                path: "history",
                                async lazy() {
                                    const { RequestHistory } = await import("@/modules/dispatcher/pages/orders/tabs/form/tabs/request-history")
                                    return {
                                        Component: RequestHistory
                                    }
                                },
                            },
                        ]
                    }
                ]
            },
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
                        path: 'order/create',
                        async lazy() {
                            const { CreateOrder } = await import("@/modules/trieco/client/pages/create-order")
                            return {
                                Component: CreateOrder
                            }
                        }
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
                    //     ]
                    // },
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
            }
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
            // {
            // path: '403',
            // async lazy() {
            // const { Error500 } = await import("@/modules/errors/403")
            // return {
            // Component: Error500
            // }
            // }
            // }
        ]
    }

]);
