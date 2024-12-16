import {FlatList, Pressable, Text, View, TouchableOpacity, ListRenderItemInfo } from 'react-native'
import React, {useState, useRef, useCallback, useEffect} from 'react'
import CommonStyles from '../../utils/CommonStyles'
import Header from '../../components/Header'
import { getFormattedDate } from '../../utils/getFormattedDate'
import { styles } from './styles'
import TodoItem from '../../components/TodoItem'
import { Todo } from '../../utils/models/Todo'

import Feather from '@expo/vector-icons/Feather';
import { WHITE } from '../../utils/Colors'

import Modal from 'react-native-modal';
import AddItems from '../../components/AddItems'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodosByDate } from '../../redux/reducer/todoReducer'

  const renderTodos = ({ item } : ListRenderItemInfo<Todo>) => {
        return (
            <TodoItem todo = {item}/>
        )

  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

const TodayScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { todos, status, error } = useSelector((state) => state.todos);
    const date = getTodayDate();
    console.log(date)

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        dispatch(fetchTodosByDate(date));
        console.log(date)
        if (status === 'succeeded') {
          console.log("todos->", todos);
        }
        const interval = setInterval(() => {
          console.log("Auto-refresh triggered");
          dispatch(fetchTodosByDate(date));
        }, 60000);

        return () => clearInterval(interval);
  
      }, [dispatch, date]);

      {error && <Text>{error.message || 'An error occurred'}</Text>}
      const isRefreshing = status === 'loading';
      {isRefreshing && <Text>Refreshing...</Text>}

  return (
    <View style={[CommonStyles.container, styles.container]}>
      <Header title = "Today"/>
      <View style={styles.todoList}>
        <Text style={styles.date}>{getTodayDate()}</Text>
        <FlatList
            data = {todos}
            renderItem={renderTodos}
            keyExtractor={(item) => (item.id?.toString() ?? Math.random().toString())}
            showsVerticalScrollIndicator={false}
        />
        
      </View>
      <Pressable style={styles.addButton} onPress={toggleModal}>
            <Feather name="plus" size={34} color={WHITE} />
        </Pressable>
        <Modal
            isVisible={modalVisible}
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
      >
        <AddItems/>
      </Modal>
    </View>
  )
}

export default TodayScreen
