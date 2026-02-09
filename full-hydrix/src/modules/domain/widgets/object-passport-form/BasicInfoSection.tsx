// components/objects-form/BasicInfoSection.tsx
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observer } from 'mobx-react-lite';

interface Field {
    key: string;
    label: string;
    setter: (value: string) => void;
    type: 'text' | 'number';
    width: '1fr';
}

interface Props {
    fields: readonly Field[];
    model: Record<string, any>;
}

export const BasicInfoSection = observer(({ fields, model }: Props) => {
    return (
        <>
            {fields.map((field) => (
                <InputContainer
                    key={field.key}
                    headerText={field.label}
                    classNames={{ wrapper: 'w-full' }}
                    isRequired
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type={field.type}
                            placeholder={field.label}
                            value={model[field.key]}
                            onChange={(e) => field.setter(e)}
                        />
                    }
                />
            ))}
        </>
    );
})
