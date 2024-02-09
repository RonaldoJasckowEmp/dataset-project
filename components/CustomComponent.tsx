import React, { useState } from 'react';

const NewComponent = ({ content }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabChange = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div>
            <div>
                {content.map((item, index) => (
                    <button key={index} onClick={() => handleTabChange(index)} style={{ 
                        marginRight: '10px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        outline: 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                        {item.name}
                    </button>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                {content[activeTabIndex].component}
            </div>
        </div>
    );
};
export default NewComponent;