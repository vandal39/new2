import { View, StyleSheet , Text} from 'react-native';

export default function Weather(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Weather</Text>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#FFFFFF',
    },
    text: {
        color : '#FFFFFF',
        fontSize : 18,
        fontWeight : 'bold',
        textAlign : 'center',
        marginTop : 10,
        marginBottom : 10,
    }
});