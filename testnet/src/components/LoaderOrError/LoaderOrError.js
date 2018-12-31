import React from 'react';
import { Loader, Header } from 'semantic-ui-react';

const LoaderOrError = ({process, error, errorMsg, text="Loading"}) => {
  return (
    <div style={{textAlign: "center"}}>
      {process && <Loader active inline content={text} />}
      {error && <Header as="h4">{errorMsg}</Header>}
    </div>
  );
}

export default LoaderOrError;