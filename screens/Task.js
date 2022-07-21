import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../screens/buttons/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task({navigation}) {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [showBellModal, setShowBellModal] = useState(false);
  const [color, setColor] = useState('white');
  const [bellTime, setBellTime] = useState('1');

  const [done, setDone] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask();
    });
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = task;
        } else {
          newTasks = [...tasks, task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            navigation.goBack('ToDo');
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: desc,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };
  return (
    <ScrollView>
      <View style={styles.page}>
        <Modal
          visible={showBellModal}
          transparent
          onRequestClose={() => setShowBellModal(false)}
          animationType="slide"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.bell_modal}>
              <View style={styles.bell_body}>
                <Text style={styles.text}>Remind me After</Text>
                <TextInput
                  style={styles.bell_input}
                  keyboardType="numeric"
                  value={bellTime}
                  onChangeText={value => setBellTime(value)}
                />
                <Text style={styles.text}>minute(s)</Text>
              </View>
              <View style={styles.bell_buttons}>
                <TouchableOpacity
                  style={styles.bell_cancel_button}
                  onPress={() => {
                    setShowBellModal(false);
                  }}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bell_ok_button}
                  onPress={() => {
                    setShowBellModal(false);
                    setTaskAlarm();
                  }}>
                  <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigation.navigate('ToDo')}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            style={{marginRight: 285}}
          />
        </TouchableOpacity>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          color="black"
          placeholderTextColor="black"
          onChangeText={value => setTitle(value)}
        />
        <TextInput
          value={desc}
          style={styles.input}
          placeholder="write a note here..."
          multiline
          placeholderTextColor="black"
          color="black"
          onChangeText={value => setDesc(value)}
        />

        {/* <View style={styles.color_bar}>
          <TouchableOpacity
            style={styles.color_white}
            onPress={() => {
              setColor('white');
            }}>
            {color === 'white' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_red}
            onPress={() => {
              setColor('red');
            }}>
            {color === 'red' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_blue}
            onPress={() => {
              setColor('blue');
            }}>
            {color === 'blue' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_green}
            onPress={() => {
              setColor('green');
            }}>
            {color === 'green' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
        </View> */}

        <View style={styles.checkbox}>
          <CheckBox
            value={done}
            onValueChange={newValue => setDone(newValue)}
          />
          <Text style={styles.text}>Done</Text>
        </View>

        <CustomButton
          title="Save Task"
          color="#1eb900"
          style={{width: '100%'}}
          onPressFunction={setTask}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#e0ffff`',
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  //////

  text: {
    fontSize: 20,
    color: '#000000',
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extra_button: {
    flex: 1,
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bell_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50,
  },
  bell_input: {
    width: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffffff80',
    margin: 10,
    borderRadius: 5,
  },
});
