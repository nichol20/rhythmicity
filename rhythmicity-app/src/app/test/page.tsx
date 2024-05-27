'use client'
import { addListIcon } from "@/assets"
import { RowOptions } from "@/components/RowOptions"

export default function Test() {
    return (
        <div style={{ backgroundColor: "black", display: "flex", justifyContent: "center" }}>
            <RowOptions showBtn={true} options={[
                {
                    action: () => { },
                    description: "test",
                    name: "",
                    icon: addListIcon
                }
            ]} />
        </div>
    )
}