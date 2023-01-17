import {View, StyleSheet, Text} from 'react-native';

export default function Details(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Details</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#FFFFFF',
    },
    text: {
        color : 'white',
        fontSize : 16,
    }
})