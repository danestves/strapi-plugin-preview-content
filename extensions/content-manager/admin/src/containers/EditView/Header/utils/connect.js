import React from "react";
import useDataManager from "../../../../hooks/useDataManager";

function connect(WrappedComponent, select) {
  return function (props) {
    // eslint-disable-next-line react/prop-types
    const selectors = select();
    const { slug, ...data } = useDataManager();
    console.log({ selectors, props });
    return <WrappedComponent {...props} {...selectors} />;
  };
}

export default connect;
