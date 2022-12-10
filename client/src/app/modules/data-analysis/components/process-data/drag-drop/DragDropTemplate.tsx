import React, {FC, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PlotContent from "./PlotContent";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {reduceType} from "../../../core/_dataA-models";

type DragDropTemplateProps = {
    droppableId: string
}

const DragDropTemplate: FC<DragDropTemplateProps> = ({droppableId}) => {

    const {state, dispatch} = useDataAnalysis()

    return (
        <DragDropContext
            onDragEnd={(result, provided) => {
                const dest = result.destination
                const prevIndex = result.source.index
                if (dest && (prevIndex != dest.index)) {
                    dispatch({
                        type: "update_plot",
                        indexes: {
                            newIndex: dest.index,
                            prevIndex: prevIndex
                        }
                    })
                }
            }}
        >
            <Droppable droppableId={droppableId}>
                {
                    (provided, snapshot) => (
                        <div id={droppableId} {...provided.droppableProps} ref={provided.innerRef}>
                            {Array.from(state.listDataFields).map((value) => {
                                const index = value[0]
                                const data = value[1]
                                return (
                                    <Draggable key={index} draggableId={droppableId + index} index={index}>
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
