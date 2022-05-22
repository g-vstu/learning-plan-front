import React from 'react';

export const FieldContainer: React.FC<any> = ({ children, style }) => {
    return <div style={{ ...style, marginBottom: 10 }}>{children}</div>;
};
