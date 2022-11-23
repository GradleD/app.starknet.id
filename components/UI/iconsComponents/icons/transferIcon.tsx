import React, { FunctionComponent } from "react";
import { IconProps } from "./discordIcon";

const transferIcon: FunctionComponent<IconProps> = ({ color, width }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 91 91"
      id="Layer_1"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <style type="text/css"></style>
      <g>
        <path
          fill={color}
          className="st0"
          d="M90.2,42.8c-0.2-1.1-0.8-2.1-1.9-2.8c-5.1-3.3-10.5-5.8-15.3-9.8c-3.9-3.2-7.3-7.1-10.4-11.1   c-1.7-2.1-5.1,0.2-4.4,2.5c1.9,6.4,6.4,12.4,11.9,17.3c-15.8-0.3-31.5,0-47.3,0.5c1.1-1,2.2-2.1,3.2-3.2c3.5-4.1,9.8-10.5,6.8-16.3   c-0.7-1.4-2.7-1.8-4-1c-2.1,1.2-2.9,3.1-4.2,5.1c-1.8,2.7-3.8,4.8-6.5,6.7c-4.9,3.3-9.7,6.5-14.8,9.4c-3.4,1.9-3.1,5.8-1.1,8.1   c0.3,0.7,0.8,1.3,1.5,1.8c4.9,3.2,10.1,5.7,14.5,9.7C21.9,63,25,66.9,28,70.7c1.7,2.1,5-0.2,4.4-2.5c-1.9-6.6-6.3-12.9-11.8-17.9   c16.7-0.8,33.6-1.9,50.3-2c-6.8,5-12.7,11.4-12.1,18.9c0.2,2.3,3.2,4.2,5,2.1c3.4-4,5.6-8.2,9.7-11.7c4.1-3.5,8.6-6.2,13.3-8.9   c1.3-0.1,2.3-1,2.9-2.1C90.5,45.4,90.6,44.1,90.2,42.8z"
        />
      </g>
    </svg>
  );
};

export default transferIcon;
