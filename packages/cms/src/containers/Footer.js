import React from "react";
import { CFooter } from "@coreui/react";
import { useToaster } from "context/toaster";

const Footer = () => {
  const { renderToast } = useToaster();

  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://www.kdcsoftware.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          KDC Software
        </a>
        <span className="ml-1">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://github.com/kdcio/abu"
          target="_blank"
          rel="noopener noreferrer"
        >
          AbuCMS
        </a>
      </div>
      {renderToast()}
    </CFooter>
  );
};

export default React.memo(Footer);
