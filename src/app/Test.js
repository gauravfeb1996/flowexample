import {
    Handle,
    Position
  } from 'reactflow';
  
  const Test = () => {
      debugger
      return (
          <div>
               API tab test
              <div style={{ width: '50%'}}>
                  A
                  <Handle
                  key={'e3'}
                  type="source"
                  position={Position.Right}
                  id={'e3'}
                  style={{ top: 10}}
            />
              </div>
              <div style={{ width: '50%'}}>
                  B
                  <Handle
                  key={'e4'}
                  type="source"
                  position={Position.Right}
                  id={'e4'}
                  style={{ top: 20}}
            />
              </div>
          </div>
  
      );
  }
  
  export default Test;