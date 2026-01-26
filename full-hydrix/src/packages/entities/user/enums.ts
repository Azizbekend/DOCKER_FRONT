export enum Role {
    CompanyOperator = 3, // Перевозчик за триеко
    WaterCompany = 4, // Водоканал
    CompanytClient = 5, // Предприятие
    Ministry = 6, // Министр
    WaterCompanyOperator = 7, // Оператор водоканала
    WaterCompanyAdmin = 77, // Оператор водоканала
    Plant = 0, // Оператор водоканала
    TreatmentPlantOperator = 8, // Оператор очистного сооружения
    Admin = 5, // Админ
    Guest = 99999, // Гость


    // BASE ROLES - базовые роли
    Client = 1, //Обычный клиент
    Sewer = 2, // Ассенизатор
    TransporterCompany = 3, // Траспортная компания
    Participant = 4 // Участник
}