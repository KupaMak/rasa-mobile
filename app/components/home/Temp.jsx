import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import SpecificationsTab from './SpecificationsTab'
import SkeletonHome from './SkeletonHome'




export default function Tabs() {

    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "0", title: 'Description' },
        { key: "1", title: 'Specifications' },
        { key: "2", title: 'Vendor' },
    ])
    const renderScene = SceneMap({
        first: SkeletonHome,
        second: SkeletonHome,
        third: SkeletonHome,
    })



    const renderTabsBar = (props) => (
        <TabBar {...props}

            indicatorStyle={{ backgroundColor: 'blue' }}
            activeColor='#3699D6'
            inactiveColor='transparent'
            renderLabel={({ route, color }) => (
                <Text>{route.title}</Text>
            )}

        />
    )
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabsBar}
            initialLayout={{ width: layout.width }}

        />
    )
}