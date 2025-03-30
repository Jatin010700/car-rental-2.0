import { dotPulse } from "ldrs";
dotPulse.register();

export const Preloader = ({ className, size }) => {
  return (
    <div className={className}>
      <l-dot-pulse size={size} speed="1.3" color="#febd00" ></l-dot-pulse>
    </div>
  );
};