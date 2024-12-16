import { StyleSheet } from "react-native";
import { RED } from "../../utils/Colors";

export const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingLeft : 15,
        paddingRight : 15,
        position : 'relative'
    },
    date : {
        fontSize : 16,
        fontWeight : 'semibold'
    },
    todoList : {
        marginTop : 40,
        flex : 1
    },
    addButton : {
        width : 60,
        height: 60,
        borderRadius : 60,
        backgroundColor : RED,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        bottom : 20,
        right : 0,
        position : 'absolute',
        marginRight : 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    bottomSheetBackground: {
        backgroundColor: '#FFFFFF',
    },
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      closeButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
      },
})