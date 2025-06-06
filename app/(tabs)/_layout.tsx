import { Tabs } from "expo-router"

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="Add" />
            <Tabs.Screen name="Settings" />
        </Tabs>
    )
}

export default Layout