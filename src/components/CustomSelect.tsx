import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

interface Group {
    id: number;
    name: string;
}
interface CustomSelectProps {
    value: Group;
    onChange: (selectedGroup: Group) => void;
    groups: Group[];
    params: {
        api: {
            stopEditing(): void;
        };
    };
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, groups, params }) => {
    const handleChange = (e, value) => {
        console.log(value.value);
        const selectedGroup = groups.find((group) => group.id === parseInt(value.value));
        onChange(selectedGroup);
        params.api.stopEditing();
    };

    return (
        <div>
            <Autocomplete
                className="autocompleteCustom"
                options={groups
                    .map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))}
                defaultValue={value}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField {...params} InputLabelProps={{ shrink: false }} />
                )}
            />
        </div>
    );
};
