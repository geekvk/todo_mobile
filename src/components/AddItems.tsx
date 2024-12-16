import { 
    StyleSheet, 
    Text,
     View, 
     TouchableOpacity, 
     Alert, 
     ListRenderItemInfo, 
     FlatList, 
     Pressable, 
     Platform 
    } from 'react-native'
import React, {useState, useEffect, useCallback, useMemo } from 'react'
import { GREEN, RED, WHITE } from '../utils/Colors'

import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../redux/reducer/todoReducer';
import Modal from 'react-native-modal';
import { fetchCategories } from '../redux/reducer/categoryReducer';

const AddItems = () => {
  const [item, setItem] = useState({ header: '', description: '', category: '', is_completed: false, date: '' });
  const [UIState, setUIState] = useState({ isPickerVisible: false, modalVisible: false });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const { status, responseMessage } = useSelector((state) => state.todos);
  const { categories, categoryStatus, categoryError } = useSelector((state) => state.categories);

  const toggleDatePicker = useCallback(() => {
    setUIState((prev) => ({ ...prev, isPickerVisible: !prev.isPickerVisible }));
  }, []);

  const toggleModal = useCallback(() => {
    setUIState((prev) => ({ ...prev, modalVisible: !prev.modalVisible }));
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(createTodo(item));
    setItem({ header: '', description: '', category: '', is_completed: false, date: '' });
    setSelectedCategory(null);
  }, [dispatch, item]);

  const onDateChange = useCallback((event : any, selectedDate : Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setItem((prev) => ({
        ...prev,
        date: formattedDate,
      }));
    }
    if (Platform.OS === 'ios') {
      setUIState((prev) => ({ ...prev, isPickerVisible: true }));
    } else {
      setUIState((prev) => ({ ...prev, isPickerVisible: false }));
    }
  }, []);

  const sortedCategories = useMemo(() => {
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  useEffect(() => {
    if (categoryStatus === 'idle' && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, categories.length, dispatch]);

  useEffect(() => {
    if (responseMessage) {
      toggleModal();
    }
  }, [responseMessage, toggleModal]);

  const renderCategories = useCallback(({ item }) => {
    const isSelected = selectedCategory?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategory]}
        onPress={() => {
          setSelectedCategory(item);
          setItem((prev) => ({ ...prev, category: item.name }));
        }}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
        <Text style={styles.header}> Add Todo</Text>
      <TextInput
        label="Title"
        mode="outlined" 
        style={styles.input}
        value={item.header}
        onChangeText={(text) => setItem((prev) => ({ ...prev, header: text }))}

      />
      <TextInput
        label="Description"
        mode="outlined" 
        style={styles.input}
        value={item.description}
        onChangeText={(text) => setItem((prev) => ({ ...prev, description: text }))}
      
      />
      <TextInput
          style={styles.input}
          placeholder="Select date"
          mode="outlined" 
          editable={false}
          value={item.date}
          onChangeText={(text) => setItem((prev) => ({...prev,  date : text}))}
        
        
        />
       <View style={{
        flex : 1,
        position : 'relative',
        backgroundColor : 'red'
       }}>
        <TouchableOpacity 
              style={styles.calendarIconContainer}
              onPress={toggleDatePicker}
          >
            <Ionicons name="calendar" size={28} color={RED} />
          </TouchableOpacity>
       </View>
      <View style={styles.categorySection}>
        <FlatList
            data={sortedCategories}
            renderItem={renderCategories}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style = {styles.buttonText}> Submit </Text>
      </Pressable>
      {UIState.isPickerVisible && (
        <DateTimePicker
          value={item.date ? new Date(item.date) : new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
        <Modal
            isVisible={UIState.modalVisible} 
            onBackdropPress={toggleModal} 
            onBackButtonPress={toggleModal}
        >
            <View style={[styles.container, { marginHorizontal : 20}]}>
                <Text style={styles.successMessage}>{responseMessage}</Text>
            </View>
        </Modal>

    </View>
  )
}

export default React.memo(AddItems);

const styles = StyleSheet.create({
    container : {
        paddingVertical : 20,
        paddingHorizontal : 20,
        backgroundColor : WHITE,
        borderRadius : 10
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
    header : {
        fontSize : 24,
        fontWeight : 'bold',
        marginBottom : 10,
        textAlign : 'center'
    },
    categoryItem: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
        alignItems: 'center',
    },
    categorySection : {
        marginVertical : 20,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000'
    },
    selectedCategory: {
        backgroundColor: RED
    },
    selectedText: {
        color: '#fff'
    },
    button: {
        width: '100%',
        backgroundColor : RED,
        paddingVertical : 10,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 20
    },
    buttonText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : WHITE
    },
    calendarIconContainer: {
        position: 'absolute',
        right: 10,
        bottom : 20

      },
    loader: {
        marginTop: 20,
    },
    successMessage: {
        color: GREEN,
        marginVertical: 10,
        fontSize: 18,
        textAlign : 'center'
    },
})