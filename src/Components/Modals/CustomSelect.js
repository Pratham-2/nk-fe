import React from 'react'
import Select from "react-select";

export default ({ value, onChange, options, classNamePrefix }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ""
    }

    return (
        <div className={classNamePrefix}>
            <Select
                onChange={value => onChange(value)}
                options={options}
                value={defaultValue(options, value)}
            />
        </div>
    )
}