import React from 'react';
import './Spinner.css';
import { Spin } from 'antd';

function Spinner() {
    return (
        <div className='spinner'>
            <Spin tip='Loading...' size='large' />
        </div>
    );
}

export default Spinner;