import React, { FunctionComponent } from "react";

const ContactCardIcon: FunctionComponent<IconProps> = ({ width, color }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="24" height="24" rx="12" fill={color} />
      <path
        d="M7.25 6C6.78587 6 6.34075 6.18437 6.01256 6.51256C5.68437 6.84075 5.5 7.28587 5.5 7.75V14.25C5.5 15.216 6.284 16 7.25 16H9.535C9.43842 15.3181 9.5434 14.6229 9.837 14C9.4937 14.0065 9.15106 13.9675 8.818 13.884L8.765 13.871C8.40353 13.7806 8.08267 13.572 7.85345 13.2783C7.62422 12.9845 7.49981 12.6226 7.5 12.25C7.5 11.775 7.884 11.391 8.358 11.391H11.165C11.601 11.391 11.962 11.717 12.015 12.139C12.335 12.0459 12.6667 11.9988 13 11.999H17C17.98 11.999 18.865 12.401 19.5 13.049V7.749C19.4997 7.28504 19.3152 6.84018 18.9871 6.51221C18.6589 6.18424 18.214 6 17.75 6H7.25ZM11.118 9.357C11.1229 9.53824 11.0915 9.71862 11.0255 9.8875C10.9596 10.0564 10.8604 10.2103 10.734 10.3403C10.6075 10.4702 10.4563 10.5735 10.2893 10.644C10.1223 10.7145 9.9428 10.7508 9.7615 10.7508C9.5802 10.7508 9.40073 10.7145 9.2337 10.644C9.06667 10.5735 8.91547 10.4702 8.78902 10.3403C8.66257 10.2103 8.56344 10.0564 8.49748 9.8875C8.43153 9.71862 8.40008 9.53824 8.405 9.357C8.4146 9.00361 8.56172 8.66792 8.81507 8.42135C9.06842 8.17479 9.40798 8.03683 9.7615 8.03683C10.115 8.03683 10.4546 8.17479 10.7079 8.42135C10.9613 8.66792 11.1084 9.00361 11.118 9.357ZM13.5 9.5C13.5 9.36739 13.5527 9.24021 13.6464 9.14645C13.7402 9.05268 13.8674 9 14 9H17C17.1326 9 17.2598 9.05268 17.3536 9.14645C17.4473 9.24021 17.5 9.36739 17.5 9.5C17.5 9.63261 17.4473 9.75979 17.3536 9.85355C17.2598 9.94732 17.1326 10 17 10H14C13.8674 10 13.7402 9.94732 13.6464 9.85355C13.5527 9.75979 13.5 9.63261 13.5 9.5ZM13 13C12.337 13 11.7011 13.2634 11.2322 13.7322C10.7634 14.2011 10.5 14.837 10.5 15.5C10.5 16.163 10.7634 16.7989 11.2322 17.2678C11.7011 17.7366 12.337 18 13 18H13.5C13.6326 18 13.7598 17.9473 13.8536 17.8536C13.9473 17.7598 14 17.6326 14 17.5C14 17.3674 13.9473 17.2402 13.8536 17.1464C13.7598 17.0527 13.6326 17 13.5 17H13C12.6022 17 12.2206 16.842 11.9393 16.5607C11.658 16.2794 11.5 15.8978 11.5 15.5C11.5 15.1022 11.658 14.7206 11.9393 14.4393C12.2206 14.158 12.6022 14 13 14H13.5C13.6326 14 13.7598 13.9473 13.8536 13.8536C13.9473 13.7598 14 13.6326 14 13.5C14 13.3674 13.9473 13.2402 13.8536 13.1464C13.7598 13.0527 13.6326 13 13.5 13H13ZM16.5 13C16.3674 13 16.2402 13.0527 16.1464 13.1464C16.0527 13.2402 16 13.3674 16 13.5C16 13.6326 16.0527 13.7598 16.1464 13.8536C16.2402 13.9473 16.3674 14 16.5 14H17C17.3978 14 17.7794 14.158 18.0607 14.4393C18.342 14.7206 18.5 15.1022 18.5 15.5C18.5 15.8978 18.342 16.2794 18.0607 16.5607C17.7794 16.842 17.3978 17 17 17H16.5C16.3674 17 16.2402 17.0527 16.1464 17.1464C16.0527 17.2402 16 17.3674 16 17.5C16 17.6326 16.0527 17.7598 16.1464 17.8536C16.2402 17.9473 16.3674 18 16.5 18H17C17.663 18 18.2989 17.7366 18.7678 17.2678C19.2366 16.7989 19.5 16.163 19.5 15.5C19.5 14.837 19.2366 14.2011 18.7678 13.7322C18.2989 13.2634 17.663 13 17 13H16.5ZM13 15C12.8674 15 12.7402 15.0527 12.6464 15.1464C12.5527 15.2402 12.5 15.3674 12.5 15.5C12.5 15.6326 12.5527 15.7598 12.6464 15.8536C12.7402 15.9473 12.8674 16 13 16H17C17.1326 16 17.2598 15.9473 17.3536 15.8536C17.4473 15.7598 17.5 15.6326 17.5 15.5C17.5 15.3674 17.4473 15.2402 17.3536 15.1464C17.2598 15.0527 17.1326 15 17 15H13Z"
        fill="white"
      />
    </svg>
  );
};

export default ContactCardIcon;
