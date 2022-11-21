import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

type AccordionTemplateProps = {
    contents: Map<string, React.ReactNode>
}

const AccordionTemplate: FC<AccordionTemplateProps> = ({contents}) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <div className="mt-5">
            {
                Array.from(contents).map((value, index) => {
                    const newIndex = value[0] + "_" + String(index) + "_"
                    const _id = "panel" + newIndex + "bh-header"
                    const panelName = 'panel' + newIndex
                    const controler = "panel" + newIndex + "bh-content"

                    return (
                        <Accordion key={newIndex} TransitionProps={{unmountOnExit: true}}
                                   expanded={expanded === panelName}
                                   onChange={handleChange(panelName)}>
                            <AccordionSummary
                                aria-controls={controler}
                                expandIcon={<ExpandMore className="fs-3 fw-bold text-muted"/>}

                                id={_id} style={{fontSize: "bold"}}
                            >
                                <Typography className="fs-3 fw-bold text-muted">
                                    {value[0]}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {value[1]}
                            </AccordionDetails>
                        </Accordion>)
                })
            }
        </div>
    );
};

export {AccordionTemplate};
export type {AccordionTemplateProps};

