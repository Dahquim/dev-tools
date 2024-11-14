import { FileJson2, Hash, Image } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Json/Yaml Formatter",
        url: "/formatter",
        icon: FileJson2,
    },
    {
        title: "Base64 Encoder/Decoder",
        url: "/base64",
        icon: Hash,
    },
    {
        title: "Make Image Square",
        url: "/square-image",
        icon: Image
    },
    {
        title: "SVG to PNG Converter",
        url: "/svg2png",
        icon: Image
    }
]

export function AppSidebar() {
    return (
        <Sidebar className="border-base-300">
            <SidebarContent>
                <SidebarHeader>
                    Developer Tools
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
