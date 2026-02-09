// components/objects-form/ParametersSection.tsx
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

interface Field {
    key: string;
    label: string;
    setter: (value: number) => void;
    type: 'number';
    width: '0.5fr';
}

interface Props {
    title: string;
    fields: readonly Field[];
    model: Record<string, any>;
    columns?: number;
}

export const ParametersSection = observer(
    ({ title, fields, model, columns }: Props) => {
        return (
            <>
                <p className="mt-10 text-lg mb-3 font-bold pt-5 border-t border-gray-500">{title}</p>
                <div className={`grid `}
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: "10px",
                    }}
                >
                    {fields.map((field) => (
                        <InputContainer
                            key={field.key}
                            headerText={field.label}
                            isRequired
                            classNames={{
                                header: 'text-sm font-regular',
                            }}
                            children={
                                <Input
                                    className="border-[1.5px] px-3 py-3 rounded-lg"
                                    type={field.type}
                                    placeholder={field.label}
                                    value={model[field.key] || ""}
                                    onChange={(e) => field.setter(e)}
                                />
                            }
                        />
                    ))}
                </div>
            </>
        );
    }

)