import React from 'react'
import { useLocation } from 'react-router-dom';

export default function TitleExtractor() {
    const location = useLocation();

    // Extract the title based on the URL path
    const pathSegments = location.pathname.split('/');
    const title = pathSegments[pathSegments.length - 1];

    return (
        <div>
            <div className='h-full'>
                <p className='h-full text-white text-3xl capitalize'>{title.replace('-', ' ')}</p>
            </div>
        </div>
    )
}
