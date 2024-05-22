import React from 'react';
import loading from '../loading.gif';

const Spinner = () => {
        return (
            <div className='text-center'>
                <img src={loading} alt='Loding' />  
            </div>
        );
}

export default Spinner;