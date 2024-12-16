import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CommonStyles from '../../utils/CommonStyles'
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import { LIGHT_RED, RED, WHITE } from '../../utils/Colors';
import { Todo } from '../../utils/models/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosByDate } from '../../redux/reducer/todoReducer';

const AgendaItem = React.memo(({ item }) => (
  <TouchableOpacity
    style={{
      backgroundColor: LIGHT_RED,
      flex: 1,
      borderRadius: 5,
      marginRight: 15,
      marginTop: 25
      
    }}
  >
    <View style={{
      paddingVertical : 10,
      paddingHorizontal : 20
    }}>
      <Text style={{ fontWeight: 'bold', color : WHITE, marginBottom : 10 }}>{item.name}</Text>
      <Text style={{ fontWeight: 'bold', color : WHITE }}>Category: {item.category}</Text>
    </View>
  </TouchableOpacity>
));

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const UpcomingScreen = () => {
  // const today = getTodayDate()
  const date = getTodayDate();
  const [selectedDate, setSelectedDate] = useState(date);
  const [agendaItems, setAgendaItems] = useState({});

  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  
  useEffect(() => {
    setSelectedDate(date)
  },[])
  
  useEffect(() => {
      dispatch(fetchTodosByDate(selectedDate));
    }, [dispatch, selectedDate]);

    useEffect(() => {
      if (status === 'succeeded') {
        const formattedItems = todos.reduce((acc, todo) => {
            const todoDate = selectedDate
            if (!acc[todoDate]) acc[todoDate] = [];
            acc[todoDate].push({ name: todo.header, category: todo.category, height: 50 });
            return acc;
        }, {});
        setAgendaItems(formattedItems);
        console.log(formattedItems)
    }
    }, [status, todos])

  {error && <Text>{error.message || 'An error occurred'}</Text>}

  const renderAgendaItem = useCallback((item) => <AgendaItem item={item} />, []);

  return (
    <View style={{ flex: 1 }}>
      {console.log("selectedDate=>", selectedDate)}
      <Agenda
        items={agendaItems}
        selected={selectedDate}
        current={selectedDate}
        onDayPress={(date) => {
          console.log(date.dateString)
          setSelectedDate(date.dateString)
        }}
        renderItem={renderAgendaItem}
        rowHasChanged={(r1, r2) => r1 !== r2}
      />
    </View>
  );
};
export default UpcomingScreen

const styles = StyleSheet.create({})