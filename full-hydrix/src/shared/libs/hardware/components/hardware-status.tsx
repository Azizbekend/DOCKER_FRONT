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

export const getHardwareStatus = ({ status, incidentCount, className }: {
  status: boolean,
  incidentCount: number,
  className?: {
    container?: string,
  }
}) => {
  let typeStatus: string = "";
  if (incidentCount > 0) typeStatus = "incident"
  else if (status) typeStatus = "waiting"
  else typeStatus = "works"
  
  const dataStatus: { color: string, text: string } = getStatusData(typeStatus)

  return (
    <div className={`flex items-center gap-2 rounded-lg ${className?.container}`}>
      <div className={`w-3 h-3 rounded-full  ${dataStatus?.color}`}></div>
      <span className="font-medium text-gray-800">{dataStatus?.text}</span>
    </div>
  )
}


const getStatusData = (status: string): { color: string; text: string } => {
  switch (status) {
    case "incident":
      return { color: "bg-red-500", text: "Авария" }
    case "works":
      return { color: "bg-green-500", text: "Работает" }
    default:
      return { color: "bg-gray-500", text: "Ожидании" };
  }
}