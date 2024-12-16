import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GREEN, WHITE } from '../utils/Colors';
import { Todo } from '../utils/models/Todo';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodoItem } from '../redux/reducer/todoReducer';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TodoItem = ({ todo } : {todo : Todo}) => {
    const [isPressed, setIsPressed] = useState(todo.is_completed);
    const dispatch = useDispatch();

    const toggleCheckBox = () => {
      const updatedTodo = {
        id: todo.id,
        header: todo.header,
        description: todo.description,
        date: todo.date,
        is_completed: !isPressed,
        category: todo.category,
      };
    
      setIsPressed(!isPressed);
      dispatch(updateTodoItem(updatedTodo))
        .unwrap()
        .then((result) => {
          console.log('Todo updated successfully:', result);
        })
        .catch((error) => {
          console.error('Failed to update todo item:', error);
          setIsPressed(isPressed);
        });
    };

    const handleDelete = (id: number) => {
      dispatch(deleteTodo(id))
        .unwrap()
        .then((response) => {
          console.log('Todo deleted successfully:', response);
          Alert.alert('Success', 'Todo deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting todo:', error);
          Alert.alert('Error', 'Failed to delete todo.');
        });
    };
  
    const renderRightActions = () => (
      <TouchableOpacity style={{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft: 10
      }}
      onPress={() => handleDelete(todo.id)}
      >
        <MaterialIcons name="delete" size={34} color="red" />
      </TouchableOpacity>
    );
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.todoHeader}>{todo.header}</Text>
            <Text style={styles.categoryText}>{todo.category}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleCheckBox()}>
            <View style={[styles.checkBox, {backgroundColor : isPressed ? GREEN : WHITE}]}></View>
        </TouchableOpacity>
    </View>
    </Swipeable>
  )
}

export default TodoItem

const styles = StyleSheet.create({
    container : {
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingHorizontal : 20,
        paddingVertical : 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginVertical : 10
    },
    content : {
        display : 'flex'
    },
    checkBox : {
        width : 25,
        height : 25,
        borderWidth : 2,
        borderRadius : 25
    },
    todoHeader : {
        fontSize : 18,
        fontWeight : 'bold',
        marginBottom : 10
    },
    categoryText : {
        fontSize : 12,
        color : 'gray'
    }
})