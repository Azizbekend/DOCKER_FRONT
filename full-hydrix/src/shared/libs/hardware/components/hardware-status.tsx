export const getStatusBadge = (activatedAt: string) => {
  if (activatedAt === "0001-01-01T00:00:00") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        Не активировано
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
      Активировано
    </span>
  );
};




export const getHardwareStatus = (status: boolean, incidentCount: number) => {
  if (incidentCount > 0) {
    return (
      <>
        <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
        <span className="font-medium text-gray-800">Авария</span>
      </>
    )
    return
  } else {
    return (
      <>
        <div className={`w-3 h-3 rounded-full ${status ? "bg-gray-500" : "bg-green-500"}`}></div>
        <span className="font-medium text-gray-800">{status ? "Ожидании" : "Работает"}</span>
      </>
    )
  }
}
