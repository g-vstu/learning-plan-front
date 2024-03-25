import React, { useState } from 'react';
import axios from 'axios';
import excelIcon from '../img/excel.svg';
import loaderIcon from '../img/loader.svg';

export const ExcelCell: React.FC<{ id: number; shifr: string }> = ({ id, shifr }) => {
    const [loading, setLoading] = useState(false);

    const handleExcel = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${process.env.REACT_APP_STUDENT_PLAN_API}/utils/myExcel?planId=${id}`,
                {
                    responseType: 'blob',
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${shifr}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            if (response) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error downloading excel file:', error);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
            onClick={handleExcel}
        >
            {loading ? (
                <img
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                    src={loaderIcon}
                    alt="Loader icon"
                />
            ) : (
                <img
                    style={{ width: '30px', height: '30px' }}
                    hidden={loading}
                    src={excelIcon}
                    alt="Excel icon"
                />
            )}
        </div>
    );
};
