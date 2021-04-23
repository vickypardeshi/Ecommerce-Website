import React from 'react';

function ErrorHandler(props) {
  const { retryLogic, onCancel, } = props;
  return (
        <div>
            Something wen't wrong. Please retry
        </div>
  );
}

export default ErrorHandler;
