import React from 'react'
import styled from 'styled-components';


function FormField({ label, tag, type, name, value, onChange }) {
    return (
        <div className="formfield">
            <label>
                {label}
            </label>
            {React.createElement(tag, { type: type, name: name, value: value, onChange: onChange })}

        </div>
    )
}

export default FormField
