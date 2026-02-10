// components/objects-form/BasicInfoSection.tsx
import { ObjectStages, objectStagesLabels } from '@/packages/entities/object/config';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { observer } from 'mobx-react-lite';

interface Field {
    key: string;
    label: string;
    setter: (value: string & number & Date & ObjectStages) => void;
    type: 'text' | 'number' | 'date' | 'select';
    width: '1fr';
}

interface Props {
    fields: readonly Field[];
    model: Record<string, any>;
}

export const BasicInfoSection = observer(({ fields, model }: Props) => {
    return (
        <>
            {fields.map((field) =>
                field.type !== "select" ? (
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
                ) : (
                    <Selector
                        placeholder={field.label}
                        items={Object.values(ObjectStages).map((value: ObjectStages) => ({
                            value,
                            title: objectStagesLabels[value],
                        }))}
                        onSelect={(data) => field.setter(data.value)}
                    />
                ))}
        </>
    );
})
