import { ReactNode } from "react"
import SideNavigation from "../_components/SideNavigation"


interface layoutPropsType{
    children:ReactNode
}

const layout = ({children}:layoutPropsType) => {
  return (
    <div className="grid grid-cols-[16rem,1fr] h-full gap-12">
        <div>
            <SideNavigation />
        </div>
        <div className="py-1">{children}</div>

    </div>
  )
}

export default layout