import React, {FC, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PlotContent from "./PlotContent";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

type DragDropTemplateProps = {
    droppableId: string
}

const DragDropTemplate: FC<DragDropTemplateProps> = ({droppableId}) => {

    const {listDataFields} = useDataAnalysis()

    const onBeforeDragStart = useCallback(() => {
        /*...*/
    }, []);
    const onDragStart = useCallback(() => {
        /*...*/
    }, []);
    const onDragUpdate = useCallback(() => {
        /*...*/
    }, []);
    const onDragEnd = useCallback(() => {
        // the only one that is required
    }, []);


    return (
        <DragDropContext
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId={droppableId}>
                {
                    (provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {Array.from(listDataFields).map((value) => {
                                const index = value[0]
                                const data = value[1]
                                return (
                                    <Draggable draggableId={droppableId + index} index={index}>
                                        {(provided, snapshot) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps}
                                                 ref={provided.innerRef}>
                                                <PlotContent index={index} data={data}/>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    );
};

export default DragDropTemplate;
