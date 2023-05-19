import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';

import 'reactflow/dist/style.css';
import ApiTab from './ApiTab';

const nodeData = [
    {id: '1', position: { x: 0, y: 100 }, node_type: 'api', node_data: { heading: 'node 1', }},
    {id: '2', position: { x: 0, y: 150 }, node_type: 'test', node_data: {handle: [], text: 'node 2'}},
]

const getInitialNode = () => {
    const initData = [];
    nodeData.map(node => initData.push({id: node.id, position: node.position, data: { label: node.node_type === 'api'? <ApiTab data={node.node_data} /> : <div>Custom Text</div>}}));
    return initData;
}

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 100 }, data: { label: <ApiTab />}},
//   { id: '2', position: { x: 0, y: 150 }, data: { label: <div>Custom Text</div>} },
// ];

const initialEdges = [
    { id: '1', source: '1', target: '2', type: "smoothstep", sourceHandle: 'e3', targetHandle: null},
    { id: '2', source: '1', target: '2', type: "smoothstep", sourceHandle: 'e4', targetHandle: null},
];

// const initialEdges = [
//     { id: '1', source: '1', target: '2', type: "smoothstep"},
//     { id: '2', source: '1', target: '2', type: "smoothstep"},
// ];

let id = 0;

function Flow() {
    const [initialNodes, setInitNodes] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) =>  setEdges((eds) => addEdge({...params, type: "smoothstep"}, eds)), [setEdges]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const getId = () => `dndnode_${id++}`;

const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
      setNodes(getInitialNode());
  },[])

const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type === 'default' ? <ApiTab /> : `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
      <>
      <ReactFlowProvider>
      <div style={{width: '100vw', height: '100vh', position: 'relative'}} ref={reactFlowWrapper}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
        </div>
        </div>
        
      </ReactFlowProvider>
      </>
  );
}

export default Flow;

//edge with button
//