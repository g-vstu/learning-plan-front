import { useEffect, useState } from 'react';

export const useEditMode = <T>(data: T) => {
    const [editMode, setEditMode] = useState(false);
    const [entityData, setEntityData] = useState(data);
    const [isCanceledState, setIsCanceledState] = useState(false);

    useEffect(() => {
        setEntityData(data);
    }, [data]);

    useEffect(() => {
        setEntityData(data);
    }, [isCanceledState]);
    const handleChangeEntityData = (e, isNumber?) => {
        if (isNumber) {
            setEntityData({
                ...entityData,
                [e.target.name]: +e.target.value,
            });
        } else {
            setEntityData({
                ...entityData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleChangeNode = (e) => {
        setEntityData({
            ...entityData,
            idSubject: {
                //@ts-ignore
                ...entityData.idSubject,
                name: e.target.value,
            },
        });
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setIsCanceledState(!isCanceledState);
    };

    return {
        editMode,
        setEditMode,
        entityData,
        handleChangeEntityData,
        handleCancelClick,
        handleChangeNode,
    };
};
