import MenuUser from "@/components/Menu";
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {

  return (
    <div className="min-h-screen flex">
      <MenuUser />
      {children}
    </div>
  );
}

export default layout