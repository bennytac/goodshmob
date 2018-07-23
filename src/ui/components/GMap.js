//@flow
import React, {Component} from 'react'
import {ActivityIndicator, Image, Text, View} from 'react-native'
import MapView, {Callout, Marker} from 'react-native-maps'
import type {SearchState} from "../../helpers/SearchHelper"
import memoize from "memoize-one";


export type Props = {
    searchState: SearchState,
    setRef?: () => void,
    onItemPressed: (item: any) => void
};

type State = {

}

type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}


export default class GMap extends Component<Props, State>  {

    getCenter = memoize(data => GMap.getCenter(data))
    getData = memoize(data => _.flatten(data))

    render() {
        const requestState = _.get(this.props, 'searchState.requestState', [])

        const data = this.getData(_.get(this.props, 'searchState.data', []))

        return (
            <View style={{flex:1, marginTop: 5}}>
                <MapView
                    style={{flex:1}}
                    provider={'google'}
                    region={this.getCenter(data)}>
                    {data && data.map((result, i) => {
                        return this.renderMarker(i, result)
                    })}
                </MapView>
                {requestState === 'sending' && <ActivityIndicator
                    animating={true}
                    size="large"
                    style={{position: 'absolute', bottom: 30, left: 20}}
                />
                }
            </View>
        )
    }

    static getCenter(data: []): Region {
        const latitudes = data.map((item) => {
            item = item.resource || item
            return item.description.latitude
        })
        const longitudes = data.map((item) => {
            item = item.resource || item
            return item.description.longitude
        })

        const maxLatitude = _.max(latitudes)
        const minLatitude = _.min(latitudes)
        const maxLongitude = _.max(longitudes)
        const minLongitude = _.min(longitudes)

        return {latitude: (maxLatitude + minLatitude) / 2,
            longitude: (maxLongitude + minLongitude) / 2,
            latitudeDelta: (maxLatitude - minLatitude) * 2,
            longitudeDelta: (maxLongitude - minLongitude) * 2}
    }

    renderMarker(key: number, result: any) {
        //Q to E: un peu strange ca; add a type for result ?
        const item = result.resource || result

        //Q to E: MagicString
        const userInfo = result.user ? ` by ${result.user.first_name} ${result.user.last_name}` : ''
        const title = `${item.title}${userInfo}`
        const description = item.description.address

        return <Marker key={key}
                       coordinate={item.description}>
            {/*Button in callout are not possible on Android, must make the full view clickable*/}
            <Callout onPress={() => this.props.onItemPressed(result)}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                    <Text>{description}</Text>
                    <Text>{i18n.t("search.category.more_details")}</Text>
                </View>
            </Callout>
        </Marker>
    }

}
