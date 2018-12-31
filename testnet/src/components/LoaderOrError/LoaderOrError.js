import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoaderOrError = ({process, error, errorMsg, text="Loading"}) => {
  return (
    <div style={{textAlign: "center"}}>
      {process && <Loader active inline content={text} />}
      {error && <p>{errorMsg}</p>}
    </div>
  );
}

export default LoaderOrError;