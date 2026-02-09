// components/objects-form/CoordinatesSection.tsx
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observer } from 'mobx-react-lite';

interface Field {
    key: 'latitude' | 'longitude';
    label: string;
    setter: (value: string) => void;
    type: 'text';
    width: '0.5fr';
}

interface Props {
    fields: readonly Field[];
    model: Record<string, any>;
}

export const CoordinatesSection = observer(({ fields, model }: Props) => {
    return (
        <div className="flex gap-10">
            {fields.map((field) => (
                <InputContainer
                    key={field.key}
                    headerText={field.label}
                    classNames={{ wrapper: 'w-[50%]' }}
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
        </div>
    );
})
