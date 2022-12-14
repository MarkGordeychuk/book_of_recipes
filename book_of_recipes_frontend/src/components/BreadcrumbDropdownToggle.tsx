import React from "react";


const BreadcrumbDropdownToggle = React.forwardRef<HTMLAnchorElement, any>(({ children, onClick }, ref) => (
    <a
        href="#"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

export default BreadcrumbDropdownToggle;
