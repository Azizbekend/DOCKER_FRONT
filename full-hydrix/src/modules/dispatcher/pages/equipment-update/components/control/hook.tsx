// hooks/useControl.ts
import { useState } from 'react';
import { ControlType } from './type';

export const useControl = () => {
    const [control, setControl] = useState<ControlType[]>([
        {
            id: '1',
            name: '',
            mesurement: '',
            plcNodeid: '',
            isValue: true,
            isInfo: false,
        }
    ]);

    const add = () => {
        const newCharacteristic: ControlType = {
            id: Date.now().toString(),
            name: '',
            mesurement: '',
            plcNodeid: '',
            isValue: true,
            isInfo: false,
        };
        setControl(prev => [...prev, newCharacteristic]);
    };

    const remove = (id: string) => {
        if (control.length <= 1) {
            return;
        }
        setControl(prev => prev.filter(item => item.id !== id));
    };

    const updateName = (id: string, name: string) => {
        setControl(prev =>
            prev.map(item =>
                item.id === id ? { ...item, name } : item
            )
        );
    };

    const updateMesurement = (id: string, mesurement: string) => {
        setControl(prev =>
            prev.map(item =>
                item.id === id ? { ...item, mesurement } : item
            )
        );
    };

    const updateIsValue = (id: string, isValue: boolean) => {
        setControl(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isValue } : item
            )
        );
    };

    const updateIsInfo = (id: string, isInfo: boolean) => {
        setControl(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isInfo } : item
            )
        );
    };

    const updatePlcNodeid = (id: string, plcNodeid: string) => {
        setControl(prev =>
            prev.map(item =>
                item.id === id ? { ...item, plcNodeid } : item
            )
        );
    };

    const getList = () => {
        return control.filter(char => char.name.trim() !== '' && char.mesurement.trim() !== '' && char.plcNodeid.trim() != "");
    };

    const reset = () => {
        setControl([{ id: '1', name: '', mesurement: "", plcNodeid: '', isValue: true, isInfo: false, }]);
    };

    return {
        control,
        updateIsInfo,
        add,
        remove,
        updateName,
        updateIsValue,
        updateMesurement,
        updatePlcNodeid,
        getList,
        reset,
    };
};