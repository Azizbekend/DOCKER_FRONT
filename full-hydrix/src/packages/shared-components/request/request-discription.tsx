interface Props {
  description: string;
  isCancelled?: boolean;
  className?: string;
}

export const RequestDescription = ({ description, isCancelled, className }: Props) => {
  const hasAttention = description.includes('Внимание!');

  const bgColor = hasAttention ? 'bg-red-50' : (isCancelled ? 'bg-red-50' : 'bg-green-50');
  const borderColor = hasAttention ? 'border-red-200' : (isCancelled ? 'border-red-200' : 'border-green-200');
  const titleColor = hasAttention ? 'text-red-700' : (isCancelled ? 'text-red-700' : 'text-green-700');
  const textColor = hasAttention ? 'text-red-800' : (isCancelled ? 'text-red-800' : 'text-green-800');

  const headerText = isCancelled ? 'Причина отмены' : 'Результат';

  return (
    <div
      className={`
        p-2 rounded-md border
        ${bgColor} ${borderColor}
        ${className || ''}
      `}
    >
      <div className={`text-xs font-medium uppercase tracking-wide mb-0.5 ${titleColor}`}>
        {headerText}
      </div>
      <p className={`text-xs leading-relaxed ${textColor}`}>
        {description}
      </p>
    </div>
  );
};
