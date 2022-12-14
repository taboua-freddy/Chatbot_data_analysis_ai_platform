import {Autocomplete, darken, lighten, styled, TextField} from "@mui/material";
import React, {FC} from "react";
import {auto} from "@popperjs/core";
import {featureType} from "../../../process-analysis/utils";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {ProcessFields} from "../../../core/_dataA-models";

const GroupHeader = styled('div')(({theme}) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

type DropdownSortableProps = {
    options: Array<featureType>
    fieldName: keyof ProcessFields
    defaultValue?: featureType
}

const DropdownSortable: FC<DropdownSortableProps> = ({defaultValue, fieldName, options}) => {
    const {state, dispatch} = useDataAnalysis()
    return (
        <Autocomplete
            onChange={(event, value) => {
                // @ts-ignore
                state.dataFields[fieldName] = value
                dispatch({
                    type: "add_params",
                    params: state.dataFields
                })
            }}
            size={"small"}
            options={options.sort((a, b) => -b.category!.localeCompare(a.category as string))}
            groupBy={(option) => option.category ? option.category : option.label}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            sx={{width: auto}}
            value={state.dataFields.feature}
            renderInput={(params) => <TextField {...params} label="Select Feature"/>}
            renderGroup={(params) => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />
    )
}

export {DropdownSortable}